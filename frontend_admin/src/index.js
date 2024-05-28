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
import Home from './page/Home';
import IconListing from './page/IconModule/IconListing';
import UploadIcon from './page/IconModule/UploadIcon';
import DraftIconMainList from './page/IconModule/DraftIconMainList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='adminLogin' element={<Login/>}></Route>
      <Route index element={<Protected><Home/></Protected>}></Route>
      <Route path='icons' element={<Protected><IconListing/></Protected>}></Route>
      <Route path='upload' element={<UploadIcon/>}></Route>
      <Route path='/icons/:packId' element={<DraftIconMainList/>}></Route>
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
