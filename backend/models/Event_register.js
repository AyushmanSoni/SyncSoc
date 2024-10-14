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
        min: 0 // Fee should be non-negative
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
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: { expires: '30d' } // TTL index to delete the document after 30 days
    },
}
);

const events = mongoose.model("Events_model", Event_schema);
module.exports = events;
