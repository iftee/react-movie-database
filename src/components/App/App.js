import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import BrowseByActor from '../BrowseByActor/BrowseByActor';
import BrowseByDirector from '../BrowseByDirector/BrowseByDirector';
import BrowseByWriter from '../BrowseByWriter/BrowseByWriter';
import BrowseByGenre from '../BrowseByGenre/BrowseByGenre';
import BrowseByYear from '../BrowseByYear/BrowseByYear';
import NotFound from '../elements/NotFound/NotFound';
import AppFooter from '../elements/AppFooter/AppFooter';
import './App.scss';

const App = () => {
  return(    
    <Router basename="/react-movie-database/">    
    {/* <Router> */}
    {/* basename="/react-movie-database/" for deploying to my github pages, empty when deploying to server root */}
      <Header />
        <Switch>
          {/* Routes */}          
          <Route path="/movie/:movieId" component={Movie} exact />
          <Route path="/actor/:actorId" component={BrowseByActor} exact />
          <Route path="/director/:directorId" component={BrowseByDirector} exact />
          <Route path="/writer/:writerId" component={BrowseByWriter} exact />
          <Route path="/genre/:genreId" component={BrowseByGenre} exact />
          <Route path="/year/:yearId" component={BrowseByYear} exact />
          <Route path="/" component={Home} exact />{/* smallest path goes last, see Route Matchers section from https://reacttraining.com/react-router/web/guides/primary-components */}
          <Route component={NotFound} />
        </Switch>
      <AppFooter />
    </Router>
  );
}

export default App;