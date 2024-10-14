const mongoose = require('mongoose');

// Define the schema
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    rollNo: {
        type: String,
        required: true,
        unique: true,
    },
    Position: {
        type: String,
        required: true,
        trim: true,
    },
    society:{
        type: String,
        required: true,
        trim: true,
    }
});

// Create the model
const Team_Schema = mongoose.model('TeamSchema', TeamSchema);
module.exports = Team_Schema;
