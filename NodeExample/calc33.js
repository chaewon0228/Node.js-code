var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Calc = function(){
    this.on('start', function(){
        console.log('Calc에 start event 전달됨');
    });
    this.on('subtitle', function(){
        console.log('계산기 이벤트 발생함');
    })
    this.on('cal', function(){
        console.log('계산기 이벤트 발생함');
    })
};
util.inherits(Calc, EventEmitter);
Calc.prototype.add = function(a, b){
    return a + b;
}
Calc.prototype.substract = function(a, b){
    return a - b;
}
Calc.prototype.multiply = function(a, b){
    return a * b;
}
Calc.prototype.divide = function(a, b){
    return a / b;
}

module.exports = Calc;
module.exports.title = 'calculator';