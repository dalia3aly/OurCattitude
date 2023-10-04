const CatModel = require("../models/Cat");

exports.addCat = async (req, res) => {
  console.log("UserID from request:", req.userID);

  const { name, breed, colour, ageYears, ageMonths, gender, avatar, chronic_issues } = req.body;
  const userID = req.userID;

  try {
    const age = JSON.stringify({ years: ageYears, months: ageMonths });

    const newCat = await CatModel.create({
      name,
      breed,
      colour,
      age,
      gender,
      avatar,  
      chronic_issues,
      userID             
    });

    res.status(201).json(newCat);
  } catch (err) {
    console.error("Error in adding cat:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAllCats = async (req, res) => {
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
    };



    exports.getCatByID = async (req, res) => {
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

    };



    exports.editCat = async (req, res) => {
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
  };


  exports.deleteCat = async (req, res) => {
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
  };
  