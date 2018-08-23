import superAgentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superAgentPromise(_superagent, global.Promise);

const TRAINS_API_ROOT = 'http://api.trafikinfo.trafikverket.se/v1.3/data.json';
const JOKE_API_ROOT = 'https://geek-jokes.sameerkumar.website/api';

const responseBody = res => res.body;
const tokenPlugin = 'method to create a token...'

const requests = {
  get: url => superagent.get(url).then(responseBody),
  put: (url, body) => superagent.put(url, body).use(tokenPlugin).then(responseBody),

  post: (url, req) => superagent.post(TRAINS_API_ROOT)
    .set('Content-Type', 'application/json')
    .serialize['application/xml'] = function (obj) {
      debugger
      return '<?xml version="1.0"?>\n' +
        '<REQUEST>\n' +
        '\t<LOGIN authenticationkey="***REMOVED***"/>\n' +
        '\t<QUERY runtime="true" lastmodified="true" orderby="AdvertisedTimeAtLocation" \t\t\tobjecttype="TrainAnnouncement">\n' +
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
        '</REQUEST>\n';
    }.then(responseBody)
};

const Trains = {
  all: () => requests.post(TRAINS_API_ROOT, {}),
  station: station => requests.post(TRAINS_API_ROOT, { station: station })
}
const Jokes = {
  geek: () => requests.get(JOKE_API_ROOT)
};

export default {
  Trains,
  Jokes
};