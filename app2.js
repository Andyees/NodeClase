const usuarios=ReadUsers()

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
function ReadUsers(){}