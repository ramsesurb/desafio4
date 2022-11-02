const express = require('express');
const {Router} = express
const app = express();
const Contenedor = require('./Contenedor')
const productos = new Contenedor ('./productos.json')
const { promises: fs } = require('fs');

const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const frase = "Desafio 4";
app.get('/', (req, res) => {
    res.send(frase);
});


//get productos router

const routerProd = new Router();

app.use('/api/productos', routerProd);
 
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

    app.use('/api', routerById);

    routerById.get('/productos/:id', async (req,res)=> {
    
    const id = parseInt(req.params.id)
    ;
    try
    {const prodById = await productos.getByid(id);  
     res.send (prodById) 
     
    }  
    catch (err) {
     console.log(err);
    }
 });

 // Delete


const routerProdDelete = new Router();

app.use('/api', routerProdDelete);

routerProdDelete.delete('/productos/:id', async (req,res)=> {

        const id = parseInt(req.params.id)
        try
        {const deleteProd = await productos.deleteById(id);  
        res.send (deleteProd) 
        }  
        catch (err) {
        console.log(err);
        }
});

 
 //get productos save

 const routerProdSave = new Router();

 app.use('/api', routerProdSave);

 routerProdSave.post("/productos",async (req,res)=> {
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

app.use('/api', routerProdPut);

 routerProdPut.put("/productos/:id", async (req,res)=> {
    const prod = req.body;
    const id = parseInt(req.params.id)
    try
    {
     const saveProd = await productos.getByid(id);
     const newProd = {id:id, tittle: prod.tittle ,price: prod.price, thumbnail: prod.thumbnail }
     const deleteProd = await productos.deleteById(id);
     await deleteProd.push(newProd);
     await fs.writeFile(`./productos.json`, JSON.stringify(deleteProd ,null, 2))
     res.send ( newProd )
    }  
    catch (err) {
     console.log(err);
    }
 });


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



