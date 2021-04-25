import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../css/Post.css';

const PostView = props => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState(
    () => JSON.parse(window.localStorage.getItem('login'))
  );
  const {_id} = props.match.params;
  const chgDate = moment(post.date).format('YYYY-MM-DD');

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
      // 세션정보와 아이디 일치하는지 여부
      if(user.id === post.username){
        const res = await fetch(`http://localhost:3001/post/delete/${_id}`);
        try {
          if(res !== null){
            alert('게시글이 성공적으로 삭제되었습니다.');
            return props.history.replace('/api/post');
          }
        }catch(err) {
          console.error(err);
        }
      }else{
        alert('삭제를 할 권한이 없어요. 해당 아이디로 로그인 후 삭제해주세요.');
        return;
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
                <span>{post.username} | {chgDate}</span>
              </label>
              <div>
                <button className="post-small-btn" onClick={() => props.history.goBack()}>list</button>
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