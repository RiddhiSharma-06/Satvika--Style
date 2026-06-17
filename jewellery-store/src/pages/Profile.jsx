function Profile() {
  const name = localStorage.getItem("userName");
  const phone = localStorage.getItem("phone");

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-4xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4 text-lg">

          <p>
            <strong>Name:</strong> {name}
          </p>

          <p>
            <strong>Phone:</strong> {phone}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;