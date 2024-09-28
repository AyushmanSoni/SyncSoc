const express = require('express')
const router = express.Router()

const Team_Schema = require('../models/team_positions')


// constants importing
const {check} = require('../constants') 


// only admin access not allowed yet
router.post('/add_member' , async(req , res) => {

    const society = req.user.email.split("@")[0] 
    console.log(society)

    if(society && check(society)){
        const rollNo  = req.body.rollNo
        const position = req.body.position
        const name = req.body.name

        console.log(rollNo, position , name)
        
        try{
            const newevent = new Team_Schema({name : name , rollNo:rollNo , Position : position , society:society})
            await newevent.save()
            return res.status(200).json(newevent);
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


router.get('/list_of_members/:society' , async(req , res) => {
    
    const society = req.params.society
    console.log(society)
    const people = await Team_Schema.find({society : society})
    return res.status(200).json(people)

})

module.exports = router




