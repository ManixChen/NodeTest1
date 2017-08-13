var klass = require('./klass')

klass.add('zhangsanfeng',['雷锋','小明','小龙'])

exports.add = function (klasses) {
    klasses.forEach(function (item,index) {
        klass.add(item.teacherName,item.students)
    })
}