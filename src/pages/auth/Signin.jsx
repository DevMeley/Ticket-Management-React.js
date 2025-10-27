// FILE: src/pages/auth/Login.jsx
import { AuthContext } from "../../context/AuthContext1";
import { showToast } from "../../../Utils/toast";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const loc = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = "Email is required.";
    if (!password) errs.password = "Password is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await login(email, password);
      showToast("Login successful", "success");
      const dest = loc.state?.from || "/dashboard";
      nav(dest);
    } catch (err) {
      setErrors({ form: err.message });
      showToast(err.message, "error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md card">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Welcome Back
        </h2>
        {errors.form && <div className="text-red-600 mb-2">{errors.form}</div>}
        <label className="block mt-3">
          <div className="text-sm mb-1">Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-400" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <div className="text-sm text-red-600">{errors.email}</div>
          )}
        </label>
        <label className="block mt-3">
          <div className="text-sm mb-1">Password</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-400" : "border-slate-200"
            }`}
          />
          {errors.password && (
            <div className="text-sm text-red-600">{errors.password}</div>
          )}
        </label>
        <div className="mt-6 flex items-center justify-center">
          <button className="px-12 py-2 bg-primary text-white rounded  bg-orange-400">
            Sign in
          </button>
        </div>
        <div className="mt-6 text-center">
          Don't have an account?
          <Link to="/auth/signup" className="text-sm">
            <span className="text-blue-700"> Sign Up</span>
          </Link>
        </div>
      </form>
    </main>
  );
}
