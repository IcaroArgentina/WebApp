export const USUARIOSOPTIONS = [
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

export const USUARIOSFIELDS = [
  {
    nombre: 'name',
    inputLabel: 'Nombre',
    isRequired: true,
    type: 'text',
    id: 1,
    nroOrden: 1,
    width: '45%',
  },
  {
    nombre: 'lastname',
    inputLabel: 'Apellido',
    isRequired: true,
    type: 'text',
    id: 2,
    nroOrden: 2,
    width: '45%',
  },
  {
    nombre: 'email',
    inputLabel: 'Email',
    isRequired: true,
    type: 'text',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'dni',
    inputLabel: 'DNI',
    isRequired: true,
    type: 'number',
    id: 4,
    nroOrden: 4,
    width: '45%',
  },
  {
    nombre: 'phonenumber',
    inputLabel: 'Telefono',
    isRequired: true,
    type: 'number',
    id: 5,
    nroOrden: 5,
    width: '45%',
  },
  {
    nombre: 'personalInformation',
    inputLabel: 'Informacion Profesional',
    isRequired: true,
    type: 'text',
    id: 6,
    nroOrden: 6,
    width: '45%',
  },
];

export const USUARIOSROWS = [
  {
    nombre: 'Id',
  },
  {
    nombre: 'Nombre Completo',
    inputLabel: 'Nombre Completo',
    isRequired: true,
    type: 'text',
    id: 1,
    nroOrden: 1,
    width: '45%',
  },
  {
    nombre: 'Email',
    inputLabel: 'Email',
    isRequired: true,
    type: 'text',
    id: 3,
    nroOrden: 3,
    width: '45%',
  },
  {
    nombre: 'DNI',
    inputLabel: 'DNI',
    isRequired: true,
    type: 'number',
    id: 4,
    nroOrden: 4,
    width: '45%',
  },
  {
    nombre: 'Editar',
    inputLabel: 'Programa de estudio',
    helpText: 'Este es un ejemplo autogenerado',
    type: 'text',
    id: 13,
    children: [],
    nroOrden: 15,
    width: '45%',
  },
];
