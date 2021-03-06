import React, { useEffect, useState } from 'react';
import '../../css/Post.css';

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
      .then(history.replace('/api/post'));
  }

  const backToThePost = () => {
    const msg = window.confirm('게시글을 수정하지 않고 돌아가시겠어요?');
    if(msg === true){
      history.goBack();
    }else if(msg === false){
      return;
    }
  }
  const checkEdit = () => {
    const msg = window.confirm('게시글을 수정하시겠어요?');
    if(msg === true){
      alert('게시글이 성공적으로 수정되었습니다.');
      handleSubmit();
    }else if(msg === false){
      return;
    }
  }
  return (
    <div>
      <h2 align="center">Edit</h2>
      <div className="post-view-wrapper">
        <form onSubmit={handleSubmit}>
        {
          post ? (
            <div>
              <div className="post-write-row">
                <label>Date</label>
                <div>
                  <input value={post.date} readOnly />
                </div>
              </div>
              <div className="post-write-row">
                <label>Name</label>
                <div>
                  <input value={post.username} readOnly />
                </div>
              </div>
              <div className="post-write-row">
                <label>Subject</label>
                <div>
                  <input className="post-write-input" type="text" name="subject" defaultValue={post.subject} onChange={handleChange}/>
                </div>
              </div>
              <div className="post-write-row">
                <label>Content</label>
                <div>
                  <textarea className="post-write-textarea" name="content" defaultValue={post.content} onChange={handleChange} />
                </div>
              </div>
              <button className="post-small-btn" type="button" onClick={checkEdit}>Edit</button>
              <button className="post-small-btn" type="button" onClick={backToThePost}>List</button>
            </div>
          ) : '해당 게시물을 찾을 수 없습니다.'
        }
        </form>
      </div> 
    </div>
  )
};

export default PostEdit;