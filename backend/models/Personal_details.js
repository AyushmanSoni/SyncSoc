const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true ,
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows for null values while still maintaining the unique constraint
        lowercase: true, // Converts email to lowercase before saving
    },
    password: {
        type: String,
        required: true,
    },
    type : {
        type : String , 
        default:"student",
    } 
}
);

const user = mongoose.model("Personal_detail", userSchema);
module.exports = user;
