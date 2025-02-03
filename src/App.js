const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const validator = require('validator')
const cookieParser = require("cookie-parser")
const { userAuth } = require("./middlewares/auth")

app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req,res) => {
    try {
        //validation of the data
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

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
        const isPasswordValid = user.validatePassword(password)
        if(isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login Successfull!!!")
        }else {
            throw new Error("Password not correct")
        }
    } catch(err) {
        res.status(400).send("ERROR:" + err.message)
    }
})


app.get("/profile", userAuth, async(req,res) => {
    try {
        const user = req.user
        res.send(user)
    }catch(err) {
        res.status(400).send("Error:" + err.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    console.log("Sending a connection request")
    const user = req.user;   
    res.send(user.firstName + " sent the connection request!")
})

connectDB().then(() => {
    console.log("Database connection established...")
    app.listen(3001 , () => {
        console.log(`Server is successfully listening on port 3001..`);
    })
}).catch((err) => {
  console.error("Database cannot be connected!!")
})