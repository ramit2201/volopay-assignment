const CompanyDetails = ({ name, description, symbol, exchange, industry, country }) => {
  const companyInfo = [
    { label: "Name", value: name },
    { label: "Description", value: description },
    { label: "Symbol", value: symbol, icon: "fa-regular fa-id-card" },
    { label: "Exchange", value: exchange, icon: "fa-regular fa-gem" },
    { label: "Industry", value: industry, icon: "fa-solid fa-building" },
    { label: "Country", value: country, icon: "fa-solid fa-location-dot" }
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
