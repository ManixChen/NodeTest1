var http=require('http')
var querystring=require('querystring')

var postData=querystring.stringify({
    'content':'一起期待吧',
    'cid':348
})

var options={
    hostname:'http://www.imooc.com1/',
    port:80,
    path:'/course/document',
    method:'POST',
    headers:{
        //注意 content-length!!!!
    }
}

var req=http.request(options,function (res) {
    console.log('ststusCode'+res.statusCode)
    console.log('ststusCode'+JSON.stringify(res.headers))

    res.on('data',function (chunk) {
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof chunk)
    })
    res.on('end',function () {
        console.log('消息发送完毕')
    })

})

req.on('error',function (e) {
    console.log('Request_Error:'+e.message)
})
req.write(postData)

req.end()