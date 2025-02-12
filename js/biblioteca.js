document.addEventListener('DOMContentLoaded', function() {
    const greetingDiv = document.getElementById('greeting');
    const usernameSpan = document.getElementById('username');

    /* Mostrar saludo al logueado */
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            usernameSpan.textContent = user.email || user.username;
            greetingDiv.style.display = 'block';
        }
    }

    // Manejar el logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            greetingDiv.style.display = 'none'; // Ocultar saludo
            alert('Has cerrado sesión exitosamente');
            window.location.href = '../index.html'; // Redirigir al index
        });
    }

    // Mostrar todos los elementos al cargar la página
    function loadAllItems() {
        const container = document.getElementById('contentContainer');
        mediosMixology.forEach(medio => {
            const item = document.createElement('div');
            item.className = 'row';

            item.innerHTML = `
                <img class="imgsColumns" src="${medio.image}" alt="${medio.titulo}">
                <p>${medio.titulo}</p>
                <div class="icons">
                    ${medio.medio === 'pdf' ? '<i class="fas fa-download"></i>' : '<i class="fas fa-play"></i>'}
                    <i class="fas fa-book"></i>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // Cargar todos los elementos inicialmente
    loadAllItems();

    // Función de búsqueda
    function searchFunction() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const container = document.getElementById('contentContainer');
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Filtrar y mostrar resultados
        mediosMixology.forEach(medio => {
            if (medio.titulo.toLowerCase().includes(filter)) {
                const item = document.createElement('div');
                item.className = 'row';
                
                item.innerHTML = `
                    <img class="imgsColumns" src="${medio.image}" alt="${medio.titulo}">
                    <p>${medio.titulo}</p>
                    <div class="icons">
                        ${medio.medio === 'pdf' ? '<i class="fas fa-download"></i>' : '<i class="fas fa-play"></i>'}
                        <i class="fas fa-book"></i>
                    </div>
                `;
                
                container.appendChild(item);
            }
        });
    }

    // Asignar la función de búsqueda al input
    document.getElementById('searchInput').addEventListener('keyup', searchFunction);

    /* Login */
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
});