const TICKETS_KEY = "ticketapp_tickets";

export function getTickets() {
  return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
}
export function saveTickets(list) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list));
}
export function createTicket(data) {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tickets.unshift(newTicket);
  saveTickets(tickets);
  return newTicket;
}
export function updateTicket(id, updates) {
  const tickets = getTickets();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  tickets[idx] = {
    ...tickets[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveTickets(tickets);
  return tickets[idx];
}
export function deleteTicket(id) {
  const tickets = getTickets().filter((t) => t.id !== id);
  saveTickets(tickets);
  return true;
}
