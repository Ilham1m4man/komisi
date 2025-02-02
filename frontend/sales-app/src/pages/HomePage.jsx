import React from "react";
import NavButton from "../components/NavButton";

const HomePage = () => {
  return (
    <>
      <h1>Haiii, selamat datang🙌</h1>
      <div className="flex justify-center items-center my-4 gap-6">
        <NavButton url="/commisiontable" styling={"withBg"}>
          Tabel Perhitungan
        </NavButton>
        <NavButton url="/salestable/add" styling={"withBg"}>
          Tambah Penjualan
        </NavButton>
        <NavButton url="/salestable" styling={"withBg"}>
          Tabel Penjualan
        </NavButton>
        <NavButton url="/marketing/add" styling={"withBg"}>
          Tambah Tabel Marketing
        </NavButton>
      </div>
    </>
  );
};

export default HomePage;
