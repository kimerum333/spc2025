//상수영역
const GAME_SPEED = 200; // ms (화면 갱신 주기)
const FIRST_APPLE = 5000;
const BLOCK_SIZE = 20;
const CANVAS = document.getElementById("snakeCanvas");
const CTX = CANVAS.getContext("2d");
const RIGHT_END = CANVAS.width-BLOCK_SIZE;
const DOWN_END = CANVAS.height-BLOCK_SIZE;
const MAX_X = CANVAS.width/BLOCK_SIZE;
const MAX_Y = CANVAS.height/BLOCK_SIZE;


let snake = {
  x: 0,
  y: 0,
  length: 1,
  dx: 0,
  dy: 0,
};

let apple = {
  x: -BLOCK_SIZE,
  y: -BLOCK_SIZE,
}

//DOM 과 여러 컴포넌트들 로드된 이후 콜백
window.onload = init;

function init() {
  //키 이벤트 리스너
  document.addEventListener("keydown", handlekeydown);
  //게임 시작 루프 호출
  //게임속도를 내 맘대로 조절 가능.
  setInterval(gameLoop, GAME_SPEED);
  setTimeout(setApple,FIRST_APPLE);
}

function gameLoop() {
  //뱀이동
  moveSnake();

  //화면에 그림
  draw();
}

function moveSnake() {
  snake.x += snake.dx*BLOCK_SIZE;
  snake.y += snake.dy*BLOCK_SIZE;

  //화면 반대편으로 날아가는 로직
  if(snake.x<0){
    snake.x = RIGHT_END;
  }
  if(snake.x>RIGHT_END){
    snake.x = 0;
  }
  if(snake.y<0){
    snake.y = DOWN_END;
  }
  if(snake.y>DOWN_END){
    snake.y = 0;
  }

  //사과 먹는 로직
  if(snake.x==apple.x&&snake.y==apple.y){
    setApple();
  }
}

function draw() {
  //화면에 뱀을 그린다.
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CTX.fillStyle = "blue";
  CTX.fillRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);

  //화면에 사과도 그린다.
  CTX.fillStyle = "red";
  CTX.fillRect(apple.x, apple.y, BLOCK_SIZE, BLOCK_SIZE);

}

function setApple(){
  let randomX = Math.floor(Math.random()*MAX_X)*BLOCK_SIZE;
  let randomY = Math.floor(Math.random()*MAX_Y)*BLOCK_SIZE;
  apple.x = randomX;
  apple.y = randomY;
}

function handlekeydown(e) {
  switch (e.key) {
    case "ArrowLeft":
      snake.dx = -1;
      snake.dy = 0;
      break;
    case "ArrowRight":
      snake.dx = 1;
      snake.dy = 0;
      break;
    case "ArrowUp":
      snake.dy = -1;
      snake.dx = 0;
      break;
    case "ArrowDown":
      snake.dy = 1;
      snake.dx = 0;
      break;
  }
}

//숙제1 뱀이 이동하게 한다.
//숙제2 화면을 벗어나지 않는 랜덤 위치에 사과를 만든다. =>너무 랜덤이면 좌표를 벗어난다!!! 각 맞출 고민을.
//숙제3 사과를 먹으면 먹으면 2 재실행
//숙제4 몸길이를 늘려서 따라오게 만든다. =>뱀은 배열써라
