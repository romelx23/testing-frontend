// import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "../components/ui";
import { AuthContext } from "../context/auth";
// import { login } from "../actions/auth";
// import { StartloadPost } from "../actions/post";
import { DashboardPrivate } from "./DashboardPrivate";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user, startCheking, checking } = useContext(AuthContext);

  // const dispatch = useDispatch();

  // const [checking, setChecking] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    startCheking();
    console.log("startCheking");
    // localStorage.setItem("uid", "123");
  }, [user.nombre]);

  if (checking) {
    return (
      <div
      className="loader-page"
      >
        <h1
          className="
          text-white
           font-bold
            text-3xl
            "
        >
          Espere....
        </h1>
        <Spinner/>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <DashboardPrivate />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
