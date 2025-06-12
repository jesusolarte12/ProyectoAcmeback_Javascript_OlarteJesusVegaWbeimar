document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const datos = {
      tipoId: document.getElementById('tipoId').value,
      numeroId: document.getElementById('numeroId').value,
      nombre: document.getElementById('nombre').value,
      segundoNombre: document.getElementById('segundoNombre').value,
      apellidos: document.getElementById('apellidos').value,
      genero: document.getElementById('genero').value,
      telefono: document.getElementById('telefono').value,
      correo: document.getElementById('correo').value,
      direccion: document.getElementById('direccion').value,
      ciudad: document.getElementById('ciudad').value,
      contrasena: document.getElementById('contrasena').value,
      transacciones: {prueba:"correcto"}
    };
  
    firebase.database().ref('usuarios/' + datos.numeroId).set(datos)
      .then(() => {
        alert("Usuario registrado exitosamente");
        document.getElementById('registerForm').reset();
      })
      .catch((error) => {
        console.error("Error al guardar en la base de datos:", error);
        alert("Error al registrar usuario.");
      });
  });
  