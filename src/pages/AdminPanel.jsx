import { useState } from "react";
import AdminVariedades from "../components/AdminVariedadesList"; 
import AdminTiendas from "../components/AdminTiendas";

const AdminPanel = () => {
  const [tab, setTab] = useState("variedades");

  return (
    <main className="container">

      <h1>Panel de Administración</h1>

      <div className="admin-tabs">
        <button 
          className={tab === "variedades" ? "active" : ""}
          onClick={() => setTab("variedades")}
        >
          Variedades
        </button>

        <button 
          className={tab === "tiendas" ? "active" : ""}
          onClick={() => setTab("tiendas")}
        >
          Tiendas
        </button>
      </div>

      {tab === "variedades" && <AdminVariedades />}
      {tab === "tiendas" && <AdminTiendas />}

    </main>
  );
};

export default AdminPanel;
