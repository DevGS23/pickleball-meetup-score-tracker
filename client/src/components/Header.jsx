import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Pickleball Meetups
        </Link>
        <nav>
          {Auth.loggedIn() ? (
            <button
              onClick={logout}
              className="text-white hover:text-blue-200"
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login" className="text-white hover:text-blue-200 mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-blue-200">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;