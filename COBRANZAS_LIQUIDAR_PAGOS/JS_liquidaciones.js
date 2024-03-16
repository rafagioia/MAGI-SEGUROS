
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

////////////// LISTA DE PAGOS ///////////////////////
function updateSinPendientes(result) {
 var sinPendientesDiv = document.getElementById("sinPendientes");
 var pendientesHtml = "";
 var idDeudores = []; // Nuevo array para almacenar los id_deudor distintos

 // Función para convertir la cadena de fecha en formato DD/MM/YYYY a objeto de fecha
 function convertToDate(dateString) {
   var parts = dateString.split('/');
   return new Date(parts[2], parts[1] - 1, parts[0]); // Restamos 1 al mes ya que en Date() los meses van de 0 a 11
 }

 // Ordenar el arreglo result de menor a mayor según las fechas (result[i][2])
 result.sort(function(a, b) {
   var dateA = convertToDate(a[7]);
   var dateB = convertToDate(b[7]);
   return dateA - dateB;
 });

 for (var i = 0; i < result.length; i++) {
pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
pendientesHtml += "<div class='row' style='padding: 5px;'>";
pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";

// Columna de deudor
pendientesHtml += "<div class='col-1 text-sm' style='font-size: 8px;' id='_recibo" + i + "'>" + result[i][0] + "</div>";

// Columna de cliente
pendientesHtml += "<div class='col-3 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_cte" + i + "'>" + result[i][1] + "</div>";

// Columna de vencimiento
pendientesHtml += "<div class='col-2'><input type='text' class='form-control text-sm planilla'  id='_vto" + i + "' value='" + result[i][7] + "'></div>";



// <div class='col-2 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_vto" + i + "'>" + result[i][7] + "</div>";

// Columna de cuenta
pendientesHtml += "<div class='col-2 text-sm planilla'><div class='row p-0 m-0'>"


pendientesHtml += "<div class='col-4 m-0 p-0'><input type='text' class='form-control text-sm planilla p-0'  id='_cta" + i + "' value='" + result[i][5] + "'></div>"
pendientesHtml += "<div class='col-2 m-0 p-1 planilla'>/</div>";
pendientesHtml += "<div class='col-4 m-0 p-0'><input type='text' class='form-control text-sm planilla p-0'  id='_ctad" + i + "' value='" + result[i][6] + "'></div></div></div>"

// pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla' id='_cta" + i + "'>" + result[i][5] + "</div>";
// pendientesHtml += "<div class='col-2 m-0 p-1 planilla'>/</div>";
// pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla'  id='_ctad" + i + "'>" + result[i][6] + "</div></div></div>";

// Columna de CNIA
pendientesHtml += "<div class='col-3 text-sm planilla' style='padding-top: 10px;' id='_cnia" + i + "'>" + result[i][4] + "</div>";


pendientesHtml += "</div></div>";
pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
// Columna de importe
pendientesHtml += "<div class='col-4 planilla'><div class='input-group'>";
// Columna de IMPORTE
pendientesHtml += "<div class='col-6 text-sm planilla' style='padding-top: 10px;' id='_imp" + i + "'>" + result[i][10] + "</div>";


// Columna de POLIZA
if (result[i][12]) {
 pendientesHtml += "<div class='col-5  p-0'><input type='text' class='form-control text-sm planilla'  id='_pol" + i + "' value='" + result[i][11] + "'></div><div class='col-1' style='margin: auto' id='upd_pol" + i + "'>??</div>";
} else {
 pendientesHtml += "<div class='col-5  p-0'><input type='text' class='form-control text-sm planilla'  id='_pol" + i + "' value='" + result[i][11] + "'></div><div class='col-1' style='margin: auto' id='upd_pol" + i + "'><button class='btn btn-secondary' id='btn_upd_pol" + i + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQxJREFUSEu1lYsNwyAMRH2btJsko3SSjtJukoySTVwdgorwM6EFKYpEnHv2YQAyeWCyvvwFoKo3EVkAvNOETwBVXUTkJSL8oTVWADsDVHWjuA8+RITf+HYjBcTBNUBJPAgysQPAvQZQRwVM66LMnaC3iQkS8gh2pRV0AWq2RPPjgDhzb4OzxT9cizGLvAVsgK9IYgt5J/HSIhctKomHRUzXwmrTDHBVnK0eWtisoCbemKd9W9yFzS4qlW9UlDlgAU4/tMT9rh4HWOI/AZLOyFox6qixCiJAVXyogqt3hapeq2AGoOe4trg7gLV2XHOjPKMLxBJLv/PQ40nqLqNsJ19V64k3L5YekVbMdMAH5/PsGSTMuK8AAAAASUVORK5CYII='/></button></div>";
}

pendientesHtml += "</div></div>";

// Columna de patente
pendientesHtml += "<div class='col-2 text-sm text-truncate planilla' id='_pat" + i + "'>" + result[i][2] + "</div>";

// Columna de marca
pendientesHtml += "<div class='col-3 text-sm text-truncate  planilla'  id='_marca" + i + "'>" + result[i][3] + "</div>";



pendientesHtml += "<div class='col-3 row planilla'>";

 pendientesHtml += "<div class='col-6 row planilla' id='sec_pasa" + i + "'>";
 // Comprueba si hay un valor en la columna [8]
 if (result[i][8]) {
   // Si hay un valor, agrega "Pasado:" y el valor de la columna
   pendientesHtml += "<button class='btn btn-success btn-sm' id='btnPasar" + i + "' style='display: none'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALZJREFUSEvdlesNwyAMhO82aTZJR+kkHSWjhFGyiSsiJUoQGOy8pPIX7M8+zEFcvHhxfhQBItIDGAC8jEVMAD4kQ4zTACOACPGsiWRXA8h8gDTJKCK7OK2D5wBplVsNT+nABUiDLEmaOqgBlv3SSC3DUJTocYAmwykS/RdA8w73JbcakgVwxOwCyffO7DJjGp3063DUvF1rL7dVnty51U3vALg0r/0X2w5cmjcDjuisxZq+Q08RP2kHzhnqPM52AAAAAElFTkSuQmCC'/></button><div id='pas_id" + i + "'><b>Pasado: </b><div class='text-sm'  id='_fec_pas" + i + "'>" + result[i][8] + "</div></div>";
 } else {
   // Si no hay un valor, agrega un botón "Pasar"
   pendientesHtml += "<button class='btn btn-success btn-sm' id='btnPasar" + i + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALZJREFUSEvdlesNwyAMhO82aTZJR+kkHSWjhFGyiSsiJUoQGOy8pPIX7M8+zEFcvHhxfhQBItIDGAC8jEVMAD4kQ4zTACOACPGsiWRXA8h8gDTJKCK7OK2D5wBplVsNT+nABUiDLEmaOqgBlv3SSC3DUJTocYAmwykS/RdA8w73JbcakgVwxOwCyffO7DJjGp3063DUvF1rL7dVnty51U3vALg0r/0X2w5cmjcDjuisxZq+Q08RP2kHzhnqPM52AAAAAElFTkSuQmCC'/></button><div id='pas_id" + i + "' style='display: none'><b>Pasado: </b><div class='text-sm'  id='_fec_pas" + i + "' ></div></div>";
 }
 pendientesHtml += "</div>";

 pendientesHtml += "<div class='col-6 row planilla' id='sec_liq" + i + "'>";
 // Comprueba si hay un valor en la columna [9]
 if (result[i][8] && result[i][9]) {
   // Si hay un valor, agrega "Liquidado:" y el valor de la columna
   pendientesHtml += "<button class='btn btn-danger btn-sm' id='btnQuitar" + i + "' style='display: none'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJxJREFUSEvtVdsNgCAMvNtEN9FRnMRRHEVGYZMaTDC+KARCTAz9pLR3fcARlY2V80MFEJEBwAKgCxCxACaSJkQ0BrACcCCaWZJ9LoC4QJKvRERE9e+xGrVYgpj/AeADSgd/rvhSQXUAzzyl9HOV2v3s4TWA6H63FrUWHTvw34eWIjT3T9eQHO+HoRY5FZsT1MznC0rnt6JfKjwufgPQK44Z7c91NgAAAABJRU5ErkJggg=='/></button><div id='liq_id'><b>Liquidado: </b><div class='text-sm' id='pas_id" + i + "'>" + result[i][9] + "</div></div>";
 } else if (result[i][8] && !result[i][9]) {
   // Si no hay un valor en la columna [8], agrega un botón "X" de color rojo
   pendientesHtml += "<button class='btn btn-danger btn-sm' id='btnQuitar" + i + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJxJREFUSEvtVdsNgCAMvNtEN9FRnMRRHEVGYZMaTDC+KARCTAz9pLR3fcARlY2V80MFEJEBwAKgCxCxACaSJkQ0BrACcCCaWZJ9LoC4QJKvRERE9e+xGrVYgpj/AeADSgd/rvhSQXUAzzyl9HOV2v3s4TWA6H63FrUWHTvw34eWIjT3T9eQHO+HoRY5FZsT1MznC0rnt6JfKjwufgPQK44Z7c91NgAAAABJRU5ErkJggg=='/></button><div id='liq_id" + i + "' style='display: none'><b>Liquidado: </b><div class='text-sm'  id='pas_id" + i + "'></div></div>";
   }  else if (!result[i][8] && !result[i][9]) {
   // Si no hay un valor en la columna [8], agrega un botón "X" de color rojo
   pendientesHtml += "<button class='btn btn-danger' id='btnQuitar" + i + "' style='display: none'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJxJREFUSEvtVdsNgCAMvNtEN9FRnMRRHEVGYZMaTDC+KARCTAz9pLR3fcARlY2V80MFEJEBwAKgCxCxACaSJkQ0BrACcCCaWZJ9LoC4QJKvRERE9e+xGrVYgpj/AeADSgd/rvhSQXUAzzyl9HOV2v3s4TWA6H63FrUWHTvw34eWIjT3T9eQHO+HoRY5FZsT1MznC0rnt6JfKjwufgPQK44Z7c91NgAAAABJRU5ErkJggg=='/></button><div id='liq_id" + i + "' style='display: none'><b>Liquidado: </b><div class='text-sm' id='pas_id" + i + "'></div></div>";
   }
pendientesHtml += "</div>";

   // Cierra el div principal
   pendientesHtml += "</div>";

pendientesHtml += "</div></div>";
pendientesHtml += "<div style='display: none;' id='_dni" + i + "'>" + result[i][12] + "</div>" +
 "<div style='display: none;' class='text-sm planilla' id='_pago" + i + "'>" + result[i][13] + "</div>" +
 "<div style='display: none;' id='_poliza" + i + "'>" + result[i][14] + "</div>" +
 "<div style='display: none;' id='_recibo" + i + "'>" + result[i][15] + "</div>" +
 "</div></div></div>";



   if (!idDeudores.includes(result[i][0])) {
     idDeudores.push(result[i][0]);
   }
 }

   sinPendientesDiv.textContent = "";
   sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);

// var idDeudorSelect = document.getElementById("id_deudor_select");
// var idDeudorSelectAlta = document.getElementById("alta_id_deudor");
var actualizarListaBtn = document.getElementById("bt-actualizar_lista");
var totalValInput = document.getElementById("total_val");
var totalValInput2 = document.getElementById("total_val2");
var totalCountInput = document.getElementById("total_count");
var resetFiltroBtn = document.getElementById("bt-reset-filtro");

///////////////////// SUMAR TOTAL DE VALORES ////////////////
function calcularSumaTotal() {
 var suma2 = 0;
 var count2 = 0; // Variable para contar los elementos sumados

 var divs = document.querySelectorAll("#sinPendientes > div");

 for (var i = 0; i < divs.length; i++) {
   var div = divs[i];
   var input = div.querySelector("div[id^='_imp']");

   if (input !== null) {
     var valor = input.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     console.log("Valor antes de convertir a número:", valor); // Mostrar el valor antes de convertir a número

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales

       console.log("Valor después de convertir a número:", valor); // Mostrar el valor después de convertir a número

       if (!isNaN(valor) && result[i][8] === "") {
         suma2 += valor;
         count2++;
         console.log("Suma parcial:", suma2); // Mostrar la suma parcial en cada iteración
       }
     }
   } else {
     console.log("No se encontró ningún div[id^='_imp'] dentro del div actual");
   }
 }

 console.log("Total de elementos sumados:", count2); // Mostrar el total de elementos sumados
 console.log("Suma total:", suma2.toFixed(2)); // Mostrar la suma total con dos decimales

 if (totalValInput2) {
   totalValInput2.value = suma2.toFixed(2);
 }
}


// Llamar a la función inicialmente y cada vez que se cambie un valor
calcularSumaTotal();

var impInputs2 = document.querySelectorAll("input[id^='_imp']");
for (var j = 0; j < impInputs2.length; j++) {
 impInputs2[j].addEventListener("input", calcularSumaTotal);
}

///////////////////// SUMAR VALORES ////////////////

function calcularSuma() {
 var suma = 0;
 var count = 0;
 var divs = document.querySelectorAll("#sinPendientes > div");

 for (var i = 0; i < divs.length; i++) {
   var div = divs[i];
 
   // Verificar si hay un valor en result[i][8] y si contenidoImp no es null
   if (result[i][8] !== ""){
     // Obtener el valor del contenido del div con id "_imp"
     var contenidoImp = div.querySelector("div[id^='_imp']");
     var valor = contenidoImp.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales
       if (!isNaN(valor)) {
         suma += valor;
         count++
       }
     }
   }
 }

 totalValInput.value = suma;
 totalCountInput.value = count;

 // Obtener la fecha actual
 var fechaActual = new Date();
 var dia = fechaActual.getDate();
 var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero)
 var anio = fechaActual.getFullYear();

 // Formatear la fecha en el formato deseado (por ejemplo, DD/MM/AAAA)
 var fechaFormateada = dia + "/" + mes + "/" + anio;

 // Asignar la fecha formateada al campo de entrada "fecha_actual"
 document.getElementById("fecha_actual").value = fechaFormateada;
}

// Llamar a la función inicialmente y cada vez que se cambie un valor
calcularSuma();

var impInputs = document.querySelectorAll("input[id^='_imp']");
for (var j = 0; j < impInputs.length; j++) {
 impInputs[j].addEventListener("input", calcularSuma);
}

/////////////// BOTON PARA ACTUALIZAR POLIZA //////////////////
var divs3 = document.querySelectorAll("[id^='btn_upd_pol']");

divs3.forEach(function (btn_upd_pol) {
 btn_upd_pol.addEventListener("click", function () {
   var id = btn_upd_pol.id.slice(11); // Obtener el índice del div
   let infoRecibo = document.getElementById("_recibo" + id).textContent;
   let infoPoliza = document.getElementById("_pol" + id).value;
   let infoPatente = document.getElementById("_pat" + id).textContent;
   let infoVto = document.getElementById("_vto" + id).value;
   let infoCta = document.getElementById("_cta" + id).value;
   let infoVig = document.getElementById("_ctad" + id).value;

   // Ocultar el botón
   document.getElementById("btn_upd_pol" + id).style.display = "none";


google.script.run.withSuccessHandler(function (fechaHoyPasada) {
     document.getElementById("upd_pol" + id).textContent = "??";

}).withFailureHandler(function (error) {
 
 console.error("Error al actualizar datos:", error);
 console.log("Hubo un problema al actualizar datos del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza);
 alert("Hubo un problema al actualizar datos del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza + ". Por favor, inténtalo de nuevo más tarde.");

 document.getElementById("btn_upd_pol" + id).style.display = "block";

}).updatePol(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig);

   // google.script.run.withSuccessHandler(function (fechaHoyPasada) {
   //   document.getElementById("upd_pol" + id).textContent = "??";
   // }).updatePol(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig);
 });
});


/////////////// BOTON PARA PASAR PAGO //////////////////
var divs3 = document.querySelectorAll("[id^='btnPasar']");

divs3.forEach(function (btnPasar) {
 btnPasar.addEventListener("click", function () {
   var id = btnPasar.id.slice(8); // Obtener el índice del div
   let infoRecibo = document.getElementById("_recibo" + id).textContent;
   let infoPatente = document.getElementById("_pat" + id).textContent;
   let infoPoliza = document.getElementById("_pol" + id).value;
   let infoVto = document.getElementById("_vto" + id).value;
   let infoCta = document.getElementById("_cta" + id).value;
   let infoVig = document.getElementById("_ctad" + id).value;

   // Ocultar el botón
   document.getElementById("btnPasar" + id).style.display = "none";


google.script.run.withSuccessHandler(function (fechaHoyPasada) {


   document.getElementById("pas_id" + id).style.display = "block";
   document.getElementById("btnQuitar" + id).style.display = "block";

     let importe = document.getElementById("_imp" + id).textContent;
     importe = importe.replace('$', ''); // Eliminar el signo "$"
     importe = importe.replace('.', ''); // Eliminar el signo "$"
     importe = parseInt(importe); // Convertir a número entero

     let totalActual = parseInt(document.getElementById("total_val").value) || 0;
     let totalActual2 = parseInt(document.getElementById("total_val2").value) || 0;
     let totalCount = parseInt(document.getElementById("total_count").value) || 0;
     
     let total = totalActual + importe;
     let total2 = totalActual2 - importe;
     let totalCount2 = totalCount + 1;

     document.getElementById("total_val").value = total;
     document.getElementById("total_val2").value = total2;
     document.getElementById("total_count").value = totalCount2; 

 document.getElementById("_fec_pas" + id).textContent = fechaHoyPasada;
}).withFailureHandler(function (error) {
 
 console.error("Error al pasar el pago:", error);
 console.log("Hubo un problema al procesar el pago del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza);
 alert("Hubo un problema al procesar el pago del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza + ". Por favor, inténtalo de nuevo más tarde.");
   document.getElementById("btnPasar" + id).style.display = "block";
}).pasarPago(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig);


   // google.script.run.withSuccessHandler(function (fechaHoyPasada) {
   //   document.getElementById("_fec_pas" + id).textContent = fechaHoyPasada;
   // }).pasarPago(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig);
 });
});


/////////////// BOTON PARA QUITAR PAGO PASADO //////////////////
var divs2 = document.querySelectorAll("[id^='btnQuitar']");

divs2.forEach(function (btnQuitar) {
 btnQuitar.addEventListener("click", function () {
   var id = btnQuitar.id.slice(9); // Obtener el índice del div
   let infoRecibo = document.getElementById("_recibo" + id).textContent;
   let infoPatente = document.getElementById("_pat" + id).textContent;
   let infoPoliza = document.getElementById("_pol" + id).value;

   // Ocultar el botón
   document.getElementById("pas_id" + id).style.display = "none";
   document.getElementById("btnQuitar" + id).style.display = "none";




google.script.run.withSuccessHandler(function (fechaHoyPasada) {


   document.getElementById("btnPasar" + id).style.display = "block";

     let importe = document.getElementById("_imp" + id).textContent;
     importe = importe.replace('$', ''); // Eliminar el signo "$"
     importe = importe.replace('.', ''); // Eliminar el signo "$"
     importe = parseInt(importe); // Convertir a número entero

     let totalActual = parseInt(document.getElementById("total_val").value) || 0;
     let totalActual2 = parseInt(document.getElementById("total_val2").value) || 0;
     let totalCount = parseInt(document.getElementById("total_count").value) || 0;
     
     let total = totalActual - importe;
     let total2 = totalActual2 + importe;
     let totalCount2 = totalCount - 1;

     document.getElementById("total_val").value = total;
     document.getElementById("total_val2").value = total2;
     document.getElementById("total_count").value = totalCount2; 

     document.getElementById("_fec_pas" + id).textContent = "";

}).withFailureHandler(function (error) {
 
 console.error("Error al quitar el pago:", error);
 console.log("Hubo un problema al quitar el pago pasado del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza);
 alert("Hubo un problema al quitar el pago pasado del recibo N°: " + infoRecibo + ", patente: " + infoPatente + " y N° de Poliza: " + infoPoliza + ". Por favor, inténtalo de nuevo más tarde.");

   document.getElementById("btnQuitar" + id).style.display = "block";
}).quitarPago(infoRecibo);




   // google.script.run.withSuccessHandler(function (fechaHoyPasada) {
   // }).quitarPago(infoRecibo);
 });
});


///////////////////// FILTRO GENERALIZADO /////////////////////////////

document.getElementById("actualizarListaBtn").addEventListener("click", function() {

 var suma2 = 0;

 var dia_desde = parseInt(document.getElementById("dia_desde").value) || 1;
 var mes_desde = parseInt(document.getElementById("mes_desde").value) || 1;
 var anio_desde = parseInt(document.getElementById("anio_desde").value) || 1970;
 var dia_hasta = parseInt(document.getElementById("dia_hasta").value) || 31;
 var mes_hasta = parseInt(document.getElementById("mes_hasta").value) || 12;
 var anio_hasta = parseInt(document.getElementById("anio_hasta").value) || (new Date()).getFullYear();
 var filtro_patente = document.getElementById("filtro_patente").value || "";
 var seleccionado = document.getElementById("cnia_s").value;

 // Filtrar los elementos basados en el valor seleccionado
 var divs = document.querySelectorAll("#sinPendientes > div");

 for (var i = 0; i < divs.length; i++) {
   var div = divs[i];
   var cnia = div.querySelector(".text-sm[id^='_cnia']").textContent;
   var patente = div.querySelector(".text-sm[id^='_pat']").textContent;
   var input = div.querySelector("div[id^='_imp']");
   var fechaPagoString = div.querySelector(".text-sm[id^='_pago']").textContent; 

   var partesFecha = fechaPagoString.split(' ');
   var partesFechaSeparadas = partesFecha[0].split('/'); // Tomar la parte de la fecha (antes del espacio) y separarla por las barras

   // Obtener día, mes y año de la fecha de pago
   var diaPago = parseInt(partesFechaSeparadas[0]);
   var mesPago = parseInt(partesFechaSeparadas[1]);
   var anioPago = parseInt(partesFechaSeparadas[2]);

   var todosLosAgros = ["AGROSALTA", "AGROSALTA C/GRUA", "AGRO (V) C/GRUA", "AGRO MOTO", "AGRO (V)"];

   if (filtro_patente === "") {
         if (seleccionado === "todosLosAgros") {
     if (todosLosAgros.includes(cnia) && (anioPago > anio_desde || (anioPago === anio_desde && mesPago > mes_desde) || (anioPago === anio_desde && mesPago === mes_desde && diaPago >= dia_desde)) &&
     (anioPago < anio_hasta || (anioPago === anio_hasta && mesPago < mes_hasta) || (anioPago === anio_hasta && mesPago === mes_hasta && diaPago <= dia_hasta))) {
       div.style.display = "block"; // Mostrar el elemento
     var valor = input.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales

       if (!isNaN(valor)) {
         suma2 += valor;
       }
     }

     } else {
       div.style.display = "none"; // Ocultar el elemento
     }
   } else if ((cnia === seleccionado || seleccionado === "todos") && (anioPago > anio_desde || (anioPago === anio_desde && mesPago > mes_desde) || (anioPago === anio_desde && mesPago === mes_desde && diaPago >= dia_desde)) &&
     (anioPago < anio_hasta || (anioPago === anio_hasta && mesPago < mes_hasta) || (anioPago === anio_hasta && mesPago === mes_hasta && diaPago <= dia_hasta))) {
     div.style.display = "block"; // Mostrar el elemento
     var valor = input.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales

       if (!isNaN(valor)) {
         suma2 += valor;
       }
     }
   } else {
     div.style.display = "none"; // Ocultar el elemento
   }
   } else {
         if (seleccionado === "todosLosAgros") {
     if (todosLosAgros.includes(cnia) && (anioPago > anio_desde || (anioPago === anio_desde && mesPago > mes_desde) || (anioPago === anio_desde && mesPago === mes_desde && diaPago >= dia_desde)) &&
     (anioPago < anio_hasta || (anioPago === anio_hasta && mesPago < mes_hasta) || (anioPago === anio_hasta && mesPago === mes_hasta && diaPago <= dia_hasta)) && (patente === filtro_patente)) {
       div.style.display = "block"; // Mostrar el elemento
     var valor = input.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales

       if (!isNaN(valor)) {
         suma2 += valor;
       }
     }

     } else {
       div.style.display = "none"; // Ocultar el elemento
     }
   } else if ((cnia === seleccionado || seleccionado === "todos") && (anioPago > anio_desde || (anioPago === anio_desde && mesPago > mes_desde) || (anioPago === anio_desde && mesPago === mes_desde && diaPago >= dia_desde)) &&
     (anioPago < anio_hasta || (anioPago === anio_hasta && mesPago < mes_hasta) || (anioPago === anio_hasta && mesPago === mes_hasta && diaPago <= dia_hasta)) && (patente === filtro_patente)) {
     div.style.display = "block"; // Mostrar el elemento
     var valor = input.textContent.replace('$', ''); // Eliminar el signo "$"
     valor = valor.replace('.', ''); // Eliminar el signo "."

     if (valor !== "") {
       valor = parseInt(valor); // Usar parseInt para mantener los decimales

       if (!isNaN(valor)) {
         suma2 += valor;
       }
     }
   } else {
     div.style.display = "none"; // Ocultar el elemento
   }
   }

 }
 if (totalValInput2) {
   totalValInput2.value = suma2.toFixed(2);
 }
 calcularSuma();
});

/////////////////// LIMPIAR FILTRO //////////////////////////

document.getElementById("limpiar_filtro").addEventListener("click", function() {
 // Restablecer los valores predeterminados de los selects
 document.getElementById("dia_desde").value = "";
 document.getElementById("mes_desde").value = "";
 document.getElementById("anio_desde").value = "";
 document.getElementById("dia_hasta").value = "";
 document.getElementById("mes_hasta").value = "";
 document.getElementById("anio_hasta").value = "";
 document.getElementById("filtro_patente").value = "";
 document.getElementById("cnia_s").value = "";
 
});


/// GENERAR LISTADO
document.getElementById("bt-regenarar_lista").addEventListener("click", function() {
 var dia = parseInt(document.getElementById("dia").value, 10);
 var mes = parseInt(document.getElementById("mes").value, 10) + 1; // Sumamos 1 al mes
 var anio = parseInt(document.getElementById("anio").value, 10);
 var anioUltimosDosDigitos = anio % 100;
 
 // Función para agregar un cero delante si el número es menor a 10
 function agregarCero(num) {
   return num < 10 ? "0" + num : num;
 }

 // Aplicar la función agregarCero a dia y mes
 var diaFormateado = agregarCero(dia);
 var mesFormateado = agregarCero(mes);

 calcularSuma();

 google.script.run.withSuccessHandler(updateSinPendientes).getData(diaFormateado, mesFormateado, anioUltimosDosDigitos);
});


}

 // Llamar a la función getData() del lado del servidor
 google.script.run.withSuccessHandler(updateSinPendientes).getData();
 /////////////////////////////////////////



/// OBTENER FECHA ACTUAL PARA LIQUIDAR
 const fechaActual = new Date();

 // Obtiene el día, mes y año
 const dia = fechaActual.getDate().toString().padStart(2, '0');
 const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses comienzan en 0
 const año = fechaActual.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año

 // Formatea la fecha en DD/MM/YY
 const fechaFormateada = `${dia}/${mes}/${año}`;

 // Asigna la fecha formateada al campo de entrada
 document.getElementById('fecha_actual').value = fechaFormateada;

 // ACTUALIZAR DIAS PARA BUSCAR LIQUIDACIONES VIEJAS
 function actualizarDias() {
   const diaSelect = document.getElementById('dia');
   const mesSelect = document.getElementById('mes');
   const anioSelect = document.getElementById('anio');

   const selectedMonth = parseInt(mesSelect.value);
   const selectedYear = parseInt(anioSelect.value);

   // Calcula el último día del mes seleccionado
   const lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();

   // Borra las opciones actuales
   diaSelect.textContent = "";
   diaSelect.insertAdjacentHTML('beforeend','<option value=""></option>');

   // Llena el select de días
   for (let i = 1; i <= lastDay; i++) {
     const option = document.createElement('option');
     option.value = i;
     option.textContent = i;
     diaSelect.appendChild(option);
   }
 }

 // Escucha cambios en los selects de mes y año
 const mesSelect = document.getElementById('mes');
 const anioSelect = document.getElementById('anio');
 mesSelect.addEventListener('change', actualizarDias);
 anioSelect.addEventListener('change', actualizarDias);

 // Llama a la función inicialmente para establecer los días iniciales
 actualizarDias();



function liquidarPagos() {
 google.script.run.withSuccessHandler(function(numerosRecibos) {
   if (numerosRecibos.length > 0) {
     // Oculta los divs completos que contienen números de recibo correspondientes
     numerosRecibos.forEach(function(numeroRecibo) {
       var divs = document.querySelectorAll("div[id^='div']");
       divs.forEach(function(div) {
         var contenidoRecibo = div.querySelector("div[id^='_recibo']").textContent;
         if (parseInt(contenidoRecibo) === parseInt(numeroRecibo)) {
           div.style.display = "none"; // Oculta el div completo
         }
       });
     });
     document.getElementById("total_val").value = 0; 
     document.getElementById("total_count").value = 0; 
     alert("Liquidación generada correctamente.\n\nNúmeros de recibos liquidados: " + numerosRecibos.join(", "));
   } else {
     alert("No se encontraron elementos para liquidar.");
   }
 }).liqPagos();
}

document.getElementById('bt-imprimir_lista').addEventListener('click', function() {
 var tableData = obtenerDatosTabla();
 generarPDF(tableData);
});

function obtenerDatosTabla() {
 var tableData = [];
 var total = 0;
 var total_reg = 0;
 var divs = document.querySelectorAll("#sinPendientes > div");

 for (var i = 0; i < divs.length; i++) {
   var div = divs[i];
   if (div.style.display === "none") {
     continue; // Si el div está oculto, omitirlo y pasar al siguiente
   }

   var rowData = [];

   rowData.push(div.querySelector(".text-sm[id^='_recibo']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_cte']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_vto']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_cta']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_ctad']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_cnia']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_imp']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_pol']").value);
   rowData.push(div.querySelector(".text-sm[id^='_pat']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_marca']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='_fec_pas']").textContent);
   rowData.push(div.querySelector(".text-sm[id^='pas_id']").textContent);

   tableData.push(rowData);

   // Sumar el valor

var valor = rowData[6].replace('$', ''); // Eliminar el signo "$"
valor = valor.replace('.', ''); // Eliminar el signo "."
valor = parseInt(valor); // Usar parseInt para mantener los decimales
if (!isNaN(valor)) {
 total += valor;
 total_reg++;
}
console.log("valor: " + i + ": " + total)

 }

 // Mostrar el total
 var totalElement = document.getElementById("total_val");
 totalElement.value = total.toFixed(2);

 var totalRegElement  = document.getElementById("total_count");
 totalRegElement.value = total_reg;

 return tableData;
}

function generarPDF(tableData) {
 var ventanaImpresion = window.open('', '', 'width=800,height=600');

 ventanaImpresion.document.write('<html><head><title>Lista de pagos liquidados</title></head><body>');
 ventanaImpresion.document.write('<center><h1>LIQUIDACION GENERADA </h1></center><p>');
 ventanaImpresion.document.write('<style>' +
   'table { width: 100%; border-collapse: collapse; }' +
   'th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }' +
   'th.total-label { font-weight: bold; }' +
   'td.total-value { font-weight: bold; font-size: 16px; }' +
   '</style>');
 ventanaImpresion.document.write('<table>');
 ventanaImpresion.document.write('<thead><tr>' +
   '<th>RECIBO:</th>' +
   '<th>CLIENTE:</th>' +
   '<th>VTO:</th>' +
   '<th>CTA:</th>' +
   '<th>DE:</th>' +
   '<th>COMPAÑIA</th>' +
   '<th>IMPORTE:</th>' +
   '<th>POLIZA:</th>' +
   '<th>PATENTE:</th>' +
   '<th>MARCA:</th>' +
   '<th>PASADO:</th>' +
   '<th>LIQUIDADO:</th>' +
   '</tr></thead>');
 ventanaImpresion.document.write('<tbody>');

 var total = 0; // Calcula el total una sola vez


 for (var i = 0; i < tableData.length; i++) {
   ventanaImpresion.document.write('<tr>');

   for (var j = 0; j < tableData[i].length; j++) {
     ventanaImpresion.document.write('<td>' + tableData[i][j] + '</td>');
     if (j === 6) { // Columna de importe
       var importe = parseInt(tableData[i][j].replace('$', '').replace('.', ''));
       if (!isNaN(importe)) {
         total += importe;

console.log("valor: " + i + ": " + total)
       }
     }
   }

   ventanaImpresion.document.write('</tr>');
 }

 // Agregar fila con el total
 ventanaImpresion.document.write('<tr><td colspan="8"></td><td colspan="1" class="total-label">TOTAL:</td><td class="total-value" colspan="1">$' + total + '</td></tr>');

 ventanaImpresion.document.write('</tbody>');
 ventanaImpresion.document.write('</table>');
 ventanaImpresion.document.write('</body></html>');

 ventanaImpresion.document.close();
 ventanaImpresion.print();
}





//////////////////// OCULTAR MODAL PRESIONANDO FUERA DE LA PANTALLA /////////////////

document.addEventListener('DOMContentLoaded', function() {
 // Obtenemos el modal por su ID
 var modal = document.getElementById('modal3');
 var modal2 = document.getElementById('modal4');

 // Agregamos un evento para cerrar el modal cuando se hace clic fuera de él
 window.addEventListener('click', function(event) {
   if (event.target === modal) {
     modal.style.display = 'none';
   }
   if (event.target === modal2) {
     modal2.style.display = 'none';
   }
 });
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

           
/////////////////////// EVENT LISTENERS ////////////////////////////


document.getElementById('bt-liquidar-pagos').addEventListener('click', liquidarPagos);
document.getElementById('close_session').addEventListener('click', close_sessionok);
//////////////////////////////////////////////////////////////////