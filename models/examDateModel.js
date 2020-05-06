const mongoose = require('mongoose');

const examDateSchema = new mongoose.Schema({
    dateId: {
        type: String,
        required: [true, 'Please tell us exam date ID!'],
        unique: true
    },
    eDate: {
        type: String,
        required: true,
    },
    eTime: {
        type: String,
        required: true,
    },
    semester: {
        type: mongoose.Schema.ObjectId,
        ref: 'Semester',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

examDateSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'semester',
        select: 'semesterId name'
    });

    next();
});


const ExamDate = mongoose.model('ExamDate', examDateSchema);

module.exports = ExamDate;