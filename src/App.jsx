import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Loader from "./components/Loader";
import Logout from "./components/Logout";

// Lazy loading components
const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"));
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Home
          </NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/fakultas">
                  Fakultas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/prodi">
                  Program Studi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* FAKULTAS - TANPA LOGIN */}
            <Route path="/fakultas" element={<FakultasList />} />
            <Route path="/fakultas/create" element={<FakultasCreate />} />
            <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />

            {/* PRODI - TANPA LOGIN */}
            <Route path="/prodi" element={<ProdiList />} />
            <Route path="/prodi/create" element={<ProdiCreate />} />
            <Route path="/prodi/edit/:id" element={<ProdiEdit />} />
          </Routes>
        </Suspense>

        <div className="text-center mt-4">&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  );
};

export default App;
