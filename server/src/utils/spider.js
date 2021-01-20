const axios = require("axios");
const cheerio = require("cheerio");

function getNum(str) {
  const reg = /\d+/;
  return str.match(reg)[0];
}

function removeSpace(str) {
  return str.replace(/\s(?=\s)/g, '').trim();
}


//使用cheerio来得到获取选择器的方法
async function getSelector(pagePath) {
  const result = await axios.get(pagePath);
  const $ = cheerio.load(result.data)
  return $;
}


/** 
 *  抓取最受欢迎的影评
 */
async function getPopularFilmReviews() {
  const $ = await getSelector("https://movie.douban.com/");
  const titleIndexCon = $('#reviews .reviews-hd>h2').text().slice(0, 7); //抓取标题(最受欢迎的影评)
  const reviewsCon = $('#reviews .reviews-bd .review'); //影评电影片数
  let reviewMovs = []; //获得影评电影
  for (let i = 0; i < reviewsCon.length; i++) {
    const reviewMov = $(reviewsCon[i]);
    const id = reviewMov.find('.review-hd a').attr('href').replace(/[^0-9]/ig,"") //获取影片简介地址
    const question = reviewMov.find('.review-bd h3').text(); //获取电影标题问题
    const moiveNames = reviewMov.find('.review-meta a').text().match(/《[\s\S]+/);//电影名
    const rate = reviewMov.find('.review-meta span').attr('class').slice(7, 9)/5;//评分
    const reg = /[\s\S]+(?=\n)/;
    const img = reviewMov.find('.review-hd a img').attr('src');
    const contents = reviewMov.find('.review-content').text().trim("").match(reg)[0]; //评论内容
    const peopleComment = reviewMov.find('.review-meta a').first().text(); //评论人
    // console.log(id,rate,peopleComment,img)
    reviewMovs.push({
      id,
      question,
      moiveNames,
      rate,
      contents,
      peopleComment,
      img
    })

  }
  return {
    titleIndexCon,
    reviewMovs
  }
}

/*
*
* 获取正在热映模块
*/
async function getInProgressHot() {
  const $ = await getSelector("https://movie.douban.com/");
  const title = $("#screening .screening-hd>h2").text().slice(0, 4); // 标题(正在热映)
  const movieCons = $("#screening .screening-bd .ui-slide-content li ul"); //正在热映电影列表
  let everyMovies = [];
  for (let i = 0; i < movieCons.length; i++) {
    const everyMovieCon = movieCons[i]; //每部电影的属性
    const data = everyMovieCon.parent.attribs; //每部影片的简介内容(都在标签的data-xxxx属性上获取内容)
    everyMovies.push({
      movieName: data['data-title'], //电影名
      year: data['data-release'], //电影日期
      rate: data['data-rate'], //电影评分
      star: data['data-star'], //电影星级
      id: data['data-trailer'].match(/\d+(?=\/)/), //电影拖车
      duration: data['data-duration'], //电影时长
      region: data['data-region'], //电影地区
      director: data['data-director'], //导演
      actors: data['data-actors'], //演员
      rater: data['data-rater'], //评分员数量
      img: $(everyMovieCon).find('.poster img').attr('src').replace(/\.jpg$/, '.webp'),// 封面
    })
  }
  return {
    title,
    everyMovies
  }
}
/**
 *  获取电影简述 (将鼠标放在首页电影的图片上的弹框)
 */

// async function getMovieSketch(){

// }


/**
 * 抓取热门电影数据
 */
async function getMoviesPage({
  limit = 50,
  type = 'movie',
  tag = '热门',
  start = 0
} = {}) {
  tag = encodeURI(tag);
  return await axios.get(`https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=${limit}&page_start=${start}`).then(res => res.data);
}


/**
 * 得到最新的排行榜
 */
async function getSortMovies() {
  const $ = await getSelector('https://movie.douban.com/chart');
  const newsMovieSort = [];
  const lis = $('#content .article table');
  for (let i = 0; i < lis.length; i++) {
    const $li = $(lis[i])
    const doubanUrl = $li.find('.item a.nbg').attr('href');
    const id = getNum(doubanUrl);// 得到id

    let title = $li.find('.item div.pl2 a');
    title = removeSpace(title.text()); // 去除多余空格

    let cover = $li.find('.item img').attr('src'); // 得到封面图地址
    cover.replace(/\.(?=jpg)/, 'webp');

    const description = $li.find('.item div.pl2 p.pl').text().trim(); // 电影简略描述 

    const rate = $li.find('.item div.pl2 .star .rating_nums').text(); // 电影评分

    let rater = $li.find('.item div.pl2 .star span.pl').text(); // 评论人数量
    rater = getNum(rater);

    newsMovieSort.push({
      id,
      title,
      description,
      rate,
      rater,
      cover
    });
  }
  return newsMovieSort;
}

/**
 * 
 * @param {Object} 存在以下属性
 * sort  U近期热门  T标记最多  S评分最高 R最新上映
 * start 表示获取到多少个
 * range 评分范围
 * tags 电影特色
 * genres 电影类型
 * countries 电影地区
 * year_range 电影上映范围
 */
async function getClasseMovie({
  sort = "U",
  start = 0,
  range = '0,10',
  tags = '',
  genres = '',
  countries = '',
  year_range = '',
} = {}) {
  tags = encodeURI('电影,' + tags);
  genres = encodeURI(genres);
  countries = encodeURI(countries);
  return await axios.get(`https://movie.douban.com/j/new_search_subjects?sort=${sort}&range=${range}&tags=${tags}&start=${start}&genres=${genres}&countries=${countries}&year_range=${year_range}`).then(res => res.data);
}

// 电影参与人所有图片信息
async function getMovieAllActorMsg(id) {
  const actors = [];
  const $ = await getSelector(`https://movie.douban.com/subject/${id}/celebrities`);

  // 导演信息
  const $directorEle = $('#content  #celebrities>.list-wrapper:nth-of-type(1) .celebrity');
  const directorImg = $directorEle.find('a .avatar').attr('style').match(/http([\d\D]+)(?=\))/)[0]; // 封面
  const directorRole = $directorEle.find('.info .role').text(); // 职责
  const directorName = $directorEle.find('.info .name a').attr('title'); // 名称
  const directorWorksEle = $directorEle.find('.info .works a'); // 代表作
  const directorId = $directorEle.find('>a').attr('href').match(/\d+(?=\/)/)[0];
  const directorWorks = [];
  for (let i = 0; i < directorWorksEle.length; i++) {
    const value = $(directorWorksEle[i]).text();
    directorWorks.push(value);
  }

  // 演员信息
  const $actorsEle = $('#content #celebrities>.list-wrapper:nth-of-type(2) ul .celebrity');
  for (let i = 0; i < $actorsEle.length; i++) {
    const $ele = $($actorsEle[i]);
    const actorImg = $ele.find('a .avatar').attr('style').match(/http([\d\D]+)(?=\))/)[0]; // 封面
    const actorRole = $ele.find('.info .role').text();
    const actorName = $ele.find('.info .name a').attr('title');
    const actorWorksEles = $ele.find('.info .works a');
    const actorId = $ele.find('>a').attr('href').match(/\d+(?=\/)/)[0];
    const actorWorks = [];
    for (let i = 0; i < actorWorksEles.length; i++) {
      const value = $(actorWorksEles[i]).text();
      actorWorks.push(value);
    }
    actors.push({
      id: actorId,
      name: actorName,
      role: actorRole,
      img: actorImg,
      works: actorWorks,
    });
  }

  // 编剧信息
  const $authorEle = $('#content #celebrities>.list-wrapper:nth-of-type(3) ul .celebrity');
  const authorImg = $authorEle.find('a .avatar').attr('style').match(/http([\d\D]+)(?=\))/)[0]; // 封面
  const authorRole = $authorEle.find('.info .role').attr('title'); // 职责
  const authorName = $authorEle.find('.info .name a').attr('title'); // 名称
  const authorId = $authorEle.find('>a').attr('href').match(/\d+(?=\/)/)[0];
  const authorWorksEle = $authorEle.find('.info .works a'); // 代表作
  const authorWorks = [];
  for (let i = 0; i < authorWorksEle.length; i++) {
    const value = $(authorWorksEle[i]).text();
    authorWorks.push(value);
  }
  // 制片人信息
  const $producerEle = $('#content #celebrities>.list-wrapper:nth-of-type(4) ul .celebrity');
  const producerImg = $producerEle.find('a .avatar').attr('style').match(/http([\d\D]+)(?=\))/)[0]; //封面
  const producerRole = $producerEle.find('.info .role').attr('title'); //职责
  const producerName = $producerEle.find('.info .name a').attr('title'); // 名称
  const producerId = $producerEle.find('>a').attr('href').match(/\d+(?=\/)/)[0];
  const producerWorksEle = $producerEle.find('.info .works a'); // 代表作
  const producerWorks =[];
  for (let i = 0; i < producerWorksEle.length; i++) {
    const value = $(producerWorksEle[i]).text();
    producerWorks.push(value);
  }
  return {
    producer:{
      id:producerId,
      name:producerName,
      role:producerRole,
      img:producerImg,
      works:producerWorks
    },
    screenWriter: {
      id: authorId,
      name: authorName,
      role: authorRole,
      img: authorImg,
      works: authorWorks,
    },
    director: {
      id: directorId,
      name: directorName,
      works: directorWorks,
      role: directorRole,
      img: directorImg
    },
    actors,
  }
}

// 电影详情描述
async function getMovieDetail(id) {
  const $ = await getSelector(`https://movie.douban.com/subject/${id}`);
  const imgUrl = $('#content #mainpic a img').attr('src');
  const title = $('#content h1').text().trim().replace(/\s(?=\s)/g, ''); // 电影名称
  const director = $('#content .article .subject #info span:nth-of-type(1)>.attrs').text(); // 导演
  const author = $('#content .article .subject #info span:nth-of-type(2)>.attrs').text(); // 编剧
  const actors = $('#content .article .subject #info span:nth-of-type(3)>.attrs').text(); // 演员
  const type = $('#content .article .subject #info span:nth-of-type(5)').text()// 类型
  const aliasNode = $('#content .article .subject #info span:nth-of-type(6)')[0].nextSibling;
  const country = $(aliasNode).text().trim(); // 出品国家
  const languageNode = $('#content .article .subject #info span:nth-of-type(7)')[0].nextSibling;
  const language = $(languageNode).text().trim(); // 语言
  const introduction = $('.related-info .indent span').text().trim() //电影简介
  const showDate = $('#content .article .subject #info span:nth-of-type(9)').text(); // 上映日期
  const time = $('#content .article .subject #info span:nth-of-type(11)').text().match(/\d+/)[0]; // 时长
  const englishNameNode = $('#content .article .subject #info span:nth-of-type(12)')[0].nextSibling //英文名
  const englishName = $(englishNameNode).text().trim();
  return {
    id,
    title,
    director,
    author,
    actors,
    type,
    country,
    language,
    showDate,
    time,
    imgUrl,
    introduction,
    englishName
  }
}

// 演员详情信息
async function getActorDetail(id) {
  const $ = await getSelector(`https://movie.douban.com/celebrity/${id}`);
  const $wrapper = $('#content #headline .info');
  const title = $('#content>h1').text();
  const img = $('#content #headline .pic img').attr('src'); // 封面
  // 性别
  const sexPreEle = $wrapper.find('>ul>li:nth-of-type(1) span')[0].nextSibling;
  const sex = $(sexPreEle).text().replace(/:|\s/g, '');
  // 星座
  const startPreEle = $wrapper.find('>ul>li:nth-of-type(2) span')[0].nextSibling;
  const constellation = $(startPreEle).text().replace(/:|\s/g, '');
  // 出生日期
  const datePreEle = $wrapper.find('>ul>li:nth-of-type(3) span')[0].nextSibling;
  const date = $(datePreEle).text().replace(/:|\s/g, '');
  // 出生地
  const birthPlacePreEle = $wrapper.find('>ul>li:nth-of-type(4) span')[0].nextSibling;
  const birthPlace = $(birthPlacePreEle).text().replace(/:/g, '').trim();
  // 职业
  const workInPlacePreEle = $wrapper.find('>ul>li:nth-of-type(5) span')[0].nextSibling;
  const workInPlace = $(workInPlacePreEle).text().replace(/:/g, '').trim();
  // 更多外文名
  const otherNamePreEle = $wrapper.find('>ul>li:nth-of-type(6) span')[0].nextSibling;
  const moreEnglishName= $(otherNamePreEle).text().replace(/:/g, '').trim();
  // 更多中文名
  const moreChineseNameEle = $wrapper.find('>ul>li:nth-of-type(7) span')[0].nextSibling;
  const moreChineseName = $(moreChineseNameEle).text().replace(/:/g, '').trim();
  // 家庭成员
  const familyEle = $wrapper.find('>ul>li:nth-of-type(7) span')[0].nextSibling;
  const family = $(familyEle).text().replace(/:/g, '').trim();
  // 影人简介
  const description = $('#content #intro .all').text();
  // 获奖情况

  console.log(moreChineseName,family)
  const winning = [];
  const $winningEle = $('#content .article .mod .award');
  for (let i = 0; i < $winningEle.length; i++) {
    const $ele = $($winningEle[i]);
    winning.push($ele.text().trim().split(/\n+/).map(item => item.trim()).filter(it => !!it));
  }
  // 最受欢迎作品
  const welecome = [];
  const $welEles = $('#content #best_movies .bd .list-s li');
  for (let i = 0; i < $welEles.length; i++) {
    const $ele = $($welEles[i]);
    const img = $ele.find('>.pic img').attr('src');
    const title = $ele.find('.info a').text();
    const rate = $ele.find('.info em').text();
    const date = $ele.find('.info div').text();
    welecome.push({
      img,
      title,
      rate,
      date,
    });
  }
  return {
    title,
    img,
    sex,
    constellation,
    date,
    birthPlace,
    workInPlace,
    moreEnglishName,
    moreChineseName,
    family,
    description,
    winning,
    welecome,
  }
}

// 获取当前电影页部分参与演员
async function getActorsInMovie(id) {
  const $ = await getSelector(`https://movie.douban.com/subject/${id}`);
  const actors = [];
  const $lis = $('#content #celebrities .celebrity');
  for (let i = 0; i < $lis.length; i++) {
    const $ele = $($lis[i]);
    const actorId = $ele.find('>a').attr('href').match(/\d+(?=\/)/)[0];
    const img = $ele.find('>a div').attr('style').match(/http([\d\D]+)(?=\))/)[0]; // 封面
    const name = $ele.find('.info .name a').text().trim(); // 姓名
    const role = $ele.find('.info .role').text(); // 职责
    actors.push({
      id: actorId,
      img,
      name,
      role,
    });
  }
  return actors;
}


// 获取当前电影的部分评论
async function getCommentInMovie(id) {
  const $ = await getSelector(`https://movie.douban.com/subject/${id}`);
  const comments = [];
  const $commentsEle = $('#content #comments-section #hot-comments .comment-item');
  const allComment = $('#hot-comments>a').text().trim().replace(/[^0-9]/ig,"") //短评总条数
  // console.log(allComment);
  for (let i = 0; i < $commentsEle.length; i++) {
    const $ele = $($commentsEle[i]);
    const name = $ele.find('.comment h3 .comment-info>a').text(); // 评论者姓名
    const date = $ele.find('.comment h3 .comment-info .comment-time').text().trim(); // 评论时间
    const $roteEle = $ele.find('.comment .comment-info span.rating'); // 评分
    const rate = $roteEle.attr('class') ? $roteEle.attr('class').match(/\d{1}/)[0] * 2 : 10;
    const content = $ele.find('.comment .comment-content span').text(); // 评论简略内容
    const useful = $ele.find('.comment h3 .comment-vote span.vote-count').text(); // 点赞数
    comments.push({
      name,
      date,
      rate,
      allComment,
      content,
      useful,
    });
  }
  comments.push(allComment);
  return comments;
}

// 获取某个电影的全部评论
// sort 'new_score' 表示热门 'time'表示最新
// limit 获取多少个
// status P看过的， F表示想看的评论
// percent_type 默认全部 'h' 好评 'm'一般 'l'差评 
async function getAllCommentsInMovie({
  id,
  start,
  sort = 'new_score',
  limit = 20,
  status = 'P',
  percent_type= '',
} = {}) {
  const $ = await getSelector(`https://movie.douban.com/subject/${id}/comments?percent_type=${percent_type}&start=${start}&limit=${limit}&status=${status}&sort=${sort}`)
  const comments = [];
  const $lis = $('#content #comments .comment-item');
  for (let i = 0; i < $lis.length; i++) {
    const $ele = $($lis[i]);
    const img = $ele.find('.avatar a img').attr('src'); // 头像地址
    const name = $ele.find('.comment .comment-info>a').text(); // 用户名
    const $rateEle = $ele.find('.comment .comment-info span.rating'); // 评分
    const rate = $rateEle.attr('class') ? $rateEle.attr('class').match(/\d{1}/)[0] * 2 : 10;
    const useful = $ele.find('.comment .comment-vote .vote-count').text(); // 点赞数
    const content = $ele.find('.comment .comment-content span.short').text(); // 内容
    const date = $ele.find('.comment .comment-info span.comment-time').text().trim(); // 评论时间
    comments.push({
      img,
      name,
      rate,
      useful,
      content,
      date,
    });
  }
  return comments;
}

// 喜欢某部电影的还喜欢看
async function getLikeByMovie(id) {
  const $ = await getSelector(`https://movie.douban.com/subject/${id}/`);
  const movies = [];
  const $lis = $('#content #recommendations div.recommendations-bd dl');
  for (let i = 0; i < $lis.length; i++) {
    const $ele = $($lis[i]);
    const movieId = $ele.find('>dt a').attr('href').match(/\d+/)[0]; // 电影id
    const img = $ele.find('>dt a img').attr('src'); // 封面
    const title = $ele.find('>dd a').text(); // 电影名称
    movies.push({
      id: movieId,
      img,
      title,
    });
  }
  return movies;
}
// 获取某个演员所有的作品
async function getActorAllMovie(id, sortby = 'vote', format = 'pic', start = 0) {
  const $ = await getSelector(`https://movie.douban.com/celebrity/${id}/movies?start=${start}&sortby=${sortby}&format=${format}`);
  const moives = [];
  const $lis = $('#content .article .grid_view>ul>li');
  for (let i = 0; i < $lis.length; i++) {
    const $ele = $($lis[i]).find('>dl');
    // 封面
    const img = $ele.find('>dt img').attr('src');
    // 标题
    const title = $ele.find('>dd>h6 a').text();
    // 电影id
    const movieId = $ele.find('>dd>h6 a').attr('href').match(/\d+(?=\/)/)[0];
    // 上映年份
    const date = $ele.find('>dd>h6 span:nth-of-type(1)').text().match(/\d+/)[0];
    // 该明星的职位
    const work = $ele.find('>dd>h6 span:nth-of-type(2)').text().replace(/[\s\[\]\/]/g, '')
    // 作者
    const author = $ele.find('>dd dl dd:nth-of-type(1)').text();
    // 主演
    const toStar = $ele.find('>dd dl dd:nth-of-type(2)').text();
    // 评分
    const rate = $ele.find('>dd .star span:nth-of-type(2)').text();
    // 评价人数
    const commentNum = $ele.find('>dd .star span:nth-of-type(3)').text().match(/\d+/)[0];
    moives.push({
      id: movieId,
      img,
      title,
      date,
      work,
      author,
      toStar,
      rate,
      commentNum,
    });
  }
  return moives;
}

// 搜索
async function getSearchResult(keyword) {
  keyword = encodeURI(keyword);
  const $ = await getSelector(`https://search.douban.com/movie/subject_search?search_text=${keyword}&cat=1002`);
   console.log($('#wrapper').text());
  const movies = [];
  const $lis = $('#wrapper #root .item-root');
  console.log($lis.length);
  for (let i = 0; i < $lis.length; i++) {
    const $ele = $($lis[i]);
    const id = $ele.find('>a img').attr('src').match(/\d+(?=\/)/)[0];
    console.log(id);
  }
  return moves;
}

module.exports = {
  getPopularFilmReviews,
  getInProgressHot,
  getMoviesPage,
  getSortMovies,
  getClasseMovie,
  getMovieDetail,
  getMovieAllActorMsg,
  getActorDetail,
  getActorAllMovie,
  getActorsInMovie,
  getCommentInMovie,
  getAllCommentsInMovie,
  getLikeByMovie,
  getSearchResult,
}