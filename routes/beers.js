const express = require('express');
const router = express.Router();
const fs = require("fs");

router.use((req, res, next) => {
  const data = fs.readFileSync("./data.json", "utf-8");
  const beers = JSON.parse(data).beers;

  req.beers = beers;

  next();
});

router.param('beer', function(req, res, next, id) { // The param middleware function gets invoked any time a route comes in that is utilizing the :beer parameter.   
  req.beer = req.beers.find((beer) => beer.id == id);

  if (!req.beer) {
    res.status(404).json({ statusCode: res.statusCode, statusMessage: "No beer found" });
  }
  next();
});

router.get('/', (req, res) => {
  res.json({ statusCode: res.statusCode, data: req.beers });
});

router.post('/', (req, res) => {
  if (!req.body) {
    res.status(400).json({ statusCode: res.statusCode, statusMessage: "No review"});
  }

  // Else post review to corresponding beer
});

router.get('/:beer', (req, res) => {
  res.json({ statusCode: res.statusCode, data: req.beer });
});

router.get('/:beer/reviews', (req, res) => {
  res.json({ statusCode: res.statusCode, data: req.beer.reviews });
});

router.get('/:beer/reviews/:review', (req, res) => {
  if (req.beer.reviews.length > Number(req.params.review)) {
    res.json({ statusCode: res.statusCode, data: req.beer.reviews[req.params.review] });
  } else {
    res.status(404).json({ statusCode: res.statusCode, statusMessage: "Review not found"});
  }
});

module.exports = router;