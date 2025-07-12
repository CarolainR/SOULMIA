/*
 1. cuando inicie sesion, no se vea registro, solo logout.
 2. Al hacer logout vuelva a aparecer en el profilemenu  login y registro
 3. Al hacer click al logo, links e iconos me redireccionen a lo que informa, es decir, si doy click al icono de whatsApp me direccione al whatsApp de la empresa,
 4. En sobre nosotros ira la revista virtual en 3D
 5.
 6.
*/

// Función para toggle del menú de perfil
function toggleProfileMenu() {
    console.log('toggleProfileMenu ejecutado');
    const profileMenuContent = document.getElementById('profileMenuContent');
    if (profileMenuContent) {
        console.log('profileMenuContent encontrado');
        const currentDisplay = profileMenuContent.style.display;
        console.log('display actual:', currentDisplay);
        profileMenuContent.style.display = currentDisplay === 'block' ? 'none' : 'block';
        console.log('nuevo display:', profileMenuContent.style.display);
    } else {
        console.log('profileMenuContent NO encontrado');
    }
}

// TEST - Verificar que el JavaScript se está cargando
console.log('app.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function () {
    // Agregar event listener adicional al icono de perfil
    const profileIcon = document.querySelector('.profileIcon');
    if (profileIcon) {
        console.log('profileIcon encontrado, agregando event listener');
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleProfileMenu();
        });
    } else {
        console.log('profileIcon NO encontrado');
    }
    // Obtener el formulario de login
    const loginForm = document.querySelector('.loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Obtener los valores ingresados en los campos de correo y contraseña
            const emailInput = document.querySelector('.correo');
            const passwordInput = document.querySelector('.contraseña');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validar que los campos no estén vacíos
            if (!email || !password) {
                alert('Por favor, ingrese su correo y contraseña');
                return;
            }

            // Obtener la lista de usuarios almacenados en localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            // Buscar un usuario que coincida con el correo y la contraseña ingresados
            const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);
            
            if (usuarioEncontrado) {
                // Guardar la sesión del usuario en localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
                alert(`Bienvenido, ${usuarioEncontrado.email}`);
                window.location.href = 'index.html'; // Redirigir a la página principal
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }

    // Manejar el saludo del usuario
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');
     console.log(greetingDiv)
    
    
    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.fullName || user.email;
            greetingDiv.style.display = 'block';
        } else {
            greetingDiv.classList.add('d-none')
        }
    } else {
        greetingDiv.classList.add('d-none') //aqui me ayuda a ocultar la clase de boostrap que le daba color al div de saludo classlist .add es para las clases de boostrap
    }

    // Manejar el logout (cerrar sesión)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = isLoggedIn ? 'block' : 'none';

        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // Eliminar la sesión del usuario de localStorage
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            greetingDiv.style.display = 'none'; // Ocultar saludo
            alert('Has cerrado sesión exitosamente');
            window.location.href = 'index.html'; // Redirigir a la página principal
        });
    }
    // Obtener el formulario de registro
    const registerForm = document.querySelector('.registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Obtener los valores ingresados en los campos de correo y contraseña
            const emailInput = document.querySelector('.correo');
            const passwordInput = document.querySelector('.contraseña');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validar que los campos no estén vacíos
            if (!email || !password) {
                alert('Por favor, complete todos los campos');
                return;
            }

            // Obtener la lista de usuarios almacenados en localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar si el usuario ya existe
            const usuarioExistente = usuarios.find(user => user.email === email);
            if (usuarioExistente) {
                alert('El correo ya está registrado');
                return;
            }

            // Crear el nuevo usuario y guardarlo en localStorage
            const nuevoUsuario = { email, password };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Registro exitoso. Ahora puede iniciar sesión.');
            window.location.href = 'login.html'; // Redirigir a la página de login
        });
    }
});

/* // BLOQUEAR PAGINAS BIBLIOTECA Y CALIFICACIONES SI NO ESTA REGISTRADO NI LOGGEADO
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    // Lista de páginas restringidas
    const paginasRestringidas = [
        './vistas/biblioteca.html',
        './vistas/calificaciones.html'
    ];

    // Verificar si el usuario está intentando acceder a una de las páginas restringidas sin estar logueado
    if (!isLoggedIn) {
        const paginaActual = window.location.pathname.split('/').pop(); // Obtiene solo el nombre del archivo
        if (paginasRestringidas.includes(paginaActual)) {
            alert('Debes iniciar sesión para acceder a esta página.');
            window.location.href = 'login.html'; // Redirige al login
        }
    }
}); */

document.addEventListener('DOMContentLoaded', function () {
    const calificaciones = document.querySelector('.calificaciones');
    const biblioteca = document.querySelector('.biblioteca');
    const dashboard = document.querySelector('.dashboard')
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
        calificaciones.style.display = 'block';
        biblioteca.style.display = 'block';
        dashboard.style.display = 'block';
    } else {
        calificaciones.style.display = 'none';
        biblioteca.style.display = 'none';
        dashboard.style.display = 'none'
    }
});

// Animación para la sección about
document.addEventListener('DOMContentLoaded', function() {
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    if (aboutText) observer.observe(aboutText);
    if (aboutImage) observer.observe(aboutImage);
});

// --- MENÚ DE PERFIL: mostrar debajo del icono de perfil ---
function toggleProfileMenu() {
    const profileIcon = document.querySelector('.profileIcon');
    const menu = document.getElementById('profileMenuContent');
    if (!menu || !profileIcon) return;

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        return;
    }

    // Mostrar temporalmente para medir el ancho
    menu.style.display = 'block';
    menu.style.visibility = 'hidden';

    const rect = profileIcon.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    const top = rect.bottom + scrollY + 4;
    let left = rect.right - menu.offsetWidth + scrollX;

    // Si el menú se sale por la izquierda, lo alineamos al borde izquierdo del icono
    if (left < 0) left = rect.left + scrollX;
    // Si el menú se sale por la derecha, lo ajustamos al borde derecho de la ventana
    if (left + menu.offsetWidth > window.innerWidth) left = window.innerWidth - menu.offsetWidth - 8;

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
    menu.style.right = '';
    menu.style.visibility = 'visible';
}

// Ocultar el menú si se hace click fuera
window.addEventListener('click', function(e) {
    const menu = document.getElementById('profileMenuContent');
    const profileIcon = document.querySelector('.profileIcon');
    if (!menu || !profileIcon) return;
    if (!menu.contains(e.target) && !profileIcon.contains(e.target)) {
        menu.style.display = 'none';
    }
});