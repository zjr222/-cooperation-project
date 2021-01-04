import React from 'react'
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom"
import Index from '../components/Index'
import RankList from '../components/RankList'
import SortComp from '../components/SortComp'
import store from '../store'
import { Provider } from "react-redux";
import NotFound from '../components/NotFound'

export default function Default() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/rankList"  component={RankList}/>
                    <Route path="/sort"  component={SortComp}/>
                    <Route  component={NotFound} />
                </Switch>
           </Router>
        </Provider>
    );
}