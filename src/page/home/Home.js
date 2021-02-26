import '../../css/home.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <div>
      <h2 align="center">Main</h2>
      <div className="home-wrapper">
        <form>
          <div className="home-row">
            <label>ID</label>
            <div>
              <input className="home-input" type="text" name="" required />
            </div>
          </div>
          <div className="home-row">
            <label>Password</label>
            <div>
              <input className="home-input" type="password" name="" required />
            </div>
          </div>
          <Link to="/api/post"><button className="home-btn">List</button></Link>
          <button className="home-btn">Login</button>
        </form>
        <p>회원이 아니신가요? <Link to="/api/login/join">Join</Link></p>
      </div>
    </div>
  )
}

export default Home;