// greeting user

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    if (greetingDiv && usernameSpan) {
    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
                usernameSpan.textContent = user.fullName || user.email;
            greetingDiv.style.display = 'block';
            } else {
                greetingDiv.classList.add('d-none');
            }
        } else {
            greetingDiv.classList.add('d-none');
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
            window.location.href = '../index.html'; // Redirigir al index después del logout
        });
    }

    // ================= LÓGICA DE NOTAS DE MÓDULO 1 =================
    // Selecciona los divs de notas del Módulo 1 (los primeros 7)
    const notasModulo1Divs = document.querySelectorAll('.button-section:nth-child(1) .nota');
    // Mensaje de repetir examen
    const buttonSection1 = document.querySelector('.button-section:nth-child(1)');

    // Leer notas y bandera del localStorage
    const notasModulo1 = JSON.parse(localStorage.getItem('notasModulo1'));
    const repetirExamen = localStorage.getItem('repetirExamenModulo1') === 'true';

    if (notasModulo1 && Array.isArray(notasModulo1) && notasModulo1.length === 10) {
        // Hay notas guardadas
        for (let i = 0; i < notasModulo1Divs.length; i++) {
            if (notasModulo1[i] !== undefined) {
                notasModulo1Divs[i].textContent = notasModulo1[i];
            }
        }
    }

    // Mostrar mensaje si debe repetir el examen
    let notaMensaje = document.getElementById('nota-repetir-examen');
    if (repetirExamen) {
        if (!notaMensaje) {
            notaMensaje = document.createElement('div');
            notaMensaje.id = 'nota-repetir-examen';
            notaMensaje.textContent = 'Nota: Debes repetir el examen.';
            notaMensaje.style.color = '#BF0C73';
            notaMensaje.style.background = '#1a001a';
            notaMensaje.style.marginTop = '1.5em';
            notaMensaje.style.padding = '1em';
            notaMensaje.style.borderRadius = '10px';
            notaMensaje.style.textAlign = 'center';
            notaMensaje.style.fontWeight = 'bold';
            notaMensaje.style.boxShadow = '0 0 12px #8031B6, 0 0 24px #8031B6';
            buttonSection1.appendChild(notaMensaje);
        }
    } else {
        if (notaMensaje) {
            notaMensaje.remove();
        }
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
