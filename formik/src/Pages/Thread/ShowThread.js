import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { create_UUID } from '../../Component/uuid';

import AuthContext from '../../Context/AuthContext';

export default function ShowThread() {
  const { user } = useContext(AuthContext);
  const [thread, setThread] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const { id } = useParams();
  useEffect(() => {
    getThread();
    getPosts();
  }, []);

  const getThread = async () => {
    const response = await axios.get('http://localhost:5000/api/thread/' + id);
    setThread(response.data.result[0]);
  };

  const getPosts = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/post/thread/' + id
    );
    console.log('from get post', response.data);
    setPosts(response.data.result);
  };

  const handleReply = async (event) => {
    event.preventDefault();
    console.log(isReplying);
    if (!replyContent) return;
    const data = {
      id: create_UUID(),
      userId: user,
      threadId: id,
      content: replyContent,
    };
    console.log(data);

    const response = await axios.post(
      'http://localhost:5000/api/post/create',
      data
    );
    console.log('this is from create post', response.data);
    setPosts([...posts, response.data.result]);
  };

  const history = useHistory();
  return (
    <div style={{ padding: '2rem' }}>
      {thread && <h1>{thread.title}</h1>}

      {thread && <p>{thread.content}</p>}
      {/* {thread && <h1>{thread}</h1>} */}
      <h5>comments</h5>
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <h6>{post.content}</h6> {post.createdAt}
            </li>
          ))}
      </ul>

      <button
        variant="contained"
        color="primary"
        disabled={!hasMore}
        style={{ marginRight: '1rem' }}
        onClick={getPosts}
      >
        Load More Posts
      </button>

      <button
        variant="contained"
        color="primary"
        onClick={() => setIsReplying(true)}
      >
        Reply
      </button>
      {isReplying && (
        <form onSubmit={handleReply}>
          <input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />

          <button type="submit">Reply</button>
        </form>
      )}
    </div>
  );
}
