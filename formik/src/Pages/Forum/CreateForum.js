import React, { useState } from 'react';

import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const CreateForum = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState('');

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      categoryId: id,
    };

    await axios
      .post('http://localhost:5000/api/forum/create', data)
      .then((response) => {
        console.log(response.data.result);
        const id = response.data.result;
        history.push('/forum/' + id);
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Create Forum</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateForum;
