const modify = document.querySelectorAll('.modify')
const textarea = document.querySelectorAll('textarea')
const sure = document.querySelectorAll('.sure')
const watch = document.querySelectorAll('.watch')
const back = document.querySelectorAll('.back')
for (var i = 0; i < modify.length; i++) {
    modify[i].id = i;
    sure[i].id = i;
    watch[i].id = i + modify.length;
    back[i].id = i + modify.length
}
var m1, m2, n, k, p1, p2;
document.onclick = function (e) {//监听判断是哪个点击
    var obj = event.target
    console.log(obj);
    console.log(obj.className);
    if (obj.className === 'modify') {//点击修改按钮
        n = obj.id;
        textarea[n].style.display = 'block'
        sure[n].style.display = 'block'
        modify[n].style.display = 'none'

    }
    if (obj.className === 'watch') {//点击查看按钮
        m1 = obj.id;
        m2 = obj.id - modify.length
        textarea[m1].style.display = 'block'
        back[m2].style.display = 'block'
        watch[m2].style.display = 'none'
        flag = 0;

    }
    if (obj.className === 'sure') {
        k = obj.id;
        if (textarea[k].value === '') {//回复内容为空
            textarea[k].style.display = 'none'
            sure[k].style.display = 'none'
            modify[k].style.display = 'block'
        }

    }
    if (obj.className === 'back') {
        p1 = obj.id;
        p2 = obj.id - modify.length
        textarea[p1].style.display = 'none'
        back[p2].style.display = 'none'
        watch[p2].style.display = 'block'

    }

}