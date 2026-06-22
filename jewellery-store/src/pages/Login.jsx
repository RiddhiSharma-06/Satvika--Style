import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  // SEND OTP
  const sendOtp = async () => {
     console.log("SEND OTP CLICKED");
    try {
      if (!email) {
        alert("Enter Email");
        return;
      }

      await API.post("/auth/send-otp", { email });

      setOtpSent(true);
      alert("OTP sent successfully");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
    
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="w-full bg-pink-500 text-white py-3 rounded-xl"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-pink-500 text-white py-3 rounded-xl"
            >
              Verify OTP
            </button>
          </>
        )}

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;