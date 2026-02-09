import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";

interface Project {
  id: number;
  name: string;
  clientName: string;
  estimatedBudget: number;
  totalExpenses: number;
  remainingBudget: number;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3001/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      setError("Could not load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>No projects found</p>;

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "20px", padding: "8px 12px" }}
      >
        Add Project
      </button>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
