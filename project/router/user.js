var flag = 1;//辅助判断
var index = 1;
var loginusername;//获取登录成功的用户名
//导入数据库操作模块
const db = require('../db/index')
//导入bcryptjs对密码进行加密
const bcrypt = require('bcryptjs')
//生成token字符串
const jwt = require('jsonwebtoken')
const config = require('../config')
const fs = require('fs');
const { log } = require('console');
const { userInfo } = require('os');
var tokenstr;//接收token字符串
//注册路由
const route = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0];
    res.setHeader('Access-Control-Allow-Origin', 'null');//设置可通过形式
    if (method === 'POST' && path === '/api/register') {//注册的判断
        // res.setHeader('Access-Control-Allow-Origin', 'null');//设置可通过形式
        let postdata = '';
        req.on('data', chunk => {//流的方式获取数据
            postdata += chunk.toString();
        })
        req.on('end', () => {
            const userinfo = JSON.parse(postdata)//json转换
            console.log(postdata);
            const sqlStr = 'select * from ev_users where username=?'//判断数据库中是否已存在
            db.query(sqlStr, userinfo.username, (err, results) => {
                if (err) {
                    return {
                        status: 0,
                        message: err.message
                    }
                }
                if (results.length > 0) {//在数据库中已经存在
                    flag = -1;
                }
            })
            if (!userinfo.username || !userinfo.password) {//查看是否为空
                flag = 0;
            }
            else {
                flag = 1;
                userinfo.password = bcrypt.hashSync(userinfo.password, 10)//对密码进行加密处理
                //定义插入新用户的sql语句
                const sql = 'insert into ev_users set?'
                //调用qb.query()执行sql语句
                db.query(sql, { username: userinfo.username, password: userinfo.password, status: userinfo.status }, (err, results) => {
                    //判断sql语句是否执行成功
                    if (err) {
                        return {
                            status: 0,
                            message: err.message
                        }
                    }
                    if (results.affectedRows != 1) {
                        flag = -2;
                    }

                })
            }
        })
        if (flag === 0) {
            return {
                status: 0,
                message: '用户名或者密码不合法！'
            }
        }
        else if (flag == -1) {
            return {
                status: 0,
                message: '用户名被占用！'
            }
        }
        else if (flag === -2) {
            return {
                status: 0,
                message: '注册用户失败，请稍后再试！'
            }
        }
        else {
            return {
                status: 1,
                message: '注册用户成功！'
            }
        }
    }
    // if (method === 'GET' && path === '/api/register') {//注册的判断
    //     res.setHeader('Access-Control-Allow-Origin', 'null');//设置可通过形式
    //     return {
    //         status: 1,
    //         message: '注册用户成功！'
    //     }
    // }
    else if (method === 'POST' && path === '/api/login') {//登陆的判断
        let postdata = '';
        req.on('data', chunk => {//流的方式获取数据
            postdata += chunk.toString();
        })
        req.on('end', () => {
            const userinfo = JSON.parse(postdata)//json转换
            console.log(postdata);
            if (!userinfo.username || !userinfo.password) {//查看是否为空
                index = 0;
            }
            else {
                index = 1
                const sql = 'select * from ev_users where username=?'
                db.query(sql, userinfo.username, function (err, results) {//查询用户名判断是否存在
                    //执行sql语句失败
                    if (err) {
                        return {
                            status: 0,
                            message: err.message
                        }
                    }
                    //执行sql语句成功，但查询到数据条数不等于1
                    if (results.length !== 1) {
                        index = -1;
                    }
                    else if (results.length === 1) {
                        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)//获取密码并进行比较
                        if (!compareResult) {//用户密码输入错误
                            index = -2
                        }
                    }
                    const user = { ...results[0], password: '', user_pic: '' }
                    //对用户的信息进行加密，生成token字符串
                    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                    tokenstr = tokenStr
                    // console.log(tokenstr);
                    loginusername = userinfo.username
                })
            }
        })
        if (index === 0) {
            return {
                status: 0,
                message: '用户名或者密码不合法！'
            }
        }
        else if (index === -1) {
            return {
                status: 0,
                message: '用户不存在，请先注册！'
            }
        }
        else if (index === -2) {
            return {
                status: 0,
                message: '密码输入错误，登录失败！'
            }
        }
        else {
            return {
                status: 1,
                message: '登录用户成功！',
                token: 'Bearer ' + tokenstr//为方便客户端使用，在服务器直接拼接上Bearer的前缀

            }
        }
    }
    else if (path != '/api' && path != '/api/login' && path != '/api/register') {
        function verifyToken(tokenstr, jwtSecretKey) {
            try {
                return jwt.verify(tokenstr, jwtSecretKey)
            }
            catch (err) {
                return null
            }
        }
        const decoded = verifyToken(tokenstr, config.jwtSecretKey)
        if (decoded === null) {
            return {
                status: 0,
                message: '身份认证失败！'
            }
        }
    }
    if (path === '/userinfo' && method === 'GET') {
        // console.log(1);
        var username, nickname, email, user_pic, result;
        req.on('end', () => {
            const sql = 'select * from ev_users where username=?'
            db.query(sql, loginusername, function (err, results) {//查询用户名判断是否存在
                //执行sql语句失败
                if (err) {
                    console.log(0);
                    return {
                        status: 0,
                        message: err.message
                    }
                }
                if (results.length === 1) {
                    username = results[0].username
                    nickname = results[0].nickname
                    email = results[0].email
                    user_pic = results[0].user_pic
                    console.log(username);
                }
            })

        })
        // if (result === 1) {
        //     console.log(results[0].username);
        //     console.log(results[0].nickname);
        //     console.log(results[0].email);
        //     console.log(results[0].user_pic);
        //     return {
        //         username: results[0].username,
        //         nickname: results[0].nickname,
        //         email: results[0].email,
        //         user_pic: results[0].user_pic
        //     }
        // }
        // if (result === 1) {
        //     return {
        //         username: username,
        //         nickname: nickname,
        //         email: email,
        //         user_pic: user_pic
        //     }
        // }
        // res.end(username)
    }

}
module.exports = route;