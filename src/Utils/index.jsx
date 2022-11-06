import { Timestamp } from 'firebase/firestore';

export function dateFormat(inputDate, format) {
  //parse the input date
  const date = new Date(inputDate);

  //extract the parts of the date
  const day = date.getDate() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  //replace the month
  format = format.replace('MM', month.toString().padStart(2, '0'));

  //replace the year
  if (format.indexOf('yyyy') > -1) {
    format = format.replace('yyyy', year.toString());
  } else if (format.indexOf('yy') > -1) {
    format = format.replace('yy', year.toString().substr(2, 2));
  }

  //replace the day
  format = format.replace('dd', day.toString().padStart(2, '0'));

  return format;
}

export function getTodaysDate() {
  var now = new Date();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  var today = now.getFullYear() + '-' + month + '-' + day;
  return today;
}

export function sortArrayByOrderNumber(array) {
  array.sort((a, b) => {
    return a.nroOrden - b.nroOrden;
  });
}

export function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export function sortArrayByDate(array) {
  return array.sort((objA, objB) => {
    const ultMensajeA = convertDateToTimestamp(
      objA.mensajes[0].date,
      true,
      true
    );
    const ultMensajeB = convertDateToTimestamp(
      objB.mensajes[0].date,
      true,
      true
    );

    return ultMensajeB.seconds - ultMensajeA.seconds;
  });
}

export function sortArrayByOrdenValue(array) {
  return array.sort(function (a, b) {
    return a.Orden - b.Orden;
  });
}

export function sortArrayByNroOrden(array) {
  return array.sort((a, b) => {
    return a.NroOrden - b.NroOrden;
  });
}

export function sortArrayBynombreCurso(array) {
  return array.sort((a, b) => {
    if (a.nombreCurso === b.nombreCurso) {
      return b.id - a.id;
    }
    return a.nombreCurso > b.nombreCurso ? 1 : -1;
  });
}

export function sortArrayAlphabetically(array) {
  return array.sort((a, b) => {
    if (a.name === b.name) {
      return b.comisionId - a.comisionId;
    }
    return a.name > b.name ? 1 : -1;
  });
}

export const normalizeSelectOptions = (normalized) => {
  const Options = [];
  normalized?.forEach((elem, index) => {
    if (elem.nombreCurso && elem.fechaInicio) {
      Options.push({
        name: elem?.uuid,
        id: elem?.uuid,
        label: `${elem.nombreCurso} Inicio: ${turnTimestampIntoDate(
          elem.fechaInicio
        )}`,
        value: elem?.uuid,
        key: elem?.uuid,
      });
    } else {
      Options.push({
        name: elem.Nombre || elem.nombre || elem.uuid,
        id: elem?.uuid,
        label:
          elem.Nombre ||
          elem.nombre ||
          `${elem.name} ${elem.lastname} dni: ${elem.dni}`,
        value: elem.Nombre || elem.nombre || elem.uuid,
        key: elem?.uuid,
      });
    }
  });
  const orderedOptions = sortArrayAlphabetically(Options);
  return orderedOptions;
};

export function turnTimestampIntoDate(data) {
  let date = data.toDate().toJSON().slice(0, 10);
  let finalDate = dateFormat(date, 'dd-MM-yyyy');

  return finalDate;
}

export function turnTimestampIntoDateFormat(data) {
  let date = data.toDate().toJSON().slice(0, 10);
  let finalDate = dateFormat(date, 'yyyy-MM-dd');

  return finalDate;
}

export function convertDateToTimestamp(str, toTimestamp, withSlash = false) {
  const [year, month, day] = withSlash ? str.split('/') : str.split('-');
  const date = new Date(+year, month - 1, +day);
  if (toTimestamp) {
    return Timestamp.fromDate(date);
  }

  return date;
}

export const getSimilarCourses = (courseList, CategoriaID, course) => {
  const categoryList = courseList.filter(
    (elem) =>
      elem?.CategoriaID === CategoriaID ||
      elem.nombre.includes(course?.nombre) ||
      (course?.CategoriaID2 && elem?.CategoriaID2 === course?.CategoriaID2)
  );
  const newList = categoryList.filter((item) => item !== course);
  return newList;
};

export const getCollectionName = (typeName) => {
  switch (typeName) {
    case 'Curso':
      return 'NuevosCursos';
    case 'Cursos':
      return 'NuevosCursos';
    case 'Categoria':
      return 'CategoriasCursos';
    case 'Categorias':
      return 'CategoriasCursos';
    case 'Comisiones':
      return 'ComisionesCursos';
    case 'Comision':
      return 'ComisionesCursos';
    case 'Usuarios':
      return 'Usuarios';
    case 'Usuario':
      return 'Usuarios';
    case 'Solicitudes':
      return 'Solicitudes';
    case 'Solicitud':
      return 'Solicitudes';
    case 'Inscripciones':
      return 'Inscripciones';
    case 'Inscripcion':
      return 'Inscripciones';
    case 'Consultas':
      return 'Consultas';
    default:
      return '';
  }
};

export function scrollTo(location, navigate, route, offset = 0) {
  location !== '/' && navigate('/');
  route === '/register' && navigate(route);

  setTimeout(() => {
    let element = document.getElementById('root');
    if (route === '/cursos') {
      element = document.getElementById('cursos');
    } else if (route === '/quienes-somos') {
      element = document.getElementById('quienes-somos');
    } else if (route === '/register') {
      element = document.getElementById('register');
    }

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, 500);
}
