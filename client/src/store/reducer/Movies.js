import {actionTypes} from "../action/Movies"

const initialState = null;

export default function movies (state = initialState, {  //eslint-disable-next-line:false
    type,
    payload
}) {
    switch (type) {
        case actionTypes.MOVIESNAME:
            return payload;
        case actionTypes.ALLCOMMENTS:
            return payload
        default:
            return state
    }
}