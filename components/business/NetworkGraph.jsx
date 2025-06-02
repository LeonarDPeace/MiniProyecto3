import React from 'react';

const NetworkGraph = ({ employees, connections }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Grafo de Red de Conexiones</h3>
      <div className="relative bg-gray-50 rounded-lg p-4 min-h-96">
        <svg width="100%" height="400" className="border rounded">
          {employees.map((employee, index) => {
            const x = 100 + (index % 4) * 150;
            const y = 100 + Math.floor(index / 4) * 100;
            
            return (
              <g key={employee.id}>
                <circle
                  cx={x}
                  cy={y}
                  r="30"
                  fill="#3B82F6"
                  stroke="#1E40AF"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dy="0.35em"
                  fill="white"
                  fontSize="10"
                >
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </text>
                <text
                  x={x}
                  y={y + 45}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                >
                  {employee.title}
                </text>
              </g>
            );
          })}
          
          {connections.map((conn, index) => {
            const fromEmployee = employees.find(e => e.id === conn.from);
            const toEmployee = employees.find(e => e.id === conn.to);
            if (!fromEmployee || !toEmployee) return null;
            
            const fromIndex = employees.indexOf(fromEmployee);
            const toIndex = employees.indexOf(toEmployee);
            
            const x1 = 100 + (fromIndex % 4) * 150;
            const y1 = 100 + Math.floor(fromIndex / 4) * 100;
            const x2 = 100 + (toIndex % 4) * 150;
            const y2 = 100 + Math.floor(toIndex / 4) * 100;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6B7280"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default NetworkGraph;