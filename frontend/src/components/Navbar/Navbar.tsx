import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContext';

const Navbar = () => {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-semibold">MyApp</Link>
      <div>
        {state.isAuthenticated ? (
          <>
            <Link to="/admin" className="mr-4">Admin Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="bg-green-500 px-3 py-1 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
