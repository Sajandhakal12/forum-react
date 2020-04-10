import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function BrowseCategories() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/category');
    let data = response.data.result;

    setCategories(data);
    console.log(categories);
    // console.log(response.data.result);
  };

  return (
    <div>
      <h1>Browse Categories</h1>

      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              onClick={() => history.push('/category/' + category.id)}
            >
              {category.title}
            </li>
          ))}
      </ul>
      <button onClick={() => history.push('/category/create')}>
        Create Category
      </button>
    </div>
  );
}
