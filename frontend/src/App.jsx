import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoPage from "./pages/TodoPage";
import NotesPage from "./pages/NotesPage";

function App() {
  const location = useLocation();
  // check login by getting token
  const token=localStorage.getItem("token");
  const hideHeader=location.pathname==="/" || location.pathname==="/login" || location.pathname==="/register";
  return (
    <>
      {/* showing header only after login */}
      {token && !hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={
            <ProtectedRoute> <TodoPage /> </ProtectedRoute>
          }
        />
        <Route path="/notes" element={
            <ProtectedRoute> <NotesPage /> </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;