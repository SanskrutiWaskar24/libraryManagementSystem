const express = require("express");

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;

app.use(express.json());



app.use("/users", userRouter);
app.use("/books", booksRouter);


app.get("/users",(req,res)=>{
    res.status(200).json({
        message: "server is running and up,,,",
    });
});

app.listen( PORT, ()=>{
    console.log(`server is up and running at ${PORT}`);
});

