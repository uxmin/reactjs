import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CommonTable from '../../component/table/CommonTable';
import CommonTableRow from '../../component/table/CommonTableRow';
import CommonTableColumn from '../../component/table/CommonTableColumn';

import '../../css/Post.css';

const PostList = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async() => {
    const res = await fetch('http://localhost:3001/post');
    const data = await res.json();
    setPosts(data);
    console.log(posts);
  };

  return (
    <div>
    <h2 align="center">List</h2>
    <div className="post-list-wrapper">
      <CommonTable headersName={['Subject', 'Name']}>
        {
          posts ? posts.map((u, index) => (
            <CommonTableRow key={index}>
              <CommonTableColumn>
              <Link to={`/api/post/view/${u._id}`}>{u.subject}</Link>
              </CommonTableColumn>
              <CommonTableColumn>{u.username}</CommonTableColumn>
            </CommonTableRow>
          )) : "포스트가 존재하지 않습니다. 포스트를 작성해보세요."
        }
      </CommonTable>
    <Link to='/api/post/write'><button className="post-small-btn">write</button></Link>
    <p>로그인 화면으로 돌아갈까요? <Link to="/">Main</Link></p>
    </div>
    </div>
  )
}

export default PostList;