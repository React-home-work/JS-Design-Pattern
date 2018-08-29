
// high-order-function
Function.prototype.before = function(beforeFn) {
    var __self = this; //保存原函数的引用
    return function() {
        console.log('--------1--------', this);
        beforeFn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
};

Function.prototype.after = function(afterFn) {
    var __self = this;
    return function() {
        console.log('---------2--------', this);
        var ret = __self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
};

var func = function() {
    console.log(2);
};

func = func.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
});

func();
