export const INSCRIPCIONESOPTIONS = [
  {
    name: 'Aprobada',
    id: 'aprobada',
    label: 'Aprobada',
    key: 'Aprobada',
    value: 'Aprobada',
  },
  {
    name: 'Pendiente',
    id: 'pendiente',
    label: 'Pendiente',
    key: 'Pendiente',
    value: 'Pendiente',
  },
  {
    name: 'Rechazada',
    id: 'rechazada',
    label: 'Rechazada',
    key: 'Rechazada',
    value: 'Rechazada',
  },
];

export const ESESTUDIANDTEOPTIONS = [
  {
    name: true,
    id: 'true',
    label: 'Sí ',
    key: 'true',
    value: true,
  },
  {
    name: false,
    id: 'false',
    label: 'No ',
    key: 'false',
    value: false,
  },
];

export const BASICINSCRIPCION = {
  inscripcionComision: '',
  estadoInscripcion: 'Pendiente',
  esEstudiante: false,
  inscripcionCurso: '',
};

export const INSCRIPCIONESFIELDS = [
  {
    nombre: 'user',
    inputLabel: 'Usuario',
    isRequired: true,
    type: 'select',
    options: 'userOptions',
    isDisableEdit: true,
    id: 1,
    nroOrden: 1,
    width: '95%',
  },
  {
    nombre: 'esEstudiante',
    inputLabel: 'Es estudiante?',
    isRequired: true,
    type: 'select',
    options: ESESTUDIANDTEOPTIONS,
    id: 2,
    nroOrden: 2,
    width: '45%',
  },
  {
    nombre: 'inscripcionCurso',
    inputLabel: 'Curso Inscripto',
    isRequired: true,
    type: 'select',
    isDisableEdit: true,
    options: 'cusosOptions',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'inscripcionComision',
    inputLabel: 'Comision',
    helpText: 'Seleccione primero el curso a inscribir ',
    isRequired: true,
    type: 'select',
    options: 'comisionesOptions',
    id: 4,
    nroOrden: 4,
    width: '45%',
  },
  {
    nombre: 'estadoInscripcion',
    inputLabel: 'Estado de la inscripcion',
    isRequired: true,
    type: 'select',
    options: INSCRIPCIONESOPTIONS,
    id: 5,
    nroOrden: 5,
    width: '45%',
  },
];

export const INSCRIPCIONESROWS = [
  {
    nombre: 'Id',
    id: 1,
  },
  {
    nombre: 'Nombre Completo',
    inputLabel: 'Nombre Completo',
    isRequired: true,
    type: 'text',
    id: 2,
    nroOrden: 1,
    width: '45%',
  },
  {
    nombre: 'Curso',
    inputLabel: 'Nombre del curso',
    isRequired: true,
    type: 'text',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'Comision ID',
    inputLabel: 'Comision ID',
    isRequired: true,
    type: 'number',
    id: 4,
    nroOrden: 4,
    width: '45%',
  },

  {
    nombre: 'Estado de la inscripcion',
    inputLabel: 'Estado de la inscripcion',
    isRequired: true,
    type: 'number',
    id: 5,
    nroOrden: 4,
    width: '45%',
  },
  {
    nombre: 'Editar',
    inputLabel: 'Editar',
    helpText: 'Este es un ejemplo autogenerado',
    type: 'text',
    id: 6,
    children: [],
    nroOrden: 15,
    width: '45%',
  },
];
