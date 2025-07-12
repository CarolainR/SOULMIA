// greeting user

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    // Lógica para mostrar/ocultar links del navbar según login
    const linkModulos = document.querySelector('a[href="../vistas/modulos.html"]');
    const linkBiblioteca = document.querySelector('a[href="../vistas/biblioteca.html"]');
    const linkCalificaciones = document.querySelector('a[href="../vistas/calificaciones.html"]');
    const linkDashboard = document.querySelector('a[href="../vistas/dashboard.html"]');

    if (isLoggedIn) {
        // Mostrar links de usuario loggeado
        if (linkBiblioteca) linkBiblioteca.parentElement.style.display = '';
        if (linkCalificaciones) linkCalificaciones.parentElement.style.display = '';
        if (linkDashboard) linkDashboard.parentElement.style.display = '';
        // Ocultar solo Módulos si quieres que desaparezca cuando hay login:
        // linkModulos.parentElement.style.display = 'none';
        // Si quieres que Módulos siempre esté visible, comenta la línea anterior
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.email || user.username;
            greetingDiv.style.display = 'block';
        }
    } else {
        // Ocultar links de usuario loggeado
        if (linkBiblioteca) linkBiblioteca.parentElement.style.display = 'none';
        if (linkCalificaciones) linkCalificaciones.parentElement.style.display = 'none';
        if (linkDashboard) linkDashboard.parentElement.style.display = 'none';
        // Mostrar solo Módulos
        if (linkModulos) linkModulos.parentElement.style.display = '';
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
});

// El resto del código de login no es necesario aquí para sobrenosotros.html
