export function showToast(message, type = "success") {
  const root = document.createElement("div");
  root.className = `toast ${type}`;
  root.textContent = message;
  root.setAttribute("role", "status");
  document.body.appendChild(root);
  setTimeout(() => root.classList.add("show"), 10);
  setTimeout(() => root.remove(), 3000);
}
