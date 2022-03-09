
// argv : 매개변수 정보
console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
// dir : 객체의 속성
console.dir(process.argv);

if(process.argv.length > 2){
    console.log('세번재 파라미터의 값 : %s', process.argv[2]);
}
process.argv.forEach(function(item, index){
    console.log(index + ' : ', item);
})