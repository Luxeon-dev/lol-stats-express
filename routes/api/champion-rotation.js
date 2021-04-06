const router = require('express').Router();
const {ChampionRotation} = require('../../db/mongoose');
const {RiotChampionRotationClient} = require('../../riot');

router
    .route('/champion-rotation')
    .get((req, res, next) => {
        // Find the ChampionRotation data if exists, else null
        ChampionRotation.findOne({})
            .then((data) => {
                if (data === null) {
                    res.status(404);
                    res.json({
                        error: "Cannot find champion rotation. Be sure to make a POST request first to create the ressource from Riot's API",
                    });
                }
                else {
                    res.status(200);
                    res.json(data);
                }
            })
            .catch((e) => {
                next(e);
            })
        ;
    })
    .post((req, res, next) => {
        
        // Get data from Riot
        RiotChampionRotationClient.getData()
        .then((response) => {
            // Retrieve ChampionRotation object and update if exist or create the document it doesn't
            ChampionRotation.findOneAndUpdate(
                {}, 
                response.data, 
                { 
                    upsert: true,
                    new: true,
                    rawResult: true,
                }
            )
            .then((data) => {
                // If it already exist, return HTTP code 200, else if created, return 201
                if (data.lastErrorObject.updatedExisting) {
                    res.status(200);
                }
                else {
                    res.status(201);
                }
                
                res.json(data.value);
            });
        })
        .catch((e) => {
            res.status(500);
            
            res.json({
                error: "Cannot retrieve champion rotation from Riot's API.",
            });
        });

        

        // findOne search for one item only, based on filters given in argument.
        /*Summoner.findOne({
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
        }); */
    })
;

module.exports = router;