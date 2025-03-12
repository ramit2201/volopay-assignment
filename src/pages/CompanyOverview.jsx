import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCompany, fetchIncomeStatementData } from "../redux/reducers/company";
import { selectCompanyData, selectIncomeStatement } from "../redux/selectors/company";
import CompanyDetails from "../components/CompanyDetails";
import IncomeStatementChart from "../components/IncomeStatementChart";
import Loader from "../components/core/loader";

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook
  const companyData = useSelector(selectCompanyData);
  const incomeStatement = useSelector(selectIncomeStatement);

  // Loading state
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingIncome, setLoadingIncome] = useState(true);

  useEffect(() => {
    dispatch(fetchCompany()).finally(() => setLoadingCompany(false));
    dispatch(fetchIncomeStatementData()).finally(() => setLoadingIncome(false));
  }, [dispatch]);

  // Transform income statement data for chart
  const chartData = incomeStatement?.annualReports?.map(report => ({
    fiscalDate: report.fiscalDateEnding,
    revenue: Number(report.totalRevenue), 
  })).reverse();

  return (
    <div className="p-4">
      <div className="px-8">
        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-4">
          <button 
            className="px-4 py-2 bg-sky-500 text-white rounded-md transition hover:bg-sky-600"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button 
            className="px-4 py-2 bg-sky-500 text-white rounded-md transition hover:bg-sky-600"
            onClick={() => navigate("/products")}
          >
           View Products
          </button>
          
        </div>

        {/* Company Details */}
        {loadingCompany ? <Loader /> : companyData && (
          <CompanyDetails
            name={companyData.Name}
            description={companyData.Description}
            symbol={companyData.Symbol}
            exchange={companyData.Exchange}
            industry={companyData.Industry}
            country={companyData.Country}
          />
        )}

        {/* Income Statement Chart */}
        <h2 className="text-xl font-bold mt-6 text-white">Income Statement</h2>
        {loadingIncome ? <Loader /> : <IncomeStatementChart data={chartData} />}
      </div>
    </div>
  );
};

export default CompanyOverview;
