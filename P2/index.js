var document;
var i;
var ev;



var pantalla = document.getElementById("pantalla");
var borrar = document.getElementById("borrar");
var clear = document.getElementById("clear");
var igual = document.getElementById("igual");
var numeros = document.getElementsByClassName("numero");
var operador = document.getElementsByClassName("operador");
var button = document.querySelector('.chat-button');


var ESTADO = {
    init: 0,
    op1: 1,
    operation: 2,
    op2: 3
};

var estado = ESTADO.init;

for (i = 0; i < numeros.length; i++) {
    numeros[i].onclick = (ev)=>{
        digit(ev.target.value);
        console.log("numero...");
    };
}
for(i = 0; i < operador.length; i++){
    operador[i].onclick=(ev)=>{
        if(estado == ESTADO.op1){
            
            operacion(ev.target.value);
            console.log("operacion...");
        }
    };
}
function digit(num){
    if(estado == ESTADO.init) {
        pantalla.innerHTML = num;
        estado = ESTADO.op1;
    }
    else if(estado == ESTADO.op1) {
        pantalla.innerHTML += num;
    }
    else if(estado == ESTADO.operation) {
        pantalla.innerHTML += num;
        estado = ESTADO.op2;
    }
    else if(estado == ESTADO.op2) {
        pantalla.innerHTML += num;
    }
}

function operacion(operador) {
    if (estado != ESTADO.operation) {
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
    console.log("clear");
    estado = ESTADO.op1;
};

borrar.onclick = () => {
    if (pantalla.innerHTML == "0") {
      pantalla.innerHTML = "";
    }else{
      pantalla.innerHTML = pantalla.innerHTML.slice(0,-1);
    }
  };
   
answer.onclick = () => {
      pantalla.innerHTML = answer.value;
      estado = ESTADO.op1;
   };


function saludos(){
    alert('Adelante Sinluz, no temas, adéntrate en el interior del árbor hierático y ofrece tu operaciones a Malenia, espada de Miquella.');
}









