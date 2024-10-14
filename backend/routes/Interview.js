const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs'); 

// model importing
const Interview = require('../models/Interview');

const router = express.Router();

// Set up Multer for file upload handling
const upload = multer({ dest: 'uploads/' });

// Route to handle Excel file upload and store data into MongoDB
router.post('/upload', upload.single('file'), async (req, res) => {
    const society = req.user.email.split("@")[0];

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    if (!society) {
        return res.status(400).json({ message: 'Society login needed.' });
    }

    try {
        // Read the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        if (sheet.length === 0) {
            return res.status(400).json({ message: 'The uploaded file is empty.' });
        }

        // Extract headers
        const headers = sheet[0];
        const rollNoIndex = headers.indexOf('rollNo');
        const nameIndex = headers.indexOf('name');
        const venueIndex = headers.indexOf('venue');
        const timeOfInterviewIndex = headers.indexOf('timeOfInterview');

        // Validate column presence
        if (rollNoIndex === -1 || timeOfInterviewIndex === -1) {
            return res.status(400).json({ message: 'Missing required columns: rollNo and/or timeOfInterview.' });
        }

        // Iterate over rows (skipping the header) and insert/update them in MongoDB
        const promises = sheet.slice(1).map(async (row) => {
            // Check for undefined values in required columns
            if (
                row[rollNoIndex] === undefined ||
                row[timeOfInterviewIndex] === undefined ||
                row[nameIndex] === undefined ||
                row[venueIndex] === undefined
            ) {
                return Promise.reject(new Error('One or more required fields are missing in the row.'));
            }

            const rollNo = row[rollNoIndex];

            // Check if the entry already exists
            const existingEntry = await Interview.findOne({ rollNo: rollNo, society: society });

            if (existingEntry) {
                // Update the existing record
                existingEntry.name = row[nameIndex];
                existingEntry.venue = row[venueIndex];
                existingEntry.timeOfInterview = row[timeOfInterviewIndex];
                return existingEntry.save(); // Save the updated record
            } else {
                // Create a new record
                const newRow = new Interview({
                    rollNo: rollNo,
                    name: row[nameIndex],
                    venue: row[venueIndex],
                    timeOfInterview: row[timeOfInterviewIndex],
                    society: society // Add the society from the request parameters
                });
                return newRow.save(); // Save the new record
            }
        });

        // Wait for all insertions and updates to complete
        await Promise.allSettled(promises);

        // Delete the file after processing
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            }
        });

        res.status(201).json({ message: 'File uploaded and data inserted/updated in MongoDB.' });
    } catch (err) {
        console.error('Error processing file:', err);
        return res.status(500).json({ message: 'An error occurred while processing the file.' });
    }
});



// Get interview schedule for the user's society
router.get('/interview_schedule', async (req, res) => {
    const society = req.user.email.split("@")[0];

    if (!society) {
        return res.status(400).json({ message: 'Society login is required.' });
    }

    try {
        const interviews = await Interview.find({ society: society });

        if (interviews.length === 0) {
            return res.status(404).json({ message: 'No interviews found for this society.' });
        }

        return res.json(interviews);
    } catch (err) {
        console.error('Error fetching interview schedule:', err);
        return res.status(500).json({ message: 'An error occurred while fetching the interview schedule.' });
    }
});



// Route to get the interview time by rollNo and society
router.get('/interview-time/:society', async (req, res) => {
    const { society } = req.params;
    const rollNo = req.user.rollNo;

    if (!rollNo || !society) {
        return res.status(400).json({ message: 'Both rollNo and society are required.' });
    }

    try {
        const interview = await Interview.findOne({ rollNo: rollNo, society: society });

        if (!interview) {
            return res.status(404).json({ message: 'No interview found for the given rollNo and society.' });
        }

        return res.json(interview);
    } catch (err) {
        console.error('Error fetching interview time:', err);
        return res.status(500).json({ message: 'An error occurred while fetching the interview time.' });
    }
});

// Route to get interview time by rollNo only
router.get('/interview-time', async (req, res) => {
    const rollNo = req.user.rollNo;

    if (!rollNo) {
        return res.status(400).json({ message: 'lease Login' });
    }

    try {
        const interviews = await Interview.find({ rollNo: rollNo });

        if (interviews.length === 0) {
            return res.status(404).json({ message: 'No interviews found for the given rollNo.' });
        }

        return res.json(interviews);
    } catch (err) {
        console.error('Error fetching interview time:', err);
        return res.status(500).json({ message: 'An error occurred while fetching the interview time.' });
    }
});

module.exports = router;
