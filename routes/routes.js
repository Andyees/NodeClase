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
        console.log(req.body)
        Usuario.save().then((data)=>{
            
            console.log("El usuario fue creado exitosamente en la BD") 
            res.redirect("/app")
            res.send({"status":"El usuario fue creado"}); console.log(data)
           
        })
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

    router.get("/EliminarUsuario/:cedula",(req,res)=>{

        const CedulaUser=req.params.cedula
        console.log(req.params)
        user.deleteOne({"Cedula":CedulaUser}).then((resp)=>{
            console.log(resp.deletedCount)
            if(resp.deletedCount===0){
                res.send({status:"Usuario no encontrado"})
            }
            else{
                res.redirect("/app")
            res.send({Status:"Usuario Eliminado Con exito"})}}).catch((err)=>res.send({Status:"No fue posible eliminar el usuario",error:err}))
    })

    router.post("/ActualizarUsuario",(req,res)=>{
    console.log(req.body._id)
    user.updateOne({"_id":req.body._id},req.body)
    .then((resp)=>{
        if(resp.modifiedCount===0){
            res.send({status:"Usuario no encontrado"})
        }
        else{
        console.log("Usuario Actualizado con exito")
        res.redirect("/app")    
        res.send({status:"Usuario Actualizado con exito"})}; console.log(resp)})
    .catch((err)=>{res.send({status:"No se pudo actualizar",error:err})})
        
    })
    router.get("/ActualizarUser/:cedula",async(req,res)=>{

       const cedula=req.params.cedula
       const usuario= await user.findOne({"Cedula":cedula})
       res.render("editar",{Usuario:usuario})
            
        })

    router.get('/',async(req,res)=>{
    
    const users= await user.find()
    await console.log( users)
  | res.render("users",{Usuarios:users})

    
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