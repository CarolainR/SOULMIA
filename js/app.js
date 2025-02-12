
/*     window.onload = function() {
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            window.location.href = './';
        }
    };
 */
/* logout--------------------------------------------------------------------- */

/*     document.addEventListener('DOMContentLoaded', function() {
        const logoutBtn = document.getElementById('logoutBtn');
    
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar la acción por defecto del enlace
                localStorage.removeItem('loggedIn'); // Eliminar el estado de autenticación
                alert('Has cerrado sesión exitosamente');
                window.location.href = '../index.html'; 
            });
        }
    }); */
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
                usernameSpan.textContent = user.email || user.username; // Ajusta esto según el formato del usuario
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























   