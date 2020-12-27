import React from 'react'
import { Route } from "react-router-dom"
import Index from '../components/Index'
import RankList from '../components/RankList'
import Sort from '../components/Sort'
// import NotFound from '../components/NotFound'

export default function Default() {
    return (
        <div>
            <Route path="/" exact component={Index} />
            <Route path="/rankList" exact component={RankList}/>
            <Route path="/sort" exact component={Sort} />
            {/* <Route path="" component={NotFound} /> */}
        </div>
    );
}