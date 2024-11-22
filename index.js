const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        precio: 3000,
        img: "./img/01.jpg",
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        precio: 3000,
        img: "./img/02.jpg",
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        precio: 3000,
        img: "./img/03.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const irAlCarrito = document.querySelector("#ir-al-carrito");

productos.forEach((producto) => {

    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);
    contenedorProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();

    Toastify({
        text: producto.titulo + " agregado",
        avatar: producto.img,
        duration: 1500,
        close: true,
        className: "toast-agregar",
        style: {
          background: "#ff3c00",
          color: "#f2ebd9"
        },
      }).showToast();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none");
        irAlCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");
        irAlCarrito.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>${producto.cantidad}</p>
                <p>$${producto.cantidad * producto.precio}</p>
            `;

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })

            div.append(button);
            carritoProductos.append(div);
        })
    }
    actualizarTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}
actualizarCarrito();

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total;
}

vaciarCarrito.addEventListener("click", () => {
    const cantidadTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    Swal.fire({
        title: "¿Seguro querés vaciar el carrito?",
        text: "Se van a borrar " + cantidadTotal + " productos.",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Sí"
      }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            actualizarCarrito();
            Swal.fire({
                icon: "success",
                title: "Carrito vaciado",
                showConfirmButton: false,
                timer: 1500
            });
        }
      })
})


let contenedorCarrito = document.querySelector("#pagina-carrito");

let carritoLS = JSON.parse(localStorage.getItem("carrito"));

carritoLS.forEach(producto => {
    let div = document.createElement("div");
    div.classList.add("pagina-carrito-producto");
    div.innerHTML = `
            <img src="${producto.img}" alt="">
            <h2>${producto.titulo}</h2>
            <p>$${producto.precio.toLocaleString()}</p>
            <p>${producto.cantidad}</p>
            <p>$${producto.cantidad * producto.precio}</p>
    `;

    contenedorCarrito.append(div);
});



let nombreUsuario = prompt("ingresa tu nombre")
localStorage.setItem("nombre", nombreUsuario)
let titulo = document.getElementById("nombre");
titulo.innerHTML= "Hola, " + nombreUsuario;


document.getElementById('credito-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores del formulario
    const precioAuto = parseFloat(document.getElementById('precioAuto').value);
    const entrada = parseFloat(document.getElementById('entrada').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    let tasaAnual = parseFloat(document.getElementById('tasa').value);

    let precioAutoJs =  JSON.stringify(precioAuto);
    let entradaJs =  JSON.stringify(entrada);
    let plazoJs =  JSON.stringify(plazo);

    // Verificar que la entrada sea válida (no mayor al precio del auto)
    if (entrada >= precioAuto) {
        alert("La entrada no puede ser mayor o igual al precio del automóvil.");
        return;
        
    }

    // Calcular el monto a financiar
    const montoFinanciar = precioAuto - entrada;

    // Aplicar incremento de tasa según el plazo
    if (plazo === 6 ){
        tasaAnual += 0.2;
    } else if (plazo === 12) {
        tasaAnual += 0.5; // Incremento de 0.5% por 12 meses
    } else if (plazo === 18) {
        tasaAnual += 1; // Incremento de 1% por 18 meses
    } else if (plazo === 24) {
        tasaAnual += 1.5; // Incremento de 1.5% por 24 meses
    } else if (plazo === 36) {
        tasaAnual += 2; // Incremento de 2% por 36 meses
    }

    // Convertir tasa de interés anual a mensual y expresarla en decimales
    const tasaMensual = tasaAnual / 100 / 12;

    // Cálculo de la cuota mensual con la fórmula de anualidad
    const cuotaMensual = (montoFinanciar * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    let cuotaMensualJs =  JSON.stringify(cuotaMensual);
    localStorage.setItem("El valor del auto es:" , precioAutoJs);
    localStorage.setItem("El capital que contas es:", entradaJs);
    localStorage.setItem("La cantidad de cuotas seleccionadas son:" , plazoJs);
    localStorage.setItem("el valor de la cuota mensual sera de:", cuotaMensualJs)

    // Mostrar el resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h3>Resultado</h3>
                            <p>Precio del automóvil: <strong>$${precioAuto.toFixed(2)}</strong></p>
                            <p>Dinero entregado como entrada: <strong>$${entrada.toFixed(2)}</strong></p>
                            <p>Monto a financiar: <strong>$${montoFinanciar.toFixed(2)}</strong></p>
                            <p>Plazo seleccionado: <strong>${plazo} meses</strong></p>
                            <p>Tasa de interés ajustada: <strong>${tasaAnual.toFixed(2)}%</strong></p>
                            <p>La cuota mensual es de: <strong>$${cuotaMensual.toFixed(2)}</strong></p>`;
});

/* 
PREENTREGA N°1

window.onload = function(){
    let opcion = prompt("Escribe '1' entregar usado o '2' para financiar con efectivo")
if (opcion === '1'){
    entregaDeAuto();
}else if (opcion === '2'){
    entregaDeEfectivo();
}


function entregaDeAuto(){
let autoParaEntregar = prompt("Ingresa aqui tu auto:")
window.write("El vehiculo ingresado es:" +" "+ autoParaEntregar);
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


*/