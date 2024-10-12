const mongoose = require("mongoose");

const Event_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image_url:{
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    society: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    remarks : {
        type : String , 
        default:"",
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type:String,
    },
    endTime:{
        type:String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    form_link:{
        type: String,
    }
}
);

const events = mongoose.model("Events_model", Event_schema);
module.exports = events;
