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


//get productos router

const routerProd = new Router();
 

routerProd.get('/', async (req, res) => {
    
    try
    {const prod = await productos.getAll();
     res.send (prod) 
    }  
    catch (err) {
     console.log(err);
    }
});

//get productos router ID


const routerById = new Router();

routerById.get('/', async (req,res)=> {
    const id = req.params.id;
    try
    {const prodById = await productos.getByid(id);  
     res.send (prodById) 
     console.log(id);
    }  
    catch (err) {
     console.log(err);
    }
 });
 
 //get productos save
 const routerProdSave = new Router();
 routerProdSave.post("/",async (req,res)=> {
    const prod= req.body;
    try
    {const saveProd = await productos.save(prod);  
     res.send (saveProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });
//productos put

const routerProdPut = new Router();

 routerProdPut.put("/",(req,res)=> {
    const prod = req.body;
    const lastId = saveCont.length
    const paramFind = req.params.id
    try
    {const prodById =productos.getByid(id);
     const newProd = {id:(lastId+1), tittle: prod.tittle ,price: prod.price, thumbnail: prod.thumbnail }
     const saveNewProd= productos.save(newProd);  
     res.send (saveProd) 
     res.send (saveNewProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });
// Delete
const routerProdDelete = new Router();
 routerProdDelete.delete("/",(req,res)=> {
    const id = req.params.id;
    try
    {const deleteProd =productos.deleteById(id);  
     res.send (deleteProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });
// rutas
app.use('/api/productos', routerProd);
app.use('/api/productos/:id', routerById);
//app.use('/api/productos', routerProdSave);
//app.use('/api/productos', routerProdPut);
//app.use('/api/productos', routerProdDelete);


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



