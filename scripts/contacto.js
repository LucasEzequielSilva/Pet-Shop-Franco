var nombreYApellido=document.querySelector("#nombreInput1").addEventListener("change", capturaNombre)
const alertanombreYApellido=document.querySelector("#alertaNombre1")
var datoNombre = ""

var telefono=document.querySelector("#telefonoInput1").addEventListener("change",  capturaTelefono)
const alertaTelefono=document.querySelector("#alertatelefono")
var datoTelefono = ""

var email=document.querySelector("#emailInput1").addEventListener("change", capturaEmail)
const alertaEmail=document.querySelector("#email")
var datoEmail = ""

var botonEnviar=document.querySelector("#botonEnviar").addEventListener("click", enviar)
const aviso=document.querySelector("#aviso")

function capturaNombre(event){   
    var dato = event.target.value
    var correctNombre=dato.trim()
                          .toLowerCase() 
                          .split(" ")  
                          .filter(Boolean) 
                          .map(palabra=>palabra[0].toUpperCase()+palabra.substr(1)) 
                          .join(" ") 
    if(dato.length>4){
        alertanombreYApellido.innerHTML=""
    }else{
        alertanombreYApellido.innerHTML="Debe ingresar como minimo 4 caracteres"
        alertanombreYApellido.style.color="red"
    }
    datoNombre=correctNombre
    console.log(datoNombre)
} 
//queda pendiente que no admita letras
function capturaTelefono(event){ 
    var dato=event.target.value;
    //var simplificada=/^[0-9]+$/
    var datoTel= dato.trim() 
                     .split("")
                     //.filter(Number)
                     .join("")
                     
if(datoTel.length>=10 && datoTel.includes(Number)) {
    alertaTelefono.innerHTML=""
}else{
    alertaTelefono.innerHTML="Chequee bien su numero"
    alertaTelefono.style.color="red"
   
}
 datoTelefono=datoTel
console.log(datoTel.includes(Number))
}
 
function capturaEmail(event){
    var dato=event.target.value;
   var datoE=dato
   if(datoE.includes("@")){
    alertaEmail.innerHTML=""
   }else{   
  alertaEmail.innerHTML="Chequee su email"
  alertaEmail.style.color="red" }
   datoEmail=datoE
   console.log(datoEmail)
}
//se puede prestablecer el tiempo de envio? figura el mensaje tan brevemente q no se ve! 
function enviar(){
      aviso.innerHTML="Muchas gracias por escribirnos!!"
      aviso.style.color="white"
}