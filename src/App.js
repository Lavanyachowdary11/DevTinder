const express = require("express")
const app = express();

// app.use("/route", [rh, rh2], rh3, rh4, rh5)

app.use("/user", [(req,res,next)=> {
    //request handler
    console.log("handling the route error!!");
    // res.send("Route handler 1");
    next();
},
(req,res) => {
    console.log("handling the route error2!!")
    res.send("Route handler 2");
}])

app.listen(3001 , () => {
    console.log(`Server is listening on port 3001..`);
})