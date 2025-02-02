import axios from "axios";

const apiUrl = "http://localhost:5000/api";

export const fetchSalesData = async () => {
  const response = await axios.get(`${apiUrl}/sales`);
  return response.data;
};

export const fetchMarketingData = async () => {
  const response = await axios.get(`${apiUrl}/marketing`);
  return response.data;
};

