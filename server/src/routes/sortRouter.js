const {Router} = require('express');
const spider = require('../utils/spider');
const router = Router();

router.get('/newest', async (req, res) => {
  const result = await spider.getSortMovies();
  res.send(result);
});

module.exports = router;