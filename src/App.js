import './css/App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import SignUp from './routes/signup';

class App extends React.Component {
  state = {users: []}

  componentDidMount() {
    fetch('http://localhost:3001/user')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }

  render(){
    return (
      <div className="App">
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        {/* <Router>
          <Link to='/signup'>Sign Up</Link>
          <Route path='/signup' component={SignUp}/>
        </Router> */}
      </div>
    );
  }
}

export default App;
