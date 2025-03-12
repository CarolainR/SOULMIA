const modulos = document.querySelector("#modulos")
const btnSesion = document.querySelector("#btnSesion")

let user = JSON.parse(localStorage.getItem("user"))

if(user){
    modulos.textContent = `Hola ${user.usuario}`
    btnSesion.textContent = "Cerrar Sesión"
    console.log("sesion cerrada")
}else{
    modulos.textContent = `debes iniciar sesión`
    btnSesion = "Iniciar Sesión"
}