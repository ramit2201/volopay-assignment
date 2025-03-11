import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompany, fetchIncomeStatementData } from "../../redux/reducers/company";
import { selectCompanyData, selectIncomeStatement } from "../../redux/selector/company";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const companyData = useSelector(selectCompanyData);
  const incomeStatement = useSelector(selectIncomeStatement);

  // State to track loading status
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingIncome, setLoadingIncome] = useState(true);

  useEffect(() => {
    // Fetch company details
    dispatch(fetchCompany()).finally(() => setLoadingCompany(false));
    // Fetch income statement data
    dispatch(fetchIncomeStatementData()).finally(() => setLoadingIncome(false));
  }, [dispatch]);

  // Transform income statement data for the bar chart
  const chartData = incomeStatement?.annualReports?.map(report => ({
    fiscalDate: report.fiscalDateEnding,
    revenue: Number(report.totalRevenue), // Convert string to number
  })).reverse(); // Reverse to show the latest year at the right

  return (
    <div className="p-4">
      <div className="px-8">
        {/* Company Details */}
        {loadingCompany ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-white text-xl">Loading company details...</span>
          </div>
        ) : companyData ? (
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-2xl font-bold text-white">{companyData.Name}</p>
            <p className="text-white">{companyData.Description}</p>
            <p className="text-white"><i className="fa-regular fa-id-card"></i> {companyData.Symbol}</p>
            <p className="text-white"><i className="fa-regular fa-gem"></i> {companyData.Exchange}</p>
            <p className="text-white"><i className="fa-solid fa-building"></i> {companyData.Industry}</p>
            <p className="text-white"><i className="fa-solid fa-location-dot"></i> {companyData.Country}</p>
          </div>
        ) : (
          <p className="text-white">No company data available.</p>
        )}

        {/* Income Statement Bar Chart */}
        <h2 className="text-xl font-bold mt-6 text-white">Income Statement</h2>
        {loadingIncome ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-white text-xl">Loading income statement...</span>
          </div>
        ) : incomeStatement?.annualReports ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fiscalDate" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
              <YAxis 
                dataKey="revenue" 
                label={{ value: "Revenue (in $)", angle: -90, position: "insideLeft" }} 
                tickFormatter={(value) => `$${(value / 1e9).toFixed(1)}B`} // Convert to billions
              />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-white">No income statement data available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyOverview;
