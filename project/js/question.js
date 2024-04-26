const save = document.querySelector('.save')
const question = document.querySelector('textarea')
save.onclick = function () {//本地储存
    localStorage.setItem('question', question.value)
}
if ((window.localStorage.getItem('question') != null)) {
    var jsonData_q = localStorage.getItem('question');
    question.value = jsonData_q
}