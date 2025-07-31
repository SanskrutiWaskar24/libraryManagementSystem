const express = require("express");

const { users} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

// route :/users
// method :  get
// description : get all users
// acess: public
// parameteers : none

app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data : users

    })
})

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "server is running and up,,,",
    });
});

app.listen( PORT, ()=>{
    console.log(`server is up and running at ${PORT}`);
})