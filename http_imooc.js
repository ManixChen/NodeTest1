//http_pachong1
var http = require('http')
// 类似于jQuery
var cheerio = require('cheerio')

var url = 'http://www.imooc.com/learn/348/'

//过滤文章
function filterChapters(html) {
    var $=cheerio.load(html)
    //获取所有的章节

    //当前课程
    var courseData=[];
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
        courseData.push(chapterData)

    })

    return courseData
}

//打印消息
function printCourseInfo(coursData) {
    coursData.forEach(function (item, index) {
        var chapterTitle=item.chapterTitle
        console.log(chapterTitle+'\n')

         item.videos.forEach(function (video) {
             console.log('【'+video.id+'】'+video.videoTite+'\n')
         })
    })
}

http.get(url,function (res) {
    var html=''
    res.on('data',function (data) {
        html+=data
    }).on('end',function (data) {
        var courseData=  filterChapters(html)
        //console.log(courseData)
        printCourseInfo(courseData)
    })
}).on('error',function () {
    console.log('获取网络数据失败');
})