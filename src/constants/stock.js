// Headers for Company Contacts Table
export const COMPANY_HEADERS = ["Company", "Contact", "Country"];

// Headers for Stock Table
export const STOCK_HEADERS = {
  Ticker: "Ticker",
  Price: "Price",
  ChangeAmount: "Change Amount",
  ChangePercentage: "Change Percentage",
};

// Convert STOCK_HEADERS object values into an array for table use
export const STOCK_TABLE_HEADERS = Object.values(STOCK_HEADERS);
