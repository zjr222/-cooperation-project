const { Router } = require('express');
const { getMovieDetail, getLikeByMovie, getActorsInMovie, getCommentInMovie, getAllCommentsInMovie, getMovieAllActorMsg } = require('../utils/spider');
const router = Router();

// 获取电影详情
router.get('/detail', async (req, res) => {
  const result = await getMovieDetail(req.query.id);
  res.send(result);
});

// 获取电影详情页的，喜欢其他电影
router.get('/detail/other', async (req, res) => {
  const result = await getLikeByMovie(req.query.id);
  res.send(result);
});

// 获取电影详情页的部分演员
router.get('/detail/lessactors', async (req, res) => {
  const result = await getActorsInMovie(req.query.id);
  res.send(result);
});

// 获取电影详情页的少量评论
router.get('/detail/lesscomments', async (req, res) => {
  const result = await getCommentInMovie(req.query.id);
  res.send(result);
});

// 获取某个电影的全部评论
router.get('/comments', async (req, res) => {
  const result = await getAllCommentsInMovie(req.query);
  res.send(result);
});

// 获取某个电影的所有演员
router.get('/actors', async (req, res) => {
  const result = await getMovieAllActorMsg(req.query.id);
  res.send(result);
});

module.exports = router;

