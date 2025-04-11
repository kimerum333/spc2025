function greet(name){

    const greeting = '안녕하세요 ' + name;
    return greeting;
}

function printScreen(text){
    console.log(text);
}

printScreen(greet('철수'));