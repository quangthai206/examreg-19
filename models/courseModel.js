const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: [true, 'Please tell us course ID!'],
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    semester: {
        type: mongoose.Schema.ObjectId,
        ref: 'Semester'
    },
    // canRegister: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;