import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ViewMaterial() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/api/materiale/${id}`);
        setMaterial(response.data);
      } catch (error) {
        console.error("Eroare la încărcarea materialului:", error);
      }
    };
    fetchMaterial();
  }, [id]);

  if (!material) return <p>Se încarcă...</p>;

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">{material.titlu}</h1>
        <p className="text-gray-700 mb-4">{material.descriere}</p>
        <a
          href={material.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Vezi Materialul
        </a>
      </div>
    </div>
    </div>
  );
}

export default ViewMaterial;
