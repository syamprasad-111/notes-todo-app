const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db"); //importing database connection
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");
connectDB(); //calling database connection
const app=express();
const protect = require("./middleware/authMiddleware");
//middleware, auth routes, todo, notes
app.use(cors({
    origin: "https://notes-todo.vercel.app"
}));
app.use(express.json());
app.use("/api/auth",authRoutes);    
app.use("/api/todos", todoRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai",aiRoutes);

app.get("/",(req, res)=>{
    res.send("API Running...");
});
//to test the middleware protected  route
app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});
// app.get("/", (req,res)=>{
//     res.send("API Running...");
// });

app.listen(5000, ()=>{
    console.log(`Server running on port 5000`);
});