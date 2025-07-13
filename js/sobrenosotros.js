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

    // Bootstrap maneja automáticamente el menú hamburguesa
    // No necesitamos JavaScript adicional para esto
});

// Función para el menú de perfil
function toggleProfileMenu() {
    console.log('toggleProfileMenu llamado');
    const profileMenuContent = document.getElementById('profileMenuContent');
    if (profileMenuContent) {
        const isVisible = profileMenuContent.classList.contains('show') || profileMenuContent.style.display === 'block';
        
        if (isVisible) {
            profileMenuContent.classList.remove('show');
            profileMenuContent.style.display = 'none';
            console.log('Menú de perfil oculto');
        } else {
            profileMenuContent.classList.add('show');
            profileMenuContent.style.display = 'block';
            console.log('Menú de perfil visible');
        }
    } else {
        console.error('No se encontró profileMenuContent');
    }
}

// Cerrar menú de perfil al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const profileMenu = document.querySelector('.profileMenu');
    const profileMenuContent = document.getElementById('profileMenuContent');
    
    if (profileMenu && profileMenuContent) {
        if (!profileMenu.contains(event.target)) {
            profileMenuContent.classList.remove('show');
            profileMenuContent.style.display = 'none';
        }
    }
});

// El resto del código de login no es necesario aquí para sobrenosotros.html
