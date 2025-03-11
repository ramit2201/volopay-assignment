import { createSelector } from "@reduxjs/toolkit";

const selectCompanyState = (state) => state.company;

export const selectCompanyData = createSelector(
    [selectCompanyState],
    (company) => company.companyData || []
  );
  
  export const selectIncomeStatement = createSelector(
    [selectCompanyState],
    (company) => company.incomeStatement || []
  );