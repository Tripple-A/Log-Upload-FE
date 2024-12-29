import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TenantPage() {
  const [tenant, setTenant] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tenant and customer data
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/tenants/1");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setTenant(result.tenant);
      setCustomers(result.tenant.customers);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setUploadStatus(null);
      const response = await fetch("http://localhost:8000/usage/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(result.message);
      } else {
        const error = await response.json();
        setUploadStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setUploadStatus("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  if (!tenant) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{tenant.name}</h1>
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link to={`tenants/${tenant.id}/customer/${customer.id}`}>
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="upload-section">
        <h2>Upload Billing Usage</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={loading}
          className="button"
        />
        {loading && <p>Uploading file...</p>}
        {uploadStatus && (
          <p className={error ? "red" : "green"}>{uploadStatus}</p>
        )}
      </div>
    </div>
  );
}

export default TenantPage;
