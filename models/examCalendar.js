const mongoose = require('mongoose');

const examCalendarSchema = new mongoose.Schema({
    examDate: {
        type: mongoose.Schema.ObjectId,
        ref: 'ExamDate',
        required: true
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    semester: {
        type: mongoose.Schema.ObjectId,
        ref: 'Semester',
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

examCalendarSchema.index({
    examDate: 1,
    room: 1,
    course: 1,
    semester: 1
}, {
    unique: true
});

examCalendarSchema.pre(/^find/, function (next) {
    this.populate('examDate')
        .populate('room')
        .populate('course')
        .populate('semester')
    next();
});


const ExamCalendar = mongoose.model('ExamCalendar', examCalendarSchema);

module.exports = ExamCalendar;