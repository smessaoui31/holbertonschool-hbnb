document.addEventListener('DOMContentLoaded', async () => {
    const placesList = document.getElementById('places-list');

    try {
        const response = await fetch('http://localhost:5000/api/v1/places/');
        const places = await response.json();

        places.forEach(place => {
            const card = document.createElement('div');
            card.className = 'place-card';

            card.innerHTML = `
                <h2>${place.title}</h2>
                <p>€${place.price} per night</p>
                <button class="details-button" onclick="viewDetails('${place.id}')">View Details</button>
            `;

            placesList.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching places:', error);
        placesList.innerHTML = '<p>Unable to load places. Please try again later.</p>';
    }
});

function viewDetails(placeId) {
    window.location.href = `place.html?id=${placeId}`;
}