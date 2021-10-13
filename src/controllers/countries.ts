import { Request, Response, NextFunction } from "express";
import { URL_API } from "../config";
import https from "https";

// find a country from a given name
const findCountry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the id from param
    const countryName: string = req.params.id;

    https.get(`${URL_API}/name/${countryName}`, (resp: any) => {
      let data: string;
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
          res.json({ notFoundMsg: "The country don't exist" });
        }
      });
    });
  } catch (error) {
    res.json({ error });
  }
};

const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    https.get(`${URL_API}/all/`, (resp) => {
      let data: string;

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
    res.json({ error });
  }
};

const f;

export default { findCountry, getAllCountries };
