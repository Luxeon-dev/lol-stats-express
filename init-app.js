/*
 * The purpose of this file is to initialize the app API.
 */

// Require all tools needed for the app initialization.
const express = require('express');
const {TwingLoaderFilesystem, TwingEnvironment, TwingFunction} = require('twing');
const path = require('path');
const {connect} = require('./db/mongoose');
const manifest = require('./public/build/manifest.json');

// Creat app.
const app = express();
// Retrieve port for the app from environment variables or use 3000 by default.
const appPort = process.env.APP_PORT || 3000;

// Set views as template directory for twing.
const viewPath = path.resolve('./views');
const loader = new TwingLoaderFilesystem(viewPath);
const twing = new TwingEnvironment(loader);

// Reimplement asset function from Symfony.
twing.addFunction(new TwingFunction('asset', (name) => {
    if (manifest.hasOwnProperty(name)) {
        return Promise.resolve(manifest[name]);
    }

    return Promise.resolve(name);
}, [{name: 'name'}]));

// Register an express template engine for file with .twig extension, forward rendering to twing.
app.engine('twig', (file, options, callback) => {
    twing.render(file.replace(viewPath + path.sep, ''), options)
        .then((output) => {
            callback(null, output);
        })
        .catch((e) => {
            callback(e);
        })
    ;
});

// Start HTTP server listing on give port.
connect().then(() => {
    app.listen(appPort, () => {
        console.log(`Server started on http://localhost:${appPort}`);
    });
});

// Export the app variable to use it outside of this file.
module.exports = app;
