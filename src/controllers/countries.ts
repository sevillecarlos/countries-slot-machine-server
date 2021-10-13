import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { URL_API } from "../config";
import { Countries } from "../interfaces/countries.interface";
import https from "https";

// find a country from a given name
const findCountryByName = async (req: Request, res: Response) => {
  // get the id from param
  const countryQueryName: string = req.params.id;
  // verify if are error when validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send error message if don't pass validation
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // get a specific country by given name
    https.get(`${URL_API}/name/${countryQueryName}`, (resp: any) => {
      let data: string = "";

      resp.on("data", (chunk: string) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);
        if (parseData?.status !== 404) {
          const [country]: [Countries] = parseData;
          //parse the country data to be send
          const {
            name: { common: countryName },
            capital,
            region,
            flag,
          } = country;

          res.status(200).json({
            countryName,
            capital,
            region,
            flag,
          });
        } else {
          throw new Error("The country don't exist");
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// all countries
const getAllCountries = async (_: Request, res: Response) => {
  try {
    // get all countries
    https.get(`${URL_API}/all/`, (resp) => {
      let data: string = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData: [Countries] = JSON.parse(data);
        const infoCountries = parseData.map((country: any) => ({
          countryName: country.name.common,
          capital: country.capital,
          region: country.region,
          flag: country.flag,
        }));
        res.status(200).json(infoCountries);
      });
    });
  } catch (error) {
    throw error.message;
  }
};

const getListCountriesByName = (req: Request, res: Response) => {
  // get the query from body
  const countryQuery: string = req.body.countryQuery;
  // verify if are error when validate the request body
  const errors = validationResult(req);
  // send error message if don't pass validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // find the list of country that match the query
    https.get(`${URL_API}/all`, (resp) => {
      let data: string = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData: [Countries] = JSON.parse(data);

        //filter the countries that match the given query
        const filterCountries = parseData.filter(
          (country: { name: { common: string } }) =>
            country.name.common.toLowerCase().indexOf(countryQuery) !== -1
        );
        //check a filter country
        if (filterCountries.length !== 0) {
          //parse the country data to be send
          const infoCountries = filterCountries.map((country: any) => ({
            countryName: country.name.common,
            capital: country.capital,
            region: country.region,
            flag: country.flag,
          }));

          res.status(200).json(infoCountries);
        } else {
          throw new Error("The country don't exist");
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { findCountryByName, getAllCountries, getListCountriesByName };
