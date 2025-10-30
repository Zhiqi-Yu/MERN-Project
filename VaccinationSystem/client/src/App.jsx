import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SearchPage from "./components/pages/SearchPage.jsx";
import HospitalDetailPage from "./components/pages/HospitalDetailPage.jsx";
import BookingPage from "./components/pages/BookingPage.jsx";
import SchedulePage from "./components/pages/SchedulePage.jsx";

import AdminRoute from "./components/ui/AdminRoute.jsx";
import UserSwitcher from "./components/ui/UserSwitcher.jsx";

import AdminDashboard from "./components/pages/AdminDashboard.jsx";


// now we have the AdminDashboard page
// function AdminDashboard() { 
//   return <h2>Admin Dashboard (coming next: Inventory Management / Shelves / Reports)</h2>;
// }

export default function App(){
  return (
    <>
      <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #eee"}}>
        <Link to="/search">Search</Link>
        <Link to="/my/schedule">My Schedule</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/admin">Admin</Link>
        <UserSwitcher />
      </nav>
      <main style={{padding:16}}>
        <Routes>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hospital/:id" element={<HospitalDetailPage />} />
          <Route path="/book/:hospitalId/:vaccineId" element={<BookingPage />} />
          <Route path="/my/schedule" element={<SchedulePage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
