//Creo la clase constructora para la creación de clientes y selección de servicio

class Cliente {
    constructor(nombre, apellido, email, modelo, anio, patente, serviceElegido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.modelo = modelo;
        this.anio = anio;
        this.patente = patente;
        this.serviceElegido = serviceElegido;
    }
}

const clientePedro = new Cliente("Pedro", "Campos", "pedro.campos@prueba.com", "Ford Ka", 2016, "AA308UX", "alineacionYBalanceo");
const clienteFrancisco = new Cliente("Francisco", "De la Torre", "francisco.delatorre@prueba.com", "Ford Fiesta", 2017, "AB234EF", "evaluacionDeDanos");
const clientePablo = new Cliente("Pablo", "Gomez", "pablo.gomez@prueba.com", "Ford Kuga", 2020, "AE101DS", "serviceAnual");

// creo un array vacio donde se alojaran los clientes creados

const arrayCliente = [];

arrayCliente.push(clientePedro);
arrayCliente.push(clienteFrancisco);
arrayCliente.push(clientePablo);

console.log(arrayCliente);


//Creo la función menú

function menu() {
    alert("Acceso a la Agenda de Servicios de Concesionaria Ford");
    let opcion = parseInt(prompt("Ingrese el numero de opción: \n 1) Alta de Cliente \n 2) Baja de Cliente \n 3) Buscar Cliente \n 4) Salir"));
    return opcion;
}


//creo la función para que el usuario pueda Elegir el tipo de Service para cada cliente

function Service() {
    let opcionDeService = parseInt(prompt("Seleccione el número de tipo de Service a Agendar \n 1) Alineación y Balanceo \n 2) Service Anual \n 3) Evaluacion de Siniestro \n 4) Salir"));

    switch (opcionDeService) {
        case 1:
            opcionDeService = "alineacionYBalanceo";
            break;
        case 2:
            opcionDeService = "serviceAnual";
            break;
        case 3:
            opcionDeService = "EvaluacionDeDanios";
            break;
        case 4:
            salir();
            break;
        default:
            console.log("por favor ingrese tipo de Service correcto");

    }
    return opcionDeService;
}


//funciones para las opciones del menu

function altaCliente() {
    let nombre = prompt("Ingrese el nombre del cliente:");
    let apellido = prompt(" Ingrese el apellido del cliente:");
    let email = prompt("Ingrese el e-mail del cliente:");
    let modelo = prompt("Ingrese el modelo de automovil (formato: marca y modelo):");
    let anio = prompt("Ingrese año del automovil (formato: AAAA): ");
    let patente = prompt("Ingrese patente del automovil:");
    let serviceElegido = Service();
    let cliente = new Cliente(nombre, apellido, email, modelo, anio, patente, serviceElegido);
    arrayCliente.push(cliente);
    console.log(arrayCliente);
}


function bajaCliente() {
    let patente = prompt("ingrese número de Patente: ");
    let cliente = arrayCliente.find(cliente => cliente.patente === patente);
    let eliminarCliente = arrayCliente.indexOf(cliente);
    let clienteEliminado = arrayCliente.splice(eliminarCliente, 1);
    console.log("Ha eliminado al cliente:");
    console.log(clienteEliminado);
}


function buscarCliente() {
    let patente = prompt("ingrese número de Patente: ");
    let cliente = arrayCliente.find(cliente => cliente.patente === patente);
    console.log(cliente);
}


function salir() {
    alert("Ha cerrado correctamente el agendador de Servicios, muchas gracias!");
}

//Inicio el Programa

let opciones = menu();
switch (opciones) {
    case 1:
        altaCliente();
        break;
    case 2:
        bajaCliente();
        break;
    case 3:
        buscarCliente();
        break;
    case 4:
        salir();
        break;


    default:
        console.log("Por favor ingrese una opción del menú");
}