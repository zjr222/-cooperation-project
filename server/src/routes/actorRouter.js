const { Router } = require('express');
const { getActorDetail, getActorAllMovie } = require('../utils/spider');
const router = Router();

// 获取演员的详情
router.get('/detail', async (req, res) => {
  const result = await getActorDetail(req.query.id);
  res.send(result);
});

// 获取某个演员的所有作品
router.get('/product', async (req, res) => {
  const result = await getActorAllMovie(req.query.id, req.query.sortby, req.query.format, req.query.start);
  res.send(result);
});

module.exports = router;