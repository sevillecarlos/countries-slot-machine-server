import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { URL_API } from "../config";
import { Countries } from "../interfaces/countries.interface";
import { filterCountriesName } from "../helpers";
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

  // get a specific country by given name
  https.get(`${URL_API}/name/${countryQueryName}`, async (resp) => {
    const { statusCode } = resp;
    const buffers = [];

    try {
      if (statusCode === 200) {
        for await (const chunk of resp) {
          buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        // parse to JSON the string data
        const parseData: [Countries] = JSON.parse(data);
        console.log(parseData);

        const [country]: [Countries] = parseData;
        // parse the country data to be send
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
        throw new Error("The country given don't exist");
      }
    } catch (error) {
      res.status(statusCode).json({ error: error.message });
    }
  });
};

// all countries
const getAllCountries = async (_: Request, res: Response) => {
  // get all countries
  https.get(`${URL_API}/all/`, async (resp) => {
    const { statusCode } = resp;

    const buffers = [];

    try {
      for await (const chunk of resp) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();

      // parse to JSON the string data
      const parseData: [Countries] = JSON.parse(data);

      // parse the data to send
      const infoCountries = parseData.map((country: any) => ({
        countryName: country.name.common,
        capital: country.capital,
        region: country.region,
        flag: country.flag,
      }));

      res.json(infoCountries);
    } catch (error) {
      res.status(statusCode).json({ error: error.message });
    }
  });
};

const getListCountriesByName = (req: Request, res: Response) => {
  // get the query from body
  const countryQuery: string = req.body.countryQuery;
  // verify if are error when validate the request body
  const validationError = validationResult(req);
  // send error message if don't pass validation
  if (!validationError.isEmpty()) {
    return res.status(400).json({ errors: validationError.array() });
  }
  // find the list of country that match the query
  https.get(`${URL_API}/all`, async (resp) => {
    const { statusCode } = resp;
    let error;
    // check if the api get response
    if (statusCode !== 200) {
      error = new Error(`Failed to make the request`);
    }

    if (error) {
      res.status(statusCode).json({ error: error.message });
    }

    const buffers = [];

    try {
      for await (const chunk of resp) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      // parse to JSON the string data
      const parseData: [Countries] = JSON.parse(data);

      // filter the countries that match the given query
      const filterCountries = filterCountriesName(parseData, countryQuery);

      // check a filters countries
      if (filterCountries.length !== 0) {
        // parse the country data to be send
        const infoCountries = filterCountries.map((country: any) => ({
          countryName: country.name.common,
          capital: country.capital,
          region: country.region,
          flag: country.flag,
        }));

        res.status(200).json(infoCountries);
      } else {
        throw new Error("There are no countries with that letters");
      }
    } catch (error) {
      res.status(statusCode).json({ error: error.message });
    }
  });
};

export default { findCountryByName, getAllCountries, getListCountriesByName };
