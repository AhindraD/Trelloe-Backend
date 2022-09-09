const express = require("express");
const UserModel = require("../models/user-Schema");
const BoardModel = require("../models/board-Schema");
const ProjectModel = require("../models/project-Schema");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const router = express.Router();

//Show all Boards
router.get("/", async (request, response) => {
    let boards = await BoardModel.find({})
        .populate("owner", "name")
        .populate("contributors", "name");
    response.status(200).json(boards);
});



//Add new Board
router.post("/add", async (request, response) => {
    let { title, owner, desc } = request.body;
    if (!title || !desc || !owner) {
        response.status(400).send('Input required!');
    }
    let newBoard = new BoardModel({
        title,
        desc,
        owner,
    });
    try {
        let savedBoard = await newBoard.save();
        response.status(200).send("Board created with ID: " + savedBoard.id);
    } catch (e) {
        response.status(500).send(e.message);
    }
});


//Show Users
router.get("/users", async (request, response) => {
    try {
        let users = await UserModel.find({});
        users.forEach((elem) => {
            elem.password = "#####lol#####";
        });
        response.status(201).json(users);
    } catch (e) {
        response.status(401).send(e.message);
    }
});


//Show user's board
router.get("/:userId", async (request, response) => {
    try {
        let board = await BoardModel.find({ admin: request.params.userId });
        response.status(201).json(board);
    } catch (e) {
        response.status(401).send(e.message);
    }
});

module.exports = router;