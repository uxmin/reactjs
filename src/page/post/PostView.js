import React, { useEffect, useState } from 'react';

const PostView = ({history, location, match}) => {
    const [data, setData] = useState({});
    const {id} = match.params;

    useEffect(() => {

    }, []);
    
    const loadData = async() => {
        
    }

    return (
        <div>

        </div>
    )
}

export default PostView;