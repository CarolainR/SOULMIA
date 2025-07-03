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

    // Lógica para bloquear el acceso al módulo 2
    const btnModulo2 = document.querySelector('a[href="../vistas/modulo2.html"]');
    const cardModulo2 = btnModulo2 ? btnModulo2.closest('.modulo-card-n1') : null;
    const estadoBloqueadoModulo2 = cardModulo2 ? cardModulo2.querySelector('.estado-bloqueado') : null;

    if (isLoggedIn) {
        // Leer usuario activo y su progreso
        const user = JSON.parse(localStorage.getItem('user'));
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioActivo = usuarios.find(u => u.email === user.email);
        let estadoModulo1 = usuarioActivo && usuarioActivo.progresoModulos ? usuarioActivo.progresoModulos[1] : null;
        let estadoModulo2 = usuarioActivo && usuarioActivo.progresoModulos ? usuarioActivo.progresoModulos[2] : null;

        if (estadoModulo1 === 'completado') {
            if (estadoCompletado) estadoCompletado.style.display = 'block';
            if (estadoProgreso) estadoProgreso.style.display = 'none';
            // Habilitar acceso a módulo 2
            if (btnModulo2) {
                btnModulo2.classList.remove('disabled');
                btnModulo2.style.pointerEvents = '';
                btnModulo2.style.opacity = '';
                btnModulo2.href = '../vistas/modulo2.html';
            }
            if (estadoBloqueadoModulo2) estadoBloqueadoModulo2.style.display = 'none';
        } else {
            // Bloquear acceso a módulo 2
            if (btnModulo2) {
                btnModulo2.classList.add('disabled');
                btnModulo2.style.pointerEvents = 'none';
                btnModulo2.style.opacity = '0.5';
                btnModulo2.removeAttribute('href');
            }
            if (estadoBloqueadoModulo2) estadoBloqueadoModulo2.style.display = 'block';
        }

        if (estadoModulo1 === 'en-progreso') {
            if (estadoCompletado) estadoCompletado.style.display = 'none';
            if (estadoProgreso) estadoProgreso.style.display = 'block';
        } else if (estadoModulo1 !== 'completado') {
            if (estadoCompletado) estadoCompletado.style.display = 'none';
            if (estadoProgreso) estadoProgreso.style.display = 'none';
        }
    } else {
        // Si no está logueado, ocultar ambos estados y bloquear módulo 2
        if (estadoCompletado) estadoCompletado.style.display = 'none';
        if (estadoProgreso) estadoProgreso.style.display = 'none';
        if (btnModulo2) {
            btnModulo2.classList.add('disabled');
            btnModulo2.style.pointerEvents = 'none';
            btnModulo2.style.opacity = '0.5';
            btnModulo2.removeAttribute('href');
        }
        if (estadoBloqueadoModulo2) estadoBloqueadoModulo2.style.display = 'block';
    }
}); 