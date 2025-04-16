//import
//const chalk = require('chalk');
import chalk from "chalk";

console.log(chalk.green('성공 메시지는 초록색으로'));
console.log(chalk.red('실패는 빨간색으로'));

console.log(chalk.red.bold('실패는 굵은 빨간색으로'));
console.log(chalk.bgBlue.white('이건 블루스크린 느낌으로'));

console.log(chalk.yellow.underline('경고는 노랑에 밑줄'));