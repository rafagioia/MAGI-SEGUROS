
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

   // Abrir modal al hacer clic en el bot�n
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

// Funci�n para abrir el modal
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


   // Cerrar modal al hacer clic en la "X"
 //   closeModal.onclick = function() {
 // event.preventDefault();
 //     modalContainer.style.display = "none";
 //   }
 closeModal.addEventListener('click', function() {
 event.preventDefault();
     modalContainer.style.display = "none";
 });
   // Cerrar modal al hacer clic fuera del contenido del modal
 //   window.onclick = function(event) {
 // event.preventDefault();
 //     if (event.target == modalContainer) {
 //       modalContainer.style.display = "none";
 //     }
 //   }
// Funci�n para imprimir el contenido del modal
imprimirModalButton.onclick = function() {
 // Abrir una nueva ventana emergente
 var printWindow = window.open('', '', 'width=1000,height=600');

 // Clonar el contenido del modal y agregarlo a la ventana emergente
 var modalContentClone = modalContent2.cloneNode(true);
 printWindow.document.body.appendChild(modalContentClone);

 // Imprimir la ventana emergente
 printWindow.print();

 // Cerrar la ventana emergente despu�s de la impresi�n
 printWindow.close();
}
   
/////////// DESHABILITAMOS EL BOTON DE ENVIO ///////////////
 const miFormulario = document.getElementById('formularioEmision');
 miFormulario.addEventListener('submit', function() {
   const boton = document.querySelector('input[type="submit"]');
   boton.disabled = true;
 });
 /////////////////////////////////////////////////////

 ///////// INGRESAR SEGURO NUEVO ///////////////
function ingresarPoliza(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-ingreso');
   const spinner = document.getElementById('spinner5');
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
   let infoPatente =  document.getElementById("patente_sn").value;
   let infoMarca =  document.getElementById("marca").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoRefa =  document.getElementById("refac").value;
   let infoSumaAseg =  document.getElementById("suma_aseg").value;
     let sumaAseg = ""
   if (infoSumaAseg == "") {
   } else {
     sumaAseg = "SA: $" + infoSumaAseg + " | "
   }
   let infoNotasVeh =  document.getElementById("notasveh").value;
   let infoNotasVehold =  document.getElementById("notasvehold").value;
   let infoUsuario =  sessionStorage.getItem("magi-usuario");
   let infoNotasFull = "//" + infoUsuario + " [" + infoVigencia + "] " + infoOperacion + " (" + infoNotasVeh + ") " + sumaAseg + infoNotasVehold;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let fechaHoy = new Date();
   let dia = fechaHoy.getDate();
   let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
   let anio = fechaHoy.getFullYear();
   let infoHoy = dia + '/' + mes + '/' + anio;




 google.script.run.seguroNuevo(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoRefa, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasFull, infoMotor, infoChasis, infoUsuario, infoHoy);
 event.target.reset();

const successAlert = document.getElementById('success-alert');

function fadeInAndOutElement(element) {
 fadeInElement(element, function() {
   setTimeout(function() {
     fadeOutElement(element);
   }, 6000); // Cambia la duraci�n del "fade in" a tu preferencia
 });
}

// Funci�n para aplicar el "fade in"
function fadeInElement(element, callback) {
 element.style.opacity = '0'; // Establecer la opacidad inicial a 0
 element.style.display = 'block'; // Asegurarse de que el elemento est� visible

 let opacity = 0;
 const fadeInInterval = setInterval(function () {
   if (opacity < 1) {
     opacity += 0.02; // Aumentar gradualmente la opacidad
     element.style.opacity = opacity;
   } else {
     clearInterval(fadeInInterval); // Detener el intervalo una vez que la opacidad llegue a 1
     if (typeof callback === 'function') {
       callback(); // Llamar al callback despu�s del "fade in"
     }
   }
 }, 50); // Intervalo de actualizaci�n de la opacidad (en milisegundos)
}

// Funci�n para aplicar el "fade out"
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
 }, 50); // Intervalo de actualizaci�n de la opacidad (en milisegundos)
}

// Llamar a la funci�n para mostrar el elemento con "fade in" y luego desaparecer con "fade out"
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
infoMarca =  "";
infoCnia =  "";
infoCobertura =  "";
infoImporte =  "";
infoPoliza =  "";
infoHoy =  "";
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
document.getElementById("dniValor").textContent = "";
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
document.getElementById("mantenimientosTableBody2").innerHTML = "";
spinner.style.display = 'none';
boton.disabled = false;

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


///// SCRIPT PARA BUSCAR DATOS POR DNI EN BD EMISION//////////

function buscarRegistros_dni_emision() {
 const boton = document.getElementById('buscarRegistrosBtn4');
 const spinner = document.getElementById('spinner4');
 spinner.style.display = 'inline-block';
 boton.disabled = true;
 const numeroInventario2 = document.getElementById("text-box-numeroInventario_dni").value;
 const infoDNI = document.getElementById("dni");
 const infoCliente = document.getElementById("nombreCompleto");
 const infoDomicilio = document.getElementById("domicilio");
 const infoLocalidad = document.getElementById("localidad");
 const infoWpp = document.getElementById("wpp");
 const infoMail = document.getElementById("mail");
 const infoNotascte = document.getElementById("notascte");
 const infoSucursal = document.getElementById("sucursal");
 document.getElementById("dniValor").textContent = "";
 document.getElementById("nombreCompletoValor").textContent = "";
 document.getElementById("whatsappValor").textContent = "";
 document.getElementById("statCte").textContent = "";
 document.getElementById("sinPendientes").textContent = "";
 document.getElementById('valoresContainer').style.display = 'none';
 document.getElementById('formContainer').style.display = 'none';

 const mostrarValores = (info) => {
   if (info[0].length > 0) {
     infoDNI.value = info[0][0][0];
     infoCliente.value = info[0][0][1];
     infoDomicilio.value = info[0][0][2];
     infoLocalidad.value = info[0][0][3];
     infoWpp.value = info[0][0][4];
     infoMail.value = info[0][0][6];
     infoNotascte.value = info[0][0][7];
     infoSucursal.value = "MARCOS PAZ";

     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('dniValor').textContent = infoDNI.value;
     document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
     document.getElementById('logoValor').innerHTML = "<img src='https://drive.google.com/uc?id=1JyM7APlNWzFD38ndFwd20EDcGHQVLybh' style='width: 100%;height: auto;'>";
     document.getElementById("statCte").textContent = infoNotascte.value;
     document.getElementById('whatsappValor').textContent = infoWpp.value;

     const tableBody2 = document.getElementById("mantenimientosTableBody2");
     tableBody2.innerHTML = ""; // Limpia la tabla antes de agregar nuevos datos

     let rowCount = 0;
     let processed = new Set();
   if (info[1] && info[1].length > 0) { // Verifica si info[1] est� definido y tiene elementos
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

           PolPatente.textContent = mantenimiento2[0];
           PolVehiculo.textContent = mantenimiento2[1];
           PolCnia.textContent = mantenimiento2[2];
           PolVtos.textContent = mantenimiento2[3];

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
         alert("No se encontraron valores");
         document.getElementById('valoresContainer').style.display = 'block';
         document.getElementById('statCte').textContent = "NUEVO CLIENTE";
         document.getElementById("nombreCompletoValor").value = "";
         document.getElementById("whatsappValor").value = "";
         infoDNI.value = numeroInventario2;
         infoCliente.value = "";
         infoDomicilio.value = "";
         infoLocalidad.value = "";
         infoWpp.value = "";
         infoMail.value = "";
         infoSucursal.value = "";
         infoNotascte.value = "";
       }
       spinner.style.display = 'none';
       boton.disabled = false;
     }).buscarMantenimientos11(numeroInventario2);
   }
 }).buscarMantenimientos4(numeroInventario2);
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
document.getElementById("dniValor").textContent = "";
document.getElementById("nombreCompletoValor").textContent = "";
document.getElementById("whatsappValor").textContent = "";
document.getElementById("statCte").textContent = "";
document.getElementById("sinPendientes").textContent =  "";
document.getElementById('valoresContainer').style.display = 'none';
document.getElementById('formContainer').style.display = 'none';

 const mostrarValores = (info) => {
   if (info.length > 0) {
     infoDNI.value = info[0][0];
     infoCliente.value = info[0][1];
     infoDomicilio.value = info[0][2];
     infoLocalidad.value = info[0][3];
     infoWpp.value = info[0][4];
     infoMail.value = info[0][6];
     infoNotascte.value = info[0][7];
     infoSucursal.value = "MARCOS PAZ";

     document.getElementById('valoresContainer').style.display = 'block';
     document.getElementById('dniValor').textContent = infoDNI.value;
     document.getElementById('nombreCompletoValor').textContent = infoCliente.value;
     document.getElementById('logoValor').innerHTML = "<img src='https://drive.google.com/uc?id=1JyM7APlNWzFD38ndFwd20EDcGHQVLybh' style='width: 100%;height: auto;'>";
     document.getElementById("statCte").textContent = infoNotascte.value;
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
         document.getElementById('mail').textContent = "";
         document.getElementById("notascte").textContent = "";
         mostrarValores(modifiedInfo);
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
       }
       spinner.style.display = 'none';
       boton.disabled = false;
     }).buscarMantenimientos12(numeroInventario);
   }
 }).buscarMantenimientos6(numeroInventario);
}


///// FIN DEL SCRIPT PARA BUSCAR DATOS POR NOMBRE //////////

function enviarMensajeWPP() {
 event.preventDefault();
 // Obtener el n�mero de tel�fono ingresado
 var telefono = document.getElementById("wpp").value;

 // Abrir WhatsApp Web con el n�mero de tel�fono y enviar un mensaje
 window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agend�%20nuestro%20n�mero%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}


/////////////////////// SISTEMA DE EMISION  ///////////////////////////////


 ///// SCRIPT PARA BUSCAR DATOS POR PATENTE EN BD EMISION //////////
 function buscarRegistros_emision() {
   const boton = document.getElementById('buscarRegistrosBtn2');
   const spinner = document.getElementById('spinner2');
   spinner.style.display = 'inline-block';
   boton.disabled = true;
   let patente = document.getElementById("patente").value;
   let infoPatente =  document.getElementById("patente_sn");
   let infoMarca =  document.getElementById("marca");
   let infoCnia =  document.getElementById("cnia");
   let infoCobertura =  document.getElementById("cobertura");
   let infoImporte =  document.getElementById("importe");
   let infoPoliza =  document.getElementById("poliza");
   let infoOperacion =  document.getElementById("operacion");
   let infoVigencia =  document.getElementById("vigencia");
   let infoHasta =  document.getElementById("hasta");
   let infoRefa =  document.getElementById("refa");
   let infoDanios =  document.getElementById("danios");
   let infoNotasVeh =  document.getElementById("notasvehold");
   let infoMotor =  document.getElementById("motor");
   let infoChasis =  document.getElementById("chasis");
document.getElementById("patenteValor").textContent =  "";
document.getElementById("marcaValor").textContent =  "";
document.getElementById("cniaValor").textContent =  "";
document.getElementById("statVeh").textContent =  "";
document.getElementById("sinPendientes2").textContent =  "";
document.getElementById('valoresContainer_veh').style.display = 'none';
document.getElementById('formContainer_veh').style.display = 'none';

   google.script.run.withSuccessHandler(info => {
     if (info.length > 0) {
       infoPatente.value = info[0][0];
       infoMarca.value = info[0][12];
       infoCnia.value = info[0][6];
       infoImporte.value = info[0][5];
       infoPoliza.value = "";
       infoOperacion.value = "SEGURO NUEVO";
       infoNotasVeh.value = info[0][14];
       infoDanios.value = info[0][15];

var today = new Date();
infoVigencia.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoHasta.value = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});

       infoCobertura.value = info[0][11];
       infoMotor.value = info[0][17];
       infoChasis.value = info[0][18];
document.getElementById('valoresContainer_veh').style.display = 'block';
document.getElementById('patenteValor').textContent = document.getElementById('patente').value;
document.getElementById('marcaValor').textContent = document.getElementById('marca').value;
document.getElementById('cniaValor').textContent = document.getElementById('cnia').value;
document.getElementById('statVeh').textContent = document.getElementById('cobertura').value;
       buscarModelo()
       buscarRefa()
     } else {
       alert("No se encontraron valores");
document.getElementById('valoresContainer_veh').style.display = 'block';
document.getElementById('statVeh').textContent = "NUEVO VEHICULO";
document.getElementById('patenteValor').textContent = document.getElementById('patente').value;
       infoPatente.value = patente
var today = new Date();
infoVigencia.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoHasta.value = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
       buscarModelo()
       buscarRefa()
infoMarca.value =  "";
infoMotor.value =  "";
infoChasis.value =  "";
infoCnia.value =  "";
infoCobertura.value =  "";
infoImporte.value =  "";
infoPoliza.value =  "";
infoDanios.value =  "";
infoNotasVeh.value =  "";
document.getElementById("notasveh").value =  "";
     }
     spinner.style.display = 'none';
     boton.disabled = false;
   }).buscarMantenimientos3(patente);
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
 // Actualizar HTML de la p�gina con los nuevos resultados
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
   sinPendientesDiv.innerHTML = pendientesHtml;

     // Agregar evento de click a los divs din�micos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el �ndice del div
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
var today = new Date();
infoVigencia.value = today.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
infoHasta.value = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});

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
 // Actualizar HTML de la p�gina con los nuevos resultados
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
   sinPendientesDiv.innerHTML = pendientesHtml;

     // Agregar evento de click a los divs din�micos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el �ndice del div
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

////////////// VALIDADOR DE A�O DE PATENTE /////////////////

function buscarModelo() {
 const patente = document.getElementById("patente_sn").value;
 var ano = "";
 
 if (patente.length == 6) {
   if (patente.slice(0, 3) >= "RAA" && patente.slice(0, 3) <= "XZZ") {
     ano = "VEH A�O <= 1994";
   } else if (patente.slice(0, 3) >= "AAA" && patente.slice(0, 3) <= "ACM") {
     ano = "VEH A�O: 1994";
   } else if (patente.slice(0, 3) >= "ACN" && patente.slice(0, 3) <= "APZ") {
     ano = "VEH A�O: 1995";
   } else if (patente.slice(0, 3) >= "AQA" && patente.slice(0, 3) <= "BCQ") {
     ano = "VEH A�O: 1996";
   } else if (patente.slice(0, 3) >= "BCR" && patente.slice(0, 3) <= "BSZ") {
     ano = "VEH A�O: 1997";
   } else if (patente.slice(0, 3) >= "BTA" && patente.slice(0, 3) <= "CKZ") {
     ano = "VEH A�O: 1998";
   } else if (patente.slice(0, 3) >= "CLA" && patente.slice(0, 3) <= "DBO") {
     ano = "VEH A�O: 1999";
   } else if (patente.slice(0, 3) >= "DBQ" && patente.slice(0, 3) <= "DNZ") {
     ano = "VEH A�O: 2000";
   } else if (patente.slice(0, 3) >= "DOA" && patente.slice(0, 3) <= "DXZ") {
     ano = "VEH A�O: 2001";
   } else if (patente.slice(0, 3) >= "DYA" && patente.slice(0, 3) <= "EBK") {
     ano = "VEH A�O: 2002";
   } else if (patente.slice(0, 3) >= "EBL" && patente.slice(0, 3) <= "EGT") {
     ano = "VEH A�O: 2003";
   } else if (patente.slice(0, 3) >= "EGU" && patente.slice(0, 3) <= "ETA") {
     ano = "VEH A�O: 2004";
   } else if (patente.slice(0, 3) >= "EUA" && patente.slice(0, 3) <= "FHP") {
     ano = "VEH A�O: 2005";
   } else if (patente.slice(0, 3) >= "FHQ" && patente.slice(0, 3) <= "FXB") {
     ano = "VEH A�O: 2006";
   } else if (patente.slice(0, 3) >= "FXC" && patente.slice(0, 3) <= "GVZ") {
     ano = "VEH A�O: 2007";
   } else if (patente.slice(0, 3) >= "GWA" && patente.slice(0, 3) <= "HSK") {
     ano = "VEH A�O: 2008";
   } else if (patente.slice(0, 3) >= "HSL" && patente.slice(0, 3) <= "IMZ") {
     ano = "VEH A�O: 2009";
   } else if (patente.slice(0, 3) >= "INA" && patente.slice(0, 3) <= "JMZ") {
     ano = "VEH A�O: 2010";
   } else if (patente.slice(0, 3) >= "JNA" && patente.slice(0, 3) <= "KTQ") {
     ano = "VEH A�O: 2011";
   } else if (patente.slice(0, 3) >= "KTR" && patente.slice(0, 3) <= "LLZ") {
     ano = "VEH A�O: 2012";
   } else if (patente.slice(0, 3) >= "LMA" && patente.slice(0, 3) <= "NJZ") {
     ano = "VEH A�O: 2013";
   } else if (patente.slice(0, 3) >= "NKA" && patente.slice(0, 3) <= "OMZ") {
     ano = "VEH A�O: 2014";
   } else if (patente.slice(0, 3) >= "ONA" && patente.slice(0, 3) <= "PMZ") {
     ano = "VEH A�O: 2015";
   } else if (patente.slice(0, 3) >= "PNA" && patente.slice(0, 3) <= "QQZ") {
     ano = "VEH A�O: 2016";
   } else if (patente.slice(3, 6) >= "AAA" && patente.slice(3, 6) <= "CZZ") {
     ano = "MOTO A�O <= 2007";
   } else if (patente.slice(3, 6) >= "DAA" && patente.slice(3, 6) <= "DMP") {
     ano = "MOTO A�O: 2007";
   } else if (patente.slice(3, 6) >= "DMQ" && patente.slice(3, 6) <= "DZA") {
     ano = "MOTO A�O: 2008";
   } else if (patente.slice(3, 6) >= "EAA" && patente.slice(3, 6) <= "EZZ") {
     ano = "MOTO A�O: 2009";
   } else if (patente.slice(3, 6) >= "FAA" && patente.slice(3, 6) <= "GZZ") {
     ano = "MOTO A�O: 2010";
   } else if (patente.slice(3, 6) >= "HAA" && patente.slice(3, 6) <= "HZD") {
     ano = "MOTO A�O: 2011";
   } else if (patente.slice(3, 6) >= "HZE" && patente.slice(3, 6) <= "IZZ") {
     ano = "MOTO A�O: 2012";
   } else if (patente.slice(3, 6) >= "JAA" && patente.slice(3, 6) <= "JYU") {
     ano = "MOTO A�O: 2013";
   } else if (patente.slice(3, 6) >= "JYV" && patente.slice(3, 6) <= "KWQ") {
     ano = "MOTO A�O: 2014";
   } else if (patente.slice(3, 6) >= "KWR" && patente.slice(3, 6) <= "LKZ") {
     ano = "MOTO A�O: 2015";
   } else if (patente.slice(3, 6) >= "LLA" && patente.slice(3, 6) <= "LZZ") {
     ano = "MOTO A�O: 2016";
   } else {
     ano = "A�O VEH NO ENCONTRADO.";
   }
 } else if (patente.length == 7) {
   if (patente.slice(0, 2) == "AA" && patente.slice(2, 4) <= "830") {
     ano = "VEH A�O: 2016";
   } else if (patente.slice(0, 2) == "AA" && patente.slice(2, 4) >= "831") {
     ano = "VEH A�O: 2017";
   } else if (patente.slice(0, 2) == "AB") {
     ano = "A�O: 2017";
   } else if (patente.slice(0, 2) == "AC" && patente.slice(2, 4) <= "178") {
     ano = "VEH A�O: 2017";
   } else if (patente.slice(0, 2) == "AC" && patente.slice(2, 4) >= "179") {
     ano = "VEH A�O: 2018";
   } else if (patente.slice(0, 2) == "AD" && patente.slice(2, 4) <= "537") {
     ano = "VEH A�O: 2018";
   } else if (patente.slice(0, 2) == "AD" && patente.slice(2, 5) >= "538") {
     ano = "VEH A�O: 2019";
   } else if (patente.slice(0, 2) == "AE" && patente.slice(2, 5) <= "070") {
     ano = "VEH A�O: 2019";
   } else if (patente.slice(0, 2) == "AE" && patente.slice(2, 5) <= "551") {
     ano = "VEH A�O: 2020";
   } else if (patente.slice(0, 2) == "AE" && patente.slice(2, 5) >= "552") {
     ano = "VEH A�O: 2021";
   } else if (patente.slice(0, 2) == "AF" && patente.slice(2, 5) <= "075") {
     ano = "VEH A�O: 2021";
   } else if (patente.slice(0, 2) == "AF" && patente.slice(2, 5) <= "699") {
     ano = "VEH A�O: 2022";
   } else if (patente.slice(0, 2) == "AF" && patente.slice(2, 5) >= "699") {
     ano = "VEH A�O:  >= 2023";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) <= "018") {
     ano = "MOTO A�O: 2016";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "019" && patente.slice(1, 4) <= "067") {
     ano = "MOTO A�O: 2017";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "068" && patente.slice(1, 4) <= "094") {
     ano = "MOTO A�O: 2018";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "095" && patente.slice(1, 4) <= "112") {
     ano = "MOTO A�O: 2019";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "113" && patente.slice(1, 4) <= "128") {
     ano = "MOTO A�O: 2020";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "129" && patente.slice(1, 4) <= "151") {
     ano = "MOTO A�O: 2021";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "152" && patente.slice(1, 4) <= "174") {
     ano = "MOTO A�O: 2022";
   } else if (patente.slice(0, 1) == "A" && patente.slice(1, 4) >= "175") {
     ano = "MOTO A�O: >= 2023";
   } else {
     ano = "A�O VEH NO ENCONTRADO.";
   }
 } else {
   ano = "PATENTE INV�LIDA.";
 }

 document.getElementById("modelo").value = ano;

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
 
 if (yearsSinceManufacture > 35) {
   plan_a += "[AGRO]\n";
 } 
 if (yearsSinceManufacture <= 35) {
   plan_a += "[AGRO]<br>[RIVAD]<br>[RIO U]<br>[FED P]<br>[LIBRA]<br>[SAN P]<br>[ORBIS]<br>[ATM] ";
 } 
 
 if (yearsSinceManufacture <= 10) {
   plan_b += " [FED P]<br>";
 }
 if (yearsSinceManufacture <= 10) {
   plan_b += " [RIVAD]<br>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_b += " [RIO U]<br>";
 }
 if (yearsSinceManufacture > 10) {
   plan_b += "[NO HAY]\n ";
 }
 
   plan_c += "[NO HAY]\n ";
   
   plan_d += "[NO HAY]\n ";
} else if (/^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{3}[0-9]{3}$/.test(patente)) {
 resultado += "AUTO\n";
 
 if (yearsSinceManufacture > 35) {
   plan_a += "[AGRO]<br>";
 } 
 if (yearsSinceManufacture <= 35) {
   plan_a += "[AGRO]<br>[RIVAD]<br>[RIO U]<br>[FED P]<br>[LIBRA]<br>[SAN P]<br>[ORBIS]<br>[ATM] ";
 } 
 
 /////////// PLAN B //////////////

 if (yearsSinceManufacture <= 19) {
   plan_b += "[FED P]<br>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_b += "[RIVAD]<br>";
 }
 if (yearsSinceManufacture <= 30) {
   plan_b += "[RIO U]<br>";
 }
 if (yearsSinceManufacture <= 25) {
   plan_b += "[NIVEL]<br>";
 }
 if (yearsSinceManufacture <= 20) {
   plan_b += "[MERC]<br>";
 }
 if (yearsSinceManufacture <= 20) {
   plan_b += "[ORBIS]<br>";
 }
 if (yearsSinceManufacture <= 23) {
     plan_b += "[PROV]<br>";
   } 
 if (yearsSinceManufacture > 30) {
   plan_b += "[NO HAY]<br>";
 }
 
 /////////// PLAN C-FULL //////////////
 
 if (yearsSinceManufacture <= 14) {
   plan_c += "[FED P]<br>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_c += "[RIVAD]<br>";
 }
 if (yearsSinceManufacture <= 22) {
   plan_c += "[RIO U]<br>";
 }
 if (yearsSinceManufacture <= 20) {
   plan_c += "[NIVEL]<br>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_c += "[MERC]<br>";
 }
 if (yearsSinceManufacture <= 18) {
   plan_c += "[PROV]<br>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_c += "[ORBIS]<br>";
 }
 if (yearsSinceManufacture > 22) {
   plan_c += "[NO HAY]<br>";
 }
 
 /////////// PLAN TD //////////////

 if (yearsSinceManufacture <= 8) {
   plan_d += "[FED P]<br>";
 }
 if (yearsSinceManufacture <= 10) {
   plan_d += "[RIVAD]<br>";
 }
 if (yearsSinceManufacture <= 15) {
   plan_d += "[RIO U]<br>";
 }
 if (yearsSinceManufacture <= 6) {
   plan_d += "[NIVEL]<br>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_d += "[MERC]<br>";
 }
 if (yearsSinceManufacture <= 8) {
   plan_d += "[PROV]<br>";
 }
 if (yearsSinceManufacture <= 10) {
   plan_d += "[ORBIS]<br>";
 }
 if (yearsSinceManufacture > 15) {
   plan_d += "[NO HAY]<br>";
 }
}

else {
 resultado += "Patente no v�lida\n";
}

document.getElementById("tipo_veh").innerHTML = `
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
`;

document.getElementById("planes").innerHTML = `
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
`;
console.log(resultado)
}

////////////////////////// VER REFACTURACION ////////////////////////


function buscarRefa() {
 let cnia = document.getElementById("cnia").value;
 var valor = "";

 if (["FED PAT", "MAPFRE",  "ALLIANZ","MERCANTIL", "NIVEL", "ORBIS"].includes(cnia)) {
   valor = 4;
 } else if (["LA CAJA", "RIVADAVIA", "PROVIDENCIA", "RIO URUGUAY", "ATM", "LIBRA"].includes(cnia)) {
   valor = 3;
 } else if (["AGROSALTA", "AGROSALTA C/GRUA", "AGRO MOTO", "AGRO (V)", "AGRO (V) C/GRUA", "GRUA", "SAN PATRICIO"].includes(cnia)) {
   valor = 6;
 } else {
   valor = 0;
 }

 document.getElementById("refac").value = valor;
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
   console.error('Error al acceder a la c�mara:', error);
 });

function capturePhoto(event) {
 event.preventDefault();
 canvas.width = video.videoWidth;
 canvas.height = video.videoHeight;
 context.drawImage(video, 0, 0, canvas.width, canvas.height);

 // Agregar fecha y hora actual en el lienzo
 var fechaHoraActual = new Date().toLocaleString();
 context.font = 'bold 35px arial black'; // Fuente m�s gruesa
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
   imageContainer.innerHTML = "";
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
             console.error('Error al cambiar de c�mara:', error);
           });
       } else {
         console.log('No se encontraron c�maras adicionales.');
       }
     })
     .catch(function(error) {
       console.error('Error al enumerar los dispositivos:', error);
     });
 } else {
   console.log('La funci�n enumerateDevices no est� disponible en este navegador.');
 }
}


       var canvas2 = document.getElementById('canvas2');
     var resultado = document.getElementById('resultado');
       var currentCamera = 'environment'; // Valor inicial de la c�mara trasera

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

       // Ajustar el tama�o del lienzo temporal para obtener una imagen de mayor calidad
       var scaleFactor = 4; // Ajusta este valor para obtener el tama�o deseado
       tempCanvas.width = img.width * scaleFactor;
       tempCanvas.height = img.height * scaleFactor;

       // Dibujar la imagen en el nuevo canvas utilizando la interpolaci�n adecuada
       context.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

       // Obtener los p�xeles de la imagen
       var imageData = context.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
       var data = imageData.data;

       // Recorrer los p�xeles y modificar el fondo a blanco
       for (var i = 0; i < data.length; i += 4) {
           // Verificar si el p�xel es parte del fondo
           var r = data[i];
           var g = data[i + 1];
           var b = data[i + 2];
           var alpha = data[i + 3];

           // Si el p�xel no es parte del fondo, establecerlo como blanco
           if (r > 100 && g > 100 && b > 100 && alpha > 100) {
               data[i] = 255;     // Rojo
               data[i + 1] = 255; // Verde
               data[i + 2] = 255; // Azul
               data[i + 3] = 255; // Alfa (opacidad)
           }
       }

       // Establecer los p�xeles modificados en el canvas original
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

 // Verificar si se encontr� la palabra "chasis" o "cuadro"
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
               alert('Ocurri� un error al extraer el texto de la imagen.');
           });
   };

   // Cargar la imagen del canvas en la imagen temporal
   img.src = imageData;
}

function getTextAfterKeyword(texto, keywordIndex, keyword) {
   event.preventDefault();
   // Verificar si se encontr� la palabra clave
   if (keywordIndex !== -1) {
       // Obtener el �ndice despu�s de la palabra clave
       var startIndex = keywordIndex + keyword.length;

       // Obtener el texto despu�s de la palabra clave
       var value = texto.substring(startIndex).trim();

       // Verificar si hay un salto de l�nea o espacio
       var nextLineIndex = value.indexOf('\n');

       // Obtener el �ndice del siguiente espacio o salto de l�nea
       var endIndex = Math.min(nextLineIndex);

       // Si se encuentra el siguiente espacio o salto de l�nea, truncar el texto
       if (endIndex !== -1) {
           value = value.substring(0, endIndex);
       }

       return value;
   }

   return '';
}




function getTextAfterKeyword2(texto, keywordIndex, keyword) {
   event.preventDefault();
   // Verificar si se encontr� la palabra clave
   if (keywordIndex !== -1) {
       // Obtener el �ndice despu�s de la palabra clave
       var startIndex = keywordIndex + keyword.length;

       // Obtener el texto despu�s de la palabra clave
       var value = texto.substring(startIndex).trim();

       // Verificar si hay un salto de l�nea o espacio
       var nextLineIndex = value.indexOf('\n');
       var nextSpaceIndex = value.indexOf(' ');

       // Obtener el �ndice del siguiente espacio o salto de l�nea
       var endIndex = Math.min(nextLineIndex, nextSpaceIndex);

       // Si se encuentra el siguiente espacio o salto de l�nea, truncar el texto
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


 ///////// LIMPIAR ///////////////
function cleanservice() {
 
 if(document.getElementById("dni").value === "" || document.getElementById("patente_sn").value === "") {
alert("MAMAAAAAAAA!")
alert("SAC� LA MANO DE AH� CARAJO!")
alert("No, estoy con el pan nada m�s.")
alert("ACAB� DE CORT� LA LETRICID� PORQUE")
alert("METISTE UN CUTU-CUCHILLO AH�")
alert("TE POD� QUEDA' ELETRIFICADA, LOCA!")
alert("Ah bueno, no importa")
alert("De algo hay que morir.")
alert("YO NO TE PO' CREER.")
alert("Saqu� el pan, Ricardo.")
alert("MAM�, CORTASTE TODA LA LOOZ.")
alert("TOCASTE ALGO QUE HAB�AKJXZ")
alert("Vos sab�s que toqu� ahi")
alert("Eso tienen que arreglarlo porque no puede ser asi")
alert("SACALACAI")
alert("SACAL APAISAL")
alert("DESANCHUFALO!")
alert("METISTE UN CUTU-CUCHILLO AH�")
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

// Funci�n para realizar el inicio de sesi�n
// var usuarioAlmacenado = sessionStorage.getItem("magi-usuario");
// var horaInicioAlmacenada = sessionStorage.getItem("magi-horaInicio");
// var colorAlmacenado = sessionStorage.getItem("magi-color");

// Funci�n para calcular el tiempo restante en milisegundos
function calcularTiempoRestante() {
 var horaInicio = parseInt(sessionStorage.getItem("magi-horaInicio"));
 var horaExpiracion = horaInicio + (4 * 60 * 60 * 1000); // 4 horas en milisegundos
 var tiempoRestante = horaExpiracion - new Date().getTime();
 return tiempoRestante;
}

// Funci�n para mostrar el tiempo restante en el div correspondiente
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
   tiempoRestanteDiv.innerHTML = "Sesion: " + horas + ":" + minutos + ":" + segundos;
 }
}

// Funci�n para iniciar el contador de tiempo
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


if (sessionStorage.getItem("magi-usuario")) {
 document.getElementById("usuario_sp").innerHTML = sessionStorage.getItem("magi-usuario");
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

 function closeModal() {
   modal.style.display = "none";
 }

 document.getElementById("inicio-sesion").addEventListener("click", function (event) {
   event.preventDefault();

   var usuario = document.getElementById("usuario").value;
   var contrasena = document.getElementById("contrasena").value;
   var colorPicker = document.getElementById("colorPicker");
   var colorSeleccionado = colorPicker.value;

   google.script.run.withSuccessHandler(function (color) {
     if (color) {
       document.getElementById("usuario_sp").innerHTML = usuario;
       modal.style.display = "none";
       user.style.display = "block";
       close_session.style.display = "block";

       sessionStorage.setItem("magi-usuario", usuario);
       sessionStorage.setItem("magi-horaInicio", new Date().getTime());
       sessionStorage.setItem("magi-color", color);

       document.body.style.backgroundColor = color;
     } else {
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
   tiempoRestanteDiv.innerHTML = "Tiempo expirado";
   document.getElementById("usuario_sp").innerHTML = "Desconocido";
   modal.style.display = "block";
 } else {
   var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
   var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
   var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
   console.log("Sesi�n vigente, quedan: " + horas + " hs, " + minutos + " min, " + segundos + " seg.");
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
     tiempoRestanteDiv.innerHTML = "";    
     document.getElementById("usuario_sp").innerHTML = "Desconocido";
 // Recargar la p�gina
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
document.getElementById("cnia").addEventListener("change", function() {
buscarRefa()
});
document.getElementById('bt-capturePhoto').addEventListener('click', capturePhoto);
document.getElementById('bt-switchCamera').addEventListener('click', switchCamera);
document.getElementById('bt-sendPhotos').addEventListener('click', sendPhotos);
document.getElementById('formularioEmision').addEventListener('submit', ingresarPoliza);
document.getElementById('bt-buscar').addEventListener('click', filtrar);
document.getElementById('bt-buscar2').addEventListener('click', filtrar2);
document.getElementById('close_session').addEventListener('click', close_sessionok);
