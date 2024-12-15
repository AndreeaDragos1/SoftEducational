import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function UpdateMaterial({ id }) {
  const [formData, setFormData] = useState({
    titlu: "",
    descriere: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8086/api/materiale/${id}`, formData);
      console.log("Material actualizat:", response.data);
      alert("Material actualizat cu succes!");
    } catch (error) {
      console.error("Eroare la actualizarea materialului:", error);
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Actualizează Materialul</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Titlu:</label>
            <input
              type="text"
              name="titlu"
              value={formData.titlu}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Descriere:</label>
            <textarea
              name="descriere"
              value={formData.descriere}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Actualizează
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default UpdateMaterial;
