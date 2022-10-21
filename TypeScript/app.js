"use strict";
// tipos datos 
exports.__esModule = true;
var varnull;
var bandera = true;
var numero = 123;
var cosa;
var array2 = [true, false, true];
var array = ["hola", 1];
var juan = {
    nombre: "JUAN",
    edad: 12,
    cedula: 9239249
};
//Enum
var animals;
(function (animals) {
    animals[animals["cat"] = 0] = "cat";
    animals[animals["lion"] = 4] = "lion";
    animals[animals["dog"] = 5] = "dog";
    animals[animals["monkey"] = 6] = "monkey";
})(animals || (animals = {}));
var gato = animals.cat;
console.log(animals[5]);
// console.log(usuario)
if (bandera) {
    var cadena = "bandera en false";
    console.log(cadena);
}
//declarar funcion
var decirhola;
decirhola = function (name) {
    return "Hola " + name;
};
function sumarMuchosNumeros() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var numeroSuma = 0;
    for (var index = 0; index < args.length; index++) {
        numeroSuma += args[index];
    }
    return numeroSuma;
}
console.log(sumarMuchosNumeros(1, 23, 54, 56, 678, 8, 977));
