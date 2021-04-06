const {Schema, model} = require('mongoose');

const schema = new Schema({
    freeChampionIds: {
        type: [Number],
        required: true,
    },
    freeChampionIdsForNewPlayers: {
        type: [Number],
        required: true,
    },
    maxNewPlayerLevel: {
        type: Number,
        required: true,
        min: 1,
    },
});

module.exports = model('ChampionRotation', schema);