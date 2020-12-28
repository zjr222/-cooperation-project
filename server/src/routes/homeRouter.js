const { Router } = require('express');
const spider = require('../utils/spider');
const router = Router();

// 正在热映
router.get('/hoting', async (req, res) => {
  const result = await spider.getInProgressHot();
  res.send(result);
});
// 热门电影
router.get('/hot', async (req, res) => {
  const result = await spider.getInProgressHot(req.query);
  res.send(result);
});

// 最受欢迎的影评
router.get('/popularFilmReviews', async (req, res) => {
  const result = await spider.popularFilmReviews();
  res.send(result);
});

module.exports = router;