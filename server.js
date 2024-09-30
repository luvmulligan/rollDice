const express = require('express');
const path = require('path');
const app = express();

// Servir los archivos de la carpeta dist de Angular
app.use(express.static(__dirname + '/dist'));

// Redirigir todas las rutas al archivo index.html de Angular
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Iniciar la app en el puerto que Heroku indique
app.listen(process.env.PORT || 8080);
