import express from "express";
import http from "http";

const routes = express.Router();

routes.get("/get-countries", (_, res) => {
  http.get(
    `http://api.countrylayer.com/v2/all?access_key=${process.env.ACCESS_TOKEN}
  `,
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        res.send(JSON.parse(data));
      });
    }
  );
});

export default routes;
// Write a function that connects to https://restcountries.eu/ and gets a unique country from a specific name
// given using the Node back end and send it to the front end.
