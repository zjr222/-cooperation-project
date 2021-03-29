import { createStore } from 'redux'
import { actionTypes } from "./action/Movies"
import reducer from './reducer'

const store = createStore(reducer);
// console.log(store.dispatch({ type: actionTypesMOVIESNAME }))
export default store;