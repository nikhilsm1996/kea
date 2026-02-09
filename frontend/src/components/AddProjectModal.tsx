import { useState } from "react";
import "../styles/addProjectModal.css";
import { type Project } from "../types";

interface Props {
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

const AddProjectModal = ({ onClose, onProjectCreated }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    estimatedBudget: "",
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.clientName || !formData.estimatedBudget) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          clientName: formData.clientName,
          estimatedBudget: Number(formData.estimatedBudget),
        }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const createdProject = await res.json();
      onProjectCreated(createdProject);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add Project</h3>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="modal-input"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              type="text"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientName: e.target.value }))
              }
              className="modal-input"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="estimatedBudget">Estimated Budget (AED)</label>
            <input
              id="estimatedBudget"
              type="number"
              placeholder="0.00"
              value={formData.estimatedBudget}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  estimatedBudget: e.target.value,
                }))
              }
              className="modal-input"
              step="0.001"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-modal-submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
