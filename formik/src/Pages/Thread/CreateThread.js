import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import { create_UUID } from '../../Component/uuid';

const CreateThread = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const data = {
      id: create_UUID(),
      title,
      content,
      userId: user,
      forumId: id,
    };

    const response = await axios.post(
      'http://localhost:5000/api/thread/create',
      data
    );
    console.log(response.data.result);
    const tid = response.data.result;
    history.push('/thread/' + tid);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Create Thread</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          required
          value={content}
          style={{ width: '100%', height: 250 }}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" variant="contained" color="primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateThread;
