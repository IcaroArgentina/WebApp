export const CONSULTASFIELDS = [
  {
    nombre: 'nombreCurso',
    inputLabel: 'Curso',
    isRequired: true,
    type: 'select',
    id: 1,
    nroOrden: 1,
    width: '45%',
  },
  {
    nombre: 'diaDeClases',
    inputLabel: 'Dias de clases',
    isRequired: true,
    type: 'text',
    id: 2,
    nroOrden: 2,
    width: '45%',
  },
  {
    nombre: 'horarioClase',
    inputLabel: 'Horarios de clase',
    isRequired: false,
    type: 'text',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'duracionSemanas',
    inputLabel: 'Duracion en semanas',
    isRequired: false,
    type: 'text',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'fechaInicio',
    inputLabel: 'Fecha de Inicio',
    isRequired: true,
    type: 'date',
    id: 5,
    nroOrden: 5,
    width: '45%',
  },
  {
    nombre: 'fechaFin',
    inputLabel: 'Fecha de fin',
    isRequired: true,
    type: 'date',
    id: 6,
    nroOrden: 6,
    width: '45%',
  },
  {
    nombre: 'precioComision',
    inputLabel: 'Precio Total',
    isRequired: true,
    type: 'number',
    id: 7,
    nroOrden: 7,
    width: '45%',
  },
];

export const CONSULTASROWS = [
  {
    nombre: 'Id',
  },
  {
    nombre: 'Nombre Completo',
    inputLabel: 'nombre Completo',
    isRequired: true,
    defaultValue: 'Online - En vivo',
    type: 'text',

    id: 6,
    nroOrden: 8,
    width: '45%',
  },
  {
    nombre: 'Asunto',
    inputLabel: 'Asunto',
    isRequired: true,
    type: 'text',
    id: 11,
    nroOrden: 2,
    width: '45%',
  },
  {
    nombre: 'Inicio de consulta',
    inputLabel: 'Fecha ',
    isRequired: true,
    type: 'select',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'Estado',
    inputLabel: 'Estado ',
    isRequired: true,
    type: 'select',
    id: 5,
    nroOrden: 5,
    width: '45%',
  },

  {
    nombre: 'Responder/Eliminar',
    inputLabel: 'Programa de estudio',
    helpText: 'Este es un ejemplo autogenerado',
    type: 'text',
    id: 6,
    children: [],
    nroOrden: 6,
    width: '45%',
  },
];
