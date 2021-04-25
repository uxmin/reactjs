import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/Post.css';

const PostWrite = props => {
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem('login'))
  );
  const [post, setPost] = useState({
    username: "",
    subject: "",
    content: ""
  });

  let history = useHistory();

  useEffect(() => {
    // console.log(user);
    if(user !== null){
      post.username = user.id;
    }
  });

  const handleSubmit = (event) => {
    if(event){
      event.preventDefault();
    }
    const req = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(post)
    };
    fetch('http://localhost:3001/post/write', req)
      .then(history.replace('/api/post'));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
    console.log(post);
  };

  const checkAddition = async() => {
    const msg = window.confirm('게시글을 작성하시겠어요?');
    if(msg === true){
      alert('게시글이 성공적으로 작성되었습니다.');
      handleSubmit();
    }else if(msg === false){
      return;
    }
  }
  const backToTheList = () => {
    const msg = window.confirm('게시글을 작성하지 않고 돌아가시겠어요?');
    if(msg === true){
      history.goBack();
    }else if(msg === false){
      return;
    }
  }

  return (
    <div>
      <h2>Write</h2>
      <div className="post-write-wrapper">
        <form onSubmit={handleSubmit}>
          { user !== null? 
            <div className="post-write-row">
              <label>Name</label>
              <div>
                <input className="post-write-input" type="text" name="username" onChange={handleChange} value={user.id} readOnly />
              </div>
            </div>
            :
            <div className="post-write-row">
              <label>Name</label>
              <div>
                <input className="post-write-input" type="text" name="username" onChange={handleChange} required />
              </div>
            </div>
          }
          <div className="post-write-row">
            <label>Subject</label>
            <div>
              <input className="post-write-input" type="text" name="subject" onChange={handleChange} required />
            </div>
          </div>
          <div className="post-write-row">
            <label>Content</label>
            <div>
              <textarea className="post-write-textarea" name="content" onChange={handleChange} required />
            </div>
          </div>
          <button className="post-small-btn" type="button" onClick={checkAddition}>Add</button>
          <button className="post-small-btn" type="button" onClick={backToTheList}>List</button>
        </form>
      </div>
    </div>
  )
}

export default PostWrite;