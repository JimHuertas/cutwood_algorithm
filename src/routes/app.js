const { Router } = require('express');
const router = Router();
const cutwood  = require('../../models/cut_wood_algorithm')

// router.get('/', (req, res) =>{
//     res.send({"tittle": "Hello World"});
// });

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

module.exports = router;