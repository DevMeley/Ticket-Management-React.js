import { v4 as uuid } from "uuid";

const USERS_KEY = "ticketapp_users";
const SESSION_KEY = "ticketapp_session";

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (new Date(s.expiresAt) < new Date()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch (e) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function login(email, password) {
  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");
  const token = Math.random().toString(36).slice(2);
  const session = {
    token,
    user: { id: user.id, name: user.name, email: user.email },
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function signup({ name, email, password }) {
  const users = readUsers();
  if (users.some((u) => u.email === email))
    throw new Error("An account already exists with that email.");
  const user = { id: uuid(), name, email, password };
  users.push(user);
  writeUsers(users);
  // auto login
  const token = Math.random().toString(36).slice(2);
  const session = {
    token,
    user: { id: user.id, name: user.name, email: user.email },
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
