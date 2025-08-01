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

// route :/users/:id
// method :  get
// description : get single user by their id
// acess: public
// parameteers : id

app.get("/users/:id", (req,res)=>{
    const id = req.params.id;
    const user = users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not exist..."
        });
    }
    return res.status(200).json({
        success : true,
        message:"user found",
        data: user,
    })
})

// route :/users
// method :  post
// description : creating a  user by their id
// acess: public
// parameteers : none

app.post("/users",(req,res)=>{
    const {id, name, surname, email,subscriptionType, subscriptionDate } = req.body;

    const user = users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success: false,
            message: "user with the id exist",
        })
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });

    return res.status(201).json({
        sucess:true,
        message: "user added successfully",
        data: users
    })
})

// route :/users/:id
// method :  put
// description : updating a  user by their id
// acess: public
// parameteers : id

app.put("/users/:id", (req,res)=>{
    const id = req.params.id;
    
    const {data} = req.body;

    const user = users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not exist..."
        });
    }

    const updateUserData = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        messgae : "user updated...",
        data: updateUserData,
    });

})


// route :/users/:id
// method : delete
// description : deleting a  user by their id
// acess: public
// parameteers : id

app.delete("/users/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not exist..."
        });
    }
//need to build logic for same
})


app.get("/",(req,res)=>{
    res.status(200).json({
        message: "server is running and up,,,",
    });
});

app.listen( PORT, ()=>{
    console.log(`server is up and running at ${PORT}`);
})