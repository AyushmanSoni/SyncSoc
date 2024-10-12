const express = require('express')
const router = express.Router()

// model importing
const participants = require('../models/Participants.js')
const events = require('../models/Event_register.js')

// participant ne kaha kaha register kiya h uska route
router.get('/student' , async (req, res) => {

    const role = req.user.role;
    
    if(role==="society"){
        return res.status(401).json({message: 'unauthorised'})   ;
    }
    else{
        const roll = req.user.rollNo 
        const list = await participants.find({rollNo: roll})
        return res.status(200).json(list);
    }
})

// kisi society ke liye ek particular event ke particpant ki list 
router.get('/society/:event_name' , async (req, res) => {

    const role = req.user.role;
    
    if(role!=="society"){
        const event_name = req.params.event_name
        const list = await participants.find({event_name: event_name})
        return res.status(200).json(list);
    }
    return res.status(401).json({message: 'unauthorised'})
})

//to register for an event
router.post('/:event_name' , async (req, res) => {
    console.log(req.user)
    const name = req.user.name
    const roll = req.user.rollNo
    const event_name = req.params.event_name
    console.log(event_name)

    const list = await events.findOne({name: event_name})
    console.log(list)
    const image_url = list.image_url;
    console.log(list)
    const form_link = list.form_link;

    if(!name || !roll || !event_name || !image_url) {
        return res.status(400).json({message: 'All fields are required'})
    }
    
    const new_participant = new participants({name : name, rollNo:roll, event_name:event_name,image_url:image_url,form_link:form_link})
    await new_participant.save()
    // console.log(res.data);
    // console.log(new_participant)
    return res.json({message: 'registered'})
})



module.exports = router

