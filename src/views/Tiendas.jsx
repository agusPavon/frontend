import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TiendaCard from "../components/TiendaCard";

const API = import.meta.env.VITE_API_URL;


const Tiendas = () => {
  const { token } = useContext(AuthContext);
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTiendas = async () => {
    try {
      const resp = await fetch(`${API}/api/tiendas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await resp.json();
      setTiendas(json.data || []);
    } catch (e) {
      console.error(e);
      setTiendas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTiendas();
  }, [token]);

  if (loading) return <p>Cargando tiendas...</p>;

  return (
    <div className="container">
      <h2>Tiendas</h2>

      <div className="cafe-grid">
        {tiendas.map((t) => (
          <TiendaCard key={t._id} tienda={t} />
        ))}
      </div>
    </div>
  );
};

export default Tiendas;
