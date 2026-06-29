import { useEffect, useState } from "react";
import api from "../services/api";

function History() {

  const [history, setHistory] = useState([]);

  const getHistory = async () => {

    try {

      const response = await api.get("/history");

      setHistory(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Quote History
      </h1>

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-3">Quotation</th>

            <th className="border p-3">Vendor</th>

            <th className="border p-3">Amount</th>

            <th className="border p-3">Delivery</th>

            <th className="border p-3">Status</th>

            <th className="border p-3">Submitted</th>

          </tr>

        </thead>

        <tbody>

          {history.map((item) => (

            <tr key={item.id}>

              <td className="border p-3">
                {item.quotation.title}
              </td>

              <td className="border p-3">
                {item.vendor.vendor_name}
              </td>

              <td className="border p-3">
                Rs. {item.amount}
              </td>

              <td className="border p-3">
                {item.delivery_time} Days
              </td>

              <td className="border p-3">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>

              </td>

              <td className="border p-3">
                {item.submitted_date}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default History;