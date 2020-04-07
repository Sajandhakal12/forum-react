import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

export default function NavBar() {
  const history = useHistory();
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark px-sm-5 ">
        <Link to="/">Logo</Link>
        <Link to="/category" className="nav-link">
          Catagories
        </Link>
        {user ? (
          <div>
            <button onClick={() => history.push('/admin')}>{user}</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={() => history.push('/login')}>Login</button>
            <button onClick={() => history.push('/register')}>Register</button>
          </div>
        )}
      </nav>
    </div>
  );
}
