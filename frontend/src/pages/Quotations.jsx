import { useEffect,useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";


function Quotations() {
const[quotations,setQuotations] = useState([]);
const[loading,setLoading] = useState(true);
const [search, setSearch] = useState("");
const [status, setStatus] = useState("all");
const [showForm, setShowForm] = useState(false);
const[editingQuotationId,setEditingQuotationId] = useState(null);
const[formData,setFormData] = useState({
  title: "",
  description : "", 
});


const getQuotations = async () => {

try{
const response = await api.get(`/quotations?search=${search}&status=${status}`);
setQuotations(response.data.data.data);



}catch(error){
    console.error("Error fetching quotations:", error);
    setLoading(false);
  }finally{
    setLoading(false);
  }
};

const handleChange = (e) => {

setFormData({
...formData,    
[e.target.name]: e.target.value
});

};

const createQuotation = async (e) => {
  e.preventDefault();

  try {
    await api.post("/quotations", formData);

    toast.success("Quotation created");

    setShowForm(false);

    setFormData({
      title: "",
      description: "",
    });

    getQuotations();

  } catch (error) {
    toast.error("Failed to create quotation");
  }
};
const handleEdit = (quotation) => {

  setEditingQuotationId(quotation.id);

  setFormData({
    title: quotation.title,
    description: quotation.description,
  });showForm(false);

};

const updateQuotation = async (e) => {

  e.preventDefault();

  try {

    await api.put(`/quotations/${editingQuotationId}`, formData);

    toast.success("Quotation updated");

    setEditingQuotationId(null);
    setFormData({
      title: "",
      description: "",
    });
    getQuotations();

  } catch (error) {

    toast.error("Failed to update");

  }

};

const deleteQuotation = async (id) => {

  if (!window.confirm("Delete quotation?")) return;

  try {

    await api.delete(`/quotations/${id}`);

    toast.success("Quotation deleted");

    getQuotations();

  } catch (error) {

    toast.error("Delete failed");

  }

};


useEffect(() => {
    getQuotations();
  }, [search,status]);

  if(loading){
      
      return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Quotations
      </h1>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

<div className="flex gap-3">

  <input
    type="text"
    placeholder="Search quotations..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-72 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-gray-700"
  >
    <option value="all">All Status</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>

</div>

<button
onClick={() => setShowForm(!showForm)}
className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
>
{showForm ? "Close" : "+ Add Quotation"}
</button>

</div>


{showForm && (
<form
onSubmit={createQuotation}
className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
>

<h2 className="mb-5 text-lg font-semibold">
Add Quotation
</h2>

<input
type="text"
name="title"
placeholder="Quotation Title"
value={formData.title}
onChange={handleChange}
className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3"
/>

<textarea
name="description"
placeholder="Description"
rows="4"
value={formData.description}
onChange={handleChange}
className="w-full rounded-xl border border-gray-300 px-4 py-3"
/>

<div className="mt-5 flex gap-3">

<button
type="submit"
className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
>
Save
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
{editingQuotationId && (
  <form
    onSubmit={updateQuotation}
    className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
  >

    <h2 className="mb-5 text-lg font-semibold">
      Edit Quotation
    </h2>

    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
    />

    <textarea
      name="description"
      rows="4"
      value={formData.description}
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
    />

    <div className="mt-5 flex gap-3">

      <button
        type="submit"
        className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
      >
        Update
      </button>

      <button
        type="button"
        onClick={() => setEditingQuotationId(null)}
        className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>

    </div>

  </form>
)}

      <table className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <thead className="bg-gray-100">
  <tr>
    <th className="border p-3">Title</th>
    <th className="border p-3">Description</th>
    <th className="border p-3">Status</th>
    <th className="border p-3">Quotes</th>
    <th className="border p-3">Action</th>
  </tr>
</thead>
<tbody>

{quotations.map((quotation) => (  
  
  <tr key={quotation.id}>
    <td className="border p-3">{quotation.title}</td>
    <td className="border p-3">{quotation.description}</td>
    <td className="border p-3"><span
  className={`rounded-full px-3 py-1 text-sm font-medium ${
    quotation.status === "approved"
      ? "bg-green-100 text-green-700"
      : quotation.status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {quotation.status}
</span></td>
    <td className="border p-3">{quotation.quotes.length}</td>

   
    <td className="border p-3">
    <div className="flex gap-2 flex-wrap">
      <button
      onClick={() => handleEdit(quotation)}

      className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">
        Edit
      </button>
      <button onClick={() => deleteQuotation(quotation.id)}

      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
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

};export default Quotations;