const Person = require('./Person');

class Student extends Person{
    constructor(name,major){
        super(name);
        this.major = major;
    }
    greet(){
        return `Hello. I'm ${this.name}, I'm majoring in ${this.major} `;
    }
}

module.exports = Student;