import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './app/pages/Home';
import LoginPage from './app/sign-in/LoginPage';
import SignIn from './app/sign-up/SignIn';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />} />,
    <Route path="/sign-in" element={<LoginPage />} />,
    <Route path="/sign-up" element={<SignIn />} />,
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
