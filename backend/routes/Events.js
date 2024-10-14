const express = require('express')
const router = express.Router()

const events = require('../models/Event_register')

// constants importing
const {check} = require('../constants') 

router.post("/event_add", async (req, res) => {
    const venue = req.body.venue;
    const date = req.body.date;
    const short_description = req.body.short_description;
    const fee = req.body.fee;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const remarks = req.body.remarks;
    const name = req.body.name;
    const image_url = req.body.image_url;
    const form_link = req.body.form_link;
    const society = req.user.email.split("@")[0];

    // console.log(venue, date, short_description, fee, endTime, remarks, name, image_url);

    if (!venue || !date || !short_description || !fee || !startTime || !name) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if(!society){
        return res.status(400).json({ message: "Please Login" });
    }
    // console.log(req.user);
    // console.log(society);

    try {
        // Check if the event with the same name already exists
        const existingEvent = await events.findOne({ name: name , society : society});

        if (existingEvent) {
            // If it exists, update the event details
            existingEvent.venue = venue;
            existingEvent.date = date;
            existingEvent.short_description = short_description;
            existingEvent.fee = fee;
            existingEvent.startTime = startTime;
            existingEvent.endTime = endTime;
            existingEvent.remarks = remarks;
            existingEvent.image_url = image_url;
            existingEvent.form_link = form_link;

            await existingEvent.save(); // Save the updated event
            return res.status(200).json({ message: "Event updated successfully" });
        } else {
            // If it does not exist, create a new event
            try{
                const newEvent = new events({
                    name: name,
                    society: society,
                    form_link: form_link,
                    venue: venue,
                    date: date,
                    short_description: short_description,
                    fee: fee,
                    remarks: remarks,
                    startTime: startTime,
                    endTime: endTime,
                    image_url: image_url,
                });
                await newEvent.save();
                return res.status(201).json({ message: "Event created successfully" });
            }
            catch(err){
                return res.status(301).json({ message : "event with same name exist"});
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error", error: err });
    }
});

// Route to list events for the current society
router.get("/list_of_event", async (req, res) => {
    // console.log(req.headers);
    const society = req.user.email.split("@")[0];
    // console.log(society);

    try {
        let Events;
        if (check(society)) {
            Events = await events.find({ society: society });
        } else {
            Events = await events.find();
        }
        return res.status(200).json(Events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: 'Error fetching events' });
    }
});


// Route to list events for a specific society
router.get("/list_of_event/:society", async (req, res) => {
    const society = req.params.society;
    // console.log(society);

    try {
        const result = await events.find({ society: society });
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: 'Error fetching events' });
    }
});


// Route to delete an event by name
router.delete('/delete/:name', async (req, res) => {
    const name = req.params.name;

    if (!name) {
        return res.status(400).json({ message: "Name field is required" });
    }

    try {
        const Event = await events.findOneAndDelete({ name: name });
        if (!Event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ message: 'Error deleting event' });
    }
});

// Route to fetch the form link for an event
router.get('/form_link/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const event = await events.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event.form_link);
    } catch (err) {
        console.error("Error fetching form link:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

router.get("/event_details/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate if eventId is a valid MongoDB ObjectId
        if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Event ID" });
        }

        const eventDetails = await events.findById(eventId);

        if (!eventDetails) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(eventDetails);
    } catch (error) {
        console.error("Error fetching event details:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router 
