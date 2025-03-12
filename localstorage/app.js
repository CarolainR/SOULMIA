const form= document.querySelector("#form")
const inputName= document.querySelector("#inputName")
const inputPassword= document.querySelector("#inputPassword")
let user={
    usuario: "",
    password: "",
    modulosCompletados: "",
    
}

function saveUserLocal (e){
e.preventDefault()
    user={
    usuario: inputName.value, 
    password: inputPassword.value,
    modulosCompletados: "",
    
}

/* GUARDAR EN localStorage Y SE GUARDAN LOS DATOS CON setItem */

localStorage.setItem("user", JSON.stringify (user))

console.log (user)

/* console.log (inputNombre.value)
console.log(inputPassword.value) */
}

form.addEventListener("submit", saveUserLocal)