const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
})

const teacherModel = mongoose.model('teachers', teacherSchema)

module.exports = teacherModel;