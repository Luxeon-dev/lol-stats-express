const BaseRiotClient = require('./base-riot-client');

class RiotChampionRotationClient extends BaseRiotClient {
    getData() {
        return this._axios.get('/lol/platform/v3/champion-rotations');
    }
}

module.exports = new RiotChampionRotationClient();
