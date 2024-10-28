const express = require('express')
const path = require('path')
const app = express()
//正确地解析请求体
app.use(express.json())


const get_information = require('./get_message')

let url = path.join(__dirname, "../font-end")//前端代码存放位置
console.log(url)
app.use(express.static(url))
//获取数据

app.use(get_information)

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000/", "服务器已启动 ")
})

