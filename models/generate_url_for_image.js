function createImgURL(){    
    const { createCanvas } = require('canvas');
    const fs = require('fs');

    // Tamaño del canvas
    const canvasWidth = 500;
    const canvasHeight = 500;

    // Coordenadas del cuadrado
    const squareX = 50;
    const squareY = 50;
    const squareSize = 100;

    // Crear el canvas
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Dibujar el cuadrado
    ctx.fillStyle = 'red';
    ctx.fillRect(squareX, squareY, squareSize, squareSize);
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = 'green';
    ctx.fillRect(100, 0, 100, 100);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 100, 100, 100);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(100, 100, 100, 100);

    // Guardar el canvas como una imagen
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./assets/img.png', buffer);

    // Convertir la imagen a base64
    const imgData = canvas.toDataURL();
    const imgBase64 = imgData.replace(/^data:image\/\w+;base64,/, '');
    // Convertir el buffer en una URL
    const dataUrl = `data:image/png;base64,${buffer.toString('base64')}`;
    // console.log(`La imagen se ha guardado en square.png y su URL es ${dataUrl}`);
    return `${imgBase64}`;
}

module.exports = { createImgURL };