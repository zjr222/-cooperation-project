import axios from 'axios';
const apis =  {
    //正在热映
    getInProgressHot() {
        return axios.get('/home/hoting').then(res => {
            return res.data;
        })
    },
    //热门电影
    getMoviesPage() {
        return axios.get('/home/hot').then(res => {
            return res.data;
        })
    },
    //最受欢迎影评
    getPopularFilmReviews() {
        return axios.get('/home/popularFilmReviews').then(res => {
            return res.data;
        })
    },
    //排行榜
    getSortMovies() {
        return axios.get('/sort/newest').then(res => {
            return res.data;
        })
    },
    //分类
    getClasseMovie(condition) {
        return axios.get('/classe', {
            params: {
                ...condition,
            },
        }).then(res => {
            return res.data;
        });
    },
    //电影详情描述
    getMovieDetail(id) {
        return axios.get(`/movie/detail`,{params:{id}}).then(res => {
            return res.data;
        })
    },
    //当前电影页部分参与演员
    getActorsInMovie(id){
        return axios.get(`/movie/detail/lessactors`,{params:{id}}).then(res=>{
            return res.data;
        })
    },
    //演员的详情
    getActorDetail(id) {
        return axios.get('/actor/detail',{params:{id}}).then(res => {
            return res.data;
        })
    },
    //
    getMovieAllActorMsg(id){
        return axios.get('/movie/actors',{params:{id}}).then(res => {
            return res.data;
        })
    },
    //某个演员的所有作品
    getActorAllMovie({id, sortby = 'vote', format = 'pic', start = 0} = {}){
        return axios.get('/actor/product',{params:{id, sortby, format, start}}).then(res => {
            return res.data;
        })
    },
    //当前电影的部分评论
    getCommentInMovie(id){
        return axios.get('/movie/detail/lesscomments',{params:{id}}).then(res => {
            return res.data;
        })
    },
    //某个电影的全部评论
    getAllCommentsInMovie({
        id,
        start = 20,
        sort = 'new_score',
        limit = 20,
        status = 'P',
        percent_type= '',
      } = {}){
        return axios.get('/movie/comments',{params:{id,start,sort,limit,status,percent_type}}).then(res => {
            return res.data;
        })
    },
    //喜欢某部电影的还喜欢看
    getLikeByMovie(id){
        return axios.get('/movie/detail/other',{params:{id}}).then(res => {
            return res.data;
        })
    },
}

export default apis;
