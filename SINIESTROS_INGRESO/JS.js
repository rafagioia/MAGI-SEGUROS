
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
 subRiesgo.innerHTML = "";
 
switch (riesgo) {
 case "CLEAS":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("CL-1 RESOLUCIÓN CLEAS");
   subRiesgo.options[9] = new Option("CL-2 ESPERANDO ELIJA TALLER");
   subRiesgo.options[10] = new Option("CL-3 INSPECCIÓN EN CURSO");
   subRiesgo.options[11] = new Option("CL-4 ESPERANDO CARTA FCIA");
   subRiesgo.options[12] = new Option("CL-5 EN COTIZACIÓN");
   subRiesgo.options[13] = new Option("CL-6 ESPERANDO REPUESTOS");
   subRiesgo.options[14] = new Option("CL-7 PAGO EN CURSO");
   break;
 case "DAÑO POR ROBO TOTAL":
 case "INTERASEGURADOS":
 case "TODO RIESGO":
 case "GRANIZO":
 case "INCENDIO PARCIAL":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("DT-1 ESPERANDO DOCUMENTACION");
   subRiesgo.options[9] = new Option("DP-2 ESPERANDO CNIA HABILITE");
   subRiesgo.options[10] = new Option("DP-3 ESPERANDO ELIJA TALLER");
   subRiesgo.options[11] = new Option("DP-4 INSPECCIÓN EN CURSO");
   subRiesgo.options[12] = new Option("DP-5 ESPERANDO CARTA FCIA");
   subRiesgo.options[13] = new Option("DP-6 EN COTIZACIÓN");
   subRiesgo.options[14] = new Option("DP-7 ESPERANDO REPUESTOS");
   subRiesgo.options[15] = new Option("DP-8 PAGO EN CURSO");
   break;
 case "DEST. TOTAL":
 case "INCENDIO TOTAL":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("DT-1 ESPERANDO DOCUMENTACION (CAUSA PENAL / INFORME BOMBEROS)");
   subRiesgo.options[9] = new Option("DT-2 INSPECCIÓN EN CURSO");
   subRiesgo.options[10] = new Option("DT-3 COTIZANDO SI ES DT");
   subRiesgo.options[11] = new Option("DT-4 ACUERDO DE PAGO");
   subRiesgo.options[12] = new Option("DT-5 BAJA Y RETIRO DE UNIDAD");
   subRiesgo.options[13] = new Option("DT-6 PAGO EN CURSO");
   break;
 case "ROBO TOTAL":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("RT-1 ESPERANDO CNIA HABILITE");
   subRiesgo.options[9] = new Option("RT-2 ESPERANDO APARICIÓN");
   subRiesgo.options[10] = new Option("RT-3 HACIENDO BAJA");
   subRiesgo.options[11] = new Option("RT-4 ACUERDO DE PAGO");
   subRiesgo.options[12] = new Option("RT-5 FORMULARIO 15");
   subRiesgo.options[13] = new Option("RT-6 PAGO EN CURSO");
   break;
     case "HOGAR":
   case "COMERCIO":
   case "BICICLETA":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("HC-1 ESPERANDO DOCUMENTACION (PRE-EXISTENCIAS/INFORME TECNICO)");
   subRiesgo.options[9] = new Option("HC-2 INSPECCIÓN EN CURSO");
   subRiesgo.options[10] = new Option("HC-3 ACUERDO DE PAGO");
   subRiesgo.options[11] = new Option("HC-4 ENVIAR CBU, DNI Y ACUERDO");
   subRiesgo.options[12] = new Option("HC-5 PAGO EN CURSO");
     break;
   case "CRISTALES":
   case "CERRADURA":
   case "ROBO PARCIAL":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("CR-1 ESPERANDO DOCUMENTACION");
   subRiesgo.options[9] = new Option("CR-2 ESPERANDO CNIA HABILITE");
   subRiesgo.options[10] = new Option("CR-3 INSPECCIÓN EN CURSO");
   subRiesgo.options[11] = new Option("CR-4 ELEGIENDO PROVEEDOR");
   subRiesgo.options[12] = new Option("CR-5 ESPERANDO VOUCHER");
   subRiesgo.options[13] = new Option("CR-6 ESPERANDO REPOSICIÓN");
   subRiesgo.options[14] = new Option("CR-7 PAGO EN CURSO");
   subRiesgo.options[15] = new Option("CR-8 REPARANDO");
     break;
   case "ACC. PERS.":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("LEGALES");
   subRiesgo.options[8] = new Option("AP-1 ESPERANDO DOCUMENTACION");
   subRiesgo.options[9] = new Option("AP-2 ESPERANDO CNIA HABILITE");
   subRiesgo.options[10] = new Option("AP-3 EN ANALISIS");
   subRiesgo.options[11] = new Option("AP-7 PAGO EN CURSO");
     break;
   case "RECLAMO 3ROS":
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("R3-1 ESPERANDO DOCUMENTACION");
   subRiesgo.options[9] = new Option("R3-2 ESPERANDO OFRECIMIENTO");
   subRiesgo.options[10] = new Option("R3-3 SE PIDIO RECONSIDERACION");
   subRiesgo.options[11] = new Option("R3-4 PAGO EN CURSO");
     break;
   default:
   subRiesgo.options[0] = new Option("");
   subRiesgo.options[1] = new Option("NO RECLAMA");
   subRiesgo.options[2] = new Option("CON PROBLEMA");
   subRiesgo.options[3] = new Option("SIN COBERTURA");
   subRiesgo.options[4] = new Option("PARA CARGAR");
   subRiesgo.options[5] = new Option("PIDEN AMPLIACIÓN");
   subRiesgo.options[6] = new Option("RESUELTO");
   subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
   subRiesgo.options[8] = new Option("ESPERANDO DOCUMENTACION");
   subRiesgo.options[9] = new Option("VER COMO GESTIONA");
   subRiesgo.options[10] = new Option("LEGALES");
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

 google.script.run
 .withSuccessHandler( info => {
   if (info.length > 0) {
     infoDNI.value = info[0][1];
     infoCliente.value = info[0][2];
     infoWpp.value = info[0][4];
     infoPatente.value = info[0][0];
     infoMarca.value = info[0][12];
     infoCnia.value = info[0][6];
   } else {
     alert("No se encontraron valores")
   }
   spinner.style.display = 'none';
   boton.disabled = false;
 })
 .buscarMantenimientos3(numeroInventario);
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
       let infoPoliza =  document.getElementById("poliza");
       let infoCnia =  document.getElementById("cnia");
       let infoCuota =  document.getElementById("cuota");
       let infoVigencia =  document.getElementById("vigencia");
       let infoImporte =  document.getElementById("importe");
       let infoVence =  document.getElementById("vto");
       let infoColor =  document.getElementById("color");
       let infoNotas =  document.getElementById("notas");

       google.script.run.withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDNI.value = info[0][2];
       infoCliente.value = info[0][3];
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][1];
       infoMarca.value = info[0][13];
       infoPoliza.value = info[0][9];
       infoCnia.value = info[0][10];
       infoImporte.value = info[0][11];

let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);
infoImporte.value = importeNumero

       infoCuota.value = parseInt(info[0][7])+1;
       infoVigencia.value = parseInt(info[0][8]);
       if(infoCuota.value > infoVigencia.value) {
         infoCuota.value = 1;
         infoImporte.value = "";
       } else {}
       let fechaString = info[0][5];
       let partesFecha = fechaString.split('/');
       let dia = partesFecha[0];
       let mes = partesFecha[1];
       let anio = partesFecha[2].slice(-2);
       let fecha = new Date(anio, mes - 1, dia);
       fecha.setMonth(fecha.getMonth() + 1)
       infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
       infoColor.value = info[0][15];
       infoNotas.value = info[0][18];

         } else {
           alert("No se encontraron valores")
         }
   spinner.style.display = 'none';
   boton.disabled = false;

       })
       .buscarMantenimientos2(numeroInventario2)
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

       google.script.run.withSuccessHandler( info => {
         if (info.length > 0) {
           
       infoDNI.value = info[0][1];
       infoCliente.value = info[0][2];
       infoWpp.value = info[0][4];
       infoPatente.value = info[0][0];
       infoMarca.value = info[0][12];
       infoCnia.value = info[0][6]; 

         } else {
           alert("No se encontraron valores")
         }
   spinner.style.display = 'none';
   boton.disabled = false;

       })
       .buscarMantenimientos4(numeroInventario2)
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

nuevoDiv.innerHTML = nuevoContenido;
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
 document.getElementById("usuario_sp").innerHTML = usuarioAlmacenado;
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
   document.getElementById("usuario_sp").innerHTML = usuario;
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
     tiempoRestanteDiv.innerHTML = "Tiempo expirado";
     document.getElementById("usuario_sp").innerHTML = "Desconocido";
     modal.style.display = "block";
 } else {
   var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
   var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
   var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

   tiempoRestanteDiv.innerHTML = "Tiempo restante: " + horas + ":" + minutos + ":" + segundos;
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
     tiempoRestanteDiv.innerHTML = "Tiempo expirado";
     document.getElementById("usuario_sp").innerHTML = "Desconocido";
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
     tiempoRestanteDiv.innerHTML = "";    
     document.getElementById("usuario_sp").innerHTML = "Desconocido";
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
