class Person{
    constructor(name){
        this.name = name;
    }
    greet(){
        return `Hello. I'm ${this.name} `;
    }
}

module.exports = Person;