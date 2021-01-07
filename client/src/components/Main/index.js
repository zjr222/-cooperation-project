import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../Index';
import RankList from '../RankList';

export default function Main() {
   return <div>
      <Switch>
         <Route path="/" exact component={Index} />
         <Route path="/ranklist" exact component={RankList} />
      </Switch>
   </div>;
}