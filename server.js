require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const morgan = require('morgan')

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

//All routes import
const authRouter = require('./routes/auth');
// const restaurantRouter = require('./routes/Restaurant-Route');
// const orderRouter = require('./routes/Order-Route');
const boardRouter = require("./routes/Board-Route");
const projectRouter = require("./routes/Project-Route");

const app = express();

//MIddleWare usage
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.use(morgan("dev"));

//Router related usage
app.use('/auth', authRouter);

//adding custom middleWare
// app.use('/restaurants', authenticateRequest, restaurantRouter);
// app.use('/orders', authenticateRequest, orderRouter);
app.use("/board", authenticateRequest, boardRouter);
app.use("/project", authenticateRequest, projectRouter);



app.listen(process.env.PORT || 8000)


//custom middleware to prevent un-authorized access

function authenticateRequest(request, response, next) {
    const authHeaderInfo = request.headers['authorization'];
    if (authHeaderInfo == undefined) {
        return response.status(401).send("No token was provided!");
    }

    const token = authHeaderInfo.split(' ')[1];
    if (token == undefined) {
        return response.status(401).send("Proper token was not provided!");
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        request.userInfo = payload;
        console.log(request.userInfo);
        next();
    }
    catch (err) {
        return response.status(401).send("Invalid token  provided! " + err.message);
    }

}