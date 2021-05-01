import './styles.css';
import { displayNav, contentStructure } from './nav';
import {getLocation} from './weather'
// import displayMain from './main'

const start = () => {
  displayNav();
  contentStructure();
};
start();
// getLocation()

