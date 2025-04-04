document.getElementById('registerBtn').addEventListener('click', function() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validación simple
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []


    //usamos .push para agregar elementos al array <user> del localstorage

    usuarios.push( {fullName: fullName,
        email: email,
        progreso: 0,
        password: password,
        userLogged: false,
        progreso: 0})

    // Guardar datos en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));


    alert('Registro exitoso');
window.location.href = './login.html';
});

