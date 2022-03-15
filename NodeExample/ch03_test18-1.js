function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
    console.log(speed + 'km 속도로 걸어갑니다.');
}
Person.prototype.eat = function(food){
    console.log(food + '를 맛있게 먹습니다.');
}
Person.prototype.sing = function(sing){
    console.log(sing + '를 역동적으로 부릅니다.');
}

let person01 = new Person('3110 윤채원', 19);
let person02 = new Person('txt', 21);
let person03 = new Person('연준', 22);

console.log(person01.name + ' 객체의 walk(10)을 호출합니다.');
person01.walk(10);

console.log(person02.name + ' 객체의 eat("pizza")을 호출합니다.');
person02.eat("pizza");

console.log(person02.name + ' 객체의 sing("5시 53분의 하늘에서 발견한 너와 나")을 호출합니다.');
person02.sing("5시 53분의 하늘에서 발견한 너와 나");