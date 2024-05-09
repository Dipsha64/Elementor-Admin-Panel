import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './page/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='adminLogin' element={<Login/>}></Route>
      <Route path='/' element={<App/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);
