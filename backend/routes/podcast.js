const authMiddleware = require("../middleware/authMiddlware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");
const router = require("express").Router();



/////////////////////////////////////////this code was error showing --- axios error(internal servar error)//////////////////////////////////
//add.podcast
// router.post("/add-podcast",authMiddleware,upload, async (req, res)=>{
//    try {
//     const{title,description,category} = req.body;
//     const frontImage = req.files["frontImage"][0].path;
//     const audioFile = req.files["audioFile"][0].path;
//     if(!title || !description || !category || !frontImage || !audioFile){
//         return res.status(400).json({message:"All fields are required"})
//     }
//     const {user} = req;
//     const cat = await Category.findOne({categoryName:category});
//     if(!cat){
//         return res.status(400).json({message:"No category found"})
//     }
//     const catid = cat._id;
//     const userid = user._id;
//     const newPodcast = new Podcast({title,description,category:catid,frontImage,audioFile,user:userid});
//     await newPodcast.save();
//     await Category.findByIdAndUpdate(catid,{$push:{podcasts: newPodcast._id},
//     });
//     await user.findByIdAndUpdate(userid,{$push:{podcasts:newPodcast._id}});
//     res.status(201).json({message:"Podcast added successfully"});
//    } catch (error) {

//     return res.status(500).json({message:"Failed to add podcast"});
//    }
// });







///////////////////////////////////////no error  showing in this code///////////////////////////////////


//add.podcast
router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
    try {
        const { title, description, category } = req.body;

        // Check if files are present
        const frontImage = req.files["frontImage"] ? req.files["frontImage"][0].path : null;
        const audioFile = req.files["audioFile"] ? req.files["audioFile"][0].path : null;

        // Validate input fields
        if (!title || !description || !category || !frontImage || !audioFile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { user } = req; // Ensure user is populated by authMiddleware
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const cat = await Category.findOne({ categoryName: category });
        if (!cat) {
            return res.status(400).json({ message: "No category found" });
        }

        const catid = cat._id;
        const userid = user._id;

        // Check if a podcast with the same title already exists
        const existingPodcast = await Podcast.findOne({ title });
        if (existingPodcast) {
            return res.status(400).json({ message: "A podcast with this title already exists." });
        }

        const newPodcast = new Podcast({ title, description, category: catid, frontImage, audioFile, user: userid });

        // Save the podcast and handle potential errors
        try {
            await newPodcast.save();
        } catch (dbError) {
            console.error("Database error:", dbError.message); // Log the error message
            return res.status(500).json({ message: "Database error while adding podcast", error: dbError.message });
        }

        // Update category and user with the new podcast ID
        await Category.findByIdAndUpdate(catid, { $push: { podcasts: newPodcast._id } });
        await User.findByIdAndUpdate(userid, { $push: { podcasts: newPodcast._id } });

        res.status(201).json({ message: "Podcast added successfully" });
    } catch (error) {
        console.error("Error adding podcast:", error); // Log the error for debugging
        return res.status(500).json({ message: "Failed to add podcast" });
    }
});









//get all podcast
router.get("/get-podcasts", async(req, res)=>{
    try {
        const podcasts = await Podcast.find()
        .populate("category")
        .sort({createdAt:-1});
        return res.status(200).json({data: podcasts});
    } catch (error) {

        return res.status(500).json({message: "Internal server error"});
    }
});



//get-user-podcasts
router.get("/get-user-podcasts",authMiddleware, async(req, res)=>{
    try {
        const { user } =req;
        const userid = user._id;
        const data = await User.findById(userid)
        .populate({
            path:"podcasts",
            populate:{ path:"category" },

        })
        .select("-password");
        if(data && data.podcasts)
        {
           data.podcasts.sort((a,b) =>new Date(b.createdAt) - new  Date(a.createdAt));

        }
        return res.status(200).json({data: data.podcasts});
    } catch (error) {

        return res.status(500).json({message: "Internal server error"});
    }
});




// Get podcast by ID
router.get("/get-podcast/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const podcast = await Podcast.findById(id).populate("category");

        // Check if podcast was found
        if (!podcast) {
            return res.status(404).json({ message: "Podcast not found" });
        }

        // Send the podcast data back to the client
        return res.status(200).json({ data: podcast });
    } catch (error) {
        console.error("Error fetching podcast:", error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
});



// //get podcast  by id
// router.get("/get-podcast/:id", async(req, res)=>{
//     try {
//        const { id } = req.params;
//        const podcasts = await Podcast.findById(id).populate("category");
//     return res.status(200).json({ data: podcast });

//     } catch (error) {
//         return res.status(500).json({message: "Internal server error"});
//     }
// });











//get podcast by categories
router.get("/category/:cat", async(req, res)=>{
    try {
       const { cat } = req.params;
       const categories = await Category.find({categoryName:cat}).populate(
        {path:"podcasts",populate:{path:"category"}}

       );
       let podcasts= [];
       categories.forEach((category) => {
        podcasts = [...podcasts, ...category.podcasts];
       })
      
       return res.status(200).json({data:podcasts})
    } catch (error) {

        return res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;





/////////////////////         ADD NEW FEATURES    (REMOVE PODCASTS) /////////////////////////////



// remove.podcast
// router.delete("/remove-podcast/:id", authMiddleware, async (req, res) => {
//     try {
//         const podcastId = req.params.id; // Get the podcast ID from the request parameters
//         const { user } = req; // Ensure user is populated by authMiddleware
        
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         // Find the podcast by ID
//         const podcast = await Podcast.findById(podcastId);
//         if (!podcast) {
//             return res.status(404).json({ message: "Podcast not found" });
//         }

//         // Check if the user is the owner of the podcast
//         if (podcast.user.toString() !== user._id.toString()) {
//             return res.status(403).json({ message: "You do not have permission to delete this podcast" });
//         }

//         // Remove the podcast from the database
//         await Podcast.findByIdAndDelete(podcastId);

//         // Optionally, remove the podcast ID from the associated category and user
//         await Category.findByIdAndUpdate(podcast.category, { $pull: { podcasts: podcastId } });
//         await User.findByIdAndUpdate(user._id, { $pull: { podcasts: podcastId } });

//         res.status(200).json({ message: "Podcast removed successfully" });
//     } catch (error) {
//         console.error("Error removing podcast:", error); // Log the error for debugging
//         return res.status(500).json({ message: "Failed to remove podcast" });
//     }
// });



















//////////////// create new file //////////////////////////////


// const request = require("supertest");
// const app = require("../app"); // Adjust the path to your Express app
// const mongoose = require("mongoose");
// const Podcast = require("../models/Podcast"); // Adjust the path to your Podcast model
// const User = require("../models/User"); // Adjust the path to your User model

// describe("DELETE /remove-podcast/:id", () => {
//     let server;
//     let token;
//     let podcastId;

//     beforeAll(async () => {
//         server = app.listen(3000); // Start the server
//         // Create a test user and authenticate to get a token
//         const user = await User.create({ username: "testuser", password: "password" });
//         token = "Bearer " + user.generateAuthToken(); // Adjust according to your auth logic

//         // Create a test podcast
//         const podcast = await Podcast.create({ title: "Test Podcast", user: user._id });
//         podcastId = podcast._id;
//     });

//     afterAll(async () => {
//         await Podcast.deleteMany({});
//         await User.deleteMany({});
//         mongoose.connection.close();
//         server.close();
//     });

//     it("should remove the podcast if the user is authorized", async () => {
//         const res = await request(server)
//             .delete(`/remove-podcast/${podcastId}`)
//             .set("Authorization", token);

//         expect(res.statusCode).toBe(200);
//         expect(res.body.message).toBe("Podcast removed successfully");

//         const deletedPodcast = await Podcast.findById(podcastId);
//         expect(deletedPodcast).toBeNull();
//     });

//     it("should return 404 if the podcast does not exist", async () => {
//         const res = await request(server)
//             .delete(`/remove-p
























