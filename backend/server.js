const express = require('express');
const cors = require('cors')
const {readdirSync} = require('fs');
const dotnev = require('dotenv');
const mongoose = require('mongoose')
const {json} = require("express");
dotnev.config()
const app = express();

app.use(cors())
app.use(express.json())

// const userRouter = require('./routes/user')
// app.use("/", userRouter)
readdirSync('./routes').map(r => app.use("/", require("./routes/" + r)));


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
    .then(() => console.log('database connected successfully'))
    .catch((err) => console.log('error connected', err));


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server start at port ${PORT} ....`)
})
