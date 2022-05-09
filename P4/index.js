const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//Acceso al deslizador
const deslizadorR = document.getElementById('deslizadorR');
const deslizadorG = document.getElementById('deslizadorG');
const deslizadorB = document.getElementById('deslizadorB');

//Valor del deslizador
const range_valuer = document.getElementById('range_valuer');
const range_valueg = document.getElementById('range_valueg');
const range_valueb = document.getElementById('range_valueb');
//botones
const colors = document.getElementById('colores');
const gris = document.getElementById('gris');
const neg = document.getElementById('negativo');
const esp = document.getElementById('espejo');
const ruidos = document.getElementById('ruido');
const inv = document.getElementById('invertir');

// Cargamos la imagen
img.onload = function () {
    console.log("Imagen cargada");
    
    //Ajustamos el canvas a la imagen
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);

};



deslizadorR.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
  colores();
}
deslizadorG.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
  colores();
}
deslizadorB.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
  colores();
}

function colores() {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0,0);
 

  //Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //Obtener el array con todos los píxeles
    let data = imgData.data;

    //Modificamos la imagen según el valor de los deslizadores
    range_valuer.innerHTML = deslizadorR.value;
    valorrojo = deslizadorR.value

    range_valueg.innerHTML = deslizadorG.value;
    valorverde = deslizadorG.value

    range_valueb.innerHTML = deslizadorB.value;
    valorazul = deslizadorB.value

    for (let i = 0; i < data.length; i+=4) {
        if (data[i] > valorrojo) 
            data[i] = valorrojo;
        if (data[i + 1] > valorverde) 
            data[i + 1] = valorverde;
        if (data[i + 2] > valorazul) 
            data[i + 2] = valorazul;
    }

    ctx.putImageData(imgData, 0, 0);
}

function grises(){
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    
    for (var i = 0; i < data.length; i+=4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];
      brillo = (3 * r + 4 * g + b)/8 //Filtro grises
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
  }
  function negativo(){
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    let data = imgData.data;
    
    for (let i = 0; i < data.length; i+=4) {
      // calculamos el valor de cada componente cromático del color complementario
      // el valor máximo que pueden tomar estos componentes es 255
      negativoR = 255 - data[i];
      negativoG = 255 - data[i+1];
      negativoB = 255 - data[i+2];

      data[i] = negativoR;
      data[i+1] = negativoG;
      data[i+2] = negativoB;
  }
  //-- Poner la imagen modificada en el canvas
 ctx.putImageData(imgData, 0, 0);
  }
  function espejo(){
    ctx.translate(2*(img.width)/2,0);
    ctx.scale(-1,1);
    ctx.drawImage(img, 0,0);
  }

  function ruido(){
    var ruido = 1;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (var i = 0; i < data.length; i+=4) {
        ruido = Math.floor(Math.random() * (100 + 100 + 10) - 150)
        data[i] += ruido;
        data[i+1] += ruido;
        data[i+2] += ruido;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function invertir(){
    desliz.style.display = "none";
    ctx.drawImage(img, 0, 0);
    ctx.translate(0, img.height);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0);
  }

  colors.onclick = () =>{
    colores();
    document.getElementById('fieldset1').style.display = 'block';
  }

  gris.onclick = () => {
    grises();
    document.getElementById('fieldset1').style.display = 'none';
  }

  neg.onclick = () => {
    negativo();
    document.getElementById('fieldset1').style.display = 'none';
  }
  esp.onclick = () =>{
    espejo();
    document.getElementById('fieldset1').style.display = 'none';
  }
  ruidos.onclick = () =>{
    ruido();
    document.getElementById('fieldset1').style.display = 'none';
  }