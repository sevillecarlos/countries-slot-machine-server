import { filterCountriesName } from "../helpers";

import { expect } from "@jest/globals";
import { countriesData } from "./config";

test("Filter the country that contian part of the query", () => {
  expect(filterCountriesName(countriesData, "brazi")).toStrictEqual([
    {
      name: { common: "Brazil" },
      capital: ["Brasília"],
      region: "Americas",
      flag: "🇧🇷",
    },
  ]);
});

test("Filter the country that contian part of the query", () => {
  expect(filterCountriesName(countriesData, "bra")).toStrictEqual([
    {
      name: { common: "Brazil" },
      capital: ["Brasília"],
      region: "Americas",
      flag: "🇧🇷",
    },
    {
      name: { common: "Gibraltar" },
      capital: ["Gibraltar"],
      region: "Europe",
      flag: "🇬🇮",
    },
  ]);
});
