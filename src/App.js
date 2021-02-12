import './css/App.css';
import React from 'react';

import PostMain from './page/post/PostMain';
import PostView from './page/post/PostView';
import PostWrite from './page/post/PostWrite';
import PostEdit from './page/post/PostEdit';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={PostMain} />
        <Route exact path='/post/view/:_id' component={PostView} />
        <Route exact path='/post/write' component={PostWrite} />
        <Route exact path='/post/edit/:_id' component={PostEdit} />
      </BrowserRouter>
    </div>
  )
}

export default App;
