function getFlights(city) {
    const url = `http://localhost:8080/api/flights/departure/${city}`;

    // Mostrar placeholders antes de cargar los datos reales
    showLoadingPlaceholders();

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayFlights(data);
    })
    .catch(error => console.error('Error al obtener los vuelos:', error));
}

function showLoadingPlaceholders() {
    const flightsContainer = document.getElementById("flightsList");
    flightsContainer.innerHTML = ''; // Limpiar contenido previo

    // Crear 3 placeholders de ejemplo
    for (let i = 0; i < 3; i++) {
        const placeholderCard = document.createElement("div");
        placeholderCard.classList.add("col-md-4", "mb-3"); // Estilo de Bootstrap

        placeholderCard.innerHTML = `
            <div class="card" aria-hidden="true">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                    </p>
                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                </div>
            </div>
        `;
        flightsContainer.appendChild(placeholderCard);
    }
}

function displayFlights(flights) {
    const flightsContainer = document.getElementById("flightsList");
    flightsContainer.innerHTML = ''; // Limpiar placeholders

    flights.forEach(flight => {
        // Crear el contenedor para cada vuelo
        const flightCard = document.createElement("div");
        flightCard.classList.add("col-md-4", "mb-3"); // Estilo de Bootstrap

        flightCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h4>Vuelos Disponibles:</h4>
                    <h5>${flight.flightNumber} - De ${flight.departure} a ${flight.destination}</h5>
                    <h5>Salida: ${new Date(flight.departureTime).toLocaleString()}</h5>
                    <h5>Llegada: ${new Date(flight.arrivalTime).toLocaleString()}</h5>
                    <input type="number" id="seats-${flight.id}" placeholder="Número de asientos" min="1" max="${flight.availableSeats}" class="form-control mb-2">
                    <small id="error-msg-${flight.id}" class="text-danger" style="display:none;">Número de asientos no disponibles. Elija una cantidad menor.</small>
                    <button class="btn btn-primary" onclick="validateSeats(${flight.id}, ${flight.availableSeats}, '${flight.departureTime}')">Reservar</button>
                </div>
            </div>
        `;

        flightsContainer.appendChild(flightCard);
    });

    // Mostrar el contenedor oculto
    document.getElementById("flights").style.display = "block";
}

function validateSeats(flightId, availableSeats, flightNumber, departure, destination, departureTime, arrivalTime) {
    const seatsInput = document.getElementById(`seats-${flightId}`);
    const requestedSeats = parseInt(seatsInput.value);
    const errorMsg = document.getElementById(`error-msg-${flightId}`);

    if (requestedSeats > availableSeats || requestedSeats <= 0) {
        errorMsg.style.display = 'block'; // Mostrar error si el número de asientos es inválido
    } else {
        errorMsg.style.display = 'none';
        // Llamamos a goToCheckout con todos los parámetros requeridos
        goToCheckout(flightId, flightNumber, departure, destination, departureTime, arrivalTime, requestedSeats);
    }
}


function goToCheckout(flightId, flightNumber, departure, destination, departureTime, arrivalTime, seats) {
    // Guardamos los datos del vuelo en localStorage
    localStorage.setItem('flightId', flightId);
    localStorage.setItem('flightNumber', flightNumber);
    localStorage.setItem('departure', departure);
    localStorage.setItem('destination', destination);
    localStorage.setItem('departureTime', departureTime);
    localStorage.setItem('arrivalTime', arrivalTime);
    localStorage.setItem('seats', seats);

    // Calculamos el total
    const total = 200 * seats;
    localStorage.setItem('total', total);

    // Redirigimos al usuario a la página de checkout
    window.location.href = 'cobros.html';
}


/*
function reserveFlight(flightId, departureTime) {
    const seats = document.getElementById(`seats-${flightId}`).value;
    const userId = 1; // userId para pruebas

    if (seats > 0) {
        const reservationData = {
            flightId: flightId,
            userId: userId,
            departureTime: departureTime,
            seats: seats
        };

        fetch('http://localhost:8080/api/sales/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(response => {
            // Si la respuesta es correcta (200-299), devolvemos el JSON
            if (response.ok) {
                return response.json(); // Procesamos el éxito
            } else {
                // Si hay un error, tomamos el texto del cuerpo de la respuesta
                return response.text().then((message) => {
                    throw new Error(message); // Lanzamos el mensaje de error
                });
            }
        })
        .then(data => {
            console.log('Reserva exitosa:', data);
            alert('¡Reserva realizada con éxito!');
        })
        .catch(error => {
            // Mostrar el mensaje de error proveniente del backend
            console.error('Error al hacer la reserva:', error);
            alert(error.message); // Mostrar el mensaje al usuario
        });
    } else {
        alert('Por favor, selecciona un número válido de asientos');
    }
}*/

