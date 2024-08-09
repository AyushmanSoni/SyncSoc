const express = require('express')
const router = express.Router()

const events = require('../models/Event_register')

// constants importing
const {check} = require('../constants') 


router.post("/event_register" , async (req, res) => {
    const venue = req.body.venue
    const date = req.body.date
    const short_description = req.body.short_description 
    const fee = req.body.fee
    const time = req.body.time
    const remarks = req.body.remarks
    const name = req.body.name 
    const image_url = req.body.image_url 

    if(!venue || !date || !short_description || !fee || !time || !name){
        return res.status(400).json({message : "All fields are required"})
    }

    // console.log(req.user)

    const society = req.user.email.split("@")[0] 

    try{
        const newevent = new events({name : name , society:society , venue : venue , date : date, short_description : short_description, fee : fee , time : time, remarks : remarks ,  image_url : image_url})
        await newevent.save()
        return res.status(200).json(newevent)
    }
    catch(err){
        console.log(err)
        return res.status(301).json({message : "Event with name name exists"})
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




module.exports = router 