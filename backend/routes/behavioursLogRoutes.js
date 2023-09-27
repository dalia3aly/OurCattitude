// // handing routes for dailyLog (frontend)/ behaviourslog (backend)

// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/authMiddleware');
// const BehavioursLogModel = require('../models/BehavioursLog'); // Import the BehavioursLog model

// // Route to add a new daily log
// router.post('/addDailyLog', verifyToken, async (req, res) => {
//   const userID = req.userID;
//   const { date, foodlogID, sleeping_hours, litter_habits, activity_level, unusual_behaviours, catID } = req.body;

//   try {
//     const newLog = await BehavioursLogModel.create({
//       date,
//       foodlogID,
//       sleeping_hours,
//       litter_habits,
//       activity_level,
//       unusual_behaviours,
//       catID
//     });

//     res.status(201).json(newLog);
//   } catch (err) {
//     console.error("Error in adding daily log:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Route to fetch daily logs for a specific cat
// router.get('/cat/:catID/dailyLogs', verifyToken, async (req, res) => {
//   const catID = req.params.catID;
  
//   try {
//     const logs = await BehavioursLogModel.findAll({ where: { catID } });
  
//     if (logs.length === 0) {
//       return res.status(404).json({ message: "No logs found for this cat" });
//     }
  
//     res.json(logs);
//   } catch (err) {
//     console.error("Error fetching daily logs:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
