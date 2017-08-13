//http_pachong1
var http = require('http')
var url = 'http://www.imooc.com/learn/348/'
http.get(url,function (res) {
    var html=''
    res.on('data',function (data) {
        html+=data
    }).on('end',function (data) {
        console.log(html)
    })
}).on('error',function () {
    console.log('获取网络数据失败');
})