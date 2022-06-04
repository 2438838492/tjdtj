require('../../assets/css/common.css');
require('../../assets/css/reset.css');
require('../../assets/fonts/iconfont.css')
require('./register.less');
//工具函数
const tools = require('../../assets/js/tools');
//引入captcha模块
const CaptchaMini = require("captcha-mini")
//正则手机号码
let reg = /^1[3456789]\d{9}$/im;
//密码正则
let regtel = /\w{2,16}/im
document.querySelector('button').addEventListener('click', function (v) {
    if (tel() && code() && pws() && sure()) {
        let account = document.querySelector('#username').value;
        let password = document.querySelector('#pws').value;
        // ajax对象
        let ajax = new XMLHttpRequest();
        //配置请求
        ajax.open('post', 'http://47.96.154.185:3701/api/user/register');
        //请求头
        ajax.setRequestHeader('Content-Type', 'application/json');
        //请求参数
        let data = JSON.stringify({ "account": account, "password": password });
        //发送请求
        ajax.send(data);
        //监听事件
        ajax.addEventListener('readystatechange', function (v) {
            if (ajax.readyState === 4 && ajax.status === 200) {
                let data = ajax.responseText;
                if (JSON.parse(data).errno === 0) {
                    alert(' 恭喜你注册成功 ');
                    location.href = './login.html'
                } else {
                    alert('账户已存在')
                }
            }
        })
    }
})

//验证码生成   
let captcha; //保存生成验证码 后面验证要用
document.addEventListener('DOMContentLoaded', function (r) {
    let captcha1 = new CaptchaMini();
    captcha1.draw(document.querySelector('#captcha1'), r => {
        captcha = r.toLowerCase();
    });
})

//变量验证真假
let corrct = true;
//手机验证
function tel() {
    let account = document.querySelector('#username').value;
    let password = document.querySelector('#pws').value;
    if (reg.test(account)) {
        document.querySelector('#username').style.border = '5px solid green';
        return corrct
    } else {
        document.querySelector('#username').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '亲输入正确的手机号'
    }
}

//验证码
function code() {
    let code = document.querySelector('#code').value;
    if (code === captcha) {
        document.querySelector('#code').style.border = '5px solid green';
        return corrct;
    } else {
        document.querySelector('#code').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '亲输入验证码'
    }
}

//密码验证
function pws() {
    let password = document.querySelector('#pws').value;
    if (regtel.test(password)) {
        document.querySelector('#pws').style.border = '5px solid green';
        return corrct;
    } else {
        document.querySelector('#pws').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '亲输入密码'
    }
}

//再次确认密码
function sure() {
    let password = document.querySelector('#pws').value;
    let sure = document.querySelector('#sure').value;
    if (password === sure) {
        document.querySelector('#sure').style.border = '5px solid green';
        return corrct;
    }
    else {
        document.querySelector('#sure').style.border = '5px solid red';
        let mes = tools.get('.mes');
        mes.innerText = '两次密码不一样'
    }
} 
