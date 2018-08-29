// 单例模式

// 保证一个类仅有一个实例， 并提供一个访问它的全局访问点。

// 普通单例 (1)
// var Singleton = function(name) {
//     this.name = name;
//     this.instance = null;
// }

// Singleton.prototype.getName = function() {
//     console.log(this.name);
// }

// Singleton.getInstance = function(name) {
//     if (!this.instance) {
//         this.instance = new Singleton(name);
//     }
//     return this.instance;
// }

// var a = Singleton.getInstance('A');
// var b = Singleton.getInstance('B');

// console.log(a === b); // true
// a.getName(); // A
// b.getName(); // A

// 普通单例 (2)

// var Singleton = function(name) {
//     this.name = name;
// }

// Singleton.prototype.getName = function() {
//     console.log(this.name);
// }

// Singleton.getInstance = (function(name) {
//     var instance = null;
//     return function(name) {
//         if(!instance) {
//             instance = new Singleton(name);
//         }
//         return instance;
//    }
// })();  // 此处通过即调函数将instance的Scope扩大到最外层，而实际上调用getInstance都调用的是
//         // return 的这个function， 而且instance相当于一个全局变量了。


// var a = Singleton.getInstance('A');
// var b = Singleton.getInstance('B');
// console.log(a === b); // true
// a.getName(); // A
// b.getName(); // A


// 用代理实现单例模式
var CreateDiv = function(html) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

var ProxySingleCreateDiv = (function() {
    var instance;
    return function(html) {
        if(!instance) {
            instance = new CreateDiv(html);
        }

        return instance;
    }
})();

var a = new ProxySingleCreateDiv('div1');
var b = new ProxySingleCreateDiv('div2');

console.log(a === b); // true
// a CreateDiv {html: "div1"}
// b CreateDiv {html: "div1"}


// 惰性单例 --- 指的是在需要的时候才创建对象实例
// 通用的惰性单例模式 （eg：窗口无需每次都创建，只在点击的时候创建，创建过后不再创建）

<html>
    <body>
        <button id="loginBtn">登陆</button>
    </body>
</html>

var getSingle = function(fn) {
    var result; // result 在闭包中，不会被销毁，用于保存是否被创建的状态
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var createLoginLayer = function() {
    var div = document.createElement('div');
    div.innerHTML = '登陆悬浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}

