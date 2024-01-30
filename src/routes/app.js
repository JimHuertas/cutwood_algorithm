const { Router } = require('express');
const router = Router();
const cutwood  = require('../../models/cut_wood_algorithm')
const imgURL  = require('../../models/generate_url_for_image')

router.post('/', (req, res)=>{
    const {rectangles, stockSize, grainDirection, cutSize} = req.body;
    console.log(rectangles);
    
    if(rectangles && stockSize && grainDirection && cutSize){
        let result = cutwood.cutWood2(rectangles, stockSize, grainDirection, cutSize);
        console.log(result);
        res.json(result);
    } else{
        res.send('Wrong Request');
    }
});

// router.get('/cutwood_image', (req, res) => {
//     // Enviar la imagen como una respuesta HTTP con la URL de la imagen generada
//     // let result = imgURL.createImgURL(stockSize, cuts);
//     // res.writeHead(200, { 'Content-Type': 'image/png' });
//     // res.end(Buffer.from(result, 'base64'));
//     const imageUrl = "http://localhost:3000/img.png";
//     res.send(`<img src="${imageUrl}">`);
// });

router.post('/img', (req, res)=>{
    const {rectangles=[], stockSize, grainDirection, cutSize} = req.body;

    //make secure that every data is sended to the server (not empty)
    if(rectangles && stockSize && grainDirection && cutSize){
        let cuts = cutwood.cutWood2(rectangles, stockSize, grainDirection, cutSize);
        if(rectangles.length != cuts.length){
            res.send('Out of StockSize');
        }
        else{
            let imageCreated = imgURL.createImgURL(stockSize, cuts);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(Buffer.from(imageCreated, 'base64'));
            // const imageUrl = `http://localhost:3000/prueba.png`;
            // res.send(`<img src="${imageUrl}">`);
        }
        
    } else{
        res.send('Wrong Request');
    }
})

module.exports = router;