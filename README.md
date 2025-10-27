# TicketFlow — React

## Overview

TicketFlow is a simple ticket management front-end implementing Landing, Auth, Dashboard, and Ticket CRUD (Create/Read/Update/Delete).

## Tech & Libraries

- React + Vite (or Create React App)
- react-router-dom
- Tailwind CSS (or plain CSS)
- localStorage for auth & tickets (key: `ticketapp_session`)
- Optional: JSON Server for mock API

## Setup (React example)

1. `git clone <repo>`
2. `cd Ticket-Management-React`
3. `npm install`
4. `npm run dev` (or `npm start`)

## Test user

- email: `test@ticketapp.local`
- password: `Test@1234`

## Notes

- Protected routes use `ticketFlow_session` in localStorage.
- Tickets stored at `ticketFlow_tickets`.

## Accessibility

- Semantic HTML, focus states, ARIA for toast/alerts, alt text for images.
