document.addEventListener('DOMContentLoaded', () => {
  const placesList = document.getElementById('places-list');        // Conteneur des cartes de lieux
  const priceFilter = document.getElementById('price-filter');      // Sélecteur de filtre de prix
  const urlParams = new URLSearchParams(window.location.search);    // Permet d'extraire les paramètres d'URL
  const placeId = urlParams.get('id');                               // Récupère l'ID du lieu depuis l'URL

  // ---------------------
  // PAGE : index.html
  // ---------------------
  if (placesList) {
    /**
     * Crée une carte HTML représentant un lieu
     * @param {Object} place - Objet contenant les infos d'un lieu
     */
    function createPlaceCard(place) {
      const card = document.createElement('div');
      card.className = 'place-card';  // Classe requise pour le CSS

      // Contenu HTML de la carte
      card.innerHTML = `
        <h3>${place.title}</h3>
        <p><strong>Price:</strong> ${place.price}€ / night</p>
        <button class="details-button" data-id="${place.id}">View Details</button>
      `;

      // Redirection vers place.html avec l'ID dans l'URL
      card.querySelector('.details-button').addEventListener('click', () => {
        window.location.href = `place.html?id=${place.id}`;
      });

      return card;
    }

    // Appel API : récupération des lieux
    fetch('http://127.0.0.1:5000/api/v1/places/')
      .then(res => res.json())
      .then(data => {
        placesList.innerHTML = '';
        const prices = new Set();  // Pour les différentes tranches de prix

        data.forEach(place => {
          const card = createPlaceCard(place);
          placesList.appendChild(card);
          prices.add(Math.ceil(place.price));  // Ajoute le prix à l'ensemble
        });

        // Génère les options de filtre de prix dynamiquement
        [...prices].sort((a, b) => a - b).forEach(price => {
          const option = document.createElement('option');
          option.value = price;
          option.textContent = `≤ ${price}€`;
          priceFilter.appendChild(option);
        });

        // Applique le filtre au changement
        priceFilter.addEventListener('change', () => {
          const max = parseFloat(priceFilter.value);
          Array.from(placesList.children).forEach(card => {
            const priceText = card.querySelector('p').textContent;
            const match = priceText.match(/(\d+(\.\d+)?)/);  // Extrait le prix
            const price = match ? parseFloat(match[0]) : 0;
            card.style.display = price <= max ? 'block' : 'none';
          });
        });
      })
      .catch(error => {
        console.error('Failed to fetch places:', error);
        placesList.innerHTML = `<p class="error">Failed to load places.</p>`;
      });
  }

  // ---------------------
  // PAGE : place.html
  // ---------------------
  if (placeId && window.location.pathname.includes('place.html')) {
    const placeDetailsSection = document.getElementById('place-details');  // Section des infos du lieu
    const reviewsSection = document.getElementById('reviews');             // Section des avis

    // Appel API : récupérer les infos détaillées du lieu
    fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`)
      .then(response => response.json())
      .then(place => {
        placeDetailsSection.innerHTML = `
          <div class="place-info">
            <h2>${place.title}</h2>
            <p>${place.description}</p>
            <p><strong>Price:</strong> ${place.price}€</p>
            <p><strong>Latitude:</strong> ${place.latitude}</p>
            <p><strong>Longitude:</strong> ${place.longitude}</p>
          </div>
        `;
      });

    // Appel API : récupérer les avis pour ce lieu
    fetch(`http://127.0.0.1:5000/api/v1/reviews/places/${placeId}/reviews`)
      .then(response => response.json())
      .then(reviews => {
        if (reviews.length === 0) {
          reviewsSection.innerHTML = "<p>No reviews yet.</p>";
          return;
        }

        // Affiche chaque avis comme une "carte"
        reviews.forEach(review => {
          const reviewCard = document.createElement('div');
          reviewCard.className = 'review-card';
          reviewCard.innerHTML = `
            <p><strong>Rating:</strong> ${review.rating}/5</p>
            <p>${review.text}</p>
          `;
          reviewsSection.appendChild(reviewCard);
        });
      });
  }
});