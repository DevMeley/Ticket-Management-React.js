// FILE: src/pages/tickets/TicketsPage.jsx
import React, { useEffect, useState } from "react";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../services/tickets";
import TicketForm from "../components/TicketForm";
import TicketCard from "../components/TicketCard";
import { showToast } from "../../Utils/toast";
import { IoClose } from "react-icons/io5";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => setTickets(getTickets()), []);

  // close modal on Escape
  useEffect(() => {
    if (!editing) return;
    const onKey = (e) => {
      if (e.key === "Escape") setEditing(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing]);

  function refresh() {
    setTickets(getTickets());
  }

  function handleCreate(data) {
    try {
      createTicket(data);
      refresh();
      showToast("Ticket created", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  }
  function handleUpdate(id, updates) {
    try {
      updateTicket(id, updates);
      refresh();
      showToast("Ticket updated", "success");
      setEditing(null);
    } catch (err) {
      showToast(err.message, "error");
    }
  }
  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    try {
      deleteTicket(id);
      refresh();
      showToast("Ticket removed", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  const visible = tickets.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <main className="container-centered py-4 lg:p-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tickets</h1>
      </header>

      <section className="flex flex-col md:flex-row gap-8">
        {/* Left side - Ticket Cards */}
        <section className="flex-1">
          <div className="flex gap-2 mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
            <input
              placeholder="Search title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded w-[120px]"
            />
          </div>

          <section className="space-y-4">
            {visible.length === 0 ? (
              <div className="text-slate-500">No tickets found.</div>
            ) : (
              visible.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  onEdit={() => setEditing(t)}
                  onDelete={() => handleDelete(t.id)}
                />
              ))
            )}
          </section>
        </section>

        {/* Right side - Ticket Form */}
        <section className="w-full md:w-96 self-start">
          <TicketForm onCreate={handleCreate} />
        </section>

        {editing && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setEditing(null)}
          >
            <div
              className="w-full max-w-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="card"
                style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Edit Ticket</h3>
                  <div>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-3 py-1 border rounded"
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>

                <TicketForm
                  initial={editing}
                  onCreate={(data) => handleUpdate(editing.id, data)}
                  submitLabel="Update"
                  className="dark:text-white text-black"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
