class MathOps{
    static add(a,b){
        return a+b;
    }
    sub(a,b){
        return a-b;
    }
}

const sum = MathOps.add(10,5);
console.log(sum);

//스태틱 메서드는 인스턴스에서부터 접근하는건 불가능.
const myMathOp = new MathOps();
console.log(myMathOp.sub(3,4));