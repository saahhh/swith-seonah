import React from "react";
import { BrowserRouter as Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import MainContent from "./MainContent";
import AuthProvider, { useAuth } from "../security/AuthContext";
import Login from "./Login";
import DropdownExample from "./DropdownExample";
import StudyDetail from "./StudyDetail";

// function AuthenticatedRoute({ children }) {
//   const authContext = useAuth();

//   if (authContext.isAuthenticated) return children;

//   return <Navigate to="/" />;
// }

export default function MainPage() {
  return (
    <div className="MainPage">
      <Header />
      <MainContent />
      {/* <Login /> */}
    </div>
  );
}
