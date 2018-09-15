var strategies = {
    isNoneEmpty: function(value, errorMsg) {
        if(value === '') return errorMsg;
    },
    minLength: function(value, length, errorMsg) {
        if(value.length < length) return errorMsg;
    },
    isMobile: function(value, errorMsg){
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
    }
  };
  
  var validattaFunc = function() {
    var validator = new Validator();
    validator.add(registerForm.userName, 'isNoneEmpty', '用户名不能为空 username can not be none');
    validator.add(registerForm.passwd, 'minLength:6', '密码长度不能小于6位');
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
  
    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg;
  };
  
  var registerForm = document.getElementById('registerForm');
  registerForm.onsubmit = function() {
    var errorMsg = validattaFunc(); // 如果errorMsg不是undefined，则未通过校验
    if(errorMsg) {
        alert(errorMsg);
        return false; // 阻止表单提交
    }
    return false
  }
  
  var Validator = function() {
    this.cache = [];
  };
  
  Validator.prototype.add = function(dom, rule, errorMsg) {
    var ary = rule.split(':');      // 分离strategy的参数
  
    this.cache.push(function() {    // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift();     // 用户挑选的strategy
        ary.unshift(dom.value);     // 把input的value添加进入参数列表
        ary.push(errorMsg);
        return strategies[strategy].apply(dom, ary);
    });
  };
  
  Validator.prototype.start = function() {
    for(var i=0, validattaFunc; validattaFunc=this.cache[i++];) {
        var msg = validattaFunc();
        if(msg) return msg;
    }
  };
  