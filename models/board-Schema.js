const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        require: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    statuses: ["pending", "working", "completed"],
});


const BoardModel = mongoose.model("Board", BoardSchema);
module.exports = BoardModel;