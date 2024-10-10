// Login Form Submission
document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se recargue

    let name = document.querySelector('#name_addressFormControlInput').value;
    let password = document.querySelector('#Password_FormControlInput').value;

    let loginData = {
        username: name,
        password: password
    };

    authenticateUser(loginData); // Llamada a la función de autenticación
});

// Authenticate user (Login function)
function authenticateUser(data) {
    fetch('http://localhost:8080/api/auth/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Guardar token en localStorage y redirigir
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('username', name);
            console.log('Token guardado en localStorage:', localStorage.getItem('jwtToken'));
            alert('Login successful');
            window.location.href = "index.html"; // Cambiar redirección según sea necesario
        } else {
            alert('Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials.');
    });
}
