 
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
     //  form.classList.add('was-validated')
    }, false)
  }
  )
})()

 document.getElementById("btn-rpt").addEventListener("click", function (event) {

   google.script.run.withSuccessHandler(function () {
   }).report_data();
 });


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


///////// MODAL DE COTIZACIONES ///////////////////
   var modalContainer = document.getElementById("emi_modal_container");
   var btnShowModal = document.getElementById("emi_show_modal");
   var closeModal = document.getElementById("emi_close");

   // Abrir modal al hacer clic en el botón
   btnShowModal.onclick = function() {
 event.preventDefault();
     modalContainer.style.display = "block";
   }

var marcaInput = document.getElementById("marca");
var modeloInput = document.getElementById("modelo");
var sumaInput = document.getElementById("suma_aseg");
var modalModelo1 = document.getElementById("modalModelo1");
var modalMarca1 = document.getElementById("modalMarca1");
var modalSA1 = document.getElementById("modalSA1");
var imprimirModalButton = document.getElementById("imprimirModal");
var modalContent2 = document.getElementById("emi_modal_content2");

// Función para abrir el modal
btnShowModal.onclick = function() {
 event.preventDefault();
 
 // Obtener los valores de los inputs
 var marca = marcaInput.value;
 var modelo = modeloInput.value;
 var suma = sumaInput.value;

 // Actualizar el contenido del modal con los valores de los inputs
 modalMarca1.textContent = marca;
 modalModelo1.textContent = modelo;
 modalSA1.textContent = suma;

 modalContainer.style.display = "block";
}



// Función para imprimir el contenido del modal
imprimirModalButton.onclick = function() {
 // Abrir una nueva ventana emergente
 var printWindow = window.open('', '', 'width=1000,height=600');

 // Clonar el contenido del modal y agregarlo a la ventana emergente
 var modalContentClone = modalContent2.cloneNode(true);
 printWindow.document.body.appendChild(modalContentClone);

 // Imprimir la ventana emergente
 printWindow.print();

 // Cerrar la ventana emergente después de la impresión
 printWindow.close();
}
   
/////////////////////// SEGUROS EMITIDOS DIA ////////////////



   function segurosDia() {
     google.script.run.withSuccessHandler(tablaSegurosDia).segurosEmitidosDia();
     console.log("seguros del dia cargados!")
     };


function tablaSegurosDia(data) {
 const tbody = document.getElementById('bodyVehiculosDia');
 const totales = {}; // Objeto para almacenar los totales por usuario
 let totalGlobal = 0; // Inicializar como número

 data.forEach(row => {
   const tr = document.createElement('tr');
   row.forEach((cell, index) => {
     const td = document.createElement('td');
     if (index === 5) { // La columna "Usuario" es la sexta columna (índice 5)
       td.innerHTML = `<strong>${cell}</strong>`; // Aplicar negrita al valor de la celda

       // Actualizar el total para el usuario
       if (!totales[cell]) {
         totales[cell] = 0;
       }
       totales[cell] += 1; // Aumentar el total por cada registro
       totalGlobal += 1; // Aumentar el total global
     } else {
       td.textContent = cell;
     }
     tr.appendChild(td);
   });
   tbody.appendChild(tr);
 });

 // Mostrar los totales en el div
 const divTotales = document.getElementById('totalesdia');
 divTotales.innerHTML = ''; // Limpiar el contenido previo

 // Agregar el total global
 divTotales.innerHTML = `<h6 style="margin-bottom: 25px;"><strong>SEGUROS INGRESADOS HOY: ${totalGlobal}</strong></h6>`;

 // Mostrar los totales en forma de botones con badges
 for (const usuario in totales) {
   const button = document.createElement('div');
   button.className = 'col-md-4 mb-4 d-flex flex-column align-items-center';

   button.innerHTML = `
     <button type="button" class="btn btn-outline-primary position-relative d-flex align-items-center">
       <span class="badge bg-primary position-absolute top-0 start-100 translate-middle p-2">${totales[usuario]}</span>
       <div class="">
         <h5 class="mb-1">${usuario}</h5>
         <p class="mb-0 text-muted">Emisiones hoy</p>
       </div>
     </button>
   `;
   divTotales.appendChild(button);
 }
}

segurosDia();


// INGRESAR SEGURO NUEVO
function ingresarPoliza(event) {
   event.preventDefault();
   var modeloInput = document.getElementById("modelo");
   var modeloValue = parseInt(modeloInput.value, 10);


   /// DATOS DE CLIENTE A INGRESAR
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombreCompleto").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoNotascte =  document.getElementById("notascte").value;
   let infoCalifica = document.getElementById("califica_cliente").value;


   /// DATOS DE POLIZA A INGRESAR
   let infoFpago =  document.getElementById("fpago").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoRefa =  document.getElementById("refac").value;
   let infoRefaDesde =  document.getElementById("refa_desde").value;
   let infoRefaHasta =  document.getElementById("refa_hasta").value;
   let infoVigTot =  document.getElementById("vigtot").value;
   let infoNotifica = document.getElementById("notifica").value;

   /// DATOS DE VEHICULO A INGRESAR
   // let ramo =  document.getElementById("ramo_1").value;
   // let infoPatente =  ramo + ramo_pat
   let infoPatente =  document.getElementById("patente_sn").value;
   let infoMarca =  document.getElementById("marca").value;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoTipo =   document.getElementById("tipo").value;
   let infoAnio =   document.getElementById("modelo").value;
   let infoColor =   document.getElementById("color").value;
   let infoVTV =   document.getElementById("vtv").value;
   let infoSumaAseg =  document.getElementById("suma_aseg").value;
   let infoAcc1 =  document.getElementById("accesorio1").value;
   let infoAcc1valor =  document.getElementById("accesorio1_valor").value;
   let infoNotasVeh =  document.getElementById("notasveh").value;
   let infoHistorico =  document.getElementById("historico").value;    
   
   let fechaHoy = new Date();
   let dia = fechaHoy.getDate();
   let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
   let anio = fechaHoy.getFullYear().toString().slice(-2); // Obtener los últimos 2 dígitos del año

   // Agregar un cero inicial si el día o el mes es menor a 10
   dia = dia < 10 ? '0' + dia : dia;
   mes = mes < 10 ? '0' + mes : mes;

    let infoHoy = dia + '/' + mes + '/' + anio;

   // ESTO A FUTURO SE BORRA
     let sumaAseg = ""
   if (infoSumaAseg == "") {
   } else {
     sumaAseg = "SA: $" + infoSumaAseg + " | "
   }

   // VERIFICACION DE DATOS ANTES DE INICIAR
     if (isNaN(modeloValue) || modeloInput.value.length !== 4 || modeloValue < 1900 || modeloValue > 2100) {
         alert("El año de la unidad no es correcto.");
         return;
     }

     if (infoSumaAseg.trim() === "" && infoCnia.trim() === "AGROSALTA [B1]") {
         alert("Debe ingresar la Suma Asegurada del vehiculo para emitir el acuerdo.");
         return false;
     }

     if (infoPoliza.trim() === "" && infoCnia.startsWith("AGROSALTA")) {
       let confirmar = confirm("El número de póliza se encuentra vacío, la tarjeta de circulación saldrá como 'E/T'. ¿Está seguro que desea continuar?");
       if (!confirmar) {
         return false;
       }
     }

   const boton = document.getElementById('bt-ingreso');
   const spinner = document.getElementById('spinner5');
   spinner.style.display = 'inline-block';
   boton.disabled = true;



   // Mostrar datos en el modal
   if (infoDNI) document.getElementById("modalDNI").value = infoDNI;
   if (infoCliente) document.getElementById("modalCliente").value = infoCliente;
   if (infoDomicilio) document.getElementById("modalDomicilio").value = infoDomicilio;
   if (infoLocalidad) document.getElementById("modalLocalidad").value = infoLocalidad;
   if (infoWpp) document.getElementById("modalWpp").value = infoWpp;
   if (infoMail) document.getElementById("modalMail").value = infoMail;
   // if (infoNotascte) document.getElementById("modalNotascte").value = infoNotascte;
   if (infoFpago) document.getElementById("modalFpago").value = infoFpago;
   if (infoSucursal) document.getElementById("modalSucursal").value = infoSucursal;
   if (infoCnia) document.getElementById("modalCnia").value = infoCnia;
   if (infoCobertura) document.getElementById("modalCobertura").value = infoCobertura;
   if (infoImporte) document.getElementById("modalImporte").value = infoImporte;
   if (infoPoliza) document.getElementById("modalPoliza").value = infoPoliza;
   if (infoOperacion) document.getElementById("modalOperacion").value = infoOperacion;
   if (infoVigencia) document.getElementById("modalVigencia").value = infoVigencia;
   if (infoHasta) document.getElementById("modalHasta").value = infoHasta;
   if (infoRefa) document.getElementById("modalRefa").value = infoRefa;
   if (infoRefaDesde) document.getElementById("modalRefaDesde").value = infoRefaDesde;
   if (infoRefaHasta) document.getElementById("modalRefaHasta").value = infoRefaHasta;
   if (infoVigTot) document.getElementById("modalVigTot").value = infoVigTot;
   if (infoNotifica) document.getElementById("modalNotifica").value = infoNotifica;
   if (infoPatente) document.getElementById("modalPatente").value = infoPatente;
   if (infoMarca) document.getElementById("modalMarca").value = infoMarca;
   if (infoMotor) document.getElementById("modalMotor").value = infoMotor;
   if (infoChasis) document.getElementById("modalChasis").value = infoChasis;
   if (infoDanios) document.getElementById("modalDanios").value = infoDanios;
   if (infoTipo) document.getElementById("modalTipo").value = infoTipo;
   if (infoAnio) document.getElementById("modalAnio").value = infoAnio;
   if (infoColor) document.getElementById("modalColor").value = infoColor;
   if (infoVTV) document.getElementById("modalVTV").value = infoVTV;
   if (infoSumaAseg) document.getElementById("modalSumaAseg").value = infoSumaAseg;
   if (infoAcc1) document.getElementById("modalAcc1").value = infoAcc1;
   if (infoAcc1valor) document.getElementById("modalAcc1valor").value = infoAcc1valor;


   document.getElementById("mensajeRequerimiento").style.display = "none";
   document.getElementById("mensajeModelo").style.display = "none";
   document.getElementById("mensajeMoto").style.display = "none";
 
   let infoUsuario =  sessionStorage.getItem("magi-usuario");
   let infoHistoricoFull = "//" + infoUsuario + " [" + infoVigencia + "] " + infoOperacion + " (" + infoNotasVeh + ") " + sumaAseg + infoHistorico;


 google.script.run.seguroNuevo(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoRefa, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoHistoricoFull, infoNotasVeh, infoMotor, infoChasis, infoUsuario, infoHoy, infoNotifica, infoCalifica, infoAnio, infoColor, infoVTV, infoSumaAseg, infoTipo, infoAcc1, infoAcc1valor, infoRefaDesde, infoRefaHasta ,infoVigTot);
 event.target.reset();

const successAlert = document.getElementById('success-alert');

segurosDia()


function fadeInAndOutElement(element) {
 fadeInElement(element, function() {
   setTimeout(function() {
     fadeOutElement(element);
   }, 6000); // Cambia la duración del "fade in" a tu preferencia
 });
}

// Función para aplicar el "fade in"
function fadeInElement(element, callback) {
 element.style.opacity = '0'; // Establecer la opacidad inicial a 0
 element.style.display = 'block'; // Asegurarse de que el elemento esté visible

 let opacity = 0;
 const fadeInInterval = setInterval(function () {
   if (opacity < 1) {
     opacity += 0.02; // Aumentar gradualmente la opacidad
     element.style.opacity = opacity;
   } else {
     clearInterval(fadeInInterval); // Detener el intervalo una vez que la opacidad llegue a 1
     if (typeof callback === 'function') {
       callback(); // Llamar al callback después del "fade in"
     }
   }
 }, 50); // Intervalo de actualización de la opacidad (en milisegundos)
}

// Función para aplicar el "fade out"
function fadeOutElement(element) {
 let opacity = 1;
 const fadeOutInterval = setInterval(function () {
   if (opacity > 0) {
     opacity -= 0.05; // Reducir gradualmente la opacidad
     element.style.opacity = opacity;
   } else {
     clearInterval(fadeOutInterval); // Detener el intervalo
     element.style.display = 'none'; // Ocultar el elemento cuando la opacidad sea 0
   }
 }, 50); // Intervalo de actualización de la opacidad (en milisegundos)
}

   let labelPagoAgro = document.getElementById("labelPagoAgro");

   labelPagoAgro.textContent = "Ingresar pago de Agrosalta:";

   document.getElementById('pagoAgro_container').style.display = 'none';
   document.getElementById('acuerdoAgroB1_container').style.display = 'none';
   document.getElementById("emi2_modal_container").style.display = "block";
   document.getElementById('pagRecA').style.display = 'block';
   document.getElementById('genPag').style.display = 'none'; 
   
   if(infoCnia === "AGROSALTA [RC]" || infoCnia === "AGROSALTA [MOTO]" || infoCnia === "AGROSALTA [RC-GRUA]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   } else if(infoCnia === "AGROSALTA [B1]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   document.getElementById('acuerdoAgroB1_container').style.display = 'flex';
   }   


// Llamar a la función para mostrar el elemento con "fade in" y luego desaparecer con "fade out"
fadeInAndOutElement(successAlert);

infoDNI =  "";
infoCliente =  "";
infoDomicilio =  "";
infoLocalidad =  "";
infoWpp =  "";
infoMail =  "";
infoFpago =  "";
infoSucursal =  "";
infoNotascte =  "";
infoRefa = "";
infoPatente =  "";
ramo =  "";
infoMarca =  "";
infoCnia =  "";
infoCobertura =  "";
infoImporte =  "";
infoPoliza =  "";
infoHoy =  "";
infoOperacion =  "SEGURO NUEVO";
var today = new Date();
infoVigencia.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoHasta = "";
infoRefaDesde.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoRefaHasta = "";
infoVigTot = "";
infoDanios =  "";
infoNotasVeh =  "";
infoHistorico =  "";
infoUsuario =  "";
infoHistoricoFull = "";
infoMotor =  "";
infoAcc1 = "";
infoAcc1valor =  "";
infoChasis =  "";
infoAnio = "";
infoColor = "";
infoVTV = "";
document.getElementById("dniValor").textContent = "";
document.getElementById("vehiculo_vista").textContent = "";
document.getElementById("vehiculo_carga").textContent = "";
document.getElementById("registro_vista").textContent = "";
document.getElementById("registro_carga").textContent = "";
document.getElementById("nombreCompletoValor").textContent = "";
document.getElementById("whatsappValor").textContent = "";
document.getElementById("statCte").textContent = "";
document.getElementById("patenteValor").textContent =  "";
document.getElementById("marcaValor").textContent =  "";
document.getElementById("cniaValor").textContent =  "";
document.getElementById("statVeh").textContent =  "";
document.getElementById("sinPendientes").textContent =  "";
document.getElementById("sinPendientes2").textContent =  "";
document.getElementById('valoresContainer').style.display = 'none';
document.getElementById('valoresContainer_veh').style.display = 'none';
document.getElementById('formContainer').style.display = 'none';
document.getElementById('formContainer_veh').style.display = 'none';
document.getElementById("mantenimientosTableBody2").textContent = "";

document.getElementById('mensajeAD').style.display = 'none';
document.getElementById('mensajeAuto').style.display = 'none';
document.getElementById('mensajeBici').style.display = 'none';
document.getElementById('mensajeCasa').style.display = 'none';
document.getElementById('mensajeComercio').style.display = 'none';
document.getElementById('mensajeAP').style.display = 'none';
document.getElementById('mensajeCaucion').style.display = 'none';
document.getElementById('mensajeRC').style.display = 'none';
document.getElementById('mensajeTransporte').style.display = 'none';
document.getElementById('mensajeTecnico').style.display = 'none';

infoNotifica = false;
infoCalifica = 4;
spinner.style.display = 'none';
boton.disabled = false;



   // Mostrar el modal
   $('#polizaResumenModal').modal('show');


(function() {
 'use strict';

 var forms = document.querySelectorAll('.needs-validation');

 Array.prototype.slice.call(forms).forEach(function(form) {
   form.removeEventListener('submit', null, false); // Eliminar el evento submit

   form.classList.remove('was-validated'); // Eliminar la clase "was-validated"
 });
})();

if (window.matchMedia("(min-width: 1081px)").matches) {
 document.getElementById("take_pict_menu").style.display = "none";
 document.getElementById("take_photos").style.display = "none";
} else {
 document.getElementById("take_pict_menu").style.display = "block";
 document.getElementById("take_photos").style.display = "none";
}
}


///// NUEVO SCRIPT PARA BUSCAR DATOS POR DNI EN BD EMISION//////////

function buscarRegistros_dni_emision() {
 const boton = document.getElementById('buscarRegistrosBtn4');
 const spinner = document.getElementById('spinner4');
 spinner.style.display = 'inline-block';
 boton.disabled = true;
 const dni = document.getElementById("text-box-numeroInventario_dni").value;
 const infoDNI = document.getElementById("dni");
 const infoCliente = document.getElementById("nombreCompleto");
 const infoDomicilio = document.getElementById("domicilio");
 const infoLocalidad = document.getElementById("localidad");
 const infoWpp = document.getElementById("wpp");
 const infoMail = document.getElementById("mail");
 const infoNotascte = document.getElementById("notascte");
 const infoSucursal = document.getElementById("sucursal");
 const infoCalifica = document.getElementById("califica_cliente");
 document.getElementById("dniValor").textContent = "";
 document.getElementById("nombreCompletoValor").textContent = "";
 document.getElementById("whatsappValor").textContent = "";
 document.getElementById("statCte").textContent = "";
 document.getElementById("sinPendientes").textContent = "";
 document.getElementById('valoresContainer').style.display = 'none';
 document.getElementById('formContainer').style.display = 'none';
 document.getElementById("mensajeRequerimiento").style.display = "none";
 document.getElementById("mensajeModelo").style.display = "none";
 document.getElementById("mensajeMoto").style.display = "none";

 const mostrarValores = (info) => {
   if (info[0].length > 0) {
   infoDNI.value = info[0][0][0] !== undefined ? info[0][0][0] : "";
   infoCliente.value = info[0][0][1] !== undefined ? info[0][0][1] : "";
   infoDomicilio.value = info[0][0][2] !== undefined ? info[0][0][2] : "";
   infoLocalidad.value = info[0][0][3] !== undefined ? info[0][0][3] : "";
   infoWpp.value = info[0][0][4] !== undefined ? info[0][0][4] : "";
   infoMail.value = info[0][0][6] !== undefined ? info[0][0][6] : "";
   infoNotascte.value = info[0][0][7] !== undefined ? info[0][0][7] : "";
   infoSucursal.value = "MARCOS PAZ";
   infoCalifica.value = info[0][0][9] !== undefined ? info[0][0][9] : "";
   console.log(info[0][0][9])

     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('dniValor').textContent = infoDNI.value;
     document.getElementById('nombreCompletoValor').textContent = infoCliente.value;

   document.getElementById("logoValor").textContent = "";
   document.getElementById('logoValor').insertAdjacentHTML('beforeend',"<img src='https://drive.google.com/uc?id=1JyM7APlNWzFD38ndFwd20EDcGHQVLybh' style='width: 100%;height: auto;'>");

var valorSeleccionado = infoCalifica.value;


var emoji;
if (valorSeleccionado == "5") {
 emoji = "😊 Amable";
} else if (valorSeleccionado == "4") {
 emoji = "😩 Dramatico";
} else if (valorSeleccionado == "3") {
 emoji = "🤪 Loco";
} else if (valorSeleccionado == "2") {
 emoji = "🤬 Conflictivo";
} else if (valorSeleccionado == "1") {
 emoji = "🚫 No Asegurar";
} else if (valorSeleccionado == "0") {
 emoji = "😐 Sin Calificar";
} else {
 emoji = "";
}


document.getElementById("statCte").textContent = emoji;

     document.getElementById('whatsappValor').textContent = infoWpp.value;

     const tableBody2 = document.getElementById("mantenimientosTableBody2");
     tableBody2.textContent = ""; // Limpia la tabla antes de agregar nuevos datos

     let rowCount = 0;
     let processed = new Set();
   if (info[1] && info[1].length > 0) { // Verifica si info[1] está definido y tiene elementos
     info[1].forEach(mantenimiento2 => {
       if (rowCount < 10) {
         if (!processed.has(mantenimiento2[1])) {
           const template2 = document.getElementById("mantenimientosRow2");
           const templateRow2 = template2.content;
           let tr = templateRow2.cloneNode(true);
           let PolPatente = tr.querySelector(".PolPatente");
           let PolVehiculo = tr.querySelector(".PolVehiculo");
           let PolCnia = tr.querySelector(".PolCnia");
           let PolVtos = tr.querySelector(".PolVtos");
           let PolVig = tr.querySelector(".PolVig");

           PolPatente.textContent = mantenimiento2[0];
           PolVehiculo.textContent = mantenimiento2[1];
           PolCnia.textContent = mantenimiento2[2];
           PolVtos.textContent = mantenimiento2[3];
           // PolVig.textContent = mantenimiento2[4];

           // Crear el botón de eliminar
           let botonEliminar = document.createElement('button');
           botonEliminar.innerHTML = "🗑️";
           botonEliminar.className = "btn p-0 m-0"; // Botón pequeño sin padding ni margen

           let valor_elim = mantenimiento2[0]; // Guardar la patente a eliminar

           // Asignar acción al botón de eliminar
           botonEliminar.addEventListener('click', function(event) {
               event.preventDefault(); // Prevenir el comportamiento por defecto del botón

               // Llamada al servidor con google.script.run
               google.script.run
                   .withSuccessHandler(function(response) {
                       console.log("Eliminación exitosa:", response);
                       // Obtener la fila <tr> más cercana al botón usando event.target
                       let tr = event.target.closest('tr');
                       
                       // Verificar si se encontró el <tr>
                       if (tr) {
                           tr.parentNode.removeChild(tr); // Eliminar la fila visualmente de la tabla
                       } else {
                           console.error("Error: No se encontró la fila <tr> asociada al botón.");
                       }
                   })
                   .withFailureHandler(function(error) {
                       console.error("Error al eliminar:", error);
                   })
                   .baja_pol(valor_elim); // Pasar la patente al servidor

               // Imprimir en consola y eliminar la fila de la tabla
               console.log("Patente a eliminar:", valor_elim);
           });

           // Crear el ícono 🔃 como un botón
           let botonRecargar = document.createElement('button');
           botonRecargar.innerHTML = "🔃";
           botonRecargar.className = "btn p-0 m-0"; // Botón pequeño y de color amarillo

           let valor_renov = mantenimiento2[0]; // Guardar la patente a eliminar

           // Asignar acción al botón de eliminar
           botonRecargar.addEventListener('click', function(event) {
               event.preventDefault(); 

               google.script.run
                   .withSuccessHandler(function(response) {
                       console.log("Renovacion exitosa:", response);
                       event.target.closest('tr').querySelector('.PolVig')
                       PolVig.textContent = "✅ Vigente";
                   })
                   .withFailureHandler(function(error) {
                       console.error("Error al renovar:", error);
                   })
                   .renov_pol(valor_renov); // Pasar la patente al servidor

               // Imprimir en consola y eliminar la fila de la tabla
               console.log("Patente a renovar:", valor_renov);
           });


           // Aplicar color y grosor de texto según el valor de PolVig
           if (mantenimiento2[4] === "VIGENTE") {
               PolVig.textContent = "✅ ";
               PolVig.appendChild(botonRecargar); // Agregar el ícono de recarga
               PolVig.appendChild(botonEliminar); // Agregar el botón de eliminar
           } else if (mantenimiento2[4] === "NO VIGENTE") {
               PolVig.textContent = "⚫ ";
               PolVig.appendChild(botonRecargar); // Agregar el ícono de recarga
               PolVig.appendChild(botonEliminar); // Agregar el botón de eliminar
           }

           tableBody2.appendChild(tr);
           rowCount++;
           processed.add(mantenimiento2[1]); // Agregar valor al conjunto de valores procesados
         }
       }
     });
   } else {
     // Maneja el caso en que info[1] no tiene elementos
     alert("No se encontraron valores de mantenimiento.");
   }
 } else {
     alert("No se encontraron valores");
     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('mail').textContent = "";
     document.getElementById('statCte').textContent = "NUEVO CLIENTE";
     document.getElementById("notascte").textContent = "";
     document.getElementById("nombreCompletoValor").value = "";
     document.getElementById("whatsappValor").value = "";
     document.getElementById("dniValor").textContent = "";
     infoCliente.textContent = "";
     infoDomicilio.value = "";
     infoLocalidad.value = "";
     infoWpp.value = "";
     infoMail.value = "";
     infoSucursal.value = "";
     infoNotascte.value = "";
     infoCalifica.value = 0;
   }
   spinner.style.display = 'none';
   boton.disabled = false;
 };


 google.script.run.withSuccessHandler((info) => {
   if (info[0].length > 0) {
     mostrarValores(info);
   } else {
     // Si no encuentra valores en buscarMantenimientos4, llama a buscarMantenimientos11
     google.script.run.withSuccessHandler((info) => {
       if (info.length > 0) {
         console.log("mante11: " + info)
         const modifiedInfo = [[info[0], info[1], info[2]]]; // Modificar la estructura de resultado de buscarMantenimientos11
         document.getElementById('statCte').textContent = "FALTAN DATOS!";
         document.getElementById('mail').textContent = "";
         document.getElementById("notascte").textContent = "";
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
       } else {

         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('statCte').textContent = "NUEVO CLIENTE";
         document.getElementById("nombreCompletoValor").value = "";
         document.getElementById("whatsappValor").value = "";
         infoDNI.value = dni;
         infoCliente.value = "";
         infoDomicilio.value = "";
         infoLocalidad.value = "";
         infoWpp.value = "";
         infoMail.value = "";
         infoSucursal.value = "";
         infoNotascte.value = "";
         infoCalifica.value = 0;

// Llamadas a los scripts de forma paralela
Promise.all([
 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG1: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_1(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG2: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_2(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG3: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_3(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG4: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_4(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG5: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_5(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG6: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_6(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG7: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_7(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG8: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_8(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG9: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_9(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG10: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_10(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG11: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_11(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG12: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_12(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG13: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_13(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG14: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_14(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG15: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_15(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG16: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_16(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG17: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_17(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG18: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_18(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG19: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_19(dni),
 
 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG20: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_20(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG21: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_21(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG22: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_22(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG23: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_23(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG24: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_24(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG25: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_25(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG26: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_26(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG27: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_27(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG28: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_28(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG29: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_29(dni),
   
 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG30: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_30(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG31: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_31(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG32: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_32(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG33: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_33(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG34: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_34(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG35: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_35(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG36: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_36(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG37: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_37(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG38: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_38(dni),
 

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG39: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_39(dni),


 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG40: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_40(dni),



 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     console.log("BD DNI ARG41: " + info);
         infoDNI.value = info[0] !== undefined ? info[0] : "";
         infoCliente.value = info[1] !== undefined ? info[1] : "";
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('dniValor').textContent = infoDNI.value;
         document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
         mostrarValores(modifiedInfo);
         calcularUltimoNumeroCuit()
   }
 }).buscarDNI_BD_ARG_41(dni)




]).then(() => {
 // Código a ejecutar después de que todas las llamadas se completen
 spinner.style.display = 'none';
 boton.disabled = false;
}).catch((error) => {
 console.error('Error encontrando el cliente:', error);
 spinner.style.display = 'none';
 boton.disabled = false;
});

       }
       spinner.style.display = 'none';
       boton.disabled = false;
     }).buscar_DNI_MP(dni);
   }
 }).buscarDNI_cliente(dni);

 if (dni) {
   google.script.run.withSuccessHandler(mostrarFotos_reg).obtenerFotosPorDNI(dni);
 } else {
   alert("Por favor, ingrese un DNI.");
 }
}

///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////



 ///// SCRIPT PARA BUSCAR DATOS POR NOMBRE EN BD EMISION//////////


function buscarRegistros_nombre_emision() {
 const boton = document.getElementById('buscarRegistrosBtn3');
 const spinner = document.getElementById('spinner3');
 spinner.style.display = 'inline-block';
 boton.disabled = true;
 const numeroInventario = document.getElementById("text-box-numeroInventario_nombre").value;
  const infoDNI = document.getElementById("dni");
 const infoCliente = document.getElementById("nombreCompleto");
 const infoDomicilio = document.getElementById("domicilio");
 const infoLocalidad = document.getElementById("localidad");
 const infoWpp = document.getElementById("wpp");
 const infoMail = document.getElementById("mail");
 const infoNotascte = document.getElementById("notascte");
 const infoSucursal = document.getElementById("sucursal");
 const infoCalifica = document.getElementById("califica_cliente");
 document.getElementById("dniValor").textContent = "";
 document.getElementById("nombreCompletoValor").textContent = "";
 document.getElementById("whatsappValor").textContent = "";
 document.getElementById("statCte").textContent = "";
 document.getElementById("sinPendientes").textContent = "";
 document.getElementById('valoresContainer').style.display = 'none';
 document.getElementById('formContainer').style.display = 'none';
 document.getElementById("mensajeRequerimiento").style.display = "none";
 document.getElementById("mensajeModelo").style.display = "none";
 document.getElementById("mensajeMoto").style.display = "none";

 document.getElementById('mensajeAD').style.display = 'none';
 document.getElementById('mensajeAuto').style.display = 'none';
 document.getElementById('mensajeBici').style.display = 'none';
 document.getElementById('mensajeCasa').style.display = 'none';
 document.getElementById('mensajeComercio').style.display = 'none';
 document.getElementById('mensajeAP').style.display = 'none';
 document.getElementById('mensajeCaucion').style.display = 'none';
 document.getElementById('mensajeRC').style.display = 'none';
 document.getElementById('mensajeTransporte').style.display = 'none';
 document.getElementById('mensajeTecnico').style.display = 'none';

 const mostrarValores = (info) => {
   console.log(info)
   if (info.length > 0) {
     infoDNI.value = info[0][0];
     infoCliente.value = info[0][1];
     infoDomicilio.value = info[0][2];
     infoLocalidad.value = info[0][3];
     infoWpp.value = info[0][4];
     infoMail.value = info[0][6];
     infoNotascte.value = info[0][7];
     infoSucursal.value = "MARCOS PAZ";
     infoCalifica.value = info[0][9];
   console.log("califica: " + infoCalifica)

     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('dniValor').textContent = infoDNI.value;
     document.getElementById('nombreCompletoValor').textContent = infoCliente.value;

   document.getElementById("logoValor").textContent = "";
   document.getElementById('logoValor').insertAdjacentHTML('beforeend',"<img src='https://drive.google.com/uc?id=1JyM7APlNWzFD38ndFwd20EDcGHQVLybh' style='width: 100%;height: auto;'>");

var valorSeleccionado = infoCalifica.value;

var emoji;
if (valorSeleccionado == "5") {
 emoji = "😊 Amable";
} else if (valorSeleccionado == "4") {
 emoji = "😩 Dramatico";
} else if (valorSeleccionado == "3") {
 emoji = "🤪 Loco";
} else if (valorSeleccionado == "2") {
 emoji = "🤬 Conflictivo";
} else if (valorSeleccionado == "1") {
 emoji = "🚫 No Asegurar";
} else if (valorSeleccionado == "0") {
 emoji = "😐 Sin Calificar";
} else {
 emoji = "";
}

   console.log("emoji: " + emoji)

document.getElementById("statCte").textContent = emoji;

     document.getElementById('whatsappValor').textContent = infoWpp.value;
   } else {
     alert("No se encontraron valores");
     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('mail').textContent = "";
     document.getElementById('statCte').textContent = "NUEVO CLIENTE";
     document.getElementById("notascte").textContent = "";
document.getElementById("nombreCompletoValor").value =  "";
document.getElementById("whatsappValor").value =  "";
     infoCliente =  "";
     infoDomicilio.value =  "";
     infoLocalidad.value =  "";
     infoWpp.value =  "";
     infoMail.value =  "";
     infoSucursal.value =  "";
     infoNotascte.value =  "";
     infoCalifica.value = 4;
   }
   spinner.style.display = 'none';
   boton.disabled = false;
 };

 google.script.run.withSuccessHandler((info) => {
   if (info.length > 0) {
     mostrarValores(info);
   } else {
     google.script.run.withSuccessHandler((info) => {
       if (info.length > 0) {
         const modifiedInfo = [[info[0][0], info[0][1], info[0][2]]]; // Modificar la estructura de resultado de buscarMantenimientos11
         document.getElementById('statCte').textContent = "FALTAN DATOS!";
         mostrarValores(modifiedInfo);
         infoMail.value =  "";
         infoNotascte.value =  "";
         document.getElementById("notascte").textContent = "";
         infoCalifica.value = 0;
         calcularUltimoNumeroCuit()
       } else {
         alert("No se encontraron valores");
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('statCte').textContent = "NUEVO CLIENTE";
         document.getElementById("nombreCompletoValor").value =  "";
         document.getElementById("whatsappValor").value =  "";
         infoDNI.value = numeroInventario2;
         infoCliente.value =  "";
         infoDomicilio.value =  "";
         infoLocalidad.value =  "";
         infoWpp.value =  "";
         infoMail.value =  "";
         infoSucursal.value =  "";
         infoNotascte.value =  "";
         infoCalifica.value = 0;
       }
       spinner.style.display = 'none';
       boton.disabled = false;
     }).buscarNom_BD_MP(numeroInventario);
   }
 }).buscarNom_BD_EMI(numeroInventario);
}


///// FIN DEL SCRIPT PARA BUSCAR DATOS POR NOMBRE //////////

function enviarMensajeWPP() {
 event.preventDefault();
 // Obtener el número de teléfono ingresado
 var telefono = document.getElementById("wpp").value;

 // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
 window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}


/////////////////////// SISTEMA DE EMISION  ///////////////////////////////


 ///// SCRIPT PARA BUSCAR DATOS POR PATENTE EN BD EMISION //////////
 function buscarRegistros_emision() {
   const boton = document.getElementById('buscarRegistrosBtn2');
   const spinner = document.getElementById('spinner2');
   spinner.style.display = 'inline-block';
   boton.disabled = true;

   /// DATOS DE POLIZA A INGRESAR
   let infoCnia =  document.getElementById("cnia");
   infoCnia.value = "";
   let infoCobertura =  document.getElementById("cobertura");
   infoCobertura.value = "";
   let infoImporte =  document.getElementById("importe");
   infoImporte.value = "";
   let infoPoliza =  document.getElementById("poliza");
   infoPoliza.value = "";
   let infoOperacion =  document.getElementById("operacion");
   infoOperacion.value = "SEGURO NUEVO";
   let infoVigencia =  document.getElementById("vigencia");
   infoVigencia.value = "";
   let infoHasta =  document.getElementById("hasta");
   infoHasta.value = "";
   let infoVigTot =  document.getElementById("vigtot");
   infoVigTot.value = "";
   let infoRefaDesde =  document.getElementById("refa_desde");
   infoRefaDesde.value = "";
   let infoRefaHasta =  document.getElementById("refa_hasta");
   infoRefaHasta.value = "";
   let infoRefa =  document.getElementById("refac");
   infoRefa.value = "";

   /// DATOS DE VEHICULO A INGRESAR
   let ramo = document.getElementById("ramo_1").value;
   let pat_ramo = document.getElementById("patente").value;
   let patente = ramo + pat_ramo
   let infoPatente =  document.getElementById("patente_sn");
   infoPatente.value = "";
   let infoMarca =  document.getElementById("marca");
   infoMarca.value = "";
   let infoMotor =  document.getElementById("motor");
   infoMotor.value = "";
   let infoChasis =  document.getElementById("chasis");
   infoChasis.value = "";
   let infoDanios =  document.getElementById("danios");
   infoDanios.value = "";
   let infoTipo =   document.getElementById("tipo");
   infoTipo.value = "";
   let infoAnio =   document.getElementById("modelo");
   infoAnio.value = "";
   let infoColor =   document.getElementById("color");
   infoColor.value = "";
   let infoVTV =   document.getElementById("vtv");
   infoVTV.value = "";
   let infoSumaAseg =  document.getElementById("suma_aseg");
   infoSumaAseg.value = "";
   let infoAcc1 =  document.getElementById("accesorio1");
   infoAcc1.value = "";
   let infoAcc1valor =  document.getElementById("accesorio1_valor");
   infoAcc1valor.value = "";
   let infoNotasVeh =  document.getElementById("notasveh");
   infoNotasVeh.value = "";
   let infoHistorico =  document.getElementById("historico");
   infoHistorico.value = "";

   let agrocnia = document.getElementById("cnia").value
   document.getElementById("patenteValor").textContent =  "";
   document.getElementById("marcaValor").textContent =  "";
   document.getElementById("cniaValor").textContent =  "";
   document.getElementById("statVeh").textContent =  "";
   document.getElementById("sinPendientes2").textContent =  "";
   document.getElementById('valoresContainer_veh').style.display = 'none';
   document.getElementById('formContainer_veh').style.display = 'none';
   document.getElementById("mensajeRequerimiento").style.display = "none";
   document.getElementById("mensajeModelo").style.display = "none";
   document.getElementById("mensajeMoto").style.display = "none";

   google.script.run.withSuccessHandler(info => {

     if (info.length > 0) {
       buscarModelo()
       infoPatente.value = info[0][0];
       infoMarca.value = info[0][1];
       infoMotor.value = info[0][4];
       infoChasis.value = info[0][5];
       infoColor.value = info[0][6];
       // infoSumaAseg.value = info[0][7];
       let valorCompleto = info[0][8].split(','); 
       infoAcc1.value = valorCompleto[0];
       infoAcc1valor.value = valorCompleto[1];
         // console.log("accesorios: " + valorCompleto[0] + "y el " + valorCompleto[1])
       infoVTV.value = info[0][9];
       infoNotasVeh.value = info[0][10];
       infoDanios.value = info[0][11];
       infoHistorico.value = info[0][12];
       infoOperacion.value = "SEGURO NUEVO";
       infoPoliza.value = "";
       if (info[0][2]) {
           infoAnio.value = info[0][2];
       }
       if (info[0][3]) {
           infoTipo.value = info[0][3];
       }
       // infoCnia.value = info[0][6];
       // infoImporte.value = info[0][5];

       var r_fechaHoy = formatearFecha();
       infoVigencia.value = r_fechaHoy;
       infoRefaDesde.value = r_fechaHoy;
       infoCobertura.value = info[0][13];
       // document.getElementById('valoresContainer_veh').style.display = 'block';
       document.getElementById('patenteValor').textContent = document.getElementById('patente').value;
       document.getElementById('marcaValor').textContent = document.getElementById('marca').value;
       document.getElementById('cniaValor').textContent = document.getElementById('cnia').value;
       document.getElementById('statVeh').textContent = document.getElementById('cobertura').value;

       buscarRefa()
     } else {
       alert("No se encontraron valores");
       document.getElementById('valoresContainer_veh').style.display = 'block';
       document.getElementById('statVeh').textContent = "NUEVO VEHICULO";
       document.getElementById('patenteValor').textContent = document.getElementById('patente').value;
       infoPatente.value = patente
       var r_fechaHoy = formatearFecha();
       infoVigencia.value = r_fechaHoy;
       infoRefaDesde.value = r_fechaHoy;
       var r_nuevaFecha = sumarMeses(r_fechaHoy, 12);
       infoHasta.value = r_nuevaFecha
       buscarModelo()
       infoMarca.value =  "";
       // infoMotor.value =  "";
       // infoChasis.value =  "";
       infoCnia.value =  "";
       infoCobertura.value =  "";
       infoImporte.value =  "";
       infoPoliza.value =  "";
       infoDanios.value =  "";
       infoNotasVeh.value =  "";
       infoHistorico.value =  "";
       document.getElementById("notasveh").value =  "";
     }
     spinner.style.display = 'none';
     boton.disabled = false;
     agroGruas(agrocnia)
   }).buscarVehPat(patente);
 if (patente) {
   google.script.run.withSuccessHandler(mostrarFotos_veh).obtenerFotosPorPatente(patente);
 } else {
   alert("Por favor, ingrese una patente.");
 }

   google.script.run.withSuccessHandler(info => {

     if (info.length > 0) {
       console.log("infoVeh:" + info)
       infoCnia.value = info[0][6];
       infoCobertura.value = info[0][11];
       // infoImporte.value = info[0][5];
       // infoPoliza.value = info[0][7];
       infoOperacion.value = info[0][10];
       infoRefa.value = info[0][4];
       infoVigTot.value = info[0][20];

       var r_fechaHoy = formatearFecha();
       infoVigencia.value = r_fechaHoy;
       infoRefaDesde.value = r_fechaHoy;
       
       document.getElementById('valoresContainer_veh').style.display = 'block';
       document.getElementById('patenteValor').textContent = document.getElementById('patente').value;
       document.getElementById('marcaValor').textContent = document.getElementById('marca').value;
       document.getElementById('cniaValor').textContent = document.getElementById('cnia').value;
       document.getElementById('statVeh').textContent = document.getElementById('cobertura').value;
       buscarRefa()
     } else {
     }
   }).buscarVehPol(patente);


 }

 ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR PATENTE EN BD EMISION //////////



///////// FILTRO VEHICULOS ///////////////
function filtrar(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-buscar');
   const spinner = document.getElementById('spinner12');
   spinner.style.display = 'inline-block';
   boton.disabled = true;

 let infoDNI =  document.getElementById("dni");
  var dni_filter = infoDNI.value;
  console.log(dni_filter)
 google.script.run.withSuccessHandler(function(result) {
 // Actualizar HTML de la página con los nuevos resultados
 var sinPendientesDiv = document.getElementById("sinPendientes");

var pendientesHtml = "";
 for (var i = 0; i < result.length; i++) {

pendientesHtml += "<div class='bg-light border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;margin-bottom: 5px;background-color: #FFFFFF' id='div" + i + "'><div class='row' style='padding-left: 5px; '><div class='row mb-1'><div class='col-3 text-muted fw-bold' style='padding-left: 15px;' id='patente_sn_" + i + "'>" + result[i][0] + "</div><div class='col-9 text-muted fw-bold text-truncate' id='marca_" + i + "'>" + result[i][1] +  "</div></div><div class='row mb-1'><div class='col-4 fw-bold'><div class='row' style='text-align: center; border-radius:10px; color:white; background-color: #686868; box-shadow: 0px 0px 2px 0px #000000;'><div class='col-12 fw-bold' style='margin-top: 0px; color: #FFFFFF;'id='cnia_" + i + "'>" + result[i][2] + "</div></div></div><div class='col-8 fw-bold' style='padding-left: 2px;'><div class='row bg-light border ml-1' style='padding-left: 5px; text-align: left;  margin-left: 2px; border-radius:5px;color: #9B9B9B; border: 1px solid black;' id='cobertura_" + i + "'>" + result[i][3] + "</div></div></div><div class='row bg-light border ml-1' style='font-size: 0.7rem; padding-left: 5px; text-align: left;  margin-left: 2px;  margin-right: 2px; ' id='operacion_" + i + "'>" + result[i][6] + "</div>" +
   "<div style='display: none' id='importe_" + i + "'>" + result[i][4] + "</div>"+
   "<div style='display: none' id='poliza_" + i + "'>" + result[i][5] + "</div></div>"+
   // "<div style='display: none' id='operacion_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none' id='vigencia_" + i + "'>" + result[i][7] + "</div>"+
   "<div style='display: none' id='hasta_" + i + "'>" + result[i][8] + "</div>"+
   "<div style='display: none' id='danios_" + i + "'>" + result[i][9] + "</div>"+
   "<div style='display: none' id='notasveh_" + i + "'>" + result[i][10] + "</div>"+
   "<div style='display: none' id='motor_" + i + "'>" + result[i][11] + "</div>"+
   "<div style='display: none' id='chasis_" + i + "'>" + result[i][12] + "</div>"+
   "</div></div>";
   }
   //  sinPendientesDiv.innerHTML = pendientesHtml;
   sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);

     // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("patente_sn")[0].value = document.getElementById("patente_sn_" + id).textContent;
     document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
     document.getElementsByName("cobertura")[0].value = document.getElementById("cobertura_" + id).textContent;
     document.getElementsByName("importe")[0].value = document.getElementById("importe_" + id).textContent;
     document.getElementsByName("danios")[0].value = document.getElementById("danios_" + id).textContent;
     document.getElementsByName("notasvehold")[0].value = document.getElementById("notasveh_" + id).textContent;
     document.getElementsByName("motor")[0].value = document.getElementById("motor_" + id).textContent;
     document.getElementsByName("chasis")[0].value = document.getElementById("chasis_" + id).textContent;
       buscarModelo()
       buscarRefa()
        document.getElementById('valoresContainer_veh').style.display = 'block';
document.getElementById('patenteValor').textContent = document.getElementById('patente_sn').value;
document.getElementById('marcaValor').textContent = document.getElementById('marca').value;
document.getElementById('cniaValor').textContent = document.getElementById('cnia').value;
document.getElementById('statVeh').textContent = document.getElementById('cobertura').value;

   let infoVigencia =  document.getElementById("vigencia");
   let infoHasta =  document.getElementById("hasta");

       var r_fechaHoy = formatearFecha();
       infoVigencia.value = r_fechaHoy;
       var r_nuevaFecha = sumarMeses(r_fechaHoy, 12);
       infoHasta.value = r_nuevaFecha

   });
 });
 spinner.style.display = 'none';
     boton.disabled = false;
 }).getData(dni_filter);
         
} 


///////// FILTRO CLIENTES ///////////////
function filtrar2(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-buscar2');
   const spinner = document.getElementById('spinner11');
   spinner.style.display = 'inline-block';
   boton.disabled = true;

 let infoPatente =  document.getElementById("patente");
  var patente_filter = infoPatente.value;
 google.script.run.withSuccessHandler(function(result) {
 // Actualizar HTML de la página con los nuevos resultados
 var sinPendientesDiv = document.getElementById("sinPendientes2");

var pendientesHtml = "";
 for (var i = 0; i < result.length; i++) {

pendientesHtml += "<div class='bg-light border' style=' margin-bottom: 0;border-radius:5px; padding: 5px 10px 5px 10px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;margin-bottom: 5px;background-color: #FFFFFF' id='div" + i + "'><div class='row' style='padding-left: 5px; '><div class='row mb-1'><div class='col-3 text-muted fw-bold' style='padding-left: 15px;' id='dni_" + i + "'>" + result[i][0] + "</div><div class='col-9 text-muted fw-bold text-truncate' id='cliente_" + i + "'>" + result[i][1] +  "</div></div><div class='row mb-1'><div class='col-4 fw-bold'><div class='row' style='text-align: center; border-radius:10px; color:white; background-color: #686868; box-shadow: 0px 0px 2px 0px #000000;'><div class='col-12 fw-bold' style='margin-top: 0px; color: #FFFFFF;'id='whatsapp_" + i + "'>" + result[i][4] + "</div></div></div><div class='col-8 fw-bold' style='padding-left: 2px;'><div class='row bg-light border ml-1' style='padding-left: 5px; text-align: left;  margin-left: 2px; border-radius:5px;color: #9B9B9B; border: 1px solid black;' id='domicilio_" + i + "'>" + result[i][2] + "</div></div></div>" +
   "<div style='display: none' id='localidad_" + i + "'>" + result[i][3] + "</div>"+
   "<div style='display: none' id='mail_" + i + "'>" + result[i][5] + "</div>"+
   "<div style='display: none' id='notascte_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none' id='sucursal_" + i + "'>" + result[i][7] + "</div>"+
   "<div style='display: none' id='fpago_" + i + "'>" + result[i][8] + "</div>"+
   "</div></div>";
   }
   //  sinPendientesDiv.innerHTML = pendientesHtml;
   sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);

     // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
     document.getElementsByName("nombreCompleto")[0].value = document.getElementById("cliente_" + id).textContent;
     document.getElementsByName("wpp")[0].value = document.getElementById("whatsapp_" + id).textContent;
     document.getElementsByName("domicilio")[0].value = document.getElementById("domicilio_" + id).textContent;
     document.getElementsByName("localidad")[0].value = document.getElementById("localidad_" + id).textContent;
     document.getElementsByName("mail")[0].value = document.getElementById("mail_" + id).textContent;
     document.getElementsByName("notascte")[0].value = document.getElementById("notascte_" + id).textContent;
     calcularUltimoNumeroCuit()
        document.getElementById('valoresContainer').style.display = 'block';
document.getElementById('dniValor').textContent = document.getElementById('dni').value;
document.getElementById('nombreCompletoValor').textContent = document.getElementById('nombreCompleto').value;
document.getElementById('whatsappValor').textContent = document.getElementById('wpp').value;
document.getElementById('statCte').textContent = document.getElementById('domicilio').value;
   });
 });
 spinner.style.display = 'none';
     boton.disabled = false;
 }).getData2(patente_filter);
         
} 


////// OCULTAR Y MOSTRAR BLOQUES CLIENTE /////////////////
const crearClienteBtn = document.getElementById('crearClienteBtn');
const formContainer = document.getElementById('formContainer');
const valoresContainer = document.getElementById('valoresContainer');

crearClienteBtn.addEventListener('click', () => {
   formContainer.style.display = 'none';
   valoresContainer.style.display = 'block';
document.getElementById('dniValor').textContent = document.getElementById('dni').value;
document.getElementById('nombreCompletoValor').textContent = document.getElementById('nombreCompleto').value;
document.getElementById('whatsappValor').textContent = document.getElementById('wpp').value;
});

valoresContainer.addEventListener('click', () => {
   valoresContainer.style.display = 'none';
   formContainer.style.display = 'block';
});


////// OCULTAR Y MOSTRAR BLOQUES VEHICULO /////////////////
const crearClienteBtn_veh = document.getElementById('crearClienteBtn_veh');
const formContainer_veh = document.getElementById('formContainer_veh');
const valoresContainer_veh = document.getElementById('valoresContainer_veh');

crearClienteBtn_veh.addEventListener('click', () => {
   formContainer_veh.style.display = 'none';
   valoresContainer_veh.style.display = 'block';
document.getElementById('patenteValor').textContent = document.getElementById('patente_sn').value;
document.getElementById('marcaValor').textContent = document.getElementById('marca').value;
document.getElementById('cniaValor').textContent = document.getElementById('cnia').value;
document.getElementById('statVeh').textContent = document.getElementById('cobertura').value;
});

valoresContainer_veh.addEventListener('click', () => {
   valoresContainer_veh.style.display = 'none';
   formContainer_veh.style.display = 'block';
});

////////////////////////// VER REFACTURACION ////////////////////////

function buscarRefa() {
 let cnia = document.getElementById("cnia").value;
 let refa = 0; // Valor por defecto
 let vigencia = 0; // Valor por defecto para vigencia
 
 switch (cnia) {
   case "MAPFRE":
     refa = 4;
     vigencia = 6;
     break;
   case "ALLIANZ":
     refa = 4;
     vigencia = 6;
     break;
   case "MERCANTIL":
     refa = 4;
     vigencia = 6;
     break;
   case "ORBIS":
     refa = 4;
     vigencia = 6;
     break;
   case "PROVIDENCIA":
     refa = 3;
     vigencia = 6;
     break;
   case "LIBRA":
     refa = 3;
     vigencia = 6;
     break;
   case "AGROSALTA [RC]":
   case "AGROSALTA [RC-GRUA]":
   case "AGROSALTA [MOTO]":
   case "AGROSALTA [B1]":
     refa = 3;
     vigencia = 6;
     break;
   case "GRUA":
     refa = 1;
     vigencia = 12;
     break;
   case "DIGNA":
     refa = 1;
     vigencia = 12;
     break;
   case "BBVA":
     refa = 1;
     vigencia = 12;
     break;
   case "EL TRIUNFO":
     refa = 6;
     vigencia = 12;
     break;
   case "EXPERTA":
     refa = 1;
     vigencia = 12;
     break;
   case "FED PAT":
     refa = 1;
     vigencia = 12;
     break;
   case "NIVEL":
     refa = 1;
     vigencia = 12;
     break;
   case "RIVADAVIA":
     refa = 3;
     vigencia = 12;
     break;
   case "RIO URUGUAY":
     refa = 6;
     vigencia = 6;
     break;
   case "LA CAJA":
     refa = 1;
     vigencia = 12;
     break;
   case "SAN PATRICIO":
     refa = 1;
     vigencia = 12;
     break;
   case "ATM":
     refa = 1;
     vigencia = 12;
     break;
     
   default:
     refa = 0;
     vigencia = 0;
     break;
 }

document.getElementById("refac").value = refa;
document.getElementById("vigtot").value = vigencia;

let vigenciaDate = document.getElementById("vigencia").value; 


 let nuevaVigencia = sumarMeses(vigenciaDate, vigencia);
 let nuevaRefa = sumarMeses(vigenciaDate, refa);

 document.getElementById("hasta").value = nuevaVigencia;
 document.getElementById("refa_hasta").value = nuevaRefa;

}


////////////// VALIDADOR DE AÑO DE PATENTE /////////////////
function buscarModelo() {
 const patente = document.getElementById("patente").value;
 const ramo = document.getElementById("ramo_1").value;
 console.log("verificacion patente: " + patente)
 console.log("ramo: " + ramo)
 
 var ano = "";
 var tipo = "";
 var motor = "";
 var chasis = "";

if (ramo === "BICI_") { 
       tipo = "BICICLETA";
       motor = "NO APLICA";
       chasis = "NO APLICA";
} else if (ramo === "CASA_") { 
       tipo = "COMBINADO FAMILIAR";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "COMERCIO_") { 
       tipo = "INTEGRAL DE COMERCIO";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "AP_") { 
       tipo = "ACCIDENTES PERSONALES";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "CAUCION_") { 
       tipo = "CAUCION";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "RC_") { 
       tipo = "RESPONSABILIDAD CIVIL";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "TRANSPORTE_") { 
       tipo = "TRANSPORTE";
       motor = "NO APLICA";
       chasis = "NO APLICA";
       ano = "2000";
} else if (ramo === "TECNICO_") { 
       tipo = "SEGURO TECNICO";
       ano = "2000";
} else if (patente.length == 6) {
 //// VALIDADOR DE AÑO DE AUTOS PATENTE VIEJA
   if (patente.slice(0, 3) >= "PRA" && patente.slice(0, 3) <= "XZZ") {
       tipo = "AUTO PARTICULAR";
       ano = "<= 1994";
   } else if (patente.slice(0, 3) == "AAA" && patente.slice(3, 6) <= "069") {
       tipo = "AUTO PARTICULAR";
       ano = 1994;
   } else if ((patente.slice(0, 3) == "AAA" && patente.slice(3, 6) >= "070") 
           || (patente.slice(0, 3) >= "AAB" && patente.slice(0, 3) <= "AOK") 
           || (patente.slice(0, 3) == "AOL" && patente.slice(3, 6) <= "106")) {
       tipo = "AUTO PARTICULAR";
       ano = 1995;
   } else if ((patente.slice(0, 3) == "AOL" && patente.slice(3, 6) >= "107") 
           || (patente.slice(0, 3) >= "AOM" && patente.slice(0, 3) <= "BDF") 
           || (patente.slice(0, 3) == "BDG" && patente.slice(3, 6) <= "779")) {
       tipo = "AUTO PARTICULAR";
       ano = 1996;
   } else if ((patente.slice(0, 3) == "BDG" && patente.slice(3, 6) >= "780") 
           || (patente.slice(0, 3) >= "BDH" && patente.slice(0, 3) <= "BTI") 
           || (patente.slice(0, 3) == "BTJ" && patente.slice(3, 6) <= "925")) {
       tipo = "AUTO PARTICULAR";
       ano = 1997;
   } else if ((patente.slice(0, 3) == "BTJ" && patente.slice(3, 6) >= "926") 
           || (patente.slice(0, 3) >= "BTK" && patente.slice(0, 3) <= "CNJ") 
           || (patente.slice(0, 3) == "CNK" && patente.slice(3, 6) <= "039")) {
       tipo = "AUTO PARTICULAR";
       ano = 1998;
   } else if ((patente.slice(0, 3) == "CNK" && patente.slice(3, 6) >= "040") 
           || (patente.slice(0, 3) >= "CNL" && patente.slice(0, 3) <= "DBC") 
           || (patente.slice(0, 3) == "DBD" && patente.slice(3, 6) <= "014")) {
       tipo = "AUTO PARTICULAR";
       ano = 1999;
   } else if ((patente.slice(0, 3) == "DBD" && patente.slice(3, 6) >= "015") 
           || (patente.slice(0, 3) >= "DBE" && patente.slice(0, 3) <= "DQC") 
           || (patente.slice(0, 3) == "DQD" && patente.slice(3, 6) <= "179")) {
       tipo = "AUTO PARTICULAR";
       ano = 2000;
   } else if ((patente.slice(0, 3) == "DBD" && patente.slice(3, 6) >= "015") 
           || (patente.slice(0, 3) >= "DBE" && patente.slice(0, 3) <= "DXE") 
           || (patente.slice(0, 3) == "DXF" && patente.slice(3, 6) <= "252")) {
       tipo = "AUTO PARTICULAR";
       ano = 2001;
   } else if ((patente.slice(0, 3) == "DXF" && patente.slice(3, 6) >= "253") 
           || (patente.slice(0, 3) >= "DXG" && patente.slice(0, 3) <= "EBL") 
           || (patente.slice(0, 3) == "EBM" && patente.slice(3, 6) <= "313")) {
       tipo = "AUTO PARTICULAR";
       ano = 2002;
   } else if ((patente.slice(0, 3) == "EBM" && patente.slice(3, 6) >= "314") 
           || (patente.slice(0, 3) >= "EBN" && patente.slice(0, 3) <= "EGT") 
           || (patente.slice(0, 3) == "EGU" && patente.slice(3, 6) <= "805")) {
       tipo = "AUTO PARTICULAR";
       ano = 2003;
   } else if ((patente.slice(0, 3) == "EGU" && patente.slice(3, 6) >= "806") 
           || (patente.slice(0, 3) >= "EGV" && patente.slice(0, 3) <= "ESJ") 
           || (patente.slice(0, 3) == "ESK" && patente.slice(3, 6) <= "914")) {
       tipo = "AUTO PARTICULAR";
       ano = 2004;
   } else if ((patente.slice(0, 3) == "ESK" && patente.slice(3, 6) >= "915") 
           || (patente.slice(0, 3) >= "ESL" && patente.slice(0, 3) <= "FHK") 
           || (patente.slice(0, 3) == "FHL" && patente.slice(3, 6) <= "039")) {
       tipo = "AUTO PARTICULAR";
       ano = 2005;
   } else if ((patente.slice(0, 3) == "FHL" && patente.slice(3, 6) >= "040") 
           || (patente.slice(0, 3) >= "FHM" && patente.slice(0, 3) <= "FYY") 
           || (patente.slice(0, 3) == "FYZ" && patente.slice(3, 6) <= "659")) {
       tipo = "AUTO PARTICULAR";
       ano = 2006;
   } else if ((patente.slice(0, 3) == "FYZ" && patente.slice(3, 6) >= "660") 
           || (patente.slice(0, 3) >= "FZA" && patente.slice(0, 3) <= "GVQ") 
           || (patente.slice(0, 3) == "GVR" && patente.slice(3, 6) <= "173")) {
       tipo = "AUTO PARTICULAR";
       ano = 2007;
   } else if ((patente.slice(0, 3) == "GVR" && patente.slice(3, 6) >= "174") 
           || (patente.slice(0, 3) >= "GVS" && patente.slice(0, 3) <= "HSJ") 
           || (patente.slice(0, 3) == "HSK" && patente.slice(3, 6) <= "507")) {
       tipo = "AUTO PARTICULAR";
       ano = 2008;
   } else if ((patente.slice(0, 3) == "HSK" && patente.slice(3, 6) >= "508") 
           || (patente.slice(0, 3) >= "HSL" && patente.slice(0, 3) <= "IMX") 
           || (patente.slice(0, 3) == "IMY" && patente.slice(3, 6) <= "879")) {
       tipo = "AUTO PARTICULAR";
       ano = 2009;
   } else if ((patente.slice(0, 3) == "IMY" && patente.slice(3, 6) >= "880") 
           || (patente.slice(0, 3) >= "IMZ" && patente.slice(0, 3) <= "JMK") 
           || (patente.slice(0, 3) == "JML" && patente.slice(3, 6) <= "170")) {
       tipo = "AUTO PARTICULAR";
       ano = 2010;
   } else if ((patente.slice(0, 3) == "JML" && patente.slice(3, 6) >= "171") 
           || (patente.slice(0, 3) >= "JMM" && patente.slice(0, 3) <= "KTQ") 
           || (patente.slice(0, 3) == "KTR" && patente.slice(3, 6) <= "984")) {
       tipo = "AUTO PARTICULAR";
       ano = 2011;
   } else if ((patente.slice(0, 3) == "JML" && patente.slice(3, 6) >= "171") 
           || (patente.slice(0, 3) >= "JMM" && patente.slice(0, 3) <= "LZU") 
           || (patente.slice(0, 3) == "LZV" && patente.slice(3, 6) <= "232")) {
       tipo = "AUTO PARTICULAR";
       ano = 2012;
   } else if ((patente.slice(0, 3) == "LZV" && patente.slice(3, 6) >= "233") 
           || (patente.slice(0, 3) >= "LZW" && patente.slice(0, 3) <= "NKB") 
           || (patente.slice(0, 3) == "NKC" && patente.slice(3, 6) <= "496")) {
       ano = 2013;
       tipo = "AUTO PARTICULAR";
   } else if ((patente.slice(0, 3) == "NKC" && patente.slice(3, 6) >= "495") 
           || (patente.slice(0, 3) >= "NKD" && patente.slice(0, 3) <= "OMW") 
           || (patente.slice(0, 3) == "OMX" && patente.slice(3, 6) <= "383")) {
       tipo = "AUTO PARTICULAR";
       ano = 2014;
   } else if ((patente.slice(0, 3) == "OMX" && patente.slice(3, 6) >= "382") 
           || (patente.slice(0, 3) >= "OMY" && patente.slice(0, 3) <= "PKE") 
           || (patente.slice(0, 3) == "PKF" && patente.slice(3, 6) <= "051")) {
       tipo = "AUTO PARTICULAR";
       ano = 2015;
   } else if ((patente.slice(0, 3) == "PKF" && patente.slice(3, 6) >= "052")
           || (patente.slice(0, 3) >= "PKG" && patente.slice(0, 3) <= "PQZ")) {
       tipo = "AUTO PARTICULAR";
       ano =  2016;
       //// VALIDADOR DE AÑO DE MOTOS PATENTE VIEJA
   } else if (patente.slice(3, 6) <= "CKY") {
       tipo = "MOTO PARTICULAR";
       ano = "<= 2006";
   } else if ((patente.slice(3, 6) == "CKZ" && patente.slice(0, 3) >= "000")
           || (patente.slice(3, 6) >= "CLA" && patente.slice(3, 6) <= "CZY")
           || (patente.slice(3, 6) == "CZZ" && patente.slice(0, 3) <= "252")) {
       tipo = "MOTO PARTICULAR";
       ano = 2006;
   } else if ((patente.slice(3, 6) == "CZZ" && patente.slice(0, 3) >= "253")
           || (patente.slice(3, 6) >= "DAA" && patente.slice(3, 6) <= "DUY")
           || (patente.slice(3, 6) == "DUZ" && patente.slice(0, 3) <= "999")) {
       tipo = "MOTO PARTICULAR";
       ano = 2007;
   } else if ((patente.slice(3, 6) == "DVA" && patente.slice(0, 3) >= "000")
           || (patente.slice(3, 6) >= "DVB" && patente.slice(3, 6) <= "ETV")
           || (patente.slice(3, 6) == "ETW" && patente.slice(0, 3) <= "999")) {
       tipo = "MOTO PARTICULAR";
       ano = 2008;
   } else if ((patente.slice(3, 6) == "ETX" && patente.slice(0, 3) >= "000")
           || (patente.slice(3, 6) >= "ETY" && patente.slice(3, 6) <= "FAA")
           || (patente.slice(3, 6) == "FAB" && patente.slice(0, 3) <= "081")) {
       tipo = "MOTO PARTICULAR";
       ano = 2009;
   } else if ((patente.slice(3, 6) == "FAB" && patente.slice(0, 3) >= "082")
           || (patente.slice(3, 6) >= "FAC" && patente.slice(3, 6) <= "GXF")
           || (patente.slice(3, 6) == "GXG" && patente.slice(0, 3) <= "710")) {
       tipo = "MOTO PARTICULAR";
       ano = 2010;
   } else if ((patente.slice(3, 6) == "GXG" && patente.slice(0, 3) >= "711")
           || (patente.slice(3, 6) >= "GXH" && patente.slice(3, 6) <= "HZB")
           || (patente.slice(3, 6) == "HZC" && patente.slice(0, 3) <= "824")) {
       tipo = "MOTO PARTICULAR";
       ano = 2011;
   } else if ((patente.slice(3, 6) == "HZC" && patente.slice(0, 3) >= "825")
           || (patente.slice(3, 6) >= "HZD" && patente.slice(3, 6) <= "IXY")
           || (patente.slice(3, 6) == "IXZ" && patente.slice(0, 3) <= "947")) {
       tipo = "MOTO PARTICULAR";
       ano = 2012;
   } else if ((patente.slice(3, 6) == "IXZ" && patente.slice(0, 3) >= "948")
           || (patente.slice(3, 6) >= "IYA" && patente.slice(3, 6) <= "KCB")
           || (patente.slice(3, 6) == "KCC" && patente.slice(0, 3) <= "679")) {
       tipo = "MOTO PARTICULAR";
       ano = 2013;
   } else if ((patente.slice(3, 6) == "KCC" && patente.slice(0, 3) >= "680")
           || (patente.slice(3, 6) >= "KCD" && patente.slice(3, 6) <= "KTQ")
           || (patente.slice(3, 6) == "KTR" && patente.slice(0, 3) <= "088")) {
       tipo = "MOTO PARTICULAR";
       ano = 2014;
   } else if ((patente.slice(3, 6) == "KTR" && patente.slice(0, 3) >= "089")
           || (patente.slice(3, 6) >= "KTS" && patente.slice(3, 6) <= "LMY")
           || (patente.slice(3, 6) == "LMZ" && patente.slice(0, 3) <= "425")) {
       tipo = "MOTO PARTICULAR";
       ano = 2015;
   } else if ((patente.slice(3, 6) == "LMZ" && patente.slice(0, 3) >= "426")
           || (patente.slice(3, 6) >= "LNA" && patente.slice(3, 6) <= "LZZ")) {
       tipo = "MOTO PARTICULAR";
       ano = 2016;
   } else {
       ano = "ERROR.";
   }
   //// VALIDADOR DE AÑO DE AUTOS MERCOSUR
     } else if (patente.length == 7) {
   if (patente.slice(0, 2) == "AA" && (patente.slice(2, 5) < "829" 
           || (patente.slice(2, 5) == "829" && patente.slice(5, 7) <= "SZ"))) {
       tipo = "AUTO PARTICULAR";
       ano = 2016;
     } else if (
         (patente.slice(0, 2) == "AA" && ((patente.slice(2, 4) == "829" && patente.slice(5, 7) <= "TA") || (patente.slice(2, 4) > "829"))) ||
         (patente.slice(0, 2) == "AB") ||
         (patente.slice(0, 2) == "AC" && ((patente.slice(2, 4) < "178") || (patente.slice(2, 4) == "178" && patente.slice(5, 7) <= "RK")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2017;
           } else if (
         (patente.slice(0, 2) == "AC" && ((patente.slice(2, 4) == "178" && patente.slice(5, 7) >= "RL") || (patente.slice(2, 4) > "178"))) ||
         (patente.slice(0, 2) == "AD" && ((patente.slice(2, 4) < "535") || (patente.slice(2, 4) == "535" && patente.slice(5, 7) <= "AD")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2018;
           } else if (
         (patente.slice(0, 2) == "AD" && ((patente.slice(2, 4) == "535" && patente.slice(5, 7) >= "AE") || (patente.slice(2, 4) > "535"))) ||
         (patente.slice(0, 2) == "AE" && ((patente.slice(2, 4) < "070") || (patente.slice(2, 4) == "070" && patente.slice(5, 7) <= "KX")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2019;
           } else if (
         (patente.slice(0, 2) == "AE" && ((patente.slice(2, 4) == "070" && patente.slice(5, 7) >= "KY") || (patente.slice(2, 4) > "070" && patente.slice(2, 4) < "551") || (patente.slice(2, 4) == "551" && patente.slice(5, 7) <= "LM")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2020;
           } else if (
         (patente.slice(0, 2) == "AE" && ((patente.slice(2, 4) == "551" && patente.slice(5, 7) >= "LN") || (patente.slice(2, 4) > "551"))) ||
         (patente.slice(0, 2) == "AF" && ((patente.slice(2, 4) < "119") || (patente.slice(2, 4) == "119" && patente.slice(5, 7) <= "LA")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2021;
           } else if (
         (patente.slice(0, 2) == "AF" && ((patente.slice(2, 4) == "119" && patente.slice(5, 7) >= "LB") || (patente.slice(2, 4) > "119" && patente.slice(2, 4) < "725") || (patente.slice(2, 4) == "725" && patente.slice(5, 7) <= "CA")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2022;
           } else if (
         (patente.slice(0, 2) == "AF" && ((patente.slice(2, 4) == "725" && patente.slice(5, 7) >= "CB") || (patente.slice(2, 4) > "725"))) ||
         (patente.slice(0, 2) == "AG" && ((patente.slice(2, 4) < "394") || (patente.slice(2, 4) == "394" && patente.slice(5, 7) <= "GB")))) {
       tipo = "AUTO PARTICULAR";
         ano = 2023;
           } else if (
         (patente.slice(0, 2) == "AG" && ((patente.slice(2, 4) == "394" && patente.slice(5, 7) >= "GC") || (patente.slice(2, 4) > "394")))) {
       tipo = "AUTO PARTICULAR";
       ano = ">= 2024";

       // //// VALIDADOR DE MOTOS MERCOSUR
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) < "022")
       || (patente.slice(1, 4) == "022" && patente.slice(4, 7) <= "FCK"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2016;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "022" && patente.slice(4, 7) >= "FCL")
       || (patente.slice(1, 4) >= "023" && patente.slice(1, 4) <= "061")
       || (patente.slice(1, 4) == "062" && patente.slice(4, 7) <= "AGC"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2017;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "062" && patente.slice(4, 7) >= "AGD")
       || (patente.slice(1, 4) >= "063" && patente.slice(1, 4) <= "093")
       || (patente.slice(1, 4) == "094" && patente.slice(4, 7) <= "FDF"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2018;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "094" && patente.slice(4, 7) >= "FDG")
       || (patente.slice(1, 4) >= "095" && patente.slice(1, 4) <= "112")
       || (patente.slice(1, 4) == "113" && patente.slice(4, 7) <= "NSX"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2019;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "113" && patente.slice(4, 7) >= "FDH")
       || (patente.slice(1, 4) >= "114" && patente.slice(1, 4) <= "135")
       || (patente.slice(1, 4) == "136" && patente.slice(4, 7) <= "PRA"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2020;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "136" && patente.slice(4, 7) >= "PRB")
       || (patente.slice(1, 4) >= "137" && patente.slice(1, 4) <= "156")
       || (patente.slice(1, 4) == "157" && patente.slice(4, 7) <= "XZZ"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2021;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "157" && patente.slice(4, 7) >= "YAA")
       || (patente.slice(1, 4) >= "158" && patente.slice(1, 4) <= "173")
       || (patente.slice(1, 4) == "174" && patente.slice(4, 7) <= "ZVH"))) {
       tipo = "MOTO PARTICULAR";
       ano = 2022;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "174" && patente.slice(4, 7) >= "ZVI")
       || (patente.slice(1, 4) >= "175" && patente.slice(1, 4) <= "197")
       || (patente.slice(1, 4) == "198" && patente.slice(4, 7) <= "KAK"))) {
       tipo = "MOTO PARTICULAR";
     ano = 2023;
   } else if (patente.slice(0, 1) == "A" && ((patente.slice(1, 4) == "198" && patente.slice(4, 7) >= "KAK")
                                         || (patente.slice(1, 4) >= "199"))) {
       tipo = "MOTO PARTICULAR";
     ano = ">= 2024";
   } else {
     ano = "ERROR.";
   }
 } else if (patente.length == 9 || patente.length == 10) {
 //// TRAILER
   if (patente.slice(0, 3) >= "101") {
       tipo = "TRAILER";
       ano = "2000";
       motor = "NO APLICA";
       chasis = "NO APLICA";
   } 
 } else {
   ano = "ERROR FORMATO PATENTE NO VALIDA.";
 }

if (!document.getElementById("modelo").value) {
   document.getElementById("modelo").value = ano;
}

console.log("valor final de tipo: "  + tipo)
console.log("antiguo valor en tipo: " + document.getElementById("tipo").value)
if (!document.getElementById("tipo").value) {
   document.getElementById("tipo").value = tipo;
}

if (!document.getElementById("motor").value) {
   document.getElementById("motor").value = motor;
}

if (!document.getElementById("chasis").value) {
   document.getElementById("chasis").value = chasis;
}


 const modelo = document.getElementById("modelo").value;
 const last4Characters = modelo.slice(-4);
 const yearFromModel = parseInt(last4Characters, 10);
 const today = new Date();
 const currentYear = today.getFullYear();

 let resultado = "TIPO DE VEHICULO:";
 let plan_a = "";
 let plan_b = "";
 let plan_c = "";
 let plan_d = "";
let yearsSinceManufacture = currentYear - yearFromModel;

console.log(currentYear)
console.log(yearFromModel)
console.log(yearsSinceManufacture)

if (/^[0-9]{3}[A-Z]{3}$|^[A-Z]{1}[0-9]{3}[A-Z]{3}$/.test(patente)) {
 resultado += "MOTO\n";
 //nivel
 if (yearsSinceManufacture > 35) {
   plan_a += "<a href='http://201.216.251.171:8090/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='agrosalta'></div></a>\n";
 }
 if (yearsSinceManufacture <= 35) {
   plan_a += "<a href='http://201.216.251.171:8090/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' /></div></a><a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='rivadavia'></div></a><a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='rus' width='96'></div></a><a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a><a href='https://auth-api.libraseguros.com.ar/login/agent' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAeCAYAAADTsBuJAAAACXBIWXMAAB7BAAAewQHDaVRTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABKfSURBVHja7Fp5eFTV2f+9595ZMplJJpM9BJJAIOyb7KAiCLgXUKm4U6rV9nu0Ljy2LtXaaq2tX+un1VqtKK0KCFYpbigEZCcCCUtICJBAIPs6k1nvvef9/rgzkwTQ9sHvE//ofZ7zPDP3nHvue97l9/7ed4aYGf+5zt8l/qOC83up5/xk+1Fw/UbAlgpW2LQlE0gyEGkEbBlA3lWAUAEGSPcDMgAoVoAF+FQJ4K8GEtyAxQbWAiDPYFDKSCDYBD65CcgfDygSaKsEQs0KvMc8HPElUMpIL6VN64DdDSipvcTi2n/ko3m/FYrCSB0VgGfYKbJ7AJEcXcAA0Vefiw2AFYDbwVoDyDIAkAYACfMgAlAsPR4ggNRv3wB6Y8Xl+uqnX1aMpjSyJrfCmRhASFelv7EPC0+zKJpaZin43jWInVVRAEmmQYQKbe+qXxv71ixSuD1JSco5Zfg0Umb+4HnlwpEvyXAwJ/zxM8Wi7XiOEKoUCUqQdEORjqQuTkxtZ/9nbm6+O0PNHvsJXfHI86Lg8s0xubRtrz+N+uq+SLQZCLyayo0nBynW1JNi0q3/Q9P/6x2y5zV97cFivhQMJUfeWLjNuvC9q8jdv9o0AJkGBAMwzO/f9GLmcxu+CresXT9F3/vGncZDYF4E5h+DjU1PPMa1G6dx/YYiZqN7vREBB5vBES840Ag+vrYvn9ozXf/0wf/mO8F8I1iu+cFvmXVw0G/l42vHyIp3r5FPpLTxLWD5U7BxYsd4ZnZwZ3WBseuVRdqDFjauB+t/m/mulBoxM2QPGWXY55b7375W+03+cWMeWL9fCWoH/7bAnJfoJR8z2JCQhgQzQy9deot2OVhu+9393etlj+c0sIyApXbuOmT+BgYIH4PkICQz9FXz/s7zwPoLI8rjCghXgTnc43AhcKABHG4Dtx8Bt5cgpjD5pL1d3gqW65Y8ytpJc16rMxXx0U+f5ZvA+s9gGJ31bnM/c1/Dd3SAcS9YzgUbxY/98qtklczQn82v4QXgyH1go70q35wzzCENsB4Ga0FIKc31r4zdw3PB2guFVUZMTjZ6DZZRI3wDA5x7ElYyAdjNIGTpBwFsS/LF562ZAKw90r0NsCYDqgNIzACcw837/kYCK10gAKQAegAINwBKkjkfCQhWACYAWpfLvGlisHD2P8rDR5WQBUDpyhtZdgJ6M6C1RcM7AsigKeOFd/2B3YDSDshD718bx29QFE4CgNBAREDzziLs2jMGuYCoPFKI4xumEQBiCWIjPsyccL6SsOKIv5vYSrAAiHQC9R8DEa+pMSXJhEsAyLnIVH7MGHEMlIqpeQDQzQMJpRtfSQrz8ABY7058sU+K2gUGWNesBAlAA2QQgAeQESBQCSQOhEjJKocdEGGAg62pMfg1dxOAcMbFkGvu/ytn2P1Galqn8uXJHGPn8/chb8YWkBLNAT0SMH+zVHDuBoDswWINggJA8wM1nwGhLoAlwBqgB82DpY7sNkDPiwiSTGJCsSRo7hk1rui+pzpNm7WWg1KHgmW7i44cnMw6gAtueoNECiBSuk8lVHBiEUg4IRsrxit+kwcgc3Sp+WrRg/mYsnDHsb5yy7apym82TqSakgnYteQF7P3nfHlVQ7pwZDV/R+sANh2DVMCR1j0SswFXX8Ce2u3kX3GZHk493Il7MxMQ4M6tBbzgriPgQGOafGbsflkessu5F70nLnny8TOkIjsgnGCthfD5yw/hFCDHDtknhl23snuRDhhBM/oAYN1DzyEJoKyLd2HQNWtkFiBqGVzy4t1xGstG73FeIOg02zFF9Rely3GlhTqAlCGA3XMa14tBCUOwaQAGAYJOi2kGLIAQxMaK61ayHrLII9uHS70zT827ZC0t+3iGcA0+Fl8e7rRxe0U2EtO8kkQyV346Be/c/RfRAIdx6w0rlWv//AMzXOOuA5AFEDYwQmRsW3W9uOKePxIAeAad0IeP/tKyvnQctr64RE576LdCcYVPbx7Q+TCAPM0YJk7zmaukBhRcDQjL14jMiAUAddslDrFRbi6Qkl+LxJw2xTO0Dm2VBdLX6BLvPf4oz7rrRcq5ZA8DMOr2DTDeuv5D4WvMFy0ApwBi7q9/TANnvy8yx9efGXoWQIm+cufL90ADxKynHohBuzLpwd/zjpuXi6pOp9z/9o0Y/aOlZ0To+YAg6jEANiGkl2IJCDYDaaMAd9FXVDzda80cIHuEUA9sMgCpS1ZmPfOAMvX+p8Tlz/7EctMHVyhznnma962+ne+ZsdsoXvIUAKj50ypsS46OVe5YdxllJ7VbmgE0Hx5JMeWzHt1fA7QWkNYCMjoBaJDrHn9KjJ+5mYRTgqNSDL/hXVmY0kEBADtfuY+juaP3+b8DBjhjAtJMwP0u+5odTvscwzGmuGgUCwsGuLUmN47D0CEKpheLB9dNpGRAvP77h7nq/dlMJNmW2C4KZ33KD5eNkh5AWbrsLv3VCTvMDVWAQwBLsOIGi2SwSATXbR7FJ3yJYs5T95jkKwRAgkiRuGDRq6wCdHDvCK7fMTqKdT3Gd6oZF01K/hNA9mTAM6y33+t+C4xQd/Ji6p0zYoO7jRLPzz2Yk9mfASh1zD4ekBSgEMB7l98Riy7JADnya3nRa7dzGqBsKpmof37PM+a8zXyHUADFAiIVxkeP/kXkZbRT9sRScAQgCWIypZl494ucC4hmgHf86T4GIMkOSRZIsnwXDCBYxnSma0CgAUguAobc2QtujLI3bzWKf/U0FDuge3vSH9MOQgKCTa8ik5WwIpli9Q5Jju8noqJbEgxSnUEoAIUCaab5CAQGsQExcvGbxkVTN5MO0HsvPCQbt44GCYBUEAxzX6PLLvdsn0CX/eJRBsAswLDH4VAkF57goTM3QAeodPnNHPEmEgSIVRCr58sA3IMB6UwRgGwpjBF3AuPuA8Y/Bqh2QIa7HXzPSw+Kur25aKsAjNh90kEk40CkhwHFBZAtijYkzSYkERQrR4s3wAiYHwONKdzR4AEDnJJ9qDtIOK5gsWDFtXo+oLQBcumCNRJatOMWpQobHv6VcAA07q6XolVmd1ESi9RLljwuswGq1gXvfX1xHHqZzpcBKN4ThKJYoAOQ4UTYcgHXCPMQ0aqXQJDNewZj164RFPEdQPt+wJ5lzid6AI4kEwMwDEAkAJ7RANmjla6iwgBgMLEz2WcilQIoyaYBNz/7sKiQZKQBmPSTP/WuUgXAOoSjTzPd9uY86QTUfXV99WVXruFoPmAAxtoXHhRTF75NUEzIIQkCwSAFRpQoKv3mbOGJF26gLoC3PH9/vJD7hhiiPPHEE+fm/4HGZFm/byCqiyeLj3/zW4oA1NaYwYmRAFuTA/AeS2VfXSa3Hh7IO1+6nV67fbWoAeSca/8pxt27Q7ZW5qC5YiA+f+wJ2lk6mcIABg/5koZd/zn7WxJlS/kgHNs0iT56+A8UBMEPcKSyD6cWnmB/YxYq1k6Xq29fitUfzue8xBDd/cbtSt6l68EhABETPlhGcwVBZIypMBJ8DuzZPlU5dKxIdnx4KVSrwese+pWy7WgRUoLEaYNK4croINUSMSlwtETvqM6R1dtGUsmyxdThc6O+wy19O4YjtaCaXDlNREKesxuf60+S+qF3L9dX3/tHVQm5hXBF2JXgR9BQZag1SyalnyDWdRYKkaY7lfZT/SjB02IYDh/d9PLP1YLZ72qrb3hSVnxxi4KARziy6mVAt9Bl9z6nDJ33krHz9Ql62RtvCn+nRygJOlwuH2kE7mzINjw5DRISiq/WJdTcNi669ANx5aPPCSWzDewHIMBQQFAgYx7NDIhoxH541x9E2borWGsskKpVE6yrlNK3mrs6krWIrqs3L1+k5l/yOTgS71mF1z/yS7n+T3daU5J0Skz0I8LgpuoCI2dgjbqoeLpITK//1g0QpS8KIPTTa9tonyjWqeIz5lmamdLMhkavORnl6cIietZ73IvyagRE8wH0aD1p4jWzCiZAEEM3XwLlLNnrK5GbJcV7K0LpcVbisz/fe+7bzAEcUz7OKEpEVM5uwXp1eUjApDtknPGsUGNVswSAtpC0lde196deNYO1WxlaIH5fRvGaouzlbMr/lx1kEmwwRck0Rx3nq5Tfe+5b7gUB2w5XT9m2//BsVkjOnTBi5cCc7IoenmQ6+GlXOMrCv84dNx86enFHV8B99bjhH23ev//yTl8waWjOpGNn42FkScKRNq99c+mhBYtmTFxm7iXibtDQ4c1cU3LgRq+3M7mosN/6q0cN2/yv+ywMRVXO2jShs7JB+vaT8J6aU+Nf/uSL+xfPmPSKJzGhPcXp6Djc6stYvmnHbRlp7mpPoqNrQ2XNjM2Vh6eEdclrdx/8nt1uDWS4nC0rdpQu+KysfE7/7LRKp80W/Pzgkakfl5TNz85KP6kQ9C8qjkypOlk/enT/vF3SZg/PHDlofWeX3/la8fbFnUGtb05KcrVFEQYB2H385Ng/vrfuZ81hLf+KUUVrP9tfeenuY7Xj+mV4amyqqj3y1vu/t5ISWjJv1u+6AkFnisvZuXJ76ffb/SFPXmrS8S8qq6cVl1Ve5XS7G33hiBIIR1w2qxKpbvdmkxDGsq1fLnLYLOEOzVBfXbfljty0lBNuR4Jv5Y6y66pbWvrnpaWcUIWif+s54MnlH/58QE56800XTXgNAKrqmwuXbtzxw/F9s8oONLcWDUpLq6qoa7xg0IDcnWt37bvmhxdNfPtAde3wnDT38e1HTo4fV5i7p6XDl1PUJ2t/WW3duOwEe1WrFnFZWMhWb0dhdlb2YVUoIWGFVHR2BLoC7qxU9/HlW3fN/OH0KeumjxyyZtXWkoWH65tHFOVkbK8LG31HZKVWVzU1F+6tPDZmclH/rbdcPPmvG8oPz/rzJ5tumziw/5YHrp755xVbS26pa+/q1+n3O1gQ0lzO1gK3a9/BhrZCu9WKHJezdfqYIcWryg7N50AgfKimdsb10ye//MW+iiuGZ6cfrA8EMk42teWfauvs84vvX/1Irtt5wmqxaN96DnDarFpXIJwU+/5ZWfn0guTEU/OmjX/Hk5HZvHH3gTmzhwz8cPy4USsG5/crHVnQ/0N/INTU5Q8UDumX++kNky94K9WR0Ll0/dbF3x838p2bZkxZoYK6NF2n6yeMWZ4/qOj9Zs1wuhPsweI9B690OJy+qy4Y8Q+Lou5RFEoAgLc3bJs1dujg4mumjPsnDK19R+XxycF2X9L8yaPfmj9x7HIGY8bQQZ+tvP+Om5ta27N++saq53acONU32+mou2HK+DdVe4I+YkD+5qsmjf08wQJ/SNNs6cnOhnRnQosCJURQ+IErZ/4uHNKR6UxonDvlghUyIl1FOdnlFxcVrN95tGZiQDMc56UO6JfpqXtv554FR+saU/dVnxqT4kow2oNhT3ltQ1FY16xjBuR96fX6+tj6pNccPHRkelFW1oaDNbUT8rJSvVsrjkw81d7RT1UFjx+Yv+OLyiOXVpxqHOYLhjwOi9rpslvRpJHu93YWKCzVzOSkxs4un6upsyv78MnGK0b0y9mdn5le5Q2HM7dXHbvwZLs/zR/Wc0fkph88cPLU0NGFhXsT7Faf02YLbK88OrW4rPxiW4KNclM9LelOh7ehw5tT1C/raFFGWvmug1WzVu4qvc6T4u7MS0upLjlWM/twY+sgr6a7klXVq0fC6aMKcss+2l0+90RTc1ZE15xzJoz5OwHKqu27fzSiX05pRrKr4TzQUKC1y5+2etuX30tLdnfOHTfig/rOrj7F+w9dOn/iqLccdnuw2efLSkx0tni9vowsd1KdPxB0f1peNWPZxp0LF04Z+8HV40auclgtoY0VR+b4gkH3tIH91wMwbIpqGESRkKa5dLDIdjkbW7xd6V9UHJ0zMDu9anBO5l6LokQAYEvF0ZneYCR1wsD8TWnOhMbi8qpZbV5/5vSh/T9JdSW1nGxt7f9p2aEZrkRH14JJY5cDwMrte2/OTHa2DuubVfLOpl2Ls9M8Jw7UNeU9MX/OMxsPVF4VNNgyZUj/YqnpQkppTXU5GyobmobsPHRk2sKLJ/01ohkJa0tKr5tQNGB7Qbrn8DeJgHMvxBhQ/43kH+cI0gCEgq1VNVOaOryJ88aP/CzWO1XOsRNF/8bPpNTjX3DyNMpbcvjY5GWbdt42pF+f/SlOh3fh1HF/O9tOEZaw0v/PvzjP2QAGmw0vAZMzE0cTCrHJwFnCIAazApUlCAwWCjQpLbqmC4fVEmaKPguODtHdmiY2f54hc1+FCUyAwQw12iaQYJD5VNwoHJVDsg4iBUQUN5YWrQFijmMYUn2n9PCMqqamAY/Nnvq6UJQwYpUzxfpdDIMZgggCBGaO1pD/Nz9J/u8AriMMydXuwtAAAAAASUVORK5CYII='alt='libra'></div></a><a href='https://pasportalsp.com.ar/login' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='san_p' width='96'></div></a><a href='https://extranet.atmseguros.com.ar' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAeCAYAAADTsBuJAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA4JSURBVHja1JprcF3Vdcd/a+9zzn1IV5JtSdjY4AcYY2MwJgEbTKAGDDjgZBISSgaCw8QJaWdoJv3QNh86YDoMTdtM+EAzKW2BQoaGQExaSAmB4WGwDQZjbDC2sS2/ZcmWbF1dSfdxzt6rH64ky7JMJ4zcEXtmfzj7nL32vuu/13899hVVZbTavY1XnOrVnQpXCiR/tFAhwMlrBPwnqj9HMYD/o6WgaRH7fVTmK8kKkOQz/EQDHFnZsfZvR0tnAaPYBBlxXNH7Bc7+TEJVwcoO4AxUf8Ap1vi/NycO77+rqndhZMVn/o3C66Ops1EFgJGNqRnhbD675hDlMfUsRUQ++97kdVCPyJLPvhfQxDz6eQPgolOaxlB9npoKK0CHqN6oZsgan4bFSLJUf4dggHNGnD90zqfsS4xuHrMAqB1xeP5wYEQE7xze+cFnE9hTif0DFhRZimp1rvf4+NQUbgMLxpygPFFeQLgIqYLoKvEJ+zGBHVG2MQYTWPp95VFCtn3eLODqkU5937E8CXH/JkJqG8dXpw89cQoYeRElBToOwIilXOyjWOw+hWEJufGNGBEGA4zqZztRWWmsEJcq9HYfHVzEEJJrmoDB0pfPU3GlAZzIZupIh7U4TQDW4KmMWQBETkLAqmchQ6jDYOjOH2bK/As5Y/Z0VKGvs4u96zZiggAxhqHHVrysQbkIo4BQLHVTP6mZCxcuQb0fVLKIgAjGGvas2UjhSAdhKl2V43WPVuVelRQrBOmQL9z6VTCCCJQLfexbu4l8pZ3GqVM5e8E81HuMNRxtOcD+LVtIp2oRx3qcMnYt4GRenovohKG8Xewt4L1j+W8eYvz0KQB07TvEA9OvI0ynCDPp4Qd6C8i9A4+HC3tYuvJHXPWj5afcxoPnXE+5p68KgIB4+QMCKnppvtDGnEsWc8fTPx38vudwJw9MuY7OeD8rnn6E2V8+brQv/NU/sfntl5mUOg+MjGoENPo+4KToXK4YyktWLIeLLSz51p8PKh9ArCHMpNHEDQ+796IkavxX0SqlZIJagihk7/oPyDU2Mn5GVU7+YDtdBw6R9JY5tvcQ6ZrckDDWPIsnh1BTopcz5px7wip9xwocjQ8wo+mLJygfoOX1DWSoA48nZNNoA2BGVZrTYd3PHkrTpd5eMqaO6+69G4Ddb23o34UQZVJ4fyKCojyPE0GZO0DlTfXTeem+f+b+qxez7he/Gvx21Z/dz4NX3cAjS79HKpclzKYGwk9A1iByLQoGy+T5swFIylU6r/T0cZQOFv3F7YP+CaBrfzsHN35MTdQAsB1P4Y9OAf8/ARBrh3UWDRiAtQGH+3axcNmtNM2azpFP9rD+31cBkKrJEqQivHPDE7hVWGYMulERMEJfxzF6St2cMacaUVb6imx74S3iSomkUsFG0VAH3I1qn4re6ooVcoxn+pWXAHBo03YAyoUe6qhj4d3fpFzo5cCGrQDsW7+JQnKEoCaFGFaj+mnh8hiwAPzQXqcwfzCYL5YxBFy3snr633zgCQ5v3w1AGEXYVAqGWoAoYuRdNXr5UBrzPiZKpTm/dgFzli2uKvKD7ZS1hyl1c6lrbkKdO64ow1pVBadLSsVeGqdOo3Hm1KoFrt0IQPvWFuZdcAM1TeP5+PnXqJlQXwXgnc3ElBBrUDFrVQwqZgwDMHBCqn3BQJxobMDhwi4uW/x1Js2bRV9nnmeeuH/QZ5soIEiF+AH7FkBNDPTguf7ExFXoKXfRdMF0shMaqopct5E+uiDiJCvCyWuCAUNjr3YxZeEFmMBS7CpwaFM1pPdJwrUP/ICkEvPx795g0oXnAXBkWwsR6f7EQdcMUuuYdcInZJBcM3ByXSnG47jh7+8BoLfzGBfdciMLv/Kn/dmlwUYRfmgi4VmNBcQvOwEAEUoUaDr/eGmpddM2BHuqKtxvEGZjhJgSE+fOrEZT21ro2ncIgFnXL6Jp1nTWPPwUhUMdmMDiE8fhj3aTlnrwHBSvuzgN7fQlYpZL8GCspa1zB/Pm38BZl10IQNN50/jxsy+cuJEoOl7k9EDAbxEiHA0n1TXxTLp49uDQ0e37yFA7Mj9bdqH+xzgISdM8a3qVtjZvp2t/W3U//WOr/+FRLl1xCwBtH+2gfc8ustkGRPgAC2MeAElkiDX4CwG07Omlixt/8kMA4mKJ7S++iVihadYMms+fUdVTZNEhCIqXlxBdhMoJBqBlR5ocUxfOA6DQ1kH7lhYyQd1Ix3+XKqCyLO4tUR82M/WKiwE48O5HFI91D37asXMve/Z/wPfveLz6/v0t9GgnuXQjKrKR09RG1QeoHewzgUmociS/l2tu/h4zl1wOwIYn/4sHb/sa931jGdt/v2ZwbnbCOCr0HfcBCTvUsXT4DnsKRznr3AsGAej4ZA/tvTuJcpmTuAfPc/1GtaC7fJhzFy+gfvIZAOx9e9OgDwF4/i9/QtOZ05nQn1e0btx23CclvE4Cg33MUtBxaVfiq4ykVjnv+is49MEnJMUybz30JDa2WDwdO/Zw8L2t4JVKTx9hkB5QXlvV5HXx8CUSqTDunDNp37yTpFzhw1UvY4IQrDmpjiTKq0CNijcESk1zA60btpGUyrR9vIMz583h4HtbceWY959/gYtvWErrhm1459i1+l1ythHAGcs7p8sCZDRvxO47fiP2rworFDAIYX2GsvbinSM+VCJXNx7FEWsC9YqqR7otItWikYg8CvJdxVdQwmG5AWEYEWfLqIekrURUkx3R+4qaenVcgXUvgmADS5KNcXECXUqYTuNzDhc7fGdMzYRxVMJitSLa4Uils3hx7xojlw0VfW/7mrHqhGVASV+in7qNtRxtOdBPL0JD/UScdQiGUmeB4tEqD9fVNpPKZnEuAa/PoJyJOVH5AIENKXb3UGg7AgjZsB5rQ5yLh6ckRYRuAr0VFawNKXbl6Wk/iiBMaD6buFQmv7sNQWhsnkpfZ55CsQOA+rqJYAEn69Rx2trpKMblQGcOhuEuJtfU2H8XAl5df6yekB3fQA3jq3Strqp8QFXWIvq1EasdLibKpmmqmValODzOVUa65FqHKogurc6rkMrVkK6rOmvvEmwU0tg0rV9uQlSTobF2GgK4/n2Kly2jnPyeTgAU4OL+i/NBLlDv0ZOKKCONK4o5GgndsfCNUyyCqg7U5xla8D/x5opf4RE8E6uvq/N06DxV/JDnk95Xw9jVwucEgP4w8m4dkhbIkHeCDI4NPA//LoSdWTGSx91sEJL+0NQMKXYwgtyBC5TBZ7UveaPLqiXaU/5ZYMRLneMyBYTtfF4AaEpCDFLxsDlvEj/OB8TWgULoApx4bD8IVeV6CsbR4APyJqEOS6/Tv3kpldebk/rNJfRIrbcTPNBhKwjCRBeiQNkmBC4gVCERpTOoUKeWjAukbBItq92XQ25K1H5oEAeQBAnGWdCq2g2ConSZhAYfoEDeJIx3Ic462xPEa055zzcWo6ArJ8+hV5I6tZpZXpgUPZY7WKop1ljEB4WavjhMbOSNVlCsR2OLBN8pnBk8mmstryhMTj1a2xrXldO5bvGtEiTZBrWNR4JyPnDWfavYHAnCE7WHYguurpBL99b0uThIYowPb+8+0/7elXz7uM5yXU9tqjcqH5TAZQJnG1WooPhMMROV08WqQTjjkyBxRo0s75kUPZ5rLRuEOwuTUv9Wv7+cLWaYnG8sAd3Df+dvi6vHpgUcsCXyJlmi1nf/srbt5ZaweMu4YrRTxG/qCPsuSxOuj61fIMoehy6IMB//Mtve0hIUr/6PXOsbe0xpbiZTvjOlwf90q9a3iR7Lh5WOSIIZj2fb3onU0BIWv2CVqWdozapjQam5GFauM9a9/evw6O6+OJXZFfXe0SypZ3qD0tw4TC5NSfCYE12Acna9Ri/2BiWDqEdsczmMLwi86Xgi17pud1BcFiDFpzLtr+wKe2+qK9lMbWyf5TS3UbWA884699txkNyDlzdiozZSmWO8Wa0qE12Y3CDKPxpv/lrRpxGWobwWw9pQ9Bdlo9NCL69YpEVhDeifhJXUShckK12QNPQ5s1iUKGP1SUXPiyqp57zxjUkYN5jEPlRxpiWD+bWLKluNM28BdyXWvwe0WW8WgW50xi8wzr4vaIuK3K3i+1BpLVvXnnXBFFTaK6pzrfW11psXSYJ/AbqG/86drZ+M0QsZ+KaBe6zwcMbZmUFif6bGhWLdxNCLGmSFVXkuUNMoop2h2u1ptV+3yMfZOFgWqMQierFVJgvyEtYvMsLlRs26rPGkrV8UOrM+8PanSVS5BetmBipbDfJhOnAFY3ybVYnVqBGjTaE360JnZojoPiPssRhjRcAw3ojmrTAuQLZmXXCuwFMYPRhZ3g/VqFGzrxzGhXIYM7yP2VpQEripxtnbjTfLEd3lwuTb1gVzxZttKEXrzFnOOFHRnE3C5c468TaZptCh1v/QevumcbakoheJmunOukudcbtAvxjFEak4ulaNXilIrfFmDzBBvdmqojHCbYgeEmfPNt78nRPdL14OCdLojb9KnL3NJvaIil5jVBYYbz4Sb9qBWQIdKtyt4ucjulmRBNHb02pcWg3D+9ithio/T4JkXl2+/llv3exCXfeXTBKsMp7Ai1mDyGRR0wf6iqjsD8pR3ijfqaTKE0C+7I1/DmQ1arKIa7ZJ8KqzbPXib+zPMV71xocmMR8ZlVec9Xd562qNC6gt5Frz9V1XpiqphxVpcCSXeCFQ0WdsYq9Vo6sUrVX8TUES/bca3+uNf1W8ETUagH6lprvukXKmeIUL43ejYvbx0xv/VNv/DgCMrc1Bq/TttAAAAABJRU5ErkJggg=='alt='atm' width='96'></div></a>";
 } 
 if (yearsSinceManufacture <= 10) {
   plan_b += "<a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 10) {
   plan_b += "<a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='rivadavia'></div></a>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_b += "<a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAeCAYAAADTsBuJAAAACXBIWXMAAB7BAAAewQHDaVRTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABWpSURBVHja3Jp5kN3Vdec/v/vb3/5619KLthZCaq1GAmHKeCEYbMCDk9gwMa6pKZsQ420842WMPVNjJ2UndmaSSXkSUg44DmBXiG1IAAO2CWYRCCQQSCAktC+9ve5+r9/22+/8cX9qtWQBBqcqVb5Vv+ql3r2/c+8553u+53ufhvYOTo8EZAzuhaB3gOgEJBBC+zGI66AZnDkSQIC9Guzz1ZxwH/j7Qe8Bsw+Cw2D0gb0GvMchngR9aTq/BZoFMgJ0kN4CsEpo+ZchAZGFeAaCZwFNvWtumBC/CrmrQeuEYA+IEgS7IZ4CezNggP9TSF4B8uk8Te2JEPDBuATEUpAtSE6AbKt5oGyiDbKp/m+sBWO5mmePgHCh9TCIfnBWQXAINBPMbmg/pX43lir7g/1gDEP+akimQWpn7OYNhkwP+7UeyVsbmpqbtJQTrOHfgyhPfBySKsQTymFzn/3tGsabOiQ00OyzDjsBTJ2kFSO9syL0jUYC8XQaJf1byFzyp+gdF9Le3kfiAxMQV0AToGX5bRy/ngNkW8GJsUpFpXDOhqAc7oYvILmdpLpPwYk8R8SmfydNoAaa6eCsuwZz8Udw1r8PUYCJr11CODmDnoP4OIhufpvHr5kBMWCBtRT8xyB8BXBTDAWSSo38+z+Ie8GX8HZ9nejEd4inR9Hy6aGn2C1DiGdBLy8j8/YbMXo+grmoDz2vHFZ/8L/TfuZx8CE+BFpeOUD6r51Bsp3ap7129kofaJ613fh0DSA5PV/66ZrmvBrggwzSz57jXTJIn1jt8dc+U/1NQJBsqmKZuRzaz0BUBb0MmquyovXcH5DZsh1n9S3opf+KNXwr3q7/Q1w9BFFqYNsi885v46y5Wc01lSHB/jr+kS8S176DyKvIJwKtINBsG7To3HaZGlomQcpI1YtqClXzi3WcFvmMBk6KnZqAMDn9Ge10HdNsIDHASN+pm+pUQ5DuPAhO0kyOFTHRnF40I4dme2hmhaTpE1dAFFJbTjnYU/NFYYgkPGH8+ski1GSZg2QW9JwywntcMabgxWfQra9QvP5rmIsczIFP4a67GW/fnzD7w6+gGZD58AsYnSuRkWIpUWUv4dEf0Xrqr9A7RrHXgsiAsQViD9wN15G/5n+T1MNzF3lNgzgBrULSeAlh3UM09kOSqrJNMyBpQPnLd2IvfTtxo62mWRnC47cRT3wVkYfWDsXUhAPlz92PNbSOpO6pbTsZwrGf4R/+CCIHwSspw3PB7L8Gs/fDuBs3o7l9aHoGdyQAUSWpv4heeATvhX8kntgHaXaI8gCadSWxB8hjxptDrDRSkja4q1PvBuDvVhky+6Ovo5m7cbd+CZHdjNEjyPXdQjzpIrJDmItW4u16nnD0x4SjD+HteApC0DuVU6NxMPqVo0UdRLkTc1E3yexrsCyZwkq4CM1ah7PmOqLKZ5k8/CHCR4+QrAYtB+bQeuwN/cTT6TYcILsCLaeCR3tFZRyAuXgD9oo+opk0AVyQ9vnEutqj/yoYXWWKH7wTe/V7FZSg4ExRaQvoQe94N/aqd+Nu/Trh6P+j+q1vo3cdIH/1GkRmiHjKRMZTxlsrHSLNgk6w16sNJbMQHodw/CfIJ3+CyG9Fz30Ye9XNFK/9HEkLanfdSDRxK4k8ncbmchAG+HtB61L9Qrg/xWKvTVJXUfyGNLep7DIXbqHnfz3N+CdXEuyvYa+HpF5RdLaWOsCGZKZKUlNJRHgaspL6JPFMH0n6WXxI6tPIJjT+CWTLovOrz2ANLCM8MY9sCLWWjBQsSU+dichB9pKbqN/xIKZ9AL2nSlIZxVn7P2jc+4R444hHpU5SSyHIVxuRnnpZNK4ywd0K9qq0VpgQTT5J69FP0d65juDoFN6LH8ffc6vC2kjVDXMArPNVgyeKJfRcEeGouiKjcxcuzQCjF4we9YjcvKIoIToJ1tJe8n/wNVU8vd+8f9CsFDIPQ+Ga/4m1fBnhsdNEQLNA5EEmqryIgvobXdnX+Nm9hO17iE3wdpbQ3CV4e/8C0dlpvD7UpKmvOSWsFcvRu/oQtsAerqB3HUd6R5GttLPtUIbQhOiEyg5ZBG/ni7RfGEH6o+gZ5aDoJOCAnlEdobvx0ySttTR+/llV5Ky0QJ9tVgbimQmaj92VNiUx5tASrMEPqEKvmAXRBDhrfpdW/6eQrTTKf5MhFYmwL9Bw139ENYZp7Io8hCcPUL/n93E3TROOLcJY8H7MxddjLh4gOLyLxsPXowm1hr//X5F1n7gG2cs049zFtg2xDu55H8VcfB16cQsiX1J4J8HdBNKXJLX9RCteIBrbDmI70YnnQdQIRxVDCsYgeBzK/2WU6l+DvgCcERX9xgoDve8q3I03Ya+8jPFPX0zwwCxiGMyN527oRBaCV/dT+8FnFD00wb0AoumPkll/+xyTkSFoVh8y6kAG08jf0AEyUO92Nplodo+ipPMDw20jk53M3gMyPIwx+ATimS/hrFlDNLMb6asCLwpA3MJ/7uckTXAvxDiDY2uoBkmKDKXfvw9r4FKVCX5aZFLs1gDN0DB6hzH7h2HD75I0wVldJWnuIRrbhZbZR9I+iIgnyWz2CF8xSKIOrJGV2Os2Yg2/B720GHMh1O75FsHYk1iXqcjXTjV45+D9mm5iFJQtUqpOOjz8I+TI7SrK0iDRNMDW/k3UC81UxCMeDXHXTaOZfXNOSBqgl9bQ8Uch7R0PEFceR5QeofX4MzSf2o2zAZIpCB8D/UKw14EspXaCgb74TE9jQeGah3BGLiY8lm7ETOElVth8Cp9lqISqU94zOkvQdzH2eRcrprRGsZS4BqVPpGsJFQ2yDoEJrb1Vpv/y81BXTZqz8hyC3/yu2zCQpqleGMbonYNktnwTzUzxPj2wOBhHZKaQyWs4802yP80Af4fEW/Y9ih/6giIGpxrMJmiWQfaSq0C7iqQK1uKXCCt3EFf/L/F4HTkD0bNpDVuoAl2dTuM0ziVjUPrsZ8i/52K8E5AUwJ+G1sEmmXKM3e1Qr1tkimBmQddBNlJHSBUlcw4BpAAtSA/UTxvOBMJZmI5h8SKwHr8JTUisZQrhaganqd3ZNbgORvcIXZ87DFJDygSRXYie11RTlBZqvQOaz/wT0Ywq1G9ZKDy1j0ixM1mDma98BWv4MtyRjcRTSkREMNfbnIJxa+h8rKV/TBLchP/4B2jv2KFi5kmIusAYAFHCIDFTaKmCObwWfeOfMPX8PyKf/SHJgaco9pxgqAcO3wHjU/C2W3o4/mg/tXCE2NqIvfpSZHYEMw+WAD2cB1fJmXuPEqin2XPBEKxu72Dn0z9ADEM2A1VgGtDj18kA3cToWXi6Qw84HY0xmP0QHpuk9o1bIAdiWdqwnS0gigSRVRRahqcfRWXO6jWkBjbkroXZL4TMfG8L2sf+HKHfiNFnzckd0k/RIVHZjAS9czEdX/wlE6ODxEcqaHnVQScV8H6JgTOg7Gt5kPR7RHd301lrsnyNwB7cQmnplSz7nSWcHCkwvQ9WbaoxWRpldOcY9foDRAceohp00+gYoKafRzuzBJldjuaU0ISunJBictaA4QKs7YA1WXji7v9EOw/5LrA1ONGEqAmG/vqq7Km6dQrvTx2YKELruUeoff/jxHurWFeQ9hzijEPVTJBBRDyWNn1ZlSmamX5Wnk3FBckUGEvAvQlkFDH1Z5/CXvunWMveh168FKNnM3ppKXr5TPk8roC5JEP2fTdSv+2PEd0gelTgNB/GoPA8GHlY+W6I/H2s3ngFC0a+jDt4MWYaLA2gby0MrFXQ1TUMC4ZTnSqJSVp7aU7uYdZrMzGzk0Z8Eo8SibUYI7MI28xQMqHPhV4LuoFtz/49j3zrRQr9UHtVQdP0EFi5013pOTtfkdYkU0lESWMeJcyB99xP8X/xKmKT0oaif4Vka011v2lzJTIg2yuY+S5k3gWZi6AxA1oB9M5BEm8e88pD/PwszXtBdIB7iRIk41dArj1O87G/Qeh/g2aB3rkBa/FncN9+gwqS1F7ZAn3BRsSwoufz9mOQ+FCtwObV61l54XdxyhuJU+FvPttqpQ+Alz4AQuiQW00mt5oisGyuyW0hidGw5gTRlExxyA/ZfdfNdKwApwOMGDwHIhe0+HUa8DyEx16mett1xNPQ8Ynv4KzfSjSqNhpXoPQfv0l45EHaT+zCWqIMjceeB3HFXLbEVXBWX469YTN6x3aI1a1b/p23oHcUSOrzIQ8Sb6eSIfaBXjYoXHcb/N4Koqn7iBb8Nf6zk5iDEOx/jubDN5G59IY57WcuQ4P6rx4qGLTrMHzNZlZd/jSWOF2T38SdCqTrBqkioLIvc0bgnvpZAvbv+G/UR+t0rVb/tCXM+EqgtN+ADsp2lfDoLuIjUL3zWnrOG0VkNXWjFqj1yh+7l2gsjeQM+AfvQIZfUvOjU7xe0HnzNsITfw7JcUo3bMbZeD1ydt7lkwtRBfy9dyB6QNcge9H9uJsuI2mB5W0haX8Bo3gvetezWEt0xAc/pN4RzlOSY0gaD6D3gF48Y0s6g1cIrv7ObizN4dRVaCb9GQOFVBJPi/tbZnQyXXeicoRdf3cduYVguErtNTMwGkDbB0Oclm3NhZtwzr9qjnMLG+KpCYJDt6IvhGBXE6yTZC+6SkVtKpubi4qIzm4aP7kfLQdxdRI9O4z7thGllKZdqZ7TMHq3one8F6t/ZE5FPZWyRje0nvwus9//HpqAzk/fTvaSawkPK1iRAWiahT08gshcjjlwGUbvQuVEcaoIQ3DwEI1H/hAtI9VhanOPwaVfv40sRVpAkkC7sZ9jBw4gjAqloYDDz9lkOrso9A+iW8txHAM9dU70Jhieljpg+wP/mZPbobxUFWddQjuBRhksa96CGqDpaiNiHv5r5pzGry+E+r/8Lc6q63G3XEo8mV76VCB36SdoXvAT2rf/DAowU/so1upV2IMbiCqpWDaPMsf+PM7vgJ6H4OB2mts+jrUp1ZnGxohrqstPUp1JxsyprNI7Hamarjpf6TeZvf9KggMJRlfKDudDUOfgDZwc+xkTe+5kdMejFJcc5NX7wHThkq/CA38Eyy6HBRdAc3wRCzZtxHIvpTT4O7hdazh1PxG9Nn0HoAy88vI/c/jRn9O3SSmgAI4GzRD8COzk7C8BGGrRU2wnBpKMYooS9EUQj0Jz2/vRO36AcK8ATSfxFaaXP/kw0ewg0ehRZF/E9Hc3k9v0bZyLbkRkbdVcohwh0vuNxAPZrtHYdivB9OdJ+kBMpLXv4BeR4T9g9n8eo+/D6HkTzVV2Ja307jqT3owF4L14H/7eTxLbh0i6ILJ+JWANdv9oBZH/Kq0pqJ+E0hLIdKsDEgZke8DtVPQ4aJ1g5vAJIu+fmT4E2c6LyPZchVt+L9neDZi6gi6R1gN93mXTsUP/whPf+A9M74PcArUegBnCbBlkB/j+PAW2BXp4N7G1l8D3EbqSJcNgmsAHDDR7EsM5TGhc2aSx6ypka5DCtQNE0xpxTWIO9WKUJeGj6I4gTuyImSc+Tbb1ZzjnXw7ehZAsxujJ4u+rIsNDJHI70eSD+AcrmItwC+MEtbsAh8S4Hhm7u/H23ABPfxl3zTsR+mY0cxBjcRmZRES7x4lndxFED5JoO9AiLHeUYs9LaLqBlPpZwHD5HWBYEAUw9RL0bYTj2xQ2b/ks/Pg6GHoXlJfD7HEoL4MkAsNO0y+G+lFwS8N0rtiEWVxP3B6gONSJXw2IvCMYmfs58Mh9HLxPpaAwzoAm0TaxZh0SMS8DpIc0FpIYXQjzPJK4QZwY6LFHR/ZuimWNibEXiIMThLyDMBxE6C7SyCOct5GEY0gxhKx9E0dso9jdidfuwA9XEYQLkMZSZDAJMg+5jVD/MWidiMwQ+C8hdJf+gZfR2cuBlw6gaWC5HQj3QpLIIAq7ibUOpH8C9F7IbIBwDBonwCniWHvR7QGi9st0dGyn0NlFFIN2ljJroJsqdd5Uu56yBMMBy4B2BhqVfZilfdS238XsEVj1IZjcDUETBt8FdhbMHPhVVeE1IBQ4ts/ygQq6JonnqZaGadOo7WXi6At0961jeuI4M1NTdPcvY2h4KUnsM12J8dplEu9RBJAvd9CYmqavvIzRyQMkKSQa5S4kBUyzhmE9glb1ac8G6M4wmUI/zdnvkQQT6FYnebOA5+9BxhaFwmrq1cKc7pfEdTLmz7EsA83sYfTYITQKCL1EPP1XuFmL4tA7ELrEZBdROMus3ybwuvH8PHHooQnxVr4V8Xq+SLtc0wUrA04JopZyjl0EYapsmvtu0SlZQkMYCcPdTWxDw491dE3Ou+2NcbLFReW+kZEkDg4Vyt0+UDFMORCG5gavHf40DJIpx7EHpdUzLYSm54vlxblC30LDlEd7+pcGui4mojDJS8zAzWY2tZv6sTjOz2TyzbadCd1Wc/9ExqkMOUZI4DMu9KmSoBp0LRg2W43aTBjltwTBxMvZYqeVL3asqc1Unoa87Ra7Lolj7+GFA0ut6tRo2zArtlnI9BY7Fi7VzH3bpSTIZFZe2ajNPOPmZiq2m99omcbzulualL9ShP+9Rizo7fQp5QwagY0pfjXLHNc9zzRz76lWxh5ys5mg3D1w9fTE2Lbx44d/sXBo+Qct2701SeKNumE+ZFtOV77UdVkmV+yYrVa2lXuKZcty7242akUkH2jWay9ImUjbcd4Tx8Y9Odspa8LpKXb0X1wodxePHd7/jXyheL1lmNnJiZO3CWHnkzha4Xvtk6Vyz6ruRUMrnEx2T65Q2jpdGT9o2876BcuGi4166wHHzazpXTR0XjZfWj01cUIkJPrE6NEHM5n8hq6+wbcJIbQw9Lv9VnNS/JtnwFsZiYbpRizI+3ip/iXP8YUHGYXN0PdHJbIaBH6i6/qYadulTLZrcas+OxFFIaZljy4cWPax2tTktma9tlMY5nrf96a88dZ4qaP7D5uztW26buxyMtkVuXwxO1udns3mC1cncTxa6uq1bCdbazfrxFGw2DDNZzXNGIqCoIZGzrQsWSh1bqlXp9u24yy13UwxjuNm78KBrY3azPT05Nj4wNLzbqpOT/yyMn78pWa9VjZtpxJ7bZnLF98eBEFSm6nsWjC07H3eZMs4eeiVl03blWddf/17OEBgGyFEDZotD99rn/MJo/DE9OTo95vN+iFhmL5M5IO5QqmdL3WsrIwff1ImCULXXy519hhONtv02s2dvte6K46iI1LKY7br6pbtNJM4/kW5q9czLLvWbjWeLJY67Uyu4LebzRfrszNPtFuNh/L5kuHYmT1eu/WUm83juPnEspwp07KOSeRLuXxxdxyFjUZtZnepq9cJw/CJytjxXeXuPkfoxslWfXb3yWMH7ozC4IDve3sXDQ2vsmz7eByFB3KF8pQfeK+GQVsGnsf85/8PAFvN0pYLX3kVAAAAAElFTkSuQmCC'alt='rus' width='96'></div></a>";
 }
 if (yearsSinceManufacture > 10) {
   plan_b += "<center><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></div></center>\n ";
 }
 
   plan_c += "<center><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></div></center>\n ";
   
   plan_d += "<center><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></div></center>\n ";
} else if (/^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{3}[0-9]{3}$/.test(patente)) {
 resultado += "AUTO\n";
 
 if (yearsSinceManufacture > 35) {
   plan_a += "<div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='agrosalta'></div>";
 } 
 if (yearsSinceManufacture <= 35) {
   plan_a += "<a href='http://201.216.251.171:8090/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='agrosalta'></div></a><a href='https://netprod.providencia.com.ar/netprod/Account/Login?ReturnUrl=/netprod/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='providencia' width='96'></div></a><a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='rus' width='96'></div></a><a href='http://productores.nivelseguros.com.ar/nivelsys/loginproductor.aspx' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='nivel' width='96'></div></a><a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAeCAYAAADTsBuJAAAACXBIWXMAAB7BAAAewQHDaVRTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABCwSURBVHja7Jp7kN1VfcA/55zf47527+4m2ewmJiQQCLAJCQGBJIAiovKotiqKNlgsVNrx2VoFcbSCI2LVaqFOrfhCqeMgVmQEsbU8rGQaSEgC5CEkxCS72b37urt737/f75zTP+7Z5C4QRjZOHWb8zdz5nef3d+73/TjCWssfnz/cI/+Igj/s433rO9892tyfAxcB9d830YUQMkmSz1lj9iFASImQAiwIIRYLxDJAv4KYePTq91711KwIIIQ42tw7rbV/8nKAGWtJBR7tuQDl4MbaUKpERLFmxreEuNMKsQ8EUkgUAtucvha44RXGyFuAM2dFgJeYO/S7ArFAEsd0d2Wp1DWPPH6QQrGOpySLurMsX9LJwu4cY5N1ao1kmji1I7sBIaBpj+JXoCaZtZbwjkn2pKQRRdQqFVb1ncDmXQVuvXMThYk60GRn3xMsnJvltWsWcuFZi+jpSjM80eAlbH9NSomU0gIYYzDG4HkvPGqSJAghUEo1SWktSZIgpUQp9YK92hiUlC+A0aT/ETjT49ZalFJIt8cYizEv0IwCKP2/EkAIgdaa8fFx0uk0l11yEQeG6nzq1h9ilWT+3BxYi3BqaWiywTfvf4afbSnwlxcv44LT5nOoWMWYJtJ8TzFnXk8TCZ66rVatfa9arUYA6XRaZbJZxsfGsda0nEHS1dVFFDUolUoGsEEQqra2Nur1GpVKhTCVoi2XY2xsDIBsNku5XJ4BI9+RJ4ljhJSUSiWLtVoppdra2oQF4jimWqkYwKZSKZXJZBgdHaVWq02rVHVEmmdBgKnJCRCSTCZDEAQYY16C4wWBL8mkPMIwxasWzGft2vV0dHRw5cduIKpUWHz8ArTRgMAIgVWKXD4k2+kxNJVw8917qWvJmiXZsYlShJIKY6o8uvGnWGupN+rVbdu2VUeGhwHo6enhuOOWsHnz4zPOJqXk7LPPoVAosHfvHgDacm1ccuml7Nmzhy2bH2dudzerV6/m4YcexhjD/J75DA0OzmCkFStW8toLLuCRhx9m+/ZtCCHwlMfq00/n9DWnc/9999PffxAQ5PPtrD/3XM4//zUsWrSY0dERKpXKDMl52cy8ZfsOJoujPPvssxSL4+RybaRSaZSSX683omt1ErF4QRdSCErVmJHxMs/1T3LKqSt534aLAdjxzABnveU6Mpk0YaCwQmCVj040Sawxno9WPjKbpRZZjJD05uT74ji53e/qpTb0G0Yfuq31XJcDnwYC4LPAncBfAWuAbiAHPAx8HjgL+AowH/g68CVgEfAPwA+AB4F/dLbln4C/B3qABcAm4LvAc8AS4EbgAuDHwHVABJzmvrMS+Ffg821tbbzxTRfz7g0bCHyfgYEB3nfN1bOTgNNPOxUBnLpyNc/seprBQ4cYKgwRx0nS2dFGJj+fu/9rB6NTMSPjFQrjNQaGp9DljWR7l3LFhSdz/8bdNOoN8h1taKWw0iOOYpKOOWQWLULHGhvF2MIQbbkUWirGEvsN6flPioRNtC1A+iEmbiCVWg/cBWwHngG+D/zCucWvceMTQIdDzibAAAeBL1pr+4FNQoirgVFHgI+5//s94HrX3gm8AXij0fp1QsqtQogOYC/wEWttn7X2cinldrf+LuBmC2OlUukbd//oLjZufJTrP/FJTjrpxNnb0WJZM1ZO6Ohs57z163jH5W/nooveQPe8OVxyyaVc8Y638vjuEvf/6DF2H5ikGiX0zs/jpxSf/+d/595B2DlYQgUK7QUkKqQufGwqy7JXr8ZqQzw5Saq3h/SyZYgkIQh8OtrSdLbnHmmXCXN6jiez+IzpM81x73bgMYekkRZP4ylgq+PQ97qxRY6DPymEKAohpmGMuHcJGHYcDXAPcC5QBQakUq9xyP8UsAy4VwhxkZTyLCBxew4AGwTcKZVCKMWhgQFu/MynGS8WjyUoAimgXtdUYw2w6JTlJ33hig1XXhnme4iBj37gbXjdWbJpj9BXWK2Z39tN/67d3PKjx9iR6yGbyRLLgMgLiJCke3tpjBUpP7MHGTXQT21H5rIEJywj0AalPPC8MFbqAxUL/imvRwDWmPuAjwC7gJuAnwArgH535uVAn2uHLS7zRcC7gfNbxkdbPOUM4Dti/Ckw7sbucKoOp4paXfARJ2XfdGe6070RgFSKsdFRrnrPlceWihCApwRKyL+ZrOkD/eONj/+2UG/fN1ziiYM1+s5czcknL6U4PtFEkhQYzyMIU+zYtpV9qXZsrpNYeqB8wjCkkRiGvTTpzg78dIagPY/XP4DK57G5LImnqHsecTZzmw7VHDI5hyr7euAa4FbgQ0AWWNvCiXc7hKwD9rixjzsp6AMuBCbd+F8AlzlpqjnV1QY8BBzv1twMPOnaNwKXAlc7omlnD/YDb3VrPjMDgUoRNRqzT0V4UrzawjmN2GwoNvRZpbqmEmuqUUI1MlSiOrl5c1l91uns3L0X7XkYoTBCkXR14+3dQ7jsRJKeXtTYGCrwkUpBtYIKAmRPD3J8HJFKYRoNqNdJFiykcWgAG4QYpYDoJrl4xfu941YR79++RzTVzQPujI86JJwGVIAvuPEHHFLWtoxtBYac9NwGfNAZ1THgSqeGqsAOYB/wBHCS4/zrgVuAnznJubZF3X3Wwd8N/N0LuPhYvKChica7E8O3JmtxqtxIqMaGSmSoxoZqZKjGGuunqNQb3HbjlxibLBO259FCYZWHLU2ROm0VMgxJdjyN6uxECoHSGtnZhchmsYUCOp0mxmLb84QnLae0aydGgPQ9pFTYdFe3TZKR2vc/jB58FqHUKU41TBvBjJPY2KkSgGmnfgVQBAacxFTc+HwnGU86/S/dfM1JlADyTmKsmzvZpRZan17nNW05GiJ1ksxOBR0cr/1goFhfWyjFFMrN33A5ZqQcM1qNGa1q9o9MUkm1s/z886nGllgF4PsozyPo6sKOjKDmzcOf141vIfB9VDoN1mJ8j3omQz0IiNIZatUqCEH6uMUIY/CDkDAMSevyPbklJ5Ne86bp5MSuFuTjOLcMNNy73DL3tEM+LcgHKACbW4yvcTYgabENE0fyIVSOguTBl0L+MWVD+ycjhBTbIm03lht6XTU21GJDLTFUE0s1MVQTQzI2Rbj0eLIdHU2b4QdIpRCeQtRqiMIQwQnLYNdOjLUkUqKlQAUhURBgfQ+rFGBJylOkunuahFMKL/DxpFynPLmmNLT3CRddHmYu9/YdopQzsqUWxPlurNwS4SctqQLVotOf//gt+aesI1bcYiPTjujCwbQvsm/2RnigHDEw1aBQjr88Vk0YqSYM1478CnXNYGR4bqLEcMccOlb0IeMIFYaowMP3PMJ8B2poCDsxgenrI5nXTdLZhXfCMiJAS9mUGN8nnU5hogSdypJZuJDQ8/A8f4/I9344Ht43UNu98WzR1NWJ++0FTgFOdF7JZcC/Oe4GWO88mje7/q+cDr/A9f+aI/Cs0/Gdbu49bu5/Xf9C9411LRJ0vfvmMPAON/4Rt+6Xx0yA/cWEfcWE/qnkP0brZt9YPWG0rhlpGAqxYTA2HIoNh6KEQq2OWLOGsLMTX2sCz8fzPKynSHI56lNFahMT6O5u/CVLSLQhLpdQmTR+EBAGAUEQkvEE5USMT7XPf8gLw6uM4UST6ry1+JMvFnRlYp5QqssFTdc4b+UT7rwdwBTwU2Cem3uni4zvc9x6ntPrH3Z7uhzC7wV+7ryca93cBx3Ms13/Ebf3Qjc+1xls7foZt+6qlnVzj4kAQ5GmEGkG6wlD9eT9hchwKDL0x5r+WDMQa4bjhGpi0FMVRL6TcNVqZNTAKI/I96kHAfUwJGrPEyUJ9f6DlPc9R6MwSJDJkEqFhEFA6PtMeHnWpkrcJDdeHOrodb+NUneo7qXUd/2K0pb7EUJMB1x9wJtc+4sticMU8EPX/hfH4Q84Q/p9p69vBt7SEkBN1xkuaYklcKmNXzjp+FsHY9gR/lNuzU8cgVthrXIEt8CfHZMN2DtxJC0vBD8n9OIS+JXE0DAGbUFaULiIrVRCLD+ZpFSmcXA/Nt2J9hRWKqyUiEAeTgd7nodSEiUVSjbTusoLeVXGcJ49WG+IOt9qO55yqcjEjz/XVNhH0sULXd5n2gOquvY0x00CF7v2J937bc6lnA6sehxBcN7NtIF+xrmf0qkvz6UrvuJiiu86d/NJp/8Xun1DwDmuPebswkeB22ctAQdqmgM1zYG65kAlob+urxlLNNVEYw149nmFY62xcYx/xhmIpcdTjxoYqSDwmjYhCAjDpmcT+AGBH+D7AV7gU/KzzMsKVqTLbI870gtEldtWluj79S00Bn4z7U9n3ZdusNYudu0vt3DhUqM11tqvHS4IWfsEsMG151prN7ipW4BpGA859TWdirjPrT/TWlt2ruZl1to7Dlf4jPmq0RrnggK83qkyrLVrnVe13Kmi2UlAXflHekpgI/s9a+WFRvjvyRE1I9+ZxQCIIrCQPW0Vcn87jcIQygr8IESpJrcrJRFSMZ03iaXHpMzx5txBukSDIetRsz49nk+baHqJ7s/+BvgO8KwTzNuBbc6wftshEmvMrbbp5+9x6yK37wZgyDYzoMIZ0tudHSgDX3Uu7jYXUX8BWGKb2dO8g3Wdywn90J3rFy6aHnbJvf8Evm2bKuxDLUzz8gOxE7+2dWZtx1g8JUgF5n92m/y5WRJyxGieVzu2FqEUMpVCT06ihwaRUQPP8xCej/H8po2QASWVoqZCNmT2867UPoZNmro251hjNuVybRw8eICHHvxvvCCgUi4zPDRE74IF9PT2sHXLE4SpFOl0molikbnz5nLxpZfy+KbH2LVzJ37gc+555/H0008zOjzCipUrWbjoVTz4y18SR3Gz2O+qZZ7nc2pfH2Njowwc7Ecqxbr16xkbG2XXjp10z+/m1L4VPPrrXxM1Gpzx6jM5aflyfvbTeymXy/iBTxzFzJk7l/XnruexTZsYGhwincnwxObNsyPA7d+540XKZIYM8S0PmEXX3WNOYMIG9IgKPvawNBgEFoitJA5SREZgSiVkFOFhSGFIK0unr5nvRaz0J1jnDVM2HpHw0Do5xxizyVqL8hTpbBYhJVIIJbGhlDIRUoo4jq0UAqkUSZJYz/OEThIhpbTGGAsI3/eFNsZqra1SSgghhNHampl1TyuFEGEqJeIosonWVri9xphmXwjhe55IksRaa5FSoo0RnlKH56211lNKSCmb+4xWwsr4XZe/fVahsJcWL9xnrSBCdVwhnmWVGuces5Sn7BzG8F0kZAkwBGjaRcycZIR2kdDeoemkQd7UyZsa7SJijmjQJRtoKxgzIRqBalFqQkiwlkalivvTHxBC3mSxMdbyYrc2mpfJBNNTVVs9vG76otnRbntUShUQ4rA8V211xvpqyzdfCpY9ss53KunyWRGgYY+aSFK/pZ2FlPio3MpO5nDA5qihSKPJE9EmIvJEdNAgTYLSFmhWvBIpiZBEVlLQqZb0axN5xhhhjHGF76AZTxiLxc611rTPRPaL38VonXr+upe88Wct9kWJ+vJgHSZQM9/0ey/KpxWWCUIEsIRJThHjCCwGgUaQ0ERyA0W1FdTvcNtRSjmD8tPE4BV4W88ew+2So24UcJeQdt80Oiv4VPFneEV2RmHB/q6nFdYaFvT27Pf9pgdWLE5QLBbxfQ+EeFAK2fYKuhmnXLQ8OyP8x8u5f9jn/wYAwn1lj1bQZYAAAAAASUVORK5CYII=' alt='rivadavia'></div></a><a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a>";
 } 
 
 /////////// PLAN B //////////////

 if (yearsSinceManufacture <= 19) {
   plan_b += "<a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_b += "<a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='rivadavia'></div></a>";
 }
 // if (yearsSinceManufacture <= 20) {
 //   plan_b += "[ORBIS]<br>";
 // }
 if (yearsSinceManufacture <= 23) {
     plan_b += "<a href='https://netprod.providencia.com.ar/netprod/Account/Login?ReturnUrl=/netprod/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='providencia' width='96'></div></a>";
   } 
 if (yearsSinceManufacture <= 25) {
   plan_b += "<a href='http://productores.nivelseguros.com.ar/nivelsys/loginproductor.aspx' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='nivel' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 30) {
   plan_b += "<a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='rus' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 20) {
   plan_b += "<div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='mercantil' width='96'></div>";
 }
 if (yearsSinceManufacture > 30) {
   plan_b += "<center><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></div></center>";
 }
 
 /////////// PLAN C-FULL //////////////
 
 if (yearsSinceManufacture <= 14) {
   plan_c += "<a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_c += "<a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='rivadavia'></div></a>";
 }
 // if (yearsSinceManufacture <= 15) {
 //   plan_c += "[ORBIS]<br>";
 // }
 if (yearsSinceManufacture <= 18) {
   plan_c += "<a href='https://netprod.providencia.com.ar/netprod/Account/Login?ReturnUrl=/netprod/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='providencia' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 20) {
   plan_c += "<a href='http://productores.nivelseguros.com.ar/nivelsys/loginproductor.aspx' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='nivel' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 22) {
   plan_c += "<a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='rus' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_c += "<div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='mercantil' width='96'></div>";
 }
 if (yearsSinceManufacture > 22) {
   plan_c += "<div style='margin-bottom: 8px'><center><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></center></div>";
 }
 
 /////////// PLAN TD //////////////

 if (yearsSinceManufacture <= 8) {
   plan_d += "<a href='https://self2.fedpat.com.ar/self/homeWin32.do' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='fed_pat' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 10) {
   plan_d += "<a href='https://www.sistemas.segurosrivadavia.com/sistemas/login/login.php?u=P' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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' alt='rivadavia'></div></a>";
 }
 if (yearsSinceManufacture <= 6) {
   plan_d += "<a href='http://productores.nivelseguros.com.ar/nivelsys/loginproductor.aspx' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='nivel' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_d += "<a href='https://netprod.providencia.com.ar/netprod/Account/Login?ReturnUrl=/netprod/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='providencia' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_d += "<a href='https://sis.rus.com.ar/portal/' target='_blank'><div style='margin-bottom: 8px'><img src='data:image/png;base64,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'alt='rus' width='96'></div></a>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_d += "<div style='margin-bottom: 8px'><img src='data:image/png;base64,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'  alt='mercantil' width='96'></div>";
 }
 // if (yearsSinceManufacture <= 10) {
 //   plan_d += "[ORBIS]<br>";
 //libra }
 if (yearsSinceManufacture > 10) {
   plan_d += "<center><div style='margin-bottom: 8px'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZpJREFUSEu1VVFygjAQ3Y0DwzHsSdSfqreQk1hPoj2Ftj/Sk5TegglDtrMU0iSEBNoxfzCb95L33m4QHrzwwfgQJbhm2VootSaiFSKuAaAkgAIBvpQQxb6qitAhRwmuWbbEpjl3oCGMUgmx2VdV6SvyEryl6QsAHGfIx+CvWyl5n7UGBH8ANwFPLolFwLIIpT5nnNwtZbly0xeL4JYk9xHNWYKlg+b7xyXlVsqnvlYTvCfJgRDPAw2J8maxKIRSd4OkPSmny+dVZ3qbLk0wor1OSCcfk0AvQ0BS7YUmuKXpGQEOHv0tEr4Faxzyi4iKXV1v3Buwua7OPZ+V9Qlh0D6YEsUIdDoMucYOBFspW+xfiQIJMjXnTdy1IRICuOykzKeYzIbyGDA1d4339c3Q5G6otSlx1kkJcXEasCVBpY6+YCBR/lzXF+sGM4ZbsNHNBFkE/DEhHdEpYjbZgIB/jHV0FPmnIDzsjFtww80Z115w7w36k87wZP6DY5Jwdy+aZqkQVwjAww2IqETEj389mRM1j5ZFH/0oQqTgG21G/hkw2eVPAAAAAElFTkSuQmCC'/></div></center>";
 }
}

else {
 resultado += "Patente no válida\n";
}
document.getElementById("tipo_veh").textContent = "";
document.getElementById("tipo_veh").insertAdjacentHTML('beforeend', `
 <div>
   <div class="row">
     <div class="col-md-12">
       <h4></h4>
       <table>
         <thead>
           <tr>
             <th></th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td></td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
 </div>
`);

document.getElementById("planes").textContent = "";
document.getElementById("planes").insertAdjacentHTML('beforeend', `
<div class="mt-2">
   <div class="row">
     <div class="col-md-12">
       <h4>Coberturas Permitidas:</h4>
       <table class="table table-striped">
         <thead>
           <tr>
             <th>Plan A</th>
             <th>Plan B</th>
             <th>Plan C-Full</th>
             <th>Plan TD</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>${plan_a}</td>
             <td>${plan_b}</td>
             <td>${plan_c}</td>
             <td>${plan_d}</td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
 </div>
`);

console.log(resultado)
}


/////////////////////////// AUTOCOMPLETAR MARCA /////////////////////////////

// Función para obtener y mostrar sugerencias
function autocompletar() {
 var inputDato = document.getElementById('marca').value;

 google.script.run.withSuccessHandler(actualizarSugerencias).obtenerDatos(inputDato);
}


function actualizarSugerencias(datos) {
 var sugerencias = document.getElementById('sugerencias');
 sugerencias.textContent = ''; // Limpiar opciones anteriores

 var datosUnicos = [...new Set(datos.map(dato => dato[0]))];

 datosUnicos.sort();

 datosUnicos.forEach(function(dato) {
   var opcion = document.createElement('option');
   opcion.value = dato;
   sugerencias.appendChild(opcion);
 });
}






////////////////////////// CUIT AUTOMATICA //////////////////////

function calcularUltimoNumeroCuit(num = document.getElementById("cuit_s").value) {
 
 var dni = document.getElementById("dni").value;
 if (dni.length == 7) {
 dni = "0" + dni.toString()
 } else {}
 // var num = document.getElementById("cuit_s").value;

 var cuit = num.toString() + dni.toString();
 var multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
 let suma = 0;

 for (let i = 0; i < cuit.length; i++) {
   suma += parseInt(cuit.charAt(i)) * multiplicadores[i];
 }

 var resto = suma % 11;
 
 if (resto === 0) {
   document.getElementById("cuit").value = num + dni + (resto)
   return 0;
 } else if(11 - resto > 9 && num !== 23){
   calcularUltimoNumeroCuit(23)
 } else if(11 - resto > 9 && num !== 24){
   calcularUltimoNumeroCuit(24)
 }  else {
   document.getElementById("cuit").value =  num + dni + (11 - resto)
   return 11 - resto;
 }
}

////////////////////////////////////////////////////////////////

   var today = new Date();
   
   // Establecer la fecha de vigencia como la fecha actual
   var vigenciaDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
   document.getElementById('vigencia').value = vigenciaDate;
   
   // Establecer la fecha de hasta sumando 12 meses a la fecha actual
   var hastaDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());
   hastaDate = hastaDate.getDate() + '/' + (hastaDate.getMonth() + 1) + '/' + hastaDate.getFullYear();
   document.getElementById('hasta').value = hastaDate;


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
////////////// MOSTRAR FOTOS AL BUSCAR PATENTE /////////////////////

function mostrarFotos_veh(data) {
   var fotosBase64 = data.fotosBase64;
   var vehiculo_vista = document.getElementById("vehiculo_vista");
   vehiculo_vista.innerHTML = ''; // Limpia la galería antes de mostrar nuevas fotos
   if (fotosBase64.length > 0) {
       fotosBase64.forEach(function(foto, index) {
           var col = document.createElement("div");
           col.classList.add("col-md-3", "mb-3");

           var imgContainer = document.createElement("div");
           imgContainer.classList.add("position-relative");

           var img = document.createElement("img");
           img.src = foto;
           img.classList.add("img-thumbnail", "rounded");

           img.onload = function() {
               // Configura el porcentaje de reducción deseado
               var reductionPercentage = 15; // Porcentaje de reducción (por ejemplo, 50% para reducir a la mitad)

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
               vehiculo_vista.appendChild(col);
           };
       });
   } else {
       vehiculo_vista.innerHTML = "";
   }
}


function mostrarFotos_reg(data) {
   var fotosBase64 = data.fotosBase64;
   var registro_vista = document.getElementById("registro_vista");
   registro_vista.innerHTML = ''; // Limpia la galería antes de mostrar nuevas fotos
   if (fotosBase64.length > 0) {
       fotosBase64.forEach(function(foto, index) {
           var col = document.createElement("div");
           col.classList.add("col-md-3", "mb-3");

           var imgContainer = document.createElement("div");
           imgContainer.classList.add("position-relative");

           var img = document.createElement("img");
           img.src = foto;
           img.classList.add("img-thumbnail", "rounded");

           img.onload = function() {
               // Configura el porcentaje de reducción deseado
               var reductionPercentage = 15; // Porcentaje de reducción (por ejemplo, 20% para reducir en un 20%)

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


function eliminarArchivo(index) {
   var input = document.getElementById("fileInput_veh");
   var files = Array.from(input.files);
   files.splice(index, 1); // Elimina el archivo en la posición 'index'
   var nuevoFileList = new DataTransfer();
   files.forEach(file => nuevoFileList.items.add(file));
   input.files = nuevoFileList.files;
}


function eliminarArchivo_reg(index) {
   var input = document.getElementById("fileInput_reg");
   var files = Array.from(input.files);
   files.splice(index, 1); // Elimina el archivo en la posición 'index'
   var nuevoFileList = new DataTransfer();
   files.forEach(file => nuevoFileList.items.add(file));
   input.files = nuevoFileList.files;
}


function mostrarMiniaturas_veh() {
   var files = document.getElementById("fileInput_veh").files;
   var vehiculo_carga = document.getElementById("vehiculo_carga");

   vehiculo_carga.textContent = ''; // Limpiar galería antes de mostrar miniaturas

   Array.from(files).forEach((file, index) => {
       var reader = new FileReader();

       var imgContainer = document.createElement("div");
       imgContainer.classList.add("position-relative", "col-md-3", "mb-3");

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
           eliminarArchivo(index); // Elimina el archivo del input de carga fileInput2
           mostrarMiniaturas(); // Vuelve a mostrar las miniaturas actualizadas
       });

       imgContainer.appendChild(deleteIcon);

       vehiculo_carga.appendChild(imgContainer);

       reader.onload = (function(img) {
           return function(e) {
               img.src = e.target.result;
           };
       })(img);

       reader.readAsDataURL(file);
   });

   document.getElementById("subir_foto_veh").style.display = 'block';
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

//////////////////////// SCRIPTS DE FOTOGRAFIA Y OCR /////////////////////////



document.getElementById("bt-fotos").addEventListener("click", function(event) {
 event.preventDefault();
 
 var patente = document.getElementById("patente").value;
 var take_photos = document.getElementById("take_photos");
 
 if (patente) {
   if (take_photos.style.display === "none") {
     take_photos.style.display = "block";
   } else {
     take_photos.style.display = "none";
   }
 }
});
var video = document.getElementById("videoElement");
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var imageContainer = document.getElementById("imageContainer");
var photos = [];
var facingMode = "environment";

navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } })
 .then(function(stream) {
   video.srcObject = stream;
 })
 .catch(function(error) {
   console.error('Error al acceder a la cámara:', error);
 });

function capturePhoto(event) {
 event.preventDefault();
 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;
 context.drawImage(video, 0, 0, canvas.width, canvas.height);

 // Agregar fecha y hora actual en el lienzo
 var fechaHoraActual = new Date().toLocaleString();
 context.font = 'bold 35px arial black'; // Fuente más gruesa
 context.fillStyle = 'white';
 context.strokeStyle = 'black'; // Color del borde
 context.lineWidth = 2; // Grosor del borde
 context.textAlign = 'start';
 context.fillText(fechaHoraActual, 10, 30);
 context.strokeText(fechaHoraActual, 10, 30); // Agregar borde negro

 var imageUrl = canvas.toDataURL("image/jpeg");
 photos.push(imageUrl);
 showPhoto(imageUrl);
}


function showPhoto(imageUrl) {
 event.preventDefault();
 var img = new Image();
 img.onload = function() {
   imageContainer.appendChild(img);
 };
 img.src = imageUrl;
}

function sendPhotos(event) {
 event.preventDefault();
 if (photos.length > 0) {
   var pat_len = document.getElementById("patente").value;
   var mar_len = document.getElementById("marca").value;
   var mot_len = document.getElementById("motor").value;
   var cha_len = document.getElementById("chasis").value;
   google.script.run.sendEmail(photos, pat_len, mar_len, mot_len, cha_len);
   photos = [];
   imageContainer.textContent = "";
   document.getElementById("take_pict_menu").style.display = "none";
 }
}

function switchCamera(event) {
 event.preventDefault();
 if ("mediaDevices" in navigator && "enumerateDevices" in navigator.mediaDevices) {
   navigator.mediaDevices.enumerateDevices()
     .then(function(devices) {
       var videoDevices = devices.filter(function(device) {
         return device.kind === "videoinput";
       });

       if (videoDevices.length > 1) {
         facingMode = (facingMode === "user") ? "environment" : "user";

         navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } })
           .then(function(stream) {
             video.srcObject = stream;
           })
           .catch(function(error) {
             console.error('Error al cambiar de cámara:', error);
           });
       } else {
         console.log('No se encontraron cámaras adicionales.');
       }
     })
     .catch(function(error) {
       console.error('Error al enumerar los dispositivos:', error);
     });
 } else {
   console.log('La función enumerateDevices no está disponible en este navegador.');
 }
}


       var canvas2 = document.getElementById('canvas2');
     var resultado = document.getElementById('resultado');
       var currentCamera = 'environment'; // Valor inicial de la cámara trasera

       function tomarFoto() {
   event.preventDefault();
           // Capturar una imagen del video y mostrarla en el elemento canvas
           canvas2.getContext('2d').drawImage(video, 0, 0, canvas2.width, canvas2.height);
         extraerTexto();
       }

function extraerTexto() {
   event.preventDefault();
   // Obtener los datos de la imagen del canvas en formato base64
   var imageData = canvas2.toDataURL();

   // Crear una imagen temporal para cargar la imagen del canvas
   var img = new Image();
   img.onload = function() {
       // Crear un nuevo canvas para manipular la imagen
       var tempCanvas = document.createElement('canvas');
       var context = tempCanvas.getContext('2d');

       // Ajustar el tamaño del lienzo temporal para obtener una imagen de mayor calidad
       var scaleFactor = 4; // Ajusta este valor para obtener el tamaño deseado
       tempCanvas.width = img.width * scaleFactor;
       tempCanvas.height = img.height * scaleFactor;

       // Dibujar la imagen en el nuevo canvas utilizando la interpolación adecuada
       context.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

       // Obtener los píxeles de la imagen
       var imageData = context.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
       var data = imageData.data;

       // Recorrer los píxeles y modificar el fondo a blanco
       for (var i = 0; i < data.length; i += 4) {
           // Verificar si el píxel es parte del fondo
           var r = data[i];
           var g = data[i + 1];
           var b = data[i + 2];
           var alpha = data[i + 3];

           // Si el píxel no es parte del fondo, establecerlo como blanco
           if (r > 100 && g > 100 && b > 100 && alpha > 100) {
               data[i] = 255;     // Rojo
               data[i + 1] = 255; // Verde
               data[i + 2] = 255; // Azul
               data[i + 3] = 255; // Alfa (opacidad)
           }
       }

       // Establecer los píxeles modificados en el canvas original
       context.putImageData(imageData, 0, 0);

       // Obtener la imagen resultante en formato base64
       var modifiedImageData = tempCanvas.toDataURL();

       // Mostrar la imagen modificada
       mostrarImagenModificada(modifiedImageData);

       // Extraer el texto utilizando Tesseract.js
       Tesseract.recognize(modifiedImageData, 'eng', {
           tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
           preserve_interword_spaces: 1
       })
.then(function (result) {
 // Obtener el texto reconocido
 var texto = result.data.text;

 // Buscar las palabras clave y sus valores
 var marcaIndex = texto.indexOf('MARCA:');
 var modeloIndex = texto.indexOf('MODELO:');
 var motorIndex = texto.indexOf('MOTOR:');
 var chasisIndex = texto.indexOf('CHASIS:');
 var cuadroIndex = texto.indexOf('CUADRO:');

 // Obtener los valores correspondientes
 var marca = getTextAfterKeyword2(texto, marcaIndex, 'MARCA:');
 var modelo = getTextAfterKeyword(texto, modeloIndex, 'MODELO:');
 var motor = getTextAfterKeyword2(texto, motorIndex, 'MOTOR:');
 var chasis = getTextAfterKeyword2(texto, chasisIndex, 'CHASIS:');
 var cuadro = getTextAfterKeyword2(texto, cuadroIndex, 'CUADRO:');

 // Verificar si se encontró la palabra "chasis" o "cuadro"
 if (chasis === '') {
   chasis = cuadro;
 }

 // Establecer los valores en los campos de entrada (inputs)
 document.getElementById('marca').value = marca + " " + modelo;
 document.getElementById('motor').value = motor;
 document.getElementById('chasis').value = chasis;
})
           .catch(function (error) {
               console.error(error);
               alert('Ocurrió un error al extraer el texto de la imagen.');
           });
   };

   // Cargar la imagen del canvas en la imagen temporal
   img.src = imageData;
}

function getTextAfterKeyword(texto, keywordIndex, keyword) {
   event.preventDefault();
   // Verificar si se encontró la palabra clave
   if (keywordIndex !== -1) {
       // Obtener el índice después de la palabra clave
       var startIndex = keywordIndex + keyword.length;

       // Obtener el texto después de la palabra clave
       var value = texto.substring(startIndex).trim();

       // Verificar si hay un salto de línea o espacio
       var nextLineIndex = value.indexOf('\n');

       // Obtener el índice del siguiente espacio o salto de línea
       var endIndex = Math.min(nextLineIndex);

       // Si se encuentra el siguiente espacio o salto de línea, truncar el texto
       if (endIndex !== -1) {
           value = value.substring(0, endIndex);
       }

       return value;
   }

   return '';
}




function getTextAfterKeyword2(texto, keywordIndex, keyword) {
   event.preventDefault();
   // Verificar si se encontró la palabra clave
   if (keywordIndex !== -1) {
       // Obtener el índice después de la palabra clave
       var startIndex = keywordIndex + keyword.length;

       // Obtener el texto después de la palabra clave
       var value = texto.substring(startIndex).trim();

       // Verificar si hay un salto de línea o espacio
       var nextLineIndex = value.indexOf('\n');
       var nextSpaceIndex = value.indexOf(' ');

       // Obtener el índice del siguiente espacio o salto de línea
       var endIndex = Math.min(nextLineIndex, nextSpaceIndex);

       // Si se encuentra el siguiente espacio o salto de línea, truncar el texto
       if (endIndex !== -1) {
           value = value.substring(0, endIndex);
       }

       return value;
   }

   return '';
}



function mostrarImagenModificada(modifiedImageData) {
   // Obtener el elemento de imagen modificada
   var imgModificada = document.getElementById('img-modificada');
   // Establecer la imagen modificada en el elemento img
   imgModificada.src = modifiedImageData;
}


////////////////////////FIN DE SCRIPTS DE FOTOGRAFIA Y OCR /////////////////////////

//////////////////////// FUNCION PARA COMPROBAR RAMO ///////////////////////////

function compruebaRamo() {
 var ramo = document.getElementById("ramo_1").value;
 var patenteInput = document.getElementById("patente");

 // Oculta todos los mensajes inicialmente
 document.getElementById("mensajeBici").style.display = "none";
 document.getElementById("mensajeCasa").style.display = "none";
 document.getElementById("mensajeComercio").style.display = "none";
 document.getElementById("mensajeAP").style.display = "none";
 document.getElementById("mensajeCaucion").style.display = "none";
 document.getElementById("mensajeRC").style.display = "none";
 document.getElementById("mensajeTransporte").style.display = "none";
 document.getElementById("mensajeTecnico").style.display = "none";
 document.getElementById("mensajeAD").style.display = "none";


 // Mostrar el mensaje correspondiente según la selección
 switch(ramo) {
   case "BICI_":
     document.getElementById("mensajeBici").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "BICI_2_":
     document.getElementById("mensajeBici").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "BICI_3_":
     document.getElementById("mensajeBici").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "CASA_":
     document.getElementById("mensajeCasa").style.display = "block";
     patenteInput.placeholder = "Ingrese Direccion";
     break;
   case "COMERCIO_":
     document.getElementById("mensajeComercio").style.display = "block";
     patenteInput.placeholder = "Ingrese Direccion";
     break;
   case "AP_":
     document.getElementById("mensajeAP").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "AP_2_":
     document.getElementById("mensajeAP").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "AP_3_":
     document.getElementById("mensajeAP").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "CAUCION_":
     document.getElementById("mensajeCaucion").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "RC_":
     document.getElementById("mensajeRC").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "TRANSPORTE_":
     document.getElementById("mensajeTransporte").style.display = "block";
     patenteInput.placeholder = "Ingrese Patente";
     break;
   case "TECNICO_":
     document.getElementById("mensajeTecnico").style.display = "block";
     patenteInput.placeholder = "Ingrese N° Serie";
     break;
   case "AD_":
     document.getElementById("mensajeAD").style.display = "block";
     patenteInput.placeholder = "Ingrese DNI";
     break;
   case "":
     patenteInput.placeholder = "Ingrese Patente";
     break;
   default:
     // No hacer nada si la selección no coincide
     break;
 }

}

// Ejecutar la función cada vez que cambia el valor del select
document.getElementById("ramo_1").addEventListener("change", compruebaRamo);


///////////////////// MOSTRAR MENU POST EMISION ///////////////////

function menuPost() {

   document.getElementById("emi2_modal_container").style.display = "block";

   /// DATOS DE CLIENTE A INGRESAR
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombreCompleto").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoNotascte =  document.getElementById("notascte").value;

   /// DATOS DE POLIZA A INGRESAR
   let infoFpago =  document.getElementById("fpago").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoRefa =  document.getElementById("refac").value;
   let infoNotifica = document.getElementById("notifica").value;

   /// DATOS DE VEHICULO A INGRESAR
   let ramo =  document.getElementById("ramo_1").value;
   let ramo_pat =  document.getElementById("patente_sn").value;
   let infoPatente =  ramo + ramo_pat;
   let infoMarca =  document.getElementById("marca").value;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoTipo =   document.getElementById("tipo").value;
   let infoAnio =   document.getElementById("modelo").value;
   let infoColor =   document.getElementById("color").value;
   let infoVTV =   document.getElementById("vtv").value;
   let infoSumaAseg =  document.getElementById("suma_aseg").value;
   let infoAcc1 =  document.getElementById("accesorio1").value;
   let infoAcc1valor =  document.getElementById("accesorio1_valor").value;
   let infoNotasVeh =  document.getElementById("notasveh").value;

   // Mostrar datos en el modal solo si hay valores
   if (infoDNI) document.getElementById("modalDNI").value = infoDNI;
   if (infoCliente) document.getElementById("modalCliente").value = infoCliente;
   if (infoDomicilio) document.getElementById("modalDomicilio").value = infoDomicilio;
   if (infoLocalidad) document.getElementById("modalLocalidad").value = infoLocalidad;
   if (infoWpp) document.getElementById("modalWpp").value = infoWpp;
   if (infoMail) document.getElementById("modalMail").value = infoMail;
   if (infoNotascte) document.getElementById("modalNotascte").value = infoNotascte;
   if (infoFpago) document.getElementById("modalFpago").value = infoFpago;
   if (infoSucursal) document.getElementById("modalSucursal").value = infoSucursal;
   if (infoCnia) document.getElementById("modalCnia").value = infoCnia;
   if (infoCobertura) document.getElementById("modalCobertura").value = infoCobertura;
   if (infoImporte) document.getElementById("modalImporte").value = infoImporte;
   if (infoPoliza) document.getElementById("modalPoliza").value = infoPoliza;
   if (infoOperacion) document.getElementById("modalOperacion").value = infoOperacion;
   if (infoVigencia) document.getElementById("modalVigencia").value = infoVigencia;
   if (infoHasta) document.getElementById("modalHasta").value = infoHasta;
   if (infoRefa) document.getElementById("modalRefa").value = infoRefa;
   if (infoNotifica) document.getElementById("modalNotifica").value = infoNotifica;
   if (infoPatente) document.getElementById("modalPatente").value = infoPatente;
   if (infoMarca) document.getElementById("modalMarca").value = infoMarca;
   if (infoMotor) document.getElementById("modalMotor").value = infoMotor;
   if (infoChasis) document.getElementById("modalChasis").value = infoChasis;
   if (infoDanios) document.getElementById("modalDanios").value = infoDanios;
   if (infoTipo) document.getElementById("modalTipo").value = infoTipo;
   if (infoAnio) document.getElementById("modalAnio").value = infoAnio;
   if (infoColor) document.getElementById("modalColor").value = infoColor;
   if (infoVTV) document.getElementById("modalVTV").value = infoVTV;
   if (infoSumaAseg) document.getElementById("modalSumaAseg").value = infoSumaAseg;
   if (infoAcc1) document.getElementById("modalAcc1").value = infoAcc1;
   if (infoAcc1valor) document.getElementById("modalAcc1valor").value = infoAcc1valor;
}

///////////////////// IMPRIMIR MODAL DE COBERTURA /////////////////

function printAcuerdoAgroB1() {
 event.preventDefault();
let data = {
   dni: document.getElementById("modalDNI").value || '',
   nombre: document.getElementById("modalCliente").value || '',
   domicilio: document.getElementById("modalDomicilio").value || '',
   localidad: document.getElementById("modalLocalidad").value || '',
   telefono: document.getElementById("modalWpp").value || '',
   email: document.getElementById("modalMail").value || '',
   notas: document.getElementById("notascte").value || '', // Suponiendo que no cambió el ID para notas
   formaPago: document.getElementById("modalFpago").value || '',
   sucursal: document.getElementById("modalSucursal").value || '',
   compania: document.getElementById("modalCnia").value || '',
   cobertura: document.getElementById("modalCobertura").value || '',
   importe: document.getElementById("modalImporte").value || '',
   poliza: document.getElementById("modalPoliza").value || '',
   operacion: document.getElementById("modalOperacion").value || '',
   vigenciaDesde: document.getElementById("modalVigencia").value || '',
   vigenciaHasta: document.getElementById("modalHasta").value || '',
   refactura: document.getElementById("modalRefa").value || '',
   notificacion: document.getElementById("modalNotifica").value || '',
   patente: document.getElementById("modalPatente").value || '',
   marca: document.getElementById("modalMarca").value || '',
   motor: document.getElementById("modalMotor").value || '',
   chasis: document.getElementById("modalChasis").value || '',
   danios: document.getElementById("modalDanios").value || '',
   tipo: document.getElementById("modalTipo").value || '',
   anio: document.getElementById("modalAnio").value || '',
   color: document.getElementById("modalColor").value || '',
   vtv: document.getElementById("modalVTV").value || '',
   sumaAsegurada: document.getElementById("modalSumaAseg").value || '',
   accesorio: document.getElementById("modalAcc1").value || '',
   valorAccesorio: document.getElementById("modalAcc1valor").value || '',
   comentarios: document.getElementById("notasveh").value || '' // Suponiendo que no cambió el ID para comentarios
};

   // Crear la ventana de impresión
   const printWindow = window.open('', '_blank', 'height=600,width=800');
   printWindow.document.open();
   printWindow.document.write(`
       <html>
           <head>
               <title>Resumen de Póliza</title>
               <style>
                   body {
                       font-family: Arial, sans-serif;
                       padding: 20px;
                   }
                   .container {
                       width: 100%;
                       margin: 0 auto;
                   }
                   .form-label {
                       font-weight: bold;
                       margin-bottom: 2px;
                   }
                   .form-control {
                       border: 1px solid #ccc;
                       padding: 5px;
                       width: 100%;
                       box-sizing: border-box;
                       border-radius: 8px; /* Borde redondeado */
                   }
                   .row {
                       display: flex;
                       flex-wrap: wrap;
                   }

/* Estilo para las columnas */
.col-12 {
   flex: 0 0 calc(100% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(100% - 40px); /* Ajusta el ancho máximo */
}

.col-8 {
   flex: 0 0 calc(66.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(66.3333% - 40px); /* Ajusta el ancho máximo */
}
.col-6 {
   flex: 0 0 calc(50% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(50% - 40px); /* Ajusta el ancho máximo */
}

.col-4 {
   flex: 0 0 calc(33.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(33.3333% - 40px); /* Ajusta el ancho máximo */
}

.col-3 {
   flex: 0 0 calc(25% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(25% - 40px); /* Ajusta el ancho máximo */
}

.col-2 {
   flex: 0 0 calc(20% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(20% - 40px); /* Ajusta el ancho máximo */
}

.col-1 {
   flex: 0 0 calc(10% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(10% - 40px); /* Ajusta el ancho máximo */
}

/* Opcional: Ajusta el padding de las columnas si es necesario */
.col-12, .col-6, .col-4, .col-3, .col-2, .col-1 {
   padding: 10px; /* Ajusta el padding según sea necesario */
}
                   .text-center {
                       text-align: center;
                   }
               </style>
           </head>
           <body>
               <div class="container">
                   <div class="modal-body">
                       <h3 style="margin: 0px">Datos del Cliente</h3>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalDNI" class="form-label">DNI</label>
                               <input type="text" class="form-control" id="modalDNI" value="${data.dni}" disabled>
                           </div>
                           <div class="col-6 mb-1">
                               <label for="modalCliente" class="form-label">Nombre</label>
                               <input type="text" class="form-control" id="modalCliente" value="${data.nombre}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalMail" class="form-label">Email</label>
                               <input type="email" class="form-control" id="modalMail" value="${data.email}" disabled>
                           </div></div>
                       <div class="row">
                           <div class="col-6 mb-1">
                               <label for="modalDomicilio" class="form-label">Domicilio</label>
                               <input type="text" class="form-control" id="modalDomicilio" value="${data.domicilio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalLocalidad" class="form-label">Localidad</label>
                               <input type="text" class="form-control" id="modalLocalidad" value="${data.localidad}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalWpp" class="form-label">Telefono</label>
                               <input type="text" class="form-control" id="modalWpp" value="${data.telefono}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos de la Póliza</h3>
                       <div class="row m-0">
                           <div class="col-3 mb-1">
                               <label for="modalOperacion" class="form-label">Operación</label>
                               <input type="text" class="form-control" id="modalOperacion" value="${data.operacion}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalCnia" class="form-label">Compañía</label>
                               <input type="text" class="form-control" id="modalCnia" value="${data.compania}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalCobertura" class="form-label">Cobertura</label>
                               <input type="text" class="form-control" id="modalCobertura" value="${data.cobertura}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalPoliza" class="form-label">Póliza</label>
                               <input type="text" class="form-control" id="modalPoliza" value="${data.poliza}" disabled>
                           </div>
                       </div>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalVigencia" class="form-label">Desde</label>
                               <input type="text" class="form-control" id="modalVigencia" value="${data.vigenciaDesde}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalHasta" class="form-label">Hasta</label>
                               <input type="text" class="form-control" id="modalHasta" value="${data.vigenciaHasta}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalRefa" class="form-label">Refactura</label>
                               <input type="text" class="form-control" id="modalRefa" value="${data.refactura}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalFpago" class="form-label">Forma de Pago</label>
                               <input type="text" class="form-control" id="modalFpago" value="${data.formaPago}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalSucursal" class="form-label">Sucursal</label>
                               <input type="text" class="form-control" id="modalSucursal" value="${data.sucursal}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalNotifica" class="form-label">Notificación</label>
                               <input type="text" class="form-control" id="modalNotifica" value="${data.notificacion}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalImporte" class="form-label">Importe</label>
                               <input type="text" class="form-control" id="modalImporte" value="${data.importe}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos del Vehículo</h3>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalPatente" class="form-label">Patente</label>
                               <input type="text" class="form-control" id="modalPatente" value="${data.patente}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalMarca" class="form-label">Marca</label>
                               <input type="text" class="form-control" id="modalMarca" value="${data.marca}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalMotor" class="form-label">Motor</label>
                               <input type="text" class="form-control" id="modalMotor" value="${data.motor}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalChasis" class="form-label">Chasis</label>
                               <input type="text" class="form-control" id="modalChasis" value="${data.chasis}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-12 mb-1">
                               <label for="modalDanios" class="form-label">Daños</label>
                               <input type="text" class="form-control" id="modalDanios" value="${data.danios}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalTipo" class="form-label">Tipo</label>
                               <input type="text" class="form-control" id="modalTipo" value="${data.tipo}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalAnio" class="form-label">Año</label>
                               <input type="text" class="form-control" id="modalAnio" value="${data.anio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalColor" class="form-label">Color</label>
                               <input type="text" class="form-control" id="modalColor" value="${data.color}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalVtv" class="form-label">Vto VTV</label>
                               <input type="text" class="form-control" id="modalVtv" value="${data.vtv}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalSumaAsegurada" class="form-label">Suma Asegurada</label>
                               <input type="text" class="form-control" id="modalSumaAsegurada" value="${data.sumaAsegurada}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalAccesorio" class="form-label">Accesorio</label>
                               <input type="text" class="form-control" id="modalAccesorio" value="${data.accesorio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalValorAccesorio" class="form-label">Valor Accesorio</label>
                               <input type="text" class="form-control" id="modalValorAccesorio" value="${data.valorAccesorio}" disabled>
                           </div>
                           <div class="col-3 mb-1" style="display: none">
                               <label for="modalComentarios" class="form-label">Comentarios</label>
                               <textarea class="form-control" id="modalComentarios" rows="3" disabled>${data.comentarios}</textarea>
                           </div>
                       </div>
                   </div>
               </div>
         <h3 style="margin: 0px">Detalle de Cobertura</h3>
       <ul class="list-unstyled">
         <li><i class="bi bi-check-circle"></i> Responsabilidad civil, cubre los daños provocados por el vehiculo hacia terceros. (No los daños propios)</li>
         <li><i class="bi bi-check-circle"></i> Robo total, cubre si el vehiculo desaparece completo a causa de un robo.</li>
         <li><i class="bi bi-check-circle"></i> Incendio total, cubre el incendio solo si afecta al total del vehiculo, no a una parte.</li>
       </ul>

       <h3 style="margin: 0px">Exclusiones de cobertura:</h3>
       <ul class="list-unstyled">
         <li><i class="bi bi-check-circle"></i> La cobertura se encuentra sujeta a la VTV, si el vehiculo no posee VTV o la tuviese vencida, la compañia se libera de todo tipo de obligación sobre la póliza o los siniestros que ocurriesen.</li>
         <li><i class="bi bi-check-circle"></i> Si el vehiculo posee equipo de GNC (Gas Natural Comprimido) y se encuentra vencido, la aseguradora no indemnizará ningun tipo de siniestro provocado por o hacia el mismo.</li>
         <li><i class="bi bi-check-circle"></i> La cobertura quedará sujeta al pago de la póliza, si el pago no fuese efectuado antes del dia del vencimiento, la aseguradora se libera de todo tipo de responsabilidad de cualquier siniestro ocurrido posterior a la fecha de pago.</li>
         <!-- Agrega más cláusulas según sea necesario -->
       </ul>

       <div class="row">
         <div class="col-8 mb-1">
         </div>
         <div class="col-4 mb-1 text-center"> <!-- Agrega 'text-center' para centrar el texto -->
             <div class="border-bottom border-2 border-dark" style="height: 50px;"></div>
             <label for="clienteNombre" class="form-label d-block">Firma y Aclaración del cliente</label>
         </div>
       </div>
           </body>
       </html>
   `);
   printWindow.document.close();
   printWindow.focus();
   printWindow.print();
}

function printPropuesta() {
 event.preventDefault();

   let compania = document.getElementById("modalCnia").value || '';
let pas = '';
let codigo = '';

if (compania === 'NIVEL') {
   pas = 'GIOIA RAUL HECTOR';
   codigo = '462';
} else if (compania === 'RIVADAVIA') {
   pas = 'CUGNONI SILVIA SUSANA';
   codigo = '10527';
} else if (compania === 'PROVIDENCIA') {
   pas = 'GIOIA NICOLAS JOSE';
   codigo = '64487';
}


let data = {
   dni: document.getElementById("modalDNI").value || '',
   nombre: document.getElementById("modalCliente").value || '',
   domicilio: document.getElementById("modalDomicilio").value || '',
   localidad: document.getElementById("modalLocalidad").value || '',
   telefono: document.getElementById("modalWpp").value || '',
   email: document.getElementById("modalMail").value || '',
   notas: document.getElementById("notascte").value || '', // Suponiendo que no cambió el ID para notas
   formaPago: document.getElementById("modalFpago").value || '',
   sucursal: document.getElementById("modalSucursal").value || '',
   compania: document.getElementById("modalCnia").value || '',
   cobertura: document.getElementById("modalCobertura").value || '',
   importe: document.getElementById("modalImporte").value || '',
   poliza: document.getElementById("modalPoliza").value || '',
   operacion: document.getElementById("modalOperacion").value || '',
   vigenciaDesde: document.getElementById("modalVigencia").value || '',
   vigenciaHasta: document.getElementById("modalHasta").value || '',
   refactura: document.getElementById("modalRefa").value || '',
   notificacion: document.getElementById("modalNotifica").value || '',
   patente: document.getElementById("modalPatente").value || '',
   marca: document.getElementById("modalMarca").value || '',
   motor: document.getElementById("modalMotor").value || '',
   chasis: document.getElementById("modalChasis").value || '',
   danios: document.getElementById("modalDanios").value || '',
   tipo: document.getElementById("modalTipo").value || '',
   anio: document.getElementById("modalAnio").value || '',
   color: document.getElementById("modalColor").value || '',
   vtv: document.getElementById("modalVTV").value || '',
   sumaAsegurada: document.getElementById("modalSumaAseg").value || '',
   accesorio: document.getElementById("modalAcc1").value || '',
   valorAccesorio: document.getElementById("modalAcc1valor").value || '',
   comentarios: document.getElementById("notasveh").value || '',
   codigo: codigo,
   pas: pas
};

   // Crear la ventana de impresión
   const printWindow = window.open('', '_blank', 'height=600,width=800');
   printWindow.document.open();
   printWindow.document.write(`
       <html>
           <head>
               <title>Resumen de Póliza</title>
               <style>
                   body {
                       font-family: Arial, sans-serif;
                       padding: 20px;
                   }
                   .container {
                       width: 100%;
                       margin: 0 auto;
                   }
                   .form-label {
                       font-weight: bold;
                       margin-bottom: 2px;
                   }
                   .form-control {
                       border: 1px solid #ccc;
                       padding: 5px;
                       width: 100%;
                       box-sizing: border-box;
                       border-radius: 8px; /* Borde redondeado */
                   }
                   .row {
                       display: flex;
                       flex-wrap: wrap;
                   }

/* Estilo para las columnas */
.col-12 {
   flex: 0 0 calc(100% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(100% - 40px); /* Ajusta el ancho máximo */
}

.col-8 {
   flex: 0 0 calc(66.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(66.3333% - 40px); /* Ajusta el ancho máximo */
}
.col-6 {
   flex: 0 0 calc(50% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(50% - 40px); /* Ajusta el ancho máximo */
}

.col-4 {
   flex: 0 0 calc(33.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(33.3333% - 40px); /* Ajusta el ancho máximo */
}

.col-3 {
   flex: 0 0 calc(25% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(25% - 40px); /* Ajusta el ancho máximo */
}

.col-2 {
   flex: 0 0 calc(20% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(20% - 40px); /* Ajusta el ancho máximo */
}

.col-1 {
   flex: 0 0 calc(10% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(10% - 40px); /* Ajusta el ancho máximo */
}

/* Opcional: Ajusta el padding de las columnas si es necesario */
.col-12, .col-6, .col-4, .col-3, .col-2, .col-1 {
   padding: 10px; /* Ajusta el padding según sea necesario */
}
                   .text-center {
                       text-align: center;
                   }
               </style>
           </head>
           <body>
               <div class="container">
                   <div class="modal-body">
                       <h3 class="text-center mb-0">Solicitud de Cobertura</h3>
                       <hr>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalDNI" class="form-label">DNI</label>
                               <input type="text" class="form-control" id="modalDNI" value="${data.dni}" disabled>
                           </div>
                           <div class="col-6 mb-1">
                               <label for="modalCliente" class="form-label">Nombre</label>
                               <input type="text" class="form-control" id="modalCliente" value="${data.nombre}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalMail" class="form-label">Email</label>
                               <input type="email" class="form-control" id="modalMail" value="${data.email}" disabled>
                           </div></div>
                       <div class="row">
                           <div class="col-6 mb-1">
                               <label for="modalDomicilio" class="form-label">Domicilio</label>
                               <input type="text" class="form-control" id="modalDomicilio" value="${data.domicilio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalLocalidad" class="form-label">Localidad</label>
                               <input type="text" class="form-control" id="modalLocalidad" value="${data.localidad}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalWpp" class="form-label">Telefono</label>
                               <input type="text" class="form-control" id="modalWpp" value="${data.telefono}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos de la Póliza</h3>
                       <div class="row m-0">
                           <div class="col-3 mb-1">
                               <label for="modalOperacion" class="form-label">Operación</label>
                               <input type="text" class="form-control" id="modalOperacion" value="${data.operacion}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalCnia" class="form-label">Compañía</label>
                               <input type="text" class="form-control" id="modalCnia" value="${data.compania}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalPAS" class="form-label">Productor</label>
                               <input type="text" class="form-control" id="modalPAS" value="${data.pas}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalCod" class="form-label">Codigo:</label>
                               <input type="text" class="form-control" id="modalCod" value="${data.codigo}" disabled>
                           </div>
                       </div>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalVigencia" class="form-label">Desde</label>
                               <input type="text" class="form-control" id="modalVigencia" value="${data.vigenciaDesde}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalHasta" class="form-label">Hasta</label>
                               <input type="text" class="form-control" id="modalHasta" value="${data.vigenciaHasta}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalRefa" class="form-label">Refactura</label>
                               <input type="text" class="form-control" id="modalRefa" value="${data.refactura}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalFpago" class="form-label">Forma de Pago</label>
                               <input type="text" class="form-control" id="modalFpago" value="${data.formaPago}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalCobertura" class="form-label">Cobertura</label>
                               <input type="text" class="form-control" id="modalCobertura" value="${data.cobertura}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalNotifica" class="form-label">Notificación</label>
                               <input type="text" class="form-control" id="modalNotifica" value="${data.notificacion}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalImporte" class="form-label">Importe</label>
                               <input type="text" class="form-control" id="modalImporte" value="${data.importe}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos del Vehículo</h3>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalMarca" class="form-label">Marca</label>
                               <input type="text" class="form-control" id="modalMarca" value="${data.marca}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalMotor" class="form-label">Motor</label>
                               <input type="text" class="form-control" id="modalMotor" value="${data.motor}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalChasis" class="form-label">Chasis</label>
                               <input type="text" class="form-control" id="modalChasis" value="${data.chasis}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-12 mb-1">
                               <label for="modalDanios" class="form-label">Daños</label>
                               <input type="text" class="form-control" id="modalDanios" value="${data.danios}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalTipo" class="form-label">Tipo</label>
                               <input type="text" class="form-control" id="modalTipo" value="${data.tipo}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalAnio" class="form-label">Año</label>
                               <input type="text" class="form-control" id="modalAnio" value="${data.anio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalColor" class="form-label">Color</label>
                               <input type="text" class="form-control" id="modalColor" value="${data.color}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalVtv" class="form-label">Vto VTV</label>
                               <input type="text" class="form-control" id="modalVtv" value="${data.vtv}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalSumaAsegurada" class="form-label">Suma Asegurada</label>
                               <input type="text" class="form-control" id="modalSumaAsegurada" value="${data.sumaAsegurada}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalAccesorio" class="form-label">Accesorio</label>
                               <input type="text" class="form-control" id="modalAccesorio" value="${data.accesorio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalValorAccesorio" class="form-label">Valor Accesorio</label>
                               <input type="text" class="form-control" id="modalValorAccesorio" value="${data.valorAccesorio}" disabled>
                           </div>
                           <div class="col-3 mb-1" style="display: none">
                               <label for="modalComentarios" class="form-label">Comentarios</label>
                               <textarea class="form-control" id="modalComentarios" rows="3" disabled>${data.comentarios}</textarea>
                           </div>
                       </div>
                   </div>
               </div>
               <hr>
         <h3 style="margin: 0px">Contra los siguientes riesgos:</h3>
         <ul class="list-unstyled">
           <li>
             <i class="bi bi-check-circle"></i> A) RESPONSABILIDAD CIVIL CON LIMITE S/RES 22.187 BIS/93
             <ul class="list-unstyled ms-4">
               <li><i class="bi bi-check-circle"></i> Daños corporales y/o Muerte - Res.22.178 Bis/93</li>
               <li><i class="bi bi-check-circle"></i> Daños materiales  Res 22.187 Bis/93</li>
             </ul>
           </li>
           <li><i class="bi bi-check-circle"></i><div id="cob2"></div></li>
           <li><i class="bi bi-check-circle"></i><div id="cob3"></div></li>
         </ul>
         <hr>
         Las condiciones de cobertura quedan sujetas a las Condiciones Generales Especificas aprobadas por la Superintendencia de Seguros de la Nación.
         <hr>
         La cobertura queda sujeta a la aceptación de la aseguradora.
         <hr>

           </body>
       </html>
   `);
   printWindow.document.close();
   printWindow.focus();
   printWindow.print();
}

function printCertCob() {
 event.preventDefault();
let data = {
   dni: document.getElementById("modalDNI").value || '',
   nombre: document.getElementById("modalCliente").value || '',
   domicilio: document.getElementById("modalDomicilio").value || '',
   localidad: document.getElementById("modalLocalidad").value || '',
   telefono: document.getElementById("modalWpp").value || '',
   email: document.getElementById("modalMail").value || '',
   notas: document.getElementById("notascte").value || '', // Suponiendo que no cambió el ID para notas
   formaPago: document.getElementById("modalFpago").value || '',
   sucursal: document.getElementById("modalSucursal").value || '',
   compania: document.getElementById("modalCnia").value || '',
   cobertura: document.getElementById("modalCobertura").value || '',
   importe: document.getElementById("modalImporte").value || '',
   poliza: document.getElementById("modalPoliza").value || '',
   operacion: document.getElementById("modalOperacion").value || '',
   vigenciaDesde: document.getElementById("modalVigencia").value || '',
   vigenciaHasta: document.getElementById("modalHasta").value || '',
   refactura: document.getElementById("modalRefa").value || '',
   notificacion: document.getElementById("modalNotifica").value || '',
   patente: document.getElementById("modalPatente").value || '',
   marca: document.getElementById("modalMarca").value || '',
   motor: document.getElementById("modalMotor").value || '',
   chasis: document.getElementById("modalChasis").value || '',
   danios: document.getElementById("modalDanios").value || '',
   tipo: document.getElementById("modalTipo").value || '',
   anio: document.getElementById("modalAnio").value || '',
   color: document.getElementById("modalColor").value || '',
   vtv: document.getElementById("modalVTV").value || '',
   sumaAsegurada: document.getElementById("modalSumaAseg").value || '',
   accesorio: document.getElementById("modalAcc1").value || '',
   valorAccesorio: document.getElementById("modalAcc1valor").value || '',
   comentarios: document.getElementById("notasveh").value || '' // Suponiendo que no cambió el ID para comentarios
};

   // Crear la ventana de impresión
   const printWindow = window.open('', '_blank', 'height=600,width=800');
   printWindow.document.open();
   printWindow.document.write(`

       <html>
           <head>
               <title>Resumen de Póliza</title>
               <style>
                   body {
               font-family: 'Trebuchet MS', Arial, sans-serif;
                       padding: 20px;
                   }
                   .container {
                       width: 100%;
                       margin: 0 auto;
                   }
                   .form-label {
                       font-weight: bold;
                       margin-bottom: 2px;
                   }
                   .form-control {
                       border: 1px solid #ccc;
                       padding: 5px;
                       width: 100%;
                       box-sizing: border-box;
                       border-radius: 8px; /* Borde redondeado */
                   }
                   .row {
                       display: flex;
                       flex-wrap: wrap;
                   }
                   table {border-collapse: collapse;}
                   table td {padding: 0px}

/* Estilo para las columnas */
.col-12 {
   flex: 0 0 calc(100% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(100% - 40px); /* Ajusta el ancho máximo */
}

.col-8 {
   flex: 0 0 calc(66.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(66.3333% - 40px); /* Ajusta el ancho máximo */
}
.col-6 {
   flex: 0 0 calc(50% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(50% - 40px); /* Ajusta el ancho máximo */
}

.col-4 {
   flex: 0 0 calc(33.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(33.3333% - 40px); /* Ajusta el ancho máximo */
}

.col-3 {
   flex: 0 0 calc(25% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(25% - 40px); /* Ajusta el ancho máximo */
}

.col-2 {
   flex: 0 0 calc(20% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(20% - 40px); /* Ajusta el ancho máximo */
}

.col-1 {
   flex: 0 0 calc(10% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(10% - 40px); /* Ajusta el ancho máximo */
}

/* Opcional: Ajusta el padding de las columnas si es necesario */
.col-12, .col-6, .col-4, .col-3, .col-2, .col-1 {
   padding: 10px; /* Ajusta el padding según sea necesario */
}
                   .text-center {
                       text-align: center;
                   }
               </style>
           </head>
           <body>






<img style="position:absolute;top:0.71in;left:5.33in;width:3.27in;height:0.46in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASEAAAApCAYAAAB6OZ/CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFXSURBVHhe7dihMsRRGMbhnREFlyAIoiAIgksQRVEUBFEQXIAgCKLgAgRB2OACRFEQNwjCBt5vd2ZnGI39f+V5Zn4z59jZ+s5Zox/201W6TTeS9M9dp+O0kb5ZS/dpmsbpty9L0l+7S6/pIx2lhfrwLe3MbgDLs5LOUz16dusPZZIO50eAQTykyzpspc+0WReAgdRr6LEOe6lGaL0uAAM5S0YIaGOEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVosR2k41Qpt1ARjIRZqNUHlPR/MjwCCe0uX8OD9M0tbsBrBcp2maFpuzmsapfpY9p3oiSdIyekm1NTVE36ykg1SvohtJWlInqf4XHaPRF6kaSbVqgSvcAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.38in;left:5.25in;width:3.44in;height:2.01in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAC6CAYAAADGZXrHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT5SURBVHhe7dwtkFYFHMVhZggEgoFAIBgIBgPBQDAYCAQCwUAgEAwGA4FgMBgMBgLBYCAQCAQCkWAwGAwGo4FgMBAIBAKBIP9zX9jZFWTYL/aemeeZOcx7d5Btv7lfr8f26Pjs49kXs2tmZnvclVk6kp6cmB2q07P80gez57N/zcwOcOnKL7OvZ4nagflodmuWX/Bsdn92dZZ6fjo7NQPYi/Tlk1l6cnl2e/Zklqjdm52d7cs3s6ev9t3s0E/3AEau+v6ZvZh9mx/sVu55pYipYc7CnG0BH1pOmhKwhOzu7OTsveU0LpeOl5YjgKNzYZarwYfL0XtI+RKw88sRwNHLfbN06Yfl6B1yYy2nbnnsCbAmF2fpU55evlWuPx/NflqOANbnx1nelDizHP3H9VmuO/PIE2CNcnP/8ezOcrRNnkbm3Yy8RgGwZrmczGXljrOxz2d5neLccgSwXrn1lUvKvMe65eYs98MAGuTrj/mK0pa/Zm7oAy1ySZl7Y1vy/sWNzUeA1ct3LXMLbJG7/TnIl7oBGuTl13Rr+b9d5I8cpGwADV53a/lmkYgBbXZ0S8SANiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQbUe3Tr46uJQDgAJvnHw9m321+QiweudniVhitng0+37zEWD1Ls8SsRPL0Xg4e7D5CLB6Oen6e/NxI5eSuaTcqhrAiv05+3nzcePMLKdmOUUDWLPXN/UvLEfb/D77dfMRYLVuzXIf//hytM3FWermVQtgrc7OXsyuLEdvkTOxFC7vjgGsSbr02+yP5eh/nJ49nuVp5RunagBH6N7s+eyz5egd8hfyF3PnX8iAo5YO5T5YbnddzQ/ex7VZrjtzeXkqPwA4ArmEzJVhAnY9P9iNPL58OsvlZf5jZ2XAh/TlLC+05h3WPb/+lffH7sxSwdzwvzHL0wGAw5Arv7x8n5v36U6+SbT1/cj9ODe7O3syyz+cX5C45dV/M7P97vYst6/Sl9yTT7zyJe8Dl0vKXGbenOVJQR535nTPzGyvS0fuz3LzPpeNu3jF69ixlybZCPExQ31VAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.39in;left:1.70in;width:3.43in;height:2.00in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAC6CAYAAADGZXrHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT5SURBVHhe7dwtkFYFHMVhZggEgoFAIBgIBgPBQDAYCAQCwUAgEAwGA4FgMBgMBgLBYCAQCAQCkWAwGAwGo4FgMBAIBAKBIP9zX9jZFWTYL/aemeeZOcx7d5Btv7lfr8f26Pjs49kXs2tmZnvclVk6kp6cmB2q07P80gez57N/zcwOcOnKL7OvZ4nagflodmuWX/Bsdn92dZZ6fjo7NQPYi/Tlk1l6cnl2e/Zklqjdm52d7cs3s6ev9t3s0E/3AEau+v6ZvZh9mx/sVu55pYipYc7CnG0BH1pOmhKwhOzu7OTsveU0LpeOl5YjgKNzYZarwYfL0XtI+RKw88sRwNHLfbN06Yfl6B1yYy2nbnnsCbAmF2fpU55evlWuPx/NflqOANbnx1nelDizHP3H9VmuO/PIE2CNcnP/8ezOcrRNnkbm3Yy8RgGwZrmczGXljrOxz2d5neLccgSwXrn1lUvKvMe65eYs98MAGuTrj/mK0pa/Zm7oAy1ySZl7Y1vy/sWNzUeA1ct3LXMLbJG7/TnIl7oBGuTl13Rr+b9d5I8cpGwADV53a/lmkYgBbXZ0S8SANiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQbUe3Tr46uJQDgAJvnHw9m321+QiweudniVhitng0+37zEWD1Ls8SsRPL0Xg4e7D5CLB6Oen6e/NxI5eSuaTcqhrAiv05+3nzcePMLKdmOUUDWLPXN/UvLEfb/D77dfMRYLVuzXIf//hytM3FWermVQtgrc7OXsyuLEdvkTOxFC7vjgGsSbr02+yP5eh/nJ49nuVp5RunagBH6N7s+eyz5egd8hfyF3PnX8iAo5YO5T5YbnddzQ/ex7VZrjtzeXkqPwA4ArmEzJVhAnY9P9iNPL58OsvlZf5jZ2XAh/TlLC+05h3WPb/+lffH7sxSwdzwvzHL0wGAw5Arv7x8n5v36U6+SbT1/cj9ODe7O3syyz+cX5C45dV/M7P97vYst6/Sl9yTT7zyJe8Dl0vKXGbenOVJQR535nTPzGyvS0fuz3LzPpeNu3jF69ixlybZCPExQ31VAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.20in;left:1.69in;width:3.45in;height:0.36in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAhCAYAAACxxJxHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJoSURBVHhe7d2hc1NBEMfxN4NAVCAQCERFBQJZgUD0D0BUVCIQCCSCPwCBRCARiAokAomoqEAgEPwBiAp6e3d5IUynAtGZpLsvByUzO2nakOQy892Zj8q+i/vN3uW9vOY61e/374q02zH2HonkJwBwXeMcabctV0rELKZijA9CzK+CpO8S8wgA/jfNlyMNtjcivZ3RaHSjxM981YWXpEPvCwFgUWxgCintlii6eml4begi+97iALA0kj6nlO6UaJqt7IIQ01d3QQBYMh2oop2blYiaXl2ASfrhLQQAq6K5dHppkNlBWpD8xVsAAFbNJrKpW8sQ8nvvQgCohQ5aByWyJivk/NC7AABqY/eWlei6KPsFwGsGgNrotvJbia5x5Zy3vEYAqNa/h/w6hb1wmwCgUvYEUYkwtpIA1s/EltJ+tvSaAKBWmltnXYDZvWFeAwDU7vjk5LZuJQeb3ocAULsYf94nxACsL+ntjP/g0PsQAGpnIWblfggAleu2k1bB/k3RaQCAmnUH+12I8d9hANaMDl+/uwCzEonvvCYAqJbkjyXCdBJLaddtAoBKaW49LhHWNMPh8KaOZr+8RgCojebV6d/zsD+lqfbcawaA6kh6WaLroso0xjslAVRNcyoOBoNbJbomy+65sDHNuxAAanDpuyg55AdQLW8b6ZU2PtOJ7MxdBABWIMT0ukTUbGXPJGmYtd5iALAsNlCF2Htaoulqddy29zT9PnkLA8CiaYAdzvzm72llU5mG2QcO/QEsWjd5ST5wX8s2b9ltGLawHa6FmN/ql+0DwLy6Rx81V0TyXoxxo0TODNU05w7CMkjx4fr6AAAAAElFTkSuQmCC">
<img style="position:absolute;top:0.38in;left:1.69in;width:3.45in;height:0.27in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAZCAYAAABZ7RmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABuSURBVHhe7dQBCQAwDMCw+xf6MxW7jkIKsdAjSfnumwUoMjEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPSTAxIMzEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPCZj+9nayowhm6/AAAAABJRU5ErkJggg==">

<img style="position:absolute;top:0.38in;left:5.24in;width:3.45in;height:0.27in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAZCAYAAABZ7RmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABuSURBVHhe7dQBCQAwDMCw+xf6MxW7jkIKsdAjSfnumwUoMjEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPSTAxIMzEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPCZj+9nayowhm6/AAAAABJRU5ErkJggg==">


<img style="position:absolute;top:0.20in;left:5.24in;width:3.45in;height:0.36in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAhCAYAAACxxJxHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJoSURBVHhe7d2hc1NBEMfxN4NAVCAQCERFBQJZgUD0D0BUVCIQCCSCPwCBRCARiAokAomoqEAgEPwBiAp6e3d5IUynAtGZpLsvByUzO2nakOQy892Zj8q+i/vN3uW9vOY61e/374q02zH2HonkJwBwXeMcabctV0rELKZijA9CzK+CpO8S8wgA/jfNlyMNtjcivZ3RaHSjxM981YWXpEPvCwFgUWxgCintlii6eml4begi+97iALA0kj6nlO6UaJqt7IIQ01d3QQBYMh2oop2blYiaXl2ASfrhLQQAq6K5dHppkNlBWpD8xVsAAFbNJrKpW8sQ8nvvQgCohQ5aByWyJivk/NC7AABqY/eWlei6KPsFwGsGgNrotvJbia5x5Zy3vEYAqNa/h/w6hb1wmwCgUvYEUYkwtpIA1s/EltJ+tvSaAKBWmltnXYDZvWFeAwDU7vjk5LZuJQeb3ocAULsYf94nxACsL+ntjP/g0PsQAGpnIWblfggAleu2k1bB/k3RaQCAmnUH+12I8d9hANaMDl+/uwCzEonvvCYAqJbkjyXCdBJLaddtAoBKaW49LhHWNMPh8KaOZr+8RgCojebV6d/zsD+lqfbcawaA6kh6WaLroso0xjslAVRNcyoOBoNbJbomy+65sDHNuxAAanDpuyg55AdQLW8b6ZU2PtOJ7MxdBABWIMT0ukTUbGXPJGmYtd5iALAsNlCF2Htaoulqddy29zT9PnkLA8CiaYAdzvzm72llU5mG2QcO/QEsWjd5ST5wX8s2b9ltGLawHa6FmN/ql+0DwLy6Rx81V0TyXoxxo0TODNU05w7CMkjx4fr6AAAAAElFTkSuQmCC">

<img style='position:absolute;top:0.23in;left:2.60in;width:1.51in;height:0.39in' alt='LOGO1' src='data:image/png;base64,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' />


<img style='position:absolute;top:0.23in;left:6.24in;width:1.51in;height:0.39in'   alt='LOGO2'  src='data:image/png;base64,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'>



<img style="position:absolute;top:0.15in;left:1.59in;width:0.02in;height:2.33in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAADOCAYAAAAUnNPrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAzSURBVEhLYwACayDmBjGSgVgYxMAEo2qAYFQNVjCqBghG1WAFo2qAYFQNVjAU1SADBgYAIFIlda6KaRwAAAAASUVORK5CYII=">

<img style="position:absolute;top:0.15in;left:8.76in;width:0.02in;height:2.33in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAADOCAYAAAD7XrjVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAvSURBVEhL7cuxDQAgEAOx346RWB8FpURiAV9zlaet/rb7TwyTGCYxTGKYxDCvZg5ysCXbwDAddAAAAABJRU5ErkJggg==">

<img style="position:absolute;top:0.65in;left:5.18in;width:0.02in;height:1.57in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAACLCAYAAABLCUg0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAqSURBVDhPYwACcSDWBzHUgdgfxMAEo2qAYFQNVjCqBghG1WAFA66GgQEA8+cZtb8lztAAAAAASUVORK5CYII=">




<img style="position:absolute;top:1.80in;left:8.10in;width:0.52in;height:0.49in" alt='FIRMA' src='data:image/png;base64,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'>

<div style="position:absolute;top:2.21in;left:8.06in;width:0.50in;line-height:0.06in;"><span style="font-style:normal;font-weight:normal;font-size:4pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">Dr. Juan Jorge Olcese</span><br></div>
<div style="position:absolute;top:2.27in;left:8.18in;width:0.23in;line-height:0.06in;"><span style="font-style:normal;font-weight:normal;font-size:4pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">Presidente</span></div>

<div style="position:absolute;top:1.22in;left:5.40in;width:3.26in;">
<span style="font-style:normal;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;">
Nota: La posesión de este comprobante obligatorio será prueba suficiente de la vigencia del<br>
seguro obligatorio de automotores exigido por el articulo 68 de la Ley Nº 24.449. Conforme el<br>
articulo 2º de la Disposición Nº 70/2009 de la AGENCIA NACIONAL DE SEGURIDAD VIAL, la falta<br>
de portación del recibo de pago de prima del seguro obligatorio por parte del conductor del<br>
vehículo, no podrá ser aducida por la Autoridad de Constatación para determinar el<br>
incumplimiento de los requisitos para la circulación.<br>
</span><br><br><br><br><br><br></div>

<img style="position:absolute;top:2.17in;left:7.96in;width:0.68in;height:0.02in"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAACCAYAAADrTtSRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAVSURBVChTYwCC/yMMgwE2iWGMGRgAqYR3icki4WoAAAAASUVORK5CYII=">


<div style="position:absolute;top:0.77in;left:1.78in;width:1.69in;line-height:0.16in;"><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Asegurado: </span>
<span class="value" style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.nombre}</span>
               
<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Póliza: </span>
<span class="value" style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.poliza}</span>

<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;">Vigencia: </span>

<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.vigenciaDesde}</span>
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">  al </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.vigenciaHasta}</span>
</div>
<div style="position:absolute;top:1.14in;left:1.78in;width:1.69in;line-height:0.20in;"><div style="position:relative; left:1.16in;"><br></div>
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Marca: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.marca}</span><br>

<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Tipo: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.tipo}</span>

<br></div>
<div style="position:absolute;top:0.96in;left:3.69in;width:0.59in;line-height:0.12in;">
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Cobertura: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.cobertura}</span>
<br></div>

<div style="position:absolute;top:0.84in;left:5.50in;width:2.95in;line-height:0.12in;text-align:center;"><div style="position:relative">

<span style="font-style:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.5pt;line-height:1.5;color:#000000">SEGURO OBLIGATORIO AUTOMOTOR CONFORME DECRETO 1716/08<br></span></div>
<span style="font-style:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.5pt;line-height:1.5;color:#000000">(Reglamentario de la Ley Nacional de Transito y Seguridad Vial Nº 26363)</span>


<br></div>
<div style="position:absolute;top:0.03in;left:0.24in;width:8.52in;line-height:0.15in;">
<span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:TrebuchetMS;color:#000000">
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
</span><br></div>








<div style="position:absolute;top:1.62in;left:3.69in;width:1.40in;line-height:0.15in;"><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Dominio:</span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.patente}</span>

<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Chasis: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.chasis}</span>

<br></div>
<div style="position:absolute;top:1.62in;left:1.78in;width:1.69in;line-height:0.15in;"><div style="position:relative; left:0.27in;"><br>

</div><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Nº Motor:</span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.motor}</span>
<br></div>
<div style="position:absolute;top:1.99in;left:6.12in;width:1.71in;line-height:0.12in;">

<span style="font-style:normal;font-weight:bold;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Agrosalta Cooperativa de Seguros Limitada</span><br><div style="position:relative; left:0.25in;"><span style="font-style:normal;font-weight:normal;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Pedernera  237  - (4400) - Salta</span><br></div></div>
<div style="position:absolute;top:2.37in;left:0.24in;width:8.52in;line-height:0.15in;"><span style="font-style:normal;font-weight:bold;font-size:8pt;font-family:TrebuchetMS;color:#000000">------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span><br></div>


<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<hr>



               <div class="container">
                   <div class="modal-body">
                       <h3 style="margin: 0px">Datos del Cliente</h3>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalDNI" class="form-label">DNI</label>
                               <input type="text" class="form-control" id="modalDNI" value="${data.dni}" disabled>
                           </div>
                           <div class="col-6 mb-1">
                               <label for="modalCliente" class="form-label">Nombre</label>
                               <input type="text" class="form-control" id="modalCliente" value="${data.nombre}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalMail" class="form-label">Email</label>
                               <input type="email" class="form-control" id="modalMail" value="${data.email}" disabled>
                           </div></div>
                       <div class="row">
                           <div class="col-6 mb-1">
                               <label for="modalDomicilio" class="form-label">Domicilio</label>
                               <input type="text" class="form-control" id="modalDomicilio" value="${data.domicilio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalLocalidad" class="form-label">Localidad</label>
                               <input type="text" class="form-control" id="modalLocalidad" value="${data.localidad}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalWpp" class="form-label">Telefono</label>
                               <input type="text" class="form-control" id="modalWpp" value="${data.telefono}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos de la Póliza</h3>
                       <div class="row m-0">
                           <div class="col-3 mb-1">
                               <label for="modalOperacion" class="form-label">Operación</label>
                               <input type="text" class="form-control" id="modalOperacion" value="${data.operacion}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalCnia" class="form-label">Compañía</label>
                               <input type="text" class="form-control" id="modalCnia" value="${data.compania}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalCobertura" class="form-label">Cobertura</label>
                               <input type="text" class="form-control" id="modalCobertura" value="${data.cobertura}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalPoliza" class="form-label">Póliza</label>
                               <input type="text" class="form-control" id="modalPoliza" value="${data.poliza}" disabled>
                           </div>
                       </div>
                       <div class="row m-0">
                           <div class="col-2 mb-1">
                               <label for="modalVigencia" class="form-label">Desde</label>
                               <input type="text" class="form-control" id="modalVigencia" value="${data.vigenciaDesde}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalHasta" class="form-label">Hasta</label>
                               <input type="text" class="form-control" id="modalHasta" value="${data.vigenciaHasta}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalRefa" class="form-label">Refactura</label>
                               <input type="text" class="form-control" id="modalRefa" value="${data.refactura}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalFpago" class="form-label">Forma de Pago</label>
                               <input type="text" class="form-control" id="modalFpago" value="${data.formaPago}" disabled>
                           </div>
                           <div class="col-3 mb-1">
                               <label for="modalSucursal" class="form-label">Sucursal</label>
                               <input type="text" class="form-control" id="modalSucursal" value="${data.sucursal}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalNotifica" class="form-label">Notificación</label>
                               <input type="text" class="form-control" id="modalNotifica" value="${data.notificacion}" disabled>
                           </div>
                           <div class="col-0 mb-1" style="display: none;">
                               <label for="modalImporte" class="form-label">Importe</label>
                               <input type="text" class="form-control" id="modalImporte" value="${data.importe}" disabled>
                           </div>
                       </div>

                       <h3 style="margin: 0px">Datos del Vehículo</h3>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalMarca" class="form-label">Marca</label>
                               <input type="text" class="form-control" id="modalMarca" value="${data.marca}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalMotor" class="form-label">Motor</label>
                               <input type="text" class="form-control" id="modalMotor" value="${data.motor}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalChasis" class="form-label">Chasis</label>
                               <input type="text" class="form-control" id="modalChasis" value="${data.chasis}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-12 mb-1">
                               <label for="modalDanios" class="form-label">Daños</label>
                               <input type="text" class="form-control" id="modalDanios" value="${data.danios}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalTipo" class="form-label">Tipo</label>
                               <input type="text" class="form-control" id="modalTipo" value="${data.tipo}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalAnio" class="form-label">Año</label>
                               <input type="text" class="form-control" id="modalAnio" value="${data.anio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalColor" class="form-label">Color</label>
                               <input type="text" class="form-control" id="modalColor" value="${data.color}" disabled>
                           </div>
                           <div class="col-2 mb-1">
                               <label for="modalVtv" class="form-label">Vto VTV</label>
                               <input type="text" class="form-control" id="modalVtv" value="${data.vtv}" disabled>
                           </div></div>
                       <div class="row m-0">
                           <div class="col-4 mb-1">
                               <label for="modalSumaAsegurada" class="form-label">Suma Asegurada</label>
                               <input type="text" class="form-control" id="modalSumaAsegurada" value="${data.sumaAsegurada}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalAccesorio" class="form-label">Accesorio</label>
                               <input type="text" class="form-control" id="modalAccesorio" value="${data.accesorio}" disabled>
                           </div>
                           <div class="col-4 mb-1">
                               <label for="modalValorAccesorio" class="form-label">Valor Accesorio</label>
                               <input type="text" class="form-control" id="modalValorAccesorio" value="${data.valorAccesorio}" disabled>
                           </div>
                           <div class="col-3 mb-1" style="display: none">
                               <label for="modalComentarios" class="form-label">Comentarios</label>
                               <textarea class="form-control" id="modalComentarios" rows="3" disabled>${data.comentarios}</textarea>
                           </div>
                       </div>
                   </div>
               </div>
               
       <div class="row">
         <div class="col-8 mb-1">
         </div>
         <div class="col-4 mb-1 text-center"> <!-- Agrega 'text-center' para centrar el texto -->
             <div class="border-bottom border-2 border-dark" style="height: 50px;"></div>
             <label for="clienteNombre" class="form-label d-block">Firma y Aclaración del cliente</label>
         </div>
       </div>
           </body>
       </html>
   `);
   printWindow.document.close();
   printWindow.focus();
   printWindow.print();
}


function printTarRec() {
 event.preventDefault();


   let fechaStr = document.getElementById("modalVigencia").value;
   console.log("fechaStr: " + fechaStr)
   let parts = fechaStr.split('/')
   
   // Crear un objeto Date usando la fecha
   let fecha0 = new Date(parts[2], parts[1] - 1, parts[0]); // Los meses en Date son base 0
   let fecha1 = new Date(parts[2], parts[1] - 1, parts[0]); // Los meses en Date son base 0
   let fecha6 = new Date(parts[2], parts[1] - 1, parts[0]); // Los meses en Date son base 0
   
   console.log("fecha1: " + fecha1)
   console.log("fecha6: " + fecha6)

   // Sumar un mes
   fecha1.setMonth(fecha1.getMonth() + 1);
   fecha6.setMonth(fecha6.getMonth() + 6);

   console.log("fecha1: " + fecha1)
   console.log("fecha6: " + fecha6)

   // Obtener el nuevo día, mes y año
   dia0 = fecha0.getDate();
   mes0 = fecha0.getMonth() + 1;
   anio0 = fecha0.getFullYear();
   dia = fecha1.getDate();
   mes = fecha1.getMonth() + 1;
   anio = fecha1.getFullYear();
   dia6 = fecha6.getDate();
   mes6 = fecha6.getMonth() + 1;
   anio6 = fecha6.getFullYear();
   
   console.log("dia: " + dia)
   console.log("mes: " + mes)
   console.log("anio: " + anio)
   console.log("dia6: " + dia6)
   console.log("mes6: " + mes6)
   console.log("anio6: " + anio6)


   let diaStr0 = dia0.toString().padStart(2, '0');
   let mesStr0 = mes0.toString().padStart(2, '0');
   let anioStr0 = anio0.toString().slice(-2);
   let diaStr = dia.toString().padStart(2, '0');
   let mesStr = mes.toString().padStart(2, '0');
   let anioStr = anio.toString().slice(-2);
   let mesStr6 = mes6.toString().padStart(2, '0');
   let anioStr6 = anio6.toString().slice(-2);
   let diaStr6 = dia6.toString().padStart(2, '0');

   console.log("diaStr: " + diaStr)
   console.log("mesStr: " + mesStr)
   console.log("mesStr6: " + mesStr6)
   console.log("anioStr: " + anioStr)
   if ((diaStr6 === "29" || diaStr6 === "30" || diaStr6 === "31") && mesStr6 === "02") {
       diaStr6 = "28";
   }

   let nuevovto0 = diaStr0 + "/" + mesStr0 + "/" + anioStr0;
   let nuevovto = diaStr + "/" + mesStr + "/" + anioStr;
   let nuevovto6 = diaStr6 + "/" + mesStr6 + "/" + anioStr6;


var numGrua = "";

switch (document.getElementById("modalCnia").value) {
 case "AGROSALTA [RC]":
   numGrua = "NO POSEE";
   break;
 case "AGROSALTA [RC-GRUA]":
   numGrua = "0800 666 1366 (100km)";
   break;
 case "AGROSALTA [B1]":
   numGrua = "0800 666 1366 (100km)";
   break;
 case "AGROSALTA [MOTO]":
   numGrua = "0800 666 1366 (100km)";
   break;
 case "RIVADAVIA":
   numGrua = "0800-666-6789 / Ext: (5411)43286600";
   break;
 case "FED PAT":
   numGrua = "0800-222-0022 0800-800-0022";
   break;
 case "PROVIDENCIA":
   numGrua = "0800-444-4442 / 0800-999-3003";
   break;
 case "RIO URUGUAY":
   numGrua = "0800-444-1441 0810-888-7080";
   break;
 case "ATM":
   numGrua = "0800-999-8208 / Ext:(5411)48149058";
   break;
 case "LA CAJA":
   numGrua = "0800-666-0939";
   break;
 case "MAPFRE":
   numGrua = "0800-999-7424 / Ex:(5411)57772127";
   break;
 case "BENEFICIO":
   numGrua = "NO POSEE";
   break;
 case "MERCANTIL":
   numGrua = "0-800-777-2634";
   break;
 case "LIBRA":
   numGrua = "0800-999-6500";
   break;
 case "GRUA":
   numGrua = "0800 666 1366 (100km)";
   break;
 case "EXPERTA":
   numGrua = "0800 777 7278";
   break;
 case "DIGNA":
   numGrua = "";
   break;
 case "EL TRIUNFO":
   numGrua = "";
   break;
 case "BBVA":
   numGrua = "";
   break;
 default:
   numGrua = "";
}


let data = {
   dni: document.getElementById("modalDNI").value || '',
   nombre: document.getElementById("modalCliente").value || '',
   domicilio: document.getElementById("modalDomicilio").value || '',
   localidad: document.getElementById("modalLocalidad").value || '',
   telefono: document.getElementById("modalWpp").value || '',
   email: document.getElementById("modalMail").value || '',
   notas: document.getElementById("notascte").value || '', // Suponiendo que no cambió el ID para notas
   formaPago: document.getElementById("modalFpago").value || '',
   sucursal: document.getElementById("modalSucursal").value || '',
   compania: document.getElementById("modalCnia").value || '',
   cobertura: document.getElementById("modalCobertura").value || '',
   importe: document.getElementById("modalImporte").value || '',
   poliza: document.getElementById("modalPoliza").value || 'E/T',
   operacion: document.getElementById("modalOperacion").value || '',
   vigenciaDesde: document.getElementById("modalVigencia").value || '',
   vigenciaHasta: document.getElementById("modalHasta").value || '',
   refactura: document.getElementById("modalRefa").value || '',
   notificacion: document.getElementById("modalNotifica").value || '',
   patente: document.getElementById("modalPatente").value || '',
   marca: document.getElementById("modalMarca").value || '',
   motor: document.getElementById("modalMotor").value || '',
   chasis: document.getElementById("modalChasis").value || '',
   danios: document.getElementById("modalDanios").value || '',
   tipo: document.getElementById("modalTipo").value || '',
   anio: document.getElementById("modalAnio").value || '',
   color: document.getElementById("modalColor").value || '',
   vtv: document.getElementById("modalVTV").value || '',
   sumaAsegurada: document.getElementById("modalSumaAseg").value || '',
   accesorio: document.getElementById("modalAcc1").value || '',
   valorAccesorio: document.getElementById("modalAcc1valor").value || '',
   comentarios: document.getElementById("notasveh").value || '',
   nuevovto: nuevovto || '',
   nuevovto6: nuevovto6 || '',
   nuevovto0: nuevovto0 || '',
   numgrua: numGrua || '',
   recibo: document.getElementById("modalRecibo").value || ''

};


let border25Style = data.recibo ? '' : 'display: none;';

   // Crear la ventana de impresión
   const printWindow = window.open('', '_blank', 'height=600,width=800');
   printWindow.document.open();
   printWindow.document.write(`

       <html>
           <head>
               <title>Resumen de Póliza</title>
               <style>
                   body {
               font-family: 'Trebuchet MS', Arial, sans-serif;
                       padding: 20px;
                   }
                   .container {
                       width: 100%;
                       margin: 0 auto;
                   }
                   .form-label {
                       font-weight: bold;
                       margin-bottom: 2px;
                   }
                   .form-control {
                       border: 1px solid #ccc;
                       padding: 5px;
                       width: 100%;
                       box-sizing: border-box;
                       border-radius: 8px; /* Borde redondeado */
                   }
                   .row {
                       display: flex;
                       flex-wrap: wrap;
                   }
                   table {border-collapse: collapse;}
                   table td {padding: 0px}

/* Estilo para las columnas */
.col-12 {
   flex: 0 0 calc(100% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(100% - 40px); /* Ajusta el ancho máximo */
}

.col-8 {
   flex: 0 0 calc(66.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(66.3333% - 40px); /* Ajusta el ancho máximo */
}
.col-6 {
   flex: 0 0 calc(50% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(50% - 40px); /* Ajusta el ancho máximo */
}

.col-4 {
   flex: 0 0 calc(33.3333% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(33.3333% - 40px); /* Ajusta el ancho máximo */
}

.col-3 {
   flex: 0 0 calc(25% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(25% - 40px); /* Ajusta el ancho máximo */
}

.col-2 {
   flex: 0 0 calc(20% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(20% - 40px); /* Ajusta el ancho máximo */
}

.col-1 {
   flex: 0 0 calc(10% - 40px); /* Ajusta el ancho para tener en cuenta el padding */
   max-width: calc(10% - 40px); /* Ajusta el ancho máximo */
}

/* Opcional: Ajusta el padding de las columnas si es necesario */
.col-12, .col-6, .col-4, .col-3, .col-2, .col-1 {
   padding: 10px; /* Ajusta el padding según sea necesario */
}
                   .text-center {
                       text-align: center;
                   }
                   
       .container25 {
   display: flex;
   justify-content: flex-end;
   align-items: center;
   height: 100vh;
 }

 .border25 {
   height: 250px;
   width: 355px;
   border: 2px solid black;
   padding: 5px;
   margin-right: 15px;
   margin-bottom: 0px;
 }
               </style>
           </head>
           <body>






<img style="position:absolute;top:0.71in;left:4.33in;width:3.27in;height:0.46in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASEAAAApCAYAAAB6OZ/CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFXSURBVHhe7dihMsRRGMbhnREFlyAIoiAIgksQRVEUBFEQXIAgCKLgAgRB2OACRFEQNwjCBt5vd2ZnGI39f+V5Zn4z59jZ+s5Zox/201W6TTeS9M9dp+O0kb5ZS/dpmsbpty9L0l+7S6/pIx2lhfrwLe3MbgDLs5LOUz16dusPZZIO50eAQTykyzpspc+0WReAgdRr6LEOe6lGaL0uAAM5S0YIaGOEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVkYIaGWEgFZGCGhlhIBWRghoZYSAVosR2k41Qpt1ARjIRZqNUHlPR/MjwCCe0uX8OD9M0tbsBrBcp2maFpuzmsapfpY9p3oiSdIyekm1NTVE36ykg1SvohtJWlInqf4XHaPRF6kaSbVqgSvcAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.38in;left:4.25in;width:3.44in;height:2.01in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAC6CAYAAADGZXrHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT5SURBVHhe7dwtkFYFHMVhZggEgoFAIBgIBgPBQDAYCAQCwUAgEAwGA4FgMBgMBgLBYCAQCAQCkWAwGAwGo4FgMBAIBAKBIP9zX9jZFWTYL/aemeeZOcx7d5Btv7lfr8f26Pjs49kXs2tmZnvclVk6kp6cmB2q07P80gez57N/zcwOcOnKL7OvZ4nagflodmuWX/Bsdn92dZZ6fjo7NQPYi/Tlk1l6cnl2e/Zklqjdm52d7cs3s6ev9t3s0E/3AEau+v6ZvZh9mx/sVu55pYipYc7CnG0BH1pOmhKwhOzu7OTsveU0LpeOl5YjgKNzYZarwYfL0XtI+RKw88sRwNHLfbN06Yfl6B1yYy2nbnnsCbAmF2fpU55evlWuPx/NflqOANbnx1nelDizHP3H9VmuO/PIE2CNcnP/8ezOcrRNnkbm3Yy8RgGwZrmczGXljrOxz2d5neLccgSwXrn1lUvKvMe65eYs98MAGuTrj/mK0pa/Zm7oAy1ySZl7Y1vy/sWNzUeA1ct3LXMLbJG7/TnIl7oBGuTl13Rr+b9d5I8cpGwADV53a/lmkYgBbXZ0S8SANiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQbUe3Tr46uJQDgAJvnHw9m321+QiweudniVhitng0+37zEWD1Ls8SsRPL0Xg4e7D5CLB6Oen6e/NxI5eSuaTcqhrAiv05+3nzcePMLKdmOUUDWLPXN/UvLEfb/D77dfMRYLVuzXIf//hytM3FWermVQtgrc7OXsyuLEdvkTOxFC7vjgGsSbr02+yP5eh/nJ49nuVp5RunagBH6N7s+eyz5egd8hfyF3PnX8iAo5YO5T5YbnddzQ/ex7VZrjtzeXkqPwA4ArmEzJVhAnY9P9iNPL58OsvlZf5jZ2XAh/TlLC+05h3WPb/+lffH7sxSwdzwvzHL0wGAw5Arv7x8n5v36U6+SbT1/cj9ODe7O3syyz+cX5C45dV/M7P97vYst6/Sl9yTT7zyJe8Dl0vKXGbenOVJQR535nTPzGyvS0fuz3LzPpeNu3jF69ixlybZCPExQ31VAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.39in;left:0.81in;width:3.43in;height:2.00in" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAC6CAYAAADGZXrHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAT5SURBVHhe7dwtkFYFHMVhZggEgoFAIBgIBgPBQDAYCAQCwUAgEAwGA4FgMBgMBgLBYCAQCAQCkWAwGAwGo4FgMBAIBAKBIP9zX9jZFWTYL/aemeeZOcx7d5Btv7lfr8f26Pjs49kXs2tmZnvclVk6kp6cmB2q07P80gez57N/zcwOcOnKL7OvZ4nagflodmuWX/Bsdn92dZZ6fjo7NQPYi/Tlk1l6cnl2e/Zklqjdm52d7cs3s6ev9t3s0E/3AEau+v6ZvZh9mx/sVu55pYipYc7CnG0BH1pOmhKwhOzu7OTsveU0LpeOl5YjgKNzYZarwYfL0XtI+RKw88sRwNHLfbN06Yfl6B1yYy2nbnnsCbAmF2fpU55evlWuPx/NflqOANbnx1nelDizHP3H9VmuO/PIE2CNcnP/8ezOcrRNnkbm3Yy8RgGwZrmczGXljrOxz2d5neLccgSwXrn1lUvKvMe65eYs98MAGuTrj/mK0pa/Zm7oAy1ySZl7Y1vy/sWNzUeA1ct3LXMLbJG7/TnIl7oBGuTl13Rr+b9d5I8cpGwADV53a/lmkYgBbXZ0S8SANiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQTcSAaiIGVBMxoJqIAdVEDKgmYkA1EQOqiRhQbUe3Tr46uJQDgAJvnHw9m321+QiweudniVhitng0+37zEWD1Ls8SsRPL0Xg4e7D5CLB6Oen6e/NxI5eSuaTcqhrAiv05+3nzcePMLKdmOUUDWLPXN/UvLEfb/D77dfMRYLVuzXIf//hytM3FWermVQtgrc7OXsyuLEdvkTOxFC7vjgGsSbr02+yP5eh/nJ49nuVp5RunagBH6N7s+eyz5egd8hfyF3PnX8iAo5YO5T5YbnddzQ/ex7VZrjtzeXkqPwA4ArmEzJVhAnY9P9iNPL58OsvlZf5jZ2XAh/TlLC+05h3WPb/+lffH7sxSwdzwvzHL0wGAw5Arv7x8n5v36U6+SbT1/cj9ODe7O3syyz+cX5C45dV/M7P97vYst6/Sl9yTT7zyJe8Dl0vKXGbenOVJQR535nTPzGyvS0fuz3LzPpeNu3jF69ixlybZCPExQ31VAAAAAElFTkSuQmCC'>

<img style="position:absolute;top:0.20in;left:0.81in;width:3.45in;height:0.36in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAhCAYAAACxxJxHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJoSURBVHhe7d2hc1NBEMfxN4NAVCAQCERFBQJZgUD0D0BUVCIQCCSCPwCBRCARiAokAomoqEAgEPwBiAp6e3d5IUynAtGZpLsvByUzO2nakOQy892Zj8q+i/vN3uW9vOY61e/374q02zH2HonkJwBwXeMcabctV0rELKZijA9CzK+CpO8S8wgA/jfNlyMNtjcivZ3RaHSjxM981YWXpEPvCwFgUWxgCintlii6eml4begi+97iALA0kj6nlO6UaJqt7IIQ01d3QQBYMh2oop2blYiaXl2ASfrhLQQAq6K5dHppkNlBWpD8xVsAAFbNJrKpW8sQ8nvvQgCohQ5aByWyJivk/NC7AABqY/eWlei6KPsFwGsGgNrotvJbia5x5Zy3vEYAqNa/h/w6hb1wmwCgUvYEUYkwtpIA1s/EltJ+tvSaAKBWmltnXYDZvWFeAwDU7vjk5LZuJQeb3ocAULsYf94nxACsL+ntjP/g0PsQAGpnIWblfggAleu2k1bB/k3RaQCAmnUH+12I8d9hANaMDl+/uwCzEonvvCYAqJbkjyXCdBJLaddtAoBKaW49LhHWNMPh8KaOZr+8RgCojebV6d/zsD+lqfbcawaA6kh6WaLroso0xjslAVRNcyoOBoNbJbomy+65sDHNuxAAanDpuyg55AdQLW8b6ZU2PtOJ7MxdBABWIMT0ukTUbGXPJGmYtd5iALAsNlCF2Htaoulqddy29zT9PnkLA8CiaYAdzvzm72llU5mG2QcO/QEsWjd5ST5wX8s2b9ltGLawHa6FmN/ql+0DwLy6Rx81V0TyXoxxo0TODNU05w7CMkjx4fr6AAAAAElFTkSuQmCC">

<img style="position:absolute;top:0.38in;left:0.81in;width:3.45in;height:0.27in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAZCAYAAABZ7RmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABuSURBVHhe7dQBCQAwDMCw+xf6MxW7jkIKsdAjSfnumwUoMjEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPSTAxIMzEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPCZj+9nayowhm6/AAAAABJRU5ErkJggg==">

<img style="position:absolute;top:0.38in;left:4.24in;width:3.45in;height:0.27in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAZCAYAAABZ7RmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABuSURBVHhe7dQBCQAwDMCw+xf6MxW7jkIKsdAjSfnumwUoMjEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPSTAxIMzEgzcSANBMD0kwMSDMxIM3EgDQTA9JMDEgzMSDNxIA0EwPCZj+9nayowhm6/AAAAABJRU5ErkJggg==">


<img style="position:absolute;top:0.20in;left:4.24in;width:3.45in;height:0.36in" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATEAAAAhCAYAAACxxJxHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJoSURBVHhe7d2hc1NBEMfxN4NAVCAQCERFBQJZgUD0D0BUVCIQCCSCPwCBRCARiAokAomoqEAgEPwBiAp6e3d5IUynAtGZpLsvByUzO2nakOQy892Zj8q+i/vN3uW9vOY61e/374q02zH2HonkJwBwXeMcabctV0rELKZijA9CzK+CpO8S8wgA/jfNlyMNtjcivZ3RaHSjxM981YWXpEPvCwFgUWxgCintlii6eml4begi+97iALA0kj6nlO6UaJqt7IIQ01d3QQBYMh2oop2blYiaXl2ASfrhLQQAq6K5dHppkNlBWpD8xVsAAFbNJrKpW8sQ8nvvQgCohQ5aByWyJivk/NC7AABqY/eWlei6KPsFwGsGgNrotvJbia5x5Zy3vEYAqNa/h/w6hb1wmwCgUvYEUYkwtpIA1s/EltJ+tvSaAKBWmltnXYDZvWFeAwDU7vjk5LZuJQeb3ocAULsYf94nxACsL+ntjP/g0PsQAGpnIWblfggAleu2k1bB/k3RaQCAmnUH+12I8d9hANaMDl+/uwCzEonvvCYAqJbkjyXCdBJLaddtAoBKaW49LhHWNMPh8KaOZr+8RgCojebV6d/zsD+lqfbcawaA6kh6WaLroso0xjslAVRNcyoOBoNbJbomy+65sDHNuxAAanDpuyg55AdQLW8b6ZU2PtOJ7MxdBABWIMT0ukTUbGXPJGmYtd5iALAsNlCF2Htaoulqddy29zT9PnkLA8CiaYAdzvzm72llU5mG2QcO/QEsWjd5ST5wX8s2b9ltGLawHa6FmN/ql+0DwLy6Rx81V0TyXoxxo0TODNU05w7CMkjx4fr6AAAAAElFTkSuQmCC">

<img style='position:absolute;top:0.23in;left:1.70in;width:1.51in;height:0.39in' alt='LOGO1' src='data:image/png;base64,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' />


<img style='position:absolute;top:0.23in;left:5.24in;width:1.51in;height:0.39in'   alt='LOGO2'  src='data:image/png;base64,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'>


<img style="position:absolute;top:1.80in;left:7.10in;width:0.52in;height:0.49in" alt='FIRMA' src='data:image/png;base64,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'>

<div style="position:absolute;top:2.21in;left:7.06in;width:0.50in;line-height:0.06in;"><span style="font-style:normal;font-weight:normal;font-size:4pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">Dr. Juan Jorge Olcese</span><br></div>
<div style="position:absolute;top:2.27in;left:7.18in;width:0.23in;line-height:0.06in;"><span style="font-style:normal;font-weight:normal;font-size:4pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">Presidente</span></div>

<div style="position:absolute;top:1.22in;left:4.40in;width:3.26in;">
<span style="font-style:normal;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;">
Nota: La posesión de este comprobante obligatorio será prueba suficiente de la vigencia del<br>
seguro obligatorio de automotores exigido por el articulo 68 de la Ley Nº 24.449. Conforme el<br>
articulo 2º de la Disposición Nº 70/2009 de la AGENCIA NACIONAL DE SEGURIDAD VIAL, la falta<br>
de portación del recibo de pago de prima del seguro obligatorio por parte del conductor del<br>
vehículo, no podrá ser aducida por la Autoridad de Constatación para determinar el<br>
incumplimiento de los requisitos para la circulación.<br>
</span><br><br><br><br><br><br></div>

<img style="position:absolute;top:2.17in;left:6.96in;width:0.68in;height:0.02in"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAACCAYAAADrTtSRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAVSURBVChTYwCC/yMMgwE2iWGMGRgAqYR3icki4WoAAAAASUVORK5CYII=">

<div style="position:absolute;top:0.77in;left:0.86in;width:3.40in;line-height:0.16in;">

<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Asegurado: </span>
<span class="value" style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.nombre}</span>
</div>
<div style="position:absolute;top:0.77in;left:0.86in;width:1.69in;line-height:0.16in;">
<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Póliza: </span>
<span class="value" style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.poliza}</span>

<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;">Vigencia: </span>

<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.nuevovto0}</span>
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">  al </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.nuevovto6}</span>
</div>
<div style="position:absolute;top:1.14in;left:0.86in;width:3.29in;line-height:0.20in;"><div style="position:relative; left:0.16in;"><br></div>
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Marca: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.marca}</span><br>

<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Tipo: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.tipo}</span>

<br></div>
<div style="position:absolute;top:0.96in;left:2.69in;width:1.49in;line-height:0.12in;">
<span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Cobertura: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.cobertura}</span>
<br></div>

<div style="position:absolute;top:0.84in;left:4.50in;width:2.95in;line-height:0.12in;text-align:center;"><div style="position:relative">

<span style="font-style:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.5pt;line-height:1.5;color:#000000">SEGURO OBLIGATORIO AUTOMOTOR CONFORME DECRETO 1716/08<br></span></div>
<span style="font-style:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.5pt;line-height:1.5;color:#000000">(Reglamentario de la Ley Nacional de Transito y Seguridad Vial Nº 26363)</span>


<br></div>





<div style="position:absolute;top:1.62in;left:2.69in;width:1.50in;line-height:0.15in;"><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Dominio:</span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.patente}</span>

<br><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Chasis: </span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.chasis}</span>

<br></div>
<div style="position:absolute;top:1.62in;left:0.86in;width:1.69in;line-height:0.15in;"><div style="position:relative; left:0.27in;"><br>

</div><span style="font-style:normal;font-weight:normal;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Nº Motor:</span>
<span style="font-style:normal;font-weight:bold;font-size:6pt;font-family:Verdana;color:#000000;letter-spacing:-0.3pt;line-height:1.5;color:#000000">${data.motor}</span>
<br></div>
<div style="position:absolute;top:1.99in;left:5.12in;width:1.71in;line-height:0.12in;">

<span style="font-style:normal;font-weight:bold;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Agrosalta Cooperativa de Seguros Limitada</span><br><div style="position:relative; left:0.25in;"><span style="font-style:normal;font-weight:normal;font-size:5pt;font-family:Verdana;color:#000000;letter-spacing:-0.2pt;line-height:1.5;color:#000000">Pedernera  237  - (4400) - Salta</span><br></div></div>


   <div style="transform: rotate(-5deg); position:absolute; 
       z-index: 2; top:3.60in; left:6.42in; padding-bottom: 20; width: 142px; height: 40px; border: 3px solid #686868; ${border25Style}">
       <h3 style="color: #686868; text-align: center; font-size: 1.8rem; margin-top: 15px"><b>PAGADO<b></h3>
   </div>
   
  <div style="position:absolute;top:2.38in;left:4.25in;width:4.71in;line-height:0.12in;" id="downloadButton">


   
   
   <div class="border25" style="${border25Style}">
     
     <div style="display: flex; flex-direction: row; margin: 0,5px; border: 2px solid whiten;">
       <div class="col-8" style="border: 1px solid white;">
           <h6 style="font-size: 12px; margin: 0px;"><b>COMPAÑIA:<b></h6>
           <h6 style="margin: 6 0px; font-size: 1rem"><b>${data.compania}<b></h6>
       </div>
       <div style="text-align: center;border: 1px solid white;">
           <h6 style="font-size: 12px; margin: 0px;"><b>RECIBO N°:<b></h6>
           <h6 style="margin: 6 0px; font-size: 1rem"><b>${data.recibo}<b></h6>
       </div>
     </div>

<div style="display: flex; flex-direction: row; margin: 0px;">
   <div style="height: 15px; border: 2px solid white; flex-basis: 20%; flex-grow: 0;">
       <h6 style="font-size: 10px; font-weight: 700; margin: 0px;">Recibi de:</h6>
   </div>
   <div style="height: 15px; background-color: #dcdcdc; border: 1px solid black; flex-basis: 80%; flex-grow: 1;">
       <h6 style="padding-left: 3px; font-size: 10px; font-weight: 500; margin: 1px;"><b>${data.dni} - ${data.nombre}.-</b></h6>
   </div>       
</div>

<div style="display: flex; flex-direction: row; margin: 0px;">
   <div style="height: 15px; border: 2px solid white; flex-basis: 20%; flex-grow: 0;">
       <h6 style="font-size: 10px; font-weight: 700; margin:0px;">La suma:</h6>
   </div>
   <div style="height: 15px; background-color: #dcdcdc; border: 1px solid black; flex-basis: 80%; flex-grow: 1;">
       <h6 style="padding-left: 3px; font-size: 10px; font-weight: 500;margin:2px"><b>$${data.importe}.- QUE SE APLICARÁ A LA POLIZA DE REF.-</b></h6>
   </div>       
</div>


<div style="display: flex; flex-direction: row; height: 34px; padding: 0; margin: 0px;">
   <div style="flex-basis: 100%; flex-grow: 1;">
       <h6 style="font-size: 9px; font-weight: 700; margin: 0px; letter-spacing: -0.4px; line-height: 1.3;">
           en concepto de seguro y servicio, de acuerdo a lo establecido por la resolución
           N°429/2000 del Ministerio de Economía de la Nación, resolución N° 27.627 y
           aclaratorias de la Superintendencia de Seguros de la Nación
       </h6>
   </div>
</div>



   <div class="col-12" style="height:12px; padding: 0px">
       <h6 style="font-size: 9px;font-weight: 700;margin:3px 0px;text-decoration: underline;">Datos del Vehiculo:</h6>
</div>
<div class="col-8" style="height:23px; background-color: #dcdcdc; border: 1px solid black; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
   <h6 style="font-size: 8px; margin: 0px 2px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><b>PATENTE: ${data.patente} - ${data.marca}<span id="texto"></span></b></h6>
   <h6 style="font-size: 8px; margin: 0px 0px 1px 1px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><b>CUOTA N°1 DESDE ${data.vigenciaDesde} HASTA <span id="vto-date">${data.nuevovto}</span></b></h6>
</div>

<div style="display: flex; flex-direction: row; margin: 0,5px; border-top: 2px solid white;">
   <div class="col-3" style="height:15px; padding: 0px; border: 2px solid white;">
       <h6 style="font-size: 7px;font-weight: 700;margin: 0px; width: 80px">Lugar y Fecha:</h6>
   </div>
   <div class="col-6" style="height:12px; padding: 0px; background-color: #dcdcdc;border: 1px solid black;">
       <h6 style="padding-left:3px;font-size: 8px;font-weight: 500;margin: 1px 0px 0px 2px;"><b>Marcos Paz - ${data.vigenciaDesde}</h6>
   </div>       
 </div>

<div style="display: flex; flex-direction: row; margin: 0px; border: 2px solid white; width: 100%;">
   <div style="flex-basis: 50%; border: 1px solid black; padding: 5px;">
       <h6 style="font-size: 9px; margin: 0px;"><b>Whatsapp de atención al cliente:</b></h6>
       <h4 style="margin: 5px 0px 2px 0px;"><b>11 2185-3948</b></h4>
   </div>
   <div style="flex-basis: 50%; text-align: center; border: 1px solid black; padding: 5px;">
       <h6 style="font-size: 9px; margin: 0px;"><b>Recuerde tener la cuota al día</b></h6>
       <h6 style="font-size: 9px; margin: 0px;"><b>para evitar inconvenientes.</b></h6>
   </div>   
</div>



<div style="display: flex; flex-direction: column; width: 100%; box-sizing: border-box;">

 <!-- Fila con dos columnas -->
 <div style="display: flex; flex-direction: row; width: 100%; box-sizing: border-box;">
   <div style="flex: 1; height: 15px; padding: 0; box-sizing: border-box;">
     <h6 style="font-size: 10px; font-weight: 700; margin-top: 2px;">Asistencia 24hs:</h6>
   </div>
   <div style="flex: 3; height: 15px; display: flex; align-items: center; justify-content: center; padding: 0; box-sizing: border-box;">
     <h6 style="font-size: 10px; font-weight: 700; margin: 0px;">${data.numgrua}</h6>
   </div>
 </div>

 <!-- Fila con fondo de color -->
 <div style="text-align: center; padding: 0; margin: 0; width: 100%; border: 2px solid black; box-sizing: border-box;">
   <h6 style="color: black; font-size: 18px; font-weight: 700; padding: 0 0 0 5px; margin: 4px;">
     FIN DE COBERTURA: <span id="vto-date2">${data.nuevovto}</span>
   </h6>
 </div>
</div>



   </div>

 </div>



<div style="position: absolute; top: 2.38in; left: 0.52in; width: 3.71in; height: 200px; line-height: 0.12in; border: 2px solid black;" id="numAtencion">
 <div style="width: 100%; text-align: center; padding: 0; margin: 0; height: 30px; border: 1px solid black; box-sizing: border-box;">
   <h6 style="color: black; font-size: 32px; font-weight: 700; padding: 5px 0 0 5px; margin: 4px;">
     GIOIA SEGUROS
   </h6>
 </div>
 <div style="width: 100%; text-align: center; padding: 0; margin: 10px 0 0 0; height: 15px; box-sizing: border-box;">
   <h6 style="color: black; font-size: 18px; font-weight: 700; padding: 0 0 0 5px; margin: 4px;">
     Horarios de Atención:
   </h6>
 </div>
 <div style="width: 100%; text-align: center; padding: 0; margin: 10px 0 0 0; height: 15px; box-sizing: border-box;">
   <h6 style="color: black; font-size: 15px; font-weight: 700; padding: 0 0 0 5px; margin: 4px;">
     Lun a Vie 9 a 13hs y 15 a 19hs, Sab 9 a 13hs
   </h6>
 </div>
 <div style="width: 100%; text-align: center; padding: 0; margin: 5px 0 0 0; height: 15px; box-sizing: border-box;">
   <h6 style="color: black; font-size: 14px; font-weight: 700; padding: 0 0 0 5px; margin: 4px;">
     <u>Lineas de atención online por WHATSAPP:</u>
   </h6>
 </div>
 
 <div style="display: flex; width: 100%; height: auto; margin-top: 2px; box-sizing: border-box;">
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 16px; font-weight: 700; padding: 5px; margin:0px;">
       OFICINA M. PAZ:
     </h6>
   </div>
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 21px; font-weight: 700; padding: 5px; margin:0px;">
       11 2185-3948
     </h6>
   </div>
 </div>
 
 <div style="display: flex; width: 100%; height: auto; margin-top: 2px; box-sizing: border-box;">
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 16px; font-weight: 700; padding: 5px; margin:0px;">
       OFICINA M. ACOSTA:
     </h6>
   </div>
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 21px; font-weight: 700; padding: 5px; margin:0px;">
       11 2163-0409
     </h6>
   </div>
 </div>
 <div style="display: flex; width: 100%; height: auto; margin-top: 2px; box-sizing: border-box;">
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 16px; font-weight: 700; padding: 5px; margin:0px;">
       ACCIDENTES:
     </h6>
   </div>
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 21px; font-weight: 700; padding: 5px; margin:0px;">
       11 2676-0674
     </h6>
   </div>
 </div>
 <div style="display: flex; width: 100%; height: auto; margin-top: 2px; box-sizing: border-box;">
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 12px; font-weight: 700; padding: 5px; margin:0px;">
       REMOLQUE / ACARREO / GRUA / ASISTENCIA:
     </h6>
   </div>
   <div style="flex: 1; text-align: center; padding: 0; margin: 0; box-sizing: border-box;">
     <h6 style="color: black; font-size: 12px; font-weight: 700; padding: 5px; margin:0px;">
       SE ENCUENTRA EN LA TARJETA PARA CIRCULAR.
     </h6>
   </div>
 </div>
</div>

           </body>
       </html>
   `);
   
   printWindow.document.close();
   printWindow.focus();
   printWindow.print();
}


//  FUNCION PARA COMPROBAR LISTA NEGRA

function agroGruas(agrocnia) {
 var companiaSeleccionada = document.getElementById("cnia").value;

 var divMensajeRequerimiento = document.getElementById("mensajeRequerimiento");
 var divMensajeModelo = document.getElementById("mensajeModelo");
 var divMensajeMoto = document.getElementById("mensajeMoto");

 var valorModelo = document.getElementById("modelo").value;
 var valorPatente = document.getElementById("patente").value;

 // Oculta todos los mensajes inicialmente
 divMensajeRequerimiento.style.display = "none";
 divMensajeModelo.style.display = "none";
 divMensajeMoto.style.display = "none";

 if ((companiaSeleccionada === "AGROSALTA [RC-GRUA]" || companiaSeleccionada === "AGROSALTA [B1]") || 
      (agrocnia === "AGROSALTA [RC-GRUA]" || agrocnia === "AGROSALTA [B1]")) {
       
   google.script.run
     .withSuccessHandler(function(result) {
       if (result) {
         alert("La patente ingresada corresponde a un vehículo el cual no se puede asegurar con grúa. El motivo es: " + result + ", se procederá a cambiar la compañía a AGROSALTA sin grúa.");
         document.getElementById("cnia").value = "AGROSALTA [RC]";
       }
     })
     .searchBlacklist(valorPatente);

   if (valorModelo.toUpperCase().startsWith("MOTO")) {
     divMensajeMoto.style.display = "block";
     
   } else if (valorModelo.toUpperCase().includes("VEH AÑO <= 1994")) {
     divMensajeModelo.style.display = "block";
   } else {
     divMensajeRequerimiento.style.display = "block";
   }
 }
}



 ///////// LIMPIAR ///////////////
function cleanservice() {
 
 if(document.getElementById("dni").value === "" || document.getElementById("patente_sn").value === "") {
alert("MAMAAAAAAAA!")
alert("SACÁ LA MANO DE AHÍ CARAJO!")
alert("No, estoy con el pan nada más.")
alert("ACABÁ DE CORTÁ LA LETRICIDÁ PORQUE")
alert("METISTE UN CUTU-CUCHILLO AHÍ")
alert("TE PODÉ QUEDA' ELETRIFICADA, LOCA!")
alert("Ah bueno, no importa")
alert("De algo hay que morir.")
alert("YO NO TE PO' CREER.")
alert("Saqué el pan, Ricardo.")
alert("MAMÁ, CORTASTE TODA LA LOOZ.")
alert("TOCASTE ALGO QUE HABÍAKJXZ")
alert("Vos sabés que toqué ahi")
alert("Eso tienen que arreglarlo porque no puede ser asi")
alert("SACALACAI")
alert("SACAL APAISAL")
alert("DESANCHUFALO!")
alert("METISTE UN CUTU-CUCHILLO AHÍ")
return
}

 event.preventDefault();

 const boton = document.getElementById('bt-ingreso');
   const spinner = document.getElementById('spinner_clean');
   spinner.style.display = 'inline-block';
   boton.disabled = true;
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombreCompleto").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoFpago =  document.getElementById("fpago").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoNotascte =  document.getElementById("notascte").value;
   let infoPatente1 =  document.getElementById("patente").value;
   let infoPatente =  document.getElementById("patente_sn").value;
   let infoMarca =  document.getElementById("marca").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoRefa =  document.getElementById("refa").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoNotasVeh =  document.getElementById("notasveh").value;
   let infoNotasVehold =  document.getElementById("notasvehold").value;
   let infoUsuario =  sessionStorage.getItem("magi-usuario");
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let info_input_nombre =  sessionStorage.getItem("text-box-numeroInventario_nombre");
   let info_input_dni =  document.getElementById("text-box-numeroInventario_dni").value;
   let info_input_patente =  document.getElementById("patente").value;
   let infodniValorid =  document.getElementById("dniValorid").value;
   let infonombreCompletoValor =  document.getElementById("nombreCompletoValor").value;
   let infologoValor =  document.getElementById("logoValor").value;
   let infowhatsappValor =  document.getElementById("whatsappValor").value;
   let infostatCte =  document.getElementById("statCte").value;
   let infosinPendientes =  document.getElementById("sinPendientes").value;
   let infopatenteValor =  document.getElementById("patenteValor").value;
   let infomarcaValor =  document.getElementById("marcaValor").value;
   let infocniaValor =  document.getElementById("cniaValor").value;
   let infostatVeh =  document.getElementById("statVeh").value;
   let infosinPendientes2 =  document.getElementById("sinPendientes2").value;



infoDNI =  "";
infoCliente =  "";
infoDomicilio =  "";
infoLocalidad =  "";
infoWpp =  "";
infoMail =  "";
infoFpago =  "";
infoSucursal =  "";
infoNotascte =  "";
infoPatente =  "";
infoMarca =  "";
infoRefa =  "";
infoCnia =  "";
infoCobertura =  "";
infoImporte =  "";
infoPoliza =  "";
infoOperacion =  "SEGURO NUEVO";
var today = new Date();
infoVigencia.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoHasta.value = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoDanios =  "";
infoNotasVeh =  "";
infoNotasVehold =  "";
infoUsuario =  "";
infoNotasFull = "";
infoMotor =  "";
infoChasis =  "";
info_input_nombre =  "";
info_input_dni =  "";
info_input_patente =  "";
infodniValorid =  "";
infonombreCompletoValor =  "";
infologoValor =  "";
infowhatsappValor =  "";
infostatCte =  "";
infosinPendientes = "";
infopatenteValor = "";
infomarcaValor = "";
infocniaValor = "";
infostatVeh = "";
infosinPendientes2 = "";
infoPatente1= "";

document.getElementById('valoresContainer').style.display = 'none';
document.getElementById('valoresContainer_veh').style.display = 'none';
document.getElementById('formContainer').style.display = 'none';
document.getElementById('formContainer_veh').style.display = 'none';
spinner.style.display = 'none';
boton.disabled = false;

alert('Limpieza completa de sistema');
}



/////////////////////////////////////////////////////////////////
//////////////////// SESION DE USUARIOS /////////////////////////
/////////////////////////////////////////////////////////////////

//////////////////// INICIAR SESION ////////////////////////


// Obtener el modal
var modal = document.getElementById("myModal");
var tiempoRestanteDiv = document.getElementById("tiempo-restante");

// Función para realizar el inicio de sesión
// var usuarioAlmacenado = sessionStorage.getItem("magi-usuario");
// var horaInicioAlmacenada = sessionStorage.getItem("magi-horaInicio");
// var colorAlmacenado = sessionStorage.getItem("magi-color");

// Función para calcular el tiempo restante en milisegundos
function calcularTiempoRestante() {
 var horaInicio = parseInt(sessionStorage.getItem("magi-horaInicio"));
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
   tiempoRestanteDiv.textContent = "Sesion: " + horas + ":" + minutos + ":" + segundos;
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


if (sessionStorage.getItem("magi-usuario")) {
 document.getElementById("usuario_sp").textContent = sessionStorage.getItem("magi-usuario");
 user.style.display = "block";
 close_session.style.display = "block";
 modal.style.display = "none";

 if (sessionStorage.getItem("magi-color")) {
   document.body.style.backgroundColor = sessionStorage.getItem("magi-color");
 } else {
   google.script.run.withSuccessHandler(function (color) {
     if (color) {
       sessionStorage.setItem("magi-color", color);
       document.body.style.backgroundColor = color;
     }
   }).buscarColorAlmacenado(sessionStorage.getItem("magi-usuario"));
 }

 var tiempoRestante = calcularTiempoRestante();
 mostrarTiempoRestante(tiempoRestante);
 iniciarContadorTiempo(tiempoRestante);
} else {
 modal.style.display = "block";

 // function closeModal() {
 //   modal.style.display = "none";
 // }

 document.getElementById("inicio-sesion").addEventListener("click", function (event) {
   event.preventDefault();

   var usuario = document.getElementById("usuario").value;
   var contrasena = document.getElementById("contrasena").value;
   var colorPicker = document.getElementById("colorPicker");
   var colorSeleccionado = colorPicker.value;

   google.script.run.withSuccessHandler(function (color) {
     console.log(color)
       document.getElementById("usuario_sp").textContent = usuario;
       modal.style.display = "none";
       user.style.display = "block";
       close_session.style.display = "block";

       sessionStorage.setItem("magi-usuario", usuario);
       sessionStorage.setItem("magi-horaInicio", new Date().getTime());

     if (color) {
       sessionStorage.setItem("magi-color", color);
       document.body.style.backgroundColor = color;
     } else {
       sessionStorage.setItem("magi-color", "#000000");
       document.body.style.backgroundColor = "#000000";
       console.log("Color no encontrado");
     }

     var tiempoRestante = calcularTiempoRestante();
     mostrarTiempoRestante(tiempoRestante);
     iniciarContadorTiempo(tiempoRestante);
   }).verificarCredenciales(usuario, contrasena);
 });
}



function verificarSesionVencida() {
 var tiempoRestante = calcularTiempoRestante();

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
   console.log("Sesión vigente, quedan: " + horas + " hs, " + minutos + " min, " + segundos + " seg.");
 }
}

setInterval(verificarSesionVencida, 10000);


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
     sessionStorage.removeItem("magi-color");
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



/// EVENT LISTENERS ////


document.getElementById("subir_foto_veh").addEventListener("click", function(event) {
   event.preventDefault();

   // Mostrar spinner de carga en el botón
   var button = document.getElementById("subir_foto_veh");
   button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subiendo...';
   button.disabled = true; // Deshabilitar el botón mientras se suben las fotos

   var files = document.getElementById("fileInput_veh").files;
   var patente = document.getElementById("patente").value;
   var filesBase64 = [];

   if (files.length > 0 && patente) {
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
                       // Cuando todos los archivos estén procesados, procede a subir
                       google.script.run.withSuccessHandler(function() {
                           document.getElementById("fileInput_veh").value = ""; // Limpiar el input de archivos
                           // Mover los elementos de vehiculo_carga a vehiculo_vista
                           var vehiculo_vista = document.getElementById("vehiculo_vista");
                           var vehiculo_carga = document.getElementById("vehiculo_carga");
                           while (vehiculo_carga.firstChild) {
                               var child = vehiculo_carga.firstChild;
                               // Verifica y elimina el botón de eliminar si está presente
                               var deleteButton = child.querySelector(".delete-icon");
                               if (deleteButton) {
                                   deleteButton.remove();
                               }
                               vehiculo_vista.appendChild(child); // Mueve el elemento
                           }
                           button.innerHTML = 'Subir Foto';
                           button.disabled = false;
                       }).uploadFilesToDrive('18rVebn9nL-lK6qWT6t0TwfoazQkwCIMn', filesBase64, patente);
                   }
               };
           });
       });
   } else {
       alert("Por favor seleccione al menos una foto y especifique la patente del vehículo.");
       button.innerHTML = 'Subir Foto';
       button.disabled = false;
   }
});




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

document.getElementById('emi2_show_modal').addEventListener('click', function() {
 event.preventDefault();
   document.getElementById("emi2_modal_container").style.display = "block";

   /// DATOS DE CLIENTE A INGRESAR
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombreCompleto").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoNotascte =  document.getElementById("notascte").value;

   /// DATOS DE POLIZA A INGRESAR
   let infoFpago =  document.getElementById("fpago").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoRefa =  document.getElementById("refac").value;
   let infoRefaDesde =  document.getElementById("refa_desde").value;
   let infoRefaHasta =  document.getElementById("refa_hasta").value;
   let infoVigTot =  document.getElementById("vigtot").value;
   let infoNotifica = document.getElementById("notifica").value;

   /// DATOS DE VEHICULO A INGRESAR
   let ramo =  document.getElementById("ramo_1").value;
   let ramo_pat =  document.getElementById("patente_sn").value;
   let infoPatente =  ramo + ramo_pat;
   let infoMarca =  document.getElementById("marca").value;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoTipo =   document.getElementById("tipo").value;
   let infoAnio =   document.getElementById("modelo").value;
   let infoColor =   document.getElementById("color").value;
   let infoVTV =   document.getElementById("vtv").value;
   let infoSumaAseg =  document.getElementById("suma_aseg").value;
   let infoAcc1 =  document.getElementById("accesorio1").value;
   let infoAcc1valor =  document.getElementById("accesorio1_valor").value;
   let infoNotasVeh =  document.getElementById("notasveh").value;

   // Mostrar datos en el modal solo si hay valores
   if (infoDNI) document.getElementById("modalDNI").value = infoDNI;
   if (infoCliente) document.getElementById("modalCliente").value = infoCliente;
   if (infoDomicilio) document.getElementById("modalDomicilio").value = infoDomicilio;
   if (infoLocalidad) document.getElementById("modalLocalidad").value = infoLocalidad;
   if (infoWpp) document.getElementById("modalWpp").value = infoWpp;
   if (infoMail) document.getElementById("modalMail").value = infoMail;
   if (infoNotascte) document.getElementById("modalNotascte").value = infoNotascte;
   if (infoFpago) document.getElementById("modalFpago").value = infoFpago;
   if (infoSucursal) document.getElementById("modalSucursal").value = infoSucursal;
   if (infoCnia) document.getElementById("modalCnia").value = infoCnia;
   if (infoCobertura) document.getElementById("modalCobertura").value = infoCobertura;
   if (infoImporte) document.getElementById("modalImporte").value = infoImporte;
   if (infoPoliza) document.getElementById("modalPoliza").value = infoPoliza;
   if (infoOperacion) document.getElementById("modalOperacion").value = infoOperacion;
   if (infoVigencia) document.getElementById("modalVigencia").value = infoVigencia;
   if (infoHasta) document.getElementById("modalHasta").value = infoHasta;
   if (infoRefa) document.getElementById("modalRefa").value = infoRefa;
   if (infoRefaDesde) document.getElementById("modalRefaDesde").value = infoRefaDesde;
   if (infoRefaHasta) document.getElementById("modalRefaHasta").value = infoRefaHasta;
   if (infoVigTot) document.getElementById("modalVigTot").value = infoVigTot;
   if (infoNotifica) document.getElementById("modalNotifica").value = infoNotifica;
   if (infoPatente) document.getElementById("modalPatente").value = infoPatente;
   if (infoMarca) document.getElementById("modalMarca").value = infoMarca;
   if (infoMotor) document.getElementById("modalMotor").value = infoMotor;
   if (infoChasis) document.getElementById("modalChasis").value = infoChasis;
   if (infoDanios) document.getElementById("modalDanios").value = infoDanios;
   if (infoTipo) document.getElementById("modalTipo").value = infoTipo;
   if (infoAnio) document.getElementById("modalAnio").value = infoAnio;
   if (infoColor) document.getElementById("modalColor").value = infoColor;
   if (infoVTV) document.getElementById("modalVTV").value = infoVTV;
   if (infoSumaAseg) document.getElementById("modalSumaAseg").value = infoSumaAseg;
   if (infoAcc1) document.getElementById("modalAcc1").value = infoAcc1;
   if (infoAcc1valor) document.getElementById("modalAcc1valor").value = infoAcc1valor;


   
   let labelPagoAgro = document.getElementById("labelPagoAgro");

   labelPagoAgro.textContent = "Ingresar pago de Agrosalta:";
   
   document.getElementById('pagoAgro_container').style.display = 'none';
   document.getElementById('acuerdoAgroB1_container').style.display = 'none';

   document.getElementById('pagRec').style.display = 'block';
   document.getElementById('genPag').style.display = 'none'; 
   
   if(infoCnia === "AGROSALTA [RC]" || infoCnia === "AGROSALTA [MOTO]" || infoCnia === "AGROSALTA [RC-GRUA]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   } else if(infoCnia === "AGROSALTA [B1]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   document.getElementById('acuerdoAgroB1_container').style.display = 'flex';
   }   

});


function generarPago(event) {
 event.preventDefault();

 let infoDNI = document.getElementById('modalDNI').value;
 let infoCliente = document.getElementById('modalCliente').value;
 let infoWpp = document.getElementById('modalWpp').value;
 let infoPatente = document.getElementById('modalPatente').value;
 let infoMarca = document.getElementById('modalMarca').value;
 let infoPoliza = document.getElementById('modalPoliza').value;
 let infoCnia = document.getElementById('modalCnia').value;
 let infoCuota = 1;
 let infoVigencia = document.getElementById('modalRefa').value;
 let infoImporte = document.getElementById('modalImporte').value;
 let infoVence = document.getElementById('modalVigencia').value;
 let infoColor = document.getElementById('modalColor').value;
 let infoUsuario = sessionStorage.getItem("magi-usuario");
 let infoMedio = "EFECTIVO"
 let infoSucursal = document.getElementById('modalSucursal').value;

   document.getElementById('pagoAgro_container').style.display = 'none';
   document.getElementById('acuerdoAgroB1_container').style.display = 'none';

 google.script.run.withSuccessHandler(function(reciboNumero) {
   // Coloca el número de recibo en el input con id 'modalRecibo'
   document.getElementById('modalRecibo').value = reciboNumero;

   let labelPagoAgro = document.getElementById("labelPagoAgro");

   labelPagoAgro.textContent = "N° de recibo generado:";

   document.getElementById('pagRecA').style.display = 'none';
   document.getElementById('genPag').style.display = 'block'; 
   
   if(infoCnia === "AGROSALTA [RC]" || infoCnia === "AGROSALTA [MOTO]" || infoCnia === "AGROSALTA [RC-GRUA]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   } else if(infoCnia === "AGROSALTA [B1]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   document.getElementById('acuerdoAgroB1_container').style.display = 'flex';
   }   

 }).withFailureHandler(function(error) {
   // Muestra un alert en caso de error
   alert("Ha ocurrido un error, reintente por favor.");
   console.error("Error al generar el recibo: " + error);
 }).pagoNuevo_inv(
   infoDNI,
   infoCliente,
   infoWpp,
   infoPatente,
   infoMarca,
   infoPoliza,
   infoCnia,
   infoCuota,
   infoVigencia,
   infoImporte,
   infoVence,
   infoColor,
   infoUsuario,
   infoMedio,
   infoSucursal
 );
}


function generarPagoDigital(event) {
 event.preventDefault();

 let infoDNI = document.getElementById('modalDNI').value;
 let infoCliente = document.getElementById('modalCliente').value;
 let infoWpp = document.getElementById('modalWpp').value;
 let infoPatente = document.getElementById('modalPatente').value;
 let infoMarca = document.getElementById('modalMarca').value;
 let infoPoliza = document.getElementById('modalPoliza').value;
 let infoCnia = document.getElementById('modalCnia').value;
 let infoCuota = 1;
 let infoVigencia = document.getElementById('modalRefa').value;
 let infoImporte = document.getElementById('modalImporte').value;
 let infoVence = document.getElementById('modalVigencia').value;
 let infoColor = document.getElementById('modalColor').value;
 let infoUsuario = sessionStorage.getItem("magi-usuario");
 let infoMedio = "DIGITAL"
 let infoSucursal = document.getElementById('modalSucursal').value;

   document.getElementById('pagoAgro_container').style.display = 'none';
   document.getElementById('acuerdoAgroB1_container').style.display = 'none';

 google.script.run.withSuccessHandler(function(reciboNumero) {
   // Coloca el número de recibo en el input con id 'modalRecibo'
   document.getElementById('modalRecibo').value = reciboNumero;
   
   
   let labelPagoAgro = document.getElementById("labelPagoAgro");

   labelPagoAgro.textContent = "N° de recibo generado:";

   document.getElementById('pagRecA').style.display = 'none';
   document.getElementById('genPag').style.display = 'block'; 
   

   if(infoCnia === "AGROSALTA [RC]" || infoCnia === "AGROSALTA [MOTO]" || infoCnia === "AGROSALTA [RC-GRUA]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   } else if(infoCnia === "AGROSALTA [B1]") {
   document.getElementById('pagoAgro_container').style.display = 'flex';
   document.getElementById('acuerdoAgroB1_container').style.display = 'flex';
   }   

 }).withFailureHandler(function(error) {
   // Muestra un alert en caso de error
   alert("Ha ocurrido un error, reintente por favor.");
   console.error("Error al generar el recibo: " + error);
 }).pagoNuevo_inv(
   infoDNI,
   infoCliente,
   infoWpp,
   infoPatente,
   infoMarca,
   infoPoliza,
   infoCnia,
   infoCuota,
   infoVigencia,
   infoImporte,
   infoVence,
   infoColor,
   infoUsuario,
   infoMedio,
   infoSucursal
 );
}



document.getElementById('printAcAB1').addEventListener('click', printAcuerdoAgroB1);
document.getElementById('printProp').addEventListener('click', printPropuesta);
document.getElementById('printCertCob').addEventListener('click', printCertCob);
document.getElementById('genPag').addEventListener('click', printTarRec);
document.getElementById('pagRec').addEventListener('click', generarPago);
document.getElementById('pagRecD').addEventListener('click', generarPagoDigital);

document.getElementById('emi2_close').addEventListener('click', function() {
 document.getElementById('emi2_modal_container').style.display = 'none';
});

document.getElementById('emi_close').addEventListener('click', function() {
 document.getElementById('emi_modal_container').style.display = 'none';
});

document.getElementById("cnia").addEventListener("change", agroGruas);
document.getElementById("cnia").addEventListener("change", function() {
buscarRefa()
});
document.getElementById("refac").addEventListener("change", function() {
 
document.getElementById("refa_hasta").value =  sumarMeses(document.getElementById("refa_desde").value,document.getElementById("refac").value)

});
document.getElementById("vigtot").addEventListener("change", function() {
 
document.getElementById("hasta").value =  sumarMeses(document.getElementById("vigencia").value,document.getElementById("vigtot").value)

});
document.getElementById('bt-capturePhoto').addEventListener('click', capturePhoto);
document.getElementById('bt-switchCamera').addEventListener('click', switchCamera);
document.getElementById('bt-sendPhotos').addEventListener('click', sendPhotos);
document.getElementById('formularioEmision').addEventListener('submit', ingresarPoliza);
// document.getElementById('bt-ingreso').addEventListener('click', ingresarPoliza);
document.getElementById('bt-buscar').addEventListener('click', filtrar);
document.getElementById('bt-buscar2').addEventListener('click', filtrar2);
document.getElementById('close_session').addEventListener('click', close_sessionok);
