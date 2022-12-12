const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    taskname:String,
    status:Boolean,
    tag:String
}, {
    versionKey:false
})

const TodoModel = mongoose.model("todo",todoSchema);

module.exports = { TodoModel };