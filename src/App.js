import './css/App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomeMain from './page/home/HomeMain';
import PostView from './page/post/PostView';
import PostWrite from './page/post/PostWrite';
import PostEdit from './page/post/PostEdit';
import PostList from './page/post/PostList';
import LoginJoin from './page/login/LoginJoin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={HomeMain} />
        <Route exact path="/api/post" component={PostList} />
        <Route exact path='/api/post/view/:_id' component={PostView} />
        <Route exact path='/api/post/write' component={PostWrite} />
        <Route exact path='/api/post/edit/:_id' component={PostEdit} />
        <Route exact path="/api/login/join" component={LoginJoin} />
      </BrowserRouter>
    </div>
  )
}

export default App;
