import React from 'react';
import { Users, Edit, Trash2, Eye } from 'lucide-react';
import Button from '../ui/Button';

const EmployeeCard = ({ employee, subordinateCount, onEdit, onDelete, onViewConnections }) => (
<div className="bg-green-50 rounded-lg shadow-md p-4 border border-green-200 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-green-900">{employee.name}</h3>
        <p className="text-green-700 text-sm mb-2">{employee.title}</p>
        <div className="flex items-center text-sm text-green-600">
          <Users className="w-4 h-4 mr-1 text-green-500" />
          <span>{subordinateCount} subordinados</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewConnections(employee)}
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(employee)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(employee)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
);

export default EmployeeCard;