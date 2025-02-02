import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { fetchMarketingData } from "../services/api";
import NavButton from "../components/NavButton";

const AddMarketing = () => {
  const [salesName, setSalesName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchMarketingData().then((item) => setData(item));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/api/marketing", {
        name: salesName,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Tambah Data Marketing💸</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Data yang udah ada</h3>
        <div className="overflow-x-auto bg-white shadow-sm rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data &&
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="py-3 px-6 text-left">{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          Data berhasil ditambahkan!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="form-control mb-4">
          <label className="label" htmlFor="salesperson_name">
            <span className="block text-gray-700 text-sm font-bold mb-2">
              Nama Sales
            </span>
          </label>
          <input
            type="text"
            id="salesperson_name"
            name="salesperson_name"
            value={salesName}
            onChange={(e) => setSalesName(e.target.value)}
            placeholder="Masukkan nama sales"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
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

export default AddMarketing;
