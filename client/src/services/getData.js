import axios from 'axios';
const apis =  {
    //正在热映
    async getInProgressHot() {
        const res = await axios.get('/home/hoting');
        return res.data;
    },
    //热门电影
    async getMoviesPage() {
        const res = await axios.get('/home/hot');
        return res.data;
    },
    //最受欢迎影评
    async getPopularFilmReviews() {
        const res = await axios.get('/home/popularFilmReviews');
        return res.data;
    },
    //排行榜
    async getSortMovies() {
        const res = await axios.get('/sort/newest');
        return res.data;
    },
    //分类
    async getClasseMovie(condition) {
        const res = await axios.get('/classe', {
            params: {
                ...condition,
            },
        });
        return res.data;
    },
    //电影详情描述
    async getMovieDetail(id) {
        const res = await axios.get(`/movie/detail`, { params: { id } });
        return res.data;
    },
    //当前电影页部分参与演员
    async getActorsInMovie(id){
        const res = await axios.get(`/movie/detail/lessactors`, { params: { id } });
        return res.data;
    },
    //演员的详情
    async getActorDetail(id) {
        const res = await axios.get('/actor/detail', { params: { id } });
        return res.data;
    },
    //
    async getMovieAllActorMsg(id){
        const res = await axios.get('/movie/actors', { params: { id } });
        return res.data;
    },
    //某个演员的所有作品
    async getActorAllMovie({id, sortby = 'vote', format = 'pic', start = 0} = {}){
        const res = await axios.get('/actor/product', { params: { id, sortby, format, start } });
        return res.data;
    },
    //当前电影的部分评论
    async getCommentInMovie(id){
        const res = await axios.get('/movie/detail/lesscomments', { params: { id } });
        return res.data;
    },
    //某个电影的全部评论
    async getAllCommentsInMovie({
        id,
        start = 20,
        sort = 'new_score',
        limit = 20,
        status = 'P',
        percent_type= '',
      } = {}){
        const res = await axios.get('/movie/comments', { params: { id, start, sort, limit, status, percent_type } });
        return res.data;
    },
    //喜欢某部电影的还喜欢看
    async getLikeByMovie(id){
        const res = await axios.get('/movie/detail/other', { params: { id } });
        return res.data;
    },
}

export default apis;
