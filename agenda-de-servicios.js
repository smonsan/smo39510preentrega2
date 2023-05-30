

//Cargo mis Servicios desde archivo JSON usando fetch

const listado = document.getElementById ("listado");

const listaServicios = "json/listaServicios.json";

let servicios = [];


//creo la funcion para mostrar mis servicios
const mostrarServicio = () => {

fetch (listaServicios)
        .then (respuesta => respuesta.json ())
        .then (datos => {
            servicios = [datos];
            console.log (servicios);
            datos.forEach (servicio => {
                listado.innerHTML += `
                <div class="card"> 
                    <img class="card-img-top imgImagenServicio img-fluid" src="${servicio.img}" alt="${servicio.tipoDeServicio}">
                    <div class="card-body">
                         <h3>${servicio.tipoDeServicio}</h3>
                         <p>$${servicio.preciodeServicio}</p>
                        <button class="btn btn-primary" id="boton${servicio.id}">Agregar al Carrito</button>
                    </div>
                </div>
                                        
                `
                
            // Agregar servicios al carrito
        const boton = document.getElementById(`boton${servicio.id}`);
        boton.addEventListener("click", () => {
            agregarACarrito(servicio.id);

            //una vez seleccionado el boton se desactiva
            boton.disabled = true;
            boton.styleopacity = 0.95;
        })
            
            }
                )

        })

        
}


//Declaro el array para el carrito de compras de Servicios

let carritoDeServicios = [];


//cargo el carrito desde localStorage
//si hay items cargados en el local storage, me lo agrega al carrito

if(localStorage.getItem("carritoDeServicios")) {
    carritoDeServicios = JSON.parse(localStorage.getItem("carritoDeServicios"));
}



//creo el contenedor para mis cards de servicios

const contenedorDeServicios = document.getElementById("contenedorDeServicios");


//Creo la Función para renderizar mis cards de Servicios

/* const mostrarServicio = () => {
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

            //una vez seleccionado el boton se desactiva
            boton.disabled = true;
            boton.styleopacity = 0.95;
        })
    })
}
 */
mostrarServicio();


//Funcion para agregar al Carrito

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
        const modal = document.createElement("div");
        modal.innerHTML = `
                        <div class= "container-fluid"> 
                            <div class= "row row-cols-3">
                                <div clas= "col">
                                    <p>${servicio.tipoDeServicio}</p>
                                </div>
                                <div clas= "col">  
                                     <p>$${servicio.preciodeServicio}</p>
                                </div>
                                <div clas= "col">
                                    <button class="btn btn-primary" id="eliminar${servicio.id}">Eliminar</button>
                                </div>
                            </div>
                        </div>`
        contenedorCarrito.appendChild(modal);


        //Elimino servicios del array Carrito
        const botonEliminarServicio = document.getElementById(`eliminar${servicio.id}`);
        botonEliminarServicio.onclick=() => {
            eliminarServicio(servicio.id);
            
            //Reactivo boton de los Servicios que elimino del carrito
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


const loguearseYFinalizar = document.getElementById("finalizar");


loguearseYFinalizar.addEventListener("click", () => {
    Swal.fire({
  title: "Ingrese su email",
  input: "email",
  showCancelButton: true,
  confirmButtonText: "Agendar",
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Gracias por Agendar su visita",
        icon: "success",
        confirmButtonText: "Aceptar"
    })
    }   
})
})

