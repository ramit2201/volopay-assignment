import { createSelector } from "@reduxjs/toolkit";

const selectCompanyState = (state) => state.company;

export const selectCompanyOverview = createSelector(
    [selectCompanyState],
    (company) => company.overview || []
  );
  
  export const selectIncomeStatement = createSelector(
    [selectCompanyState],
    (company) => company.incomeStatement || []
  );