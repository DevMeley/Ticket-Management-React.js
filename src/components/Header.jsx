import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      <Link to="/">
        <span className="font-extrabold text-orange-400 text-2xl tracking-wide">
          TicketFlow
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          How It Works
        </a>
        <a
          href="#pricing"
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          Pricing
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <Link
          to="/auth/sigin"
          className=" hidden lg:block px-4 py-2 bg-amber-400 text-white rounded-lg border border-slate-200 font-semibold"
        >
           <button> Get Started</button>
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-3xl text-orange-800 focus:outline-none"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>
      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="p-4 absolute top-full left-0 w-full bg-white shadow-md z-50 md:hidden animate-fade-in">
          <ul className="flex flex-col gap-4 py-4 px-8 text-gray-700 dark:text-gray-200 font-medium">
            <li
              className="hover:text-blue-800 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </li>
            <li
              className="hover:text-blue-800 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </li>
            <li
              className="hover:text-blue-800 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              About
            </li>
            <li
              className="hover:text-blue-800 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </li>
          </ul>
          <Link
            to="/auth/signin"
            className="px-4 py-2 bg-amber-400 text-white rounded-lg border border-slate-200 font-semibold"
          >
            <button> Get Started</button>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default HomeHeader;
