//상수영역
const GAME_SPEED = 200; // ms (화면 갱신 주기)
const BLOCK_SIZE = 20;
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

let snake = { x: 0, y: 0, length: 1 };

//DOM 과 여러 컴포넌트들 로드된 이후 콜백
window.onload = init;

function init() {

  //키 이벤트 리스너
  document.addEventListener("keydown", handlekeydown);
  //게임 시작 루프 호출
  //게임속도를 내 맘대로 조절 가능.
  setInterval(gameLoop, GAME_SPEED);
}

function gameLoop() {
  //뱀이동
  moveSnake();

  //화면에 그림
  draw();
}

function moveSnake() {
}

function draw() {
  //화면에 뱀을 그린다.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "blue";
  ctx.fillRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);
}

function handlekeydown(e) {
    switch(e.key){
        case "ArrowLeft":
            break;
        case "ArrowRight":
            break;
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
    }
}

//숙제1 뱀이 이동하게 한다.
//숙제2 화면을 벗어나지 않는 랜덤 위치에 사과를 만든다. =>너무 랜덤이면 좌표를 벗어난다!!! 각 맞출 고민을.
//숙제3 사과를 먹으면 먹으면 2 재실행
//숙제4 몸길이를 늘려서 따라오게 만든다. =>뱀은 배열써라