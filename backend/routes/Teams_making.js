const express = require('express')
const router = express.Router()

const Team_Schema = require('../models/team_positions')


// constants importing
const {check} = require('../constants') 


// only admin access not allowed yet
router.post('/add_member' , async(req , res) => {

    const society = req.user.email.split("@")[0] 

    if(society && check(society)){
        const rollNo  = req.body.rollNo
        const position = req.body.position
        const name = req.body.name
        
        try{
            const newevent = new events({name : name , rollNo:rollNo , position : position , society:society})
            await newevent.save()
            return res.status(200).json({"Success": "1"});
        }
        catch(err){
            console.log(err)
            return res.status(301).json({message : "Person with same rollNo exists"})
        }
    }
    else{
        return res.status(401).message("unauthorized")
    }

})


router.get('/list_of_members' , async(req , res) => {
    
    console.log(req.headers)
    const society = req.user.email.split("@")[0] 
    console.log(society)

    if(check(society)){
        const people = await Team_Schema.find({society : society})
        return res.status(200).json(people)
    }
    else{
        return res.status(401).message("unauthorized")
    }

})





