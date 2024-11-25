const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "1",
        titulo: "Goma PIRELLI",
        precio: 30000,
        img: "/img/goma.jfif",
    },
    {
        id: "2",
        titulo: "Llanta R 14 ",
        precio: 20000,
        img: "/img/llanta.jfif",
    },
    {
        id: "3",
        titulo: "Stereo philip",
        precio: 12000,
        img: "/img/stereo.jpg",
    },
    {
        id: "4",
        titulo: "Cubre asiento",
        precio: 20000,
        img: "/img/cubre-asiento.jfif",
    },
    {
        id: "5",
        titulo: "Cubre volante",
        precio: 9000,
        img: "/img/cubre-volante.jpg",
    },
    {
        id: "6",
        titulo: "Polarizado ",
        precio: 50000,
        img: "/img/polarizado.jfif",
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



////////////////

let prodautos = [
    {
        id: "1",
        titulo: "Goma PIRELLI",
        precio: 30000,
        img: "/img/goma.jfif",
    },
    {
        id: "2",
        titulo: "Llanta R 14 ",
        precio: 20000,
        img: "/img/llanta.jfif",
    },
    {
        id: "3",
        titulo: "Stereo philip",
        precio: 12000,
        img: "/img/stereo.jpg",
    },
    {
        id: "4",
        titulo: "Cubre asiento",
        precio: 20000,
        img: "/img/cubre-asiento.jfif",
    },
    {
        id: "5",
        titulo: "Cubre volante",
        precio: 9000,
        img: "/img/cubre-volante.jpg",
    },
    {
        id: "6",
        titulo: "Polarizado ",
        precio: 50000,
        img: "/img/polarizado.jfif",
    }
];
let nombreAuto = document.querySelector(".nombreAuto");
let precioAuto = document.querySelector(".precioAuto");
let imgAuto = document.querySelector(".imgAuto");




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
    if(entrada >= 0){
        alert("Debes entregar algo de capital")
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