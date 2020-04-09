import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function BrowseCategories() {
  const [categories, setCategories] = useState('');
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/category');
    const data = response.data.result;

    // setCategories('data');
    console.log(categories);
    console.log(response.data.result);
  };

  return (
    <div>
      <h1>Browse Categories</h1>

      {/* {setCategories('myan')} */}
      {/* <ul>
        {categories &&
          categories.map((catagory, index) => <li key={index}>{catagory}</li>)}
      </ul> */}
      <button onClick={() => history.push('/category/create')}>
        Create Category
      </button>
    </div>
  );
}
