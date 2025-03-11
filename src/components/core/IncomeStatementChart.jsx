import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const IncomeStatementChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fiscalDate" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
        <YAxis 
          dataKey="revenue" 
          label={{ value: "Revenue (in $)", angle: -90, position: "insideLeft" }} 
          tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`} // Convert to billions
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Bar dataKey="revenue" fill="#6266F1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeStatementChart;
