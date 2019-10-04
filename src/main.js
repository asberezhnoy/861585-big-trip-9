import TripController from './components/TripController';
import {getMockTrip} from './components/datasource';

const trip = getMockTrip();
const controller = new TripController(document.querySelector(`.page-body`), trip);
controller.init();
