const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    examCalendar: {
        type: mongoose.Schema.ObjectId,
        ref: 'ExamCalendar',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

registerSchema.index({
    student: 1,
    examCalendar: 1
}, {
    unique: true
});

registerSchema.pre(/^find/, function (next) {
    this.populate('student')
        .populate('examCalendar');
    next();
});


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;