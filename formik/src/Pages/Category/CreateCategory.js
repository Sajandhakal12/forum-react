import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { create_UUID } from '../../Component/uuid';

const CreateCategory = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: create_UUID(),
      title,
    };

    await axios.post('http://localhost:5000/api/category/create', data);
    history.push('/category/' + data.id);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Create Category</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;
