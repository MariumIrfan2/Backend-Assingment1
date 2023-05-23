const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
});

const todoModel = mongoose.model('todo', todoSchema)

module.exports = todoModel;