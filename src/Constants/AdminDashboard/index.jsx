export const SIDEMENUCATEGORIES = [
  {
    menuName: 'Inicio',
    url: '/admin',
    sideLinks: 'Inicio',
    id: 1,
    isShown: false,
  },
  {
    menuName: 'Cursos',
    id: 2,
    url: '/admin/cursos',
    isShown: true,
    actions: [
      { name: 'Ver Cursos', url: '/admin/cursos', id: 8 },
      { name: 'Crear Curso', url: '/admin/new/curso', id: 9 },
    ],
  },
  {
    menuName: 'Categorias',
    id: 3,
    isShown: true,
    url: '/admin/categorias',
    actions: [
      { name: 'Ver Categorias', url: '/admin/categorias', id: 10 },
      { name: 'Crear Categoria', url: '/admin/new/categoria', id: 11 },
    ],
  },
  {
    menuName: 'Comisiones',
    id: 3,
    isShown: true,
    url: '/admin/comisiones',
    sideLinks: 'Comisiones',
    actions: [
      { name: 'Ver Comisiones', url: '/admin/comisiones', id: 12 },
      { name: 'Crear Comision', url: '/admin/new/comision', id: 13 },
    ],
  },
  {
    menuName: 'Usuarios',
    id: 4,
    isShown: true,
    url: '/admin/usuarios',
    actions: [{ name: 'Ver Usuarios', url: '/admin/usuarios', id: 14 }],
  },
  {
    menuName: 'Solicitudes',
    id: 5,
    isShown: false,
    url: '/admin/solicitudes',
  },
  {
    menuName: 'Inscripciones',
    id: 6,
    isShown: false,
    url: '/admin/inscripciones',
  },
  { menuName: 'Consultas', id: 7, url: '/admin/consultas', isShown: false },
];

export const ADMINMENULINKS = [
  {
    menuName: 'Mi Perfil',
    url: '/admin/perfil',
    icon: 'user',
  },
  {
    menuName: 'Salir',
    url: '/admin/',
    icon: 'logout',
  },
];
