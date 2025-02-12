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

    // Guardar datos en localStorage
    localStorage.setItem('user', JSON.stringify({
        fullName: fullName,
        email: email,
        password: password
    }));
    
    alert('Registro exitoso');
    window.location.href = './login.html'; // Redirigir al login después del registro
});


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
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Aquí deberías validar las credenciales del usuario
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    // Guardar información en localStorage
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ username, email }));
    
    // Redirigir 
    window.location.href = './index.html';
});
