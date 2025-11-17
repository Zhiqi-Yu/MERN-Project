import React, { lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SearchPage from "./components/pages/SearchPage.jsx";
import HospitalDetailPage from "./components/pages/HospitalDetailPage.jsx";
import BookingPage from "./components/pages/BookingPage.jsx";
import SchedulePage from "./components/pages/SchedulePage.jsx";

import AdminRoute from "./components/ui/AdminRoute.jsx";
import UserSwitcher from "./components/ui/UserSwitcher.jsx";

import AdminDashboard from "./components/pages/AdminDashboard.jsx";

import ReportsPage from "./components/pages/ReportsPage.jsx";
import TickerBanner from "./components/ui/TickerBanner.jsx";
import PayPage from "./components/pages/PayPage.jsx";
import MobilePayConfirm from "./components/pages/MobilePayConfirm.jsx";

import CheckDenominations from "./components/pages/CheckDenominations.jsx";

import GitHubLogin from "./components/ui/GitHubLogin.jsx";
import OAuthDone from "./components/ui/OAuthDone";

// import Hooks from "./components/hooks/Hooks.jsx"
// const Hooks = lazy(() => import("./components/hooks/Hooks.jsx"));
const Hooks = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      import("./components/hooks/Hooks.jsx").then(module => resolve(module));
    }, 2000); // 
  })
);

// now we have the AdminDashboard page
// function AdminDashboard() { 
//   return <h2>Admin Dashboard (coming next: Inventory Management / Shelves / Reports)</h2>;
// }

export default function App(){
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/hooks">HOOKS</Link>
          <Link to="/atm">ATM</Link>
          <Link to="/search">Search</Link>
          <Link to="/my/schedule">My Schedule</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/github">Github</Link>
          <UserSwitcher />
        </div>
      </nav>

      <TickerBanner/>
      
      <main className="container">
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
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/pay/:paymentId" element={<PayPage />} />
          <Route path="/pay/confirm/:paymentId" element={<MobilePayConfirm />} />
          <Route path="/atm" element={<CheckDenominations />} />
          <Route path="/hooks" element={
            <Suspense fallback={<div style={{padding:16}}>Loading Hooks…</div>}>
              <Hooks />
            </Suspense>
          }/>
          <Route path="/github" element={<GitHubLogin />}/>
          <Route path="/oauth/done" element={<OAuthDone />}/>
        </Routes>
      </main>
    </>
  );
}
