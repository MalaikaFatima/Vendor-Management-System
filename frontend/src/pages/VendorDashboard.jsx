import { useEffect, useState } from "react";
import api from "../services/api";


function VendorDashboard() {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true); const [showForm, setShowForm] = useState(false);

    const [quotationId, setQuotationId] = useState(null);

    const [vendors, setVendors] = useState([]);

    const [formData, setFormData] = useState({

        amount: "",
        delivery_time: "",
        notes: ""
    });

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
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
            ,
        });
    };

    const submitQuote = async (e) => {
        e.preventDefault();

        try {
            await api.post("/quotes", {
                quotation_id: quotationId,
                amount: formData.amount,
                delivery_time: formData.delivery_time,
                notes: formData.notes,
            });

            alert("Quote Submitted Successfully");

            setShowForm(false);

            setFormData({
                amount: "",
                delivery_time: "",
                notes: "",
            });

            getQuotations();

        } catch (error) {
            console.log(error.response.data);

            alert(JSON.stringify(error.response.data));

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

            <h1 className="text-3xl font-bold mb-6">
                Vendor Dashboard
            </h1>
            {showForm && (

                <form
                    onSubmit={submitQuote}
                    className="mb-6 rounded-xl border p-6 bg-white shadow"
                >

                    <h2 className="text-xl font-bold mb-5">
                        Submit Quote
                    </h2>

                    <input
                        type="number"
                        name="amount"
                        placeholder="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="mb-4 w-full rounded border p-3"
                    />

                    <input
                        type="text"
                        name="delivery_time"
                        placeholder="Delivery Time"
                        value={formData.delivery_time}
                        onChange={handleChange}
                        className="mb-4 w-full rounded border p-3"
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="mb-4 w-full rounded border p-3"
                    />

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                        >
                            Submit Quote
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded border px-5 py-2"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            )}
            <table className="w-full border border-gray-300">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-3">Title</th>
                        <th className="border p-3">Description</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Action</th>
                    </tr>
                </thead>

                <tbody>

                    {quotations.map((quotation) => (

                        <tr key={quotation.id}>
                            <td className="border p-3">
                                {quotation.title}
                            </td>

                            <td className="border p-3">
                                {quotation.description}
                            </td>

                            <td className="border p-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${quotation.status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : quotation.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {quotation.status}
                                </span>
                            </td>

                            <td className="border p-3">

                                <button onClick={() => {

                                    setQuotationId(quotation.id);

                                    setShowForm(true);

                                }}
                                    className="rounded-lg border border-blue-200 px-3 py-2 text-blue-700"
                                >
                                    Submit Quote
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default VendorDashboard;