import React, { useState } from 'react';
import EmployeeCard from './EmployeeCard';

const TreeNode = ({ employee, employees, onEdit, onDelete, onViewConnections }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const subordinates = employees.filter(emp => employee.subordinates.includes(emp.id));

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <EmployeeCard
          employee={employee}
          subordinateCount={subordinates.length}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewConnections={onViewConnections}
        />
        {subordinates.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>
      {isExpanded && subordinates.length > 0 && (
        <div className="flex mt-6 space-x-6">
          {subordinates.map(subordinate => (
            <TreeNode
              key={subordinate.id}
              employee={subordinate}
              employees={employees}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewConnections={onViewConnections}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
