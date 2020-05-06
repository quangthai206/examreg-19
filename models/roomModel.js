const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: [true, 'Please tell us room ID!'],
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    noc: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;