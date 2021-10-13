import express from "express";

// controllers
import controller from "../../controllers/countries";

const router = express.Router();

router.get("/countries", controller.findCountry);

// routes.get("/countries", (_, res) => {
//   https.get(`${URL_API}/all/`, (resp) => {
//     let data: string;

//     resp.on("data", (chunk) => {
//       data += chunk;
//     });
//     resp.on("end", () => {
//       const parseData = JSON.parse(data);
//       const infoCountries = parseData.map((country: any) => ({
//         countryName: country.name.common,
//         capital: country.capital,
//         region: country.region,
//         flag: country.flag,
//       }));
//       res.json(infoCountries);
//     });
//   });
// });

// routes.post("/countries", (req, res) => {
//   const { countryQuery } = req.body;
//   https.get(`${URL_API}/all`, (resp) => {
//     let data: string;
//     resp.on("data", (chunk) => {
//       data += chunk;
//     });
//     resp.on("end", () => {
//       const parseData = JSON.parse(data);

//       const filterCountries = parseData.filter(
//         (country: { name: { common: string } }) =>
//           country.name.common.toLowerCase().indexOf(countryQuery) !== -1
//       );
//       if (filterCountries.length !== 0) {
//         const infoCountries = filterCountries.map((country: any) => ({
//           countryName: country.name.common,
//           capital: country.capital,
//           region: country.region,
//           flag: country.flag,
//         }));
//         res.json(infoCountries);
//       } else {
//         res.json({ notFoundMsg: "Countries don't exist" });
//       }
//     });
//   });
// });

export default router;
