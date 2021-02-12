import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const PostView = ({history, location, match}) => {
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
  }
  const deletePost = async() => {
    const res = await fetch(`http://localhost:3001/post/delete/${_id}`);
    try {
      if(res != null){
        alert('Delete Success');
        return history.replace('/');
      }
    }catch(err) {
      console.error(err);
    }
  }
  
  return (
    <div>
      <h2 align="center">Detail</h2>
      <div className="post-view-wrapper">
      {
        post ? (
          <div>
            <div className="post-view-row">
              <label>Id</label>
              <label>{post._id}</label>
            </div>
            <div className="post-view-row">
              <label>Name</label>
              <label>{post.username}</label>
            </div>
            <div className="post-view-row">
              <label>Date</label>
              <label>{post.date}</label>
            </div>
            <div className="post-view-row">
              <label>Subject</label>
              <label>{post.subject}</label>
            </div>
            <div className="post-view-row">
              <label>Content</label>
              <label>{post.content}</label>
            </div>
            <button className="post-view-btn" onClick={deletePost}>Delete</button>  
            <Link to={`/post/edit/${post._id}`}>
              <button className="post-view-btn">Edit</button>
            </Link>
          </div>
        ) : '해당 게시글을 찾을 수 없습니다.'
      }
      </div>
      <button className="post-btn" onClick={() => history.goBack()}>Back to the List</button>
    </div>
  )
};

export default PostView;