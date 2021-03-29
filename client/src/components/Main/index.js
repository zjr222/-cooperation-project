import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../Index';
import RankList from '../RankList';
import DetailsComp from '../DetailsComp';
import MovieComment from '../MovieComment';
import AllMoviesActors from '../AllMoviesActors';
import ActorIntroduce from '../ActorIntroduce';
import Sort from '../Sort';
import NotFound from '../NotFound';

export default function Main() {
   return <div>
      <Switch>
         <Route path="/" exact component={Index} />
         <Route path="/ranklist" exact component={RankList} />
         <Route path="/details/:id" component={DetailsComp} />
         <Route path="/celebrities/:id" component={AllMoviesActors} />
         <Route path="/actorIntroduce/:id" component={ActorIntroduce} />
         <Route path={`/comment/:id/start=:num&limit=20&status=P&sort=new_score`} component={MovieComment} />
         <Route path="/sort" component={Sort} />
         <Route path="*" component={NotFound} />
      </Switch>
   </div>
}