import './styles.scss';
import { displayNav, contentStructure } from './nav';
import { getUserCoord } from './weather';

const start = () => {
  displayNav();
  contentStructure();
};
start();
getUserCoord();