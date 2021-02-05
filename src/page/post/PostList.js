import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CommonTable from '../../component/table/CommonTable';
import CommonTableRow from '../../component/table/CommonTableRow';
import CommonTableColumn from '../../component/table/CommonTableColumn';

const PostList = props => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
       loadData();
    }, []);

    const loadData = async() => {
        const res = await fetch('http://localhost:3001/user');
        const data = await res.json();
        setUsers(data);
        console.log(data);
    }

    return (
        <div>
            <CommonTable headersName={['Id', 'Subject', 'Name']}>
                {
                    users.map((u, index) => (
                        <CommonTableRow key={index}>
                            <CommonTableColumn>{u.id}</CommonTableColumn>
                            <CommonTableColumn>
                                <Link to={`/postView/${u.id}`}>{u.subject}</Link>
                            </CommonTableColumn>
                            <CommonTableColumn>{u.username}</CommonTableColumn>
                        </CommonTableRow>
                    ))
                }
            </CommonTable>
        </div>
    )
}

export default PostList;