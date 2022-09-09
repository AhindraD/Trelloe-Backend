const express = require("express");
const UserModel = require("../models/user-Schema");
const BoardModel = require("../models/board-Schema");
const ProjectModel = require("../models/project-Schema");
const jwt = require('jsonwebtoken');
const multer = require("multer");
const router = express.Router();


//Show All Projects
router.get("/all", async (request, response) => {
    let projects = await ProjectModel.find({})
        .populate("owner", "name")
        .populate("contributors", "name");
    response.status(200).json(projects);
});


// Add Project
router.post("/add", async (request, response) => {
    let { title, desc, owner, tag, contributors } = request.body;
    console.log("creating new Project called: " + title);
    if (!title || !desc || !owner) {
        response.status(400).send('Input required!');
    }
    let newProject = new ProjectModel({
        title,
        desc,
        owner,
        tag,
        contributors,
    });
    try {
        let saveProject = await newProject.save();
        response.status(201).send("Project created with ID: " + saveProject.id);
    } catch (e) {
        response.status(501).send(e.message);
    }
});


//Delete Project
router.delete("/delete/:id", async (request, response) => {
    //console.log(request.params.id);
    try {
        await ProjectModel.deleteOne({ _id: request.params.id });
        response.status(202).send("Project DELETED with ID: " + request.params.id);
    } catch (e) {
        response.status(501).send(e.message)
    }
});



//ADD Contributors to project
router.post("/addUser/:id", async (request, response) => {
    let projectID = await ProjectModel.find({ _id: request.params.id });
    let newUsers = request.body;
    newUsers.map((elem) => projectID[0].contributors.push(elem));

    try {
        await ProjectModel.updateOne(
            { _id: request.params.id },
            {
                contributors: projectID[0].members,
            }
        )
        response.status(202).send("Contributors added in Project with ID: " + projectID._id);
    } catch (e) {
        response.status(501).send(e.message)
    }
});



//Modify Projects
router.post("/update/:id", async (request, response) => {
    let updatedProject = request.body;
    try {
        await ProjectModel.findOneAndReplace(
            { _id: request.params.id },
            updatedProject
        )
            .populate("owner", "name")
            .populate("contributors", "name");

        response.status(202).send("Project Updated with id: " + request.params.id);
    } catch (err) {
        response.status(501).send(e.message);
    }
});

module.exports = router;