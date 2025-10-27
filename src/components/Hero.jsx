// FILE: src/components/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-visible bg-white">
      <div className="container-centered py-16 lg:py-28 flex flex-col lg:flex-row items-center gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold">
            TicketFlow, Manage tickets simply
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            TicketFlow helps you create, track, and resolve tickets easily 
            whether you’re managing tasks, customers, or project issues.
          </p>
          <div className="mt-6 flex gap-3">
            
            <Link
              to="/auth/signup"
              className="px-4 py-2 bg-amber-400 text-white rounded-lg border border-slate-200 font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="relative w-full lg:w-1/2 h-56 lg:h-72">
          <div
            className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-gradient-to-tr from-orange-200/20 to-transparent shadow-lg"
            aria-hidden="true"
          ></div>
          <div
            className="absolute top-12 left-12 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200/30 to-transparent"
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="src\assets\Screenshot 2025-10-27 175635.png" alt="" />
          </div>
        </div>
      </div>

      <svg
        className="hero-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,20 C360,120 1080,0 1440,80 L1440,120 L0,120 Z"
          fill="#0066FF"
          opacity="0.06"
        />
      </svg>
    </section>
  );
}
