import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Post.css';

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
    const msg = window.confirm('게시글을 삭제하시겠어요?');
    if(msg === true){
      const res = await fetch(`http://localhost:3001/post/delete/${_id}`);
      try {
        if(res !== null){
          alert('게시글이 성공적으로 삭제되었습니다.');
          return history.replace('/api/post');
        }
      }catch(err) {
        console.error(err);
      }
    }else if(msg === false){
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
                <Link to={`/api/post/edit/${post._id}`}>
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