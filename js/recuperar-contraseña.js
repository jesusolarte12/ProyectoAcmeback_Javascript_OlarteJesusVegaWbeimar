document.getElementById('cambioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const numeroId = document.getElementById('numeroId').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const nuevaContrasena = document.getElementById('nuevaContrasena').value;

  if (!numeroId || !nombre || !nuevaContrasena) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const db = firebase.database();
  const refUsuario = db.ref('usuarios/' + numeroId);

  refUsuario.once('value')
    .then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error("El usuario con ese ID no está registrado.");
      }

      const datosUsuario = snapshot.val();

      if (datosUsuario.nombre.trim().toLowerCase() !== nombre.toLowerCase()) {
        throw new Error("El nombre no coincide con el número de identificación.");
      }

      return refUsuario.update({ contrasena: nuevaContrasena });
    })
    .then(() => {
      alert("Contraseña actualizada correctamente.");
      document.getElementById('cambioForm').reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error: " + error.message);
    });
});
