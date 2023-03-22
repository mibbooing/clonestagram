import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Join from './Join/Join';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import Profile from './Profile/Profile';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
      {false && <Detail />}
    </Router>
  );
}

export default App;
