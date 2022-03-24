console.log("Iniciando código JS...")
pantalla = document.getElementById("pantalla")
borrar = document.getElementById("borrar")
clear = document.getElementById("clear")
igual = document.getElementById("igual")
sqrt = document.getElementById("sqrt")
let numeros = document.getElementsByClassName("numero")
let operador = document.getElementsByClassName("operador")


const ESTADO = {
    init: 0,
    op1:1,
    operation:2,
    op2:3,
}

let estado = ESTADO.init;

for(i=0; i<numeros.length; i++){
    numeros[i].onclick=(ev)=>{
        digit(ev.target.value);
        console.log("numero...")
    }
}
for(i=0; i<operador.length; i++){
    operador[i].onclick=(ev)=>{
        if(estado == ESTADO.op1){
            
            operacion(ev.target.value);
            console.log("operacion...");
        }
    }
}
function digit(num){
    if(estado == ESTADO.init){
        pantalla.innerHTML = num;
        estado = ESTADO.op1;
    }
    else if(estado == ESTADO.op1){
        pantalla.innerHTML += num;
    }
    else if(estado == ESTADO.operation){
        pantalla.innerHTML += num;
        estado = ESTADO.op2;
    }
    else if(estado == ESTADO.op2){
        pantalla.innerHTML += num;
    }
}

function operacion(operador){
    if (estado != ESTADO.operation){
        pantalla.innerHTML += operador;
        estado = ESTADO.operation;
    }
}

igual.onclick = () => {
    pantalla.innerHTML = eval(pantalla.innerHTML);
     answer.value = pantalla.innerHTML;
     estado = ESTADO.op1;
}

clear.onclick = (ev) => {
    pantalla.innerHTML = " ";
    console.log("clear")
    estado = ESTADO.op1;
}

borrar.onclick = () => {
    if (pantalla.innerHTML == "0"){
      pantalla.innerHTML = "";
    }else{
      pantalla.innerHTML = pantalla.innerHTML.slice(0,-1);
    }
  }
  
   
sqrt.onclick = () => {
    pantalla.innerHTML = Math.sqrt(pantalla.innerHTML);
  }
  
   
answer.onclick = () => {
      pantalla.innerHTML = answer.value;
      estado = ESTADO.op2;
   }

let button = document.querySelector('.chat-button')

   // alert('Buenos días profe');










