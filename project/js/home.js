var left = 0;
var timer;
const imglist = document.querySelector('.imglist')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const icon = document.getElementById('iconlist').getElementsByTagName('li')
run();
function run() {
    if (left <= -3200) {
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