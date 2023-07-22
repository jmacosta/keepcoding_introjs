/* Tenemos otro error que nuestro cliente nos pide arreglar. El cliente está pidiendo un usuario
y nos dice que está usando el id correcto el 1. Pero que siempre le da undefined. Nos a
pasado el código que tenemos que revisar y arreglar. Para este problema crear un archivo
llamado bugAsync.js con la solución.*/

// Este programa simula una llamada asincrónica para obtener un usuario
// function obtenerUsuario(id) {
//   let usuario;
//   setTimeout(() => {
//     if (id === 1) {
//       usuario = { id: 1, nombre: "John Doe" };
//     }
//   }, 2000);
//   return usuario;
// }
// const usuario = obtenerUsuario(1);
// console.log(usuario);

const obtenerUsuario = (id) =>
  new Promise((resolve, reject) => {
    if (id === 1) {
      setTimeout(() => {
        resolve({ id: 1, nombre: "John Doe" });
      }, 2000);
    } else {
      reject("Error en el codigo de usuario");
    }
  });

obtenerUsuario(1)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
