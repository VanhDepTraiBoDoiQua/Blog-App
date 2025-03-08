import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Write from './routes/Write.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './routes/LandingPage.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import AdminPage from './routes/AdminPage.jsx';

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/home",
        element: <Homepage/>
      },
      {
        path: "/posts",
        element: <PostListPage/>
      },
      {
        path: "/admin",
        element: <AdminPage/>
      },
      {
        path: "/write",
        element: <Write/>
      },
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/register",
        element: <RegisterPage/>
      },
      {
        path: "/:slug",
        element: <SinglePostPage/>
      },
      {
        path: "*",
        element: <ErrorPage/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer position='top-center'/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
)
