import { stations } from './store';

const format = {
  dateToTimeString: (dateStr) => new Date(dateStr).toLocaleTimeString().substr(0, 5)
}

const stationName = (id) => {
  const station = stations.find(s => s.id === id) || {};
  return station.name || '-';
}

export { format, stationName };