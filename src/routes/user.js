const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"
//get all the pending connection requests for the loggedin user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        res.json({message: "Data fetched successfully", data: connectionRequests})
    }catch(err) {
        req.statusCode(400).send("ERROR:" + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map(row => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }else {
                return row.fromUserId;
            }
        });
        res.json({message: "Data fetched successfully", data: data})
    }catch(err) {
        res.status(400).send("ERROR:" + err.message);
    }
})

userRouter.get("/feed", userAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [{fromUserId: loggedInUser._id,},{toUserId: loggedInUser._id}]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })
    
        const users = await User.find({
           $and: [
            {_id: {$nin: Array.from(hideUsersFromFeed)}},
           {_id: {$ne: loggedInUser._id}}
        ]          
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)


        res.send(users);
    }catch(err) {
        res.send(400).json({
            message: err.message
        })
    }
})

module.exports = userRouter;