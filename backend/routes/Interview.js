const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');

// model importing
const Interview = require('../models/Interview');

const router = express.Router();

// Set up Multer for file upload handling
const upload = multer({ dest: 'uploads/' });


// Route to handle Excel file upload and store data into MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    const society = req.user.email.split("@")[0] 
    // const { society } = req.user.name;
    console.log(society)
    console.log(req.user)
    

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    if (!society) {
        return res.status(400).send('No society parameter provided.');
    }

    try {
        // Read the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Iterate over rows and insert them into MongoDB
        const insertPromises = sheet.map((row, index) => {
            if (index === 0) return; // Skip header row, if necessary

            const newRow = new Interview({
                rollNo: row[0], // Assuming rollNo is in the first column
                name:row[1],
                venue:row[2],
                timeOfInterview: row[3], // Assuming timeOfInterview is in the second column, cast to Date if appropriate
                society: society // Add the society from the request parameters
            });

            // console.log(new)
            return newRow.save(); // Save the row to MongoDB
        });

        await Promise.all(insertPromises);

        res.send('File uploaded and data inserted into MongoDB.');
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).send('An error occurred while processing the file.');
    }
});


router.get('/interview_schedule' , async(req,res)=>{
    const society = req.user.email.split("@")[0] 
    // const { society } = req.user.name;
    console.log(society)
    
    if (!society) {
        return res.status(400).send('Society are required.');
    }

    try {
        // Find the interview document based on rollNo and society
        const interview = await Interview.find({ society: society });

        if (!interview) {
            return res.status(404).send('No interview found for the given rollNo and society.');
        }
        console.log(interview)

        return res.json(interview);
    } catch (err) {
        console.error('Error fetching interview time:', err);
        return res.status(500).send('An error occurred while fetching the interview time.');
    }
})


// Route to get the interview time by rollNo and society
router.get('/interview-time/:society', async (req, res) => {
    const { society } = req.params;
    const rollNo = req.user.rollNo; 

    if (!rollNo || !society) {
        return res.status(400).send('Both rollNo and society are required.');
    }

    try {
        // Find the interview document based on rollNo and society
        const interview = await Interview.findOne({ rollNo: rollNo, society: society });

        if (!interview) {
            return res.status(404).send('No interview found for the given rollNo and society.');
        }

        res.json(interview);
    } catch (err) {
        console.error('Error fetching interview time:', err);
        return res.status(500).send('An error occurred while fetching the interview time.');
    }
});


router.get('/interview-time', async (req, res) => {
    const rollNo = req.user.rollNo; 
    // console.log(rollNo)

    if (!rollNo) {
        return res.status(400).send('Society are required.');
    }

    try {
        // Find the interview document based on rollNo and society
        const interview = await Interview.find({ rollNo: rollNo });

        if (!interview) {
            return res.status(404).send('No interview found for the given rollNo and society.');
        }

        // console.log("result")
        // console.log(interview)
        return res.json(interview);
    } catch (err) {
        console.error('Error fetching interview time:', err);
        return res.status(500).send('An error occurred while fetching the interview time.');
    }
});



module.exports = router;