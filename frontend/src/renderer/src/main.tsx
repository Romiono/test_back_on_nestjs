import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainPage from '@renderer/pages/MainPage/MainPage';
import ReportByDatePage from '@renderer/pages/ReportByDatePage/ReportByDatePage';
import ReportByUserPage from '@renderer/pages/ReportByUserPage/ReportByUserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reportByDate',
    element: <ReportByDatePage />
  },
  {
    path: '/reportByUser',
    element: <ReportByUserPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
