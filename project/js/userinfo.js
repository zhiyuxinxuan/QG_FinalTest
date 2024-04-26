let file = document.getElementById('files')
let img = document.querySelector('.add_pic')
let cancel = document.querySelector('.cancel')
file.addEventListener('change', function (event) {
    const file = event.target.files[0]; // 获取文件对象
    if (file) {
        const objectURL = URL.createObjectURL(file); // 创建对象URL
        // 接下来你可以使用这个objectURL，比如将它设置为图片的src或者创建一个下载链接
        img.src = objectURL
        user_pic.src = objectURL
    }

});
img.addEventListener('click', () => {
    //创建图片预览器
    let container = document.createElement('div')
    container.classList.add("preview_container")
    container.onclick = function () {
        container.remove()
    }
    //创建预览图片
    let innerImg = document.createElement('img')
    innerImg.classList.add("images")
    //将预览图片设置为添加的图片
    innerImg.src = img.src
    container.onwheel = function (event) {//绑定鼠标滚动
        const width = getComputedStyle(innerImg).width.slice(0, -2)//设置图片的宽度
        const height = getComputedStyle(innerImg).height.slice(0, -2)//设置图片的高度
        if (event.deltaY > 0) {
            //向上滚动
            innerImg.style.width = parseInt(width) * 1.2 + 'px'
            innerImg.style.height = parseInt(height) * 1.2 + 'px'
        }
        else if (event.deltaY < 0) {
            //向下滚动
            innerImg.style.width = parseInt(width) * 0.8 + 'px'
            innerImg.style.height = parseInt(height) * 0.8 + 'px'
        }
    }
    //图片放入预览器
    container.append(innerImg)
    //预览器放入浏览器中
    document.body.append(container)
})
cancel.onclick = function () {
    img.src = "https://img95.699pic.com/xsj/0f/fa/81.jpg%21/fh/300"
}
const text = document.querySelectorAll('input')
const user_pic = document.querySelector('.user_pic')
const save = document.querySelector('.save')
save.onclick = function () {//保存数据到本地数据库
    var str = JSON.stringify({ 'username': text[0].value, 'password': text[1].value, 'nickname': text[2].value, 'email': text[3].value })
    console.log(str);
    localStorage.setItem('username', text[0].value);
    localStorage.setItem('password', text[1].value);
    localStorage.setItem('nickname', text[2].value);
    localStorage.setItem('email', text[3].value);

}
//若储存数据则显示
if ((window.localStorage.getItem('username') != null)) {
    var jsonData_u = localStorage.getItem('username');
    text[0].value = jsonData_u
}
if ((window.localStorage.getItem('password') != null)) {
    var jsonData_p = localStorage.getItem('password');
    text[1].value = jsonData_p
}
if ((window.localStorage.getItem('nickname') != null)) {
    var jsonData_n = localStorage.getItem('nickname');
    text[2].value = jsonData_n
}
if ((window.localStorage.getItem('nickname') != null)) {
    var jsonData_e = localStorage.getItem('email');
    text[3].value = jsonData_e
}
const back = document.querySelector('.return')//查看被退回原因，显示遮罩层
back.addEventListener('click', () => {
    //创建预览器
    let container = document.createElement('div')
    container.classList.add("reason_container")
    container.onclick = function () {
        container.remove()
    }
    //创建预览盒子
    let reason_text = document.createElement('div')
    let reason = document.createElement('span')
    reason_text.classList.add("reason_text")
    //将预览图片设置为添加的图片
    reason.innerText = "退回原因:\r1. 内容不全面\r2. 信息不准确\r3. 格式不规范\r4. 遗漏重要议题\r5. 表达不清晰\r6. 逻辑不严谨\r7. 审批流程不完整"
    reason_text.append(reason)
    //盒子放入预览器
    container.append(reason_text)
    //预览器放入浏览器中
    document.body.append(container)

})













