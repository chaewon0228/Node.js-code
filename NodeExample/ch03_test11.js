let Users = [
    {name: 'txt', age:20},
    {name: '연준', age:22}
];

console.log('push() 호출 전 배열 요소의 수 : %d', Users.length);

Users.push({name:'휴닝',age:23});

console.log('push() 호출 후 배열 요소의 수 : %d', Users.length);
// 배열 끝에 있는 요소 삭제
Users.pop();

console.log('pop() 호출 후 배열 요소의 수 : %d', Users.length);