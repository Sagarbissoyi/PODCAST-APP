const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user");
const CatApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");
const cors = require("cors");


require("dotenv").config();
require("./conn/conn");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }));



  
app.use(express.json());
app.use(cookieParser());
app.use("/uploads",express.static("uploads"));

//all routes
app.use("/api/v1",userApi);
app.use("/api/v1",CatApi);
app.use("/api/v1",PodcastApi );

app.listen(process.env.PORT, () => {
  console.log(`Sever started on port : ${process.env.PORT}`);
});



//npm create vite@latest frontend



















// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const userApi = require("./routes/user");
// const CatApi = require("./routes/categories");
// const PodcastApi = require("./routes/podcast");
// const cors = require("cors");
// require("dotenv").config();
// require("./conn/conn");

// // CORS Configuration
// app.use(
//   cors({
//     origin: ["http://localhost:5173"], // Adjust this to your frontend URL
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json()); // For parsing application/json
// app.use(cookieParser()); // For parsing cookies
// app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory

// // All routes
// app.use("/api/v1", userApi); // User routes
// app.use("/api/v1", CatApi); // Category routes
// app.use("/api/v1", PodcastApi); // Podcast routes

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server started on port: ${process.env.PORT}`);
// });