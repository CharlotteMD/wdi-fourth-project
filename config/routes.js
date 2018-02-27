const router = require('express').Router();

// routes go here

router.all('/*', (req, res) => res.notFound());

module.exports = router;
