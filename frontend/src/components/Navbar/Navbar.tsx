import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
    }
  };

  return (
    <nav className="bg-blue-700 shadow-lg p-4 text-white flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold hover:text-gray-300">
        MyApp
      </Link>
      <div className="flex items-center gap-4">
        {state.isAuthenticated ? (
          <>
            <Link
              to="/admin"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Admin Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg font-medium hover:text-gray-300 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
