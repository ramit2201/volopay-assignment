import React from "react";
import PropTypes from "prop-types";

/**
 * TableDisplay Component
 * Renders a responsive table with dynamic headers and rows.
 *
 * @param {Array} headers - Array of header strings to be displayed as table columns.
 * @param {Array} rows - Array of objects where each object represents a row.
 * @param {String} classes - Optional additional CSS classes for table styling.
 */
const TableDisplay = ({ headers, rows, classes }) => {
  return (
    <div className="overflow-x-auto"> {/* Makes the table horizontally scrollable on small screens */}
      <table className={`border-collapse w-full ${classes}`}> {/* Table with collapsible borders and full width */}
        <thead>
          <tr className="bg-white"> {/* Header row with white background */}
            {headers?.map((value, index) => (
              <th 
                key={index} 
                className="border px-4 py-2 text-left font-bold" 
                scope="col"
              >
                {value} {/* Display header name */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows?.map((value, key) => (
              <tr 
                key={key} 
                className=" even:bg-gray-200 odd: bg-white "
              > {/* Alternating row colors for better readability */}
                {headers?.map((header, index) => (
                  <td key={index} className="border px-4 py-2">
                    {value[header]} {/* Display corresponding cell data based on header key */}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="border px-4 py-2 text-center">
                No data available {/* Fallback when no rows are provided */}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// PropTypes to enforce prop type validation
TableDisplay.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of strings representing table headers
  rows: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of objects representing table rows
  classes: PropTypes.string, // Optional string for additional CSS classes
};

// Default props for optional props
TableDisplay.defaultProps = {
  classes: "", // Empty string by default if no custom classes are provided
};

export default TableDisplay; // Exporting component for use in other parts of the app