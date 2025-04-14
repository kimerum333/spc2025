function addNumbers(a, b) {
    return a + b;
}

function subNumbers(a, b) {
    return a - b;
}
function mulNumbers(a, b) {
    return a * b;
}
function divNumbers(a, b) {
    return a / b;
}

//객체 말고 함수를 내보내는 것도 가능.
//여러개 내보내는 것도 가능.
module.exports = {
    addNumbers,
    subNumbers,
    mulNumbers,
    divNumbers,
};