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
});



//VALIDACION DE EXAMEN POR MODULO Y Y PROGRESO GENERAL EN DASHBOARD

let user = JSON.parse(localStorage.getItem("user")) 
const preguntasForm = document.querySelector(".containerExam")

function capturarRespuestas(){
            // Obtener las respuestas seleccionadas
            const color = document.querySelector('input[name="color"]:checked')?.value;
            const deporte = document.querySelector('input[name="deporte"]:checked')?.value;
            const comida = document.querySelector('input[name="comida"]:checked')?.value;
            const animales = document.querySelector('input[name="animales"]:checked')?.value;
            const estacion = document.querySelector('input[name="estacion"]:checked')?.value;
            const cancion = document.querySelector('input[name="cancion"]:checked')?.value;
            const banda = document.querySelector('input[name="banda"]:checked')?.value;
            const pais = document.querySelector('input[name="pais"]:checked')?.value;
            const ciudad = document.querySelector('input[name="ciudad"]:checked')?.value;
            const libro = document.querySelector('input[name="libro"]:checked')?.value;
            
            return{
                p1: color,
                p2: deporte,
                p3: comida,
                p4: animales,
                p5: estacion,
                p6: cancion,
                p7: banda,
                p8: pais,
                p9: ciudad,
                p10: libro
            }

         /*    // Mostrar las respuestas seleccionadas en consola
            if (respuesta1) console.log('color favorito:', respuesta1.value);
            if (respuesta2) console.log('comida favorita:', respuesta2.value);
            if (respuesta3) console.log('Tipo de música:', respuesta3.value);
            if (respuesta4) console.log('Deporte preferido:', respuesta4.value);
            if (respuesta5) console.log('Tipo de vacaciones:', respuesta5.value); */
        };
        function validarRespuestas (e) {
            e.preventDefault()

            const respuestasUser = capturarRespuestas()
            const respuestasCorrectas = {
                p1: "Amarillo",
                p2: "Natación",
                p3: "Sushi",
                p4: "Sí",
                p5: "Otoño",
                p6: "Burn It Down",
                p7: "Muse",
                p8: "Mexico",
                p9: "Medellin",
                p10: "Crimen y Castigo"
            }

            let acumulado = 0
            let notasModulo1 = [];

            const arrayRespuestasUser = Object.values(respuestasUser)
            const arrayRespuestasCorrectas = Object.values(respuestasCorrectas)

            // Calcular notas individuales
            for (let i = 0; i < arrayRespuestasUser.length; i++) {
                if (arrayRespuestasUser[i] === arrayRespuestasCorrectas[i]) {
                    notasModulo1.push(1);
                    acumulado++;
                } else {
                    notasModulo1.push(0);
                }
            }

            // Guardar resultados en localStorage
            if (acumulado >= 8) {
                // Si tiene 8, 9 o 10 correctas, se guardan las notas
                localStorage.setItem('notasModulo1', JSON.stringify(notasModulo1));
                localStorage.setItem('repetirExamenModulo1', 'false');
                alert('¡Examen enviado! Puedes ver tus resultados en la sección de calificaciones.');
            } else {
                // Si tiene 7 o menos, todas las notas quedan en 0 y se activa la bandera de repetir
                localStorage.setItem('notasModulo1', JSON.stringify([0,0,0,0,0,0,0,0,0,0]));
                localStorage.setItem('repetirExamenModulo1', 'true');
                alert('Debes repetir el examen. No alcanzaste el puntaje mínimo.');
            }

            // (Opcional) Redirigir a calificaciones.html automáticamente
            // window.location.href = '../vistas/calificaciones.html';
        }

        preguntasForm.addEventListener("submit",validarRespuestas)

// ========== NUEVA LÓGICA DE EXAMEN POR PREGUNTA ==========

document.addEventListener('DOMContentLoaded', function () {
    // Preguntas y respuestas
    const preguntas = [
        {
            name: 'color',
            label: '¿Cuál fue uno de los principales aportes de la International Bartenders Association (IBA) en la evolución de la coctelería hacia la mixología moderna?',
            opciones: [
                { value: 'Rojo', text: 'A. La creación de bares temáticos enfocados en coctelería' },
                { value: 'Azul', text: 'B. La promoción de bebidas sin alcohol en las competencias internacionales' },
                { value: 'Verde', text: 'C. La profesionalización del bartender a nivel internacional' },
                { value: 'Amarillo', text: 'D. La estandarización global de recetas de cócteles y la profesionalización del bartender' }
            ]
        },
        {
            name: 'deporte',
            label: '¿Qué función cumple el "modificador" en la composición clásica de un cóctel?',
            opciones: [
                { value: 'Fútbol', text: 'A. Diluir el alcohol principal y aumentar el volumen total' },
                { value: 'Baloncesto', text: 'B. Aromatizar el cóctel sin alterar el contenido alcohólico' },
                { value: 'Natación', text: 'C. Cambiar o complementar el perfil de sabor del destilado base' },
                { value: 'Correr', text: 'D. Servir como decoración sensorial o garnish' }
            ]
        },
        {
            name: 'comida',
            label: '¿Cuál es una característica fundamental que distingue a un bar speakeasy de un bar de coctelería de autor?',
            opciones: [
                { value: 'Pizza', text: 'A. El speakeasy emplea destilados premium mientras que el de autor no' },
                { value: 'Sushi', text: 'B. El speakeasy mantiene una estética oculta o clandestina, mientras que el bar de autor se basa en propuestas únicas y personalizadas' },
                { value: 'Hamburguesa', text: 'C. El bar de autor se enfoca en la experiencia visual del cliente y el speakeasy en lo sensorial' },
                { value: 'Tacos', text: 'D.Ambos se distinguen únicamente por la música ambiente y la carta de cócteles.' }
            ]
        },
        {
            name: 'animales',
            label: 'Verdadero o falso: El servicio al cliente en un bar incluye únicamente la rapidez en la entrega de bebidas y amabilidad, no es necesario el manejo emocional del cliente.',
            opciones: [
                { value: 'Sí', text: 'VERDADERO' },
                { value: 'No', text: 'FALSO' }
            ]
        },
        {
            name: 'estacion',
            label: 'De acuerdo con la Resolución 2674 de 2013 del INVIMA, ¿cuál de los siguientes aspectos es obligatorio para garantizar la inocuidad alimentaria en un establecimiento que prepara cócteles con ingredientes perecederos?',
            opciones: [
                { value: 'Primavera', text: 'A. Utilizar solo hielo higienico, guantes y agua embotellada' },
                { value: 'Verano', text: 'B. Tener un sistema de gestión ambiental' },
                { value: 'Otoño', text: 'C. Implementar programas BPM, POES y un sistema HACCP o APPCC' },
                { value: 'Invierno', text: 'D. Contar con certificaciones internacionales de mixología' }
            ]
        },
        {
            name: 'cancion',
            label: '¿Cuál es el principal objetivo de las BPM (Buenas Prácticas de Manufactura) dentro del contexto del bar?',
            opciones: [
                { value: 'Castle of Glass', text: 'A. Mejorar la eficiencia del bartender en el mise en place' },
                { value: 'Burn It Down', text: 'B. Asegurar la inocuidad y calidad sanitaria en la manipulación de ingredientes' },
                { value: 'Breacking the habit', text: 'C. Garantizar un servicio rápido y personalizado' },
                { value: 'Somewhere I belong', text: 'D. Aplicar técnicas para la calidad de los cócteles.' }
            ]
        },
        {
            name: 'banda',
            label: '¿Qué aspecto del mise en place influye directamente en la armonía de los movimientos del bartender durante el servicio?',
            opciones: [
                { value: 'Linkin Park', text: 'A. El orden estético de las botellas' },
                { value: 'Metallica', text: 'B. agilidad en servicio' },
                { value: 'Muse', text: 'C. La disposición estratégica y funcional de herramientas e ingredientes' },
                { value: 'Slipknot', text: 'D. El diseño temático del menú de cócteles' }
            ]
        },
        {
            name: 'pais',
            label: '¿Qué principio del Decálogo del Bartender de la IBA se relaciona directamente con la capacidad del bartender de manejar situaciones de conflicto emocional con un cliente?',
            opciones: [
                { value: 'Mexico', text: 'A. "El bartender debe ser psicólogo y confidente sin comprometer su ética"' },
                { value: 'Argentina', text: 'B. "El bartender debe conocer y cumplir las normas de etiqueta y protocolo."' },
                { value: 'Peru', text: 'C. "El bartender debe ser rápido y hábil con las manos"' },
                { value: 'Chile', text: 'D. "El bartender debe ser artista y científico en la presentación del cóctel"' }
            ]
        },
        {
            name: 'ciudad',
            label: '¿Cuál de los siguientes elementos no es un componente esencial en un Sistema HACCP (APPCC) en un bar o cocina de coctelería?',
            opciones: [
                { value: 'Munich', text: 'A. Identificación de puntos críticos de control' },
                { value: 'Tokio', text: 'B. Registro y documentación de procedimientos' },
                { value: 'Madrid', text: 'C. Establecimiento de medidas correctivas' },
                { value: 'Medellin', text: 'D. Inventario y estandarización de recetas' }
            ]
        },
        {
            name: 'libro',
            label: 'Desde la perspectiva de la ética del bartender según la IBA, ¿cuál de estas afirmaciones describe mejor el rol filosófico del bartender?',
            opciones: [
                { value: 'Crimen y Castigo', text: 'A. El bartender es un canal de experiencias sensoriales, culturales y emocionales que deben ser respetadas' },
                { value: 'El carrusel', text: 'B. El bartender debe enfocarse en la eficiencia antes que en la experiencia del cliente' },
                { value: 'Camino a la servidumbre', text: 'C. La función del bartender es únicamente preparar bebidas con estándares de calidad' },
                { value: 'El olvido que seremos', text: 'D. El bartender debe mantener una actitud neutra frente a la historia y cultura de la coctelería' }
            ]
        }
    ];

    const respuestasCorrectas = [
        'Amarillo',
        'Natación',
        'Sushi',
        'No',
        'Otoño',
        'Burn It Down',
        'Muse',
        'Mexico',
        'Medellin',
        'Crimen y Castigo'
    ];

    const examWrapper = document.getElementById('examWrapper');
    const examForm = document.getElementById('examForm');
    const startExamBtn = document.getElementById('startExamBtn');
    const startExamSection = document.getElementById('start-exam-section');
    const moduloContent = document.querySelector('.container.temas-modulo1.my-5');

    // Estado del examen
    let currentQuestion = 0;
    let respuestasUsuario = [];

    // Animación para transición
    function animateTransition(element, callback) {
        element.classList.add('fade-out');
        setTimeout(() => {
            callback();
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
            setTimeout(() => {
                element.classList.remove('fade-in');
            }, 400);
        }, 400);
    }

    // Renderizar una pregunta
    function renderPregunta(index) {
        const pregunta = preguntas[index];
        examForm.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'question animated-question';
        div.innerHTML = `
            <h4>Pregunta ${index + 1} de ${preguntas.length}</h4>
            <div class="options">
                <label>${pregunta.label}</label><br>
                ${pregunta.opciones.map((op, i) => `
                    <div class="form-check my-2">
                        <input class="form-check-input" type="radio" name="${pregunta.name}" id="${pregunta.name}_${i}" value="${op.value}">
                        <label class="form-check-label" for="${pregunta.name}_${i}">${op.text}</label>
                    </div>
                `).join('')}
            </div>
            <button type="button" class="btn btn-primary mt-4 next-question-btn" disabled>Siguiente</button>
        `;
        examForm.appendChild(div);

        // Habilitar el botón solo si se selecciona una opción
        const radios = div.querySelectorAll('input[type="radio"]');
        const nextBtn = div.querySelector('.next-question-btn');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                nextBtn.disabled = false;
            });
        });

        nextBtn.addEventListener('click', () => {
            // Guardar respuesta
            const seleccionada = div.querySelector('input[type="radio"]:checked');
            respuestasUsuario[index] = seleccionada ? seleccionada.value : null;
            if (currentQuestion < preguntas.length - 1) {
                animateTransition(examForm, () => {
                    currentQuestion++;
                    renderPregunta(currentQuestion);
                });
            } else {
                // Terminar examen
                finalizarExamen();
            }
        });
    }

    // Iniciar el examen
    function iniciarExamen() {
        // Ocultar contenido del módulo
        if (moduloContent) moduloContent.style.display = 'none';
        startExamSection.style.display = 'none';
        examWrapper.style.display = 'block';
        currentQuestion = 0;
        respuestasUsuario = [];
        localStorage.setItem('examenModulo1EnCurso', 'true');
        renderPregunta(currentQuestion);
    }

    // Finalizar el examen
    function finalizarExamen() {
        // Calcular resultados y guardar en localStorage (igual que antes)
        let notasModulo1 = [];
        let acumulado = 0;
        for (let i = 0; i < preguntas.length; i++) {
            if (respuestasUsuario[i] === respuestasCorrectas[i]) {
                notasModulo1.push(1);
                acumulado++;
            } else {
                notasModulo1.push(0);
            }
        }
        if (acumulado >= 8) {
            localStorage.setItem('notasModulo1', JSON.stringify(notasModulo1));
            localStorage.setItem('repetirExamenModulo1', 'false');
            alert('¡Examen enviado! Puedes ver tus resultados en la sección de calificaciones.');
        } else {
            localStorage.setItem('notasModulo1', JSON.stringify([0,0,0,0,0,0,0,0,0,0]));
            localStorage.setItem('repetirExamenModulo1', 'true');
            alert('Debes repetir el examen. No alcanzaste el puntaje mínimo.');
        }
        localStorage.removeItem('examenModulo1EnCurso');
        // Mostrar contenido del módulo y ocultar examen
        if (moduloContent) moduloContent.style.display = '';
        startExamSection.style.display = '';
        examWrapper.style.display = 'none';
        // (Opcional) Redirigir a calificaciones.html automáticamente
        // window.location.href = '../vistas/calificaciones.html';
    }

    // Si el usuario sale sin terminar el examen, debe repetirlo
    window.addEventListener('beforeunload', function (e) {
        if (localStorage.getItem('examenModulo1EnCurso') === 'true') {
            // No guardar progreso, forzar reinicio
            localStorage.removeItem('examenModulo1EnCurso');
        }
    });

    // Si hay examen en curso, forzar reinicio
    if (localStorage.getItem('examenModulo1EnCurso') === 'true') {
        iniciarExamen();
    }

    // Botón para iniciar el examen
    if (startExamBtn) {
        startExamBtn.addEventListener('click', iniciarExamen);
    }
});

// ========== FIN NUEVA LÓGICA DE EXAMEN ==========