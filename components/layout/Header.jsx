import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ onAddEmployee, currentView, setCurrentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-green-600 shadow-sm border-b border-green-700 min-h-screen w-64 fixed top-0 left-0 flex flex-col">
      <div className="px-4 py-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 mb-8">
          <Users className="w-8 h-8 text-green-200" />
          <h1 className="text-2xl font-bold text-green-100">
            Organización Estructurada 
          </h1>
        </div>

        <nav className="flex flex-col space-y-2 mb-8">
          <button
            onClick={() => setCurrentView('cards')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors text-left ${
              currentView === 'cards'
                ? 'bg-green-100 text-green-700'
                : 'text-green-200 hover:bg-green-600 hover:text-green-100'
            }`}
          >
            Empleados - Tarjetas
          </button>
          <button
            onClick={() => setCurrentView('tree')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors text-left ${
              currentView === 'tree'
                ? 'bg-green-100 text-green-700'
                : 'text-green-200 hover:bg-green-600 hover:text-green-100'
            }`}
          >
            Diagrama de Árbol
          </button>
          <button
            onClick={() => setCurrentView('network')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors text-left ${
              currentView === 'network'
                ? 'bg-green-100 text-green-700'
                : 'text-green-200 hover:bg-green-600 hover:text-green-100'
            }`}
          >
            Grafo de Conexiones
          </button>
        </nav>

        <Button variant="primary" onClick={onAddEmployee}>
          <UserPlus className="w-4 h-4 mr-2" />
          Agregar Empleado
        </Button>
      </div>
    </header>
  );
};

export default Header;
