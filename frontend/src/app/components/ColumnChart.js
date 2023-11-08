import React from "react";
import Data from "../data/csvjson.json";

const ColumnChart = () => {
  const CountryVsVisitor = [];
  Data.forEach((items) => {
    const { country, adults, children, babies } = items;
    const total = adults + children + babies;
    const existingCountryIndex = CountryVsVisitor.findIndex(
      (element) => element.country === country
    );
    if (existingCountryIndex !== -1) {
      CountryVsVisitor[existingCountryIndex].totalVisitor += total;
    } else {
      const newCountry = { country: country, totalVisitor: total };
      CountryVsVisitor.push(newCountry);
    }
  });
  return (
    <div className="columnChartContainer">
      <div className="axes"></div>
    </div>
  );
};

export default ColumnChart;
