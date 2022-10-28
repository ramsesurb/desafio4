const express = require('express');
const {router} = express
const app = express();
const Contenedor = require('./Contenedor')
const pathfile = new Contenedor ('./productos.json')

const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("api/productos",(req,res)=> {
   try
   {const prod =pathfile.getAll();
    res.send (prod) 
   }  
   catch (err) {
    console.log(err);
   }
});

router.get("api/productos/:id",(req,res)=> {
    const id = req.params.id;
    try
    {const prodById =pathfile.getByid(id);  
     res.send (prodById) 
    }  
    catch (err) {
     console.log(err);
    }
 });
 
 router.post("api/productos",(req,res)=> {
    const prod= req.body;
    try
    {const saveProd =pathfile.save(prod);  
     res.send (saveProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });

 router.put("api/productos/:id",(req,res)=> {
    const prod = req.body;
    const lastId = saveCont.length
    const paramFind = req.params.id
    try
    {const prodById =pathfile.getByid(id);
     const newProd = {id:(lastId+1), tittle: prod.tittle ,price: prod.price, thumbnail: prod.thumbnail }
     const saveNewProd= pathfile.save(newProd);  
     res.send (saveProd) 
     res.send (saveNewProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });

 router.delete("api/productos/:id",(req,res)=> {
    const id = req.params.id;
    try
    {const deleteProd =pathfile.deleteById(id);  
     res.send (deleteProd) 
    }  
    catch (err) {
     console.log(err);
    }
 });

 