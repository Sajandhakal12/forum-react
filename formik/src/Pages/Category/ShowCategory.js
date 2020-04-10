import React, { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowCategories() {
  const history = useHistory();
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [fora, setFora] = useState([]);

  useEffect(() => {
    getCategory();
    getFora();
  }, []);

  const getCategory = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/category/' + id
    );
    console.log(response.data);
    setCategory(response.data);
  };

  const getFora = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/forum/category/' + id
    );
    setFora(response.data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {category && <h1>{category.title}</h1>}

      <button onClick={() => history.push('/forum/create/' + id)}>
        Create Forum
      </button>

      <ul>
        {fora.map((forum, index) => (
          <li>
            <button onClick={() => history.push(`/forum/${forum.id}`)} />
            {/* <ListItemText primary={forum.title} secondary={forum.createdAt} /> */}
            hello
            {/* {forum.title} {forum.createdat} */}
          </li>
        ))}
      </ul>
    </div>
  );
}
