const colors=require('colors')
const os= require('os')
const fs=require('fs')
const math= require('./math') 
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
                    //convertir a json
                    // agregar un nuevo empelado al objeto
                    //escribir ese json en el archivos datos Jsobn
                }
            
            })
        }
    
    
    })
}


leerArchivo("./texto.txt","./")




