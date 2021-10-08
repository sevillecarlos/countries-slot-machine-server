import express from "express";
import countriesRoute from "./routes/api/v1/countries";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (_, res) => {
  res.send("Server Up");
});

app.use(countriesRoute);
app.listen(PORT, () => {
  // console.log(` http://localhost:${PORT}`);
});
