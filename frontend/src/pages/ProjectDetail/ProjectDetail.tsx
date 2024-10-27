import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold text-gray-800">{project.title}</h1>
        <p className="text-gray-700 mt-4">{project.description}</p>
        <img
          src={project.image_url}
          alt={project.title}
          className="mt-4 w-full rounded-md object-cover"
        />
        <a
          href={project.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-4 block"
        >
          Visit Project
        </a>
      </div>
    </div>
  );
};

export default ProjectDetail;
