const fs =require("fs")
const { promisify } = require('util')
let usuarios={}
ReadUsers("datos.json")
const writeFileAsync = promisify(fs.writeFile)
const morgan=require("morgan")

//Inicializamos aplicacon con express
const express=require('express')
const app=express()

//Asignamiento de propiedades a nuestra aplicacion
app.set('view engine','ejs')
app.set("port",3000)
app.set("NameServer","ServidorClase")

// Middlewares
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.json())


//Reglas Enrutamiento
app.get('/:id/:nombre',(req,res)=>{

// res.sendFile("./index.html",{root:__dirname})
res.send(req.params.id+req.params.nombre)

})
app.get('/',(req,res)=>{


    res.render('index.ejs',{saludo:"Hola probando el envio de datos"})

})
app.post('/',(req,res)=>{


    console.log(req.body)
    res.send(TipoDeSaludo(req.body.codigo.id))

})
app.put('/',(req,res)=>{

  res.sendStatus(500)

})
app.post('/GetUser',(req,res)=>{

let id=req.body.id
res.send(getUser(usuarios,id)) 
})

app.post('/AddUser',async(req,res)=>{

    let user=req.body.User
    
    res.send( await addUser(user,usuarios))
   // usuarios=ReadUsers()
//validar que el usuario que se va crear no exista
// validar que la informacion del usuario este completa
//Ingresar el usuario a la lista
//escribir los datos de la lista de usuarios en el archivo
})
app.delete('/DeleteUser',async(req,res)=>{
    if(req.body.id===undefined){
        res.send({Error:"No se envio la informacion del id a eliminar"})
    }else{
    let id=req.body.id
    
   res.send( await DeleteUser(id,usuarios))
    }
//validar que el id del usuario exista (Si no existe notificar)
// eliminar el usuario de la lista
//escribir la lista de usuarios actualizada en el aechivo

})



//poner a escuchar en nuestro localhost nuestra aplicacion
app.listen(app.get("port"),()=>{

    console.log("Servidor Up en el puerto 3000")
})



//Funciones

function TipoDeSaludo(numero){

    switch(numero){

        case 1: return("Hola como estas")

        break;

        case 2: return ("Helloo")

        case 3: return("bon jour")

        default: return ("Saludo no encontrado")

    }
}
function getUser(ListUsuarios,id){

    for (const x of ListUsuarios) {

      if(x.id===id){
        return x
      }
        
    }
    return {"Respuesta": "Usuario no encontrado"}

}
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
async function DeleteUser(id,listausuarios){
    let UserExiste=false
    let indexUser
  for (let i=0;i<listausuarios.length;i++) {
    if(id===listausuarios[i].id){
        UserExiste=true
        indexUser=i
        break
    }
  }


   if(UserExiste){
    listausuarios.splice(indexUser,1) //remover User
    let respuesta= await WriteUsers(listausuarios,"datos.json")
    if( await respuesta.Respuesta!=undefined){
        return{"Respuesta":"El usuario ha sido eliminado con exito"}

    }
    else{
        return{"Error":"No se pudo actualizar el archivo"}
    }
   }}
   
            

async function addUser(user,listausuarios){

    if(user.id===undefined || user.Name===undefined ||user.Apellido===undefined ||user.Age===undefined ||user.Cargo===undefined ){

        return({"respuesta":"No se agrega el usuario porque no cumple la estructura completa de las propiedades"})
    }
    console.log(listausuarios)
    for (const x of listausuarios) {
        if(x.id===user.id){
            return({"respuesta":"El usuario ya existe con ese id"})
        }
        

    }


   
    listausuarios.push(user)
    let respuesta=await WriteUsers(listausuarios,"datos.json")

    return await respuesta

      
  


}
 
async function WriteUsers(data,ruta){
    let texto =JSON.stringify(data)
    let stateWrite=await writeFileAsync(ruta,texto)
    console.log(stateWrite)
    if(stateWrite){

        console.error("No se pudo escrbir los datos en el archvivo por el siguiente error"+err)
        return ({Error:"No se pudo escrbir los datos en el archvivo"})
    }

    else{
        console.log("Se escribio la informacion con exito")
        return ({Respuesta:"Se escribio la informacion con exito"})

    }
}

