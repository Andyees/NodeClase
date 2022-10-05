const fs =require("fs")
let usuarios={}
ReadUsers("datos.json")

const morgan=require("morgan")

//Inicializamos aplicacon con express
const express=require('express')
const app=express()

//Asignamiento de propiedades a nuestra aplicacion
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

app.post('/AddUser',(req,res)=>{

    let user=req.body.User
    res.send(addUser(user,usuarios))
   // usuarios=ReadUsers()
//validar que el usuario que se va crear no exista
// validar que la informacion del usuario este completa
//Ingresar el usuario a la lista
//escribir los datos de la lista de usuarios en el archivo
})
app.delete('DeleteUser/',(req,res)=>{
//validar que el id del usuario exista (Si no existe notificar)
// eliminar el usuario de la lista
//escribir la lista de usuarios actualizada en el aechivo

})



//poner a escuchar en nuestro localhost nuestra aplicacion
app.listen(app.get("port"),()=>{

    console.log("Servidor Up en el puerto 3000")
})


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
        
        console.log(data)
        let textJson=JSON.parse(data)
        usuarios=textJson
                       
                        
                        
                    }
                
                })
            }

function addUser(user,listausuarios){

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
    WriteUsers(listausuarios,"datos.json")

      
  


}
 
async function WriteUsers(data,ruta){
    let texto =JSON.stringify(data)
    await fs.writeFile(ruta,texto,(err)=>{

        if(err){

            console.error("No se pudo escrbir los datos en el archvivo por el siguiente error"+err)
            return false
        }

        else{
            console.log("Se escribio la informacion con exito")
            return ("Se escribio la informacion con exito")

        }
    })
}

