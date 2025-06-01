import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Navigation from '../components/layout/Navigation';
import StatsCards from '../components/layout/StatsCards';
import EmployeeCard from '../components/business/EmployeeCard';
import TreeNode from '../components/business/TreeNode';
import NetworkGraph from '../components/business/NetworkGraph';
import Modal from '../components/ui/Modal';
import EmployeeForm from '../components/business/EmployeeForm';
import ConnectionManager from '../components/business/ConnectionManager';
import useEmployees from '../hooks/useEmployees';

export default function App() {
  const {
    employees,
    connections,
    getSubordinateCount,
    getRootEmployees,
    handleAddEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
    handleSaveEmployee,
    handleViewConnections,
    handleUpdateConnections,
    handleCloseModal,
    isModalOpen,
    modalType,
    selectedEmployee
  } = useEmployees();

  const [currentView, setCurrentView] = useState('cards');

  const renderModalContent = () => {
    switch (modalType) {
      case 'form':
        return (
          <EmployeeForm
            employee={selectedEmployee}
            employees={employees}
            onSave={handleSaveEmployee}
            onCancel={handleCloseModal}
          />
        );
      case 'connections':
        return (
          <ConnectionManager
            employee={selectedEmployee}
            employees={employees}
            connections={connections}
            onUpdateConnections={handleUpdateConnections}
            onClose={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'form':
        return selectedEmployee ? 'Editar Empleado' : 'Agregar Nuevo Empleado';
      case 'connections':
        return 'Gestionar Conexiones';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onAddEmployee={handleAddEmployee} />

      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards 
          employees={employees} 
          connections={connections} 
          getRootEmployees={getRootEmployees} 
        />

        {currentView === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                subordinateCount={getSubordinateCount(employee.id)}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                onViewConnections={handleViewConnections}
              />
            ))}
          </div>
        )}

        {currentView === 'tree' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Árbol Organizacional</h2>
            <div className="space-y-2">
              {getRootEmployees().map(rootEmployee => (
                <TreeNode
                  key={rootEmployee.id}
                  employee={rootEmployee}
                  employees={employees}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'network' && (
          <NetworkGraph employees={employees} connections={connections} />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getModalTitle()}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}