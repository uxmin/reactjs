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
    const msg = window.confirm('Are you sure you want to delete?');
    if(msg == true){
      const res = await fetch(`http://localhost:3001/post/delete/${_id}`);
      try {
        if(res != null){
          alert('It has ben deleted successfully.');
          return history.replace('/');
        }
      }catch(err) {
        console.error(err);
      }
    }else if(msg == false){
      console.log('Canceled.');
      return;
    }
  }
  
  return (
    <div>
      <h2 align="center">Detail</h2>
      <div className="post-view-wrapper">
      {
        post ? (
          <div>
            <div className="post-view-title">
              <label>
                {post.subject}&nbsp;&nbsp;
                <span>{post.username} | {post.date}</span>
              </label>
              <div>
                <button className="post-small-btn" onClick={() => history.goBack()}>list</button>
                <Link to={`/post/edit/${post._id}`}>
                <button className="post-small-btn">Edit</button>
                </Link>
                <button className="post-small-btn" onClick={deletePost}>Delete</button>
              </div>
            </div>
            <hr className="line"></hr>
            <div className="post-view-content">
              <label><pre>{post.content}</pre></label>
            </div>
          </div>
        ) : '해당 게시글을 찾을 수 없습니다.'
      }
      </div>
    </div>
  )
};

export default PostView;