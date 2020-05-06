const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    semesterId: {
        type: String,
        required: [true, 'Please tell us semester ID!'],
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;