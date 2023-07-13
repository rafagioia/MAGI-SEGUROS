
//////////////// BOTON DEL MENU ///////////////////////
    // Obt�n una referencia al bot�n
const navbarToggler = document.getElementById('navbar-toggler');

// Agrega un evento de clic al bot�n
navbarToggler.addEventListener('click', function() {
  // Obt�n una referencia al elemento de destino
  const navbarNav = document.getElementById('navbarNav');

  // Alterna la clase 'show' en el elemento de destino para mostrar u ocultar la barra de navegaci�n
  navbarNav.classList.toggle('show');
});

var queryString = window.location.search;

// Crear un objeto URLSearchParams para extraer los par�metros de la URL
var urlParams = new URLSearchParams(queryString);

// Obtener el valor del par�metro "usuario"
var usuario = urlParams.get('usuario');


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



//////////////// MODIFICAR DATOS  ///////////////
function modificarDatos(event) {
  event.preventDefault();
  const valorMod = document.getElementById('mod_datos').value;
  const nuevoValor = document.getElementById('valor_mod').value;
  const tramite_sn = document.getElementById('numTramite').value;

    google.script.run.modifDatos(valorMod, nuevoValor, tramite_sn);
  event.target.reset();
alert('Modificaci�n de datos exitosa.');

document.getElementById("sinPendientes").innerHTML = "";
document.getElementById("nombre").value = "";
document.getElementById("riesgo").value = "";
document.getElementById("dni").value = "";
document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("tramite").value = "";
document.getElementById("numSin").value = "";
document.getElementById("fechaSin").value = "";
document.getElementById("estado").value = "";
document.getElementById("gestion").value = "";
document.getElementById("fechaDec").value = "";
document.getElementById("marca").value = "";
document.getElementById("wpp").value = "";
document.getElementById("relato").value = "";
document.getElementById("notas").value = "";
document.getElementById("taller").value = "";
document.getElementById("hora").value = "";
document.getElementById("numTramite").value = "";

}

////////////////// LIMPIAR DATOS //////////////////////////
  function cleanService() {
  event.preventDefault();

document.getElementById("sinPendientes").innerHTML = "";
document.getElementById("nombre").value = "";
document.getElementById("riesgo").value = "";
document.getElementById("dni").value = "";
document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("tramite").value = "";
document.getElementById("numSin").value = "";
document.getElementById("fechaSin").value = "";
document.getElementById("estado").value = "";
document.getElementById("gestion").value = "";
document.getElementById("fechaDec").value = "";
document.getElementById("marca").value = "";
document.getElementById("wpp").value = "";
document.getElementById("relato").value = "";
document.getElementById("notas").value = "";
document.getElementById("taller").value = "";
document.getElementById("hora").value = "";
document.getElementById("numTramite").value = "";

alert('Limpieza exitosa.');
}


  ///////// ACTUALIZAR ESTADO ///////////////
function actualiEstado(event) {
  event.preventDefault();
  const estado_sn = document.getElementById('estado_sn').value;
  const gestion_sn = document.getElementById('gestion_sn').value;
  const novedad_sn = document.getElementById('novedad_sn').value;
  const usuario_sn = sessionStorage.getItem("magi-usuario");
  const notas_sn = document.getElementById('notas_sn').value;
  const tramite_sn = document.getElementById('numTramite').value;
  const tipotramite_sn = document.getElementById('tipoTramite_sn').value;
  const taller_sn = document.getElementById('taller_sn').value;
  const fechaip_sn = document.getElementById('fechaip_sn').value;
  const notas_old = document.getElementById('notas').value;

  google.script.run.actualizarEstado(estado_sn, tramite_sn, gestion_sn, novedad_sn, usuario_sn, notas_sn,tipotramite_sn, fechaip_sn, taller_sn, notas_old);
  event.target.reset();

document.getElementById("sinPendientes").innerHTML = "";
document.getElementById("nombre").value = "";
document.getElementById("riesgo").value = "";
document.getElementById("dni").value = "";
document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("tramite").value = "";
document.getElementById("numSin").value = "";
document.getElementById("fechaSin").value = "";
document.getElementById("estado").value = "";
document.getElementById("gestion").value = "";
document.getElementById("fechaDec").value = "";
document.getElementById("marca").value = "";
document.getElementById("wpp").value = "";
document.getElementById("relato").value = "";
document.getElementById("notas").value = "";
document.getElementById("taller").value = "";
document.getElementById("hora").value = "";
document.getElementById("numTramite").value = "";

alert('Ingreso de estado exitoso.');

}



function filtrar(event) {
  event.preventDefault();
  const spinner = document.getElementById('spinner_filtrar');
  spinner.style.display = 'block';
  const cnia_filter = document.getElementById('companiaSelect').value;
  const riesgo_filter = document.getElementById('riesgoSelect').value;
  const patente_filter = document.getElementById('patenteSelect').value;
  const dni_filter = document.getElementById('dniSelect').value;
  const gestion_filter = document.getElementById('gestionSelect').value;
  const estado_filter = document.getElementById('estadoSelect').value;
  const siniestro_filter = document.getElementById('sinSelect').value;
  const nombre_filter = document.getElementById('nombreSelect').value;
  google.script.run.withSuccessHandler(function(result) {
  // Actualizar HTML de la p�gina con los nuevos resultados
  var sinPendientesDiv = document.getElementById("sinPendientes");

 var pendientesHtml = "";
  for (var i = 0; i < result.length; i++) {

var  bgColor = "";
var dateParts = result[i][9].split("/");
var month = parseInt(dateParts[1], 10) - 1; // Restar 1 al mes para que sea de 0 a 11
var day = parseInt(dateParts[0], 10);
var year = new Date().getFullYear(); // Obtener el a�o actual
var date = new Date(year, month, day);
var today = new Date();

if (result[i][7] == "TERMINADO") {
    bgColor = "#E1FDD9";
    name = "on";
} else if (date > today) {
    bgColor = "#EBEEFF"
    name = "off";
} else if (result[i][7] == "ESTADO:") {
    bgColor = "#000000";
    style = "display: none;";
} else {
    bgColor = "#FFFFFF";
    name = "on";
}

pendientesHtml += "<div class='border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;background-color: " + bgColor + "' name='" + name + "' id='div" + i + "'><div class='row m-0 p-0'>" + 
      "<div class='col-4 cnia_border m-0 text-sm text-truncate' style='" +
   (result[i][6] === 'TODO RIESGO' ? "background-color: #D65050;" :
    result[i][6] === 'RECLAMO 3ROS' ? "background-color: #D881C8;" :
    result[i][6] === 'CLEAS' ? "background-color: #37C38D;" :
    result[i][6] === 'COMERCIO' ? "background-color: #AB3F6C;" :
    result[i][6] === 'DEST. TOTAL' ? "background-color: #4C9223;" :
    result[i][6] === 'DA�O POR ROBO TOTAL' ? "background-color: #CF8F5E;" :
    result[i][6] === 'HOGAR' ? "background-color: #534F84;" :
    result[i][6] === 'INCENDIO PARCIAL' ? "background-color: #FD964D;" :
    result[i][6] === 'INCENDIO TOTAL' ? "background-color: #C6621A;" :
    result[i][6] === 'INTERASEGURADOS' ? "background-color: #7498EC;" :
    result[i][6] === 'RESP. CIVIL' ? "background-color: #969297;" :
    result[i][6] === 'ROBO PARCIAL' ? "background-color: #966CA7;" :
    result[i][6] === 'ROBO TOTAL' ? "background-color: #9E5A9B;" :
    result[i][6] === 'GRANIZO' ? "background-color: #9EBAD1;" :
    result[i][6] === 'CRISTALES' ? "background-color: #68C1C8;" :
    result[i][6] === 'CERRADURA' ? "background-color: #C8C560;" :
    result[i][6] === 'ACC. PERS.' ? "background-color: #6F8049;" :
    result[i][6] === 'GRUA' ? "background-color: #88A55C;" :
    result[i][6] === 'RILLA' ? "background-color: #6088A9;" : "") + 
  "' id='riesgo_" + i + "'>" + result[i][6] + 
      "</div><div class='col-5 modulo text-truncate' id='nombre_" + i + "'>" + result[i][4] +
      "</div><div class='col-2 modulo'>GESTION:</div><div class='col-1 modulo' id='gestion_" + i + "'>" + result[i][9] + 
      "</div></div><div class='row p-0 m-0'><div class='col-2 m-0 modulo-sm-pat' id='patente_" + i + "'>" + result[i][0] +
      "</div><div class='col-2 modulo-sm text-truncate' id='marca_" + i + "'>" + result[i][13] + 
      "</div><div class='col-2 modulo-sm text-truncate' id='cnia_" + i + "'>" + result[i][5] + 
      "</div><div class='col-2 modulo-sm text-truncate' id='numSin_" + i + "'>" + result[i][1] + 
      "</div><div class='col-4 modulo-sm text-truncate' id='tramite_" + i + "'>" + result[i][8] +
      "</div></div></div>"+
    "<div style='display: none;' id='fechaSin_" + i + "'>" + result[i][2] + "</div>"+
    "<div style='display: none;' id='dni_" + i + "'>" + result[i][3] + "</div>"+
    "<div style='display: none;' id='estado_" + i + "'>" + result[i][7] + "</div>"+
    "<div style='display: none;' id='taller_" + i + "'>" + result[i][10] + "</div>"+
    "<div style='display: none;' id='notas_" + i + "'>" + result[i][11] + "</div>"+
    "<div style='display: none;' id='wpp_" + i + "'>" + result[i][14] + "</div>"+
    "<div style='display: none;' id='relato_" + i + "'>-RELATO: " + result[i][15] + "\n-LUGAR DEL HECHO: " + result[i][20] + ", " + result[i][19] + "\n-DA�OS: " + result[i][12] + result[i][16] + "</div>"+
    "<div style='display: none;' id='hora_" + i + "'>" + result[i][17] + "</div>"+
    "<div style='display: none;' id='fechaDec_" + i + "'>" + result[i][18] + "</div>"+
    "<div style='display: none;' id='numTramite_" + i + "'>" + result[i][21] + "</div>"+
    
    "</div>";
    }
    sinPendientesDiv.innerHTML = pendientesHtml;

if (result.length === 0) {
  sinPendientesDiv.innerHTML = "No se encontr� ning�n valor.";
  spinner.style.display = 'none';
}

      // Agregar evento de click a los divs din�micos
  var divs = document.querySelectorAll("[id^='div']");
  divs.forEach(function(div) {
    div.addEventListener("click", function() {
      var id = div.id.slice(3); // Obtener el �ndice del div
      document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
      document.getElementsByName("riesgo")[0].value = document.getElementById("riesgo_" + id).textContent;
      document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
      document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
      document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
      document.getElementsByName("tramite")[0].value = document.getElementById("tramite_" + id).textContent;
      document.getElementsByName("numSin")[0].value = document.getElementById("numSin_" + id).textContent;
      document.getElementsByName("fechaSin")[0].value = document.getElementById("fechaSin_" + id).textContent;
      document.getElementsByName("estado")[0].value = document.getElementById("estado_" + id).textContent;
      document.getElementsByName("gestion")[0].value = document.getElementById("gestion_" + id).textContent;
      document.getElementsByName("fechaDec")[0].value = document.getElementById("fechaDec_" + id).textContent;
      document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
      document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
      document.getElementsByName("relato")[0].value = document.getElementById("relato_" + id).textContent;
      document.getElementsByName("notas")[0].value = document.getElementById("notas_" + id).textContent;
      document.getElementsByName("taller")[0].value = document.getElementById("taller_" + id).textContent;
      document.getElementsByName("numTramite")[0].value = document.getElementById("numTramite_" + id).textContent;
mostrarOpciones();
    });
      spinner.style.display = 'none';
  });
  }).getData2(cnia_filter, riesgo_filter, patente_filter, dni_filter, gestion_filter, estado_filter, siniestro_filter, nombre_filter);

}


function updateSinPendientes(result) {
  var sinPendientesDiv = document.getElementById("sinPendientes");
 var pendientesHtml = "";
  for (var i = 0; i < result.length; i++) {

var  bgColor = "";
var dateParts = result[i][9].split("/");
var month = parseInt(dateParts[1], 10) - 1; // Restar 1 al mes para que sea de 0 a 11
var day = parseInt(dateParts[0], 10);
var year = new Date().getFullYear(); // Obtener el a�o actual
var date = new Date(year, month, day);
var today = new Date();

if (date > today) {
 bgColor = "#EBF5FB; display: none;";
} else {
  bgColor = "#F8F9F9";
}

pendientesHtml += "<div class='border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;background-color: " + bgColor + "' id='div" + i + "'><div class='row m-0 p-0'>" + 
      "<div class='col-4 cnia_border m-0 text-sm text-truncate' style='" +
  (result[i][6] === 'TODO RIESGO' ? "background-color: #D65050;" :
    result[i][6] === 'RECLAMO 3ROS' ? "background-color: #D881C8;" :
    result[i][6] === 'CLEAS' ? "background-color: #37C38D;" :
    result[i][6] === 'COMERCIO' ? "background-color: #AB3F6C;" :
    result[i][6] === 'DEST. TOTAL' ? "background-color: #4C9223;" :
    result[i][6] === 'DA�O POR ROBO TOTAL' ? "background-color: #CF8F5E;" :
    result[i][6] === 'HOGAR' ? "background-color: #534F84;" :
    result[i][6] === 'INCENDIO PARCIAL' ? "background-color: #FD964D;" :
    result[i][6] === 'INCENDIO TOTAL' ? "background-color: #C6621A;" :
    result[i][6] === 'INTERASEGURADOS' ? "background-color: #7498EC;" :
    result[i][6] === 'RESP. CIVIL' ? "background-color: #969297;" :
    result[i][6] === 'ROBO PARCIAL' ? "background-color: #966CA7;" :
    result[i][6] === 'ROBO TOTAL' ? "background-color: #9E5A9B;" :
    result[i][6] === 'GRANIZO' ? "background-color: #9EBAD1;" :
    result[i][6] === 'CRISTALES' ? "background-color: #68C1C8;" :
    result[i][6] === 'CERRADURA' ? "background-color: #C8C560;" :
    result[i][6] === 'ACC. PERS.' ? "background-color: #6F8049;" :
    result[i][6] === 'GRUA' ? "background-color: #88A55C;" :
    result[i][6] === 'RILLA' ? "background-color: #6088A9;" : "") + 
  "' id='riesgo_" + i + "'>" + result[i][6] + 
      "</div><div class='col-5 modulo text-truncate' id='nombre_" + i + "'>" + result[i][4] +
      "</div><div class='col-2 modulo'>GESTION:</div><div class='col-1 modulo' id='gestion_" + i + "'>" + result[i][9] + 
      "</div></div><div class='row p-0 m-0'><div class='col-2 m-0 modulo-sm-pat' id='patente_" + i + "'>" + result[i][0] +
      "</div><div class='col-2 modulo-sm text-truncate' id='marca_" + i + "'>" + result[i][13] + 
      "</div><div class='col-2 modulo-sm text-truncate' id='cnia_" + i + "'>" + result[i][5] + 
      "</div><div class='col-2 modulo-sm text-truncate' id='numSin_" + i + "'>" + result[i][1] + 
      "</div><div class='col-4 modulo-sm text-truncate' id='tramite_" + i + "'>" + result[i][8] +
      "</div></div></div>"+
    "<div style='display: none;' id='fechaSin_" + i + "'>" + result[i][2] + "</div>"+
    "<div style='display: none;' id='dni_" + i + "'>" + result[i][3] + "</div>"+
    "<div style='display: none;' id='estado_" + i + "'>" + result[i][7] + "</div>"+
    "<div style='display: none;' id='taller_" + i + "'>" + result[i][10] + "</div>"+
    "<div style='display: none;' id='notas_" + i + "'>" + result[i][11] + "</div>"+
    "<div style='display: none;' id='wpp_" + i + "'>" + result[i][14] + "</div>"+
    "<div style='display: none;' id='relato_" + i + "'>-RELATO: " + result[i][15] + "\n-LUGAR DEL HECHO: " + result[i][20] + ", " + result[i][19] + "\n-DA�OS: " + result[i][12] + result[i][16] + "</div>"+
    "<div style='display: none;' id='hora_" + i + "'>" + result[i][17] + "</div>"+
    "<div style='display: none;' id='fechaDec_" + i + "'>" + result[i][18] + "</div>"+
    "<div style='display: none;' id='numTramite_" + i + "'>" + result[i][21] + "</div>"+
    
    "</div>";
  }
  sinPendientesDiv.innerHTML = pendientesHtml;


  // Agregar evento de click a los divs din�micos
  var divs = document.querySelectorAll("[id^='div']");
  divs.forEach(function(div) {
    div.addEventListener("click", function() {
      var id = div.id.slice(3); // Obtener el �ndice del div
      document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
      document.getElementsByName("riesgo")[0].value = document.getElementById("riesgo_" + id).textContent;
      document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
      document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
      document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
      document.getElementsByName("tramite")[0].value = document.getElementById("tramite_" + id).textContent;
      document.getElementsByName("numSin")[0].value = document.getElementById("numSin_" + id).textContent;
      document.getElementsByName("fechaSin")[0].value = document.getElementById("fechaSin_" + id).textContent;
      document.getElementsByName("estado")[0].value = document.getElementById("estado_" + id).textContent;
      document.getElementsByName("gestion")[0].value = document.getElementById("gestion_" + id).textContent;
      document.getElementsByName("fechaDec")[0].value = document.getElementById("fechaDec_" + id).textContent;
      document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
      document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
      document.getElementsByName("relato")[0].value = document.getElementById("relato_" + id).textContent;
      document.getElementsByName("notas")[0].value = document.getElementById("notas_" + id).textContent;
      document.getElementsByName("taller")[0].value = document.getElementById("taller_" + id).textContent;
      document.getElementsByName("numTramite")[0].value = document.getElementById("numTramite_" + id).textContent;
 mostrarOpciones()
     
    });
  });
}
google.script.run.withSuccessHandler(updateSinPendientes).getData();

function mostrarOpciones() {
  console.log("hola")
  var riesgo = document.getElementById("riesgo").value;
  var subRiesgo = document.getElementById("tipoTramite_sn");
  subRiesgo.innerHTML = "";
  
switch (riesgo) {
  case "CLEAS":
    subRiesgo.options[0] = new Option("");
    subRiesgo.options[1] = new Option("NO RECLAMA");
    subRiesgo.options[2] = new Option("CON PROBLEMA");
    subRiesgo.options[3] = new Option("SIN COBERTURA");
    subRiesgo.options[4] = new Option("PARA CARGAR");
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("CL-1 RESOLUCI�N CLEAS");
    subRiesgo.options[9] = new Option("CL-2 ESPERANDO ELIJA TALLER");
    subRiesgo.options[10] = new Option("CL-3 INSPECCI�N EN CURSO");
    subRiesgo.options[11] = new Option("CL-4 ESPERANDO CARTA FCIA");
    subRiesgo.options[12] = new Option("CL-5 EN COTIZACI�N");
    subRiesgo.options[13] = new Option("CL-6 ESPERANDO REPUESTOS");
    subRiesgo.options[14] = new Option("CL-7 PAGO EN CURSO");
    break;
  case "DA�O POR ROBO TOTAL":
  case "INTERASEGURADOS":
  case "TODO RIESGO":
  case "GRANIZO":
  case "INCENDIO PARCIAL":
    subRiesgo.options[0] = new Option("");
    subRiesgo.options[1] = new Option("NO RECLAMA");
    subRiesgo.options[2] = new Option("CON PROBLEMA");
    subRiesgo.options[3] = new Option("SIN COBERTURA");
    subRiesgo.options[4] = new Option("PARA CARGAR");
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("DT-1 ESPERANDO DOCUMENTACION");
    subRiesgo.options[9] = new Option("DP-2 ESPERANDO CNIA HABILITE");
    subRiesgo.options[10] = new Option("DP-3 ESPERANDO ELIJA TALLER");
    subRiesgo.options[11] = new Option("DP-4 INSPECCI�N EN CURSO");
    subRiesgo.options[12] = new Option("DP-5 ESPERANDO CARTA FCIA");
    subRiesgo.options[13] = new Option("DP-6 EN COTIZACI�N");
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
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("DT-1 ESPERANDO DOCUMENTACION (CAUSA PENAL / INFORME BOMBEROS)");
    subRiesgo.options[9] = new Option("DT-2 INSPECCI�N EN CURSO");
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
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("RT-1 ESPERANDO CNIA HABILITE");
    subRiesgo.options[9] = new Option("RT-2 ESPERANDO APARICI�N");
    subRiesgo.options[10] = new Option("RT-3 HACIENDO BAJA");
    subRiesgo.options[11] = new Option("RT-4 ACUERDO DE PAGO");
    subRiesgo.options[12] = new Option("RT-5 FORMULARIO 15");
    subRiesgo.options[13] = new Option("RT-6 PAGO EN CURSO");
    break;
    case "HOGAR":
    case "COMERCIO":
    subRiesgo.options[0] = new Option("");
    subRiesgo.options[1] = new Option("NO RECLAMA");
    subRiesgo.options[2] = new Option("CON PROBLEMA");
    subRiesgo.options[3] = new Option("SIN COBERTURA");
    subRiesgo.options[4] = new Option("PARA CARGAR");
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("HC-1 ESPERANDO DOCUMENTACION (PRE-EXISTENCIAS/INFORME TECNICO)");
    subRiesgo.options[9] = new Option("HC-2 INSPECCI�N EN CURSO");
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
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("CR-1 ESPERANDO DOCUMENTACION");
    subRiesgo.options[9] = new Option("CR-2 ESPERANDO CNIA HABILITE");
    subRiesgo.options[10] = new Option("CR-3 INSPECCI�N EN CURSO");
    subRiesgo.options[11] = new Option("CR-4 ELEGIENDO PROVEEDOR");
    subRiesgo.options[12] = new Option("CR-5 ESPERANDO VOUCHER");
    subRiesgo.options[13] = new Option("CR-6 ESPERANDO REPOSICI�N");
    subRiesgo.options[14] = new Option("CR-7 PAGO EN CURSO");
    subRiesgo.options[15] = new Option("CR-8 REPARANDO");
      break;
    case "ACC. PERS.":
    subRiesgo.options[0] = new Option("");
    subRiesgo.options[1] = new Option("NO RECLAMA");
    subRiesgo.options[2] = new Option("CON PROBLEMA");
    subRiesgo.options[3] = new Option("SIN COBERTURA");
    subRiesgo.options[4] = new Option("PARA CARGAR");
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
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
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
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
    subRiesgo.options[5] = new Option("PIDEN AMPLIACI�N");
    subRiesgo.options[6] = new Option("RESUELTO");
    subRiesgo.options[7] = new Option("TRAMITANDO ALFREDO");
    subRiesgo.options[8] = new Option("ESPERANDO DOCUMENTACION");
    subRiesgo.options[9] = new Option("VER COMO GESTIONA");
    subRiesgo.options[10] = new Option("LEGALES");
  }
}

//////////////// CARGAR CORREOS  ///////////////
function cargarCorreos() {
  event.preventDefault();
  const numSin2 = document.getElementById('numSin').value;
  var numSinArr = numSin2.split(/\/|-/);
  var numSin = numSinArr[numSinArr.length - 1];

google.script.run.withSuccessHandler(function(emailsHTML) {
  // Muestra el contenido HTML de los correos electr�nicos en el div con ID "emails"
  var div2 = document.getElementById("emails");
  console.log(emailsHTML)
  div2.innerHTML = emailsHTML;
}).mostrarCorreos(numSin);
}

function enviarMail() {
  var numSin = document.getElementById("numSin").value;

  // Dividir la cadena de texto en un arreglo usando una expresi�n regular que incluya ambos separadores ("/" y "-")
  var numSinArr = numSin.split(/\/|-/);

  // Obtener el �ltimo elemento del arreglo, que es el n�mero que deseas buscar
  var numBuscar = numSinArr[numSinArr.length - 1];

  // Abrir Gmail y buscar el n�mero
  window.open("https://mail.google.com/mail/u/0/#search/" + numBuscar);
}

function enviarMensajeWPP() {
  // Obtener el n�mero de tel�fono ingresado
  var telefono = document.getElementById("wpp").value;

  // Abrir WhatsApp Web con el n�mero de tel�fono y enviar un mensaje
  window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agend�%20nuestro%20n�mero%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}

document.getElementById("novedad_sn").addEventListener("change", function() {
  var novedad = this.value;
  var taller = document.getElementById("tallerf_sn");
  var fechaip = document.getElementById("fechaipf_sn");
  if (novedad === "NUEVA INSPECCION") {
    taller.style.display = "block";
    fechaip.style.display = "block";
  } else {
    taller.style.display = "none";
    fechaip.style.display = "none";
  }
});


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
        console.log("este es el color: " + color)
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
  var horaExpiracion = horaInicio + (4 * 60 * 60 * 1000); // 4 horas en milisegundos
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



/////////////////////// EVENT LISTENERS //////////////////////////////


document.getElementById("gestiones-activas").addEventListener('change', function() {
  var checkbox = document.getElementById("gestiones-activas");
  var elements = document.querySelectorAll("[name='off']");
  // Check if the checkbox is checked
  if (checkbox.checked) {
    // Iterate over the elements and set their display property to none
    for (var i = 0; i < elements.length; i++) {
      var styles = getComputedStyle(elements[i]);
        elements[i].style.display = "none";
    }
  } else {
    
    // Iterate over the elements and set their display property to none
    for (var i = 0; i < elements.length; i++) {
      var styles = getComputedStyle(elements[i]);
        elements[i].style.display = "block";
    }
  }
});



document.getElementById("riesgo").addEventListener("change", function() {
mostrarOpciones()
});
document.getElementById('bt-reset').addEventListener('click', cleanService);
document.getElementById('mod_datos_form').addEventListener('submit', modificarDatos);
document.getElementById('nuevo_estado_form').addEventListener('submit', actualiEstado);
document.getElementById('ver_mails_form').addEventListener('submit', cargarCorreos);
document.getElementById('bt-buscar').addEventListener('click', filtrar);
document.getElementById('close_session').addEventListener('click', close_sessionok);