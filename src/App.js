import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Login";
import VideoGallery from "./Pages/VideoGallery";
import LandingPageBanner from "./Pages/LandingPageBanner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./Pages/AboutusPage";
import Contact_us from "./Pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/banner_page",
    element: <LandingPageBanner />,
  },
  {
    path: "/video_gallery",
    element: <VideoGallery />,
  },
  {
    path: "/aboutus_page",
    element: <AboutUs />,
  },
  {
    path: "/contactus_page",
    element: <Contact_us />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
