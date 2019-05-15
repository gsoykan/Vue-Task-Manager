const mongoose = require('mongoose')

var taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        default: mongoose.Types.ObjectId('5cdae2b4bdf4d0063dd2cbe3')
    }
})

taskSchema.pre('save', async function (next) {
    const task = this
    console.log('pre task')
    next()
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task