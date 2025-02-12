document.querySelector('.btn').addEventListener('click', function() {
    const email = document.querySelector('.correo').value;
    const password = document.querySelector('.contraseña').value;

    // Obtener datos del localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert('Inicio de sesión exitoso');
        localStorage.setItem('loggedIn', 'true'); // Usuario autenticado
        window.location.href = '../index.html'; // Redirigir al index después del inicio de sesión
    } else {
        alert('Correo o contraseña incorrecta');
    }
});

    // greeting user

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.email || user.username;
            greetingDiv.style.display = 'block';
        }
    }

    //  logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            greetingDiv.style.display = 'none'; // Ocultar saludo
            alert('Has cerrado sesión exitosamente');
            window.location.href = '../index.html'; // Redirigir al index 
        });
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Aquí deberías validar las credenciales del usuario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    // Guardar información del usuario en localStorage
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ username, email }));
    
    // Redirigir al usuario a la página principal o donde desees
    window.location.href = './index.html';
});
