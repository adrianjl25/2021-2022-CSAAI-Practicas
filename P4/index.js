const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc')
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador = document.getElementById('deslizador');
const deslizadorg = document.getElementById('deslizadorg');
const deslizadorb = document.getElementById('deslizadorb');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');
const range_valueg = document.getElementById('range_valueg');
const range_valueb = document.getElementById('range_valueb');

//gris
const gris = document.getElementById('gris');

// Cargamos la imagen
img.onload = function () {
    console.log("imagen cargada");
    
    //Ajustamos el canvas a la imagen
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);

};



deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
  colores();
}
deslizadorg.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
  colores();
}
deslizadorb.oninput = () => {
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
    range_value.innerHTML = deslizador.value;
    valorrojo = deslizador.value

    range_valueg.innerHTML = deslizadorg.value;
    valorverde = deslizadorg.value

    range_valueb.innerHTML = deslizadorb.value;
    valorazul = deslizadorb.value

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

  gris.onclick = () => {
    
    grises();
   
    
  }