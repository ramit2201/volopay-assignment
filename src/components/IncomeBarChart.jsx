import { useSelector } from "react-redux";
import { selectIncomeStatement, selectLoadingIncome } from "../redux/selectors/company";
import Loader from "./core/Loader";
import IncomeStatementChart from "./IncomeStatementChart";

const IncomeBarChart = () => {
  const incomeStatement = useSelector(selectIncomeStatement);
  const loadingIncome = useSelector(selectLoadingIncome);

  // Transform API data for the chart
  const chartData = incomeStatement?.annualReports?.map(report => ({
    fiscalDate: report.fiscalDateEnding,
    revenue: Number(report.totalRevenue),
  })) || [];

  if (loadingIncome) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader />
      </div>
    );
  }

  if (chartData.length === 0) {
    return <p className="text-white">No income data available.</p>;
  }

  return <IncomeStatementChart data={chartData} />;
};

export default IncomeBarChart;
