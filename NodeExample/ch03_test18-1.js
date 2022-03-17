function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.study = function(subject) {
    console.log(subject + '를 열심히 공부합니다.');
}
Person.prototype.solved = function(coding){
    console.log(coding + ' 문제를 빠르고 정확하게 풉니다.');
}
Person.prototype.dance = function(dance){
    console.log(dance + '를 역동적으로 춤춥니다.');
}

let student01 = new Person('3110 윤채원', 19);
let student02 = new Person('txt', 21);
let student03 = new Person('연준', 22);

console.log(student01.name + ' 객체의 study("Node.js")을 호출합니다.');
student01.study("Node.js");

console.log(student02.name + ' 객체의 solved("백준")을 호출합니다.');
student02.solved("백준");

console.log(student03.name + ' 객체의 dance("5시 53분의 하늘에서 발견한 너와 나")을 호출합니다.');
student03.dance("5시 53분의 하늘에서 발견한 너와 나");