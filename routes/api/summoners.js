const router = require('express').Router();
const {Summoner} = require('../../db/mongoose');
const {RiotSummonerClient} = require('../../riot');

router
    .route('/summoners')
    .get((req, res, next) => {
        // Use find method from Summoner model to find all Summoners entities. (no pagination).
        Summoner.find()
            .then((data) => {
                // If query successful, send the complete collection via the response in json.
                res.json(data);
            })
            .catch((e) => {
                // Use next function (from .get method argument) to forward the exception to the next middleware of express.
                next(e);
            })
        ;
    })
    .post((req, res, next) => {
        // The goal of this method is to add a new Summoner (to track stats) if not exist yet in our DB.
        // If exist, do nothing except serve the existing data.
        // If not exist, we query the Riot's API to check if the Summoner really exist, then save the result in our DB.

        // Get name attribute from request's body.
        const nameToFind = req.body.name || undefined;

        // Check if the sent name is empty or not.
        if (undefined === nameToFind || 0 === nameToFind.trim().length) {
            next(new Error('name to find cannot by empty.'));
            return;
        }

        // findOne search for one item only, based on filters given in argument.
        Summoner.findOne({
            name: nameToFind,
        }).then((data) => {
            if (null === data) {
                // Query Riot's API.
                RiotSummonerClient.byName(nameToFind)
                    .then((response) => {
                        // If exist in Riot DB, create a new Summoner object in our app with data from Riot.
                        const summoner = new Summoner(response.data);

                        // Try to save the data in our DB.
                        summoner.save()
                            .then((data) => {
                                // If successfully saved, send 201 Created HTTP status code.
                                // @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#201
                                res.status(201);
                                // Send data from our DB in the Response.
                                res.json(data);
                            }).catch((e) => {
                                // If any error occurred during DB persisting, forward exception to the next middleware.
                                next(e);
                            });
                    }).catch((e) => {
                        // If no Summoner found in Riot's API, send 404 Not Found HTTP status code.
                        // @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404
                        res.status(404);
                        // Send an error object with info.
                        res.json({
                            error: `Cannot find summoner named ${nameToFind} from Riot's API.`,
                        });
                    });
            } else {
                // If already exist in our DB, just send the data. (default 200 Ok HTTP status code)
                // @see https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200
                res.json(data);
            }
        });
    })
;

module.exports = router;
