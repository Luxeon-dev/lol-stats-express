const {Schema, model} = require('mongoose');

const schema = new Schema({
    accountId: {
        type: String,
        required: true,
        unique: true,
        maxlength: 56,
    },
    profileIconId: {
        type: Number,
    },
    revisionDate: {
        type: Date,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true,
        maxlength: 63,
    },
    puuid: {
        type: String,
        required: true,
        unique: true,
        maxlength: 78,
        minlength: 78,
    },
    summonerLevel: {
        type: Number,
        min: 1,
    },
    // @see https://mongoosejs.com/docs/schematypes.html#arrays
    // arrayOfNumber: {
    //     type: [Number],
    // },
});

module.exports = model('Summoner', schema);
