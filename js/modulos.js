// greeting user

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.email || user.username; // Ajusta según el formato del usuario
            greetingDiv.style.display = 'block';
        }
    }

    if (!isLoggedIn && greetingDiv) {
        greetingDiv.style.display = 'none';
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
            window.location.href = '../index.html'; // Redirigir al index después del logout
        });
    }

    // Ocultar links de nav si no hay sesión
    if (!isLoggedIn) {
        const linksToHide = [
            document.querySelector('.nav-link2'), // Biblioteca
            document.querySelector('.nav-link3'), // Calificaciones
            document.querySelector('.nav-link4')  // Dashboard
        ];
        linksToHide.forEach(link => {
            if (link) link.style.display = 'none';
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

document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const modulos = document.querySelectorAll('.contMod button, .contMod2 button');

    if (!isLoggedIn) {
        modulos.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.querySelector('a').removeAttribute('href'); // quita el link para que no redirija
        });
    }
});
