const express = require("express")
const app = express();

//This will only handle GET call to /user
app.get("/user/:userId/:name/:number", (req,res) => {
    console.log(req.params)
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

app.get("/user", (req, res) => {
    console.log(req.query)
    res.send({firstName: "Sai", lastName: "Lavanya"});
})
 app.get("/abc", (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

 app.get("/ab+c", (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

 app.get("/ab?c", (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

 app.get("/ab*c", (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

 app.get(/a/, (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

app.get(/.*fly$/, (req,res) => {
    res.send({firstName: "Sai", lastName: "Lavanya"})
 })

app.get("/hello", (req, res) => {
    res.send("Hello from server");
})

app.get("/hello/2", (req, res) => {
    res.send("Hello from server 2");
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

app.listen(3001 , () => {
    console.log(`Server is listening on port 3001..`);
})