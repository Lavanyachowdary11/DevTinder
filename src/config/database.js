const mongoose= require('mongoose')

const connectDB = async () => {
 await mongoose.connect("mongodb+srv://sailavanyapothuru7:Manu0706@devtinder.vrtp7.mongodb.net/devTinder")
}

module.exports = connectDB