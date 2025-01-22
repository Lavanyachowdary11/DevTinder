const adminAuth = (req,res, next) => {
    console.log("Admin auth id getting checked");
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized request");
    }else {
        next();
    }
}

const userAuth = (req,res, next) => {
    console.log("User auth id getting checked");
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized user");
    }else {
        next();
    }
}

module.exports = {adminAuth,userAuth}