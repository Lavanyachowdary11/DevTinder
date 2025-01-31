const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName:{
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");                
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-female.jpg"
    },
    about: {
        type: String,
        default: "This is an default about the user"
    },
    skills: {
        type: [String],
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);;

