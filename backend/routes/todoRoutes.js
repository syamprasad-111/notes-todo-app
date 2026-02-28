const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const{createTodo,getTodos,updateTodo,deleteTodo} = require("../controllers/todoController");

// to get and create all todos routes
router.route("/")
    .get(protect, getTodos)
    .post(protect, createTodo);
// update and delete todo routes
router.route("/:id")
    .put(protect, updateTodo)
    .delete(protect, deleteTodo);

module.exports = router;