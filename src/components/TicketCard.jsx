import { MdDelete, MdEdit } from "react-icons/md";

function Badge({ status }) {
  const map = {
    open: "bg-green-50 text-green-600",
    in_progress: "bg-amber-50 text-amber-600",
    closed: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        map[status] || ""
      }`}
    >
      {status}
    </span>
  );
}

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article className="card flex flex-col dark:bg-[#3a3734]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{ticket.title}</h3>
          <p className="text-sm text-slate-500 mt-2">
            {ticket.description?.slice(0, 120)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge status={ticket.status} />
          <div className="text-xs text-slate-400">
            {new Date(ticket.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onEdit} className="px-3 py-1 text-green-400 border rounded">
          <MdEdit />
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 border rounded text-red-600"
        >
          <MdDelete />
        </button>
      </div>
    </article>
  );
}
