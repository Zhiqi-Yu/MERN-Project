import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SearchPage from "./components/pages/SearchPage.jsx";
import HospitalDetailPage from "./components/pages/HospitalDetailPage.jsx";
import BookingPage from "./components/pages/BookingPage.jsx";
import SchedulePage from "./components/pages/SchedulePage.jsx";

export default function App(){
  return (
    <>
      <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #eee"}}>
        <Link to="/search">Search</Link>
        <Link to="/my/schedule">My Schedule</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main style={{padding:16}}>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hospital/:id" element={<HospitalDetailPage />} />
          <Route path="/book/:hospitalId/:vaccineId" element={<BookingPage />} />
          <Route path="/my/schedule" element={<SchedulePage />} />
        </Routes>
      </main>
    </>
  );
}
