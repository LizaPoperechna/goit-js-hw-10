import './css/styles.css';

import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) { 

    const searchCountry = input.value.trim();

    cleanHtml();

    if (searchCountry !== "") {
        fetchCountries(searchCountry)
            .then(renderCountries)
            .catch(error => {console.log(error)})
    };
}

    function renderCountries(searchResult) {
        
        if (searchResult.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name')
        }

        
        else if (searchResult.length > 10) { 
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }

        else if (searchResult.length >= 2 && searchResult.length <= 10) { 

            const searchList = searchResult
                .map(({ flags, name }) => {
                    return `<li>
                        <img src="${flags.svg}" alt="Flag of ${name.official}" width="50px">
                        <p> ${name.official}</p>
                    </li>`
                    })       
                .join('');
           
            countryList.innerHTML = searchList;
        }
  
        else if (searchResult.length === 1) {
            const markup = searchResult
                .map(({ flags, name, capital, population, languages }) => {
                    return `<div>
                    <img src="${flags.svg}" alt="Flag of ${name.official}" width="70px">
                    <h2>${name.official}</h2>
                    <p><b>Capital:</b> ${capital} </p>
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${Object.values(languages)}</p>
                    </div>`
                })
                .join('');

            countryInfo.innerHTML = markup;
        }
};



function cleanHtml() {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }



