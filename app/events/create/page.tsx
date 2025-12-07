"use client";

import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online",
    audience: "",
    organizer: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [agendaInput, setAgendaInput] = useState("");
  const [agenda, setAgenda] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addAgenda = () => {
  const value = agendaInput.trim();
  if (!value) return;

  if (agenda.includes(value)) {
    setMessage(`⚠️ "${value}" already exists in agenda.`);
    setTimeout(() => setMessage(""), 2000);
    return;
  }

  setAgenda((prev) => [...prev, value]);
  setAgendaInput("");
};


  const addTag = () => {
  const value = tagInput.trim().toLowerCase();
  if (!value) return;

  // Prevent duplicates
  if (tags.includes(value)) {
    setMessage(`⚠️ "${value}" is already added.`);
    setTimeout(() => setMessage(""), 2000);
    return;
  }

  setTags((prev) => [...prev, value]);
  setTagInput("");
};


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    data.append("agenda", JSON.stringify(agenda));
    data.append("tags", JSON.stringify(tags));

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Event creation failed");

      setMessage("🎉 Event created successfully!");
      setFormData({
        title: "",
        description: "",
        overview: "",
        venue: "",
        location: "",
        date: "",
        time: "",
        mode: "online",
        audience: "",
        organizer: "",
      });
      setAgenda([]);
      setTags([]);
      setPreview(null);

    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="create-event">
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>

        {/* Normal Inputs */}
        {Object.entries(formData).map(([key, value]) =>
          key !== "mode" ? (
            <div className="form-group" key={key}>
              <label>{key.toUpperCase()}</label>
              <input
                type={key === "date" ? "date" : key === "time" ? "text" : "text"}
                value={value}
                required
                placeholder={`Enter ${key}`}
                onChange={(e) => updateField(key, e.target.value)}
              />
            </div>
          ) : null
        )}

        {/* Mode Select */}
        <div className="form-group">
          <label>MODE</label>
          <select value={formData.mode} onChange={(e) => updateField("mode", e.target.value)}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Event Banner</label>
          <input type="file" accept="image/*" onChange={handleImage} required />
          {preview && <img src={preview} alt="Preview" className="rounded-md mt-2 h-40 object-cover" />}
        </div>

        {/* Agenda */}
        <div className="list-container">
          <label>Agenda</label>
          <div className="inline-input">
            <input
            className="p-2 rounded-lg"
              placeholder="Add agenda item"
              value={agendaInput}
              onChange={(e) => setAgendaInput(e.target.value)}
            />
            <button type="button" onClick={addAgenda}>Add</button>
          </div>

          <div className="chips">
  {agenda.map((item, index) => (
    <span key={item} className="chip">
      {item}
      <button
        className="ml-2 text-red-400 hover:text-red-300"
        onClick={(e) => {
          e.preventDefault();
          setAgenda((prev) => prev.filter((_, i) => i !== index));
        }}
      >
        ✕
      </button>
    </span>
  ))}
</div>

        </div>

        {/* Tags */}
        <div className="list-container">
          <label>Tags</label>
          <div className="inline-input">
            <input
            className="p-2 rounded-lg"
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button type="button" onClick={addTag}>Add</button>
          </div>

          <div className="chips">
  {tags.map((tag, index) => (
    <span key={tag} className="chip">
      {tag}
      <button
        className="ml-2 text-red-400 hover:text-red-300"
        onClick={(e) => {
  e.preventDefault();
  const el = e.currentTarget.closest('.chip');
  el?.classList.add("removing");
  setTimeout(() => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }, 150);
}}

      >
        ✕
      </button>
    </span>
  ))}
</div>

        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </section>
  );
}
