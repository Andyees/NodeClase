// tipos datos 

import { captureRejectionSymbol } from "events"

var varnull:undefined
var bandera:boolean=true
var numero:number=123
var cosa:any
var array2:boolean[]=[true,false,true]
var array:[string,number]=["hola",1]

interface usuario{
 
    nombre:string;
    edad:number;
    cedula:number
}
var juan:usuario={

    nombre:"JUAN",
    edad:12,
    cedula:9239249
}
//Enum
enum animals {cat,lion=4,dog,monkey}

var gato:animals=animals.cat
console.log(animals[5])
// console.log(usuario)

if(bandera){

    let cadena:string="bandera en false"
    console.log(cadena)
}
//declarar funcion
var decirhola:(name:string)=>string;

decirhola=(name:string)=>{
    return "Hola "+name}

    

    function sumarMuchosNumeros(...args:number[]):number{
        let numeroSuma:number=0
       for (let index = 0; index < args.length; index++) {
            numeroSuma+=args[index]
        
     
        }

        return numeroSuma
    }

    console.log(sumarMuchosNumeros(1,23,54,56,678,8,977))
