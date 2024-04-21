// const { verify } = require('crypto');
const route = require('./router/user')//获取路由
const http = require('http');
var fs = require('fs');
const { log } = require('console');
const serverHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json,text/html,stylesheet,script');//设置接受内容
    // res.setHeader('Access-Control-Allow-Origin', '*');//设置可通过形式
    res.setHeader('Access-Control-Allow-Origin', 'null');//设置可通过形式
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With');
    // res.setHeader('Access-Control-Allow-Header', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (res.methord === 'OPTION') {
        res.writeHead(200)
        res.end();
        return;
    }
    const responseData = route(req, res);
    var url = req.url
    if (url === '/api') {
        fs.readFile(__dirname + '/views/login.html', 'utf-8', function (err, data) {//写入登录html
            if (err) {
                res.end('error')
            }
            else {
                res.end(data)
                return;
            }
        })
    }
    else if (responseData) {
        // console.log(responseData);
        res.end(JSON.stringify(responseData))//返回不同状态
        return;
    }
    // res.writeHead(404, { 'Content-Type': 'application/plain' })//判断是否存在
    // res.write('404 Not Found');
    // res.end();
}



const server = http.createServer(serverHandler)
server.listen(80, () => {//监听端口
    console.log('api server running at PORT')
})