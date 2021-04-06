const {create} = require('axios');

if (undefined === process.env.RIOT_API_KEY) {
    throw new Error('Missing RIOT_API_KEY environment variable.');
}

/**
 * Base class (like abstract class in others languages) to extend in dedicated class to communicate with Riot's API.
 * @see https://developer.riotgames.com/docs/portal
 */
class BaseRiotClient {
    constructor() {
        // Create an Axios HTTP client pre-config to query on Riot's API.
        this._axios = create({
            // Set base url for EUW1 server (Europe server) by default. Override possible via RIOT_API_BASE_URL env variable.
            baseURL: process.env.RIOT_API_BASE_URL || 'https://euw1.api.riotgames.com/',
            headers: {
                // Add in headers the Riot's API key. It will be insert in all requests sent by this client.
                'X-Riot-Token': process.env.RIOT_API_KEY,
            },
        });
    }
}

module.exports = BaseRiotClient;
