// filter the countries that match the given query
export const filterCountriesName = (dataArray: any[], query: string) => {
  const filterCountries = dataArray.filter(
    (country: { name: { common: string } }) =>
      country.name.common.toLowerCase().indexOf(query) !== -1
  );

  return filterCountries;
};
