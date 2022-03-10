let Users = [
    {name: 'txt', age:20},
    {name: '연준', age:22},
    {name: '휴닝', age:20}
];

console.log('배열 요소의 수 : %d', Users.length);
for (let i = 0; i < Users.length; i++) {
    onsole.log('배열 요소 #' + i + ' : %s', Users[i].name);
}

console.log('\nforEach 구문 사용하기');
Users.forEach(function(item, index) {
    console.log('배열 요소 #' + index + ' : %s', item.name);
});

