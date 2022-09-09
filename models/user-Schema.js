const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String
    }
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;