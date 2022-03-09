// calc 모듈 정의 -> 실행은 이 파일에서

let calc = require('./calc');
console.log('방법1 : 모둘로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(10, 10));
