import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const Db = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;
import noteRoutes from "./routes/routes.js";
import { MongoClient } from "mongodb";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: ['https://note-project-one.vercel.app/'] }));
app.use("/note", noteRoutes);

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;
let dbo = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};

mongoose
  .connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      dbo.connectToServer(function (err) {
        if (err) console.error(err);
      }),
        console.log(`Server Running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  }); 
