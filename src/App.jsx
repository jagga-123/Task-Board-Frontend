import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Board from "./components/Board";
import { isAuthenticated } from "./auth.js";

const Protected = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/board"
          element={
            <Protected>
              <Board />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}