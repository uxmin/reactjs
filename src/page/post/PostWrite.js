import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/Post.css';

const PostWrite = props => {
  const [post, setPost] = useState({
    username: "",
    subject: "",
    content: ""
  });

  let history = useHistory();

  const handleSubmit = (event) => {
    if(event){
      event.preventDefault();
    }
    const req = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(post)
    };
    console.log(req);
    fetch('http://localhost:3001/post/write', req)
      .then(history.replace('/api/post'));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
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
          <div className="post-write-row">
            <label>Name</label>
            <div>
              <input className="post-write-input" type="text" name="username" onChange={handleChange} required />
            </div>
          </div>
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