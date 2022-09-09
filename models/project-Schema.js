const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        require: true,
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ,
    contributors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        default: "pending",
        require: true,
    },
    tag: {
        type: String,
    },
    deadLine: {
        type: Date
    }
});

const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = ProjectModel;