import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./userContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(window.location.pathname)
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App/>
  }
])

root.render(
  <UserProvider>
    <RouterProvider router = {router}>
    </RouterProvider>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
