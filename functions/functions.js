
const { promisify } = require('util')
const fs =require("fs")
const writeFileAsync = promisify(fs.writeFile)

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

let funciones={}

funciones.TipoDeSaludo=TipoDeSaludo
funciones.getUser=getUser
funciones.addUser=addUser
funciones.WriteUsers=WriteUsers
funciones.DeleteUser=DeleteUser


module.exports=funciones