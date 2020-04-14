import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowCategories() {
  const history = useHistory();
  const { id } = useParams();

  const [category, setCategory] = useState('');
  const [fora, setFora] = useState([]);

  useEffect(() => {
    getCategory();
    getFora();
  }, []);

  const getCategory = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/category/' + id
    );
    console.log('from get categories', response.data.result);
    setCategory(response.data.result[0].title);
  };

  const getFora = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/forum/category/' + id
    );
    console.log('form get fora', response.data);
    setFora(response.data.result);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {category && <h1>{category}</h1>}

      <ul>
        {fora &&
          fora.map((forum, index) => (
            <li key={index} className="list-group mb-1">
              <button
                className="btn btn-primary"
                onClick={() => history.push(`/forum/${forum.id}`)}
              >
                {forum.title}
                <span className="badge badge-light">2</span>
              </button>

              {/* <ListItemText primary={forum.title} secondary={forum.createdAt} /> */}
              {/* {forum.title} {forum.createdat} */}
            </li>
          ))}
      </ul>

      <button onClick={() => history.push('/forum/create/' + id)}>
        Create Forum
      </button>
    </div>
  );
}
