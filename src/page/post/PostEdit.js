import React, { useEffect, useState } from 'react';
import './Post.css';

const PostEdit = ({history, location, match}) => {
  const [post, setPost] = useState({});
  const {_id} = match.params;

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async() => {
    const res = await fetch(`http://localhost:3001/post/view/${_id}`);
    const data = await res.json();
    try{
      setPost(data[0]);
    }catch(err){
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  }
  const handleSubmit = (e) => {
    if(e){
      e.preventDefault();
    }
    const req = {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(post)
    };
    console.log(req);
    fetch('http://localhost:3001/post/edit', req)
      .then(alert('Edit Success'))
      .then(history.replace('/'));
  }

  return (
    <div>
      <h2 align="center">Modify</h2>
      <form className="post-write-form" onSubmit={handleSubmit}>
      {
        post ? (
          <div>
            <div className="post-write-row">
              <label>ID</label>
              <label>{post._id}</label>
            </div>
            <div className="post-write-row">
              <label>Date</label>
              <label>{post.date}</label>
            </div>
            <div className="post-write-row">
              <label>Name</label>
              <label>{post.username}</label>
            </div>
            <div className="post-write-row">
              <label>Subject</label>
              <label>
                <input className="post-write-input" type="text" name="subject" defaultValue={post.subject} onChange={handleChange}/>
              </label>
            </div>
            <div className="post-write-row">
              <label>Content</label>
              <label>
                <textarea className="post-write-textarea" name="content" defaultValue={post.content} onChange={handleChange} />
              </label>
            </div>
            <button className="post-view-btn" type="submit">Edit Post</button>
          </div>
        ) : '해당 게시물을 찾을 수 없습니다.'
      }
      </form>
      <button className="post-btn" onClick={() => history.replace('/')}>Back to the List</button>
    </div>
  )
};

export default PostEdit;