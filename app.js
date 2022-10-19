const fs =require("fs")
const morgan=require("morgan")
const routes=require("./routes/routes")
let StringConnectionCloud="mongodb+srv://aagudeloj:ClaseFullStack2022@cluster0.frkwosd.mongodb.net/ClaseFullstack?retryWrites=true&w=majority"
let StringConnectionLocal="mongodb://localhost/Usuarios"
const mongoose=require('mongoose')


//Conectandonos a la base de datos
mongoose.connect(StringConnectionCloud).then(()=>{
    console.log("Base de datos Conectada Exitosamente")
}).catch(error=> console.error(error)
)

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
app.use(express.urlencoded({extended:false}))
app.use('/app',routes)





//poner a escuchar en nuestro localhost nuestra aplicacion
app.listen(app.get("port"),()=>{

    console.log("Servidor Up en el puerto 3000")
})
