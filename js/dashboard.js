document.addEventListener('DOMContentLoaded', function () {
    // Obtener usuario loggeado de la forma compatible con login y index
    let user = null;
    if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
    }

    // Mostrar saludo con nombre de usuario en el header solo si está loggeado
    function showGreeting() {
        const greetingDiv = document.getElementById('greeting');
        const usernameSpan = document.getElementById('username');
        if (greetingDiv && usernameSpan && user && (user.fullName || user.email || user.user)) {
            greetingDiv.style.display = 'flex';
            usernameSpan.textContent = `¡Hola, ${user.fullName || user.email || user.user}!`;
        } else if (greetingDiv) {
            greetingDiv.style.display = 'none';
        }
    }
    showGreeting();

    // Animación de la barra de progreso circular
    function animateProgress(percent) {
        const circle = document.getElementById('progressCircle');
        const percentText = document.getElementById('progressPercent');
        if (!circle || !percentText) return;
        const radius = 15.9155;
        const circumference = 2 * Math.PI * radius;
        let current = 0;
        let last = 0;
        const duration = 1200; // ms
        const steps = 60;
        const increment = percent / steps;
        function animate() {
            last += increment;
            if (last > percent) last = percent;
            const offset = (last / 100) * circumference;
            circle.setAttribute('stroke-dasharray', `${offset}, ${circumference}`);
            percentText.textContent = `${Math.round(last)}%`;
            if (last < percent) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    // Actualizar Current Module dinámicamente según progreso y examen 1
    function getCurrentModuleInfo(user) {
        // Si no ha aprobado el examen 1, está en Módulo 1
        if (!user || localStorage.getItem('repetirExamenModulo1') !== 'false') {
            return { name: 'Módulo 1', title: 'Fundamentos del Bar y del Bartender' };
        }
        // Si aprobó el examen 1, el resto depende del progreso
        const progreso = user.progreso || 0;
        if (progreso < 25) {
            return { name: 'Módulo 2', title: 'Mixing Techniques' };
        } else if (progreso < 37.5) {
            return { name: 'Módulo 3', title: 'Coctelería Clásica' };
        } else if (progreso < 50) {
            return { name: 'Módulo 4', title: 'Coctelería de Autor' };
        } else if (progreso < 62.5) {
            return { name: 'Módulo 5', title: 'Gestión y Servicio' };
        } else if (progreso < 75) {
            return { name: 'Módulo 6', title: 'Mixología Molecular' };
        } else if (progreso < 87.5) {
            return { name: 'Módulo 7', title: 'Tendencias y Flair' };
        } else {
            return { name: 'Módulo 8', title: 'Certificación Final' };
        }
    }

    // Mostrar progreso acumulado en la barra circular
    if (user && user.progreso !== undefined) {
        animateProgress(user.progreso);
    }

    // Mostrar módulo actual en module-info
    const currentModule = getCurrentModuleInfo(user);
    updateCurrentModule(currentModule.name, currentModule.title);

    // Actualizar Current Module dinámicamente
    function updateCurrentModule(moduleNumber, moduleTitle) {
        const nameSpan = document.getElementById('currentModuleName');
        const titleSpan = document.getElementById('currentModuleTitle');
        if (nameSpan && titleSpan) {
            nameSpan.textContent = moduleNumber;
            titleSpan.textContent = moduleTitle;
            nameSpan.classList.add('in-progress');
        }
    }

    // Lógica para estados de los módulos en el sidebar
    function getSidebarModuleStates(user) {
        // Estados posibles: bloqueado, en progreso, completado
        // Usamos la misma lógica de progreso y examen 1
        const estados = [];
        // Módulo 1: depende de la clave repetirExamenModulo1
        const aprobadoExamen1 = localStorage.getItem('repetirExamenModulo1') === 'false';
        const progreso = user && user.progreso ? user.progreso : 0;
        // Módulo actual según la lógica previa
        let moduloActual = 1;
        if (aprobadoExamen1) {
            if (progreso < 25) moduloActual = 2;
            else if (progreso < 37.5) moduloActual = 3;
            else if (progreso < 50) moduloActual = 4;
            else if (progreso < 62.5) moduloActual = 5;
            else if (progreso < 75) moduloActual = 6;
            else if (progreso < 87.5) moduloActual = 7;
            else moduloActual = 8;
        }
        for (let i = 1; i <= 8; i++) {
            if (i < moduloActual) {
                estados.push({ estado: 'completado', icon: '<i class="bi bi-check-circle-fill text-success"></i>' });
            } else if (i === moduloActual) {
                estados.push({ estado: 'en progreso', icon: '<i class="bi bi-hourglass-split text-warning"></i>' });
            } else {
                estados.push({ estado: 'bloqueado', icon: '<i class="bi bi-lock-fill text-secondary"></i>' });
            }
        }
        return estados;
    }

    // Renderizar estados en el sidebar
    function renderSidebarStates() {
        const sidebarMenu = document.querySelector('.sidebar-menu');
        if (!sidebarMenu) return;
        const estados = getSidebarModuleStates(user);
        const nombres = [
            'Módulo 1',
            'Módulo 2',
            'Módulo 3',
            'Módulo 4',
            'Módulo 5',
            'Módulo 6',
            'Módulo 7',
            'Módulo 8'
        ];
        sidebarMenu.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            sidebarMenu.innerHTML += `<li class="d-flex align-items-center justify-content-between">${nombres[i]} <span class="ms-2">${estados[i].icon}</span></li>`;
        }
    }
    renderSidebarStates();

    // Lógica de avatar de usuario en sidebar
    const sidebarAvatar = document.getElementById('sidebarUserAvatar');
    const sidebarAvatarInput = document.getElementById('sidebarAvatarInput');
    const avatarOverlay = document.getElementById('avatarOverlay');
    const defaultAvatar = '../sources/default-user.png'; // Debes agregar esta imagen al proyecto

    // Cargar imagen guardada en localStorage o mostrar por defecto
    function loadSidebarAvatar() {
        let user = null;
        if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user && user.avatar) {
            sidebarAvatar.src = user.avatar;
            sidebarAvatar.classList.remove('default-avatar');
        } else {
            sidebarAvatar.src = defaultAvatar;
            sidebarAvatar.classList.add('default-avatar');
        }
    }
    loadSidebarAvatar();

    // Mostrar overlay solo al hacer click en la imagen
    sidebarAvatar.addEventListener('click', function(e) {
        e.stopPropagation();
        avatarOverlay.classList.toggle('show-overlay');
    });
    // Ocultar overlay al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!avatarOverlay.contains(e.target) && !sidebarAvatar.contains(e.target)) {
            avatarOverlay.classList.remove('show-overlay');
        }
    });
    // Ocultar overlay al hacer click en el overlay después de acción
    avatarOverlay.addEventListener('click', function(e) {
        // Si ya hay foto, preguntar si quiere quitarla
        let user = null;
        if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user && user.avatar) {
            if (confirm('¿Quieres quitar tu foto de perfil?')) {
                delete user.avatar;
                localStorage.setItem('user', JSON.stringify(user));
                loadSidebarAvatar();
            }
        } else {
            sidebarAvatarInput.click();
        }
        avatarOverlay.classList.remove('show-overlay');
    });
    // Subir nueva foto
    sidebarAvatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            let user = null;
            if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('user')) {
                user = JSON.parse(localStorage.getItem('user'));
            }
            if (user) {
                user.avatar = evt.target.result;
                localStorage.setItem('user', JSON.stringify(user));
                loadSidebarAvatar();
            }
        };
        reader.readAsDataURL(file);
    });

    // ===== TIEMPO EN LÍNEA DEL USUARIO LOGGEADO =====
    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let sessionStart = Date.now();
    let intervalId = null;
    let tiempoTotal = 0;
    let userKey = null;
    if (user && (user.email || user.user || user.fullName)) {
        userKey = user.email || user.user || user.fullName;
    }
    // Cargar tiempo acumulado de localStorage
    if (userKey) {
        const tiempoGuardado = localStorage.getItem('tiempoEnLinea_' + userKey);
        tiempoTotal = tiempoGuardado ? parseInt(tiempoGuardado, 10) : 0;
    }
    // Actualizar la card cada segundo
    function updateTiempoEnLinea() {
        const card = document.querySelector('.dashboard-stats .card.stat-card:nth-child(2)');
        if (card) {
            const tiempoActual = tiempoTotal + (Date.now() - sessionStart);
            card.innerHTML = `${formatTime(tiempoActual)}<br><small>Tiempo en Línea</small>`;
        }
    }
    if (userKey) {
        intervalId = setInterval(updateTiempoEnLinea, 1000);
        // Guardar el tiempo acumulado al cerrar o recargar la página
        window.addEventListener('beforeunload', function () {
            const tiempoActual = tiempoTotal + (Date.now() - sessionStart);
            localStorage.setItem('tiempoEnLinea_' + userKey, tiempoActual.toString());
        });
        // Guardar el tiempo acumulado al cerrar sesión desde el dashboard
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                const tiempoActual = tiempoTotal + (Date.now() - sessionStart);
                localStorage.setItem('tiempoEnLinea_' + userKey, tiempoActual.toString());
            });
        }
    }
    // Mostrar el tiempo inicial al cargar
    updateTiempoEnLinea();

    // ====== FUNCIÓN GLOBAL PARA ACTUALIZAR PROGRESO Y MÓDULO EN DASHBOARD ======
    window.actualizarProgresoDashboard = function() {
        // Obtener usuario actualizado
        let user = null;
        if (localStorage.getItem('loggedIn') === 'true' && localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        // Actualizar barra de progreso y porcentaje en la card
        const progreso = (user && user.progreso !== undefined) ? user.progreso : 0;
        const progressCard = document.querySelector('.progress-card');
        if (progressCard) {
            progressCard.innerHTML = `
                <h2>Progreso</h2>
                <div class="progress-circle">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="progressGradient" x1="1" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#bf0c73"/>
                          <stop offset="100%" stop-color="#8031b6"/>
                        </linearGradient>
                      </defs>
                      <path class="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path class="circle" id="progressCircle"
                        stroke="url(#progressGradient)"
                        stroke-dasharray="0, 100"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" class="percentage" id="progressPercent">0%</text>
                    </svg>
                </div>
                <p>De Curso Completado</p>
            `;
            // Volver a animar el progreso
            animateProgress(progreso);
        }
        // Actualizar módulo actual
        const currentModule = getCurrentModuleInfo(user);
        updateCurrentModule(currentModule.name, currentModule.title);
        // Actualizar estados del sidebar
        renderSidebarStates();
    };
    // Llamar al cargar la página (por si acaso)
    window.actualizarProgresoDashboard();
    // Escuchar cambios en localStorage (por ejemplo, si el progreso cambia desde otro script o pestaña)
    window.addEventListener('storage', function(e) {
        if (e.key === 'user' || e.key === 'repetirExamenModulo1') {
            window.actualizarProgresoDashboard();
        }
    });
});