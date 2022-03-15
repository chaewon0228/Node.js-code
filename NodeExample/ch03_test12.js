
let Users = [{name:'txt',age:20},{name:'휴닝',age:22}];

console.log('unshift() 호출 전 배열 요소의 수 : %d', Users.length);
Users.unshift({name:'연준',age:23});

console.log('unshift() 호출 후 배열 요소의 수 : %d', Users.length);
console.dir(Users);
Users.shift();

console.log('shift() 호출 후 배열 요소의 수 : %d', Users.length);
console.dir(Users);