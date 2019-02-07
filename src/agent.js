import superAgentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { stationName } from './utils';
import authKey from './auth';

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

/**
 * Parse TrainAnnouncements to train info
 * @param res
 * @returns {id: string, name: string, to: string, time: *, realTime: *, estTime: *}[]}
 */
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

/**
 * Parse TrainAnnouncements to train info
 * @param res
 * @returns {id: string, name: string, to: string, time: *, realTime: *, estTime: *}[]}
 */
const filterTrainResponse = (res, toFilter) => {
  return res.body.RESPONSE.RESULT[0].TrainAnnouncement.map(t => {
    const to = t.ToLocation && t.ToLocation[0];
    const toStation = to && to.LocationName;
    if (toFilter.includes(toStation)) {
      return {
        id: t.ActivityId,
        name: t.ProductInformation[0],
        to: stationName(toStation),
        time: t.AdvertisedTimeAtLocation,
        realTime: t.TimeAtLocation,
        estTime: t.EstimatedTimeAtLocation
      }
    } else {
      console.log(`Filter out ${toStation}`)
    }
  }).filter(x => x !== undefined);
};

/**
 * Parse TrainMessages to message info, filter out ...
 * TrafficImpact.FromLocation == from
 * TrafficImpact.ToLocation == to
 * @param res
 * @returns {id: string, name: string, to: string, time: *, realTime: *, estTime: *}[]}
 */
const messageResponse = res => {
  return res.body.RESPONSE.RESULT[0].TrainMessage.map(t => {
    // const to = t.ToLocation && t.ToLocation[0];
    // const toStation = stationName(to && to.LocationName);
    return {
      id: t.EventId,
      desc: t.ExternalDescription,
      header: t.Header,
      text: t.ReasonCodeText,
      startTime: t.StartDateTime,
      endTime: t.EndDateTime,
      lastUpdated: t.LastUpdateDateTime,
      modified: t.ModifiedTime,
      affectedStations: t.AffectedLocation,
      trafficImpact: t.TrafficImpact
    }
  });
};

//TODO remove robustify, handle errors
const queryFromXml = (from) => `<?xml version="1.0"?>
<REQUEST>
  <LOGIN authenticationkey="${authKey}"/>
  <QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation"
      objecttype="TrainAnnouncement">
    <FILTER>
      <AND>
        <EQ name="LocationSignature" value="${from}"/>
        <EQ name="Advertised" value="true"/>
        <EQ name="ActivityType" value="Avgang"/>
        <OR>
          <AND>
            <GT name="AdvertisedTimeAtLocation" value="$DateAdd(-00:15:00)"/>
            <LT name="AdvertisedTimeAtLocation" value="$DateAdd(01:00:00)"/>
          </AND>
          <GT name="EstimatedTimeAtLocation" value="$DateAdd(-00:10:00)"/>
        </OR>
      </AND>
    </FILTER>
  </QUERY>
</REQUEST>`;
const queryFromToXml = (from, to) => `<?xml version="1.0"?>
<REQUEST>
  <LOGIN authenticationkey="${authKey}"/>
  <QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation"
      objecttype="TrainAnnouncement">
    <FILTER>
      <AND>
        <OR>
          <EQ name="LocationSignature" value="${from}"/>
          <EQ name="ViaToLocation.LocationName" value="${from}"/>
        </OR>
        <EQ name="Advertised" value="true"/>
        <EQ name="ActivityType" value="Avgang"/>
        <OR>
          <AND>
            <GT name="AdvertisedTimeAtLocation" value="$DateAdd(-00:15:00)"/>
            <LT name="AdvertisedTimeAtLocation" value="$DateAdd(01:00:00)"/>
          </AND>
          <GT name="EstimatedTimeAtLocation" value="$DateAdd(-00:10:00)"/>
        </OR>
        <OR>
          <EQ name="ToLocation.LocationName" value="${to}"/>
          <EQ name="ViaToLocation.LocationName" value="${to}"/>
        </OR>
      </AND>
    </FILTER>
</QUERY>
</REQUEST>`;

const Trains = {
  getFrom: (from = 'G') => {
    return requests.postXml(TRAINS_API_ROOT, queryFromXml(from))
      .then(trainResponse);
  },
  getFromTo: (from, to) => {
    return requests.postXml(TRAINS_API_ROOT, queryFromToXml(from, to))
      .then(trainResponse);
  },
  getFiltered: (from, toList) => {
    return requests.postXml(TRAINS_API_ROOT, queryFromXml(from))
    .then(response => filterTrainResponse(response, toList))
  },
  getStationMsg: (from, to) => {
    // require both to and from to be in the AffectedLocation list
    // TODO at least on of the stations must be affected, filter on TrafficImpact from and to (must get end stations for from,to)
    const stations = [from, to];
    const stationsFilter = stations.map(s => {
      return `<EQ name="AffectedLocation" value="${s}"/>`;
    }).join('');
    const queryXml = `<?xml version="1.0"?>
      <REQUEST>
        <LOGIN authenticationkey="${authKey}"/>
        <QUERY runtime="true" lastmodified="true" orderby="LastUpdateDateTime"
          objecttype="TrainMessage">
          <FILTER>
            <AND>
              <GT name="StartDateTime" value="$DateAdd(-00:15:00)"/>
              <LT name="EndDateTime" value="$DateAdd(01:00:00)"/>
              <AND>
                ${stationsFilter}
              </AND>
            </AND>
          </FILTER>
        </QUERY>
      </REQUEST>`;
    return requests.postXml(TRAINS_API_ROOT, queryXml)
      .then(messageResponse);
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
    .catch(error => {
      return `nojoke - ${error}`;
    })
};

export default {
  Trains,
  Jokes
};