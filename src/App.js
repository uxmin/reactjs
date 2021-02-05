import './css/App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import SignUp from './routes/signup';
import PostMain from './page/post/PostMain';
import PostView from './page/post/PostView';
import { BrowserRouter, Route } from 'react-router-dom';

// class App extends React.Component {
//   render(){
//     return (
//       <div className="App">
//         <Router>
//           <Link to='/signup'>Sign Up</Link>
//           <Route path='/signup' component={SignUp}/>
//         </Router>
//         <PostMain />
//       </div>
//     );
//   }
// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/postView/:id' component={PostView} />
        <Route exact path='/' component={PostMain} />
      </BrowserRouter>
      {/* <PostMain /> */}
    </div>
  )
}

export default App;
