import { useEffect, useState, useRef } from "react";
import api from "../services/api";

function Comparison() {
  const [quotations, setQuotations] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  const resultRef = useRef(null);

  const getQuotations = async () => {
    try {
      const response = await api.get("/quotations");
      setQuotations(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const compareQuotes = async (id) => {
    try {
      const response = await api.get(`/quotations/${id}/compare`);

      setComparison(response.data.data);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotations();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Compare Quotations
      </h1>

      <div className="space-y-4">
        {quotations.map((quotation) => (
          <div
            key={quotation.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h2 className="font-semibold">
                {quotation.title}
              </h2>

              <p className="text-gray-500">
                {quotation.description}
              </p>
            </div>

            <button
              onClick={() => compareQuotes(quotation.id)}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
            >
              Compare Quotes
            </button>
          </div>
        ))}
      </div>

      {comparison && (
        <div ref={resultRef} className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Comparison Result
          </h2>

          {comparison.quotes.length === 0 ? (
            <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
              No quotes submitted yet for this quotation.
            </div>
          ) : (
            <>
              <table className="mt-4 w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3">Vendor</th>
                    <th className="border p-3">Amount</th>
                    <th className="border p-3">Delivery</th>
                    <th className="border p-3">Notes</th>
                  </tr>
                </thead>

                <tbody>
                  {comparison.quotes.map((quote) => (
                    <tr key={quote.id}>
                      <td className="border p-3">
                        {quote.vendor.vendor_name}
                      </td>

                      <td className="border p-3">
                        Rs. {quote.amount}
                      </td>

                      <td className="border p-3">
                        {quote.delivery_time} Days
                      </td>

                      <td className="border p-3">
                        {quote.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {comparison.cheapest && (
                <div className="mt-6 rounded-lg bg-green-100 p-4">
                  <h3 className="mb-3 text-lg font-bold">
                    Cheapest Vendor
                  </h3>

                  <p>
                    <strong>Vendor:</strong>{" "}
                    {comparison.cheapest.vendor.vendor_name}
                  </p>

                  <p>
                    <strong>Amount:</strong> Rs.{" "}
                    {comparison.cheapest.amount}
                  </p>

                  <p>
                    <strong>Delivery:</strong>{" "}
                    {comparison.cheapest.delivery_time} Days
                  </p>

                  <p>
                    <strong>Notes:</strong>{" "}
                    {comparison.cheapest.notes}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Comparison;