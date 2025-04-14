//es6 방식으로 임포트하려면, 나의 프로젝트를 통째로 묶어서 프로젝트 스코프를 설정/정의해줘야 한다. 그걸 패키지라고 부른다.
import {addNumbers,subNumbers,mulNumbers,divNumbers} from './calculator.js';



const result = addNumbers(2,3);
console.log(result);

const result2 = subNumbers(2,3);
console.log(result2);