import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const EmployeeForm = ({ employee, employees, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    title: employee?.title || '',
    subordinates: employee?.subordinates || []
  });
  const [errors, setErrors] = useState({});

  // IDs para accesibilidad
  const nameInputId = 'employee-name';
  const titleInputId = 'employee-title';
  const subordinateSelectId = 'employee-subordinates';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.title.trim()) newErrors.title = 'El cargo es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        ...employee,
        ...formData,
        id: employee?.id || Date.now().toString()
      });
    }
  };

  const availableSubordinates = employees.filter(emp => 
    emp.id !== employee?.id && !formData.subordinates.includes(emp.id)
  );

  const selectedSubordinates = employees.filter(emp => 
    formData.subordinates.includes(emp.id)
  );

  return (
    <div className="space-y-4">
      <Input
        id={nameInputId}
        name="name"
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />
      
      <Input
        id={titleInputId}
        name="title"
        label="Cargo"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        required
      />

      <div>
        <label
          htmlFor={subordinateSelectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Subordinados ({formData.subordinates.length})
        </label>
        
        {selectedSubordinates.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Subordinados seleccionados:</p>
            <div className="space-y-2">
              {selectedSubordinates.map(emp => (
                <div key={emp.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm">{emp.name} - {emp.title}</span>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => setFormData({
                      ...formData,
                      subordinates: formData.subordinates.filter(id => id !== emp.id)
                    })}
                  >
                    Quitar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {availableSubordinates.length > 0 && (
          <Select
            id={subordinateSelectId}
            name="subordinates"
            label="Agregar Subordinado"
            value=""
            onChange={(e) => {
              if (e.target.value) {
                setFormData({
                  ...formData,
                  subordinates: [...formData.subordinates, e.target.value]
                });
              }
            }}
            options={[
              { value: '', label: 'Selecciona un empleado...' },
              ...availableSubordinates.map(emp => ({
                value: emp.id,
                label: `${emp.name} - ${emp.title}`
              }))
            ]}
          />
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          {employee ? 'Actualizar Empleado' : 'Agregar Empleado'}
        </Button>
      </div>
    </div>
  );
};

export default EmployeeForm;