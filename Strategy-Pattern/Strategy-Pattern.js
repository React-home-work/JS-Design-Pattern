// 策略模式 Strategy Pattern

// 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
// eg: 评级·S A B C  薪水~salary 算年终奖

var strategies = {
    "S": salary => salary*4,
    "A": salary => salary*3,
    "B": salary => salary*2,
};

var calculateBonus = (level, salary) => strategies[level](salary);

console.log(calculateBonus('S', 20000)); // 80000 S评级，工资20000 奖金为80000
console.log(calculateBonus('A', 10000)); // 30000 A评级，工资10000 奖金为30000

// 小球移动
var tween = {
    linear: (t,b,c,d) => c*t/d + b,
    easeIn: (t,b,c,d) => c*(t/=d)*t+b,
    strongEaseIn: (t,b,c,d) => c*(t/=d)*t*t*t*t+b,
    strongEaseOut: (t,b,c,d) => c*((t=t/d-1)*t*t*t*t+1)+b,
    sineaseIn: (t,b,c,d) => c*(t=t/d)*t*t+b,
    sineaseOut: (t,b,c,d) => c*((t=t/d-1)*t*t+1)+b,
}

<body>
    <div style="position:absolute;background:blue" id="div">I am DIV</div>
</body>

var Animate = function(dom) {
    this.dom = dom;                 // 进行运动的dom节点
    this.startTime = 0;             // 动画开始时间
    this.startPos = 0;              // dom初始位置
    this.endPos = 0;                // dom目标位置
    this.propertyName = null;       // dom 节点需要被改变的css属性名
    this.easing = null;             // 缓动算法
    this.duration = null;
}

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date;     // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName];     // dom节点的初始位置
    this.propertyName = propertyName;       // dom节点需要被改变的CSS属性名
    this.endPos = endPos;           
    this.duration = duration;       // 动画持续时间
    this.easing = tween[easing];    // 缓动算法

    var self = this;
    var timeId = setInterval(() => {
        if(self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
};

Animate.prototype.step = function() {
    var t = +new Date;              // 取得当前时间
    if(t >= this.startTime + this.duration) {   
        // if当前时间大于动画开始时间加上动画持续时间之和，说明动画结束，需要修正小球位置
        this.update(this.endPos);
        return false
    }

    var pos = this.easing(t - this.startTime, this.startPos,
        this.endPos - this.startPos, this.duration);
    this.update(pos);
}

Animate.prototype.update = function(pos){
    return (this.dom.style[this.propertyName] = pos + 'px');
};

var div = document.getElementById('div');
var animate = new Animate(div);

animate.start('left', 500, 1000, 'strongEaseOut');
// animate.start('left', 500, 1000, 'strongEaseIn');