import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';

const PostView = ({history, location, match}) => {
  const [post, setPost] = useState({});
  const {_id} = match.params;
  const ht = useHistory();

  // 수정요망
  useLayoutEffect(() => {
    loadPost();
  }, []);

  const loadPost = async() => {
    const res = await fetch(`http://localhost:3001/post/view/${_id}`);
    const post = await res.json();
    setPost(post);
    console.log('@@@@@@@@@@@@', post);
  }
  const deletePost = async() =>{
    const res = await fetch(`http://localhost:3001/post/delete/${_id}`);
    try {
      if(res != null){
        alert('Delete Success');
        return ht.replace('/');
      }
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2 align="center">게시글 상세정보</h2>
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
              <button className="post-btn" onClick={deletePost}>Delete</button>
            </div>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </div>
      <button className="post-btn" onClick={() => ht.goBack()}>Back</button>
    </div>
  )
}

export default PostView;