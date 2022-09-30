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