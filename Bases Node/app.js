const colors=require('colors')
const os= require('os')
const fs=require('fs')
const math= require('./math') 
const { Console } = require('console')
// console.log(math.Matematica.add(2,2))
// console.log("prueba".rainbow)
// console.log(math.numerPi)

// console.log(os.networkInterfaces())

function leerArchivo(rutaFile,rutaFolder){

    fs.access(rutaFolder,fs.constants.F_OK,(err)=>{

        if(err){
    
            console.error(err)
        }
        else{
            fs.readFile(rutaFile,"utf8",(err,data)=>{
                if(err){
    
                    console.error("no se pudo leer archivo")
                    console.error(err)
                }
                else{
    
                    console.log(data)
                    let textJson=JSON.parse(data)
                    console.log(textJson)
                    textJson.push({"id":3,"Name":"Camilo","Apellido":"Gonzales","Age":30,"Cargo":"Fullstack JR"})
                    let TextActualizado= JSON.stringify(textJson)
                    console.log(TextActualizado)
                    fs.writeFile(rutaFile,TextActualizado,(err)=>{

                        if(err){

                            console.error("No se pudo escrbir los datos en el archvivo por el siguiente error"+err)
                        }

                        else{
                            console.log("Se escribio la informacion con exito")

                        }
                    })
                    
                }
            
            })
        }
    
    
    })
}


leerArchivo("./datos.json","./")




