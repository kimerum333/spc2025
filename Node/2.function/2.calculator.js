function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
    if(b==0){
        return '0으로 나눌 수 없습니다.';
    }
  return a / b;
}

function printScreen(text) {
  console.log(text);
}

let a = 10;
let b = 0;
printScreen(add(a,b));
printScreen(sub(a,b));
printScreen(mul(a,b));
printScreen(div(a,b));
printScreen(eval(a+b));