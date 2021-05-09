import '../../css/home.css';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Home = props => {
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem('login'))
  );
  /*
  const [userExpress, setUserExpress] = useState({
    id : ''
  });
  */
  const [login, setLogin] = useState({
    id : '',
    password : ''
  });
  
  let history = useHistory();

  useEffect(() => {
    console.log('login:', login);
    console.log('user:', user);
  }, [user]);
  /*
  useEffect(() => {
    console.log('login:', login);
    console.log('userExpress:', userExpress);
  }, [userExpress]);
  */

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 로그인
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const loginSubmit = (event) => {
    if(event){
      event.preventDefault();
    }
    const req = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(login)
    };
    fetch('http://localhost:3001/user/login', req)
      .then(res => res.json())
      .then(result => console.log(result))
      .then(result => result !== null ? setSession() : alert('회원정보를 찾을 수 없어요. 다시 입력해주세요.'))
      // .then(data => data !== null ? setSessionExpress(data) : alert('회원정보를 찾을 수 없어요. 다시 입력해주세요.'))
      .catch(err => {
        console.error(err);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 로그인 성공하면 세션 저장 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const setSession = () => {
    window.localStorage.setItem('login', JSON.stringify(login));
    alert('[React] 성공적으로 로그인 되었어요. :-)');
    history.replace('/api/post');
  };
 /*
  const setSessionExpress = (data) => {
    console.log('Express 세션:', data.id);
    setUserExpress({ id : data.id });
    alert('[Express] 성공적으로 로그인 되었어요. :-)');
    history.replace('/api/post');
  }
  */

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 로그아웃 시 세션 삭제 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const logoutSubmit = (event) => {
    if(event){
      event.preventDefault();
    }
    alert('성공적으로 로그아웃 되었어요. :-)');
    window.localStorage.removeItem('login',  JSON.stringify(user));
    setUser(null);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // input Enter 컨트롤
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onKeyDown = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      if(login.id === '' || login.password === ''){
        alert('로그인 정보를 올바르게 입력해주세요.');
      }else{
        loginSubmit();
      }
    }
  };

  return (
    <div>
      <h2 align="center">Main</h2>
        { user !== null ?
          <div className="home-wrapper">
            <form onSubmit={logoutSubmit}>
              <div className="home-row">
                <h3 align="center">{user.id}님, 안녕하세요. :-)</h3>
              </div>
              <Link to="/api/post"><button className="home-btn">List</button></Link>
              <button className="home-btn">Logout</button>
            </form>
          </div>
          :
          <div className="home-wrapper">
            <form onSubmit={loginSubmit}>
              <div className="home-row">
                <label>ID</label>
                <div>
                  <input className="home-input" type="text" name="id" onChange={handleChange} onKeyPress={onKeyDown} required />
                </div>
              </div>
              <div className="home-row">
                <label>Password</label>
                <div>
                  <input className="home-input" type="password" name="password" onChange={handleChange} onKeyPress={onKeyDown} required />
                </div>
              </div>
              <Link to="/api/post"><button className="home-btn">List</button></Link>
              <button className="home-btn">Login</button>
            </form>
            <p>회원이 아니신가요? <Link to="/api/login/join">Join</Link></p>
          </div>
        }
    </div>
  )
}

export default Home;