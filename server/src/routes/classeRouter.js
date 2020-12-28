const {Router} = require('express');
const spider = require('../utils/spider');

const router = Router();

router.get('/', async (req, res) => {
  const result = await spider.getClasseMovie(req.query);
  res.send(result);
});

module.exports = router;