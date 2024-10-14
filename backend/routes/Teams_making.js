const express = require('express')
const router = express.Router()

const Team_Schema = require('../models/team_positions')

// constants importing
const {check} = require('../constants') 

// Add a new team member
router.post('/add_member', async (req, res) => {
    const society = req.user.email.split("@")[0];
    // console.log(society);

    if (society && check(society)) {
        const { rollNo, position, name } = req.body;

        // console.log(rollNo, position, name);

        try {
            const newMember = new Team_Schema({ name, rollNo, Position: position, society });
            await newMember.save();
            return res.status(201).json(newMember); // Use 201 for created resource
        } catch (err) {
            console.error(err);
            return res.status(409).json({ message: "Person with the same rollNo already exists." }); // Use 409 Conflict for unique constraint violations
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" }); // Ensure to use .json() for consistent responses
    }
});

// List of members for a particular society
router.get('/list_of_members/:society', async (req, res) => {
    const society = req.params.society;
    // console.log(society);
    
    try {
        const members = await Team_Schema.find({ society: society });

        if (!members.length) {
            return res.status(404).json({ message: 'No members found for this society.' }); 
        }
        return res.status(200).json(members);
    } 
    catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a team member by rollNo
router.delete('/team/:rollNo', async (req, res) => {
    const { rollNo } = req.params;

    try {
        const result = await Team_Schema.findOneAndDelete({ rollNo: rollNo });

        if (!result) {
            return res.status(404).json({ message: 'Entry not found.' });
        }

        return res.status(200).json({ message: 'Entry deleted successfully.', result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;



