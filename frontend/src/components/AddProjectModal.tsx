import { useState } from "react";

interface Props {
  onClose: () => void;
  onProjectCreated: (project: any) => void; 
}

const AddProjectModal = ({ onClose, onProjectCreated }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    clientName: "",
    estimatedBudget: "",
  });

  const handleSubmit = async () => {
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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        <h3>Add New Project</h3>

        <input
          type="text"
          placeholder="Project Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="text"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, clientName: e.target.value }))
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="number"
          placeholder="Estimated Budget"
          value={formData.estimatedBudget}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, estimatedBudget: e.target.value }))
          }
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
