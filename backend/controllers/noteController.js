const Note = require("../models/Note");
// create a note
const createNote=async (req, res)=>{
    try{
        const {title,content} = req.body;
        const note = await Note.create({
            user: req.user._id,
            title,
            content,
        });
        res.status(201).json(note);
    } 
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


// get all notes
const getNotes=async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } 
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


// get/open single note
const getNoteById=async (req, res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({ message: "Note not found" });
        if(note.user.toString()!==req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        res.json(note);
    } 
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


// update/edit a note
const updateNote=async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({ message: "Note not found" });
        if (note.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } 
    catch (error){
        res.status(500).json({ message: error.message });
    }
};


// to delete a note
const deleteNote=async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note)
            return res.status(404).json({ message: "Note not found" });
        if(note.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        await note.deleteOne();
        res.json({ message: "Note deleted" });
    } 
    catch (error){
        res.status(500).json({ message: error.message });
    }
};


module.exports = {createNote, getNotes, getNoteById, updateNote, deleteNote};