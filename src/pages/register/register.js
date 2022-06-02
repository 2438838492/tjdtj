 require('./register.less');
//正则手机号码
let reg = /^1[3456789]\d{9}$/im;
//密码正则
let regtel = /\w{2,16}/im
document.querySelector('button').addEventListener('click', function (v) {
    if (tel() && pws() && sure()) {
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
                    location.href = 'http://127.0.0.1:5500/login.html'
                } else {
                    alert('账户已存在')
                }
            }
        })
    }
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
    }
}
//验证码

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
    }
} 
