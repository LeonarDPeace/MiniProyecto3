import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ onAddEmployee }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Plataforma de Estructura Organizacional
            </h1>
          </div>
          <Button onClick={onAddEmployee}>
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Empleado
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;