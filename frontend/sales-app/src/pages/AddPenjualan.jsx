// src/pages/AddPenjualan.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import NavButton from "../components/NavButton";

const AddPenjualan = () => {
  const [formData, setFormData] = useState({
    transaction_number: "",
    marketing_Id: "",
    date: "",
    cargo_fee: "",
    total_balance: "",
    grand_total: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/api/sales", formData);
      setSuccess(true);
      setFormData({
        transaction_number: "",
        marketing_Id: "",
        date: "",
        cargo_fee: "",
        total_balance: "",
        grand_total: "",
      });
      setTimeout(() => {
        location.reload;
        /* navigate("/"); */
      }, 0);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Tambah Penjualan
      </h2>

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6"
          role="alert"
        >
          <p>Data berhasil ditambahkan!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="transaction_number"
              className="label block text-sm font-medium text-gray-700 mb-1"
            >
              <span className="label-text">Transaction Number</span>
            </label>
            <input
              type="text"
              id="transaction_number"
              name="transaction_number"
              value={formData.transaction_number}
              onChange={handleChange}
              placeholder="Masukkan transaction number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="marketing_Id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <span className="label-text">Marketing ID</span>
            </label>
            <input
              type="text"
              id="marketing_Id"
              name="marketing_Id"
              value={formData.marketing_Id}
              onChange={handleChange}
              placeholder="Masukkan marketing ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="form-control grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="cargo_fee"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <span className="label-text">Cargo Fee</span>
            </label>
            <input
              type="number"
              id="cargo_fee"
              name="cargo_fee"
              value={formData.cargo_fee}
              onChange={handleChange}
              placeholder="Masukkan cargo fee"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="total_balance"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <span className="label-text">Total Balance</span>
            </label>
            <input
              type="number"
              id="total_balance"
              name="total_balance"
              value={formData.total_balance}
              onChange={handleChange}
              placeholder="Masukkan total balance"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="grand_total"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <span className="label-text">Grand Total</span>
            </label>
            <input
              type="number"
              id="grand_total"
              name="grand_total"
              value={formData.grand_total}
              onChange={handleChange}
              placeholder="Masukkan grand total"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <NavButton url={"/"} styling={"withoutBg"}>
            Balik
          </NavButton>
          <button
            type="submit"
            className={`!bg-amber-600 border-2 !text-amber-50 rounded-xl !px-3 !py-1 hover:opacity-90 active:opacity-70 transition-all duration-250 !border-none ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Sedang mengirim..." : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPenjualan;
