import React, { useState, useRef, useEffect } from 'react';

const NetworkGraph = ({ employees, connections }) => {
  // Initialize positions in state
  const [positions, setPositions] = useState(() => {
    const pos = {};
    employees.forEach((employee, index) => {
      pos[employee.id] = {
        x: 100 + (index % 4) * 150,
        y: 100 + Math.floor(index / 4) * 100,
      };
    });
    return pos;
  });

  const svgRef = useRef(null);
  const draggingNode = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  // Mouse event handlers for drag
  const onMouseDown = (e, id) => {
    draggingNode.current = id;
    const svgRect = svgRef.current.getBoundingClientRect();
    const pos = positions[id];
    offset.current = {
      x: e.clientX - svgRect.left - pos.x,
      y: e.clientY - svgRect.top - pos.y,
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!draggingNode.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const newX = e.clientX - svgRect.left - offset.current.x;
    const newY = e.clientY - svgRect.top - offset.current.y;
    setPositions(prev => ({
      ...prev,
      [draggingNode.current]: {
        x: newX,
        y: newY,
      },
    }));
  };

  const onMouseUp = () => {
    draggingNode.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Grafo de Red de Conexiones</h3>
      <div className="relative bg-gray-50 rounded-lg p-4 min-h-96">
        <svg ref={svgRef} width="100%" height="400" className="border rounded" style={{ userSelect: 'none' }}>
          {connections.map((conn, index) => {
            const fromPos = positions[conn.from];
            const toPos = positions[conn.to];
            if (!fromPos || !toPos) return null;

            return (
              <line
                key={index}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="#22c55e" // green-500
                strokeWidth="3"
                strokeDasharray="0"
              />
            );
          })}

          {employees.map((employee) => {
            const pos = positions[employee.id];
            if (!pos) return null;

            return (
              <g
                key={employee.id}
                cursor="pointer"
                onMouseDown={(e) => onMouseDown(e, employee.id)}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="30"
                  fill="#22c55e" // green-500
                  stroke="#15803d" // green-700
                  strokeWidth="3"
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dy="0.35em"
                  fill="white"
                  fontSize="10"
                  pointerEvents="none"
                >
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 45}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                  pointerEvents="none"
                >
                  {employee.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default NetworkGraph;
