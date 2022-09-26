import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UIContext } from "../context/ui";
import { LoginPage } from "../pages";
import { RegisterPage } from '../pages/auth/RegisterPage';

export const DashboardPrivate = () => {
  const {ToggleTheme}=useContext(UIContext);
  return (
    <>
      <div className={`${ToggleTheme?'dark':''}`}>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
};
