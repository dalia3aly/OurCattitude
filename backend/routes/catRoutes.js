const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const catController = require('../controllers/catController'); 

router.post('/addCat', verifyToken, catController.addCat);
router.get('/user/cats', verifyToken, catController.getAllCats);
router.get('/user/cat/:catID', verifyToken, catController.getCatByID);
router.put('/editCat/:catID', verifyToken, catController.editCat);
router.delete('/deleteCat/:catID', verifyToken, catController.deleteCat);

module.exports = router;
