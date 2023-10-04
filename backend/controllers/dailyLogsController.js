const DailyLogs = require("../models/DailyLogs");
const { Op } = require("sequelize"); 


// Add a daily log
exports.addLog = async (req, res) => {
    const {
        catID,
        Date,
        ActivityLevel,
        SleepingHours,
        LitterHabits,
        UnusualBehaviours,
        EnvChanges,
        foodData,
      } = req.body;
      const userID = req.userID; // userID is a forgein key in cats table and is linked to catID
    
      try {
        const newLog = await DailyLogs.create({
          catID,
          Date,
          ActivityLevel,
          SleepingHours,
          LitterHabits,
          UnusualBehaviours,
          EnvChanges,
          foodData,
        });
    
        res.status(201).json(newLog);
      } catch (err) {
        console.error("Error in adding log:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };


// Fetch daily logs for a specific cat
    exports.getLogsByCatId = async (req, res) => {
        const catID = req.params.catID;
        const logID = req.params.logID;
        try {
            const logs = await DailyLogs.findAll({ where: { catID } });
            if (logs.length === 0) {
              return res.status(404).json({ message: "No logs found for this day" });
            }
        
            res.json(logs);
          } catch (err) {
            console.error("Error fetching logs:", err);
            res.status(500).json({ message: "Internal Server Error" });
          }
        };

// Fetch a specific log by ID
exports.getLogById = async (req, res) => {
    const logID = req.params.logID;
  
    try {
        const log = await DailyLogs.findOne({ where: { logID } });
        if (!log) {
          return res.status(404).json({ message: "Log not found or unauthorized" });
        }
    
        res.json(log);
      } catch (err) {
        console.error("Error fetching log:", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };

// Update a specific log
exports.updateLog = async (req, res) => {
    const logID = req.params.logID;
    const {
      catID,
      Date,
      ActivityLevel,
      SleepingHours,
      LitterHabits,
      UnusualBehaviours,
      EnvChanges,
      foodData,
    } = req.body;
  
    // Checking if the log exists
    const log = await DailyLogs.findOne({ where: { logID } });
    if (!log) {
      return res.status(404).json({ message: "Log not found or unauthorized" });
    }
  
    // Update the log
    try {
      await log.update({
        catID,
        Date,
        ActivityLevel,
        SleepingHours,
        LitterHabits,
        UnusualBehaviours,
        EnvChanges,
        foodData, // JSON type column that will hold product ID and serving size
      });
  
      res.status(200).json({ message: "Log updated successfully" });
    } catch (err) {
      console.error("Error updating log:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// Delete a specific log
exports.deleteLog = async (req, res) => {
    const logID = req.params.logID;

    // Checking if the log exists
    const log = await DailyLogs.findOne({ where: { logID } });
    if (!log) {
      return res.status(404).json({ message: "Log not found or unauthorized" });
    }
  
    // Delete the log
    try {
      await log.destroy();
      res.status(200).json({ message: "Log deleted successfully" });
    } catch (err) {
      console.error("Error deleting log:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  // Testing endpoint and method for fetching all logs for a cat:
  exports.getAllLogsByCatId = async (req, res) => {
  const catID = req.params.catID; // catID is a foreign key in the DailyLogs table
  const date = req.query.date; // to be used for DailyLogCalendar component

  let whereCondition = { catID };

  if (date) {
    whereCondition.date = date;
  }

  try {
    const logs = await DailyLogs.findAll({ where: whereCondition });

    if (logs.length === 0) {
      return res.status(404).json({ message: "No logs found for this day" });
    }

    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





// Fetch daily logs for a specific cat on a specific date
  exports.getLogsByDate = async (req, res) => {
    const catID = req.params.catID;
    const date = req.params.date;
  
    // Validate catID
    if (isNaN(catID)) {
      return res.status(400).json({ message: "Invalid catID" });
    }
  
    // Validate date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid date" });
    }
  
    try {
      const log = await DailyLogs.findOne({ where: { catID, date: parsedDate } });
  
      if (!log) {
        return res.status(404).json({ message: "No logs found for this day" });
      }
  
      res.json(log);
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



// Fetch daily logs for a cat by date range

exports.getLogsByDateRange = async (req, res) => {

    const catID = req.params.catID;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
  
    // Validate catID
    if (isNaN(catID)) {
      return res.status(400).json({ message: "Invalid catID" });
    }
  
    // Validate startDate
    const parsedStartDate = new Date(startDate);
    if (isNaN(parsedStartDate)) {
      return res.status(400).json({ message: "Invalid startDate" });
    }
  
    // Validate endDate
    const parsedEndDate = new Date(endDate);
    if (isNaN(parsedEndDate)) {
      return res.status(400).json({ message: "Invalid endDate" });
    }
  
    try {
      const logs = await DailyLogs.findAll({ where: { catID, date: { [Op.between]: [parsedStartDate, parsedEndDate] } } });
  
      if (logs.length === 0) {
        return res.status(404).json({ message: "No logs found for this day" });
      }
  
      res.json(logs);
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  
  };










