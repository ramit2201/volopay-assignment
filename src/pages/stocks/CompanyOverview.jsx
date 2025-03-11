import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompany, fetchIncomeStatementData } from '../../redux/reducers/company';
import { selectCompanyData, selectIncomeStatement } from '../../redux/selector/company';

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const companyData = useSelector(selectCompanyData);
  const incomeStatement = useSelector(selectIncomeStatement);
  
  useEffect(() => {
    dispatch(fetchCompany());
    dispatch(fetchIncomeStatementData());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Company Overview</h1>

      {companyData ? (
        <div>
          <p><strong>Symbol:</strong> {companyData.Symbol}</p>
          <p><strong>Name:</strong> {companyData.Name}</p>
          <p><strong>Exchange:</strong> {companyData.Exchange}</p>
          <p><strong>Industry:</strong> {companyData.Industry}</p>
          <p><strong>Country:</strong> {companyData.Country}</p>
          <p><strong>Description:</strong> {companyData.Description}</p>
        </div>
      ) : (
        <p>Loading company data...</p>
      )}

      <h2 className="text-xl font-bold mt-6">Income Statement</h2>
      {incomeStatement?.annualReports ? (
        <ul>
          {incomeStatement.annualReports.map((report, index) => (
            <li key={index}>
              <strong>{report.fiscalDateEnding}:</strong> {report.totalRevenue}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading income statement data...</p>
      )}
    </div>
  );
};

export default CompanyOverview;
