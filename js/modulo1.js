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

            const arrayRespuestasUser = Object.values (respuestasUser)
            const arrayRespuestasCorrectas = Object.values (respuestasCorrectas)

            //RECORRER EL ARRAY DE RESPUESTAS USER Y EL DE RESPUESTAS CORRECTAS E INCORRECTAS y las compara

            for (let i = 0; i <arrayRespuestasUser.length; i++){
                if(arrayRespuestasUser [i] == arrayRespuestasCorrectas [i]) {
                    acumulado++
                }
            }
            //Verifico cuanto lleva el usuario de progreso previo
           /*  let user = JSON.parse(localStorage.getItem("user")) || {} */

            //Condicional que me dice si gane o perdi el examen
            console.log(acumulado)
            if(acumulado >= 7){

                console.log("Ganaste el examen😀");
                user.progreso += 12.5
                user.leccionesVistas = (user.leccionesVistas || 0) + 1; // Incrementar lecciones vistas
                user.tiempoInvertido = (user.tiempoInvertido || 0) + 30; // Suponiendo 30 minutos por módulo
                 // Actualizar el progreso en el DOM
                document.querySelector("#progreso").textContent = `${user.progreso}%`;
                document.querySelector(".stat-box:nth-child(1)").textContent = user.leccionesVistas; // Lecciones vistas
                document.querySelector(".stat-box:nth-child(2)").textContent = user.tiempoInvertido; // Tiempo invertido
                document.querySelector(".current-module h2").textContent = `Módulo ${user.leccionesVistas}`; // Actualizar módulo actual
                localStorage.setItem("user",JSON.stringify(user))
            }else{
                console.log("Debes repetir el examen 😭")
            }
            console.log(acumulado)

            console.log ("Tu acumulado es: ", acumulado)

            for (const key in respuestasCorrectas) {
                console.log(respuestasCorrectas[key]);
            }
        }

        preguntasForm.addEventListener("submit",validarRespuestas)