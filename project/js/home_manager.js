const work = document.querySelector('.work')
const entertain = document.querySelector('.entertain')
const worklist = document.querySelector('.worklist')
const entertainlist = document.querySelector('.entertainlist')
work.onclick = function () {//办公和康乐点击后，不同类型会议纪要显示
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
const search_text = document.querySelector('.search_text')//搜索框样式设置
search_text.onfocus = function () {
    if (this.value === '请输入您想搜索的内容') {//获得焦点后颜色变深
        this.value = '';
    }
    this.style.color = '#333';
}
search_text.onblur = function () {//失去焦点颜色变浅
    if (this.value === '') {
        this.value = '请输入您想搜索的内容';
    }
    this.style.color = '#999';
}
const list = document.querySelectorAll('h3')
const search_icon = document.querySelector('.search_icon')
const latest = document.querySelector('.latest')
const latest_title = document.querySelectorAll('.latest_title')
const total_title = document.querySelector('.total_title')
const article = document.querySelectorAll('.article')
const update_name = document.querySelectorAll('.update_name')
var string = []
var l = latest_title.length
search_icon.onclick = function () {
    if (search_text.value == '请输入您想搜索的内容') {//查找功能实现
        alert('您没有输入内容!');
        return false;
    }
    else {
        var flag = 0
        entertainlist.style.display = 'block'
        latest.style.display = 'none'
        total_title.style.display = 'none'
        for (var i = 0; i < update_name.length; i++) {//上传者查询
            if ((update_name[i].innerText).includes(search_text.value) === true) {
                article[i].style.display = 'flex'
                flag = 1;
            }
            if ((update_name[i].innerText).includes(search_text.value) === false) {
                article[i].style.display = 'none'
            }
        }
        if (flag === 0) {
            for (var i = 0; i < list.length - l; i++) {//会议主题查询
                string[i] = list[i + l].innerText;
                if ((string[i]).includes(search_text.value) === true) {
                    article[i].style.display = 'flex'
                }
                if ((string[i]).includes(search_text.value) === false) {
                    article[i].style.display = 'none'
                }

            }
        }
    }
    search_text.value = '请输入您想搜索的内容';
}