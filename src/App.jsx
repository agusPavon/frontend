import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from './components/MainLayout'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import NotFound from './views/NotFound'
import AdminPanel from './pages/AdminPanel'
import AdminTiendas from './components/AdminTiendas';
import Tiendas from './views/Tiendas';
 import AdminRoute from "./components/AdminRoute";


function App() {
  const usuario = 'Agus';
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <MainLayout usuario={usuario} />}>
                  
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

            <Route
              path="/"
              element={
                  <Home />
                
              }
            />
            <Route path='/login'  element={ <Login /> }/>
            <Route path='/register'  element={ <Register /> }/>
            <Route path='*' element={ <NotFound /> } />
            <Route path="/tiendas" element={<Tiendas />} />



          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
