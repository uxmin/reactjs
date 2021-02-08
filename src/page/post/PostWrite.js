import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';

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
      .then(alert('Add Success'))
      .then(history.replace('/'));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div>
      <h2>게시글 등록하기</h2>
      <form className="post-write-form" onSubmit={handleSubmit}>
        <div className="post-write-row">
          <label>Name</label>
          <label>
            <input className="post-write-input" type="text" name="username" onChange={handleChange} required />
          </label>
        </div>
        <div className="post-write-row">
          <label>Subject</label>
          <label>
            <input className="post-write-input" type="text" name="subject" onChange={handleChange} required />
          </label>
        </div>
        <div className="post-write-row">
          <label>Content</label>
          <label>
            <textarea className="post-write-textarea" name="content" onChange={handleChange} required />
          </label>
        </div>
        <button className="post-btn" type="submit">Add Post</button>
      </form>
      <button className="post-btn" onClick={() => history.goBack()}>Go Back</button>
    </div>
  )
}

export default PostWrite;