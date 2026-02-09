import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";
import "../styles/projectList.css";

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

  const handleProjectCreated = (
    project: Omit<Project, "totalExpenses" | "remainingBudget">,
  ) => {
    const projectWithTotals = {
      ...project,
      totalExpenses: 0,
      remainingBudget: project.estimatedBudget,
    };

    setProjects((prev) => [...prev, projectWithTotals]);
  };

  if (loading) return <p className="status-message">Loading projects...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>Projects</h1>
        <button className="btn-add-project" onClick={() => setShowModal(true)}>
          <span className="plus-icon">+</span>
          Add Project
        </button>
      </div>

      {showModal && (
        <AddProjectModal
          onClose={() => setShowModal(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      <div className="projects-wrapper">
        {projects.length === 0 ? (
          <p className="no-projects">No projects found</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
