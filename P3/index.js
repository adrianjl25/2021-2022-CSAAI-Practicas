const ctx = canvas.getContext("2d");
izq = document.getElementById("izq");
der = document.getElementById("der");

//Definimos los ladrillos
const LADRILLO = {
    F: 6,
    C: 13,
    w: 43,
    h: 20,
    padding: 3,
    visible: true,

};

const ladrillos = [];

for (let i = 1; i < LADRILLO.F; i++){
    ladrillos[i] = [];
    for (let j = 0; j < LADRILLO.C; j++){
        ladrillos[i][j] = {
            x: (LADRILLO.w + LADRILLO.padding) * j,
            y: 35 + (LADRILLO.h + LADRILLO.padding) * i,
            w: LADRILLO.w,
            h: LADRILLO.h,
            padding: LADRILLO.padding,
            visible: LADRILLO.visible
        };
    }

    }
    //dibujo ladrillos
function drawLadrillos() {
    for (let i = 1; i < LADRILLO.F; i++) {
        for (let j = 0; j < LADRILLO.C; j++){
            if (ladrillos[i][j].visible) {
                ctx.beginPath();
                ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// colision de bola con el ladrillo
function colisionLadrillo(){
    for(let i = 1; i < LADRILLO.F; i++){
        for (let j = 0; j < LADRILLO.C; j++){
            if(ladrillos[i][j].visible == true){
                if(ball.x >= ladrillos[i][j].x &&
                   ball.x <= ladrillos[i][j].x + 43 &&
                   ball.y >= ladrillos[i][j].y &&
                   ball.y <= ladrillos[i][j].y + 30)
                   {
                       ball.dy = -ball.dy;
                       ladrillos[i][j].visible = false; //desaparece el ladrillo colisionado
                       score += 1;
                    } 
                   
            }
        }
    }

}

let speed = 4; // velocidad bola
let vidas = 3; // vidas
let score = 0; // puntuación

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// definimos la bola
let ball = {
    x: canvas.width/2,
    y: canvas.height - 50,
    dx: 0,
    dy: 0,
    radius: 9,
    draw: function() {
        ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          ctx.closePath();
        ctx.fill();
    }
};
// pulsando espacio se mueve la pelota
window.onkeydown = (e) => {
    if (e.keyCode == 32){
        ball.dx = 0;
        ball.dy = 3;
        
    } 
}
// definimos la raqueta
let raqueta = {
    width: 65,
    height: 10,
    x: canvas.width /2 - 30,
    draw: function(){
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height - 10, this.width, this.height);
        ctx.fillStyle = "yellow";
        ctx.closePath();
        ctx.fill();
    }
};
// movimiento de la raqueta con las flechas
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
    }
  }

  function moveRaqueta(){
      if(rightPressed){
          raqueta.x += 7;
          //limite derecha
          if(raqueta.x + raqueta.width >= canvas.width){
              raqueta.x = canvas.width - raqueta.width;
          }
      }
      if(leftPressed){
          raqueta.x -= 7;
          //limite izq
          if(raqueta.x < 0){
              raqueta.x = 0;
          }
      }
  }
//funcion principal
function play(){
    document.getElementById("ganar").style.display = "none";
    document.getElementById("perder").style.display = "none";
    document.getElementById("repetir").style.display = "none";
    //rebote pelota
    if (ball.x <0 || ball.x >= canvas.width - 7 ) {
        ball.dx = -ball.dx;
      }
    
      if (ball.y <55) {
        ball.dy = -ball.dy;
      }
      //perdida de vida
    if (ball.y >= canvas.height) {
        vidas = vidas -1;
        ball.x = canvas.width /2;
        ball.y = canvas.height -60;
        ball.dx = 0;
        ball.dy = 0;
        // game over
        }else if (vidas == 0){
            document.getElementById("canvas").style.display = "none";
            document.getElementById("perder").style.display = "";
            document.getElementById("repetir").style.display = "";
            console.log("he perdido");
         //victoria   
        } else if (score == 65){
            ball.dx = 0;
            ball.dy = 0;
            speed = 0;
            document.getElementById("canvas").style.display = "none";
            document.getElementById("ganar").style.display = "block";
            document.getElementById("repetir").style.display = "";
            console.log("he ganado");
        }
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.font = " 40px kingdom";
    ctx.strokeText("Vidas: " + vidas , 450, 35);

    ctx.strokeStyle = 'black';
    ctx.font = "40px kingdom";
    ctx.strokeText("Puntuacion: " + score , 10, 35);

    ball.draw();
    raqueta.draw();
    moveRaqueta();
    drawLadrillos();
    colisionLadrillo();

    ball.x += ball.dx;
    ball.y += ball.dy;
   // angulo de colision con la raqueta
    if (ball.x >= raqueta.x && ball.x <= raqueta.x + raqueta.width &&
         ball.y + ball.radius >= canvas.height - raqueta.height - 10) {
             let collidePoint = ball.x - (raqueta.x + raqueta.width/2);
             collidePoint = collidePoint / (raqueta.width/2);
             let angle = collidePoint * Math.PI/3;
             ball.dx = speed * Math.sin(angle);
             ball.dy = -speed * Math.cos(angle);
         }
    
    

    requestAnimationFrame(play);


}
play();