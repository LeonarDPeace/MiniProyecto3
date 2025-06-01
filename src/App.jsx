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
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

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

  // Sort employees by subordinate count based on sortOrder
  const sortedEmployees = [...employees].sort((a, b) => {
    const countA = getSubordinateCount(a.id);
    const countB = getSubordinateCount(b.id);
    if (sortOrder === 'asc') {
      return countA - countB;
    } else {
      return countB - countA;
    }
  });

  return (
    <div className="min-h-screen bg-green-100">
      <Header onAddEmployee={handleAddEmployee} currentView={currentView} setCurrentView={setCurrentView} />

      {/* Navigation component removed as menu moved to Header */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards 
          employees={employees} 
          connections={connections} 
          getRootEmployees={getRootEmployees} 
        />

        {currentView === 'cards' && (
          <div>
            <div className="mb-4 flex items-center space-x-4">
              <label htmlFor="sortOrder" className="text-green-900 font-medium">Ordenar por subordinados:</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-md border border-green-300 bg-green-50 text-green-900 px-2 py-1"
              >
                <option value="asc">Menos a más</option>
                <option value="desc">Más a menos</option>
              </select>
            </div>
            <div className="flex flex-col space-y-4">
              {sortedEmployees.map(employee => (
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