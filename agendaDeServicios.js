//creo la clase para construir los servicios a ofrecer

class Servicio {
    constructor(id, tipoDeServicio, preciodeServicio, img) {
        this.id = id;
        this.tipoDeServicio = tipoDeServicio;
        this.preciodeServicio = preciodeServicio;
        this.img = img;
        this.cantidad = 1;
    }
}

const cambioDeAceite = new Servicio(1, "Cambio de Aceite y Filtro", 22900, "img/cambio-de-aceite-2.jpg");
const cambioDePastillasDeFrenos = new Servicio(2, "Cambio de Pastillas de Frenos", 20900, "img/cambio-de-frenos.avif");
const alineacionYBalanceo = new Servicio(3, "Alineación y Balanceo", 8900, "img/alineacion-balanceo.avif");
const rotacionDeNeumaticos = new Servicio(4, " Rotación de Neumaticos", 4490, "img/rotacion-neumaticos-1.jpg");
const inspeccionComputarizada = new Servicio(5, "Inspección Integral por Computadora", 15499, "img/revision-integral.jpg");
const serviceAnual15MKm = new Servicio(6, "Service Anual de 15 mil Km", 47900, "img/revision-integral-siniestro.jpg");


//creo el array de mis Servicios

const servicios = [cambioDeAceite, cambioDePastillasDeFrenos, alineacionYBalanceo, rotacionDeNeumaticos, inspeccionComputarizada, serviceAnual15MKm];


//creo el array para el carrito de Servicios

let carritoDeServicios = [];


//cargo el carrito desde localStorage
//si hay items cargados en el local storage, me lo agrega al carrito

if(localStorage.getItem("carritoDeServicios")) {
    carritoDeServicios = JSON.parse(localStorage.getItem("carritoDeServicios"));
}



//creo el contenedor para mis cards de servicios

const contenedorDeServicios = document.getElementById("contenedorDeServicios");


//funcion para crear mis cards de Servicios

const mostrarServicio = () => {
    servicios.forEach(servicio => {
        const card = document.createElement("div");
        card.classList.add("text-center", "col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                <div class="card"> 
                    <img class="card-img-top imgImagenServicio img-fluid" src="${servicio.img}" alt="${servicio.tipoDeServicio}">
                    <div class="card-body">
                         <h3>${servicio.tipoDeServicio}</h3>
                         <p>$${servicio.preciodeServicio}</p>
                        <button class="btn btn-primary" id="boton${servicio.id}">Agregar al Carrito</button>
                    </div>
                </div>`;
        contenedorDeServicios.appendChild(card);

        // Agregar servicios al carrito
        const boton = document.getElementById(`boton${servicio.id}`);
        boton.addEventListener("click", () => {
            agregarACarrito(servicio.id);

            //pruebo desactivar boton de producto elegido
            boton.disabled = true;
            boton.styleopacity = 0.95;
        })
    })
}

mostrarServicio();


//funcion para agregar al Carrito

const agregarACarrito = (id) => {
    const servicioEnCarrito = carritoDeServicios.find(servicio => servicio.id === id);
    if (servicioEnCarrito) {
        servicioEnCarrito.cantidad++;
    } else {
        const servicio = servicios.find(servicio => servicio.id === id);
        carritoDeServicios.push(servicio);
    }
        //actualizo el carrito trabajando el local storage
        localStorage.setItem("carritoDeServicios",JSON.stringify(carritoDeServicios));
}

const verCarrito = document.getElementById("verCarrito");
verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


//creo la funcion para mostrar el carrito

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carritoDeServicios.forEach(servicio => {
        const card = document.createElement("div");
        card.classList.add("text-center", "col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                    <div class="card"> 
                        <img class="card-img-top imgImagenServicio img-fluid" src="${servicio.img}" alt="${servicio.tipoDeServicio}">
                        <div class="card-body">
                            <h3>${servicio.tipoDeServicio}</h3>
                            <p>$${servicio.preciodeServicio}</p>
                            <p>cantidad Seleccionada ${servicio.cantidad}</p>
                            <button class="btn btn-primary" id="eliminar${servicio.id}">Eliminar del Carrito</button>
                        </div>
                    </div>`;
        contenedorCarrito.appendChild(card);


        //Elimino servicios del array Carrito
        const botonEliminarServicio = document.getElementById(`eliminar${servicio.id}`);
        botonEliminarServicio.onclick=() => {
            eliminarServicio(servicio.id);
            
            //pruebo reactivar boton de producto elegido si lo elimino del carrito
            const boton = document.getElementById(`boton${servicio.id}`);
            boton.disabled = false;
            boton.styleopacity = 0;         
}
    })
    calculodelTotal();
}


//Funcion para eliminar productos del Carrito

const eliminarServicio = (id) => {
    const servicio= carritoDeServicios.find(servicio =>servicio.id===id);
    let indiceServicio = carritoDeServicios.indexOf(servicio);
    carritoDeServicios.splice(indiceServicio,1);
   
    mostrarCarrito();

    //Actualizo el local Storage
    localStorage.setItem("carritoDeServicios", JSON.stringify(carritoDeServicios));
}


//Vaciamos el carrito
const vaciarElCarrito = document.getElementById("vaciarElCarrito");
vaciarElCarrito.addEventListener("click", () => {
    eliminarCarrito ();
})


//funcion para eliminar  todo el carrito

const eliminarCarrito = () => {
    carritoDeServicios = [];

    //Actualizo el local Storage
    localStorage.clear();
    mostrarCarrito ();
}


//funcion para calcular el total del presupuesto
const totalPresupuesto = document.getElementById("totalPresupuesto");

const calculodelTotal = () => {
    let montoTotal = 0;
    carritoDeServicios.forEach(servicio => {
        montoTotal +=servicio.preciodeServicio * servicio.cantidad;

    })
    totalPresupuesto.innerHTML = `Total: $${montoTotal}`;
    console.log (totalPresupuesto);
}


//probando con sweet alert
const botonSwal = document.getElementById("botonSwal");

botonSwal.addEventListener("click", () => {
    Swal.fire ({
        
    })
})

/* const finalizarYAgendar = document.getElementById("finalizarYAgendar");

finalizarYAgendar = () => {
    
} */