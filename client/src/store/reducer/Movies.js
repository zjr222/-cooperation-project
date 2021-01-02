import {actionTypes} from "../action/Movies"

const initialState = null

export default (state = initialState, {  //eslint-disable-next-line:false
    type,
    payload
}) => {
    switch (type) {
        case actionTypes.HOTMOVIES:
            return payload;
        case actionTypes.POPULARFILMREVIEWS:
            return payload
        case actionTypes.INPROGRESSHOT:
            return payload
        default:
            return state
    }
}