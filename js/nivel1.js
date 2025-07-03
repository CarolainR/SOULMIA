// greeting user

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.email || user.username;
            greetingDiv.style.display = 'block';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
    } else {
        if (greetingDiv) {
            greetingDiv.style.display = 'none';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }

    //  logout
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

    // Lógica para mostrar el estado de la card del módulo 1
    const estadoCompletado = document.getElementById('estado-modulo7');
    const estadoProgreso = document.getElementById('estado-modulo7-progreso');
    // Por compatibilidad, buscar también en el resto de la página
    // Si el usuario está logueado, mostrar el estado correspondiente
    if (isLoggedIn) {
        // Si el usuario ya aprobó el examen 1
        const aprobadoExamen1 = localStorage.getItem('repetirExamenModulo1') === 'false';
        if (aprobadoExamen1) {
            if (estadoCompletado) estadoCompletado.style.display = 'block';
            if (estadoProgreso) estadoProgreso.style.display = 'none';
        } else {
            // Si no ha aprobado, mostrar "En progreso"
            if (estadoCompletado) estadoCompletado.style.display = 'none';
            if (estadoProgreso) estadoProgreso.style.display = 'block';
        }
    } else {
        // Si no está logueado, ocultar ambos estados
        if (estadoCompletado) estadoCompletado.style.display = 'none';
        if (estadoProgreso) estadoProgreso.style.display = 'none';
    }
}); 