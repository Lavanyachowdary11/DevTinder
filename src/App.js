const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json())

app.post("/signup", async (req,res) => {
    //creating new instance of a User model
    const user = new User(req.body)
    try {
        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

//find only one user
app.get("/user", async (req,res) => {
    const userId= req.body.id;
    console.log(userId)
    try {
        const user = await User.findById({_id: userId})
        if(!user) {
            res.status(404).send("user not found!")
        }else {
            res.send(user);
        }
    }catch(err) {
        res.status(400).send("Something went wrong..")
    }
})

//find user by email
app.get("/user", async (req,res) => {
    const userEmail= req.body.id;
    try {
        const users = await User.find({id: userEmail})
        if(users.length === 0){
            res.status(404).send("User not found!!");
        }else {
            res.send(users);
        }
    }catch(err) {
        res.status(400).send("Something went wrong..")
    }
})

//find all the users
app.get("/feed", async (req,res) => {
    try {
        const users = await User.find({})       
            res.send(users);
    }catch(err) {
        res.status(400).send("Something went wrong..")
    }
})

app.delete("/user", async(req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            res.status(404).send("user not found!")
        }else {
            res.send("User deleted successfully")
        }
    }catch (err) {
        res.status(400).send("Something went wrong!!")
    }   
})

app.patch("/user", async(req,res) => {
  const userId = req.body.userId;
  const data = req.body
  try{
    const user = await User.findByIdAndUpdate({_id: userId}, data, {
        returnDocument: "before",
        runValidators: "true"
    });
    if(!user){
        res.status(404).send("User not found!")
    }else {
        res.send("User updated successfully")
    }
  }catch(err) {
    res.status(400).send("UPDATE FAILED:" + err.message)
  }
})

connectDB().then(() => {
    console.log("Database connection established...")
    app.listen(3001 , () => {
        console.log(`Server is successfully listening on port 3001..`);
    })
}).catch((err) => {
  console.error("Database cannot be connected!!")
})