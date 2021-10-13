import { Request, Response } from "express";
import { URL_API } from "../config";
import https from "https";

// find a country from a given name
const findCountryByName = async (req: Request, res: Response) => {
  try {
    // get the id from param
    const countryQueryName: string = req.params.id;

    https.get(`${URL_API}/name/${countryQueryName}`, (resp: any) => {
      let data: string = "";
      resp.on("data", (chunk: string) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);

        if (parseData?.status !== 404) {
          const [country] = parseData;
          const {
            name: { common: countryName },
            capital,
            region,
            flag,
          } = country;

          res.json({
            countryName,
            capital,
            region,
            flag,
          });
        } else {
          throw "The country don't exist";
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllCountries = async (_: Request, res: Response) => {
  try {
    https.get(`${URL_API}/all/`, (resp) => {
      let data: string = "";

      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);
        const infoCountries = parseData.map((country: any) => ({
          countryName: country.name.common,
          capital: country.capital,
          region: country.region,
          flag: country.flag,
        }));
        res.json(infoCountries);
      });
    });
  } catch (error) {
    throw error.message;
  }
};

const getListCountriesByName = (req: Request, res: Response) => {
  const countryQuery: string = req.body.countryQuery;

  try {
    https.get(`${URL_API}/all`, (resp) => {
      let data: string = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        const parseData = JSON.parse(data);

        const filterCountries = parseData.filter(
          (country: { name: { common: string } }) =>
            country.name.common.toLowerCase().indexOf(countryQuery) !== -1
        );
        if (filterCountries.length !== 0) {
          const infoCountries = filterCountries.map((country: any) => ({
            countryName: country.name.common,
            capital: country.capital,
            region: country.region,
            flag: country.flag,
          }));
          res.json(infoCountries);
        } else {
          throw "The country don't exist";
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { findCountryByName, getAllCountries, getListCountriesByName };
