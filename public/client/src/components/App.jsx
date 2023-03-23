import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Join from './Join/Join';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import Profile from './Profile/Profile';
import firebaseApp from '@config/firebaseApp';
import { __NICKNAME_SERVICE_UPDATE__ } from '@dispatchers/config';
import { useDispatch, useSelector } from 'react-redux';

const Fdatabase = firebaseApp.database();

function App() {
  const dispatch = useDispatch();
  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);
  //닉네임 실시간 호출함수
  const __getNicknames = useCallback(() => {
    const nicknameRef = Fdatabase.ref('statics/nicknames');

    nicknameRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        //데이터가 존재할때 리덕스상태로 닉네임리스트 업데이트
        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: Object.values(snapshot.val())
        });
      } else {
        dispatch({
          type: __NICKNAME_SERVICE_UPDATE__,
          payload: []
        });
      }
    });
    return nicknameRef;
  }, [dispatch]);

  //함수 활성화
  useEffect(() => {
    const nicknameRef = __getNicknames();
    return () => {
      nicknameRef.off();
    };
  }, [__getNicknames]);
  return (
    <Router>
      {isHeaderOpen && <Header />}

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
