import { useState } from "react";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8086/api/register", {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          login,
          password,
          role,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSuccessMessage("User registered successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div><Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full border px-3 py-2 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full border px-3 py-2 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="login" className="block text-sm font-medium">
            Login
          </label>
          <input
            type="text"
            id="login"
            className="w-full border px-3 py-2 rounded-md"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border px-3 py-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            className="w-full border px-3 py-2 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
    </div>

    
  );
};

export default RegisterPage;
