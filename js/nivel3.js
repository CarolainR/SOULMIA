document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!isLoggedIn) {
        // Ocultar los links de biblioteca, calificaciones y dashboard
        const links = [
            document.querySelector('.nav-link2'), // biblioteca
            document.querySelector('.nav-link3'), // calificaciones
            document.querySelector('.nav-link4')  // dashboard
        ];
        links.forEach(link => {
            if (link) {
                link.style.display = 'none';
            }
        });
    }
});
