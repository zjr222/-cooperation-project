import axios from 'axios';
export default  {
    getInProgressHot() {
        return axios.get('/home/hoting').then(res => {
            return res.data;
        })
    },
    getMoviesPage() {
        return axios.get('/home/hot').then(res => {
            return res.data;
        })
    },
    getPopularFilmReviews() {
        return axios.get('/home/popularFilmReviews').then(res => {
            return res.data;
        })
    },
    getSortMovies() {
        return axios.get('/sort/newest').then(res => {
            return res.data;
        })
    },
    getClasseMovie() {
        return axios.get('/classe').then(res => {
            return res.data;
        })
    }
}