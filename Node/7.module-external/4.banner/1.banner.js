import chalk from "chalk";
import figlet from "figlet";

const word = 'VS CODE';

figlet(word, (err,data)=>{
    console.log(chalk.bgBlue.white(data));
});
