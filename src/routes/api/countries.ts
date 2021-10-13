import express from "express";

// controllers
import controller from "../../controllers/countries";

const router = express.Router();

// get an specific country by given name
router.get("/countries/:id", controller.findCountryByName);
// get all countries
router.get("/countries", controller.getAllCountries);
// get a list of countries by given name
router.post("/countries", controller.getListCountriesByName);

export default router;
