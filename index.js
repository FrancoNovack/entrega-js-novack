// FINANCIACION DE AUTOS :

window.onload = function(){
    let opcion = prompt("Escribe '1' entregar usado o '2' para financiar con efectivo")
if (opcion === '1'){
    entregaDeAuto();
}else if (opcion === '2'){
    entregaDeEfectivo();
}


function entregaDeAuto(){
let autoParaEntregar = prompt("Ingresa aqui tu auto:")
alert("El vehiculo ingresado es:" +" "+ autoParaEntregar);
let ValorDelUsado = parseInt(prompt("Valor aproximado del vehiculo:"))
let multiplicacion = ValorDelUsado * 0.1;
let resta = ValorDelUsado - multiplicacion;
let resultadoUsado = resta
alert("El valor aproximado que te tomariamos el auto es a:" +" "+ resultadoUsado);
let autoInteresa = prompt("Indicanos que vehiculo te interesa");
let valorDelNuevo = parseInt(prompt("Indicanos del precio publicado del vehiculo"))
let resultadoDeAutos = valorDelNuevo - resultadoUsado;
console.log("Te queda una diferencia de:" + resultadoDeAutos)
console.log("Lo podes hacer en:")

let interes6 = resultadoDeAutos * 0.2
let cuota6 = (interes6 + resultadoDeAutos) / 6
console.log("6 cuotas de:" + cuota6.toFixed(1))
let interes12 = resultadoDeAutos * 0.4
let cuota12 = (resultadoDeAutos + interes12) / 12
console.log("12 cuotas de:" + cuota12.toFixed(1))
let interes18 = resultadoDeAutos * 0.8
let cuota18 = (resultadoDeAutos + interes18) / 18
console.log("18 cuotas de:" + cuota18.toFixed(1))
let interes24 = resultadoDeAutos * 1.2
let cuota24 = (resultadoDeAutos + interes24) / 24
console.log("24 cuotas de:" + cuota24.toFixed(1))
let interes30 = resultadoDeAutos * 1.6
let cuota30 = (resultadoDeAutos + interes30) / 30
console.log("30 cuotas de:" + cuota30.toFixed(1))
let interes36 = resultadoDeAutos * 2
let cuota36 = (resultadoDeAutos + interes36) / 36
console.log("36 cuotas de:" + cuota36.toFixed(1));


const FINANCIACION = parseInt(prompt("Ingrese la cantidad de cuotas que quisiera realizar: 6, 12, 18, 24, 30, 36"))

switch (FINANCIACION){
    case 6: 
    resultado: console.log("Perfecto!! Te quedarian 6 cuotas de:" + cuota6.toFixed(1));
    break;
    case 12: 
    resultado: console.log("Perfecto!! Te quedarian 12 cuotas de:" + cuota12.toFixed(1));
    break;
    case 18: 
    resultado: console.log("Perfecto!! Te quedarian 18 cuotas de:" + cuota18.toFixed(1));
    break;
    case 24: 
    resultado: console.log("Perfecto!! Te quedarian 24 cuotas de:" + cuota24.toFixed(1));
    break;
    case 30: 
    resultado: console.log("Perfecto!! Te quedarian 30 cuotas de:" + cuota30.toFixed(1));
    break;
    case 36: 
    resultado: console.log("Perfecto!! Te quedarian 36 cuotas de:" + cuota36.toFixed(1));
    break;
    default:
        alert("No estas ingresando una cuota correcta.")
}
}

function entregaDeEfectivo(){
let efectivoParaEntregar = parseInt(prompt("Con cuanto efectivo contas para tu proximo vehiculo?"));
alert("Buenisimo!! dispones de:" + " " + efectivoParaEntregar + " " + "Para tu proximo usado");
let proxVehiculo = prompt("Que vehiculo te interesa?");
let valorProxVehiculo = parseInt(prompt("Valor publicado del usado"));
    alert("Perfecto!! Te interesa" + " " + proxVehiculo + " " + "en" + " " + valorProxVehiculo);
let resta = valorProxVehiculo - efectivoParaEntregar;
let saldoParaFinanciar = resta;
console.log("Te queda un saldo para financiar de:" + saldoParaFinanciar)

let interes6 = saldoParaFinanciar * 0.2
let cuota6 = (interes6 + saldoParaFinanciar) / 6
console.log("6 cuotas de:" + cuota6.toFixed(1))
let interes12 = saldoParaFinanciar * 0.4
let cuota12 = (saldoParaFinanciar + interes12) / 12
console.log("12 cuotas de:" + cuota12.toFixed(1))
let interes18 = saldoParaFinanciar * 0.8
let cuota18 = (saldoParaFinanciar + interes18) / 18
console.log("18 cuotas de:" + cuota18.toFixed(1))
let interes24 = saldoParaFinanciar * 1.2
let cuota24 = (saldoParaFinanciar + interes24) / 24
console.log("24 cuotas de:" + cuota24.toFixed(1))
let interes30 = saldoParaFinanciar * 1.6
let cuota30 = (saldoParaFinanciar + interes30) / 30
console.log("30 cuotas de:" + cuota30.toFixed(1))
let interes36 = saldoParaFinanciar * 2
let cuota36 = (saldoParaFinanciar + interes36) / 36
console.log("36 cuotas de:" + cuota36.toFixed(1));

const FINANCIACION = parseInt(prompt("Ingrese la cantidad de cuotas que quisiera realizar: 6, 12, 18, 24, 30, 36"))

switch (FINANCIACION){
    case 6: 
    resultado: console.log("Perfecto!! Te quedarian 6 cuotas de:" + cuota6.toFixed(1));
    break;
    case 12: 
    resultado: console.log("Perfecto!! Te quedarian 12 cuotas de:" + cuota12.toFixed(1));
    break;
    case 18: 
    resultado: console.log("Perfecto!! Te quedarian 18 cuotas de:" + cuota18.toFixed(1));
    break;
    case 24: 
    resultado: console.log("Perfecto!! Te quedarian 24 cuotas de:" + cuota24.toFixed(1));
    break;
    case 30: 
    resultado: console.log("Perfecto!! Te quedarian 30 cuotas de:" + cuota30.toFixed(1));
    break;
    case 36: 
    resultado: console.log("Perfecto!! Te quedarian 36 cuotas de:" + cuota36.toFixed(1));
    break;
    default:
        alert("No estas ingresando una cuota correcta.")
}
}
}

