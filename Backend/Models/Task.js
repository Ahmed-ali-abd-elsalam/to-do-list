const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    UserID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    Completed: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: null
    },
});

module.exports = mongoose.model('Task', schema);
