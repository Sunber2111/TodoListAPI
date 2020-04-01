const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title:String,
    date:Date,
    description:String,
    status:Number
});

module.exports = Task = mongoose.model("Task", TaskSchema);
