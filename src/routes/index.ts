import express from "express";
import countriesRoute from "./api/countries";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Server Up");
});

app.use(countriesRoute);
app.listen(PORT);
