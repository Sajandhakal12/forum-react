import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import AuthContext from './Context/AuthContext';

import Navbar from './Component/NavBar';

import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Admin from './Component/Admin';

import CreateCategory from './Pages/Category/CreateCategory';
import BrowseCategories from './Pages/Category/BrowseCategories';
import ShowCategory from './Pages/Category/ShowCategory';
import CreateForum from './Pages/Forum/CreateForum';
import ShowForum from './Pages/Forum/ShowForum';
import CreateThread from './Pages/Thread/CreateThread';
import ShowThread from './Pages/Thread/ShowThread';

function App() {
  const [user, setUser] = useState(null);
  const [isInitiated, setIsInitiated] = useState(false);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem('token');
    console.log('token from app', token);
    await Axios.get('http://localhost:5000/api/user/init', {
      params: {
        token,
      },
    })
      .then((response) => {
        const User = response.data;
        setUser(User);
        setIsInitiated(true);
      })
      .catch((error) => {
        setUser(null);
        setIsInitiated(true);
      });

    // console.log('hello from app', response.data);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem('token', null);
  };

  return (
    <div className="jumbotron">
      {isInitiated && (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
          <Router>
            <Navbar />
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Switch>
                    <Route exact path="/">
                      <h3>hello</h3>
                    </Route>
                    <Route path="/register">
                      {!user ? <Register /> : <Redirect to="/admin" />}
                    </Route>
                    <Route path="/login">
                      {!user ? <Login /> : <Redirect to="/admin" />}
                    </Route>
                    <Route path="/admin">
                      {user ? <Admin /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/category/create">
                      {user ? <CreateCategory /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/category/:id">
                      <ShowCategory />
                    </Route>
                    <Route path="/category">
                      <BrowseCategories />
                    </Route>
                    <Route path="/forum/create/:id">
                      {user ? <CreateForum /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/forum/:id">
                      <ShowForum />
                    </Route>
                    <Route path="/thread/create/:id">
                      {user ? <CreateThread /> : <Redirect to="login" />}
                    </Route>
                    <Route path="/thread/:id">
                      <ShowThread />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
