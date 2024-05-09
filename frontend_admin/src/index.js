import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './page/Login';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Protected from "./store/Protected";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='adminLogin' element={<Login/>}></Route>
      <Route path='/' element={<Protected><App/></Protected>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
