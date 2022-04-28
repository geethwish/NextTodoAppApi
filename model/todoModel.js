const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please Add a Todo']
        },
        status: {
            type: String,
            default: 'todo'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Todo', todoSchema)