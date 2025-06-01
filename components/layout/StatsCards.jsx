import React from 'react';
import { Users, Network, Plus } from 'lucide-react';

const StatsCards = ({ employees, connections, rootEmployeesCount }) => {
  return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-green-50 rounded-lg shadow p-6">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-700">Total de Empleados</p>
            <p className="text-2xl font-bold text-green-900">{employees.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-green-50 rounded-lg shadow p-6">
        <div className="flex items-center">
          <Network className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-700">Conexiones</p>
            <p className="text-2xl font-bold text-green-900">{connections.length}</p>
          </div>
        </div>
      </div>
      <div className="bg-green-50 rounded-lg shadow p-6">
        <div className="flex items-center">
          <Plus className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-green-700">Cargos Raíz</p>
            <p className="text-2xl font-bold text-green-900">{rootEmployeesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;