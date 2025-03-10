import "./App.css"; // Importing global CSS styles
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes/index"; // Importing AppRoutes
function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App; // Exporting App component as default
