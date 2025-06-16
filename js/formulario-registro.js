document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const numeroId = document.getElementById('numeroId').value.trim();

  firebase.database().ref('usuarios/' + numeroId).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        alert("Ya existe un usuario registrado con este número de identificación.");
        document.getElementById('registerForm').reset();
      } else {
        const datos = {
          tipoId: document.getElementById('tipoId').value.trim().toUpperCase(),
          numeroId: numeroId,
          nombre: document.getElementById('nombre').value.trim().toUpperCase(),
          segundoNombre: document.getElementById('segundoNombre').value.trim().toUpperCase(),
          apellidos: document.getElementById('apellidos').value.trim().toUpperCase(),
          genero: document.getElementById('genero').value.trim().toUpperCase(),
          telefono: document.getElementById('telefono').value.trim(),
          correo: document.getElementById('correo').value.trim(),
          direccion: document.getElementById('direccion').value.trim(),
          ciudad: document.getElementById('ciudad').value.trim().toUpperCase(),
          contrasena: document.getElementById('contrasena').value,
          transacciones: {},
          saldo: parseFloat(((Math.random() + 0.1) * 2500000).toFixed(2)),
          fechaCreacion: new Date().toISOString()
        };

        firebase.database().ref('usuarios/' + numeroId).set(datos)
          .then(() => {
            alert("Usuario registrado exitosamente");
            document.getElementById('registerForm').reset();
          })
          .catch((error) => {
            console.error("Error al guardar en la base de datos:", error);
            alert("Error al registrar usuario.");
          });
      }
    })
    .catch(error => {
      console.error("Error al verificar existencia del usuario:", error);
      alert("Error de conexión con la base de datos.");
    });
});
