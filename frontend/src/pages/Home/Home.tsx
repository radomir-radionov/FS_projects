import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

const Home = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Projects</h1>
      
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <div className="grid gap-6 w-full max-w-3xl">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <Link
                to={`/project/${project.id}`}
                className="text-blue-500 hover:underline mt-4 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
