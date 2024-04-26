var inp = document.querySelectorAll('input')
function debounce(func, delay) {
    var timer = null;
    return function () {//防抖
        var that = this;
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            func.call(that, args)
        }, delay)
    }
}
function handler() {
    console.log(this.value);
}
for (var i = 0; i < inp.length; i++)
    inp[i].addEventListener('input', debounce(handler, 1000))
function throttle(func, delay) {
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