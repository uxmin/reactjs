import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../css/login.css';

const LoginJoin = props => {
  const [user, setUser] = useState({
    id: "",
    password: "",
    chk_password: "",
    username: "",
    phone: "",
    email: "",
    address: ""
  });

  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.password !== user.chk_password){
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }else if(user.password.length<8 || user.chk_password.length<8){
      alert('8자리 이상의 비밀번호를 입력해주세요.');
    }else if(user.password === user.chk_password){
      const req = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(user)
      };
      console.log(req);
      fetch('http://localhost:3001/user/join', req)
        .then(history.replace('/'));
    }
  };
  
  return (
    <div>
      <h2>Join</h2>
      <div className="login-join-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="login-join-row">
            <label>ID</label>
            <div>
              <input className="login-join-input" type="text" name="id" onChange={handleChange} required />
            </div>
          </div>
          <div className="login-join-row">
            <label>Password</label>
            <div>
              <input className="login-join-input" type="password" name="password" onChange={handleChange} required />
            </div>
          </div>
          <div className="login-join-row">
            <label>Password Again</label>
            <div>
              <input className="login-join-input" type="password" name="chk_password" onChange={handleChange} required />
            </div>
          </div>
          <div className="login-join-row">
            <label>Name</label>
            <div>
              <input className="login-join-input" type="text" name="username" onChange={handleChange} required />
            </div>
          </div>
          <div className="login-join-row">
            <label>Phone</label>
            <div>
              <input className="login-join-input" type="text" name="phone" onChange={handleChange} required />
            </div>
          </div>
          <div className="login-join-row">
            <label>E-mail</label>
            <div>
              <input className="login-join-input" type="text" name="email" onChange={handleChange} />
            </div>
          </div>
          <div className="login-join-row">
            <label>Address</label>
            <div>
              <input className="login-join-input" type="text" name="address" onChange={handleChange} />
            </div>
          </div>
          <button className="login-btn" type="submit">Join</button>
          <p>로그인 화면으로 돌아갈까요? <Link to="/">Main</Link></p>
        </form>
      </div>
    </div>
  )
}

export default LoginJoin;