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
  // const totalVisitors = CountryVsVisitor.reduce((accumulator, target) => {
  //   return accumulator + target.totalVisitor;
  // }, 0);
  // console.log(totalVisitors);
  return (
    <div className="columnChartContainer">
      <div className="axes">
        {CountryVsVisitor.map(({ country, totalVisitor }) => {
          return (
            <div className="columns">
              <div className="countryName">{country}</div>
              <div className="numOfVisitors" style={{height:`${(totalVisitor/2229)*100}%`}}>{totalVisitor}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnChart;
