const express = require('express')
const router = express.Router()

const events = require('../models/Event_register')

// constants importing
const {check} = require('../constants') 


router.post("/event_add" , async (req, res) => {
    const venue = req.body.venue
    const date = req.body.date
    const short_description = req.body.short_description 
    const fee = req.body.fee
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const remarks = req.body.remarks
    const name = req.body.name 
    const image_url = req.body.image_url 
    const form_link = req.body.form_link 

    console.log(venue , date , short_description , fee , endTime , remarks , name , image_url)

    if(!venue || !date || !short_description || !fee || !startTime || !name){
        return res.status(400).json({message : "All fields are required"})
    }

    console.log(req.user)
    const society = req.user.email.split("@")[0] 
    console.log(society)

    try{
        const newevent = new events({name : name , society:society ,form_link:form_link, venue : venue , date : date, short_description : short_description, fee : fee , remarks : remarks , startTime:startTime, endTime:endTime , image_url : image_url})
        await newevent.save()
        return res.status(200).json({"Success": "1"});
    }
    catch(err){
        console.log(err)
        return res.status(301).json({message : err})
    }
})


router.get("/list_of_event" , async (req, res) => {

    console.log(req.headers)
    const society = req.user.email.split("@")[0] 
    console.log(society)

    if(check(society)){
        const Events = await events.find({society : society})
        return res.status(200).json(Events)
    }
    else{
        const Events = await events.find()
        return res.status(200).json(Events)
    }

})


router.get("/list_of_event/:society", async (req, res) => {
    const society = req.params.society;
    console.log(society);
    try {
        const result = await events.find({ society: society });
        console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching events' });
    }
});


router.delete('/delete/:name', async (req, res) =>{
    const name = req.params.name

    if(!name){
        return res.status(400).json({ message : "Name field is required" });
    }
    
    const Event = await events.findOneAndDelete({ name: name });
    if (!Event) {
        return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });

})

// router.patch('/update/:name', async (req, res) => {
    // const name = req.params.name;
    // const updatedData = req.body;
  
    // const society = req.user.email.split("@")[0] 

    // if (!name) {
    //     return res.status(400).json({ message: "Name field is required" });
    // }

    // try {
    //     const updatedEvent = await events.findOneAndUpdate({ name: name }, updatedData, { new: true });
    //     if (!updatedEvent) {
    //         return res.status(404).json({ message: "Event not found" });
    //     }
    //     return res.status(200).json(updatedEvent);
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: "Internal server error" });
    // }
// });

router.get("/event_details/:id", async (req, res) => {
    try {
        const eventId = req.params.id;

        // Validate if eventId is a valid MongoDB ObjectId
        if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Event ID" });
        }

        // Fetch the event details from the database
        const eventDetails = await events.findById(eventId);

        // Check if the event exists
        if (!eventDetails) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Return the event details
        return res.status(200).json(eventDetails);
    } catch (error) {
        console.error("Error fetching event details:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router 
