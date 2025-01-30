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

connectDB().then(() => {
    console.log("Database connection established...")
    app.listen(3001 , () => {
        console.log(`Server is successfully listening on port 3001..`);
    })
}).catch((err) => {
  console.error("Database cannot be connected!!")
})