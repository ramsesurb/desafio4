const express = require('express');
const {Router} = express
const app = express();
const Contenedor = require('./Contenedor')
const productos = new Contenedor ('./productos.json')

const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const frase = "Hola mundo cómo están";
app.get('/', (req, res) => {
    res.send(frase);
});

app.get('/productos', async (req, res) => {
    const prods = await productos.getAll()
    res.send(prods)
})

//get productos router

const routerProd = new Router();


routerProd.get('/',  (req, res) => {
    try
    {const prod =productos.getAll();
     res.send (prod) 
    }  
    catch (err) {
     console.log(err);
    }
});

app.use('api/productos', routerProd);


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



