const express = require("express")
const app = express();
const { adminAuth, userAuth } =require("./middlewares/auth")

app.get("/admin", adminAuth);

//we are using userAuth as middleware
app.get("/user", userAuth, (req, res) => {
 res.send("User Data Sent")
})

app.get("/admin/getAllData", (req,res) => {
    res.send("All Data Sent")
})

app.get("/admin/deleteUser", (req,res) => {
    res.send("Deleted a user")
})

app.listen(3001 , () => {
    console.log(`Server is listening on port 3001..`);
})