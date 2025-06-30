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

    //  logout
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

    // Función para manejar la descarga de PDFs
    function downloadPDF(titulo) {
        // Por ahora todos los PDFs apuntan al mismo archivo, pero debo remplazar esto según el título cuando pueda tener listos los pdfs
        const pdfUrl = '../sources/1862theBarTendersGuide.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${titulo}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Función para visualizar PDFs en nueva pestaña
    function viewPDF(titulo) {
    
        const pdfUrl = '../sources/1862theBarTendersGuide.pdf';
        window.open(pdfUrl, '_blank');
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
                    ${medio.medio === 'pdf' ? 
                        `<a href="#" class="download-btn" data-titulo="${medio.titulo}">
                            <i class="fas fa-download"></i>
                         </a>` : 
                        `<i class="fas fa-play"></i>`
                    }
                    <a href="#" class="view-btn" data-titulo="${medio.titulo}">
                        <i class="fas fa-book"></i>
                    </a>
                </div>
            `;
            container.appendChild(item);
        });

        // Agregar event listeners después de crear los elementos
        addEventListeners();
    }

    // Función event listeners a los botones
    function addEventListeners() {
        // Event listeners para botones de descarga
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const titulo = this.getAttribute('data-titulo');
                downloadPDF(titulo);
            });
        });

        // Event listeners para botones de visualización
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const titulo = this.getAttribute('data-titulo');
                viewPDF(titulo);
            });
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
                        ${medio.medio === 'pdf' ? 
                            `<a href="#" class="download-btn" data-titulo="${medio.titulo}">
                                <i class="fas fa-download"></i>
                             </a>` : 
                            `<i class="fas fa-play"></i>`
                        }
                        <a href="#" class="view-btn" data-titulo="${medio.titulo}">
                            <i class="fas fa-book"></i>
                        </a>
                    </div>
                `;
                
                container.appendChild(item);
            }
        });

        // se agregan event listeners después de filtrar
        addEventListeners();
    }

    // función de búsqueda al input
    document.getElementById('searchInput').addEventListener('keyup', searchFunction);

    /* Login */
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // validar las credenciales del usuario
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        
        // Guardar información del usuario en localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username, email }));
        
        // Redirigir al usuario a la página principal
        window.location.href = './index.html';
    });
});