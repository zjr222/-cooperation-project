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
async function popularFilmReviews() {
  const $ = await getSelector("https://movie.douban.com/");
  const titleIndexCon = $('#reviews .reviews-hd>h2').text().slice(0, 7); //抓取标题(最受欢迎的影评)
  const reviewsCon = $('#reviews .reviews-bd .review'); //影评电影片数
  let reviewMovs = []; //获得影评电影
  for (let i = 0; i < reviewsCon.length; i++) {
      const reviewMov = $(reviewsCon[i]);
      const hrefs = reviewMov.find('.review-hd a').attr('href') //获取影片简介地址
      const titles = reviewMov.find('.review-bd h3').text(); //获取电影标题
      const moiveNames = reviewMov.find('.review-meta a').text().match(/《[\s\S]+/);
      const stars = reviewMov.find('.review-meta span').attr('class').slice(7,9);
      const reg = /[\s\S]+(?=\n)/; 
      const contents = reviewMov.find('.review-content').text().trim("").match(reg)[0];
      reviewMovs.push({
          hrefs,
          titles,
          moiveNames,
          stars,
          contents
      })

  }
  return {
      titleIndexCon,
      reviewMovs
  }
}

// 获取正在热映模块
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
      })
  }
  return {
      title,
      everyMovies
  }
}

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
  return await axios.get(`https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=${limit}&page_start=${start}`).then(res =>res.data);
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

    const description = $li.find('.item div.pl2 p.pl').text().trim(); // 电影简略描述 

    const rate = $li.find('.item div.pl2 .star .rating_nums').text(); // 电影评分

    let rater = $li.find('.item div.pl2 .star span.pl').text(); // 评论人数量
    rater = getNum(rater);

    newsMovieSort.push({
      id,
      title,
      description,
      rate,
      rater
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
  return await axios.get(`https://movie.douban.com/j/new_search_subjects?sort=${sort}&range=${range}&tags=${tags}&start=${start}&genres=${genres}&countries=${countries}&year_range=${year_range}`).then(res =>res.data);
}


module.exports = {
  popularFilmReviews,
  getInProgressHot,
  getMoviesPage,
  getSortMovies,
  getClasseMovie,
}