import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Character from './containers/Character';
import Characters from './containers/Characters';
import NotFoundPage from './containers/NotFoundPage';

const Index = () => (
    <Route render={({ location }) => (
        <Switch location={location}>
            <Route path="/" component={Characters} key="Characters" exact={true} />
            <Route path="/character/:id" component={Character} key="Character" exact={true} />
            <Route path="/page/:id" component={Characters} key="CharactersPage" exact={true} />
            <Route path="" component={NotFoundPage} />
        </Switch>

    )} />
);

export default Index;