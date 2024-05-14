import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./features/posts/pages/Home";
import Login from "./features/authentication/pages/Login";
import Register from "./features/authentication/pages/Register";
import Write from "./features/write/pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthLayout from "./features/authentication/components/AuthLayout";

import "./style.scss";

const App = () => {
  return (
    <div className="app">
      <header className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
          </Route>

          {/* Handles all other paths not assigned */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </header>
    </div>
  );
};

export default App;
