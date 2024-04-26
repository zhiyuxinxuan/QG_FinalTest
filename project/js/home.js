var left = 0;
var timer;
const imglist = document.querySelector('.imglist')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const icon = document.querySelectorAll('.icon')
run();
function run() {
    if (left <= -3200) {//轮播图
        left = 0;
    }
    var m = Math.floor(-left / 800)
    imglist.style.marginLeft = left + 'px';
    var n = (left % 800 == 0) ? n = 1200 : n = 10;
    left -= 10;
    timer = setTimeout(run, n)
    icochange(m);
}
//图片定位
function imgchange(n) {
    let lt = -(n * 800)
    imglist.style.marginLeft = lt + 'px'
    left = lt;
}
prev.onclick = function () {
    let prevgo = Math.floor(-left / 800) - 1;
    if (prevgo == -1) {
        prevgo = 3;
    }
    imgchange(prevgo);
}
next.onclick = function () {
    let nextgo = Math.floor(-left / 800) + 1;
    if (nextgo == 4) {
        nextgo = 0;
    }
    imgchange(nextgo);
}
function icochange(m) {
    for (var i = 0; i < icon.length; i++) {
        icon[i].style.backgroundColor = '';
    }
    if (m < icon.length) {
        icon[m].style.backgroundColor = 'white'
    }
}
const work = document.querySelector('.work')
const entertain = document.querySelector('.entertain')
const worklist = document.querySelector('.worklist')
const entertainlist = document.querySelector('.entertainlist')
work.onclick = function () {
    worklist.style.display = 'block'
    entertainlist.style.display = 'none'
    work.style.color = 'rgb(17, 129, 227)'
    entertain.style.color = '#000'
}
entertain.onclick = function () {
    worklist.style.display = 'none'
    entertainlist.style.display = 'block'
    entertain.style.color = 'rgb(17, 129, 227)'
    work.style.color = '#000'
}
function throttle(func, delay) {//节流
    var timer = null;
    return function () {
        var that = this;
        var args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                //执行事件处理程序
                func.call(that, args)
                //事件执行完后把定时器清除掉，下次触发事件的时候再设置
                timer = null;
            }, delay)
        }
    }
}
function handler() {
    console.log('页面发生了滚动');
}
document.addEventListener('scroll', throttle(handler, 1000))