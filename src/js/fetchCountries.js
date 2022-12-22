import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const BASIC_URL = 'https://restcountries.com/v3.1/name/';
  const searchParams = new URLSearchParams({
    fields: ['name', 'capital', 'population', 'flags', 'languages'],
  });
  return fetch(`${BASIC_URL}${name}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
