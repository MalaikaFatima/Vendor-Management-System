import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import Quotations from "./pages/Quotations";
import Comparison from "./pages/Comparison";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuotationQuotes from "./pages/QuotationQuotes";
import VendorDashboard from "./pages/VendorDashboard";

import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            <Route path="/" element={<Dashboard />} />

<Route path="/vendor_dashboard" element={<VendorDashboard/>}/>
            <Route path="/vendors" element={<Vendors />} />

            <Route path="/quotations" element={<Quotations />} />

            <Route path="/comparison" element={<Comparison />} />

            <Route path="/history" element={<History />} />

            <Route path="/quotations/:id/quotes" element={<QuotationQuotes />} />


            <Route path="/profile" element={<Profile />} />
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;