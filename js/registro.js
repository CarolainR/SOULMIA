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

    // Inicializar progreso de módulos
    const progresoModulos = {
        1: 'desbloqueado',
        2: 'bloqueado',
        3: 'bloqueado',
        4: 'bloqueado',
        5: 'bloqueado',
        6: 'bloqueado',
        7: 'bloqueado',
        8: 'bloqueado'
    };

    usuarios.push({
        fullName: fullName,
        email: email,
        password: password,
        userLogged: false,
        progreso: 0,
        progresoModulos: progresoModulos
    });

    // Guardar datos en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso');
    window.location.href = './login.html';
});

