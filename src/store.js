export const defaultState = {
  station: 'kba',
  checked: false,
  showPicker: false,
  stations: [{
    id: 'gbg',
    name: 'Göteborg'
  },{
    id: 'kba',
    name: 'Kungsbacka'
  },{
    id: 'hde',
    name: 'Hede'
  }],
  trains: [{
    id: '1',
    name: 'Öresundståg',
    time: '08:15'
  },{
    id: '2',
    name: 'Västtrafik',
    time: '08:19'
  },{
    id: '3',
    name: 'Västtrafik',
    time: '08:36'
  },{
    id: '4',
    name: 'Öresundståg',
    time: '08:45'
  },{
    id: '5',
    name: 'Västtrafik',
    time: '08:49'
  }]
};
