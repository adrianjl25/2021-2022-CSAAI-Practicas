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

function digit(num){
    if(estado == ESTADO.init){
        display.innerHTML = num;
        estado = ESTADO.op1;
    }
    else if(estado == ESTADO.op1){
        display.innerHTML += num;
    }
    else if(estado == ESTADO.operation){
        display.innerHTML += num;
        estado = ESTADO.op2;
    }
    else if(estado == ESTADO.op2){
        display.innerHTML += num;
    }
}

function operacion(ope){
    if (estado != ESTADO.operation){
        display.innerHTML += ope;
        estado = ESTADO.operation;
    }
}

igual.onclick = () => {
    
}