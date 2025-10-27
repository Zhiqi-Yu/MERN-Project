import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const current = useSelector(s => s.currentUser?.user || null);
  if (!current || current.role !== "admin") {
    return <Navigate to="/search" replace />;
  }
  return children;
}
