/*
 * Devspace IIT(ISM) Dhanbad
 *
 * This software and related documentation are owned by Devspace IIT(ISM) Dhanbad.
 * Unauthorized copying, reproduction, or modification via any medium is strictly prohibited.
 * Proprietary and confidential. All rights reserved.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import ServiceProviderRoutes from "./ServiceProviderRoutes";
import UserAuthProvider from "../state/context/UserAuthProvider";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <UserAuthProvider>
            <UserRoutes />
          </UserAuthProvider>
        }
      />
      <Route path="/sp/*" element={<ServiceProviderRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
