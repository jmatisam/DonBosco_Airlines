// Register Form Submission
document.querySelector('.register_section form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.querySelector('.register_section input[placeholder="Username"]').value;
    let email = document.querySelector('.register_section input[placeholder="Email"]').value;
    let password = document.querySelector('.register_section input[placeholder="Password"]').value;
    let role = document.querySelector('.register_section input[placeholder="Rol"]').value;

    let registerData = {
        username: username,
        password: password,
        email: email,
        role: role // Assuming role is part of your registration
    };

    registerUser(registerData);
});

// Register user (Register function)
function registerUser(data) {
    fetch('http://localhost:8080/api/auth/register', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data =!null) {
            alert('Registration successful');
            window.location.href = "index.html"; // Redirigir
        } else {
            alert('Registration failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
