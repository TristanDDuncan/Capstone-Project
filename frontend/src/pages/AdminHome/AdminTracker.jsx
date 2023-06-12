import React, { useState,useEffect } from 'react';
import { Chart } from "react-google-charts"







export const options = {
    title: "Total Of Subscriptions Across The U.S",
    chartArea: { width: "50%" },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
      title: "Popularity",
      minValue: 0,
    },
    vAxis: {
      title: "Subscription",
    },
  };
  const AdminTracker = (props) => {
    const chartData = [
      ["Subscription", "Subscribers"],
      ["Copper", 3], // Example with numeric Y axis value
      ["Silver", 3],
      ["Gold", 4], 
      ["Platinum", 5], // Example with numeric Y axis value
      ["Diamond", 2], 
      // Add more data rows here if needed
    ];
  
    return (
      <Chart
        chartType="BarChart"
        data={chartData}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    );
  };
  
  
  

export default AdminTracker;