import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './app/pages/Home';
import LoginPage from './app/sign-in/LoginPage';
import SignIn from './app/sign-up/SignIn';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/sign-in', element: <LoginPage /> },
  { path: '/sign-up', element: <SignIn /> },
  {},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
