import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import BlockedRoutes from "./components/BlockedRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./global.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreateBook />} />
        <Route element={<BlockedRoutes />}>
          <Route path="auth" element={<Auth />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="edit/:bookId" element={<EditBook />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
