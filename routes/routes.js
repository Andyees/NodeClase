const express =require("express")
const fs =require("fs")
const funciones=require('../functions/functions')
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