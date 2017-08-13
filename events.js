var EventEmitter=require('events').EventEmitter
var life =new EventEmitter()
//设置最多监听的函数
life.setMaxListeners(11)



function water(who) {
    console.log("去给"+who+'倒杯水')
}


life.on('doSomething',water)
life.on('doSomething',function (who) {
    console.log("去给"+who+'买午饭')
})

life.on('doSomething',function (who) {
    console.log("去给"+who+'买瓶饮料')
})

life.on('doSomeAnother',function (who) {
    console.log("去给"+who+'买衣服')
})

life.on('doSomeAnother',function (who) {
    console.log("去给"+who+'麦包包')
})

//移除监听  去掉去倒水方法的监听
life.removeListener('doSomething',water)
//移除所有listener
// life.removeAllListeners()
life.removeAllListeners('doSomething')

var doSomethingDone = life.emit('doSomething','汉子')
var doSomeAnotherDone = life.emit('doSomeAnother','妹子')
var doSomeOthersDone = life.emit('doSomeOthers','玩坏')

//查看监听情况
console.log(life.listeners('doSomething')) //不传方法就是获取 0条
console.log(life.listeners('doSomething').length)
//直接监听
console.log(EventEmitter.listenerCount(life,'doSomething'))

//返回是否已经存在监听
console.log(doSomethingDone)  //true
console.log(doSomeAnotherDone) //true
console.log(doSomeOthersDone) //false

