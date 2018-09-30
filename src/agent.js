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

const trainResponse = res => {
  return res.body.RESPONSE.RESULT[0].TrainAnnouncement.map(t => {
    const to = t.ToLocation && t.ToLocation[0];
    const toStation = stationName(to && to.LocationName);
    return {
      id: t.ActivityId,
      name: t.ProductInformation[0],
      to: toStation,
      time: t.AdvertisedTimeAtLocation,
      realTime: t.TimeAtLocation,
      estTime: t.EstimatedTimeAtLocation
    }
  });
};

//TODO robustify, handle errors
const Trains = {
  getFrom: (from = 'G') => {
    const queryXml = `<?xml version="1.0"?>
      <REQUEST>
      \t<LOGIN authenticationkey="***REMOVED***"/>
      \t<QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation"
      \t\t\tobjecttype="TrainAnnouncement">
      \t\t<FILTER>
      \t\t\t<AND>
      \t\t\t\t<EQ name="LocationSignature" value="${from}"/>
      \t\t\t\t<EQ name="Advertised" value="true"/>
      \t\t\t\t<EQ name="ActivityType" value="Avgang"/>
      t\t\t\t<OR>
      \t\t\t\t\t<AND>
      \t\t\t\t\t\t<GT name="AdvertisedTimeAtLocation" value="$DateAdd(-00:15:00)"/>
      \t\t\t\t\t\t<LT name="AdvertisedTimeAtLocation" value="$DateAdd(01:00:00)"/>
      \t\t\t\t\t</AND>
      \t\t\t\t\t<GT name="EstimatedTimeAtLocation" value="$DateAdd(-00:10:00)"/>
      \t\t\t\t</OR>
      \t\t\t</AND>
      \t\t</FILTER>
      \t</QUERY>
      </REQUEST>`;
    return requests.postXml(TRAINS_API_ROOT, queryXml)
      .then(trainResponse);
  },
  getFromTo: (from, to) => {
    const queryXml = `<?xml version="1.0"?>
      <REQUEST>
      \t<LOGIN authenticationkey="***REMOVED***"/>
      \t<QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation"
      \t\t\tobjecttype="TrainAnnouncement">
      \t\t<FILTER>
      \t\t\t<AND>
      \t\t\t\t<EQ name="LocationSignature" value="${from}"/>
      \t\t\t\t<EQ name="Advertised" value="true"/>
      \t\t\t\t<EQ name="ActivityType" value="Avgang"/>
      \t\t\t\t<OR>
      \t\t\t\t\t<AND>
      \t\t\t\t\t\t<GT name="AdvertisedTimeAtLocation" value="$DateAdd(-00:15:00)"/>
      \t\t\t\t\t\t<LT name="AdvertisedTimeAtLocation" value="$DateAdd(01:00:00)"/>
      \t\t\t\t\t</AND>
      \t\t\t\t\t<GT name="EstimatedTimeAtLocation" value="$DateAdd(-00:10:00)"/>
      \t\t\t\t</OR>
      \t\t\t\t<OR>
      \t\t\t\t\t<EQ name="ToLocation.LocationName" value="${to}"/>
      \t\t\t\t\t<EQ name="ViaToLocation.LocationName" value="${to}"/>
      \t\t\t\t</OR>
      \t\t\t</AND>
      \t\t</FILTER>
      \t</QUERY>
      </REQUEST>`;
    return requests.postXml(TRAINS_API_ROOT, queryXml)
      .then(trainResponse);
  }
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