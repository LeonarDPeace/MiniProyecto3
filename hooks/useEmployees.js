import { useState, useCallback } from 'react';

// Datos de prueba
const initialEmployees = [
  {
    id: '1',
    name: 'Juan Pérez',
    title: 'CEO',
    subordinates: ['2', '3', '4']
  },
  {
    id: '2',
    name: 'María González',
    title: 'CTO',
    subordinates: ['5', '6']
  },
  {
    id: '3',
    name: 'Carlos López',
    title: 'CFO',
    subordinates: ['7']
  },
  {
    id: '4',
    name: 'Ana Martínez',
    title: 'Directora de RRHH',
    subordinates: ['8']
  },
  {
    id: '5',
    name: 'Luis Rodríguez',
    title: 'Desarrollador Senior',
    subordinates: []
  },
  {
    id: '6',
    name: 'Elena García',
    title: 'Ingeniera DevOps',
    subordinates: []
  },
  {
    id: '7',
    name: 'Roberto Hernández',
    title: 'Contador',
    subordinates: []
  },
  {
    id: '8',
    name: 'Carmen Silva',
    title: 'Especialista en RRHH',
    subordinates: []
  }
];

const initialConnections = [
  { from: '1', to: '2' },
  { from: '1', to: '3' },
  { from: '1', to: '4' },
  { from: '2', to: '5' },
  { from: '2', to: '6' },
  { from: '3', to: '7' },
  { from: '4', to: '8' }
];

export default function useEmployees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [connections, setConnections] = useState(initialConnections);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getSubordinateCount = useCallback((employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.subordinates.length : 0;
  }, [employees]);

  const getRootEmployees = useCallback(() => {
    const subordinateIds = new Set(employees.flatMap(emp => emp.subordinates));
    return employees.filter(emp => !subordinateIds.has(emp.id));
  }, [employees]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setModalType('form');
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalType('form');
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (employee) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${employee.name}?`)) {
      setEmployees(prev => prev
        .filter(emp => emp.id !== employee.id)
        .map(emp => ({
          ...emp,
          subordinates: emp.subordinates.filter(id => id !== employee.id)
        }))
      );
      
      setConnections(prev => prev.filter(
        conn => conn.from !== employee.id && conn.to !== employee.id
      ));
    }
  };

  const handleSaveEmployee = (employeeData) => {
    if (selectedEmployee) {
      setEmployees(prev => prev.map(emp => 
        emp.id === selectedEmployee.id ? employeeData : emp
      ));
    } else {
      setEmployees(prev => [...prev, employeeData]);
    }
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleViewConnections = (employee) => {
    setSelectedEmployee(employee);
    setModalType('connections');
    setIsModalOpen(true);
  };

  const handleUpdateConnections = (newConnections) => {
    setConnections(newConnections);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setModalType('');
  };

  return {
    employees,
    connections,
    isModalOpen,
    modalType,
    selectedEmployee,
    getSubordinateCount,
    getRootEmployees,
    handleAddEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
    handleSaveEmployee,
    handleViewConnections,
    handleUpdateConnections,
    handleCloseModal
  };
}