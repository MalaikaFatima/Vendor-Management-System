import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
function Vendors() {

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVendors = async () => {
    try {
      const response = await api.get("/vendors");
      setVendors(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const approveVendor = async (vendorId) => {
  try{
    const response = await api.patch(`/vendors/${vendorId}/approve`);
    toast.success("Vendor approved successfully");
    getVendors();
  }
  catch(error){
    toast.error("Failed to approve vendor");
  };
  };
  useEffect(() => {
    getVendors();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="p-6">

      <h1 className="mb-6 text-2xl font-bold">
        Vendors
      </h1>

      <table className="w-full border border-gray-300">

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
                {vendor.status === "pending" && (

              <div className="flex gap-2">


                <button onClick={()=> approveVendor(vendor.id)}  
                className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50">Approve</button>

                <button 
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50">Reject</button>
                </div>
                )}
              </td>
              


            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};
export default Vendors;