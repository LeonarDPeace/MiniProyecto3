import React, { useState } from 'react';
import Button from '../ui/Button';

const ConnectionManager = ({ employee, employees, connections, onUpdateConnections, onClose }) => {
  const [localConnections, setLocalConnections] = useState(connections);

  const handleToggleConnection = (targetId) => {
    const connectionExists = localConnections.some(
      conn => 
        (conn.from === employee.id && conn.to === targetId) ||
        (conn.from === targetId && conn.to === employee.id)
    );

    if (connectionExists) {
      setLocalConnections(localConnections.filter(
        conn => 
          !((conn.from === employee.id && conn.to === targetId) ||
            (conn.from === targetId && conn.to === employee.id))
      ));
    } else {
      setLocalConnections([...localConnections, { from: employee.id, to: targetId }]);
    }
  };

  const handleSave = () => {
    onUpdateConnections(localConnections);
    onClose();
  };

  const otherEmployees = employees.filter(emp => emp.id !== employee.id);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Gestionar conexiones para <strong>{employee.name}</strong>
      </div>
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {otherEmployees.map(emp => {
          const isConnected = localConnections.some(
            conn => 
              (conn.from === employee.id && conn.to === emp.id) ||
              (conn.from === emp.id && conn.to === employee.id)
          );
          
          return (
            <div key={emp.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{emp.name}</div>
                <div className="text-sm text-gray-600">{emp.title}</div>
              </div>
              <Button
                variant={isConnected ? "danger" : "primary"}
                size="sm"
                onClick={() => handleToggleConnection(emp.id)}
              >
                {isConnected ? "Desconectar" : "Conectar"}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default ConnectionManager;