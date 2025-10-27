import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext1";
import { showToast } from "../../../Utils/toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!name) errs.name = "Name required";
    if (!email) errs.email = "Email required";
    if (!password || password.length < 6)
      errs.password = "Password min 6 chars";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await signup({ name, email, password });
      showToast("Account created. Logged in.", "success");
      nav("/dashboard");
    } catch (err) {
      setErrors({ form: err.message });
      showToast(err.message, "error");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold mb-4 flex justify-center">
          Sign up
        </h2>
        {errors.form && <div className="text-red-600 mb-2">{errors.form}</div>}
        <label className="block mt-3">
          <div className="text-sm mb-1">Full name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-400" : "border-slate-200"
            }`}
          />
          {errors.name && (
            <div className="text-sm text-red-600">{errors.name}</div>
          )}
        </label>
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
          <button className="px-4 py-2 bg-primary bg-orange-400 text-white rounded">
            Create account
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center">
          Already have an account?{" "}
          <Link to="/auth/signin">
            <span className="text-blue-700"> Sign in</span>
          </Link>
        </div>
      </form>
    </main>
  );
}
