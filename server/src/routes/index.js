const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send('<h1>这里是Movie Club</h1>')
});

module.exports = router;