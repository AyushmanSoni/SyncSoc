const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    }
});

// Create the model
const participants = mongoose.model('participants', studentSchema);
module.exports = participants;
