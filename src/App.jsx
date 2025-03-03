import reactLogo from './assets/react.svg' // Importing React logo asset
import viteLogo from '/vite.svg' // Importing Vite logo asset
import './App.css' // Importing global CSS styles
import TableDisplay from './components/TableDisplay' // Importing TableDisplay component

// TableHeaders object to define table column headers for better reusability
const TableHeaders = {
  COMPANY: "Company",
  CONTACT: "Contact",
  COUNTRY: "Country"
};

function App() {
  // Table data containing headers and row data
  const tableData = {
    headers: [TableHeaders.COMPANY, TableHeaders.CONTACT, TableHeaders.COUNTRY], // Defining table headers dynamically
    rows: [ // Array of row objects with key-value pairs matching the headers
      { [TableHeaders.COMPANY]: "Alfreds Futterkiste", [TableHeaders.CONTACT]: "Maria Anders", [TableHeaders.COUNTRY]: "Germany" },
      { [TableHeaders.COMPANY]: "Centro comercial Moctezuma", [TableHeaders.CONTACT]: "Francisco Chang", [TableHeaders.COUNTRY]: "Mexico" },
      { [TableHeaders.COMPANY]: "Ernst Handel", [TableHeaders.CONTACT]: "Roland Mendel", [TableHeaders.COUNTRY]: "Austria" },
      { [TableHeaders.COMPANY]: "Island Trading", [TableHeaders.CONTACT]: "Helen Bennett", [TableHeaders.COUNTRY]: "UK" },
      { [TableHeaders.COMPANY]: "Laughing Bacchus Winecellars", [TableHeaders.CONTACT]: "Yoshi Tannamuri", [TableHeaders.COUNTRY]: "Canada" },
      { [TableHeaders.COMPANY]: "Magazzini Alimentari Riuniti", [TableHeaders.CONTACT]: "Giovanni Rovelli", [TableHeaders.COUNTRY]: "Italy" },
    ],
  };

  console.log(tableData.headers); // Debug log to check headers
  
  // Destructuring headers and rows from tableData
  const { headers, rows } = tableData;

  return (
    <div className='p-4 mt-20'> {/* Container with padding and margin */}
      <TableDisplay headers={headers} rows={rows} classes="p-8 w-full bg-red-200" /> {/* Rendering TableDisplay component with props */}
    </div>
  );
}

export default App; // Exporting App component as default