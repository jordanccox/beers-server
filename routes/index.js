const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hello from world!');
});

module.exports = router;