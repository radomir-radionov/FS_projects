import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "../../services/api";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
}

interface ProjectForm {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  // Fetch all projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [token]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && editId !== null) {
      await updateProject(editId);
    } else {
      await createProject();
    }
  };

  const createProject = async () => {
    try {
      const response = await api.post(
        `/projects`,
        {
          title: form.title,
          description: form.description,
          image_url: form.imageUrl,
          project_url: form.projectUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects((prev) => [...prev, response.data]);
      setForm({ title: "", description: "", imageUrl: "", projectUrl: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const updateProject = async (id: number) => {
    try {
      const response = await api.put(
        `/projects/${id}`,
        {
          title: form.title,
          description: form.description,
          image_url: form.imageUrl,
          project_url: form.projectUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProjects((prev) =>
        prev.map((project) => (project.id === id ? response.data : project))
      );
      setForm({ title: "", description: "", imageUrl: "", projectUrl: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setForm({ title: "", description: "", imageUrl: "", projectUrl: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const startEdit = (project: ProjectData) => {
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.image_url,
      projectUrl: project.project_url,
    });
    setIsEditing(true);
    setEditId(project.id);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md mb-6">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          {isEditing ? "Edit Project" : "Create New Project"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full max-h-[440px] rounded-md border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          ></textarea>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="url"
            name="projectUrl"
            value={form.projectUrl}
            onChange={handleInputChange}
            placeholder="Project URL"
            required
            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-3 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {isEditing ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Projects List</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-col border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="text-green-500 hover:text-green-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{project.description}</p>
              <div className="mt-2 text-sm">
                <a href={project.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Image
                </a>
                {" | "}
                <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Project Link
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
