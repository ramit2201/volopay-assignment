import React from "react";

const CompanyDetails = ({ name, description, symbol, exchange, industry, country }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <p className="text-2xl font-bold text-white">{name}</p>
      <p className="text-white">{description}</p>
      <p className="text-white"><i className="fa-regular fa-id-card"></i> {symbol}</p>
      <p className="text-white"><i className="fa-regular fa-gem"></i> {exchange}</p>
      <p className="text-white"><i className="fa-solid fa-building"></i> {industry}</p>
      <p className="text-white"><i className="fa-solid fa-location-dot"></i> {country}</p>
    </div>
  );
};

export default CompanyDetails;
