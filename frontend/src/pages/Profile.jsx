import { UserCircleIcon } from "@heroicons/react/24/outline";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <div className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-5">

          <UserCircleIcon className="h-20 w-20 text-sky-600" />

          <div>

            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-semibold">
              {user.name}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {user.email}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-semibold capitalize">
              {user.role}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {user.status}
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;