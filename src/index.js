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
  const inputValue = e.target.value;
  fetchCountries(inputValue).then(data => {
    console.log(data);
    console.log(data.length);
    if (data.length > 10) {
      console.log('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 2 && data.length) {
      renderSearchResults(data);
    } else {
      console.log('here we should show details for one country');
    }
  });
}

function createCountryMarkup(country) {
  return `
    <li class="country-item">
        <img class="country-img" src=${country.flags.svg}>
        <span class="country-name">${country.name.common}</span>
    </li> 
    `;
}

function renderSearchResults(data) {
  const renderList = data.map(country => createCountryMarkup(country)).join('');
  refs.countryList.insertAdjacentHTML('beforeend', renderList);
}

function createCountryInfoMarkup() {}

function renderCountryInfo() {}
