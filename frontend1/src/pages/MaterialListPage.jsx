import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // pentru navigare între pagini
import axios from "axios";
import Navbar from "../components/Navbar";

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate(); // Hook pentru navigare

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:8086/api/materiale");
        setMaterials(response.data);
      } catch (error) {
        console.error("Eroare la încărcarea materialelor:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ești sigur că vrei să ștergi acest material?")) {
      try {
        await axios.delete(`http://localhost:8086/api/materiale/${id}`);
        setMaterials((prev) => prev.filter((material) => material.id !== id));
        alert("Material șters cu succes!");
      } catch (error) {
        console.error("Eroare la ștergerea materialului:", error);
        alert("A apărut o eroare. Încearcă din nou.");
      }
    }
  };

  return (
    <div>  
      <Navbar/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista Materialelor</h2>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Adaugă Material
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="bg-white p-4 shadow rounded">
            <h3 className="font-bold text-lg">{material.titlu}</h3>
            <p className="text-gray-700">{material.descriere}</p>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Vezi mai mult
              </a>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/view/${material.id}`)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Vizualizează
                </button>
                <button
                  onClick={() => navigate(`/edit/${material.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Editează
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Șterge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default MaterialList;
