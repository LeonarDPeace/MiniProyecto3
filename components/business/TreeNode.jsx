import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const TreeNode = ({ employee, employees, level = 0, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const subordinates = employees.filter(emp => employee.subordinates.includes(emp.id));

  return (
    <div className="ml-4">
      <div className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 ${level === 0 ? 'bg-blue-50' : ''}`}>
        {subordinates.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium text-gray-900">{employee.name}</span>
              <span className="text-sm text-gray-600 ml-2">({employee.title})</span>
              <span className="text-xs text-gray-500 ml-2">
                {subordinates.length} subordinados
              </span>
            </div>
            <div className="flex space-x-2">
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
      </div>
      {isExpanded && subordinates.length > 0 && (
        <div className="ml-6 border-l border-gray-200 pl-4">
          {subordinates.map(subordinate => (
            <TreeNode
              key={subordinate.id}
              employee={subordinate}
              employees={employees}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;