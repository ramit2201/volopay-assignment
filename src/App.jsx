import "./App.css"; // Importing global CSS styles
import { store } from "./store/store";
import {Provider} from "react-redux"

import TableDisplayPage from "./pages/TableDisplayPage";
function App() {
  return (
    <Provider store={store} >

    </Provider>
  )
}

export default App; // Exporting App component as default
