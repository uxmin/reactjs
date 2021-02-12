import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CommonTable from '../../component/table/CommonTable';
import CommonTableRow from '../../component/table/CommonTableRow';
import CommonTableColumn from '../../component/table/CommonTableColumn';

import './Post.css';

const PostList = props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async() => {
    const res = await fetch('http://localhost:3001/post');
    const data = await res.json();
    setPosts(data);
  };

  return (
    <div>
    <h2 align="center">List</h2>
    <CommonTable headersName={['Id', 'Subject', 'Name', 'Date']}>
      {
        posts ? posts.map((u, index) => (
          <CommonTableRow key={index}>
            <CommonTableColumn>{u._id}</CommonTableColumn>
            <CommonTableColumn>
            <Link to={`/post/view/${u._id}`}>{u.subject}</Link>
            </CommonTableColumn>
            <CommonTableColumn>{u.username}</CommonTableColumn>
            <CommonTableColumn>{u.date}</CommonTableColumn>
          </CommonTableRow>
        )) : "포스트가 존재하지 않습니다. 포스트를 작성해보세요."
      }
    </CommonTable>
    <Link to='/post/write'><button className="post-btn">Go to Add Post</button></Link>
    </div>
  )
}

export default PostList;