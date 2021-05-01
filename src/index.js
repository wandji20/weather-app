import './styles.css';
import { displayNav, contentStructure } from './nav';
import {getLocation} from './weather'

const start = () => {
  displayNav();
  contentStructure();
};
start();

