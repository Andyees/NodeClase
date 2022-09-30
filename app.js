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


//Reglas Enrutamiento
app.get('/',(req,res)=>{

res.sendFile("./index.html",{root:__dirname})

})

app.post('/',(req,res)=>{

    res.json({"respuesta":200})
})
app.put('/',(req,res)=>{

  res.sendStatus(500)

})


//poner a escuchar en nuestro localhost nuestra aplicacion
app.listen(app.get("port"),()=>{

    console.log("Servidor Up en el puerto 3000")
})