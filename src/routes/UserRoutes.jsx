/*
 * Devspace IIT(ISM) Dhanbad
 *
 * This software and related documentation are owned by Devspace IIT(ISM) Dhanbad.
 * Unauthorized copying, reproduction, or modification via any medium is strictly prohibited.
 * Proprietary and confidential. All rights reserved.
 */

import React from "react";
import UserAuthRoutes from "./UserAuthRoutes";
import { Routes, Route } from "react-router-dom";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Devspace - User App</div>} />
      <Route path="/auth/*" element={<UserAuthRoutes />} />
    </Routes>
  );
};

export default UserRoutes;
