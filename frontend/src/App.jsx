import {BrowserRouter, Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import MaterialList from './pages/MaterialListPage'
import UpdateMaterial from './pages/UpdateMaterial'
import ViewMaterial from './pages/ViewMaterial'
import  Home  from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import Register from './pages/Register'

function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Functie pentru autentificare (o poți seta din Login)
  // const handleLogin = () => setIsAuthenticated(true);
  // const handleLogout = () => setIsAuthenticated(false);

  return (
    
    <BrowserRouter>
    <Routes>
      
    <Route path='/' element={<Home />}></Route>
    <Route path="/create" element={<HomePage />} />
  
    <Route path='/materiale' element={<MaterialList />}></Route>
    <Route path="/edit/:id" element={<UpdateMaterial />} />
    <Route path="/view/:id" element={<ViewMaterial />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />


     </Routes>
    </BrowserRouter>
  )
}

export default App