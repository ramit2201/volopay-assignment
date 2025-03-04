import React from "react";
import TableDisplay from "../components/core/TableDisplay";
import tableData from "../data/tableData.json";
import TableHeaders from "../constants/TableHeaders"; // Importing TableHeaders
const TableDisplayPage = () => {
  const { headers, rows } = tableData;
  return (
    <div className="p-4 mt-20">
      
      {/* Container with padding and margin */}
      <TableDisplay
        headers={headers}
        rows={rows}
        classes="p-8 w-full bg-red-200"
      />
      {/* Rendering TableDisplay component with props */}
    </div>
  );
};

export default TableDisplayPage;
