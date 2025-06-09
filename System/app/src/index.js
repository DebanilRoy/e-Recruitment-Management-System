import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router";
import './index.css';
import App from './App';
import { UserProvider } from './Context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));    // Creating DOM element 'root' for rendering 

// Creating route value

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App/>
  }
])

// Rendering root

root.render(
  <UserProvider>
    <RouterProvider router = {router}>
    </RouterProvider>
  </UserProvider>
);
