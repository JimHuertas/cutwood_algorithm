const express = require('express');
const app = express();
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//for test purpose
const PIXI = require('pixi.js')

//routes
app.use('/api/cutwood/',require('./routes/app'));


//starting the server
app.listen(process.env.PORT || 3000, (err) => {
  if( err ) throw new Error(err);

  console.log(`Server on ${process.env.PORT}`);
});



