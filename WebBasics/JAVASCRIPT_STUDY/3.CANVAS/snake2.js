//상수영역
const GAME_SPEED = 200; // ms (화면 갱신 주기)
const FIRST_APPLE = 5000;
const BLOCK_SIZE = 20;
const CANVAS = document.getElementById("snakeCanvas");
const CTX = CANVAS.getContext("2d");
const RIGHT_END = CANVAS.width - BLOCK_SIZE;
const DOWN_END = CANVAS.height - BLOCK_SIZE;
const MAX_X = CANVAS.width / BLOCK_SIZE;
const MAX_Y = CANVAS.height / BLOCK_SIZE;

let snake = {
  x: 0,
  y: 0,
  length: 1,
  direction: "right",
};

let apple = {
  x: -BLOCK_SIZE,
  y: -BLOCK_SIZE,
};

//DOM 과 여러 컴포넌트들 로드된 이후 콜백
window.onload = init;

function init() {
  //키 이벤트 리스너
  document.addEventListener("keydown", handlekeydown);
  //게임 시작 루프 호출
  //게임속도를 내 맘대로 조절 가능.
  setInterval(gameLoop, GAME_SPEED);
  setTimeout(setApple, FIRST_APPLE);
}

function gameLoop() {
  //뱀이동
  moveSnake();

  //화면에 그림
  draw();
}

function moveSnake() {
  //  snake.x += snake.dx*BLOCK_SIZE;
  //  snake.y += snake.dy*BLOCK_SIZE;

  switch (snake.direction) {
    case "up":
      snake.y -= 1 * BLOCK_SIZE;
      break;
    case "down":
      snake.y += 1 * BLOCK_SIZE;
      break;
    case "left":
      snake.x -= 1 * BLOCK_SIZE;
      break;
    case "right":
      snake.x += 1 * BLOCK_SIZE;
      break;
  }
  //화면 끝에서 멈추는 로직
  if (snake.x < 0) {
    snake.x = 0;
  }
  if (snake.x > RIGHT_END) {
    snake.x = CANVAS.RIGHT_END;
  }
  if (snake.y < 0) {
    snake.y = 0;
  }
  if (snake.y > DOWN_END) {
    snake.y = DOWN_END;
  }

  //사과 먹는 로직
  if (snake.x == apple.x && snake.y == apple.y) {
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

function setApple() {
  let randomX = Math.floor(Math.random() * MAX_X) * BLOCK_SIZE;
  let randomY = Math.floor(Math.random() * MAX_Y) * BLOCK_SIZE;
  apple.x = randomX;
  apple.y = randomY;
}

function handlekeydown(e) {
  switch (e.key) {
    case "ArrowLeft":
      console.log("left");
      snake.direction = "left";
      break;
    case "ArrowRight":
      console.log("right");
      snake.direction = "right";
      break;
    case "ArrowUp":
      console.log("up");
      snake.direction = "up";
      break;
    case "ArrowDown":
      console.log("down");
      snake.direction = "down";
      break;
  }
}

//숙제1 뱀이 이동하게 한다.
//숙제2 화면을 벗어나지 않는 랜덤 위치에 사과를 만든다. =>너무 랜덤이면 좌표를 벗어난다!!! 각 맞출 고민을.
//숙제3 사과를 먹으면 먹으면 2 재실행
//숙제4 몸길이를 늘려서 따라오게 만든다. =>뱀은 배열써라
