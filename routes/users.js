const express = require("express");

const { users } = require("../data/users.json");
const router = express.Router();

// route :/
// method :  get
// description : get all users
// acess: public
// parameteers : none

router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data : users

    })
})

// route :/:id
// method :  get
// description : get single user by their id
// acess: public
// parameteers : id

router.get("/:id", (req,res)=>{
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

// route :/
// method :  post
// description : creating a  user by their id
// acess: public
// parameteers : none

router.post("/",(req,res)=>{
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

// route :/:id
// method :  put
// description : updating a  user by their id
// acess: public
// parameteers : id

router.put("/:id", (req,res)=>{
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


// route :/:id
// method : delete
// description : deleting a  user by their id
// acess: public
// parameteers : id

router.delete("/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not exist..."
        });
    }
//need to build logic for same
    const index = users.indexOf(user);
    users.splice(index,1);

    return res.status(200).json({
        success : true,
        message: "Deleted user,,,",
        data: users,
    })
})


// route :/users/subscription-details/:id
// method :  get
// description : get all user subscription details
// acess: public
// parameteers : id
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didnt Exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate ", returnDate);
  //   console.log("currentDate ", currentDate);
  //     console.log("subscriptionDate ", subscriptionDate);
  //       console.log("subscriptionExpiration ", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});

module.exports = router;
