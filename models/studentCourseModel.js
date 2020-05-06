const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide student ID']
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Please tell us course ID!']
    },
    status: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

studentCourseSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'student',
        select: 'sid name birthday class'
    }).populate({
        path: 'course',
        select: 'courseId name teacher credits'
    })

    next();
});


const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);

module.exports = StudentCourse;