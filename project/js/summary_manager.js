const watch = document.querySelectorAll('.watch')//查看被退回原因，显示遮罩层
const topic = document.querySelectorAll('.topic')
const bin = document.querySelectorAll('.delete')
const checked = document.querySelectorAll('.checked')
const unchecked = document.querySelectorAll('.unchecked')
const modify = document.querySelectorAll('.modify')
const pass = document.querySelectorAll('.pass')
const back = document.querySelectorAll('.back')
const list = document.querySelector('.list')
const type = document.querySelectorAll('.type')
const label = document.querySelectorAll('.label')
const time = document.querySelectorAll('.time')
for (var i = 0; i < watch.length; i++) {//给每个预览图标添加id，方便区分
    watch[i].id = i;
    topic[i].id = i;
}
for (var i = 0; i < bin.length; i++) {//给每个删除、修改图标添加id，方便区分
    bin[i].id = i;
    modify[i].id = i;
}
for (var i = 0; i < unchecked.length; i++) {//给每个通过、不通过添加id，方便区分
    pass[i].id = i;
    back[i].id = i;
    type[i].id = i;
    label[i].id = i;
    time[i].id = i;
}
var m, n, k, p, q;
document.onclick = function (e) {//监听判断是哪个点击
    var obj = event.target
    if (obj.className === 'watch') {//点击修改按钮
        n = obj.id;
        let container = document.createElement('div')
        container.classList.add("summary_container")
        let close = document.createElement('i')
        close.classList.add("close")
        close.innerText = ''
        close.onclick = function () {
            container.remove()
        }
        let summary_text = document.createElement('div')
        summary_text.classList.add("summary_text")
        let summary = document.createElement('span')
        summary.innerText = topic[n].innerText
        summary_text.append(close)
        summary_text.append(summary)
        //盒子放入预览器
        container.append(summary_text)
        //预览器放入浏览器中
        document.body.append(container)
    }
    if (obj.className === 'modify') {//点击修改按钮
        m = obj.id;
        let container = document.createElement('div')
        container.classList.add("summary_container")
        let close = document.createElement('i')
        close.classList.add("close")
        close.innerText = ''
        close.onclick = function () {
            container.remove()
        }
        let summary_text = document.createElement('div')
        summary_text.classList.add("summary_text")
        let summary = document.createElement('span')
        summary.innerText = topic[m].innerText
        summary.contentEditable = 'true'
        summary_text.append(close)
        summary_text.append(summary)
        //盒子放入预览器
        container.append(summary_text)
        //预览器放入浏览器中
        document.body.append(container)
    }
    if (obj.className === 'delete') {
        k = obj.id
        checked[k].remove()
    }
    if (obj.className === 'back') {
        p = obj.id
        unchecked[p].remove()
    }
    if (obj.className === 'pass') {//点击通过按钮
        q = obj.id
        var text = topic[q].innerText
        unchecked[q].remove()
        let check = document.createElement('div')//生成已审核样式
        check.classList.add("checked")
        let title = document.createElement('a')
        title.classList.add("topic")
        title.href = 'javascript:void(0)'
        title.innerText = text
        let ability = document.createElement('div')
        ability.classList.add("function")
        let kind = document.createElement('span')
        kind.classList.add("type")
        kind.innerText = type[q].innerText
        let tip = document.createElement('span')
        tip.classList.add("label")
        tip.innerText = label[q].innerText
        let when = document.createElement('span')
        when.classList.add("time")
        when.innerText = time[q].innerText
        let see = document.createElement('i')
        see.classList.add('watch')
        see.innerText = ''
        let change = document.createElement('i')
        change.classList.add('modify')
        change.innerText = ''
        let clear = document.createElement('i')
        clear.classList.add('delete')
        clear.innerText = ''
        ability.append(see)
        ability.append(change)
        ability.append(clear)
        check.append(title)
        check.append(kind)
        check.append(tip)
        check.append(when)
        check.append(ability)
        list.appendChild(check)
    }
}
const search_icon = document.querySelector('.search_icon')
const search_text = document.querySelector('.search_text')
search_text.onfocus = function () {
    if (this.value === '请输入您想搜索的内容') {
        this.value = '';
    }
    this.style.color = '#333';
}
search_text.onblur = function () {
    if (this.value === '') {
        this.value = '请输入您想搜索的内容';
    }
    this.style.color = '#999';
}
var string = []
search_icon.onclick = function () {
    var l = unchecked.length
    if (search_text.value == '请输入您想搜索的内容') {//查找功能实现
        alert('您没有输入内容!');
        for (var i = 0; i < topic.length; i++) {
            console.log(topic[i]);
            if (i < l)
                unchecked[i].style.display = 'flex'
            else
                checked[i - l].style.display = 'flex'
        }
        return false;
    }
    else {
        for (var i = 0; i < topic.length; i++) {//对于符合要求的显示，不同的不显示
            string[i] = topic[i];
            console.log(string[i]);
            if (((string[i].innerText).includes(search_text.value) === true) && (i < l)) {
                unchecked[i].style.display = 'flex'
            }
            if (((string[i].innerText).includes(search_text.value) === true) && (i >= l)) {
                checked[i - l].style.display = 'flex'
            }
            if (((string[i].innerText).includes(search_text.value) === false) && (i < l)) {
                unchecked[i].style.display = 'none'
            }
            if (((string[i].innerText).includes(search_text.value) === false) && (i >= l)) {
                checked[i - l].style.display = 'none'
            }
        }
    }
}
const select_type = document.querySelector('.select_type')
const select_label = document.querySelector('.select_label')
select_type.onchange = function (e) {
    var l = unchecked.length
    if (e.target.className === 'select_type') {//筛选会议类型
        select_label.value = ''
        select_label.disabled = 'true'
        if (e.target.value === 'work') {
            for (var i = 0; i < topic.length; i++) {
                if (((type[i].innerText).includes('办公') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((type[i].innerText).includes('办公') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((type[i].innerText).includes('办公') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((type[i].innerText).includes('办公') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'entertain') {
            for (var i = 0; i < topic.length; i++) {
                if (((type[i].innerText).includes('康乐') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((type[i].innerText).includes('康乐') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((type[i].innerText).includes('康乐') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((type[i].innerText).includes('康乐') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'none') {
            select_label.removeAttribute('disabled')
            for (var i = 0; i < topic.length; i++) {
                if (i < l) {
                    unchecked[i].style.display = 'flex'
                }
                if (i >= l) {
                    checked[i - l].style.display = 'flex'
                }
            }
        }
    }
}
select_label.onchange = function (e) {
    var l = unchecked.length
    if (e.target.className === 'select_label') {//会议标签筛选
        select_type.value = 'none'
        select_type.disabled = 'true'
        if (e.target.value === 'urgent') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('加急') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('加急') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('加急') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('加急') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'competition') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('比赛') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('比赛') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('比赛') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('比赛') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'outsource') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('外包') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('外包') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('外包') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('外包') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'group') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('组会') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('组会') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('组会') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('组会') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'all') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('全体大会') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('全体大会') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('全体大会') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('全体大会') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === 'none') {
            for (var i = 0; i < topic.length; i++) {
                if (((label[i].innerText).includes('无') === true) && (i < l)) {
                    unchecked[i].style.display = 'flex'
                }
                if (((label[i].innerText).includes('无') === true) && (i >= l)) {
                    checked[i - l].style.display = 'flex'
                }
                if (((label[i].innerText).includes('无') === false) && (i < l)) {
                    unchecked[i].style.display = 'none'
                }
                if (((label[i].innerText).includes('无') === false) && (i >= l)) {
                    checked[i - l].style.display = 'none'
                }
            }
        }
        if (e.target.value === '') {
            select_type.removeAttribute('disabled')
            for (var i = 0; i < topic.length; i++) {
                if (i < l) {
                    unchecked[i].style.display = 'flex'
                }
                if (i >= l) {
                    checked[i - l].style.display = 'flex'
                }
            }
        }
    }
}