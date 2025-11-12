import connectDB from "./db/db.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, (req, res) => {
      console.log(`Server is listening on ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection fialed !!! ", err);
  });

app.on("error", (error) => {
  console.log("Error", error);
  throw error;
});
