import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

//Referencies
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    clearAll();
    return '';
  }
  fetchCountries(inputValue).then(data => {
    clearAll();
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length >= 2 && data.length <= 10) {
      renderCountriesList(data);
    } else if (data.length === 1) {
      renderOneCountry(data);
    }
  });
}

function createCountriesMarkup(country) {
  return `
    <li class="country-item">
        <img class="country-img" src=${country.flags.svg}>
        <span class="country-name">${country.name.official}</span>
    </li> 
    `;
}

function renderCountriesList(data) {
  const renderList = data
    .map(country => createCountriesMarkup(country))
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', renderList);
}

function createOneCountryMarkup(country) {
  return `
    <div class="country-info__title" >
        <img class="country-img" src="${country.flags.svg}" alt="${
    country.name.common
  }" />
        <p class="country-info__name">${country.name.official}</p>
      </div>
      <ul class="country-info__details">
        <li><b>Capital:</b> ${country.capital}</li>
        <li><b>Population:</b> ${country.population}</li>
        <li><b>Languages:</b> ${Object.values(country.languages).join(
          ', '
        )}</li>
      </ul>`;
}

function renderOneCountry(data) {
  refs.countryInfo.insertAdjacentHTML(
    'beforeend',
    createOneCountryMarkup(...data)
  );
}

function clearAll() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
