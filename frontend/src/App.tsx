import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar } from './components';
import { useAuth } from './context/AuthContext/AuthContext';
import { ProjectProvider } from './context/ProjectContext/ProjectContext';
import { AdminDashboard, Home, Login, ProjectDetail, Signup } from './pages';

const App = () => {
  const { state } = useAuth();

  return (
    <ProjectProvider>
      <Router>
        {state.isAuthenticated && <Navbar />} 
        <div className="">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                state.isAuthenticated ? <Home /> : <Navigate to="/login" />
              }
            />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;
