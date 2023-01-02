import { gg } from './fetchCountries';
const fetchCountries = gg;
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
export { refs };
const refs = {
  list: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const inputValue = input.value.trim();

  if (inputValue) {
    fetchCountries(inputValue)
      .then(data => createMarkup(data))
      .catch(error => console.log(error));
  }
  if (!inputValue) {
    clear();
  }
}

function createMarkup(obj) {
  checkFunctions(obj);
  // console.log(obj);
  // console.log({ obj: { languages: { name } } });
}

function createMarkupList(obj) {
  const markupList = obj
    .map(
      ({ flags, name }) =>
        `<div class = a><img class = b src="${flags.svg}" alt="#" width="30px" height="20px"><div>${name}</div></div>`
    )
    .join('');
  refs.list.insertAdjacentHTML('beforeend', markupList);
}

function createMarkupCard(obj) {
  const markup = obj
    .map(({ capital, population, languages, name, flags }) => {
      return `
  <div>
  <div class="c">
    <img src="${flags.svg}" alt="#" width =30px heigth= 20px class = d />
    <div>${name}</div>
  </div>
  <div>capital: ${capital}</div>
  <div>population: ${population}</div>
  <div>languages: ${languages.map(a => a.name).join(', ')}</div>
  </div>
`;
    })
    .join('');
  refs.box.insertAdjacentHTML('beforeend', markup);
}

function checkFunctions(obj) {
  if (obj.length > 1 && obj.length <= 10) {
    clear();

    return createMarkupList(obj);
  }

  if (obj.length === 1) {
    clear();

    return createMarkupCard(obj);
  }

  if (obj.length > 10) {
    clear();

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function clear() {
  refs.list.innerHTML = '';
  refs.box.innerWidth = '';
}
