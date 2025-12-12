const TiendaCard = ({ tienda }) => {
  return (
    <div id="tienda-card" className="tienda-card">
      <h3>{tienda.nombre}</h3>
      <p>{tienda.direccion}</p>
      <p>{tienda.descripcion}</p>

    
    </div>
  );
};

export default TiendaCard;
