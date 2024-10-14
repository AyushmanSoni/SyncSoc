const express = require('express')
const router = express.Router()

// model importing
const participants = require('../models/Participants.js')
const event = require('../models/Event_register.js')

// Get participants registered by a student
router.get('/student', async (req, res) => {
    try {
        const roll = req.user.rollNo;
        const role = req.user.role;

        if (role === "society") {
            return res.status(401).json({ message: 'Unauthorized access for society members' });
        }

        const list = await participants.find({ rollNo: roll });
        return res.status(200).json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// participant list of particular society
router.get('/society/:event_name' , async (req, res) => {
    try{
        const role = req.user.role;
    
        if(role==="society"){
            const event_name = req.params.event_name
            const list = await participants.find({event_name: event_name})
            return res.status(200).json(list);
        }
        else{
            return res.status(401).json({message: 'unauthorised'})
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


//to register for an event
router.post('/:event_name', async (req, res) => {
    try {
        const { name, rollNo } = req.user;
        const event_name = req.params.event_name;

        if(req.user.role==="society"){return res.status(400).json({ message : "unauthorised"})}
        
        if (!name || !rollNo || !event_name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const eventDetails = await event.findOne({ name: event_name });

        if (!eventDetails) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { image_url, form_link } = eventDetails;

        const newParticipant = new participants({
            name,
            rollNo,
            event_name,
            image_url,
            form_link
        });

        await newParticipant.save();

        return res.status(201).json({ message: 'Successfully registered for the event', participant: newParticipant });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

