const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createNote,getNotes,getNoteById,updateNote,deleteNote} = require("../controllers/noteController");


// to get all notes + creating a note
router.route("/")
    .get(protect, getNotes)
    .post(protect, createNote);
// to get single note, update, delete it
router.route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNote)
    .delete(protect, deleteNote);

module.exports = router;