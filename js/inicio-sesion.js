document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const numeroId = document.getElementById('numeroId').value;
  const contrasena = document.getElementById('contrasena').value;

  const db = firebase.database();

  db.ref('usuarios').once('value')
    .then(snapshot => {
      const datosDB = snapshot.val();

      if (numeroId in datosDB) {
        const usuario = datosDB[numeroId];

        if (usuario.contrasena === contrasena) {
          alert("Inicio de sesión correcto");
        } else {
          alert("Contraseña incorrecta");
        }
      } else {
        alert("Usuario no registrado");
      }
    })
    .catch(error => {
      console.error("Error al acceder a la base de datos:", error);
      alert("Error de conexión con la base de datos");
    });
});
