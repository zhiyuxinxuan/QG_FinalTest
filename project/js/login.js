var text = document.querySelectorAll('input');
var btn_see = document.querySelector('.see');
var btn_login = document.querySelector('.login');
var btn_register = document.querySelector('.register');
var checkbox = document.querySelector('.remember')
var tip_top = document.querySelectorAll('.tip_top')
var nav = document.querySelector('.nav')
var flag = 0;
// var http = require('http');
// const server=http.createServer()
// server.on('request', (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
// })
text[0].onfocus = function () {//用户输入框设置
    if (this.value === '请输入用户名') {
        this.value = '';
        this.style.color = '#999';
    }
    this.style.color = '#333';
}
text[0].onblur = function () {//密码输入框设置
    if (this.value === '') {
        this.value = '请输入用户名';
        this.style.color = '#999';
    }
    else
        this.style.color = '#333';

}
text[1].onfocus = function () {
    if (this.value === '请输入密码') {
        this.value = '';
        this.style.color = '#999';
    }
    this.style.color = '#333';
    if (flag == 0)
        this.type = 'password';
    else
        this.type = 'text'
}
text[1].onblur = function () {
    if (this.value === '') {
        this.type = 'text';
        this.value = '请输入密码';
        this.style.color = '#999';
    }
    else
        this.style.color = '#333';
}
btn_see.onclick = function () {
    if (text[1].value == '请输入密码') {
        alert('您没有输入密码!');
        return false;
    }
    else {
        if (flag == 0) {
            text[1].type = 'text';
            text[1].style.color = '#333';
            this.innerHTML = '';
            flag = 1;
        }
        else {
            text[1].type = 'password';
            text[1].style.color = '#333';
            this.innerHTML = '';
            flag = 0;
        }
    }
}
btn_login.onclick = function () {
    if (text[0].value == '请输入用户名') {
        alert('您没有输入用户名!');
        return false;
    }
    else if (text[1].value == '请输入密码') {
        alert('您没有输入密码!');
        return false;
    }
    else {
        var str = JSON.stringify({ 'username': text[0].value, 'password': text[1].value })
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://127.0.0.1:80/api/login')
        xhr.setRequestHeader('content-Type', 'application/json')
        xhr.send(str)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
                var response = JSON.parse(xhr.responseText)
                if (response.message === '用户不存在，请先注册！') {//设置不同错误的提示
                    tip_top[1].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[0].style.display = 'block'
                    nav.style.height = '67px'
                    nav.setAttribute('class', 'nav margin_top')
                }
                else if (response.message === '密码输入错误，登录失败！') {//设置不同错误的提示
                    tip_top[1].style.display = 'none'
                    tip_top[0].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[1].style.display = 'block'
                    nav.style.height = '67px'
                    nav.setAttribute('class', 'nav margin_top')
                }
            }

        }
    }
    if (checkbox.checked == true) {
        localStorage.setItem('username', text[0].value);
        localStorage.setItem('password', text[1].value);
    }
}
btn_register.onclick = function () {
    if (text[0].value == '请输入用户名') {
        alert('您没有输入用户名!');
        return false;
    }
    else if (text[1].value == '请输入密码') {
        alert('您没有输入密码!');
        return false;
    }
    else {
        var str = JSON.stringify({ 'username': text[0].value, 'password': text[1].value })
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://127.0.0.1:80/api/register')
        xhr.setRequestHeader('content-Type', 'application/json')
        xhr.send(str)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText))
                var response = JSON.parse(xhr.responseText)
                if (response.message === '用户名被占用！') {//设置不同错误的提示
                    tip_top[1].style.display = 'none'
                    tip_top[3].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[2].style.display = 'block'
                    nav.style.height = '67px'
                    nav.setAttribute('class', 'nav margin_top')
                }
                if (response.message === '注册用户失败，请稍后再试！') {//设置不同错误的提示
                    tip_top[1].style.display = 'none'
                    tip_top[2].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[3].style.display = 'block'
                    nav.style.height = '67px'
                    nav.setAttribute('class', 'nav margin_top')
                }
                if (response.message === '注册用户成功！') {//设置不同错误的提示
                    tip_top[1].style.display = 'none'
                    tip_top[2].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[3].style.display = 'none'
                    nav.setAttribute('class', 'nav')
                    tip_top[4].style.display = 'block'
                    tip_top[4].setAttribute('class', 'success tip_top')
                    nav.style.height = '67px'
                    nav.setAttribute('class', 'nav margin_top')
                }
            }
        }
    }
}
var login_t = document.querySelector('.login_title');
var register_t = document.querySelector('.register_title')
register_t.onclick = function () {//注册与登录切换
    text[0].value = '请输入用户名';
    text[0].style.color = '#999';
    text[1].value = '请输入密码';
    text[1].type = 'text';
    text[1].style.color = '#999';
    btn_login.style.display = 'none';
    btn_register.style.display = 'block';
    login_t.removeAttribute('class', 'blue')
    login_t.setAttribute('class', 'login_title black')
    this.setAttribute('class', 'register_title blue')
    tip_top[0].style.display = 'none'
    tip_top[1].style.display = 'none'
    nav.setAttribute('class', 'nav')
    nav.style.height = '40px'
}
login_t.onclick = function () {//注册与登录切换
    if ((window.localStorage.getItem('username') != null) && (window.localStorage.getItem('password') != null)) {
        var jsonData_u = localStorage.getItem('username');
        var jsonData_p = localStorage.getItem('password');
        text[0].value = jsonData_u
        text[0].style.color = '#333';
        text[1].value = jsonData_p
        text[1].style.color = '#333';
        text[1].type = 'password'
        tip_top[4].style.display = 'none'
        nav.setAttribute('class', 'nav')
        nav.style.height = '40px'
    }
    else {
        text[0].value = '请输入用户名';
        text[0].style.color = '#999';
        text[1].value = '请输入密码';
        text[1].type = 'text';
        text[1].style.color = '#999';
    }
    btn_register.style.display = 'none';
    btn_login.style.display = 'block';
    register_t.removeAttribute('class', 'blue')
    register_t.setAttribute('class', 'register_title black')
    this.setAttribute('class', 'login_title blue')
}
//储存登录上一次输入的内容
if ((window.localStorage.getItem('username') != null) && (window.localStorage.getItem('password') != null)) {
    var jsonData_u = localStorage.getItem('username');
    var jsonData_p = localStorage.getItem('password');
    text[0].value = jsonData_u
    text[0].style.color = '#333';
    text[1].value = jsonData_p
    text[1].style.color = '#333';
    text[1].type = 'password'
}