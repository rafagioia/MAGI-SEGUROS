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


function filtrar(event) {
 event.preventDefault();
  const spinner = document.getElementById('spinner_filtrar');
 spinner.style.display = 'block';
 const cnia_filter = document.getElementById('companiaSelect').value;
 const patente_filter = document.getElementById('patenteSelect').value;
 const dni_filter = document.getElementById('dniSelect').value;
 const estado_filter = document.getElementById('estadoSelect').value;
 const nombre_filter = document.getElementById('nombreSelect').value;
 google.script.run.withSuccessHandler(function(result) {
 // Actualizar HTML de la página con los nuevos resultados
 var sinPendientesDiv = document.getElementById("sinPendientes");

var pendientesHtml = "";
 for (var i = 0; i < result.length; i++) {

var  bgColor = "";

var today = new Date();

if (result[i][9] == "ANULACION") {
 txColor = "#DC143C";
} else if (result[i][9] == "PENDIENTE") {
 txColor = "#002392";
} else {
 txColor = "#00BB2D";
}

pendientesHtml += "<div class='border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;background-color: " + bgColor + "' id='div" + i + "'><div class='row m-0 p-0'>" + 
     "<div class='col-4 cnia_border m-0 text-sm text-truncate' style='" +
   (result[i][5] === 'FED PAT' ? "background-color: #002392;" :
   result[i][5] === 'AGROSALTA' ? "background-color: #FD964D;" :
   result[i][5] === 'AGRO (V)' ? "background-color: #FD964D;" :
   result[i][5] === 'AGROSALTA C/GRUA' ? "background-color: #FD964D;" :
   result[i][5] === 'AGRO (V) C/GRUA' ? "background-color: #FD964D;" :
   result[i][5] === 'RIVADAVIA' ? "background-color: #28BEF5;" :
   result[i][5] === 'MAPFRE' ? "background-color: #CB3234;" :
   result[i][5] === 'RIO URUGUAY' ? "background-color: #5AC4C3;" :
   result[i][5] === 'LIBRA' ? "background-color: #FF8000;" :
   result[i][5] === 'NIVEL' ? "background-color: #F57C00;" :
   result[i][5] === 'PROVIDENCIA' ? "background-color: #94B3FD;" :
   result[i][5] === 'LA CAJA' ? "background-color: #EF5350;" :
   result[i][5] === 'MERCANTIL' ? "background-color: #966CA7;" :
   result[i][5] === 'SAN PATRICIO' ? "background-color: #EF5350;" :
   result[i][5] === 'ATM' ? "background-color: #EF5350;" :
   result[i][5] === 'BENEFICIO' ? "background-color: #9EBAD1;" :
   result[i][5] === 'ALLIANZ' ? "background-color: #68C1C8;" :
   result[i][5] === 'ORBIS' ? "background-color: #C8C560;" :
   result[i][5] === 'ESCUDO' ? "background-color: #9EBAD1;" :
   result[i][5] === 'DIGMA' ? "background-color: #68C1C8;" :
   result[i][5] === 'CARDINAL' ? "background-color: #C8C560;" :
   result[i][5] === 'GRUA' ? "background-color: #6088A9;" : "") + 
 "' id='cnia_" + i + "'>" + result[i][5] + 

       "</div><div class='col-2 modulo' id='dni_" + i + "'>" + result[i][1] +
       "</div><div class='col-4 modulo text-truncate' id='nombre_" + i + "'>" + result[i][2] +
       "</div><div class='col-2 modulo-sm m-0' style='padding-top: 5px;  align: center; width: 150px; color: " + txColor + "' id='operacion_" + i + "'>" + result[i][9] + "</div>" +
     "</div><div class='row p-0 m-0'><div class='col-2 m-0 modulo-sm-pat text-truncate' id='patente_" + i + "'>" + result[i][0] +
     "</div><div class='col-3 modulo-sm text-truncate' id='marca_" + i + "'>" + result[i][11] + 
     "</div><div class='col-2 modulo-sm text-truncate' id='vigencia_" + i + "'>" + result[i][7] + 
     "</div><div class='col-2 modulo-sm text-truncate' id='hasta_" + i + "'>" + result[i][8] + 
     "</div><div class='col-3 modulo-sm text-truncate' id='notas_" + i + "'>" + result[i][13] +
     "</div></div></div><div class=' text-sm text-truncate font-weight-bolder'><div class='row' ></div></div></div>"+
   "<div style='display: none;' id='sucursal_" + i + "'>" + result[i][3] + "</div>"+
   "<div style='display: none;' id='importe_" + i + "'>" + result[i][4] + "</div>"+
   "<div style='display: none;' id='poliza_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none;' id='cobertura_" + i + "'>" + result[i][10] + "</div>"+
   "<div style='display: none;' id='fpago_" + i + "'>" + result[i][12] + "</div>"+
   "<div style='display: none;' id='danios_" + i + "'>" + result[i][14] + "</div>"+
   "<div style='display: none;' id='motor_" + i + "'>" + result[i][15] + "</div>"+
   "<div style='display: none;' id='chasis_" + i + "'>" + result[i][16] + "</div>"+
   "<div style='display: none;' id='domicilio_" + i + "'>" + result[i][17] + "</div>"+
   "<div style='display: none;' id='localidad_" + i + "'>" + result[i][18] + "</div>"+
   "<div style='display: none;' id='wpp_" + i + "'>" + result[i][19] + "</div>"+
   "<div style='display: none;' id='mail_" + i + "'>" + result[i][20] + "</div>"+
   "<div style='display: none;' id='notascte_" + i + "'>" + result[i][21] + "</div>"+
   "</div>";
   }
   sinPendientesDiv.innerHTML = pendientesHtml;

if (result.length === 0) {
 sinPendientesDiv.innerHTML = "No se encontró ningún valor.";
 spinner.style.display = 'none';
}

     // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
     document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
     document.getElementsByName("domicilio")[0].value = document.getElementById("domicilio_" + id).textContent;
     document.getElementsByName("localidad")[0].value = document.getElementById("localidad_" + id).textContent;
     document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
     document.getElementsByName("fpago")[0].value = document.getElementById("fpago_" + id).textContent;
     document.getElementsByName("mail")[0].value = document.getElementById("mail_" + id).textContent;
     document.getElementsByName("notascte")[0].value = document.getElementById("notascte_" + id).textContent;
     document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
     document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("marca_v")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
     document.getElementsByName("vigencia")[0].value = document.getElementById("vigencia_" + id).textContent;
     document.getElementsByName("hasta")[0].value = document.getElementById("hasta_" + id).textContent;
     document.getElementsByName("cobertura")[0].value = document.getElementById("cobertura_" + id).textContent;
     document.getElementsByName("notas")[0].value = document.getElementById("notas_" + id).textContent;
     document.getElementsByName("danios")[0].value = document.getElementById("danios_" + id).textContent;
     document.getElementsByName("motor")[0].value = document.getElementById("motor_" + id).textContent;
     document.getElementsByName("chasis")[0].value = document.getElementById("chasis_" + id).textContent;
     document.getElementsByName("importe")[0].value = document.getElementById("importe_" + id).textContent;
     document.getElementsByName("sucursal")[0].value = document.getElementById("sucursal_" + id).textContent;
     document.getElementsByName("operacion")[0].value = document.getElementById("operacion_" + id).textContent;
     document.getElementsByName("poliza")[0].value = document.getElementById("poliza_" + id).textContent;
   });
     spinner.style.display = 'none';
 });

 }).getData(cnia_filter, patente_filter, dni_filter, estado_filter, nombre_filter);

}



function updateSinPendientes(result) {
 var sinPendientesDiv = document.getElementById("sinPendientes");
var pendientesHtml = "";
 for (var i = 0; i < result.length; i++) {

var  bgColor = "";
var dateParts = result[i][9].split("/");
var month = parseInt(dateParts[1], 10) - 1; // Restar 1 al mes para que sea de 0 a 11
var day = parseInt(dateParts[0], 10);
var year = new Date().getFullYear(); // Obtener el año actual
var date = new Date(year, month, day);
var today = new Date();

if (result[i][9] == "ANULACION") {
 txColor = "#DC143C";
} else if (result[i][9] == "PENDIENTE") {
 txColor = "#002392";
} else {
 txColor = "#00BB2D";
}


pendientesHtml += "<div class='border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;' id='div" + i + "'><div class='row m-0 p-0'>" + 
     "<div class='col-4 cnia_border m-0 text-sm text-truncate' style='" +
   (result[i][5] === 'FED PAT' ? "background-color: #002392;" :
   result[i][5] === 'AGROSALTA' ? "background-color: #FD964D;" :
   result[i][5] === 'AGRO (V)' ? "background-color: #FD964D;" :
   result[i][5] === 'AGROSALTA C/GRUA' ? "background-color: #FD964D;" :
   result[i][5] === 'AGRO (V) C/GRUA' ? "background-color: #FD964D;" :
   result[i][5] === 'RIVADAVIA' ? "background-color: #28BEF5;" :
   result[i][5] === 'MAPFRE' ? "background-color: #CB3234;" :
   result[i][5] === 'RIO URUGUAY' ? "background-color: #5AC4C3;" :
   result[i][5] === 'LIBRA' ? "background-color: #FF8000;" :
   result[i][5] === 'NIVEL' ? "background-color: #F57C00;" :
   result[i][5] === 'PROVIDENCIA' ? "background-color: #94B3FD;" :
   result[i][5] === 'LA CAJA' ? "background-color: #EF5350;" :
   result[i][5] === 'MERCANTIL' ? "background-color: #966CA7;" :
   result[i][5] === 'SAN PATRICIO' ? "background-color: #EF5350;" :
   result[i][5] === 'ATM' ? "background-color: #EF5350;" :
   result[i][5] === 'BENEFICIO' ? "background-color: #9EBAD1;" :
   result[i][5] === 'ALLIANZ' ? "background-color: #68C1C8;" :
   result[i][5] === 'ORBIS' ? "background-color: #C8C560;" :
   result[i][5] === 'ESCUDO' ? "background-color: #9EBAD1;" :
   result[i][5] === 'DIGMA' ? "background-color: #68C1C8;" :
   result[i][5] === 'CARDINAL' ? "background-color: #C8C560;" :
   result[i][5] === 'GRUA' ? "background-color: #6088A9;" : "") + 
 "' id='cnia_" + i + "'>" + result[i][5] + 

       "</div><div class='col-2 modulo' id='dni_" + i + "'>" + result[i][1] +
       "</div><div class='col-4 modulo text-truncate' id='nombre_" + i + "'>" + result[i][2] +
       "</div><div class='col-2 modulo-sm m-0' style='align: center; width: 150px;padding-top: 5px; color: " + txColor + "' id='operacion_" + i + "'>" + result[i][9] + "</div>" +
     "</div><div class='row p-0 m-0'><div class='col-2 m-0 modulo-sm-pat text-truncate' id='patente_" + i + "'>" + result[i][0] +
     "</div><div class='col-3 modulo-sm text-truncate' id='marca_" + i + "'>" + result[i][11] + 
     "</div><div class='col-2 modulo-sm text-truncate' id='vigencia_" + i + "'>" + result[i][7] + 
     "</div><div class='col-2 modulo-sm text-truncate' id='hasta_" + i + "'>" + result[i][8] + 
     "</div><div class='col-3 modulo-sm text-truncate' id='notas_" + i + "'>" + result[i][13] +
     "</div></div><div class=' text-sm text-truncate font-weight-bolder'><div class='row' ></div></div></div>"+
   "<div style='display: none;' id='sucursal_" + i + "'>" + result[i][3] + "</div>"+
   "<div style='display: none;' id='importe_" + i + "'>" + result[i][4] + "</div>"+
   "<div style='display: none;' id='poliza_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none;' id='operacion_" + i + "'>" + result[i][9] + "</div>"+
   "<div style='display: none;' id='cobertura_" + i + "'>" + result[i][10] + "</div>"+
   "<div style='display: none;' id='fpago_" + i + "'>" + result[i][12] + "</div>"+
   "<div style='display: none;' id='danios_" + i + "'>" + result[i][14] + "</div>"+
   "<div style='display: none;' id='motor_" + i + "'>" + result[i][15] + "</div>"+
   "<div style='display: none;' id='chasis_" + i + "'>" + result[i][16] + "</div>"+
   "<div style='display: none;' id='domicilio_" + i + "'>" + result[i][17] + "</div>"+
   "<div style='display: none;' id='localidad_" + i + "'>" + result[i][18] + "</div>"+
   "<div style='display: none;' id='wpp_" + i + "'>" + result[i][19] + "</div>"+
   "<div style='display: none;' id='mail_" + i + "'>" + result[i][20] + "</div>"+
   "<div style='display: none;' id='notascte_" + i + "'>" + result[i][21] + "</div>"+
   "</div>";
 }
 sinPendientesDiv.innerHTML = pendientesHtml;

 // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
     document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
     document.getElementsByName("domicilio")[0].value = document.getElementById("domicilio_" + id).textContent;
     document.getElementsByName("localidad")[0].value = document.getElementById("localidad_" + id).textContent;
     document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
     document.getElementsByName("fpago")[0].value = document.getElementById("fpago_" + id).textContent;
     document.getElementsByName("mail")[0].value = document.getElementById("mail_" + id).textContent;
     document.getElementsByName("notascte")[0].value = document.getElementById("notascte_" + id).textContent;
     document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
     document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("marca_v")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
     document.getElementsByName("vigencia")[0].value = document.getElementById("vigencia_" + id).textContent;
     document.getElementsByName("hasta")[0].value = document.getElementById("hasta_" + id).textContent;
     document.getElementsByName("cobertura")[0].value = document.getElementById("cobertura_" + id).textContent;
     document.getElementsByName("notas")[0].value = document.getElementById("notas_" + id).textContent;
     document.getElementsByName("danios")[0].value = document.getElementById("danios_" + id).textContent;
     document.getElementsByName("motor")[0].value = document.getElementById("motor_" + id).textContent;
     document.getElementsByName("chasis")[0].value = document.getElementById("chasis_" + id).textContent;
     document.getElementsByName("operacion")[0].value = document.getElementById("operacion_" + id).textContent;
     document.getElementsByName("importe")[0].value = document.getElementById("importe_" + id).textContent;
     document.getElementsByName("poliza")[0].value = document.getElementById("poliza_" + id).textContent;
     document.getElementsByName("sucursal")[0].value = document.getElementById("sucursal_" + id).textContent;

document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";
   });
 });
}
google.script.run.withSuccessHandler(updateSinPendientes).getData();


//////////////// CARGAR CORREOS  ///////////////
function cargarCorreos() {
 event.preventDefault();
 var patente = document.getElementById("patente").value;

google.script.run.withSuccessHandler(function(emailsHTML) {
 // Muestra el contenido HTML de los correos electrónicos en el div con ID "emails"
 var div2 = document.getElementById("emails");
 console.log(emailsHTML)
 div2.innerHTML = emailsHTML;
}).mostrarCorreos(patente);
}

function enviarMail() {
 var patente = document.getElementById("patente").value;

 // Abrir Gmail y buscar el número
 window.open("https://mail.google.com/mail/u/0/#search/" + patente);
}

function enviarMensajeWPP() {
 // Obtener el número de teléfono ingresado
 var telefono = document.getElementById("wpp").value;

 // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
 window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}

document.getElementById("novedad_sn").addEventListener("change", function() {
 var novedad = this.value;
 var poliza = document.getElementById("poliza_sn");
 var operacion = document.getElementById("operacion_sn");
 var poliza2 = document.getElementById("poliza_sn2");
 var operacion2 = document.getElementById("operacion_sn2");
 if (novedad === "ALTA DE POLIZA") {
   poliza2.style.display = "block";
   operacion2.style.display = "block";
   poliza.style.display = "block";
   poliza.value = "";
   operacion.style.display = "block";
   operacion.value = "SEGURO NUEVO";
 } else if (novedad === "BAJA DE POLIZA") {
   poliza2.style.display = "block";
   operacion2.style.display = "block";
   poliza.style.display = "block";
   poliza.value = document.getElementById("poliza").value;
   operacion.style.display = "block";
   operacion.value = "ANULACION";
 } else {
   poliza.style.display = "none";
   operacion.style.display = "none";
   poliza2.style.display = "none";
   operacion2.style.display = "none";
 }
});


 function cleanService() {
 event.preventDefault();

document.getElementById("sinPendientes").innerHTML = "";
document.getElementById("nombre").value = "";
document.getElementById("dni").value = "";
document.getElementById("domicilio").value = "";
document.getElementById("localidad").value = "";
document.getElementById("wpp").value = "";
document.getElementById("mail").value = "";
document.getElementById("fpago").value = "";
document.getElementById("notascte").value = "";

document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("marca").value = "";
document.getElementById("marca_v").value = "";
document.getElementById("motor").value = "";
document.getElementById("chasis").value = "";
document.getElementById("cnia").value = "";
document.getElementById("cobertura").value = "";
document.getElementById("importe").value = "";
document.getElementById("poliza").value = "";
document.getElementById("vigencia").value = "";
document.getElementById("hasta").value = "";
document.getElementById("operacion").value = "";
document.getElementById("sucursal").value = "";
document.getElementById("danios").value = "";
document.getElementById("notas").value = "";

document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";

alert('Limpieza exitosa.');
}



function actualiEstado(event) {
 event.preventDefault();
 const usuario_sn = sessionStorage.getItem("magi-usuario");
 const novedad_sn = document.getElementById('novedad_sn').value;
 const operacion_sn = document.getElementById('operacion_sn').value;
 const poliza_sn = document.getElementById('poliza_sn').value;
 const notas_sn = document.getElementById('notas_sn').value;
 const patente_sn = document.getElementById('patente').value;
 const notas_old = document.getElementById('notas').value;

console.log(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old)

 google.script.run.actualizarEstado(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old);

alert('Ingreso de estado exitoso.');

document.getElementById("sinPendientes").innerHTML = "";
document.getElementById("nombre").value = "";
document.getElementById("dni").value = "";
document.getElementById("domicilio").value = "";
document.getElementById("localidad").value = "";
document.getElementById("wpp").value = "";
document.getElementById("mail").value = "";
document.getElementById("fpago").value = "";
document.getElementById("notascte").value = "";

document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("marca").value = "";
document.getElementById("marca_v").value = "";
document.getElementById("motor").value = "";
document.getElementById("chasis").value = "";
document.getElementById("cnia").value = "";
document.getElementById("cobertura").value = "";
document.getElementById("importe").value = "";
document.getElementById("poliza").value = "";
document.getElementById("vigencia").value = "";
document.getElementById("hasta").value = "";
document.getElementById("operacion").value = "";
document.getElementById("sucursal").value = "";
document.getElementById("danios").value = "";
document.getElementById("notas").value = "";

document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";

}

function modificarDatos(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-modificar-datos');
   const spinner = document.getElementById('spinner5');
   spinner.style.display = 'inline-block';
   boton.disabled = true;
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombre").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoFpago =  document.getElementById("fpago").value;
   let infoNotascte =  document.getElementById("notascte").value;

   let infoPatente =  document.getElementById("patente").value;
   let infoMarca =  document.getElementById("marca_v").value;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoNotasVeh =  document.getElementById("notas").value;

 google.script.run.modNueva(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasVeh, infoMotor, infoChasis);
alert('Póliza actualizada correctamente');
 spinner.style.display = 'none';
 boton.disabled = false;
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


document.getElementById('bt-buscar').addEventListener('click', filtrar);
document.getElementById('bt-reset').addEventListener('click', cleanService);
document.getElementById('bt-modificar-datos').addEventListener('click', modificarDatos);
document.getElementById('bt-actualizar_nota').addEventListener('click', actualiEstado);
document.getElementById('close_session').addEventListener('click', close_sessionok);