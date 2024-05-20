const { scrapper } = require('./src/scrapper/scrapper.js');
//scrapper('https://unsplash.com/es/s/fotos/juguetes');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//Función que se encarga de extraer las imágenes de la url:
const functionPalabra = async (req, res, next) => {
  try {
    const { key } = req.params;
    const imgs = await scrapper(`https://unsplash.com/es/s/fotos/${key}`);
    return res.status(200).json(imgs);
  } catch (error) {
    return res.status(400).json('Not found');
  }
};

// Ruta que ejecuta la función scrapper:
app.use('/api/v1/:key', functionPalabra);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});
app.listen(3000, () => {
  console.log('Servidor levantado en: http://localhost:3000');
});
