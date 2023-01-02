import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { refs } from './index';
const BASE_URL = 'https://restcountries.com/v2';

export const gg = function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      refs.list.innerHTML = '';
      refs.box.innerHTML = '';
      return;
    }
    return response.json();
  });
};
