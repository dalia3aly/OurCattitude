const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const CatModel = require('../models/Cat');


//Routes for Cat CRUD operations

router.post('/addCat', verifyToken, async (req, res) => {
  console.log("UserID from request:", req.userID);       // Debug line

  const { name, breed, colour, ageYears, ageMonths, gender, avatar, chronic_issues } = req.body;
  const userID = req.userID;  // Ensure this variable name matches with the one set in the middleware

  try {

    // Create a JSON object for age
    const age = JSON.stringify({ years: ageYears, months: ageMonths });
  
    const newCat = await CatModel.create({
      name,
      breed,
      colour,
      age,          // Now a JSON object
      gender,
      avatar,  
      chronic_issues,
      userID             
    });

    res.status(201).json(newCat);
  } catch (err) {
    console.error("Error in adding cat:", err);  // Debug line
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Routes for cat fetching data for user profiles and related CRUD operations:

router.get('/user/cats', verifyToken, async (req, res) => {
    try {
      const userID = req.userID;
      const userCats = await CatModel.findAll({ where: { userID } });
  
      if (userCats.length === 0) {
        return res.status(404).json({ message: "No cats found for this user" });
      }
  
      res.json(userCats);
    } catch (err) {
      console.error("Error fetching cats:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports = router;
