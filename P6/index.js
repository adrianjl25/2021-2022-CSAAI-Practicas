//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const btn_video1 = document.getElementById("btn_video1");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");


//-- Establecer las dimensiones de los vídeos
directo.width=720;
directo.height=640;
video1.width=250;  
video1.height=150;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "test.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;


//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
 
  //-- Establecer la fuente de la cámara 1
  video1.src="zelda2.mp4";
  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();

  //-- Y en silencio...
  video1.muted;
};

//-- Botón de Test
btn_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
};


btn_src_off.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    video1.poster = TEST_IMAGE_URL;

    directo.src = null;
    video1.src = null;
}