const express =require("express")
const fs =require("fs")
const funciones=require('../functions/functions')
const user = require("../models/user")
const router=express.Router()
let usuarios={}
function ReadUsers(ruta){

    fs.readFile(ruta,"utf8",(err,data)=>{
        if(err){
        
            console.error("no se pudo leer archivo")
         console.error(err)
                    }
        else{
       
        let textJson=JSON.parse(data)
        usuarios=textJson
      
                       
                        
                        
                    }
                
                })
            }
ReadUsers('./datos.json')            


//Empezar a crear nuestras reglas





    router.post("/AgregarUsuario", (req,res)=>{
    
        const Usuario=new user(req.body)
        Usuario.save().then((data)=>{
            
            console.log("El usuario fue creado exitosamente en la BD") 
            res.send({"status":"El usuario fue creado"}); console.log(data) })
                        .catch((err)=>{console.error(err); res.send({"status":"El usuario no pudo ser creado"})})
        

    })
    router.get("/ObtenerUsuarios",async(req,res)=>{
   
        const cedulaUser=req.body.cedula

        const UsuarioEncontrado= await user.findOne({"Cedula": cedulaUser})
        await console.log(UsuarioEncontrado)
        if(await UsuarioEncontrado===null){
          res.send({status:"Usuario no encontrado"})
        }
        else{
            await res.send(UsuarioEncontrado)
        }
        
 
    })

    router.delete("/EliminarUsuario",(req,res)=>{

        const CedulaUser=req.body.cedula
        user.deleteOne({"Cedula":CedulaUser}).then((resp)=>{
            console.log(resp.deletedCount)
            if(resp.deletedCount==0){
                res.send({status:"Usuario no encontrado"})
            }
            else{
            res.send({Status:"Usuario Eliminado Con exito"})}}).catch((err)=>res.send({Status:"No fue posible eliminar el usuario",error:err}))
    })

    router.put("/ActualizarUsuario",(req,res)=>{
    user.updateOne({"Cedula":req.body.Cedula},req.body.data)
    .then((resp)=>{
        if(resp.modifiedCount==0){
            res.send({status:"Usuario no encontrado"})
        }
        else{
        res.send({status:"Usuario Actualizado con exito"})}; console.log(resp)})
    .catch((err)=>{res.send({status:"No se pudo actualizar",error:err})})
        
    })

    router.get('/users',async(req,res)=>{
    
    const users= await user.find()
    await console.log( users)
   res.render("users",{Usuarios:users})

    
      })

    router.get('/:id/:nombre',(req,res)=>{

    // res.sendFile("./index.html",{root:__dirname})
    res.send(req.params.id+req.params.nombre)
    
     })
    router.get('/',(req,res)=>{
    
    
        res.render('index.ejs',{saludo:"Hola probando el envio de datos"})
    
      })
    router.post('/',(req,res)=>{
    
    
        console.log(req.body)
        res.send(funciones.TipoDeSaludo(req.body.codigo.id))
    
     })
    router.put('/',(req,res)=>{
    
      res.sendStatus(500)
    
     })
    router.post('/GetUser',(req,res)=>{
    
    let id=req.body.id
    res.send(funciones.getUser(usuarios,id)) 
     })

    router.post('/AddUser',async(req,res)=>{
    
        let user=req.body.User
        
        res.send( await funciones.addUser(user,usuarios))
       // usuarios=ReadUsers()
    //validar que el usuario que se va crear no exista
    // validar que la informacion del usuario este completa
    //Ingresar el usuario a la lista
    //escribir los datos de la lista de usuarios en el archivo
     })
    router.delete('/DeleteUser',async(req,res)=>{
        if(req.body.id===undefined){
            res.send({Error:"No se envio la informacion del id a eliminar"})
        }else{
        let id=req.body.id
        
       res.send( await funciones.DeleteUser(id,usuarios))
        }
    //validar que el id del usuario exista (Si no existe notificar)
    // eliminar el usuario de la lista
    //escribir la lista de usuarios actualizada en el aechivo
    
   })
    router.get("/Users",(req,res)=>{
    
    res.render("users.ejs",{Usuarios:usuarios})
    
     })



//como se exporta
module.exports=router