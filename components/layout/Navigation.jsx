import React from 'react';
import { Network } from 'lucide-react';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-3">
          <button
            onClick={() => setCurrentView('cards')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'cards'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista de Tarjetas
          </button>
          <button
            onClick={() => setCurrentView('tree')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'tree'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Vista de Árbol
          </button>
          <button
            onClick={() => setCurrentView('network')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'network'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Network className="w-4 h-4 inline mr-1" />
            Gráfico de Red
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;