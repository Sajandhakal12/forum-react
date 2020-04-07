import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function BrowseCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    const response = axios.get('http://localhost:5000/api/category');
    setCategories(response.data);
  };
  const history = useHistory();

  return (
    <div>
      <h1>Browse Categories</h1>
      <button onClick={() => history.push('/category/create')}>
        Create Category
      </button>
    </div>
  );
}
