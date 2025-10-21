import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

const Page = ({ title }) => <h2>{title}</h2>;

export default function App() {
  return (
    <>
      <nav>
        <Link to="/search">Search</Link>
        <Link to="/register">Register</Link>
        <Link to="/my/schedule">My Schedule</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<Page title="Search Vaccines / Hospitals" />} />
          <Route path="/hospital/:id" element={<Page title="Hospital Detail" />} />
          <Route path="/register" element={<Page title="User Registration" />} />
          <Route path="/book/:hospitalId/:vaccineId" element={<Page title="Booking & Payment" />} />
          <Route path="/my/schedule" element={<Page title="My Schedule" />} />
          <Route path="/reports" element={<Page title="Reports & Watchlist" />} />
          <Route path="/admin" element={<Page title="Admin Dashboard" />} />
        </Routes>
      </main>
    </>
  );
}
