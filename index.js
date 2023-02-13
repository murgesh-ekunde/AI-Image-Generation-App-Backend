import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();

app.use(function(req, res, next) {
  res.header(
      "Access-Control-Allow-Headers",
      "x-auth-token, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-control-Allow-Methods", "GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, content-type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use(express.json({ limit: "50mb" }));

// middlewares
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

//port listening
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error)
  }
};

startServer();
