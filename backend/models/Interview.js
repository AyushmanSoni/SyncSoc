const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
    },
    timeOfInterview: {
        type: String, 
        required: true
    },
    society: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the creation date
        expires: '365d'     // TTL: document will be removed 365 days after creation
    }
});

// Compound index to ensure unique combination of rollNo and society
interviewSchema.index({ rollNo: 1, society: 1 }, { unique: true });

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
