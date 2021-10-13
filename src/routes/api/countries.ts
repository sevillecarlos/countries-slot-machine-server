import express from "express";
import { body, param } from "express-validator";

// controllers
import controller from "../../controllers/countries";

const router = express.Router();

// get an specific country by given name
router.get(
  "/countries/:id",
  param("id").toLowerCase(),
  controller.findCountryByName
);
// get all countries
router.get("/countries", controller.getAllCountries);
// get a list of countries by given name
router.post(
  "/countries",
  body("countryQuery").isString().toLowerCase(),
  controller.getListCountriesByName
);

export default router;
