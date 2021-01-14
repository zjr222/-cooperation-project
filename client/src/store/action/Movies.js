export const actionTypes = {
    MOVIESNAME : Symbol("movies-name"),//电影名
    ALLCOMMENTS : Symbol("all-comments"),//某部电影的所有短评
}

export const getMoviesPage = (data) => ({
    type: actionTypes.MOVIESNAME,
    payload: data
})
export const getPopularFilmReviews = (data) => ({
    type: actionTypes.ALLCOMMENTS,
    payload: data
})
