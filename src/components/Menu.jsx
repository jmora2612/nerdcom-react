import { Link } from "react-router-dom";

export const Menu = () => {
  const modules = [
    { name: 'Estados', path: '/' },
    { name: 'Tipo de transacciones', path: '/tipo-de-transaccion' },
    { name: 'Articulos', path: '/articulo' },
    { name: 'Transacciones', path: '/transaccion' },

  ];
  return (
    <>
      <div className="flex justify-center items-center h-screen">
      <ul className="grid grid-cols-1 gap-4">
        {modules.map((module, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
            <Link to={module.path} className="block font-semibold">
              {module.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};
