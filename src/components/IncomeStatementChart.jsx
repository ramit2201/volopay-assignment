import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { AXIS_LABELS } from "../constants/company";

const IncomeStatementChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fiscalDate" label={AXIS_LABELS.xAxis} />
        <YAxis 
          dataKey="revenue" 
          label={AXIS_LABELS.yAxis}
          tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`}
        />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Bar dataKey="revenue" fill="#6266F1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeStatementChart;
