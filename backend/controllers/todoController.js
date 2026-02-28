const Todo = require("../models/ToDo");

const createTodo=async (req, res)=>{
    try{
        const {title} = req.body;
        const todo=await Todo.create({
            user: req.user._id,
            title,
        });
        res.status(201).json(todo);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

// to get all todos
const getTodos=async (req, res) => {
    try{
        const todos=await Todo.find({user: req.user._id });
        res.json(todos);
    } 
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

// to update a task
const updateTodo = async (req, res) => {
    try{
        const todo=await Todo.findById(req.params.id);
        if(!todo)
            return res.status(404).json({ message: "Todo not found" });
        if(todo.user.toString()!==req.user._id.toString()) //user can edit only their tasks
            return res.status(401).json({ message: "Not authorized" });
        todo.title = req.body.title || todo.title;
        todo.completed = req.body.completed ?? todo.completed;
        const updated = await todo.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// to delete a task
const deleteTodo=async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo)
            return res.status(404).json({ message: "Todo not found" });
        if(todo.user.toString()!==req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        await todo.deleteOne();
        res.json({ message:"Todo deleted"});
    } 
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createTodo,getTodos,updateTodo,deleteTodo};