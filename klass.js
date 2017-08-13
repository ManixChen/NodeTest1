var student = require('./student')
var teacher = require('./teacher')

function add(TeacherName,Students) {
    teacher.add(TeacherName)
    Students.forEach(function (elem,index) {
        student.add(elem)
    })
}

exports.add = add