const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const CatModel = require('../models/Cat');

//Testing endpoints:
// Add cat : http://localhost:3000/api/cats/addCat
// Get all cats for a user : http://localhost:3000/api/cats/user/cats
// Get a specific cat : http://localhost:3000/cat/user/cat/1
// Update a specific cat : http://localhost:3000/api/cats/editCat/1
// Delete a specific cat : http://localhost:3000/api/cats/deleteCat/1



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


  // Get a cat by ID
  router.get('/user/cat/:catID', verifyToken, async (req, res) => {
    const catID = req.params.catID;
    const userID = req.userID;

        try {
            const cat = await CatModel.findOne({ where: { catID, userID } });
            if (!cat) {
            return res.status(404).json({ message: "Cat not found or unauthorized" });
            }
            res.json(cat);
        } catch (err) {
            console.error("Error fetching cat:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }

    });



  // More CRUD operations for individual cats and user control:

  // Update a cat

  router.put('/editCat/:catID', verifyToken, async (req, res) => {
    const catID = req.params.catID;
    const userID = req.userID;
    const { name, breed, colour, ageYears, ageMonths, gender, avatar, chronic_issues } = req.body;
    
    // Check if the cat exists and belongs to the user
    const cat = await CatModel.findOne({ where: { catID, userID } });
    if (!cat) {
      return res.status(404).json({ message: "Cat not found or unauthorized" });
    }
  
    // Update the cat
    try {
      const age = JSON.stringify({ years: ageYears, months: ageMonths });
  
      await cat.update({
        name,
        breed,
        colour,
        age,
        gender,
        avatar,
        chronic_issues
      });
  

      res.status(200).json({ message: "Cat updated successfully" });
    } catch (err) {
      console.error("Error updating cat:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



  // Delete a cat

  router.delete('/deleteCat/:catID', verifyToken, async (req, res) => {
    const catID = req.params.catID;
    const userID = req.userID;
  
    // Check if the cat exists and belongs to the user
    const cat = await CatModel.findOne({ where: { catID, userID } });
    if (!cat) {
      return res.status(404).json({ message: "Cat not found or unauthorized" });
    }
  
    // Delete the cat
    try {
      await cat.destroy();
      res.status(200).json({ message: "Cat deleted successfully" });
    } catch (err) {
      console.error("Error deleting cat:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports = router;
