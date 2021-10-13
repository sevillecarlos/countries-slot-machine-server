import express from "express";
import countriesRoute from "./routes/api/countries";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/", (_, res) => {
  res.send("Server Up");
});

app.use(countriesRoute);

app.use((_, res) => {
  const error = new Error("Not found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(PORT);
