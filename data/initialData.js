
// Datos de prueba
export const initialEmployees = [
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

export const initialConnections = [
  { from: '1', to: '2' },
  { from: '1', to: '3' },
  { from: '1', to: '4' },
  { from: '2', to: '5' },
  { from: '2', to: '6' },
  { from: '3', to: '7' },
  { from: '4', to: '8' }
];

