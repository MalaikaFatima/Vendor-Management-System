import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
function QuotationQuotes() {

  const { id } = useParams();

  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {

    const response = await api.get(`/quotations/${id}/quotes`);

    setQuotes(response.data.data);

  };

  const updateStatus = async(id,status)=>{
try{await api.patch(`/quotes/${id}/status`, {status,
});
toast.success(`Quote ${status}`);

getQuotes();
}catch(error){console.log(error)}

  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Quotes
      </h1>

      <table className="w-full rounded-xl border border-gray-200">

<thead className="bg-gray-100">

<tr>

<th className="border p-3">Vendor</th>

<th className="border p-3">Amount</th>

<th className="border p-3">Delivery</th>

<th className="border p-3">Notes</th>

<th className="border p-3">Status</th>

<th className="border p-3">Action</th>

</tr>

</thead>

<tbody>

{quotes.map((quote) => (

<tr key={quote.id}>

<td className="border p-3">
{quote.vendor.vendor_name}
</td>

<td className="border p-3">
Rs. {quote.amount}
</td>

<td className="border p-3">
{quote.delivery_time}
</td>

<td className="border p-3">
{quote.notes}
</td>

<td className="border p-3">

<span
className={`rounded-full px-3 py-1 text-sm font-medium ${
quote.status === "approved"
? "bg-green-100 text-green-700"
: quote.status === "pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}`}
>

{quote.status}

</span>

</td>

<td className="border p-3">
<div className="flex gap-2 flex-wrap">

  {quote.status !== "approved" &&(
<button onClick={() => updateStatus(quote.id, "approved")}

className="rounded-lg border border-green-200 bg-white px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
>
Approve
</button>
  )}
{quote.status !== "rejected" && (
<button onClick={() => updateStatus(quote.id, "rejected")}

className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
>
Reject
</button>
)}
</div>
</td>

</tr>

))}

</tbody>

</table>

    </div>
  );

}

export default QuotationQuotes;