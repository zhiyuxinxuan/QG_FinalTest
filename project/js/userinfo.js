let file = document.getElementById('files')
let img = document.querySelector('.add_pic')
let cancel = document.querySelector('.cancel')
file.addEventListener('change', function (event) {
    const file = event.target.files[0]; // 获取文件对象
    if (file) {
        const objectURL = URL.createObjectURL(file); // 创建对象URL
        // 接下来你可以使用这个objectURL，比如将它设置为图片的src或者创建一个下载链接
        img.src = objectURL
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