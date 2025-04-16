//npm install readline

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('입력 전');

function userKeyboardInputHandler(input) {
    console.log('입력한 단은: ', input);

    const num = Number(input);
    for (let i = 1; i < 10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
    rl.close;
}

rl.question('구구단의 단을 입력하시오 : ', userKeyboardInputHandler);