import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
export default function ShowForum() {
  const history = useHistory();
  const { id } = useParams();

  const [forum, setForum] = useState(null);
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    getForum();
    getThreads();
  }, []);

  const getForum = async () => {
    const response = await axios.get('http://localhost:5000/api/forum/' + id);
    setForum(response.data.result[0].title);
    console.log('this is from getForum ', response.data);
    // console.log(response.data.result);
  };

  const getThreads = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/thread/forum/' + id
    );
    console.log('from getThreads', response.data.result);
    setThreads(response.data.result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {forum && <h1>{forum}</h1>}

      <ul>
        {threads &&
          threads.map((thread, index) => (
            <li key={index}>
              <button onClick={() => history.push(`/thread/${thread.id}`)}>
                <h5>{thread.title}</h5>
              </button>
              {thread.createdAt}
            </li>
          ))}
      </ul>
      <button onClick={() => history.push('/thread/create/' + id)}>
        Create Thread
      </button>
    </div>
  );
}
