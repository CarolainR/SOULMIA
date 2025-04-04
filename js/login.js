
document.addEventListener('DOMContentLoaded', function (){
    //obtener el formulario de login
    const loginForm = document.querySelector('.loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event){
            event.preventDefault();

            //obtener los valores ingresados en los campos de correo y contraseña
            const emailInput = document.querySelector('.correo');
            const passwordInput = document.querySelector('.contraseña');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            //Validar que los campos no esten vacios

            if (!email || !password) {
                alert('Ingresa tu correo y contraseña para iniciar sesión');
                return;
            }

            // Obtener la lista de usuarios almacenados en localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            console.log(localStorage.getItem('usuarios'));

            // Buscar un usuario que coincida con el correo y la contraseña ingresados
            const usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

            if (usuarioEncontrado) {
                //Guardar la sesión del usuario en localStorage
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
                alert(`Bienvenido, ${usuarioEncontrado.email}`);
                window.location.href = '../index.html'; // Redirigir a la página principal

            } else {
                alert('Correo o contraseña incorrectos')
            }
        });
    }
    //greeting user
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            //Mostrar nombre de usuario o correo en el saludo
            usernameSpan.textContent = user.fullName || user.email;
            greetingDiv.style.display = 'block';
        }
    }

    //logout

    const logoutBtn = document.getElementById('logoutBtn')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // Eliminar la sesión del usuario de localStorage
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            greetingDiv.style.display = 'none'; // Ocultar saludo
            alert('Has cerrado sesión exitosamente');
            window.location.href = '../index.html'; // Redirigir a la página principal
        });
    }
});

/* let usuarios = JSON.parse(localStorage.getItem("user")) || [];

document.querySelector('.btn').addEventListener('submit', function(event) {
    event.preventDefault();

   // Aquí deberías validar las credenciales del usuario
   const username = document.getElementById('email').value;
   const password = document.getElementById('password').value;

    for (let i = 0; i < usuarios.length; i++) {

        if(usuarios [i].username.value.trim()&& usuarios[i].userP === password.value.trim())
        {
            //localStorage.setItem para usuario activo y JSON.stringify para usuarios encontrados
            alert(`Bienvenido, ${usuarios[i].username}!`);
            window.location.href = "../index.html";
            usuarios[i].logged = true;
            console.log(usuarios)
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            return
        }
    }
    
    // Guardar información del usuario en localStorage
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ username, email }));
    
    // Redirigir al usuario a la página principal o donde desees
    window.location.href = './index.html';
}); */
