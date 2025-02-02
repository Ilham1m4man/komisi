import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import "./App.css";
import SalesTable from "./components/SalesTables";
import AddMarketing from "./pages/addMarketing";
import HomePage from "./pages/HomePage";
import AddPenjualan from "./pages/AddPenjualan";
import CommisionPage from "./pages/CommisionPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="*"
            element={
              <div>
                <h1>You are in the unknown place!!!</h1>
                <Link to="/">go back</Link>
              </div>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/commisiontable" element={<CommisionPage />} />
          <Route path="/salestable" element={<SalesTable />} />
          <Route path="/salestable/add" element={<AddPenjualan />} />
          <Route path="/marketing/add" element={<AddMarketing />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
