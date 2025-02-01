const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator = require('validator')

app.use(express.json())

app.post("/signup", async (req,res) => {
    try {
        //validation of the data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)

        //creating new instance of a User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("User added successfully");
    } catch(err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

app.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body
        const user = await User.findOne({emailId: emailId})
        if(!validator.isEmail(emailId)){
            res.status(404).send("Incorrect emailId");
        }
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(isPasswordValid) {
            res.send("Login Successfull!!!")
        }else {
            throw new Error("Password not correct")
        }
    } catch(err) {
        res.status(400).send("ERROR:" + err.message)
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

app.patch("/user/:userId", async(req,res) => {
  const userId = req.params?.userId;
  const data = req.body
  const allowedUpdates = [
    "photoUrl","about", "gender", "age", "skills"
  ]
  try{
    const isUpdateAllowed = Object.keys(data).every((k) => allowedUpdates.includes(k))
    if(!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("Skills cannot be more than 10");
    }
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