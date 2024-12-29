import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ChartRenderer from "./ChartRenderer";

const CustomerPage = () => {
  const { tenantId, customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [usageData, setUsageData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch customer details
    fetch(`http://localhost:8000/tenants/${tenantId}/customers/${customerId}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .catch((err) => console.error(err));
  }, [customerId]);

  const fetchUsage = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/customers/${customerId}/usage?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setUsageData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{customer.name}</h1>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Created At:</strong> {customer.createdAt.split("T")[0]}
      </p>
      <p>
        <strong>Under Company:</strong> {customer.tenant.name}
      </p>
      <Link to="/">
        <button>Back to Tenant</button>
      </Link>

      <div className="container grey">
        <h1>Usage Data</h1>
        <div className="date-range">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button onClick={fetchUsage} disabled={loading}>
            {loading ? "Fetching..." : "View Usage"}
          </button>
        </div>
        {usageData.length === 0 && !loading && (
          <p className="red">
            No usage data available for the selected time period.
          </p>
        )}
        {usageData.length > 0 && <ChartRenderer usageData={usageData} />}
      </div>
    </div>
  );
};

export default CustomerPage;
