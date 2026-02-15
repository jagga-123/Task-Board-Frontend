import { useState, useEffect } from "react";

export default function TaskModal({ onSave, onClose, existing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || "");
      setDescription(existing.description || "");
      setPriority(existing.priority || "Low");
      setDueDate(existing.dueDate || "");
      setTags(existing.tags?.join(",") || "");
    }
  }, [existing]);

  const submit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const task = {
      ...existing,
      id: existing?.id || Date.now(),
      title,
      description,
      priority,
      dueDate,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: existing?.createdAt || new Date().toLocaleString(),
    };

    onSave(task);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>{existing ? "Edit Task" : "Create Task"}</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={submit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 300,
};
