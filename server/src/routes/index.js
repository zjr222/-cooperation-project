const {Router, urlencoded} = require('express');
const homeRouter = require('./homeRouter');
const sortRouter = require('./sortRouter');
const classeRouter = require('./classeRouter');
const router = Router();


// 解析x-www-form-urlencoded
router.use(urlencoded({
  extended: true,
}));

// 主页内容
router.use('/home', homeRouter);

// 排行榜
router.use('/sort', sortRouter);

// 分类
router.use('/classe', classeRouter);

module.exports = router;