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

  useEffect(() => {
    startCheking();
    console.log("startCheking");
  }, [user.name]);

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
        <img
          className="h-20 w-20"
          src="https://media.discordapp.net/attachments/839620709517230081/1030715926515027988/animation_500_l99gx4de.gif"
          alt="La sed nocturna"
        />
        <Spinner />
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
