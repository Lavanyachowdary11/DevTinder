const express = require("express")
const app = express();
const port = 3001;

//This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"});
})

app.post("/user", (req, res) => {
    res.send("Data succesfully saved to db")
})

app.delete("/user", (req, res) => {
    res.send("Data succesfully deleted from db")
})

// This will match all the HTTP method API calls to /test
app.use('/test', (req,res) => {
    res.send('Hello from the server!');
})

app.listen(port , () => {
    console.log(`App listening on port ${port}..`);
})