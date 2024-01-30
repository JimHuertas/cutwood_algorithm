function createImgURL(stockSize, cuts){    
    const { createCanvas } = require('canvas');
    const fs = require('fs');
    
    // Tamaño del canvas
    const canvasWidth = stockSize.width;
    const canvasHeight = stockSize.height;
    // Crear el canvas
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    //Pintando el fondo del canva
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Dibujando los cortes en la madera
    cuts.forEach(cut => {
        ctx.strokeStyle = 'red'; // Establecer el color del borde
        ctx.lineWidth = 1; // Establecer el ancho del borde
        ctx.strokeRect(cut['x'], cut['y'], cut['width'], cut['height']);
    });


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