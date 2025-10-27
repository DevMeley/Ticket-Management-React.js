import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ProtectedQuard from "./ProtectedQuard";
import Dashboard from "./pages/Dashboard";
import TicketPage from "./pages/TicketPage";
import LAndingPage from "./pages/LAndingPage";
import GuardianLayout from "./components/GuardianLayout";
import Setting from "./pages/Setting";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/" element={<LAndingPage />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route path="/dashboard" element={<GuardianLayout />}>
          <Route
            path=""
            element={
              <ProtectedQuard>
                <Dashboard />
              </ProtectedQuard>
            }
          />
          <Route
            path="tickets"
            element={
              <ProtectedQuard>
                <TicketPage />
              </ProtectedQuard>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedQuard>
                <Setting/>
              </ProtectedQuard>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="p-8">
              404 — <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
