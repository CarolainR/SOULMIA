const form= document.querySelector("#form")
const inputName= document.querySelector("#inputName")
const inputPassword= document.querySelector("#inputPassword")


/* buscar si hay un inicio de sessionStorage */

function validarUsuario (e) {
    e.preventDefault()
 
    let datoUsuario = JSON.parse (localStorage.getItem ("user"))

    if(datoUsuario.usuario === inputName.value && datoUsuario.usuariopassword === inputPassword.value) {
        console.log("Bienvenido🪄")
        window.location.href = "./modulos.html"
    }else{
        console.log("Nombre o contraseña incorrecta😭😭")
    }
    console.log(datoUsuario)
}

form.addEventListener("submit", validarUsuario)
/* redireccionar a otra pagina */