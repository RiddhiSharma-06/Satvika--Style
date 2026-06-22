import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-4xl font-bold mb-6">
          My Profile
        </h1>

        {user ? (
          <div className="space-y-4 text-lg">

            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Phone:</strong> {user.phone || "Not provided"}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

          </div>
        ) : (
          <p className="text-gray-500">
            No user data found. Please login again.
          </p>
        )}

      </div>
    </div>
  );
}

export default Profile;