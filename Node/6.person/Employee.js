const Person = require('./Person');

class Employee extends Person{
    constructor(name,jobTitle){
        super(name);
        this.jobTitle = jobTitle;
    }
    greet(){
        return `Hello. I'm ${this.name}, my job is ${this.jobTitle} `;
    }
}

module.exports = Employee;