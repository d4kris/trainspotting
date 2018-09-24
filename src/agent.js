import superAgentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { stationName } from './utils';

const superagent = superAgentPromise(_superagent, global.Promise);

const TRAINS_API_ROOT = 'https://api.trafikinfo.trafikverket.se/v1.3/data.json';
const JOKE_API_ROOT = 'https://geek-jokes.sameerkumar.website/api';
const DAD_API_ROOT = 'https://icanhazdadjoke.com';

const responseBody = res => res.body;
const tokenPlugin = 'method to create a token...'

const requests = {
  get: url => superagent.get(url).then(responseBody),
  put: (url, body) => superagent.put(url, body).use(tokenPlugin).then(responseBody),
  post: (url, query) => {
    return superagent
      .post(url)
      .send(query)
      .then(responseBody);
  },
  postXml: (url, query) => {
    return superagent
      .post(url)
      .set('Content-Type', 'application/xml')
      .send(query);
  }
};

//TODO robustify, handle errors
const Trains = {
  all: () => {
    const queryXml = '<?xml version="1.0"?>\n' +
      '<REQUEST>\n' +
      '\t<LOGIN authenticationkey="***REMOVED***"/>\n' +
      '\t<QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation" ' +
      '\t\t\tobjecttype="TrainAnnouncement">\n' +
      '\t\t<FILTER>\n' +
      '\t\t\t<AND>\n' +
      '\t\t\t\t<EQ name="LocationSignature" value="Kb"/>\n' +
      '\t\t\t\t<EQ name="Advertised" value="true"/>\n' +
      '\t\t\t\t<EQ name="ActivityType" value="Avgang"/>\n' +
      '\t\t\t\t<OR>\n' +
      '\t\t\t\t\t<AND>\n' +
      '\t\t\t\t\t\t<GT name="AdvertisedTimeAtLocation" value="$DateAdd(-00:15:00)"/>\n' +
      '\t\t\t\t\t\t<LT name="AdvertisedTimeAtLocation" value="$DateAdd(14:00:00)"/>\n' +
      '\t\t\t\t\t</AND>\n' +
      '\t\t\t\t\t<GT name="EstimatedTimeAtLocation" value="$DateAdd(-00:05:00)"/>\n' +
      '\t\t\t\t</OR>\n' +
      '\t\t\t</AND>\n' +
      '\t\t</FILTER>\n' +
      '\t</QUERY>\n' +
      '</REQUEST>';
    return requests.postXml(TRAINS_API_ROOT, queryXml)
      .then(res => {
        return res.body.RESPONSE.RESULT[0].TrainAnnouncement.map(t => {
          const to = t.ToLocation && t.ToLocation[0];
          const toStation = stationName(to && to.LocationName);
          return {
            id: t.ActivityId,
            name: t.ProductInformation[0],
            to: toStation,
            time: t.AdvertisedTimeAtLocation,
            estTime: t.EstimatedTimeAtLocation
          }
        });
      });
  },
  station: station => requests.postXml(TRAINS_API_ROOT, { station: station })
};

const Jokes = {
  geek: () => requests.get(JOKE_API_ROOT),
  dad: () => superagent.get(DAD_API_ROOT)
    .set('User-Agent', 'Trainspotting by github.com/d4kris')
    .set('Accept', 'application/json')
    .then(res => {
      return res.body.joke;
    })
};

export default {
  Trains,
  Jokes
};