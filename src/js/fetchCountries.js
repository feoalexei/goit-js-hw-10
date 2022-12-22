export default function fetchCountries(name) {
  const BASIC_URL = 'https://restcountries.com/v3.1/name/';
  //   const searchParams = new URLSearchParams({
  //     fields: [name.official, capital, population, flags.svg, languages],
  //   });

  //   console.log(searchParams.toString());
  //?fields=name.official,capital,population,flags.svg,languages

  return fetch(`${BASIC_URL}${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log('catched error'));
}
