const puppeteer = require('puppeteer');

//! Hacer scrapper (función que le llega una url)--> Array de imágenes:
const scrapper = async (url) => {
  const arrayImgs = []; //Crear array vacío.

  const browser = await puppeteer.launch({ headless: false }); //Iniciar navegador.

  const page = await browser.newPage(); //Abrir nueva pestaña.

  await page.goto(url); //Ir a la url.

  const divsWxXog = await page.$$('div.WxXog'); //Selecciona todos los divs con la clase "MorZF".
  //console.log(divsWxXog.length);

  let inicio = Math.floor(Math.random() * divsWxXog.length);

  if (inicio >= divsWxXog.length - 20) {
    inicio -= 20;
  }

  let final = inicio + 20;

  //Hacer un bucle de 0 a 9 (10 divs) para extraer la imagen de cada div:
  for (let i = inicio; i < final; i+= 2) {
    const div = divsWxXog[i]; //Seleccionar cada div.
    const img = await div.$eval('img', (el) => el.src); //Extraer la imagen de cada div.
    arrayImgs.push(img); //Añadir la imagen al array.
  }
  //console.log(arrayImgs);

  browser.close(); //Cerrar el navegador.
  return arrayImgs; //Devolver el array de imágenes.
};

module.exports = {
  scrapper
};
