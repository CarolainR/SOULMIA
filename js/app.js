/*
 1. cuando inicie sesion, no se vea registro, solo logout.
 2. Al hacer logout vuelva a aparecer en el profilemenu  login y registro
 3. Al hacer click al logo, links e iconos me redireccionen a lo que informa, es decir, si doy click al icono de whatsApp me direccione al whatsApp de la empresa,
 4. En sobre nosotros ira la revista virtual en 3D
 5.
 6.
*/


    function toggleProfileMenu() {
        var profileMenu = document.getElementById("profileMenuContent");
        profileMenu.classList.toggle("open");
    }

    document.addEventListener('DOMContentLoaded', function() {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        const greetingDiv = document.getElementById('greeting');
        const usernameSpan = document.getElementById('username');
    
        if (isLoggedIn) {
            // Obtener nombre de usuario del localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                usernameSpan.textContent =  user.fullName; // Ajusta esto según el formato del usuario
                greetingDiv.style.display = 'block';
            }
        }
    
        // Manejo del logout
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























   