const BaseRiotClient = require('./base-riot-client');
const {AxiosResponse} = require('axios');

/**
 * A typedef documentation to describe object return by Riot's API => autocompletion in our code.
 * @typedef {Object} RiotSummoner
 * @property {string} id
 * @property {string} puuid
 * @property {string} accountId
 * @property {string} name
 * @property {number} summonerLevel
 * @property {number} profileIconId
 * @property {number} revisionDate
 *
 * @see https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
 * @see https://jsdoc.app/tags-typedef.html
 */

/**
 * Class to communicate with the Summoner group API of Riot.
 * @see https://developer.riotgames.com/apis#summoner-v4
 */
class RiotSummonerClient extends BaseRiotClient {
    /**
     * Call the by-name action on Riot's API and return a Promise with the searched Summoner if exist.
     * @param {string} name
     * @return {Promise<AxiosResponse<RiotSummoner>>}
     *
     * @see https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
     */
    byName(name) {
        return this._axios.get(`/lol/summoner/v4/summoners/by-name/${name}`);
    }
}

// Return instance of the Client.
module.exports = new RiotSummonerClient();
