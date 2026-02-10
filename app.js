//first step
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoDB')
.then(() => console.log("connected to mongoDB"))
.catch(err => console.error("could not connect", err));






const Task= require("./models/Task")
const Contact = require("./models/Contact");
const { error } = require("node:console");
////sec step step //POST Route
app.post('/api/tasks', async (req, res) => {
    try {
        const title= req.body;
        const task= await Task.create(title)
        res.json({
            success:true,
            msg:"created task successfully",
            data:task,
        })
    } catch (error) {
        res.json({ error: error.message });
    }
});

//third step // GET Route
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//post contact
app.post('/api/contact', async (req , res) => {
    try {
        const {fullName, phone=[], socialMedia={}} = req.body;
        const contact = await Contact.create ({fullName, phone, socialMedia})
        res.json ({
            success: true,
            msg:"created contact successfully",
            data: contact,
        });
    } catch (error) {
        res.json ({ error: error.message});
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Server is running");
});