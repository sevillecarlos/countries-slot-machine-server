import express from "express";
import http from "http";

const routes = express.Router();

const URL_API = "http://api.countrylayer.com/v2";

routes.post("/country", (req, res) => {
  const { countryQuery } = req.body;
  try {
    http.get(
      `${URL_API}/name/${countryQuery}?access_key=3b404a2b4c0ec7cb384617065d0d654b&FullText=true`,
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          const [parseData] = JSON.parse(data);
          res.json(parseData);
        });
      }
    );
  } catch (error) {
    res.json({ error });
  }
});

routes.get("/countries", (_, res) => {
  http.get(
    `${URL_API}/all?access_key=3b404a2b4c0ec7cb384617065d0d654b&FullText=true`,
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);
        res.json(parseData);
      });
    }
  );
});

routes.post("/countries", (req, res) => {
  const { countryQuery } = req.body;
  http.get(
    `${URL_API}/all?access_key=${process.env.ACCESS_TOKEN}&FullText=true`,
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);
        const filterCountries = parseData.filter(
          (country: { name: string }) =>
            country.name.toLocaleLowerCase().indexOf(countryQuery) !== -1
        );
        res.json(filterCountries);
      });
    }
  );
});

export default routes;
// Write a function that connects to https://restcountries.eu/ and gets a unique country from a specific name
// given using the Node back end and send it to the front end.
