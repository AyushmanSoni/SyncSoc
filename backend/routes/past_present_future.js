const express = require('express');
const router = express.Router();
const event = require('../models/Event_register.js');

// Get Past Events
router.get('/events/past', async (req, res) => {
  const now = new Date();
  try {
    const pastEvents = await event.find({ endTime: { $lt: now } });
    res.status(200).json(pastEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Present Events
router.get('/events/present', async (req, res) => {
  const now = new Date();
  try {
    const presentEvents = await event.find({ startTime: { $lte: now }, endTime: { $gte: now } });
    res.status(200).json(presentEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Future Events
router.get('/events/future', async (req, res) => {
  const now = new Date();
  try {
    const futureEvents = await event.find({ startTime: { $gt: now } });
    res.status(200).json(futureEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Get 3 Recent Past Events
router.get('/events/recent-past', async (req, res) => {
    const now = new Date();
    try {
      const recentPastEvents = await event.find({ endTime: { $lt: now } })  // Past events
        .sort({ endTime: -1 })  // Sort by endTime in descending order
        .limit(3);  // Limit to 3 events
      res.status(200).json(recentPastEvents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
// Get 3 Recent Present Events
router.get('/events/recent-present', async (req, res) => {
    const now = new Date();
    try {
      const recentPresentEvents = await event.find({ startTime: { $lte: now }, endTime: { $gte: now } })  // Present events
        .sort({ startTime: 1 })  // Sort by startTime in ascending order
        .limit(3);  // Limit to 3 events
      res.status(200).json(recentPresentEvents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
  // Get 3 Recent Future Events
router.get('/events/recent-future', async (req, res) => {
    const now = new Date();
    try {
      const recentFutureEvents = await event.find({ startTime: { $gt: now } })  // Future events
        .sort({ startTime: 1 })  // Sort by startTime in ascending order (soonest first)
        .limit(3);  // Limit to 3 events
      res.status(200).json(recentFutureEvents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;



