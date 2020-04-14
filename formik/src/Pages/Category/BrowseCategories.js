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
  };

  return (
    <div>
      <h1>Browse Categories</h1>

      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              className="list-group mb-1"
              onClick={() => history.push('/category/' + category.id)}
            >
              <div className="card mb-3" style={{ borderRadius: '20px' }}>
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <div style={{ textAlign: 'center', margin: '15px' }}>
                      <i
                        className="fa fa-graduation-cap"
                        style={{ fontSize: '48px', display: 'inline-block' }}
                      />
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{category.title}</h5>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <button onClick={() => history.push('/category/create')}>
        Create Category
      </button>
    </div>
  );
}
