const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
})

const courseModel = mongoose.model('courses', courseSchema)

module.exports = courseModel;