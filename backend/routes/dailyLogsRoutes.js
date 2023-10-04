const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const dailyLogsController = require('../controllers/dailyLogsController'); // Make sure path is correct

router.post("/:catID/addLog", verifyToken, dailyLogsController.addLog);
router.get("/:catID/logs", verifyToken, dailyLogsController.getLogsByCatId);
router.get("/:catID/:logID", verifyToken, dailyLogsController.getLogById);
router.put("/editLog/:logID", verifyToken, dailyLogsController.updateLog);
router.delete("/deleteLog/:logID", verifyToken, dailyLogsController.deleteLog);
router.get("/:catID/logs", verifyToken, dailyLogsController.getAllLogsByCatId);
router.get("/:catID/logs/:date", verifyToken, dailyLogsController.getLogsByDate);
router.get("/:catID/logs/:startDate/:endDate", verifyToken, dailyLogsController.getLogsByDateRange);



module.exports = router;
