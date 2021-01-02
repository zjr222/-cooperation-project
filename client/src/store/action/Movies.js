export const actionTypes = {
    HOTMOVIES : Symbol("hot-movies"),//热门电影
    POPULARFILMREVIEWS : Symbol("popular-film-reviews"),//最受欢迎的影评
    INPROGRESSHOT : Symbol("in-progress-hot")//正在热映
}

export const getMoviesPage = (data) => ({
    type: actionTypes.HOTMOVIES,
    payload: data
})
export const getPopularFilmReviews = (data) => ({
    type: actionTypes.POPULARFILMREVIEWS,
    payload: data
})

export const getInProgressHot = (data) => ({
    type: actionTypes.INPROGRESSHOT,
    payload: data
})