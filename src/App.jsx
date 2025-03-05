import "./App.css"; // Importing global CSS styles
import { getTopGainers , getTopLosers } from "./api/stockApi";

function App() {
  async function handleResponse() {
    let data = await getTopGainers();
    console.log("Top Gainers:", data);
  }
  return (
    <div className="App">
      <button className="handleResponse" onClick={handleResponse}> test </button>
    </div>
  );
}

export default App; // Exporting App component as default
