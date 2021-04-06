// import {Router} from 'express';
// const myRouter = Router();
const router = require('express').Router();

// Add a route on path / and GET method.
// myRouter.get
router.get('/', (req, res) => {
    // Call template engine rendering.
    res.render('index.html.twig');
});

module.exports = router;
