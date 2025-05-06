import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TournamentProvider } from "./contexts/TournamentContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TournamentDetails from "./pages/TournamentDetails";
import CreateTournament from "./pages/CreateTournament";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TournamentProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments/create"
                element={
                  <PrivateRoute>
                    <CreateTournament />
                  </PrivateRoute>
                }
              />
              <Route
                path="tournaments/:id"
                element={
                  <PrivateRoute>
                    <TournamentDetails />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TournamentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
