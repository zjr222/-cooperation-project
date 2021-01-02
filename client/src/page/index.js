import React from 'react'
<<<<<<< HEAD
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom"
import Index from '../components/Index'
import RankList from '../components/RankList'
import Sort from '../components/Sort'
import store from '../store'
import { Provider } from "react-redux";
=======
import { Switch, Route } from "react-router-dom"
import Index from '../components/Index'
import RankList from '../components/RankList'
import Sort from '../components/Sort'
>>>>>>> lyl
import NotFound from '../components/NotFound'

export default function Default() {
    return (
<<<<<<< HEAD
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/rankList"  component={RankList}/>
                    <Route path="/sort"  component={Sort} />
                    <Route  component={NotFound} />
                </Switch>
           </Router>
        </Provider>
=======
        <div>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/rankList" exact component={RankList} />
                <Route path="/sort" exact component={Sort} />
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
>>>>>>> lyl
    );
}