import express from "express";
import countriesRoute from "./routes/api/countries";
import dotenv from "dotenv";
import cors from "cors";
// configure the ENVIROMENT VARIABLE
dotenv.config();

const app = express();
// recognize the incoming request object
app.use(express.json());

const PORT = process.env.PORT || 8080;
// accept the cross origin resource
app.use(cors());

app.get("/", (_, res) => {
  res.send("Server Up");
});

// set routes to the server
app.use(countriesRoute);

// handle route error
app.use((_, res) => {
  const error = new Error("Route not found");
  return res.status(404).json({
    message: error.message,
  });
});
// listen to the port
app.listen(PORT);
