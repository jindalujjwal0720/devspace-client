/*
 * Devspace IIT(ISM) Dhanbad
 *
 * This software and related documentation are owned by Devspace IIT(ISM) Dhanbad.
 * Unauthorized copying, reproduction, or modification via any medium is strictly prohibited.
 * Proprietary and confidential. All rights reserved.
 */

import React from "react";
import { Routes, Route } from "react-router-dom";

const ServiceProviderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Devspace - Service Provider App</div>} />
    </Routes>
  );
};

export default ServiceProviderRoutes;
