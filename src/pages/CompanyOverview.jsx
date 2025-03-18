import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCompany, fetchIncomeStatementData } from "../redux/reducers/company";
import CompanyDetails from "../components/CompanyDetails";
import IncomeBarChart from "../components/IncomeBarChart";

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(fetchIncomeStatementData());
  }, [dispatch]);

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
        <CompanyDetails />

        {/* Income Statement Chart */}
        <h2 className="text-xl font-bold mt-6 text-white">Income Statement</h2>
        <IncomeBarChart />
      </div>
    </div>
  );
};

export default CompanyOverview;
