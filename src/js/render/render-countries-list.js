export function createCountryMarkup(country) {
  return `
    <li class="country-item">
        <img class="country-img" src=${country.flags.svg}>
        <span class="country-name">${country.name.official}</span>
    </li> 
    `;
}

export function renderSearchResults(data) {
  const renderList = data.map(country => createCountryMarkup(country)).join('');
  refs.countryList.insertAdjacentHTML('beforeend', renderList);
}
