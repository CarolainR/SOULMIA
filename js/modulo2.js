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

            return{
                p1: color,
                p2: deporte,
                p3: comida,
                p4: animales,
                p5: estacion,
                p6: estacion,
                p7: estacion,
                p8: estacion,
                p9: estacion,
                p10: estacion
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
                p6: "Otoño",
                p7: "Otoño",
                p8: "Otoño",
                p9: "Otoño",
                p10: "Otoño"
            }

            let acumulado = 0

            const arrayRespuestasUser = Object.values (respuestasUser)
            const arrayRespuestasCorrectas = Object.values (respuestasCorrectas)

            //RECORRER EL ARRAY DE RESPUESTAS USER Y EL DE RESPUESTAS CORRECTAS E INCORRECTAS y las compara

            for (let i = 0; i <arrayRespuestasUser.length; i++){
                if(arrayRespuestasUser[i] == arrayRespuestasCorrectas [i]) {
                    acumulado++
                }
            }
            //Verifico cuanto lleva el usuario de progreso previo
           /*  let user = JSON.parse(localStorage.getItem("user")) || {} */

            //Condicional que me dice si gane o perdi el examen

            if(acumulado >= 7){

                console.log("Ganaste el examen😀");
                user.progreso += 12.5
                localStorage.setItem("user",JSON.stringify(user))
            }else{
                console.log("Debes repetir el examen 😭")
            }
            console.log(acumulado)

         /*    if (respuestasCorrectas.p1 === respuestasUser.p1) {
                acumulado++
            }

            if(respuestasCorrectas.p2 === respuestasUser.p2) {
                acumulado++
            }
            if(respuestasCorrectas.p3 === respuestasUser.p3) {
                acumulado++
            }
            if(respuestasCorrectas.p4 === respuestasUser.p4) {
                acumulado++
            }
            if(respuestasCorrectas.p5 === respuestasUser.p5) {
                acumulado++
            } */

            console.log ("Tu acumulado es: ", acumulado)

            for (const key in respuestasCorrectas) {
                console.log(respuestasCorrectas[key]);
            }
        }

preguntasForm.addEventListener("submit",validarRespuestas)