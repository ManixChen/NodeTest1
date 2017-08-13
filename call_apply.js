var peoples={
    name:"zhangsan",
    age:20,
    sex:'男',
    say:function (msg) {
        console.log(this.name+':'+msg)
    }
};

//peoples.say('welcome to beijing')

var male1={
    name:"Lisi",
    age:22,
    saybye:function (msg,time) {
        console.log(this.name+"<:>"+msg+','+time)
    }
}

//peoples.say.call(male1,"male1 says 66666")

//peoples.say.apply(male1,["male1 says 66666"])


var male2={
    name:"wangwu",
    age:24,
}

male1.saybye.call(male2,"good by will",'3 minute later')
male1.saybye.apply(male2,['good by will','3 minute later'])

