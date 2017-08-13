var http    = require('http')
var fs      = require('fs')
var Promise = require('bluebird')
// 类似于jQuery
var cheerio = require('cheerio')
//时间格式化选项
var dateFormat = require('dateformat');


var videoIds=[348,637,259,197,134,75]
var baseUrl='http://www.imooc.com/learn/'
//过滤文章
function filterChapters(html) {
    var $=cheerio.load(html)
    var title=$('.course-infos a span').text()
    var number= parseInt($($('.course-infos .statics .static-item')[1]).find('.meta-value').text().trim())
    //获取所有的章节
    // courseData={
    //      title:'',
    //      number:'',
    //     videos:[
    //         {
    //             chapterTitle:'',
    //             videos:[{
    //                     id:'',
    //                     title:''
    //                 }]
    //         }
    //     ]
    // }
    //当前课程
    var courseData={
        title:'',
        number:'',
        videos:[]
    };
    $(".chapter").each(function (item, index) {
        var chapter=$(this)
        var chapterTitle=$(this).find("h3 strong").text()
        var videos=$(this).find(".video").children("li")
        //当前章节
        var chapterData={
            chapterTitle:chapterTitle,
            videos:[]
        }

        videos.each(function (item) {
            var videoid=$(this).attr('data-media-id')
            var videoTite=$(this).find("a").text()
            chapterData.videos.push({
                id:videoid,
                videoTite:videoTite
            })
        })
        //章节完毕将章节推入课程列表中
        courseData.videos.push(chapterData)

    })

    return courseData
}

//打印消息
function printCourseInfo(coursesData) {
    // coursesData.forEach(function (courseData) {
    // })
    var dataString=dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")+'\n'
    coursesData.forEach(function (courseData, index) {
        console.log(courseData.number+'人学习过'+courseData.title+'\n')
        console.log("课程："+courseData.title+'\n')
        dataString+=courseData.title.trim()+'\n\t\t'

        courseData.videos.forEach(function (item) {
            var chapterTitle=item.chapterTitle
            console.log(chapterTitle+'\n')
            dataString+=chapterTitle+'\n\t\t\t\t'
            item.videos.forEach(function (video) {
                console.log('【'+video.id+'】'+video.videoTite +'\n')
                dataString+='【'+video.id+'】'+video.videoTite.trim()+'\n'
            })
        })
    })
    console.log('文件信息遍历结束');
    fs.exists('./outinfo.txt',function (exists) {
       if(!exists){
           console.log('准备创建文件')
           createFile('./outinfo.txt',dataString)
       }else{
           console.log('输出信息已存在')
           fs.readFile('outinfo.txt', function (err, data) {
               if (err) {
                   return console.error(err);
               }
               console.log("异步读取文件数据: " + data.toString());
           });
           console.log('准备删除文件')
            fs.unlink('./outinfo.txt', function (err) {
                if(err){
                    return console.error(err)
                }
            })
       }
    })

}

function createFile(fileName, content) {
    fs.writeFile(fileName,content,function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        fs.readFile(fileName, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(fileName+"-最终数据: " + data.toString());
        });
        // 关闭文件
        fs.close(fd, function(err){
            if (err){
                console.log(err);
            }
            console.log("文件关闭成功");
        });
    })
}

function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log('正在爬qu '+url)

        http.get(url,function (res) {
            var html=''
            res.on('data',function (data) {
                html+=data
            }).on('end',function (data) {
                resolve(html)
            })
        }).on('error',function (e) {
            reject(e)
            console.log('获取网络数据失败');
        })
    })
}

var fetchCourseArray=[]
videoIds.forEach(function (id) {
    fetchCourseArray.push(getPageAsync(baseUrl+id))
})
Promise.all(fetchCourseArray)
    .then(function (pages) {
        //pages---课程对应的页面集合
        var coursesData=[]
        pages.forEach(function (html) {
            var courses=filterChapters(html)
            coursesData.push(courses)
        })
        coursesData.sort(function (a, b) {
            return a.number <b.number
        })
        printCourseInfo(coursesData)
        // coursesData.forEach(function () {
        //
        // })
    })