const pi=3.1415
function suma(x1,x2){
    return x1+x2
}
function resta(x1,x2){
    return x1-x2
}

function multply(x1,x2){
    return x1*x2
}



const math={}
math.add=suma
math.substract=resta
math.multiply=multply




module.exports={Matematica:math, numerPi:pi}