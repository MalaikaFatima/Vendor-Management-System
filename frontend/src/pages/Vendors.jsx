import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Vendors() {

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingVendorId, setEditingVendorId] = useState(null);
  const [formData, setFormData] = useState({
    vendor_name: "",
    company_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const getVendors = async () => {
    try {
      const response = await api.get(`/vendors?search=${search}&status=${status}`);
      setVendors(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const approveVendor = async (vendorId) => {
    try {
      const response = await api.patch(`/vendors/${vendorId}/approve`);
      toast.success("Vendor approved successfully");
      getVendors();
    }
    catch (error) {
      toast.error("Failed to approve vendor");
    };
  };

  const rejectVendor = async (vendorId) => {
    try {
      await api.patch(`/vendors/${vendorId}/reject`);
      toast.success("Vendor Rejected");
      getVendors();
    }
    catch (error) {
      toast.error("Failed to reject vendor");
    };
  };
  const deleteVendor = async (vendorId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(`/vendors/${vendorId}`);

      toast.success("Vendor deleted successfully");

      getVendors();

    } catch (error) {

      toast.error("Failed to delete vendor");

    }

  };

  const handleEdit = (vendor) => {
    setEditingVendorId(vendor.id);
    setFormData({
      vendor_name: vendor.vendor_name,
      company_name: vendor.company_name,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
    });
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };
  const updateVendor = async (event) => {
    event.preventDefault();
    try {

      await api.put(`/vendors/${editingVendorId}`, formData);
      toast.success("Vendor updated successfully");
      setEditingVendorId(null);
      getVendors();
    } catch (error) {
      toast.error("Failed to update vendor");

    }
  };

  const createVendor = async (event) => {

    event.preventDefault();
    try {
      await api.post("/vendors", formData);
      toast.success("Vendor created successfully");
      setFormData({
        vendor_name: "",
        company_name: "",
        email: "",
        phone: "",
        address: "",
      });
      setShowForm(false);
      getVendors();
    } catch (error) {
      toast.error("Failed to create vendor");
    }
  };



  useEffect(() => {
    getVendors();
  }, [search, status]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="p-6">

      <h1 className="mb-6 text-2xl font-bold">
        Vendors
      </h1>


      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-blue-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none  focus:border-blue-300"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>

        <button onClick={() => setShowForm(!showForm)}

          className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
        >
          {showForm ? "close" : "+ Add Vendor"}
        </button>

      </div>
      {showForm && (
        <form onSubmit={createVendor} 
        className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold">
            Add Vendor
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="vendor_name"
              placeholder="Vendor Name"
              value={formData.vendor_name}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          <textarea
            name="address"
            placeholder="Business Address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <div className="mt-5 flex gap-3">

            <button
              type="submit"
              className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Save Vendor
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

          </div>

        </form>
      )}





      {editingVendorId && (
        <form onSubmit={updateVendor} className="mb-6 rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Edit Vendor
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="vendor_name"
              value={formData.vendor_name}
              onChange={handleChange}
              placeholder="Vendor Name"
              className="rounded border p-2"
            />

            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="rounded border p-2"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded border p-2"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="rounded border p-2"
            />

          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="mt-4 w-full rounded border p-2"
            rows="3"
          />

          <div className="mt-4 flex gap-3">

            <button
              type="submit"
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => setEditingVendorId(null)}
              className="rounded border px-5 py-2"
            >
              Cancel
            </button>

          </div>
        </form>
      )}


      <table className="w-full border border-gray-500">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Name</th>
            <th className="border p-3">Company</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Action</th>
          </tr>

        </thead>

        <tbody>

          {vendors.map((vendor) => (

            <tr key={vendor.id}>

              <td className="border p-2">
                {vendor.vendor_name}
              </td>

              <td className="border p-3">
                {vendor.company_name}
              </td>

              <td className="border p-3">
                {vendor.email}
              </td>

              <td className="border p-3">
                {vendor.phone}
              </td>
              <td className="border p-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${vendor.status === "active"
                    ? "bg-green-100 text-green-700"
                    : vendor.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {vendor.status}
                </span>
              </td>
              <td className="border p-3">

                <div className="flex gap-2 flex-wrap">

                  {vendor.status === "pending" && (
                    <>
                      <button
                        onClick={() => approveVendor(vendor.id)}
                        className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectVendor(vendor.id)}
                        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleEdit(vendor)}
                    className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteVendor(vendor.id)}
                    className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>

                </div>

              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};
export default Vendors;