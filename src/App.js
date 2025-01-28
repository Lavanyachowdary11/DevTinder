const express = require("express")
const app = express();

//error handling
app.get("/getUserData", (req, res) => {
    try {
        throw new Error("dvheer");
        res.send("Send user data");
    }
    catch(err) {
        res.status(500).send("Some error contact support team")
    }
})

app.use("/", (err,req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong!!...")
    }
})

app.listen(3001 , () => {
    console.log(`Server is listening on port 3001..`);
})