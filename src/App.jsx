import "./App.css"; // Importing global CSS styles
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Home from "./pages/Home"; // Importing Home page component
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App; // Exporting App component as default
