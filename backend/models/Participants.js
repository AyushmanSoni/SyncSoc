const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
    },
    event_name: {
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true,
    },
    form_link:{
        type: String,
    }
});

// Compound index to ensure unique combination of rollNo and society
studentSchema.index({ rollNo: 1, event_name: 1 }, { unique: true });

// Create the model
const participants = mongoose.model('participants', studentSchema);
module.exports = participants;
