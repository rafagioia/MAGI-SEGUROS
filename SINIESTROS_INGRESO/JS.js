
(function () {
  'use strict'

  var forms= document.querySelectorAll('.needs-validation')


  Array.prototype.slice.call(forms)
  .forEach(function (form){
    form.addEventListener('submit',function (event){
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  }
  )
})()
////////////// FECHADO AUTOMATICO GESTION /////////////

// Obtener el elemento input
const fechaInput = document.getElementById('fechages');

// Obtener la fecha actual
const fechaHoy = new Date();

// Obtener día, mes y año
const dia = String(fechaHoy.getDate()).padStart(2, '0');
const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0');
const anio = fechaHoy.getFullYear();

// Formatear la fecha como DD/MM/YYYY
const fechaFormateada = `${dia}/${mes}/${anio}`;

// Establecer el valor del input como la fecha formateada
fechaInput.value = fechaFormateada;


////////////// ESTILOS DE LA NAV BAR //////////////////
let navbar = document.querySelector(".navbar");

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
navLinks.classList.toggle("show3");
}
let emisionArrow = document.querySelector(".emision-arrow");
emisionArrow.onclick = function() {
navLinks.classList.toggle("show4");
}
let emisionsub1Arrow = document.querySelector(".emisionSub1-arrow");
emisionsub1Arrow.onclick = function() {
navLinks.classList.toggle("show5");
}

let cobranzasSub2 = document.querySelector(".cobranzasSub2-arrow");
cobranzasSub2.onclick = function() {
navLinks.classList.toggle("show6");
}
let cobranzasSub3 = document.querySelector(".cobranzasSub3-arrow");
cobranzasSub3.onclick = function() {
navLinks.classList.toggle("show7");
}

 ///////// INGRESAR SINIESTRO NUEVO ///////////////
function ingresarSiniestro(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-ingreso');
 boton.disabled = true;

   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombreCompleto").value;
   let infoPatente =  document.getElementById("patente").value;
   let infoMarca =  document.getElementById("marca").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoDanos =  document.getElementById("danos").value;
   let infoRiesgo =  document.getElementById("riesgo").value;
   let infoUsuario =  sessionStorage.getItem("magi-usuario");
   let infoFechaSin =  document.getElementById("fechasin").value;
   let infoHoraSin =  document.getElementById("horasin").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoCalles =  document.getElementById("calles").value;
   let infoRelato =  document.getElementById("relato").value;
   let infoEstado =  document.getElementById("estado").value;
   let infoTramite =  document.getElementById("tramite").value;
   let infoTaller =  document.getElementById("taller").value;
   let infoFechaAges =  document.getElementById("fechages").value;
   let infoNumSin =  document.getElementById("numSin").value;
   let infoSucursal =  "MARCOS PAZ"
   var fecha = new Date().toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
   var notas1 = "//" + infoUsuario + " [" + fecha + "] CARGA DE SINIESTRO. (" + document.getElementById("notas").value + ")";

let camposFaltantes = [];

// Función para agregar un campo faltante al array correspondiente
const agregarCampoFaltante = (campo, nombreCampo) => {
 if (campo === "") {
   camposFaltantes.push(nombreCampo);
 }
};

// Verificación de cada campo y agregación al array de campos faltantes si es necesario
agregarCampoFaltante(infoDNI, "DNI");
agregarCampoFaltante(infoCliente, "Cliente");
agregarCampoFaltante(infoWpp, "WhatsApp");
agregarCampoFaltante(infoPatente, "Patente");
agregarCampoFaltante(infoMarca, "Marca");
agregarCampoFaltante(infoCnia, "Compañía");
agregarCampoFaltante(infoDanos, "Daños");
agregarCampoFaltante(infoFechaSin, "Fecha del siniestro");
agregarCampoFaltante(infoHoraSin, "Hora del siniestro");
agregarCampoFaltante(infoRelato, "Relato");
agregarCampoFaltante(infoEstado, "Estado");
agregarCampoFaltante(infoRiesgo, "Tipo de riesgo");
agregarCampoFaltante(infoTramite, "Trámite");
agregarCampoFaltante(infoFechaAges, "Fecha de Proxima Gestion");

// Verificación final y muestra del mensaje de alerta
if (camposFaltantes.length > 0) {
 boton.disabled = false;
 const mensaje = `Falta ingresar en los siguientes campos: ${camposFaltantes.join(", ")}`;
 return alert(mensaje);
}


var datosTerceros = {};
var contador = parseInt(document.getElementById("contador").value);

for (var i = 1; i <= contador; i++) {
 var tercero = {
   DNI: document.getElementById('dni3ro' + i).value,
   NOMBRE: document.getElementById('nombreCompleto3ro' + i).value,
   PATENTE: document.getElementById('patente3ro' + i).value,
   MARCA: document.getElementById('marca3ro' + i).value,
   WPP: document.getElementById('wpp3ro' + i).value,
   CNIA: document.getElementById('cnia3ro' + i).value,
   DAÑOS: document.getElementById('danos3ro' + i).value
 };
 datosTerceros['tercero' + i] = tercero;
}

 google.script.run.siniestroNuevo(infoPatente, infoNumSin, infoFechaSin, infoDNI, infoCliente, infoCnia, infoRiesgo, infoEstado, infoTramite, infoFechaAges, infoTaller, notas1, infoDanos, infoMarca, infoWpp, infoPatente, infoRelato, datosTerceros, infoHoraSin, fecha, infoCalles, infoLocalidad, infoSucursal);

alert('¡Siniestro ingresado correctamente!');
 
document.getElementById("dni").value = "";
document.getElementById("nombreCompleto").value = "";
document.getElementById("patente").value = "";
document.getElementById("marca").value = "";
document.getElementById("wpp").value = "";
document.getElementById("cnia").value = "";
document.getElementById("danos").value = "";
document.getElementById("riesgo").value = "";
document.getElementById("fechasin").value = "";
document.getElementById("horasin").value = "";
document.getElementById("localidad").value = "";
document.getElementById("calles").value = "";
document.getElementById("relato").value = "";
document.getElementById("estado").value = "";
document.getElementById("tramite").value = "";
document.getElementById("taller").value = "";
document.getElementById("fechages").value = "";
document.getElementById("numSin").value = "";
document.getElementById("notas").value = "";
document.getElementById("text-box-buscarPatente").value = "";
document.getElementById("text-box-numeroInventario_dni").value = "";
   boton.disabled = false;

   eliminarUltimoDiv()
   eliminarUltimoDiv()
   eliminarUltimoDiv()
   eliminarUltimoDiv()
   eliminarUltimoDiv()
   datosTerceros.value = "";
   contador.value = "";
}



function mostrarOpciones() {
 var riesgo = document.getElementById("riesgo").value;
 var subRiesgo = document.getElementById("tramite");
 subRiesgo.textContent = "";
 
   var tramitesPorDefecto = subRiesgo.appendChild(document.createElement("optgroup"));
 tramitesPorDefecto.label = "Trámites por defecto";

 // Opciones comunes para las posiciones 7 en adelante
 tramitesPorDefecto.appendChild(new Option("FALTAN DATOS"));
 tramitesPorDefecto.appendChild(new Option("PARA CARGAR"));
 tramitesPorDefecto.appendChild(new Option("NO RECLAMA"));
 tramitesPorDefecto.appendChild(new Option("CON PROBLEMA"));
 tramitesPorDefecto.appendChild(new Option("SIN COBERTURA"));
 tramitesPorDefecto.appendChild(new Option("TRAMITANDO ALFREDO"));
 tramitesPorDefecto.appendChild(new Option("LEGALES"));
 tramitesPorDefecto.appendChild(new Option("PIDEN AMPLIACIÓN"));
 tramitesPorDefecto.appendChild(new Option("RESUELTO"));
 tramitesPorDefecto.appendChild(new Option("VER COMO GESTIONA"));


 var tramitesSegunRiesgo = subRiesgo.appendChild(document.createElement("optgroup"));
tramitesSegunRiesgo.label = "Trámites para " + riesgo.toLowerCase();
switch (riesgo) {
 case "CLEAS":
     tramitesSegunRiesgo.appendChild(new Option("CL-1 ESPERANDO DOCUMENTACION"));
     tramitesSegunRiesgo.appendChild(new Option("CL-2 RESOLUCIÓN CLEAS"));
     tramitesSegunRiesgo.appendChild(new Option("CL-3 ESPERANDO ELIJA TALLER"));
     tramitesSegunRiesgo.appendChild(new Option("CL-4 INSPECCIÓN EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("CL-5 ESPERANDO CARTA FCIA"));
     tramitesSegunRiesgo.appendChild(new Option("CL-6 EN COTIZACIÓN"));
     tramitesSegunRiesgo.appendChild(new Option("CL-7 ESPERANDO REPUESTOS"));
     tramitesSegunRiesgo.appendChild(new Option("CL-8 PAGO EN CURSO"));
   break;
 case "DAÑO POR ROBO TOTAL":
 case "INTERASEGURADOS":
 case "TODO RIESGO":
 case "GRANIZO":
 case "INCENDIO PARCIAL":
     tramitesSegunRiesgo.appendChild(new Option("DP-1 ESPERANDO DOCUMENTACION"));
     tramitesSegunRiesgo.appendChild(new Option("DP-2 ESPERANDO CNIA HABILITE"));
     tramitesSegunRiesgo.appendChild(new Option("DP-3 ESPERANDO ELIJA TALLER"));
     tramitesSegunRiesgo.appendChild(new Option("DP-4 INSPECCIÓN EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("DP-5 ESPERANDO CARTA FCIA"));
     tramitesSegunRiesgo.appendChild(new Option("DP-6 EN COTIZACIÓN"));
     tramitesSegunRiesgo.appendChild(new Option("DP-7 ESPERANDO REPUESTOS"));
     tramitesSegunRiesgo.appendChild(new Option("DP-8 PAGO EN CURSO"));
   break;
 case "DEST. TOTAL":
 case "INCENDIO TOTAL":
     tramitesSegunRiesgo.appendChild(new Option("DT-1 ESPERANDO DOCUMENTACION (CAUSA PENAL / INFORME BOMBEROS)"));
     tramitesSegunRiesgo.appendChild(new Option("DT-2 INSPECCIÓN EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("DT-3 COTIZANDO SI ES DT"));
     tramitesSegunRiesgo.appendChild(new Option("DT-4 ACUERDO DE PAGO"));
     tramitesSegunRiesgo.appendChild(new Option("DT-5 BAJA Y RETIRO DE UNIDAD"));
     tramitesSegunRiesgo.appendChild(new Option("DT-6 PAGO EN CURSO"));
   break;
 case "ROBO TOTAL":
     tramitesSegunRiesgo.appendChild(new Option("RT-1 ESPERANDO CNIA HABILITE"));
     tramitesSegunRiesgo.appendChild(new Option("RT-2 ESPERANDO APARICIÓN"));
     tramitesSegunRiesgo.appendChild(new Option("RT-3 HACIENDO BAJA"));
     tramitesSegunRiesgo.appendChild(new Option("RT-4 ACUERDO DE PAGO"));
     tramitesSegunRiesgo.appendChild(new Option("RT-5 FORMULARIO 15"));
     tramitesSegunRiesgo.appendChild(new Option("RT-6 PAGO EN CURSO"));
   break;
     case "HOGAR":
   case "COMERCIO":
   case "BICICLETA":
     tramitesSegunRiesgo.appendChild(new Option("HC-1 ESPERANDO DOCUMENTACION (PRE-EXISTENCIAS/INFORME TECNICO)"));
     tramitesSegunRiesgo.appendChild(new Option("HC-2 INSPECCIÓN EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("HC-3 ACUERDO DE PAGO"));
     tramitesSegunRiesgo.appendChild(new Option("HC-4 ENVIAR CBU, DNI Y ACUERDO"));
     tramitesSegunRiesgo.appendChild(new Option("HC-5 PAGO EN CURSO"));
     break;
   case "CRISTALES":
   case "CERRADURA":
   case "ROBO PARCIAL":
     tramitesSegunRiesgo.appendChild(new Option("CR-1 ESPERANDO DOCUMENTACION"));
     tramitesSegunRiesgo.appendChild(new Option("CR-2 ESPERANDO CNIA HABILITE"));
     tramitesSegunRiesgo.appendChild(new Option("CR-3 INSPECCIÓN EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("CR-4 ELEGIENDO PROVEEDOR"));
     tramitesSegunRiesgo.appendChild(new Option("CR-5 ESPERANDO VOUCHER"));
     tramitesSegunRiesgo.appendChild(new Option("CR-6 ESPERANDO REPOSICIÓN"));
     tramitesSegunRiesgo.appendChild(new Option("CR-7 PAGO EN CURSO"));
     tramitesSegunRiesgo.appendChild(new Option("CR-8 REPARANDO"));
     break;
   case "ACC. PERS.":
     tramitesSegunRiesgo.appendChild(new Option("AP-1 ESPERANDO DOCUMENTACION"));
     tramitesSegunRiesgo.appendChild(new Option("AP-2 ESPERANDO CNIA HABILITE"));
     tramitesSegunRiesgo.appendChild(new Option("AP-3 EN ANALISIS"));
     tramitesSegunRiesgo.appendChild(new Option("AP-7 PAGO EN CURSO"));
     break;
   case "RECLAMO 3ROS":
   case "GRUA":
     tramitesSegunRiesgo.appendChild(new Option("R3-1 ESPERANDO DOCUMENTACION"));
     tramitesSegunRiesgo.appendChild(new Option("R3-2 ESPERANDO OFRECIMIENTO"));
     tramitesSegunRiesgo.appendChild(new Option("R3-3 SE PIDIO RECONSIDERACION"));
     tramitesSegunRiesgo.appendChild(new Option("R3-4 PAGO EN CURSO"));
     break;
   default:
 }
}


(function () {
  'use strict'

  var forms= document.querySelectorAll('.needs-validation')


  Array.prototype.slice.call(forms)
  .forEach(function (form){
    form.addEventListener('submit',function (event){
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  }
  )
})()


 ///// SCRIPT PARA BUSCAR DATOS POR PATENTE COBRANZAS //////////
function buscarRegistros() {
 const boton = document.getElementById('buscarRegistrosBtn1');
 const spinner = document.getElementById('spinner1');
 spinner.style.display = 'inline-block';
 boton.disabled = true;

 const numeroInventario = document.getElementById("text-box-buscarPatente").value;
 let infoDNI = document.getElementById("dni");
 let infoCliente = document.getElementById("nombreCompleto");
 let infoWpp = document.getElementById("wpp");
 let infoPatente = document.getElementById("patente");
 let infoMarca = document.getElementById("marca");
 let infoCnia = document.getElementById("cnia");
 let infoDanio = document.getElementById("danos");

 google.script.run
   .withSuccessHandler(info => {

     if (info.length > 0) {
       infoDNI.value = info[0][2];
       infoCliente.value = info[0][3];
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][1];
       infoMarca.value = info[0][13];
       infoCnia.value = info[0][10];
     } else {
       alert("No se encontraron valores");
     }
     spinner.style.display = 'none';
     boton.disabled = false;
   })
   .buscarMantenimientos(numeroInventario);

 google.script.run
 .withSuccessHandler( info => {
   if (info.length > 0) {
     infoDanio.value = info[0][15];
   } else {
   }
 })
 .buscarMantenimientos3(numeroInventario);
     
 if (infoDNI.value) {
   google.script.run.withSuccessHandler(mostrarFotos_reg).obtenerFotosPorDNI(infoDNI.value);
 } else {
 }
}
           ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR  PATENTE COBRANZAS  ////////


 /// SCRIPT PARA BUSCAR DATOS POR PATENTE EMISION //////////
     function buscarRegistros_emision() {
 const boton = document.getElementById('buscarRegistrosBtn2');
 const spinner = document.getElementById('spinner2');
 spinner.style.display = 'inline-block';
 boton.disabled = true;

       const numeroInventario = document.getElementById("text-box-buscarPatente").value;
       let infoDNI =  document.getElementById("dni");
       let infoCliente =  document.getElementById("nombreCompleto");
       let infoWpp =  document.getElementById("wpp");
       let infoPatente =  document.getElementById("patente");
       let infoMarca =  document.getElementById("marca");
       let infoCnia =  document.getElementById("cnia");
       let infoDanio =  document.getElementById("danos");

 google.script.run
 .withSuccessHandler( info => {
   if (info.length > 0) {
     infoDNI.value = info[0][1];
     infoCliente.value = info[0][2];
     infoWpp.value = info[0][4];
     infoPatente.value = info[0][0];
     infoMarca.value = info[0][12];
     infoCnia.value = info[0][6];
     infoDanio.value = info[0][15];
   } else {
     alert("No se encontraron valores")
   }
   spinner.style.display = 'none';
   boton.disabled = false;
 })
 .buscarMantenimientos3(numeroInventario);
 
 if (infoDNI.value) {
   google.script.run.withSuccessHandler(mostrarFotos_reg).obtenerFotosPorDNI(infoDNI.value);
 } else {
 }
}
           ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR PATENTE EMISION //////////

 ///// SCRIPT PARA BUSCAR DATOS POR DNI COBRANZAS //////////
     function buscarRegistros_dni() {
 const boton = document.getElementById('buscarRegistrosBtn3');
 const spinner = document.getElementById('spinner3');
 spinner.style.display = 'inline-block';
 boton.disabled = true;
       const numeroInventario2 = document.getElementById("text-box-numeroInventario_dni").value;
       let infoDNI =  document.getElementById("dni");
       let infoCliente =  document.getElementById("nombreCompleto");
       let infoWpp =  document.getElementById("wpp");
       let infoPatente =  document.getElementById("patente");
       let infoMarca =  document.getElementById("marca");
       let infoCnia =  document.getElementById("cnia");
       let infoNotas =  document.getElementById("notas");
       let infoDanio =  document.getElementById("danos");

       google.script.run.withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDNI.value = info[0][2];
       infoCliente.value = info[0][3];
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][1];
       infoMarca.value = info[0][13];
       infoCnia.value = info[0][10];
       infoNotas.value = info[0][18];

         } else {
           alert("No se encontraron valores")
         }
   spinner.style.display = 'none';
   boton.disabled = false;

       })
       .buscarMantenimientos2(numeroInventario2)
       

               google.script.run.withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDanio.value = info[0][15];

         } else {
         }

       })
       .buscarMantenimientos4(numeroInventario2)



 if (numeroInventario2) {
   google.script.run.withSuccessHandler(mostrarFotos_reg).obtenerFotosPorDNI(numeroInventario2);
 } else {
 }
     }
           ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI COBRANZAS //////////


 ///// SCRIPT PARA BUSCAR DATOS POR DNI BD EMISION//////////
     function buscarRegistros_dni_emision() {
 const boton = document.getElementById('buscarRegistrosBtn4');
 const spinner = document.getElementById('spinner4');
 spinner.style.display = 'inline-block';
 boton.disabled = true;
       const numeroInventario2 = document.getElementById("text-box-numeroInventario_dni").value;
       let infoDNI =  document.getElementById("dni");
       let infoCliente =  document.getElementById("nombreCompleto");
       let infoWpp =  document.getElementById("wpp");
       let infoPatente =  document.getElementById("patente");
       let infoMarca =  document.getElementById("marca");
       let infoCnia =  document.getElementById("cnia");
       let infoDanio =  document.getElementById("danos");

       google.script.run.withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDNI.value = info[0][1];
       infoCliente.value = info[0][2];
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][0];
       infoMarca.value = info[0][12];
       infoCnia.value = info[0][6]; 
       infoDanio.value = info[0][15];

         } else {
           alert("No se encontraron valores")
         }
   spinner.style.display = 'none';
   boton.disabled = false;

       })
       .buscarMantenimientos4(numeroInventario2)

 if (numeroInventario2) {
   google.script.run.withSuccessHandler(mostrarFotos_reg).obtenerFotosPorDNI(numeroInventario2);
 } else {
 }
     }
           ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////


function enviarMensajeWPP() {
 event.preventDefault();
 // Obtener el número de teléfono ingresado
 var telefono = document.getElementById("wpp").value;

 // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
 window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}


function eliminarUltimoDiv() {
 event.preventDefault();
 // Obtener el último div creado
 let ultimoDiv = divs.pop();
 // Obtener el ID del último div creado
 let ultimoDivId = ultimoDiv.getAttribute("id");
 // Obtener el número del contador del último div creado
 let ultimoContador = parseInt(ultimoDivId.slice(-1));
 // Reducir el contador en 1
 contador--;
 // Obtener el contenedor de los divs
 let contenedorDivs = document.getElementById("contenedorDivs");
 // Eliminar el último div del contenedor
 contenedorDivs.removeChild(ultimoDiv);
 // Actualizar el valor del contador
 document.getElementById("contador").value = contador;
}
////////////////////////////////// AGREGAR TERCERO ////////////////////////////

 let contador = 0;
 let divs = [];

 function crearNuevoDiv(event) {
 event.preventDefault();
 // Incrementar el contador en 1 cada vez que se presiona el botón
 contador++;

 // Crear un nuevo div con la clase y el ID necesarios
 let nuevoDiv = document.createElement("div");
 nuevoDiv.setAttribute("id", "miDiv" + contador);
  divs.push(nuevoDiv);

 // Crear el contenido HTML para el nuevo div
 let nuevoContenido = `
 <hr>
<div class="row">
     <div class="col-6">
       <div class="mb-1">
         DATOS DEL TERCERO ${contador}:
       </div>
     </div>
     <div class="col-6">
       <div class="mb-1">
<button type="button" id="btn-3ro${contador}" class="btn btn-success btn-sm ml-1 mr-1" onclick="buscarRegistros_patente_emision_tercero()">BUSCAR PATENTE
<span id="spinner3ro${contador}" class="spinner-border spinner-border-sm" style="display:none"></span></button>
       </div>
     </div>
   </div>
   <div class="row mt-2">
     <div class="col-2">
       <div class="mb-1">
         <label for="dni3ro${contador}" class="form-label mt-1">DNI:</label>
       </div>
     </div>
     <div class="col-4">
       <div class="mb-1">
         <input type="number" class="form-control form-control-sm" id="dni3ro${contador}" name="dni3ro${contador}" placeholder="Ingrese el DNI" form="formularioRegistro">
       </div>
     </div>
     <div class="col-2">
       <div class="mb-1">
         <label for="nombreCompleto3ro${contador}" class="form-label mt-1">Nombre:</label>
       </div>
     </div>
     <div class="col-4">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="nombreCompleto3ro${contador}" name="nombreCompleto3ro${contador}" placeholder="Nombre completo" form="formularioRegistro">
       </div>
     </div>
   </div>
   <div class="row">
     <div class="col-2">
       <div class="mb-1">
         <label for="patente3ro${contador}" class="form-label mt-1">Patente:</label>
       </div>
     </div>
     <div class="col-4">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="patente3ro${contador}" name="patente3ro${contador}" placeholder="Ingrese patente" form="formularioRegistro">
       </div>
     </div>
     <div class="col-2">
       <div class="mb-1">
         <label for="marca3ro${contador}" class="form-label mt-1">Marca:</label>
       </div>
     </div>
     <div class="col-4">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="marca3ro${contador}" name="marca3ro${contador}" placeholder="Marca y Modelo + Año" form="formularioRegistro">
       </div>
     </div>
   </div>

   <div class="row">
     <div class="col-3">
       <div class="mb-1">
         <label for="wpp3ro${contador}" class="form-label mt-1">Whatsapp:</label>
       </div>
     </div>
     <div class="col-9">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="wpp3ro${contador}" name="wpp3ro${contador}" placeholder="Whatsapp" form="formularioRegistro">
       </div>
     </div>
   </div>

       <div class="row">
     <div class="col-3">
       <div class="mb-1">
         <label for="cnia3ro${contador}" class="form-label mt-1">Compañia:</label>
       </div>
     </div>
     <div class="col-9">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="cnia3ro${contador}" name="cnia3ro${contador}" placeholder="Compañia de seguros" form="formularioRegistro">
       </div>
     </div>
   </div>

       <div class="row">
     <div class="col-3">
       <div class="mb-1">
         <label for="danos3ro${contador}" class="form-label mt-1">Daños:</label>
       </div>
     </div>
     <div class="col-9">
       <div class="mb-1">
         <input type="text" class="form-control form-control-sm" id="danos3ro${contador}" name="danos3ro${contador}" placeholder="Ingrese daños" form="formularioRegistro">
       </div>
     </div>
 </div>
 `;

//nuevoDiv.innerHTML = nuevoContenido;

   nuevoDiv.textContent = "";
   nuevoDiv.insertAdjacentHTML('beforeend',nuevoContenido);

 // Agregar el nuevo div al contenedor de divs existente
 document.getElementById('contenedorDivs').appendChild(nuevoDiv);

document.getElementById("contador").value = contador;

document.getElementById('btn-3ro' + contador).addEventListener('click', buscarRegistros_patente_emision_tercero(contador));


}

 ///// SCRIPT PARA BUSCAR DATOS POR PATENTE EMISION TERCERO //////////
     function buscarRegistros_patente_emision_tercero() {
 let numBoton = event.target.id.slice(-1);
 let spin3ro = document.getElementById("spinner3ro" + numBoton);
  spin3ro.style.display = "inline-block";
 event.target.disabled = true;
       const numeroInventario = document.getElementById("patente3ro" + contador).value;
       let infoDNI =  document.getElementById("dni3ro" + contador);
       let infoCliente =  document.getElementById("nombreCompleto3ro" + contador);
       let infoWpp =  document.getElementById("wpp3ro" + contador);
       let infoPatente =  document.getElementById("patente3ro" + contador);
       let infoMarca =  document.getElementById("marca3ro" + contador);
       let infoCnia =  document.getElementById("cnia3ro" + contador);

       google.script.run
       .withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDNI.value = info[0][1]; //
       infoCliente.value = info[0][2]; ///
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][0];  ///
       infoMarca.value = info[0][12]; //
       infoCnia.value = info[0][6]; //

         } else {
           alert("")
         }
           spin3ro.style.display = "none";
   document.getElementById('btn-3ro' + contador).disabled = false;

       })
       .buscarMantenimientos3(numeroInventario)
     }
           ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////


function cambiarVisibilidad() {
 // Obtenemos el valor seleccionado en el select
 var valorSelect = document.getElementById("riesgo").value;

 // Array con los valores que deben ocultar el div
 var valoresOcultar = ["COMERCIO", "HOGAR", "INCENDIO PARCIAL", "INCENDIO TOTAL", "ROBO PARCIAL", "ROBO TOTAL", "GRANIZO", "CRISTALES", "CERRADURA", "ACC. PERS.", "GRUA"];

 // Verificamos si el valor seleccionado está en el array de valores a ocultar
 if (valoresOcultar.includes(valorSelect)) {
   // Ocultamos el div
   document.getElementById("miDiv").style.display = "none";
 } else {
   // Mostramos el div
   document.getElementById("miDiv").style.display = "block";
 }
}






/////////////////////// MOSTRAR FOTOS EN SUBIDA //////////////////////////


function reducirCalidadImagen(file, callback) {
 var img = new Image();
 img.src = URL.createObjectURL(file);
 
 img.onload = function() {
   // Crea un canvas
   var canvas = document.createElement('canvas');
   var ctx = canvas.getContext('2d');
   
   // Configura las nuevas dimensiones deseadas (podrías hacer esto dinámico)
   var maxWidth = 800; // Ancho máximo
   var maxHeight = 600; // Alto máximo
   var width = img.width;
   var height = img.height;

   // Ajusta las dimensiones si es necesario
   if (width > height) {
     if (width > maxWidth) {
       height *= maxWidth / width;
       width = maxWidth;
     }
   } else {
     if (height > maxHeight) {
       width *= maxHeight / height;
       height = maxHeight;
     }
   }

   canvas.width = width;
   canvas.height = height;

   // Dibuja la imagen en el canvas con las nuevas dimensiones
   ctx.drawImage(img, 0, 0, width, height);

   // Convierte la imagen del canvas a un Blob con calidad reducida
   canvas.toBlob(function(blob) {
     callback(blob);
   }, 'image/jpeg', 0.25); // Ajusta la calidad aquí, 0.5 es 50% de la calidad original
 };
}

////////////// MOSTRAR FOTOS AL BUSCAR DNI /////////////////////


function mostrarFotos_reg(data) {
   var fotosBase64 = data.fotosBase64;
   var registro_vista = document.getElementById("registro_vista");
   registro_vista.innerHTML = ''; // Limpia la galería antes de mostrar nuevas fotos
   if (fotosBase64.length > 0) {
       fotosBase64.forEach(function(foto, index) {
           var col = document.createElement("div");
           col.classList.add("col-md-6", "mb-3");

           var imgContainer = document.createElement("div");
           imgContainer.classList.add("position-relative");

           var img = document.createElement("img");
           img.src = foto;
           img.classList.add("img-thumbnail", "rounded");

           img.onload = function() {
               // Configura el porcentaje de reducción deseado
               var reductionPercentage = 20; // Porcentaje de reducción (por ejemplo, 20% para reducir en un 20%)

               // Calcula las nuevas dimensiones basadas en el porcentaje de reducción
               var newWidth = img.width * (reductionPercentage / 100);
               var newHeight = img.height * (reductionPercentage / 100);

               // Aplica las nuevas dimensiones a la imagen
               img.style.width = newWidth + "px";
               img.style.height = newHeight + "px";

               imgContainer.appendChild(img);

               var deleteIcon = document.createElement("button");
               deleteIcon.style.border = "none";
               deleteIcon.classList.add("position-absolute", "top-0", "start-0");

               var iconImg = document.createElement("img");
           iconImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAIiUExURfzh5O1TZekwRek2S+k1SukwRu1XaeIADOMAF+MAFeQEH+QDHuQFIOUGIeQDHeQGIOo3S+QBHOQCHeMAE+MAFuIADeMAEeo2S+o1SutBVPGDj+k7TeMAEucjOfB/i+1XZ+UAGuQAG+o/Uv36+v///+xXZ+MADuMAEOkuQ/rj5edteuIAEeUFIPCAjP/19v3+/exYZ+UHIvvm6P319uG3ur0ADucEH+QAFeMAFOk1Sfz29v/6+v3+/uxca+IABekxRvrn6f76+v/+/8dha54ACMEFG+UAFetNXfz4+fz4+O98h/rd3855gaMACqcBFKMCFMAAEOs1S+tMXf34+P/8/M55gKIAB6YAFKYBFKcCFaIADMY1ReQFH+tNXvzw8f/9/v/9/f3//6YAE6QADLY1Q+UIIuIABO9yf//+/v78/N6orJ8AAKcCFqcCFKMADLg1Q+k2Svrh4/n19cVfaaIABacDFvvr7P7//8VfaKEABfvs7dqZn/bq68VgaegnPfzp6s10fL5HUvr29sBPWqIACacEF/B+istxeaEABqgEF71EUPv19fz19eS1uetMXspveL1DT/rz9NF+hqIACOQAF+VaadqkqMJTX6MACbk4RdyfpKgGF6UAEcIACqAACKcBFacBE6MAC7g2ROgGIcgFG6QCFKYCFaQADrYwP+1QYuYAFccAEaAAA8FPXPzg4+01Ss01RrY1Qrg0Q7YwPsNTX/Tf4vTQcgMAAAABYktHRCS0BvmZAAAAB3RJTUUH6AMGDyQVw2FUMwAAAbtJREFUKM9jYGBkYmZBBcysbAwMjOwcnOiAg52RgZWDi5ubh5eHGwz4uHj5gQQHK4MAJ7egkDC7MLcgCHCLiIoJCvJxijNIcHILcUpKSYuBJLhkZOXkFRS5OSWA4jzCSsoqyqpqXII86hqaKipa2jpgcV52XRU9FX0DNUMxDSMVYxUTUzNzFpB6C0srFWsVG1s7ewcVRycVZxdXN5B6bm4xdw+ghKeXt4qjioqPr59/QCBIXJBLLShYJURFBYRDw8IjIqOiweKCMWqxcSrxCfEqiT5hfhFJkckpEHHB1LR0lYSMTJWs7JzcpKTIvHyIOI96QaFKfGaCSlFxSWkEXJxL3bIMbH6mSnlFZSRUnI9bpqAK6JLy6hoVZZXy2rBIiHiMSF09yIEN2Y1NIInmllawOC97G9CXKu0dnR1d3So9Kr0tpWBxHrG+chWV/o7IiNbKCRNVVCZNboXaO2XqtOkzIiKSkkrDZs5qmD0HZL44yJ0yc+fNX5AEBJELOzrmROTmLWKwB8WXzuIlS5dFgkBrZ2dkbunyFQwrRcHxu2p1ch4cLF+zlmEdI5O4hAQLy/oNGzdBwaLNW7YCANxbgHmALYePAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTAzLTA2VDE1OjM2OjE0KzAwOjAwjMN6EQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wMy0wNlQxNTozNjoxNCswMDowMP2ewq0AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDMtMDZUMTU6MzY6MjErMDA6MDB2PMs2AAAAAElFTkSuQmCC";
           iconImg.alt = "Delete";

               deleteIcon.appendChild(iconImg);

               deleteIcon.addEventListener("click", function() {
                   borrarFoto(data.fotosIds[index]);
                   col.remove(); // Elimina la imagen de la vista
               });

               imgContainer.appendChild(deleteIcon);
               col.appendChild(imgContainer);
               registro_vista.appendChild(col);
           };
     });
   } else {
     registro_vista.innerHTML = "";
   }
 }


function borrarFoto(fotoId) {
 google.script.run.withSuccessHandler(function() {
   alert("Imagen borrada correctamente.");
 }).borrarFotoEnDrive(fotoId);
}

/////////////////// MOSTRAR AL PRECARGAR NUEVAS FOTOS //////////////////

function eliminarArchivo_reg(index) {
   var input = document.getElementById("fileInput_reg");
   var files = Array.from(input.files);
   files.splice(index, 1); // Elimina el archivo en la posición 'index'
   var nuevoFileList = new DataTransfer();
   files.forEach(file => nuevoFileList.items.add(file));
   input.files = nuevoFileList.files;
}


function mostrarMiniaturas_reg() {
   var files = document.getElementById("fileInput_reg").files;
   var registro_carga = document.getElementById("registro_carga");

   registro_carga.textContent = ''; // Limpiar galería antes de mostrar miniaturas

   Array.from(files).forEach((file, index) => {
       var reader = new FileReader();

       var imgContainer = document.createElement("div");
       imgContainer.classList.add("position-relative", "col-md-6", "mb-3");

       var img = document.createElement("img");
       img.classList.add("img-thumbnail", "rounded");

       // Condición para determinar si la imagen es horizontal o vertical
         img.onload = function() {
               var reductionPercentage = 8; // Porcentaje de reducción (por ejemplo, 20% para reducir en un 20%)
                               // Calcula las nuevas dimensiones basadas en el porcentaje de reducción
               var newWidth = img.naturalWidth * (reductionPercentage / 100);
               var newHeight = img.naturalHeight * (reductionPercentage / 100);

               // Aplica las nuevas dimensiones a la imagen
               img.style.width = newWidth + "px";
               img.style.height = newHeight + "px";
         }


       imgContainer.appendChild(img);

       var deleteIcon = document.createElement("button");
       deleteIcon.style.border = "none";
      deleteIcon.classList.add("position-absolute", "top-0", "start-0");

       var iconImg = document.createElement("img");
       iconImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAIiUExURfzh5O1TZekwRek2S+k1SukwRu1XaeIADOMAF+MAFeQEH+QDHuQFIOUGIeQDHeQGIOo3S+QBHOQCHeMAE+MAFuIADeMAEeo2S+o1SutBVPGDj+k7TeMAEucjOfB/i+1XZ+UAGuQAG+o/Uv36+v///+xXZ+MADuMAEOkuQ/rj5edteuIAEeUFIPCAjP/19v3+/exYZ+UHIvvm6P319uG3ur0ADucEH+QAFeMAFOk1Sfz29v/6+v3+/uxca+IABekxRvrn6f76+v/+/8dha54ACMEFG+UAFetNXfz4+fz4+O98h/rd3855gaMACqcBFKMCFMAAEOs1S+tMXf34+P/8/M55gKIAB6YAFKYBFKcCFaIADMY1ReQFH+tNXvzw8f/9/v/9/f3//6YAE6QADLY1Q+UIIuIABO9yf//+/v78/N6orJ8AAKcCFqcCFKMADLg1Q+k2Svrh4/n19cVfaaIABacDFvvr7P7//8VfaKEABfvs7dqZn/bq68VgaegnPfzp6s10fL5HUvr29sBPWqIACacEF/B+istxeaEABqgEF71EUPv19fz19eS1uetMXspveL1DT/rz9NF+hqIACOQAF+VaadqkqMJTX6MACbk4RdyfpKgGF6UAEcIACqAACKcBFacBE6MAC7g2ROgGIcgFG6QCFKYCFaQADrYwP+1QYuYAFccAEaAAA8FPXPzg4+01Ss01RrY1Qrg0Q7YwPsNTX/Tf4vTQcgMAAAABYktHRCS0BvmZAAAAB3RJTUUH6AMGDyQVw2FUMwAAAbtJREFUKM9jYGBkYmZBBcysbAwMjOwcnOiAg52RgZWDi5ubh5eHGwz4uHj5gQQHK4MAJ7egkDC7MLcgCHCLiIoJCvJxijNIcHILcUpKSYuBJLhkZOXkFRS5OSWA4jzCSsoqyqpqXII86hqaKipa2jpgcV52XRU9FX0DNUMxDSMVYxUTUzNzFpB6C0srFWsVG1s7ewcVRycVZxdXN5B6bm4xdw+ghKeXt4qjioqPr59/QCBIXJBLLShYJURFBYRDw8IjIqOiweKCMWqxcSrxCfEqiT5hfhFJkckpEHHB1LR0lYSMTJWs7JzcpKTIvHyIOI96QaFKfGaCSlFxSWkEXJxL3bIMbH6mSnlFZSRUnI9bpqAK6JLy6hoVZZXy2rBIiHiMSF09yIEN2Y1NIInmllawOC97G9CXKu0dnR1d3So9Kr0tpWBxHrG+chWV/o7IiNbKCRNVVCZNboXaO2XqtOkzIiKSkkrDZs5qmD0HZL44yJ0yc+fNX5AEBJELOzrmROTmLWKwB8WXzuIlS5dFgkBrZ2dkbunyFQwrRcHxu2p1ch4cLF+zlmEdI5O4hAQLy/oNGzdBwaLNW7YCANxbgHmALYePAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTAzLTA2VDE1OjM2OjE0KzAwOjAwjMN6EQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wMy0wNlQxNTozNjoxNCswMDowMP2ewq0AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDMtMDZUMTU6MzY6MjErMDA6MDB2PMs2AAAAAElFTkSuQmCC";
       iconImg.alt = "Delete";

       deleteIcon.appendChild(iconImg);

       deleteIcon.addEventListener("click", function() {
           imgContainer.remove(); // Elimina la imagen de la vista
           eliminarArchivo_reg(index); // Elimina el archivo del input de carga fileInput2
           mostrarMiniaturas_reg(); // Vuelve a mostrar las miniaturas actualizadas
       });


       imgContainer.appendChild(deleteIcon);

       registro_carga.appendChild(imgContainer);

       reader.onload = (function(img) {
           return function(e) {
               img.src = e.target.result;
           };
       })(img);

       reader.readAsDataURL(file);
   });

   document.getElementById("subir_foto_reg").style.display = 'block';
}



/////////////////////////////////////////////////////////////////
//////////////////// SESION DE USUARIOS /////////////////////////
/////////////////////////////////////////////////////////////////

//////////////////// INICIAR SESION ////////////////////////

// Obtener el modal
var modal = document.getElementById("myModal");
var tiempoRestanteDiv = document.getElementById("tiempo-restante");

// Función para realizar el inicio de sesión
var usuarioAlmacenado = sessionStorage.getItem("magi-usuario");
var horaInicioAlmacenada = sessionStorage.getItem("magi-horaInicio");
var colorAlmacenado = sessionStorage.getItem("magi-color");

if (usuarioAlmacenado) {
 // Si hay un usuario almacenado, establecerlo en el elemento correspondiente
 document.getElementById("usuario_sp").textContent = usuarioAlmacenado;
 user.style.display = "block";
 close_session.style.display = "block";
 modal.style.display = "none";

 // Establecer el color de fondo almacenado
 if (colorAlmacenado) {
   document.body.style.backgroundColor = colorAlmacenado;
 } else {
   // Si no hay un color almacenado, solicitarlo al servidor
   google.script.run.withSuccessHandler(function (color) {
     if (color) {
       sessionStorage.setItem("magi-color", color);
       document.body.style.backgroundColor = color;
     }
   }).buscarColorAlmacenado(usuarioAlmacenado);
 }

 // Calcular el tiempo restante
 var tiempoRestante = calcularTiempoRestante();
 mostrarTiempoRestante(tiempoRestante);
 iniciarContadorTiempo(tiempoRestante);
} else {
 
 // Función para abrir el modal
 modal.style.display = "block";

 // Función para cerrar el modal
 function closeModal() {
   modal.style.display = "none";
 }

 // Si no hay un usuario almacenado, abrir el modal al hacer clic en el botón de inicio de sesión
 document.getElementById("inicio-sesion").addEventListener("click", function (event) {
   event.preventDefault();

   // Obtener el usuario y la contraseña del formulario
   var usuario = document.getElementById("usuario").value;
   var contrasena = document.getElementById("contrasena").value;

   // Obtener el valor seleccionado del color
   var colorPicker = document.getElementById("colorPicker");
   var colorSeleccionado = colorPicker.value;

// Hacer una solicitud al servidor para verificar el usuario y la contraseña


google.script.run.withSuccessHandler(function (color) {
 if (color) {
   document.getElementById("usuario_sp").textContent = usuario;
   modal.style.display = "none";
   user.style.display = "block";
   close_session.style.display = "block";

   // Guardar el usuario y el color en sessionStorage
   sessionStorage.setItem("magi-usuario", usuario);
   sessionStorage.setItem("magi-horaInicio", new Date().getTime());
   sessionStorage.setItem("magi-color", color);
   
   document.body.style.backgroundColor = color;
 
 } else {
   // El color no fue encontrado, manejar el error adecuadamente
   console.log("Color no encontrado");
 }

   // Calcular el tiempo restante
   var tiempoRestante = calcularTiempoRestante();
   mostrarTiempoRestante(tiempoRestante);
   iniciarContadorTiempo(tiempoRestante);
}).verificarCredenciales(usuario, contrasena);
 });
}



// Función para calcular el tiempo restante en milisegundos
function calcularTiempoRestante() {
 var horaInicio = parseInt(horaInicioAlmacenada);
 var horaExpiracion = horaInicio + (8 * 60 * 60 * 1000); // 4 horas en milisegundos
 var tiempoRestante = horaExpiracion - new Date().getTime();

 return tiempoRestante;
}

// Función para mostrar el tiempo restante en el div correspondiente
function mostrarTiempoRestante(tiempoRestante) {
 if (tiempoRestante <= 0) {
     sessionStorage.removeItem("magi-usuario");
     sessionStorage.removeItem("magi-horaInicio");
     sessionStorage.removeItem("magi-color");
     tiempoRestanteDiv.textContent = "Tiempo expirado";
     document.getElementById("usuario_sp").textContent = "Desconocido";
     modal.style.display = "block";
 } else {
   var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
   var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
   var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

   tiempoRestanteDiv.textContent = "Tiempo restante: " + horas + ":" + minutos + ":" + segundos;
 }
}

// Función para iniciar el contador de tiempo
function iniciarContadorTiempo(tiempoRestante) {
 var intervalo = setInterval(function () {
   tiempoRestante -= 1000;

   if (tiempoRestante <= 0) {
     clearInterval(intervalo);
     sessionStorage.removeItem("magi-usuario");
     sessionStorage.removeItem("magi-horaInicio");
     sessionStorage.removeItem("magi-color");
     tiempoRestanteDiv.textContent = "Tiempo expirado";
     document.getElementById("usuario_sp").textContent = "Desconocido";
     modal.style.display = "block";
   } else {
     mostrarTiempoRestante(tiempoRestante);
   }
 }, 1000);
}


////////////////////// CAMBIAR LA CLAVE DE USUARI ////////////////////////

document.getElementById("cambiar_clave").addEventListener("click", function() {
   event.preventDefault();
   
 document.getElementById("modal2").style.display = "block";
});

document.getElementById("guardar_clave").addEventListener("click", function() {
   event.preventDefault();

 var usuario_pass = sessionStorage.getItem("magi-usuario");
 var antiguaClave = document.getElementById("antigua_clave").value;
 var nuevaClave = document.getElementById("nueva_clave").value;
 google.script.run.cambioClave(antiguaClave, nuevaClave, usuario_pass);
   modal2.style.display = "none";
alert('Clave cambiada correctamente');

});

////////////////////////////////////////////////////////////////////////////////

////////////////////////// CERRAR SESION //////////////////////

function close_sessionok(event) {
   event.preventDefault();

   // Eliminar el valor almacenado en sessionStorage
   sessionStorage.removeItem("magi-usuario");
     sessionStorage.removeItem("magi-horaInicio");
     tiempoRestanteDiv.textContent = "";    
     document.getElementById("usuario_sp").textContent = "Desconocido";
 // Recargar la página
     modal.style.display = "block";

}


//////////// CAMBIAR COLOR DE FONDO //////////////////////////
           function changeColor() {
               var colorPicker = document.getElementById("colorPicker");
               var color = colorPicker.value;
               var usuario = sessionStorage.getItem("magi-usuario");
       sessionStorage.setItem("magi-color", color);
       document.body.style.backgroundColor = color;

               google.script.run
                   .withSuccessHandler(onSuccess)
                   .withFailureHandler(onFailure)
                   .changeBackgroundColor(color, usuario);

           }

           function onSuccess() {
               console.log("Color de fondo almacenado correctamente.");

               
           }

           function onFailure(error) {
               console.error("Error al almacenar el color de fondo:", error);
           }

           
////////////////////////////////////////////////////////////////////////////////




document.getElementById("subir_foto_reg").addEventListener("click", function(event) {
   event.preventDefault();

   // Mostrar spinner de carga en el botón
   var button = document.getElementById("subir_foto_reg");
   button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subiendo...';
   button.disabled = true; // Deshabilitar el botón mientras se suben las fotos

   var files = document.getElementById("fileInput_reg").files;
   var dni = document.getElementById("dni").value;
   var filesBase64 = [];

   if (files.length > 0 && dni) {
       Array.from(files).forEach(file => {
           reducirCalidadImagen(file, function(reducedBlob) {
               var reader = new FileReader();
               reader.readAsDataURL(reducedBlob);
               reader.onload = function() {
                   var base64 = reader.result.split(',')[1];
                   filesBase64.push({
                       base64: base64,
                       fileName: file.name,
                       mimeType: reducedBlob.type
                   });

                   if (filesBase64.length === files.length) {
                       // Cuando se han procesado todos los archivos, proceder con la subida
                       google.script.run.withSuccessHandler(function() {
                           document.getElementById("fileInput_reg").value = ""; // Limpiar el input de archivos
                           // Mover los elementos de registro_carga a registro_vista
                           var registro_vista = document.getElementById("registro_vista");
                           var registro_carga = document.getElementById("registro_carga");
                           while (registro_carga.firstChild) {
                               // Mueve cada hijo directamente, ya que la referencia se mantiene
                               var child = registro_carga.firstChild;
                               // Verifica si hay un botón de eliminar en el hijo y elimínalo si existe
                               var deleteButton = child.querySelector(".delete-icon"); // Asegúrate de que la clase 'delete-icon' sea la correcta
                               if (deleteButton) {
                                   deleteButton.remove(); // Elimina el botón de eliminar
                               }
                               registro_vista.appendChild(child); // Ahora mueve el niño
                           }
                           // Restaurar el texto y estado original del botón
                           button.innerHTML = 'Subir Foto';
                           button.disabled = false;
                       }).uploadRegToDrive('1CyTu6J75Nhdshmt38N79Jf9Ymxq8znYz', filesBase64, dni);
                   }
               };
           });
       });
   } else {
       alert("Por favor seleccione al menos una foto y especifique el dni del cliente.");
       // Restaurar el texto y estado original del botón
       button.innerHTML = 'Subir Foto';
       button.disabled = false;
   }

   // Ocultar el input div_input_reg mientras se procesa la subida de fotos
   document.getElementById("div_input_reg").style.display = "none";
});

/////////////////////// EVENT LISTENERS //////////////////////////////////////
document.getElementById('bt-ingreso').addEventListener('click', ingresarSiniestro);
document.getElementById('eliminar-ultimo').addEventListener('click', eliminarUltimoDiv);
document.getElementById('close_session').addEventListener('click', close_sessionok);

document.getElementById("riesgo").addEventListener("change", function() {
 console.log("hola")
mostrarOpciones()
});

 document.getElementById('agregar-tercero').addEventListener('click', crearNuevoDiv);


/////////// DESHABILITAMOS EL BOTON DE ENVIO ///////////////
 const miFormulario = document.getElementById('formularioRegistro');
 miFormulario.addEventListener('submit', function() {
   const boton = document.querySelector('input[type="submit"]');
   boton.disabled = true;
 });
 /////////////////////////////////////////////////////
