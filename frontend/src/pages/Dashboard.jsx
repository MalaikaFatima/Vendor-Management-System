import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const getDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

        <div className="rounded-xl border p-5">
          <h3 className="text-gray-500">Total Vendors</h3>
          <p className="mt-2 text-3xl font-bold">
            {dashboard.stats.total_vendors}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-gray-500">Total Quotations</h3>
          <p className="mt-2 text-3xl font-bold">
            {dashboard.stats.total_quotations}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-gray-500">Active Quotations</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {dashboard.stats.active_quotations}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-gray-500">Pending Quotations
          </h3>
          <p className="mt-2 text-3xl font-bold text-yellow-600">
            {dashboard.stats.pending_quotations}
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="text-gray-500">Approved Quotations</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {dashboard.stats.approved_quotations}
          </p>
        </div>

      </div>

      {/* Recent Activities */}

      <div className="mt-8 rounded-xl border p-6">

        <h2 className="mb-5 text-xl font-bold">
          Recent Activities
        </h2>

        <div className="space-y-4">

          {dashboard.recent_activities.map((activity, index) => (

            <div
              key={index}
              className="flex justify-between border-b pb-3"
            >

              <div>

                <p className="font-medium">
                  {activity.message}
                </p>

                <p className="text-sm text-gray-500">
                  {activity.type}
                </p>

              </div>

              <span className="text-sm text-gray-400">
                {activity.time}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;