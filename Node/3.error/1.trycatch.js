//const result = someVariable * 2;

try {
    //참조 오류 예시
    //const result = someVariable * 2;

    //재할당 오류 예시
    //const result = 1;
    //result = 0;

    //문법 오류 예시
    //console.log( eval('4+"1'));

    //범위 에러 예시
    let arr = new Array(-1);
} catch (e) {
    if (e instanceof ReferenceError) {
        console.log("참조 오류 발생");
    } else if (e instanceof RangeError) {
        console.log("레인지 에러 발생");
    } else {
        console.log("다른 오류 발생");
    }
    console.error("오류가 발생했음", e);
}
console.log("계속진행중");


//에러 만들기
function divide(a, b) {
    if(typeof a !=='number' || typeof a !=='number' ){
        throw new Error('숫자를 입력하세요')
    }

    if(b===0){
        throw new Error('0으로 나눌 수 없습니다.');
    }
    return a / b;
}

try{
    divide(5,0);
}catch(e){
    console.log('오류발생: ', e.message)
}


try{
    divide('철수','영희');
}catch(e){
    console.log('오류발생: ', e.message)
}