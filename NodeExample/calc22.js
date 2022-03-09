
let calc = {};

calc.add = function(a, b) {
    return a+b;
};
calc.sub = function(a, b) {
    return a-b;
};
calc.mult = function(a, b) {
    return a*b;
};
calc.div = function(a, b) {
    return a/b;
};
module.exports = calc;