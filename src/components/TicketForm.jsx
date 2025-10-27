import React, { useState, useEffect } from "react";

const allowed = ["open", "in_progress", "closed"];

export default function TicketForm({
  initial = null,
  onCreate,
  submitLabel = "Create",
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "open");
  const [priority, setPriority] = useState(initial?.priority || "medium");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description || "");
      setStatus(initial.status);
      setPriority(initial.priority || "medium");
    }
  }, [initial]);

  function validate() {
    const e = {};
    if (!title || title.trim().length < 3)
      e.title = "Title required (min 3 chars).";
    if (!status || !allowed.includes(status))
      e.status = "Status must be open, in_progress or closed.";
    if (description && description.length > 2000)
      e.description = "Description too long.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
    };
    onCreate(payload);
    // clear if not editing
    if (!initial) {
      setTitle("");
      setDescription("");
      setStatus("open");
      setPriority("medium");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-3 ">
      <h3 className="font-semibold mb-4">Add Ticket</h3>
      <div>
        <label className="block text-sm">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border dark:border-gray-500 rounded ${
            errors.title ? "border-red-400" : "border-slate-200"
          }`}
        />
        {errors.title && (
          <div className="text-sm text-red-600">{errors.title}</div>
        )}
      </div>

      {/* status + priority: stack on mobile, two columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm dark:text-white text-black">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full p-2 border dark:border-gray-500 rounded ${
              errors.status ? "border-red-400" : "border-slate-200"
            }`}
          >
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
          {errors.status && (
            <div className="text-sm text-red-600">{errors.status}</div>
          )}
        </div>

        <div>
          <label className="block text-sm">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-2 border dark:border-gray-500 rounded ${
            errors.description ? "border-red-400" : "border-slate-200"
          }`}
          rows={4}
        ></textarea>
        {errors.description && (
          <div className="text-sm text-red-600">{errors.description}</div>
        )}
      </div>

      <div className="flex items-center gap-3 justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-orange-400 text-white rounded w-full md:w-auto"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
