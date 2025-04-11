const Animal = require('./Animal'); // ← 확장자 생략해도 OK
const Dog = require('./Dog'); //
const Cat = require('./Cat'); //

let dolly = new Animal('dolly');
console.log(dolly.name);
dolly.makeSound();

let pup = new Dog('pup');
console.log(pup.name);
pup.makeSound();

let kitty = new Cat('kitty');
console.log(kitty.name);
kitty.makeSound();