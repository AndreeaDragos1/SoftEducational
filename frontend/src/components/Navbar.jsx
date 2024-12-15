import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const Navbar = ({ authenticated }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Dacă utilizatorul este autentificat, obține numele utilizatorului
    if (authenticated) {
      fetch("http://localhost:8086/getUsername", {
        method: "GET",
        credentials: "include", // Asigură-te că trimiți cookie-urile
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Răspuns de la backend:", data); // Verifică răspunsul aici
          if (data.userName) {
            setUserName(data.userName); // Salvează numele utilizatorului
          } else {
            console.error("Eroare: " + data.error); // Erori de la backend
          }
        })
        .catch((error) => {
          console.error("Eroare la obținerea numelui utilizatorului:", error);
        });
    }
  }, [authenticated]); // Re-apelează dacă `authenticated` se schimbă

  const handleLogout = () => {
    // Funcția de logout
    axios
      .post("http://localhost:8086/logout", null, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        // Reîncarcă pagina pentru a actualiza starea autentificării
        window.location.reload();
      })
      .catch((error) => {
        console.error("Eroare la deconectare:", error);
      });
  };

  return (
    <>
      {/* Navbar-ul de sus */}
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Soft Educational
            </span>
          </Link>
          <div className="flex items-center">
            {/* Dacă utilizatorul este autentificat, afișează username-ul și butonul de logout */}
            {authenticated ? (
              <div className="mr-6 text-sm text-gray-500 dark:text-white">
                <span>
                  <Link to="/profile" className="text-blue-600 hover:underline">
                    {userName}
                  </Link>{" "}
                </span>
                <button
                  className="ml-2 text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Navbar-ul de jos */}
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Adaugă Material
                </Link>
              </li>
              <li>
                <Link
                  to="/materiale"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Materiale
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Navbar;