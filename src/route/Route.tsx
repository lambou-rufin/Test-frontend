import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes'; // Vérifie que l'objet routes est bien importé et contient toutes les routes

import Ticket from 'src/pages/ticket/Ticket';
import Layout from 'src/layout/Layout';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes avec Layout */}
        <Route element={<Layout />}>
          <Route path={routes.TICKET} element={<Ticket />} />
        </Route>
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to={routes.TICKET} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;