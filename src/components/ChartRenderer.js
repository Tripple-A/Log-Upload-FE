import React from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale);

const ChartRenderer = ({ usageData }) => {
  const processUsageData = () => {
    const modeCounts = {};
    const modeCosts = {};
    const productCounts = {};
    const productCosts = {};

    usageData.forEach((entry) => {
      const { mode, product, cost } = entry;

      // Group by mode
      if (!modeCounts[mode]) {
        modeCounts[mode] = 0;
        modeCosts[mode] = 0;
      }
      modeCounts[mode] += 1;
      modeCosts[mode] += cost;

      // Group by product
      if (!productCounts[product]) {
        productCounts[product] = 0;
        productCosts[product] = 0;
      }
      productCounts[product] += 1;
      productCosts[product] += cost;
    });

    const modes = Object.keys(modeCounts);
    const products = Object.keys(productCounts);

    return {
      modes,
      modeCounts: modes.map((mode) => modeCounts[mode]),
      modeCosts: modes.map((mode) => modeCosts[mode]),
      products,
      productCounts: products.map((product) => productCounts[product]),
      productCosts: products.map((product) => productCosts[product]),
    };
  };

  const chartData = processUsageData();

  return (
    <div className="charts">
      <h2>Usage Graphs</h2>
      {/* Row 1: Count by Mode and Cost by Mode */}
      <div className="chart-row">
        <div className="chart">
          <h3>Count by Mode</h3>
          <Bar
            data={{
              labels: chartData.modes,
              datasets: [
                {
                  label: "Count by Mode",
                  data: chartData.modeCounts,
                  backgroundColor: "rgba(75,192,192,0.6)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
        <div className="chart">
          <h3>Cost by Mode</h3>
          <Bar
            data={{
              labels: chartData.modes,
              datasets: [
                {
                  label: "Total Cost by Mode",
                  data: chartData.modeCosts,
                  backgroundColor: "rgba(153,102,255,0.6)",
                  borderColor: "rgba(153,102,255,1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
      {/* Row 2: Count by Product and Cost by Product */}
      <div className="chart-row">
        <div className="chart">
          <h3>Count by Product</h3>
          <Bar
            data={{
              labels: chartData.products,
              datasets: [
                {
                  label: "Count by Product",
                  data: chartData.productCounts,
                  backgroundColor: "rgba(255,159,64,0.6)",
                  borderColor: "rgba(255,159,64,1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
        <div className="chart">
          <h3>Cost by Product</h3>
          <Bar
            data={{
              labels: chartData.products,
              datasets: [
                {
                  label: "Total Cost by Product",
                  data: chartData.productCosts,
                  backgroundColor: "rgba(54,162,235,0.6)",
                  borderColor: "rgba(54,162,235,1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartRenderer;
