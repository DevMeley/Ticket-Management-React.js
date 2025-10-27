// FILE: src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/tickets";
import TicketCard from "../components/TicketCard";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <main className="container-centered py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="card dark:bg-[#3a3734]">
          <h3 className="text-sm text-slate-500">Total tickets</h3>
          <div className="text-3xl font-bold mt-2">{total}</div>
        </div>
        <div className="card dark:bg-[#3a3734]">
          <h3 className="text-sm text-slate-500">Open</h3>
          <div className="text-3xl font-bold mt-2">{open}</div>
        </div>
        <div className="card dark:bg-[#3a3734]">
          <h3 className="text-sm text-slate-500">Resolved</h3>
          <div className="text-3xl font-bold mt-2">{closed}</div>
        </div>
      </section>

      {/* Recent tickets */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Tickets</h2>
          <Link to="/dashboard/tickets" className="text-sm text-slate-500">
            View all
          </Link>
        </div>

        {tickets.length === 0 ? (
          <div className="text-slate-500">No recent tickets.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {tickets.slice(0, 3).map((t) => (
              <TicketCard key={t.id} ticket={t} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
