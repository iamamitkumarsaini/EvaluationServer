const express = require("express");
const { TodoModel } = require("../Models/Todo.model");



const todoRoutes = express.Router();

todoRoutes.get("/", async(req,res) => {
    try {
        const todos = await TodoModel.find()
        res.send(todos)
    } 
    
    catch (error) {
        res.send("error")
    }
})

todoRoutes.post("/create", async(req,res) => {

    try {
        const payload = req.body;
        const todo = new TodoModel(payload)
        await todo.save();
        req.send("Todo Added")
    } 
    
    catch (error) {
        res.send("error")
    }
})


todoRoutes.patch("/edit/todoID", async (req,res) => {
    try {
        const todoID = req.params.todoID;
        const payload = req.body;
        await TodoModel.findByIdAndUpdate({todoID, payload})
        req.send("edited")
    } 
    
    catch (error) {
        res.send("error")
    }
})


todoRoutes.delete("/delete/todoID", async (req,res) => {
    try {
        const todoID = req.params.todoID;
        await TodoModel.deleteOne({_id:todoID})
        req.send("deleted")
    } 
    
    catch (error) {
        res.send("error")
    }
})

module.exports = { todoRoutes };