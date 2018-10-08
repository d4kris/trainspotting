import { stations } from './store';

const format = {
  dateToTimeString: (dateStr) => new Date(dateStr).toLocaleTimeString().substr(0, 5)
}

const stationName = (id) => {
  const station = stations.find(s => s.id === id) || {};
  return station.name || '-';
}

export const headerImgs = [
  './images/railroad-tracks-into-mist.jpg',
  './images/railway-line-sunset.jpg',
  './images/train-steam.jpg',
  './images/railroad-tracks-sky.jpg',
  './images/train-bridge.jpg'
];

export { format, stationName };