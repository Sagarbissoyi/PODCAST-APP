const router = require("express").Router();
const Cat = require("../models/category");

//add.category
router.post("/add-category",async (req, res) => {
   const{categoryName} = req.body;
   const cat = new Cat({categoryName});
   await cat.save();
   return res.status(200).json({message:"Category added"});
});
module.exports = router;