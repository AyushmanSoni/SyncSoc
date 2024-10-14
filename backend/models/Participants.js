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
    },
    image_url: {
        type: String,
        required: true
    },
    form_link: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d' // TTL index to automatically remove documents 3 days after creation
    }
});

// Compound index to ensure unique combination of rollNo and event_name
studentSchema.index({ rollNo: 1, event_name: 1 }, { unique: true });

// Create the model
const Participants = mongoose.model('Participants', studentSchema);

module.exports = Participants;
