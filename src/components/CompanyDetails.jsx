import { useSelector } from "react-redux";
import { selectCompanyData, selectLoadingCompany } from "../redux/selectors/company";
import Loader from "./core/Loader";

const CompanyDetails = () => {
  const companyData = useSelector(selectCompanyData);
  const loadingCompany = useSelector(selectLoadingCompany);

  if (loadingCompany) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader />
      </div>
    );
  }

  if (!companyData) {
    return <p className="text-white">No company data available.</p>;
  }

  const companyInfo = [
    { label: "Name", value: companyData.Name },
    { label: "Description", value: companyData.Description },
    { label: "Symbol", value: companyData.Symbol, icon: "fa-regular fa-id-card" },
    { label: "Exchange", value: companyData.Exchange, icon: "fa-regular fa-gem" },
    { label: "Industry", value: companyData.Industry, icon: "fa-solid fa-building" },
    { label: "Country", value: companyData.Country, icon: "fa-solid fa-location-dot" }
  ];

  return (
    <div className="flex flex-col gap-4 mt-4">
      {companyInfo.map((info, index) => (
        <p key={index} className="text-white">
          {info.icon && <i className={`${info.icon} mr-2`}></i>}
          {info.value}
        </p>
      ))}
    </div>
  );
};

export default CompanyDetails;
