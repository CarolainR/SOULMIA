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

    // Selección de links
    const linkModulos = document.querySelector('a[href="../vistas/modulos.html"]');
    const linkBiblioteca = document.querySelector('a[href="../vistas/biblioteca.html"]');
    const linkCalificaciones = document.querySelector('a[href="../vistas/calificaciones.html"]');
    const linkDashboard = document.querySelector('a[href="../vistas/dashboard.html"]');
    const linkSobreNosotros = document.querySelector('a[href="../vistas/sobrenosotros.html"]');

    // Ocultar todos los links de usuario loggeado por defecto
    if (linkBiblioteca) linkBiblioteca.parentElement.style.display = 'none';
    if (linkCalificaciones) linkCalificaciones.parentElement.style.display = 'none';
    if (linkDashboard) linkDashboard.parentElement.style.display = 'none';

    // Mostrar solo Módulos y Sobre Nosotros por defecto
    if (linkModulos) linkModulos.parentElement.style.display = '';
    if (linkSobreNosotros) linkSobreNosotros.parentElement.style.display = '';

    if (isLoggedIn) {
        // Mostrar links de usuario loggeado
        if (linkBiblioteca) linkBiblioteca.parentElement.style.display = '';
        if (linkCalificaciones) linkCalificaciones.parentElement.style.display = '';
        if (linkDashboard) linkDashboard.parentElement.style.display = '';
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
            btn.querySelector('a').removeAttribute('href');
        });
        return;
    }

    // Leer usuario logueado y su progreso
    const user = JSON.parse(localStorage.getItem('user'));
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioActivo = usuarios.find(u => u.email === user.email);
    const progreso = usuarioActivo && usuarioActivo.progresoModulos ? usuarioActivo.progresoModulos : {};

    // Cards y botones de Módulos
    const cards = document.querySelectorAll('.col-lg-4.col-md-6');
    for (let i = 1; i <= 8; i++) {
        const card = cards[i-1];
        if (!card) continue;
        const btnModulo = card.querySelector('a.btn');
        if (!btnModulo) continue;
        let estado = progreso[i];
        if (estado === 'completado') {
            btnModulo.textContent = 'Completado';
            btnModulo.classList.remove('btn-primary', 'btn-warning', 'btn-secondary');
            btnModulo.classList.add('btn-success');
            btnModulo.disabled = true;
        } else if (estado === 'en-progreso') {
            btnModulo.textContent = 'En progreso';
            btnModulo.classList.remove('btn-primary', 'btn-success', 'btn-secondary');
            btnModulo.classList.add('btn-warning');
            btnModulo.disabled = false;
            btnModulo.href = `../vistas/nivel${Math.ceil(i/3)}.html`;
        } else if (estado === 'desbloqueado') {
            btnModulo.textContent = 'Desbloqueado';
            btnModulo.classList.remove('btn-success', 'btn-warning', 'btn-secondary');
            btnModulo.classList.add('btn-primary');
            btnModulo.disabled = false;
            btnModulo.href = `../vistas/nivel${Math.ceil(i/3)}.html`;
            // Solo para módulo 1: al hacer clic, poner en progreso
            if (i === 1) {
                btnModulo.addEventListener('click', function(e) {
                    // Cambiar estado a en-progreso solo si no lo está ya
                    if (usuarioActivo.progresoModulos[1] !== 'en-progreso') {
                        usuarioActivo.progresoModulos[1] = 'en-progreso';
                        localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    }
                });
            }
        } else {
            btnModulo.textContent = 'Bloqueado';
            btnModulo.classList.remove('btn-primary', 'btn-success', 'btn-warning');
            btnModulo.classList.add('btn-secondary');
            btnModulo.disabled = true;
            btnModulo.href = '#';
        }
    }

    // Mantener la lógica de repetirExamenModuloX para los exámenes
    // Estado de aprobación de exámenes
    const aprobadoExamen1 = localStorage.getItem('repetirExamenModulo1') === 'false';
    const aprobadoExamen2 = localStorage.getItem('repetirExamenModulo2') === 'false';
    const aprobadoExamen3 = localStorage.getItem('repetirExamenModulo3') === 'false';
    const aprobadoExamen6 = localStorage.getItem('repetirExamenModulo6') === 'false';

    // Botones de nivel
    const btnNivel2 = document.querySelector('a[href="../vistas/nivel2.html"]');
    const btnNivel3 = document.querySelector('a[href="../vistas/nivel3.html"]');

    // Card 1: asegurar clases iniciales
    const card1 = document.querySelectorAll('.col-lg-4.col-md-6')[0];
    const btnModulo1 = card1 ? card1.querySelector('a.btn') : null;

    // Card 1
    if (aprobadoExamen1) {
        if (btnModulo1) {
            btnModulo1.textContent = 'Completado';
            btnModulo1.classList.remove('btn-primary', 'btn-warning');
            btnModulo1.classList.add('btn-success');
            btnModulo1.disabled = true;
        }
        // Card 2: En progreso si examen 1 aprobado
        const card2 = document.querySelectorAll('.col-lg-4.col-md-6')[1];
        const btnModulo2 = card2 ? card2.querySelector('a.btn') : null;
        if (aprobadoExamen2) {
            btnModulo2.textContent = 'Completado';
            btnModulo2.classList.remove('btn-primary', 'btn-warning');
            btnModulo2.classList.add('btn-success');
            btnModulo2.disabled = true;
        } else {
            btnModulo2.textContent = 'En progreso';
            btnModulo2.classList.remove('btn-primary', 'btn-secondary');
            btnModulo2.classList.add('btn-warning');
            btnModulo2.disabled = false;
            btnModulo2.href = '../vistas/nivel2.html';
        }
        // Card 3: Bloqueado si examen 2 no aprobado
        const card3 = document.querySelectorAll('.col-lg-4.col-md-6')[2];
        const btnModulo3 = card3 ? card3.querySelector('a.btn') : null;
        if (aprobadoExamen2) {
            if (aprobadoExamen3) {
                btnModulo3.textContent = 'Completado';
                btnModulo3.classList.remove('btn-primary', 'btn-warning');
                btnModulo3.classList.add('btn-success');
                btnModulo3.disabled = true;
            } else {
                btnModulo3.textContent = 'En progreso';
                btnModulo3.classList.remove('btn-primary', 'btn-secondary');
                btnModulo3.classList.add('btn-warning');
                btnModulo3.disabled = false;
                btnModulo3.href = '../vistas/nivel3.html';
            }
        } else {
            btnModulo3.textContent = 'Bloqueado';
            btnModulo3.classList.remove('btn-primary', 'btn-warning');
            btnModulo3.classList.add('btn-secondary');
            btnModulo3.disabled = true;
            btnModulo3.href = '#';
        }
    } else {
        if (btnModulo1) {
            btnModulo1.textContent = 'En progreso';
            btnModulo1.classList.remove('btn-primary', 'btn-success');
            btnModulo1.classList.add('btn-warning');
            btnModulo1.disabled = false;
            btnModulo1.href = '../vistas/nivel1.html';
        }
        // Si examen 1 no aprobado, bloquear 2 y 3
        if (btnModulo2) {
            btnModulo2.textContent = 'Bloqueado';
            btnModulo2.classList.remove('btn-primary', 'btn-warning');
            btnModulo2.classList.add('btn-secondary');
            btnModulo2.disabled = true;
            btnModulo2.href = '#';
        }
        if (btnModulo3) {
            btnModulo3.textContent = 'Bloqueado';
            btnModulo3.classList.remove('btn-primary', 'btn-warning');
            btnModulo3.classList.add('btn-secondary');
            btnModulo3.disabled = true;
            btnModulo3.href = '#';
        }
    }

    // Botón Nivel 2: solo si examen 3 aprobado
    if (btnNivel2) {
        if (aprobadoExamen3) {
            btnNivel2.classList.remove('btn-secondary');
            btnNivel2.classList.add('btn-primary');
            btnNivel2.disabled = false;
            btnNivel2.href = '../vistas/nivel2.html';
        } else {
            btnNivel2.classList.remove('btn-primary');
            btnNivel2.classList.add('btn-secondary');
            btnNivel2.disabled = true;
            btnNivel2.href = '#';
        }
    }
    // Botón Nivel 3: solo si examen 6 aprobado
    if (btnNivel3) {
        if (aprobadoExamen6) {
            btnNivel3.classList.remove('btn-secondary');
            btnNivel3.classList.add('btn-primary');
            btnNivel3.disabled = false;
            btnNivel3.href = '../vistas/nivel3.html';
        } else {
            btnNivel3.classList.remove('btn-primary');
            btnNivel3.classList.add('btn-secondary');
            btnNivel3.disabled = true;
            btnNivel3.href = '#';
        }
    }
});
