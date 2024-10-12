const express = require('express');
const router = express.Router();
const event = require('../models/Event_register.js');

// Get Past Events
router.get('/events/past', async (req, res) => {
  const now = new Date();
  try {
    const pastEvents = await Event.find({ endTime: { $lt: now } });
    res.status(200).json(pastEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Present Events
router.get('/events/present', async (req, res) => {
  const now = new Date();
  try {
    const presentEvents = await Event.find({ startTime: { $lte: now }, endTime: { $gte: now } });
    res.status(200).json(presentEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Future Events
router.get('/events/future', async (req, res) => {
  const now = new Date();
  try {
    const futureEvents = await Event.find({ startTime: { $gt: now } });
    res.status(200).json(futureEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;



