// Helper pour lire un cookie par son nom
function getCookie(name) {
  const cookieStr = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return cookieStr ? decodeURIComponent(cookieStr.split('=')[1]) : null;
}

// 🔧 Supprimer un cookie
function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// Vérifie et affiche l'utilisateur connecté
async function checkUserAuthentication() {
  const token = getCookie('token');
  const userDisplay = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-button');
  const loginBtn = document.querySelector('.login-button');

  if (!token) {
    // Redirige vers login si aucune session
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
      loginBtn.style.display = 'inline';
      userDisplay.style.display = 'none';
      logoutBtn.style.display = 'none';
    }
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:5000/api/v1/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      const user = await res.json();
      if (userDisplay) {
        userDisplay.textContent = `Welcome, ${user.first_name}`;
        userDisplay.style.display = 'inline';
      }
      if (logoutBtn) logoutBtn.style.display = 'inline';
      if (loginBtn) loginBtn.style.display = 'none';
    } else {
      deleteCookie('token');
      window.location.href = 'login.html';
    }
  } catch (err) {
    console.error('Auth check failed:', err);
    deleteCookie('token');
    window.location.href = 'login.html';
  }
}

// Logout
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      deleteCookie('token');
      window.location.href = 'login.html';
    });
  }
});

// Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMessage = document.getElementById('error-message');

      try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          document.cookie = `token=${data.access_token}; path=/`;
          window.location.href = 'index.html';
        } else {
          errorMessage.textContent = data.error || 'Login failed.';
        }
      } catch (err) {
        console.error('Login error:', err);
        errorMessage.textContent = 'Connection failed.';
      }
    });
  }
});

// Affichage des "places" dans index.html
document.addEventListener('DOMContentLoaded', () => {
  const placesList = document.getElementById('places-list');
  const priceFilter = document.getElementById('price-filter');

  if (placesList) {
    fetch('http://127.0.0.1:5000/api/v1/places/')
      .then(res => res.json())
      .then(data => {
        placesList.innerHTML = '';
        const prices = new Set();

        data.forEach(place => {
          const card = document.createElement('div');
          card.className = 'place-card';
          card.innerHTML = `
            <h3>${place.title}</h3>
            <p><strong>Price:</strong> ${place.price}€ / night</p>
            <button class="details-button" data-id="${place.id}">View Details</button>
          `;
          card.querySelector('.details-button').addEventListener('click', () => {
            window.location.href = `place.html?id=${place.id}`;
          });
          placesList.appendChild(card);
          prices.add(Math.ceil(place.price));
        });

        [...prices].sort((a, b) => a - b).forEach(price => {
          const option = document.createElement('option');
          option.value = price;
          option.textContent = `≤ ${price}€`;
          priceFilter.appendChild(option);
        });

        priceFilter.addEventListener('change', () => {
          const max = parseFloat(priceFilter.value);
          Array.from(placesList.children).forEach(card => {
            const priceText = card.querySelector('p').textContent;
            const match = priceText.match(/(\d+(\.\d+)?)/);
            const price = match ? parseFloat(match[0]) : 0;
            card.style.display = price <= max ? 'block' : 'none';
          });
        });
      })
      .catch(err => {
        console.error('Failed to fetch places:', err);
        placesList.innerHTML = `<p class="error">Failed to load places.</p>`;
      });
  }
});

// Affichage des détails d’un lieu dans place.html
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = urlParams.get('id');

  if (placeId && window.location.pathname.includes('place.html')) {
    const placeDetailsSection = document.getElementById('place-details');
    const reviewsSection = document.getElementById('reviews');

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

    fetch(`http://127.0.0.1:5000/api/v1/reviews/places/${placeId}/reviews`)
      .then(response => response.json())
      .then(reviews => {
        if (reviews.length === 0) {
          reviewsSection.innerHTML = "<p>No reviews yet.</p>";
          return;
        }

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

// ✅ Exécuter la vérification de session
document.addEventListener('DOMContentLoaded', checkUserAuthentication);