const Person = require('./Person');
const Student = require('./Student');
const Employee = require('./Employee');

let jake = new Person('jake');
console.log(jake.greet());

let bob = new Person('bob');
console.log(bob.greet());


let sam = new Student('sam','politics');
console.log(sam.greet());

let mike = new Employee('mike','developer');
console.log(mike.greet());