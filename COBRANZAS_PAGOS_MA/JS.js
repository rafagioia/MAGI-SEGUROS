
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

  
//////////////// OPCIONES CALCULADORA /////////////////////

const myDisplay = document.querySelector(".my-display");
const myButtons = document.querySelectorAll(".my-buttons button");
const openModalBtn = document.getElementById("openModalBtn");
const calculatorModal = document.querySelector(".my-modal");
const closeModal = document.querySelector(".my-close");

// Add a click event listener to all buttons
myButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.value === "=") {
      // Handle the equal sign
      calculate();
    } else if (button.dataset.value === "AC") {
      // Handle the AC (clear) button
      myDisplay.value = "";
    } else if (button.dataset.value === "DEL") {
      // Handle the DEL (delete) button
      myDisplay.value = myDisplay.value.slice(0, -1);
    } else {
      // Append the clicked button's value to the display
      myDisplay.value += button.dataset.value;
    }
  });
});

// Add a keypress event listener for the Enter key
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    calculate();
  }
});

// Function to evaluate and display the result
function calculate() {
  try {
    const result = eval(myDisplay.value.trim());
    myDisplay.value = Number.isFinite(result) ? result : "Error";
  } catch (error) {
    myDisplay.value = "Error";
  }
}

// Event listener for keydown (when typing starts)
myDisplay.addEventListener("keydown", () => {
  myDisplay.classList.add("typing");
});

// Event listener for keyup (when typing finishes)
myDisplay.addEventListener("keyup", () => {
  myDisplay.classList.remove("typing");
});

// Abrir el modal al hacer clic en el botón
openModalBtn.addEventListener("click", () => {
  event.preventDefault();
  calculatorModal.style.display = "block";
  myDisplay.value = "";
});

// Cerrar el modal al hacer clic fuera del modal o en la 'X'
window.addEventListener("click", (event) => {
  if (event.target === calculatorModal) {
    calculatorModal.style.display = "none";
  }
});

closeModal.addEventListener("click", () => {
  calculatorModal.style.display = "none";
});


///////////////////// VALIDACION DE INPUTS ///////////////////// 
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



////////////////////// VIGENCIAS ///////////////////////////

function buscarRefa() {
  let cnia = document.getElementById("cnia").value;
  var valor = "";
  if (["MAPFRE","ALLIANZ","MERCANTIL", "ORBIS"].includes(cnia)) {
    valor = 4;
  } else if (["PROVIDENCIA", "LIBRA", "AGROSALTA [RC]", "AGROSALTA [RC-GRUA]", "AGROSALTA [B1]", "AGROSALTA [MOTO]"].includes(cnia)) {
    valor = 3;
  } else if (["GRUA", "DIGNA", "BBVA", "EL TRIUNFO"].includes(cnia)) {
    valor = 6;
  } else if (["EXPERTA", "FED PAT", "NIVEL", "RIVADAVIA", "RIO URUGUAY","LA CAJA", "SAN PATRICIO", "ATM"].includes(cnia)) {
    valor = 1;
  } else {
    valor = 0;
  }

  document.getElementById("vigencia").value = valor;
}

  //////////////////// INGRESAR PAGOS ///////////////////////

function ingresarPago(event) {
  event.preventDefault();
  
  // Obtener todos los valores de los campos
  let infomultiRec = document.getElementById('multiRec').value;
  let infoDNI = document.getElementById('dni').value;
  let infoCliente = document.getElementById('nombreCompleto').value;
  let infoWpp = document.getElementById('wpp').value;
  let infoPatente = document.getElementById('patente').value;
  let infoMarca = document.getElementById('marca').value;
  let infoPoliza = document.getElementById('poliza').value;
  let infoCnia = document.getElementById('cnia').value;
  let infoCuota = document.getElementById('cuota').value;
  let infoVigencia = document.getElementById('vigencia').value;
  let infoImporte = document.getElementById('importe').value;
  let infoVence = document.getElementById('vto').value;
  let infoColor = "";
  let infoUsuario = sessionStorage.getItem("magi-usuario");
  let infoNotasCte = document.getElementById('notascte').value;
  let infoNotasVeh = document.getElementById('notasveh').value;
  let infoNotasCob = document.getElementById('notascob').value;
  let infoMedio = document.getElementById('mediopago').value;
  let infoVigTot = document.getElementById('vigtot').value;

  // Verificar si alguno de los campos obligatorios está vacío
  if (!infomultiRec || !infoDNI || !infoCliente || !infoWpp || !infoPatente || 
      !infoMarca || !infoCnia || !infoCuota || 
      !infoVigencia || !infoImporte || !infoVence || !infoMedio) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;  // Detener el script si hay campos vacíos
  }

  const boton = document.getElementById('bt-ingreso');
  const spinner = document.getElementById('spinner_pago');
  spinner.style.display = 'block';
  boton.disabled = true;

  google.script.run.withSuccessHandler(handleResponse).pagoNuevo_inv(
    infomultiRec,
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
    infoNotasCob,
    infoMedio,
    infoVigTot
  );

  document.getElementById("dni").value = "";
  document.getElementById("nombreCompleto").value = "";
  document.getElementById("wpp").value = "";
  document.getElementById("patente").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("poliza").value = "";
  document.getElementById("cnia").value = "";
  document.getElementById("cuota").value = "";
  document.getElementById("vigencia").value = "";
  document.getElementById("vigtot").value = "";
  document.getElementById("importe").value = "";
  document.getElementById("vto").value = "";
  document.getElementById("color").value = "";
  document.getElementById("notascte").value = "";
  document.getElementById("notasveh").value = "";
  document.getElementById("notascte").value = "";
  document.getElementById("notascob").value = "";
  document.getElementById("mediopago").value = "EFECTIVO";
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mensaje").textContent = "Pago adelantado";
}

function handleResponse(response) {
  let infomultiRec = parseInt(document.getElementById('multiRec').value);
  let numRec = parseInt(response);
  console.log(numRec);
  console.log(infomultiRec);
  if (infomultiRec === 1) {
    reimprimirRecibo_b(numRec);
  } else if (infomultiRec > 1) {
    reimprimirReciboMulti_b(numRec, infomultiRec); 
  }

}

function reimprimirRecibo_b(numRecibo) {
  google.script.run.withSuccessHandler(function(content) {
      var newWindow = window.open();
      newWindow.document.write(content);

      const boton = document.getElementById('bt-ingreso');
      boton.disabled = false;
      const spinner = document.getElementById('spinner_pago');
      spinner.style.display = 'none';
    })
    .withFailureHandler(function(error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
      alert('Error al obtener los valores del recibo: ' + error);
    })
    .getValuesFromSheet(numRecibo);
}



function reimprimirReciboMulti_b(numReciboMulti, infomultiRec) {
  google.script.run.withSuccessHandler(function(content) {
    var newWindow = window.open();
    newWindow.document.write(content);

    const boton = document.getElementById('bt-ingreso');
    boton.disabled = false;
    const spinner = document.getElementById('spinner_pago');
  spinner.style.display = 'none';
  document.getElementById('multiRec').value = 1;
    })
    .withFailureHandler(function(error) {
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
      alert('Error al obtener los valores del recibo: ' + error);
    })
    .getValuesFromSheetMulti(numReciboMulti, infomultiRec);
}


///////// INGRESAR NOMOVE ///////////////
function ingresarNomove(event) {
  event.preventDefault();
  const medio = document.getElementById('nm_medio').value;
  const concepto = document.getElementById('nm_concepto').value;
  const para = document.getElementById('nm_para').value;
  const importe = document.getElementById('nm_importe').value;
  var usuario_p = sessionStorage.getItem("magi-usuario");
  google.script.run.agregarNomove(medio, concepto, para, importe,usuario_p);
  event.target.reset();
alert('Sin Movimiento ingresado correctamente');
}

///////// INGRESAR CHEQUE ///////////////
function ingresarCheque(event) {
  event.preventDefault();
  const numeroCheque = document.getElementById('c_numero').value;
  const vencimiento = document.getElementById('c_vto').value;
  var usuario_p = sessionStorage.getItem("magi-usuario");
  const de = document.getElementById('c_de').value;
  const importe = document.getElementById('c_importe').value;
  google.script.run.agregarCheque(numeroCheque, vencimiento, de, importe,usuario_p);
  event.target.reset();
alert('Cheque ingresado correctamente');
}


///////// INGRESAR GASTO ///////////////
function ingresarGasto(event) {
  event.preventDefault();
  const gastoConcepto = document.getElementById('g_concepto').value;
  const gastoPara = document.getElementById('g_para').value;
  const gastoImporte = document.getElementById('g_importe').value;
  const gastoMedio = document.getElementById('g_mediopago').value;
  var usuario_p = sessionStorage.getItem("magi-usuario");

  google.script.run.withFailureHandler(function(error) {
    // Manejar el error aquí, por ejemplo, mostrando un mensaje de error
    alert('Ocurrió un error al ingresar el gasto: ' + error);
    alert('Por favor reintentelo');
  }).agregarGasto(gastoConcepto, gastoPara, gastoImporte, usuario_p, gastoMedio);

  event.target.reset();
  alert('Gasto ingresado correctamente');
}



///////// INGRESAR RECIBI ///////////////
function ingresarRecibi(event) {
  event.preventDefault();
  const recibiConcepto = document.getElementById('r_concepto').value;
  const recibiPara = document.getElementById('r_para').value;
  const recibiImporte = document.getElementById('r_importe').value;
  const recibiMedio = document.getElementById('r_mediopago').value;
  var usuario_p = sessionStorage.getItem("magi-usuario");

  google.script.run.withFailureHandler(function(error) {
    // Manejar el error aquí, por ejemplo, mostrando un mensaje de error
    alert('Ocurrió un error al ingresar el recibi: ' + error);
    alert('Por favor reintentelo');
  }).agregarRecibi(recibiConcepto, recibiPara, recibiImporte,usuario_p, recibiMedio);

  event.target.reset();
  alert('Recibi ingresado correctamente');
}



//////////////////////////////// BUSCAR PATENTE (COB + EMI) //////////////////////////////////////
  function decidir_patente() {
  const boton = document.getElementById('buscarRegistrosBtn7');
  const spinner = document.getElementById('spinner7');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
  const patente_value  = document.getElementById("text-box-buscarPatente").value;
        let infoDNI =  document.getElementById("dni");
        let infoCliente =  document.getElementById("nombreCompleto");
        let infoWpp =  document.getElementById("wpp");
        let infoPatente =  document.getElementById("patente");
        let infoMarca =  document.getElementById("marca");
        let infoPoliza =  document.getElementById("poliza");
        let infoCnia =  document.getElementById("cnia");
        let infoCuota =  document.getElementById("cuota");
        let infoVigencia =  document.getElementById("vigencia");
        let infoVigTot =  document.getElementById("vigtot");
        let infoImporte =  document.getElementById("importe");
        let infoVence =  document.getElementById("vto");
        let infoColor =  document.getElementById("color");
        let infoNotasCte = document.getElementById('notascte');
        let infoNotasVeh = document.getElementById('notasveh');
        let infoHistorico = document.getElementById('historico');
        let infoEstado =  document.getElementById("estado_pol");
        let agrocnia = document.getElementById("cnia").value
        document.getElementById("mediopago").value = "EFECTIVO";
        
  if (!patente_value || patente_value.trim() === "") {
    alert("Ingrese una patente válida");
    spinner.style.display = 'none'; // Ocultar el spinner
    boton.disabled = false; // Habilitar el botón
    return;
  }

  spinner.style.display = 'inline-block';
  boton.disabled = true;

  google.script.run.withSuccessHandler(function(ultima_actu) {

/////////////// FECHA ULTIMA ACTU BD EMISION ////////////////
let fechaString = ultima_actu[0][17];
let diaEmi, mesEmi, anioEmi;

if (fechaString) {
  let fechaEmiArray = fechaString.split('/');
  if (fechaEmiArray.length === 3) {
    diaEmi = fechaEmiArray[0];
    mesEmi = fechaEmiArray[1];
    anioEmi = fechaEmiArray[2];
  }
}
    
/////////////// FECHA ULTIMO PAGO BD COBRANZAS ////////////////
let fechaString2 = ultima_actu[1][0][5];
let diaCob, mesCob, anioCob;

if (fechaString2) {
  let fechaCobArray = fechaString2.split('/');
  if (fechaCobArray.length === 3) {
    diaCob = fechaCobArray[0];
    mesCob = fechaCobArray[1];
    anioCob = fechaCobArray[2];
  }
}

/////////////// FECHA INICIO VIGENCIA SEG BD EMISION ////////////////
let fechaString3 = ultima_actu[0][8];
let fechaEmi3, mesEmi3, anioEmi3;

if (fechaString3) {
  let fechaEmiArray3 = fechaString3.split('/');
  if (fechaEmiArray3.length === 3) {
    diaEmi3 = fechaEmiArray3[0];
    mesEmi3 = fechaEmiArray3[1];
    anioEmi3 = fechaEmiArray3[2];
  }
}


if (anioEmi && anioEmi.length === 4) {
    errores.push("BD EMISION: EL AÑO EN ÚLTIMA ACTUALIZACION DEBE TENER DOS DIGITOS Y CONTIENE CUATRO");
}
let errores = []
// Verificar si anioCob es válido y tiene la propiedad length
if (anioCob && anioCob.length === 4) {
    errores.push("BD COBRANZAS: EL AÑO EN VENCIMIENTO DEBE TENER DOS DIGITOS Y CONTIENE CUATRO");
}


if (ultima_actu[0] == "" && ultima_actu[1] == "") {
    alert("NO HAY DATOS ENCONTRADOS.") 
    spinner.style.display = 'none'; // Ocultar el spinner
    boton.disabled = false; // Habilitar el botón
    agroGruas(agrocnia) 
    return;

}  ////INGRESA POR COBRANZAS NORMAL

else if ((anioCob > anioEmi) || (anioEmi === anioCob && mesCob > mesEmi) ||  (anioEmi === anioCob && mesCob === mesEmi && diaCob >= diaEmi) ||(ultima_actu[0] == "" && ultima_actu[1] !== "") || (anioCob > anioEmi3) || (anioEmi3 === anioCob && mesCob > mesEmi3) || (anioEmi3 === anioCob && mesCob === mesEmi3 && diaCob >= diaEmi3)) {
// // alert("PAGO DE CUOTA")

//     // alert("PAGO DE CUOTA")
// console.log("PAGO DE CUOTA--- " + "diaCob: " + diaCob + "mesCob: " + mesCob + "anioCob: " + anioCob + "||| diaEmi3: " + diaEmi3 + "mesEmi3: " + mesEmi3 + "anioEmi3: " +  anioEmi3 + "||| diaEmi: " + diaEmi + "mesEmi: " + mesEmi + "anioEmi: " +  anioEmi)


          let tableBody = document.getElementById("mantenimientosTableBody");
          tableBody.textContent = "";
          if (ultima_actu[1].length > 0) {
            
            
if (ultima_actu[0][10] == "ANULACION") {
    infoEstado.value = "¡POLIZA ANULADA EN SISTEMA DE EMISION!\nNO SE DEBERIA COBRAR UNA POLIZA QUE YA SE ENCUENTRA ANULADA SIN ANTES VERIFICAR LA VIGENCIA DE LA MISMA";  
    var confirmation = confirm("Estado de poliza: " + infoEstado.value + "\n¿DE TODAS FORMAS DESEA CONTINUAR?\n(SI PRESIONA ACEPTAR TRAERÁ LOS DATOS.)");

    if (!confirmation) {
        // Si el usuario hace clic en "Cancelar", ejecutar el código a continuación
        infoDNI.value = "";
        infoCliente.value = "";
        infoWpp.value = "";
        infoPatente.value = "";
        infoMarca.value = "";
        infoPoliza.value = "";
        infoCnia.value = "";
        infoCuota.value = "";
        infoVigencia.value = "";
        infoVigTot.value = "";
        infoImporte.value = "";
        infoVence.value = "";
        infoColor.value = "";
        infoNotasCte.value = "";
        infoNotasVeh.value = "";
        infoHistorico.value = "";
        spinner.style.display = 'none'; // Ocultar el spinner
        boton.disabled = false; // Habilitar el botón
        agroGruas(agrocnia) 
        return
    }
    // El código continúa aquí si el usuario hizo clic en "Aceptar"
}
        infoDNI.value = ultima_actu[1][0][2];
        infoCliente.value = ultima_actu[1][0][3];
        infoWpp.value = ultima_actu[1][0][4];
        infoNotasVeh.value = ultima_actu[0][14];
        infoNotasCte.value = ultima_actu[0][16];
        infoHistorico.value = ultima_actu[1][0][18];
        infoPatente.value = ultima_actu[1][0][1];
        infoMarca.value = ultima_actu[1][0][13];
        infoPoliza.value = ultima_actu[1][0][9];
        infoCnia.value = ultima_actu[1][0][10];
        infoImporte.value = ultima_actu[1][0][11];
        infoVigTot.value = ultima_actu[0][20];
        console.log("valor vig: " + ultima_actu[0][20]);
        let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
        let importeNumero = parseInt(importeSinSignos);

        infoImporte.value = importeNumero

        infoCuota.value = parseInt(ultima_actu[1][0][7])+1;
        infoVigencia.value = parseInt(ultima_actu[1][0][8]);
        if(infoCuota.value > infoVigencia.value) {
          infoCuota.value = 1;
          infoImporte.value = "";
        buscarRefa()
        } else {}
        let fechaString = ultima_actu[1][0][5];
        if (fechaString) {
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        fecha.setMonth(fecha.getMonth() + 1)
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
} else {
    alert("Fecha en BD COBRANZAS inválida: " + ultima_actu[1][0][5]);
    console.log("FECHA BD COB: " + ultima_actu[1][0][5])
    spinner.style.display = 'none'; // Ocultar el spinner
    boton.disabled = false; // Habilitar el botón
    agroGruas(agrocnia) 
    return;
}

        infoColor.value = ultima_actu[1][0][15];

let rowCount = 0;
ultima_actu[1].forEach(mantenimiento => {
  if (rowCount < 6) { // solo agrega filas si el número actual de filas es menor que 6

    const template = document.getElementById("mantenimientosRow");
    const templateRow = template.content;
    let tr = templateRow.cloneNode(true);
    let colFecha = tr.querySelector(".PagoCuota")
    let colDescripcion = tr.querySelector(".PagoFecha")
    let colAtendio = tr.querySelector(".PagoVto")
    let colAtendios = tr.querySelector(".PagoImporte")
    
    colFecha.textContent = mantenimiento[7];
    colDescripcion.textContent = mantenimiento[5];
    colAtendio.textContent = mantenimiento[6];
    colAtendios.textContent = "$" + mantenimiento[11].replace("$", "").replace(".", "");
    
    tableBody.appendChild(tr);
    rowCount++;
  }
});

          } else {
            alert("No se encontraron valores")
          }

///// INGRESA POR SEGURO NUEVO O RENOVACION
      } else if((anioEmi > anioCob) || (anioEmi === anioCob && mesEmi > mesCob)  || (anioEmi === anioCob && mesEmi === mesCob && diaEmi > diaCob) || (ultima_actu[0] !== "" && ultima_actu[1] == "")) {
// ACTUALIZAR REFACTURACION A FUERZA

buscarRefa()

//     // alert("SEGURO NUEVO / RENOVACION")
console.log("SEGURO NUEVO / RENOVACION--- " + "diaCob: " + diaCob + "mesCob: " + mesCob + "anioCob: " + anioCob + "||| diaEmi3: " + diaEmi3 + "mesEmi3: " + mesEmi3 + "anioEmi3: " +  anioEmi3 + "||| diaEmi: " + diaEmi + "mesEmi: " + mesEmi + "anioEmi: " +  anioEmi)
    var vig = parseInt(ultima_actu[0][4]);
    var rf = parseInt(12 / vig);
    let fecha_vto_new = diaEmi3 + "/" + mesEmi3 + "/" + anioEmi3
    
    for (var i = 0; i <= rf; i++) {
  let fecha_refa = new Date(parseInt("20" + anioEmi3), mesEmi3 - 1, diaEmi3); 
  
  fecha_refa.setMonth(fecha_refa.getMonth() + (i * vig));
  let refa = fecha_refa.toLocaleDateString('es-ES');
  var part = refa.split("/");
  
  if ((parseInt(part[2]) > anioCob) || (parseInt(part[2]) === anioCob && parseInt(part[1]) > mesCob)) { 
    fecha_vto_new = parseInt(part[0]) + "/" + parseInt(part[1]) + "/" + parseInt(part[2]);
    
  break
  } else {
  }
}

    if (ultima_actu[0].length > 0) {
if (ultima_actu[0][10] == "ANULACION") {
    infoEstado.value = "¡POLIZA ANULADA EN SISTEMA DE EMISION!\nNO SE DEBERIA COBRAR UNA POLIZA QUE YA SE ENCUENTRA ANULADA SIN ANTES VERIFICAR LA VIGENCIA DE LA MISMA";  
    var confirmation = confirm("Estado de poliza: " + infoEstado.value + "\n¿DE TODAS FORMAS DESEA CONTINUAR?\n(SI PRESIONA ACEPTAR TRAERÁ LOS DATOS.)");

    if (!confirmation) {
        // Si el usuario hace clic en "Cancelar", ejecutar el código a continuación
        infoDNI.value = "";
        infoCliente.value = "";
        infoWpp.value = "";
        infoPatente.value = "";
        infoMarca.value = "";
        infoPoliza.value = "";
        infoCnia.value = "";
        infoCuota.value = "";
        infoVigencia.value = "";
        infoVigTot.value = "";
        infoImporte.value = "";
        infoVence.value = "";
        infoColor.value = "";
        infoNotasCte.value = "";
        infoNotasVeh.value = "";
        infoHistorico.value = "";
        spinner.style.display = 'none'; // Ocultar el spinner
        boton.disabled = false; // Habilitar el botón
        agroGruas(agrocnia) 
        return
    }
    // El código continúa aquí si el usuario hizo clic en "Aceptar"
}            
        infoPatente.value = ultima_actu[0][0];  ///
        infoDNI.value = ultima_actu[0][1]; //
        infoCliente.value = ultima_actu[0][2]; ///
        infoVigencia.value = ultima_actu[0][4]; //
        infoImporte.value = ultima_actu[0][5]; //
        infoCnia.value = ultima_actu[0][6]; //
        infoPoliza.value = ultima_actu[0][7]; //
        infoMarca.value = ultima_actu[0][12]; //
        infoNotasVeh.value = ultima_actu[0][14];
        infoWpp.value = ultima_actu[0][15];
        infoNotasCte.value = ultima_actu[0][16];
        infoVigTot.value = ultima_actu[0][20];


let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);
infoImporte.value = importeNumero
        infoCuota.value = 1;

        let fechaString = fecha_vto_new;
        if (fechaString) {
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
} else {
    alert("Fecha en BD EMISION inválida: " + ultima_actu[1][0][5]);
    console.log("FECHA BD EMISION: " + ultima_actu[1][0][5])
    spinner.style.display = 'none'; // Ocultar el spinner
    boton.disabled = false; // Habilitar el botón
    agroGruas(agrocnia) 
    return;
}

        infoColor.value = "";
        // infoNotasCte.value = "";
        // infoNotasVeh.value = "";

          } else {
            alert("No se encontraron valores")
          }
  } else {
    

function mostrarError(mensaje) {
    alert("ERROR: \n" + mensaje);
}

let errores = [];

// Verificar si ultima_actu[0] existe antes de acceder a sus propiedades
if (ultima_actu[0]) {
    if (!ultima_actu[0][17]) {
        errores.push("BD EMISION: FALTA VALOR EN ÚLTIMA ACTUALIZACION CON ESA PATENTE");
    }
} else {
    errores.push("BD EMISION: NO HAY VALORES ENCONTRADOS CON ESA PATENTE");
}

// Verificar si anioEmi es válido y tiene la propiedad length
if (anioEmi && anioEmi.length === 4) {
    errores.push("BD EMISION: EL AÑO EN ÚLTIMA ACTUALIZACION DEBE TENER DOS DIGITOS Y CONTIENE CUATRO");
}

// Verificar si mesCob tiene un valor
if (!mesCob) {
    errores.push("NO HAY VALOR EN VENCIMENTO DE COBRANZAS CON ESA PATENTE");
}

// Verificar si anioCob es válido y tiene la propiedad length
if (anioCob && anioCob.length === 4) {
    errores.push("BD COBRANZAS: EL AÑO EN VENCIMIENTO DEBE TENER DOS DIGITOS Y CONTIENE CUATRO");
}

if (errores.length > 0) {
    mostrarError(errores.join("\n"));
}
      
console.log("Valores: " + ultima_actu[0])
console.log("Fecha Emi 17: " + ultima_actu[0][17])
console.log("Fecha Emi 20: " + ultima_actu[0][20])
console.log("Mes Cob: " + mesCob)
console.log("Año Cob: " + anioCob)
console.log("Mes Emi: " + mesEmi)
console.log("Año Emi: " + anioEmi)

  }

let rowCount = 0;
let processed = new Set(); // conjunto para almacenar los valores ya procesados
const tableBody2 = document.getElementById("mantenimientosTableBody2");
tableBody2.textContent = ""; // Mover la línea de aquí

ultima_actu[2].forEach(mantenimiento2 => {
  if (rowCount < 10) {
    // solo agrega filas si el número actual de filas es menor que 10 y el valor no está en el conjunto
    if (!processed.has(mantenimiento2[1])) {
      const template2 = document.getElementById("mantenimientosRow2");
      const templateRow2 = template2.content;
      let tr = templateRow2.cloneNode(true);
      let PolPatente = tr.querySelector(".PolPatente")
      let PolVehiculo = tr.querySelector(".PolVehiculo")
      let PolCnia = tr.querySelector(".PolCnia")
      let PolVtos = tr.querySelector(".PolVtos")

      PolPatente.textContent = mantenimiento2[0];
      PolVehiculo.textContent = mantenimiento2[1];
      PolCnia.textContent = mantenimiento2[2];
      PolVtos.textContent = mantenimiento2[3];

      tableBody2.appendChild(tr);
      rowCount++;
      processed.add(mantenimiento2[1]); // agregar valor al conjunto de valores procesados
    }
  }
});


  spinner.style.display = 'none';
  boton.disabled = false;
  agroGruas(agrocnia) 
  actualizarMensaje()

  }).getUltimaActu_inv(patente_value);

  }
  
//////////////////////////////// BUSCAR DNI (COB + EMI) //////////////////////////////////////
  function decidir_dni() {
  const boton = document.getElementById('buscarRegistrosBtn8');
  const spinner = document.getElementById('spinner8');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
  const dni_value1  = document.getElementById("text-box-numeroInventario_dni").value;
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
        let infoNotasCte = document.getElementById('notascte');
        let infoNotasVeh = document.getElementById('notasveh');
        let infoHistorico = document.getElementById('historico');
        document.getElementById("mediopago").value = "EFECTIVO";
        let agrocnia = document.getElementById("cnia").value

  google.script.run.withSuccessHandler(function(ultima_actu) {

let fechaString = ultima_actu[0][17];
let fechaEmi, mesEmi, anioEmi;

if (fechaString) {
  let fechaEmiArray = fechaString.split('/');
  if (fechaEmiArray.length === 3) {
    mesEmi = fechaEmiArray[1];
    anioEmi = fechaEmiArray[2];
  }
}

    
let fechaString2 = ultima_actu[1][0][5];
let fechaCob, mesCob, anioCob;

if (fechaString2) {
  let fechaCobArray = fechaString2.split('/');
  if (fechaCobArray.length === 3) {
    mesCob = fechaCobArray[1];
    anioCob = fechaCobArray[2];
  }
}

console.log("FECHA EMI: " + fechaString + "FECHA COB: " + fechaString2)
console.log("FECHA EMI 19: " + fechaString + "FECHA EMI 20: " + fechaString2)
console.log("FECHA EMI: " + ultima_actu[0] + "FECHA COB: " + ultima_actu[1])

///// ERROR, NO HAY NINGUN DATO

if (ultima_actu[0] == "" && ultima_actu[1] == "") {
    alert("NO HAY DATOS ENCONTRADOS.") 
    spinner.style.display = 'none'; // Ocultar el spinner
    boton.disabled = false; // Habilitar el botón
    agroGruas(agrocnia) 
    return;

}  ////INGRESA POR COBRANZAS NORMAL
else if ((anioCob > anioEmi) || (anioEmi === anioCob && mesCob >= mesEmi) || (ultima_actu[0] == "" && ultima_actu[1] !== "")) {
    // alert("PAGO DE CUOTA")

          let tableBody = document.getElementById("mantenimientosTableBody");
          tableBody.textContent = "";
          if (ultima_actu[1].length > 0) {
            
        infoDNI.value = ultima_actu[1][0][2];
        infoCliente.value = ultima_actu[1][0][3];
        infoWpp.value = ultima_actu[1][0][4];
        infoNotasVeh.value = ultima_actu[0][14];
        infoNotasCte.value = ultima_actu[0][16];
        infoHistorico.value = ultima_actu[1][0][18];
        infoPatente.value = ultima_actu[1][0][1];
        infoMarca.value = ultima_actu[1][0][13];
        infoPoliza.value = ultima_actu[1][0][9];
        infoCnia.value = ultima_actu[1][0][10];
        infoImporte.value = ultima_actu[1][0][11];

let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);

infoImporte.value = importeNumero


        infoCuota.value = parseInt(ultima_actu[1][0][7])+1;
        infoVigencia.value = parseInt(ultima_actu[1][0][8]);
        if(infoCuota.value > infoVigencia.value) {
          infoCuota.value = 1;
          infoImporte.value = "";
        } else {}
        let fechaString = ultima_actu[1][0][5];
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        fecha.setMonth(fecha.getMonth() + 1)
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
        infoColor.value = ultima_actu[1][0][15];

let rowCount = 0;
ultima_actu[1].forEach(mantenimiento => {
  if (rowCount < 6) { // solo agrega filas si el número actual de filas es menor que 6

    const template = document.getElementById("mantenimientosRow");
    const templateRow = template.content;
    let tr = templateRow.cloneNode(true);
    let colFecha = tr.querySelector(".PagoCuota")
    let colDescripcion = tr.querySelector(".PagoFecha")
    let colAtendio = tr.querySelector(".PagoVto")
    let colAtendios = tr.querySelector(".PagoImporte")
    
    colFecha.textContent = mantenimiento[7];
    colDescripcion.textContent = mantenimiento[5];
    colAtendio.textContent = mantenimiento[6];
    colAtendios.textContent = "$" + mantenimiento[11].replace("$", "").replace(".", "");
    
    tableBody.appendChild(tr);
    rowCount++;
  }
});

          } else {
            alert("No se encontraron valores")
          }

    ///// INGRESA POR SEGURO NUEVO O RENOVACION
      } else if((anioEmi > anioCob) || (anioEmi === anioCob && mesEmi > mesCob) || (ultima_actu[0] !== "" && ultima_actu[1] == "")) {
  
    // alert("SEGURO NUEVO / RENOVACION")
    if (ultima_actu[0].length > 0) {
            
        infoDNI.value = ultima_actu[0][1]; //
        infoCliente.value = ultima_actu[0][2]; ///
        infoWpp.value = ultima_actu[0][15];
        infoPatente.value = ultima_actu[0][0];  ///
        infoMarca.value = ultima_actu[0][12]; //
        infoNotasVeh.value = ultima_actu[0][14];
        infoPoliza.value = ultima_actu[0][7]; //
        infoCnia.value = ultima_actu[0][6]; //
        infoImporte.value = ultima_actu[0][5]; //
        infoVigencia.value = ultima_actu[0][4]; //

let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);
infoImporte.value = importeNumero
        infoCuota.value = 1;
        let fechaString = ultima_actu[0][8];  ///
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
        infoColor.value = "";
        infoNotasCte.value = "";
        infoNotasVeh.value = "";
        infoHistorico.value = "";

          } else {
            alert("No se encontraron valores")
          }
  } else {
    alert("ERROR")
  }

let rowCount = 0;
let processed = new Set(); // conjunto para almacenar los valores ya procesados
const tableBody2 = document.getElementById("mantenimientosTableBody2");
tableBody2.textContent = ""; // Mover la línea de aquí

ultima_actu[2].forEach(mantenimiento2 => {
  if (rowCount < 10) {
    // solo agrega filas si el número actual de filas es menor que 10 y el valor no está en el conjunto
    if (!processed.has(mantenimiento2[1])) {
      const template2 = document.getElementById("mantenimientosRow2");
      const templateRow2 = template2.content;
      let tr = templateRow2.cloneNode(true);
      let PolPatente = tr.querySelector(".PolPatente")
      let PolVehiculo = tr.querySelector(".PolVehiculo")
      let PolCnia = tr.querySelector(".PolCnia")
      let PolVtos = tr.querySelector(".PolVtos")

      PolPatente.textContent = mantenimiento2[0];
      PolVehiculo.textContent = mantenimiento2[1];
      PolCnia.textContent = mantenimiento2[2];
      PolVtos.textContent = mantenimiento2[3];

      tableBody2.appendChild(tr);
      rowCount++;
      processed.add(mantenimiento2[1]); // agregar valor al conjunto de valores procesados
    }
  }
});


  spinner.style.display = 'none';
  boton.disabled = false;
  agroGruas(agrocnia) 
  actualizarMensaje()
  }).getUltimaActuDNI_inv(dni_value1);

  }

//////////////////////////////// FIN DE BUSCAR DNI (COB + EMI) //////////////////////////////////////
          
  ///// SCRIPT PARA BUSCAR DATOS POR DNI BD COB //////////
      function buscarRegistros_dni() {
  const boton = document.getElementById('buscarRegistrosBtn3');
  const spinner = document.getElementById('spinner3');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
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
        let agrocnia = document.getElementById("cnia").value
        document.getElementById("mediopago").value = "EFECTIVO";

        google.script.run
        .withSuccessHandler( info => {
          let tableBody2 = document.getElementById("mantenimientosTableBody2");
          tableBody2.textContent = "";
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
const valorRecuperado = info[0][18];
const inicio = valorRecuperado.indexOf("(") + 1;
const fin = valorRecuperado.indexOf(")");
const contenido = valorRecuperado.substring(inicio, fin);
infoNotas.value = contenido;

let rowCount = 0;
let processed = new Set(); // conjunto para almacenar los valores ya procesados
info.forEach(mantenimiento2 => {
  if (rowCount < 10) {
    // solo agrega filas si el número actual de filas es menor que 10 y el valor no está en el conjunto
    if (!processed.has(mantenimiento2[1])) {
      const template2 = document.getElementById("mantenimientosRow2");
      const templateRow2 = template2.content;
      let tr = templateRow2.cloneNode(true);
      let PolPatente = tr.querySelector(".PolPatente")
      let PolVehiculo = tr.querySelector(".PolVehiculo")
      let PolCnia = tr.querySelector(".PolCnia")
      let PolVtos = tr.querySelector(".PolVtos")

      PolPatente.textContent = mantenimiento2[1];
      PolVehiculo.textContent = mantenimiento2[13];
      PolCnia.textContent = mantenimiento2[10];
      PolVtos.textContent = mantenimiento2[5];

      tableBody2.appendChild(tr);
      rowCount++;
      processed.add(mantenimiento2[1]); // agregar valor al conjunto de valores procesados
    }
  }
});

          } else {
            alert("No se encontraron valores")
          }
    spinner.style.display = 'none';
    boton.disabled = false;
  agroGruas(agrocnia) 

actualizarMensaje()
        })
        .buscarMantenimientos2(numeroInventario2)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////


  ///// SCRIPT PARA BUSCAR DATOS POR NOMBRE BD COB //////////
      function buscarRegistros_nom() {
  const boton = document.getElementById('buscarRegistrosBtn5');
  const spinner = document.getElementById('spinner5');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
        const numeroInventario = document.getElementById("text-box-buscarNombre").value;
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
        document.getElementById("mediopago").value = "EFECTIVO";

        google.script.run
        .withSuccessHandler( info => {
          let tableBody = document.getElementById("mantenimientosTableBody");
          tableBody.textContent = "";
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
const valorRecuperado = info[0][18];
const inicio = valorRecuperado.indexOf("(") + 1;
const fin = valorRecuperado.indexOf(")");
const contenido = valorRecuperado.substring(inicio, fin);
infoNotas.value = contenido;

let rowCount = 0;
info.forEach(mantenimiento => {
  if (rowCount < 6) { // solo agrega filas si el número actual de filas es menor que 6

    const template = document.getElementById("mantenimientosRow");
    const templateRow = template.content;
    let tr = templateRow.cloneNode(true);
    let colFecha = tr.querySelector(".PagoCuota")
    let colDescripcion = tr.querySelector(".PagoFecha")
    let colAtendio = tr.querySelector(".PagoVto")
    let colAtendios = tr.querySelector(".PagoImporte")
    
    colFecha.textContent = mantenimiento[7];
    colDescripcion.textContent = mantenimiento[5];
    colAtendio.textContent = mantenimiento[6];
    colAtendios.textContent = "$" + mantenimiento[11].replace("$", "").replace(".", "");
    
    tableBody.appendChild(tr);
    rowCount++;
  }
});

          } else {
            alert("No se encontraron valores")
          }
    spinner.style.display = 'none';
    boton.disabled = false;

actualizarMensaje()
        })
        .buscarMantenimientos5(numeroInventario)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR NOMBRE EN BD COB////////

  ///// SCRIPT PARA BUSCAR DATOS POR NOMBRE EN BD EMISION //////////
      function buscarRegistros_nom_emision() {
  const boton = document.getElementById('buscarRegistrosBtn6');
  const spinner = document.getElementById('spinner6');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
        const numeroInventario = document.getElementById("text-box-buscarNombre").value;
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

        google.script.run
        .withSuccessHandler( info => {
          // let tableBody3 = document.getElementById("mantenimientosTableBody3");
          // tableBody3.textContent = "";
          if (info.length > 0) {
            
        infoDNI.value = info[0][1]; //
        infoCliente.value = info[0][2]; ///
        infoWpp.value = info[0][4];
        infoPatente.value = info[0][0];  ///
        infoMarca.value = info[0][12]; //
        infoPoliza.value = info[0][7]; //
        infoCnia.value = info[0][6]; //
        infoImporte.value = info[0][5]; //

let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);
infoImporte.value = importeNumero
        infoCuota.value = 1;
        infoVigencia.value = ""
        let fechaString = info[0][8];  ///
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
        infoColor.value = "";
        infoNotas.value = "";

          } else {
            alert("No se encontraron valores")
          }
    spinner.style.display = 'none';
    boton.disabled = false;

actualizarMensaje()
        })
        .buscarMantenimientos6(numeroInventario)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR NOMBRE EN BD EMISION //////////




  ///// SCRIPT PARA BUSCAR DATOS POR DNI BD EMISION//////////
      function buscarRegistros_dni_emision() {
  const boton = document.getElementById('buscarRegistrosBtn4');
  const spinner = document.getElementById('spinner4');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
  document.getElementById("mantenimientosTableBody").textContent = "";
  document.getElementById("mantenimientosTableBody2").textContent = "";
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
        document.getElementById("mediopago").value = "EFECTIVO";

        google.script.run
        .withSuccessHandler( info => {
          let tableBody5 = document.getElementById("mantenimientosTableBody5");
          tableBody5.textContent = "";
          if (info.length > 0) {
            
        infoDNI.value = info[0][1];
        infoCliente.value = info[0][2];
        infoWpp.value = info[0][4];
        infoPatente.value = info[0][0];
        infoMarca.value = info[0][12];
        infoPoliza.value = info[0][7];
        infoCnia.value = info[0][6]; 
        infoImporte.value = info[0][5]; 

let importeSinSignos = infoImporte.value.replace("$", "").replace(".", "");
let importeNumero = parseInt(importeSinSignos);
infoImporte.value = importeNumero
        infoCuota.value = 1;
        infoVigencia.value = ""
        let fechaString = info[0][8];  ///
        let partesFecha = fechaString.split('/');
        let dia = partesFecha[0];
        let mes = partesFecha[1];
        let anio = partesFecha[2].slice(-2);
        let fecha = new Date(anio, mes - 1, dia);
        infoVence.value = fecha.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: '2-digit'});
        infoColor.value = "";
        infoNotas.value = "";
let rowCount = 0;
let processed = new Set(); // conjunto para almacenar los valores ya procesados
info.forEach(mantenimiento4 => {
  if (rowCount < 10) {
    // solo agrega filas si el número actual de filas es menor que 10 y el valor no está en el conjunto
    if (!processed.has(mantenimiento4[0])) {
      const template5 = document.getElementById("mantenimientosRow5");
      const templateRow5 = template5.content;
      let tr = templateRow5.cloneNode(true);
      let PolPatenteE = tr.querySelector(".PolPatenteE")
      let PolVehiculoE = tr.querySelector(".PolVehiculoE")
      let PolCniaE = tr.querySelector(".PolCniaE")
      let PolVtosE = tr.querySelector(".PolVtosE")

      PolPatenteE.textContent = mantenimiento4[0];
      PolVehiculoE.textContent = mantenimiento4[12];
      PolCniaE.textContent = mantenimiento4[6];
      PolVtosE.textContent = mantenimiento4[8];

      tableBody5.appendChild(tr);
      rowCount++;
      processed.add(mantenimiento4[0]); // agregar valor al conjunto de valores procesados
    }
  }
});

          } else {
            alert("No se encontraron valores")
          }
    spinner.style.display = 'none';
    boton.disabled = false;

actualizarMensaje()
        })
        .buscarMantenimientos4(numeroInventario2)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////

function enviarMensajeWPP() {
  // Obtener el número de teléfono ingresado
  var telefono = document.getElementById("wpp").value;

  // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
  window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}

/////////////// ACTUALIZAR NUMERO WHATSAPP /////////////
function updateWhatsapp() {
  event.preventDefault();
  var whatsapp = document.getElementById("wpp").value;
  var dni = document.getElementById("dni").value;
  google.script.run.updWhatsapp(whatsapp, dni);
alert('N° Whatsapp actualizado correctamente!');
}


//////////////////// REIMPRIMIR RECIBO SIMPLE //////////////////
function reimprimirRecibo(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numRecibo').value;
  google.script.run.withSuccessHandler(function(content) {
    console.log(content)
    var newWindow = window.open();
    newWindow.document.write(content);
  }).getValuesFromSheet(numRecibo);
}

//////////////////// REIMPRIMIR RECIBO MULTIPLE x6 //////////////////
function reimprimirReciboMulti(event) {
  event.preventDefault();
  const numReciboMulti = document.getElementById('numRecibo').value;
  const cantReciboMulti = document.getElementById('multiRec').value;
  google.script.run.withSuccessHandler(function(content) {
    var newWindow = window.open();
    newWindow.document.write(content);
  }).getValuesFromSheetMulti(numReciboMulti, cantReciboMulti);
  document.getElementById('multiRec').value = 1;
}


////////////////////////// DESCARGAR PDF DE RECIBOS /////////////////////

function descargaRecibo(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numRecibo').value;
  google.script.run.withSuccessHandler(function(pdfContent) {
    downloadPdf(pdfContent, "recibo.pdf");
  }).getPdfContent(numRecibo);
}


////////////////////////// DESCARGAR PDF DE RECIBOS MULTI /////////////////////

function descargaReciboM(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numRecibo').value;
  google.script.run.withSuccessHandler(function(pdfContent) {
    downloadPdf(pdfContent, "recibo.pdf");
  }).getPdfContentM(numRecibo);
  document.getElementById('multiRec').value = 1;
}


////////////////// DESCARGAR PDF DE DATOS DE LOS RECIBOS //////////////////

function downloadPdf(pdfContent, fileName) {
  const link = document.createElement('a');
  link.href = 'data:application/pdf;base64,' + pdfContent;
  link.download = fileName;
  link.target = '_blank';
  link.click();
}


//////////////////// MENSAJES DE VENCIMIENTO /////////////////////////////////
var mensajeElement = document.getElementById("mensaje");
var inputElement = document.getElementById("vto");

function actualizarMensaje() {
  var fechaActual = new Date();

  var fechaPagoStr = inputElement.value;
  var fechaHoraSplit = fechaPagoStr.split(" ");
  var fechaSplit = fechaHoraSplit[0].split("/");

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  
  // Revisar si el año tiene 4 dígitos, si no, añadir "20" delante
  var year = fechaSplit[2].length === 2 ? "20" + parseInt(fechaSplit[2], 10) : parseInt(fechaSplit[2], 10);

  var fechaVencimiento = new Date(year, month - 1, day);
  var tiempoDiferencia = fechaVencimiento.getTime() - fechaActual.getTime();
  var diasDiferencia = Math.floor(tiempoDiferencia / (1000 * 3600 * 24) + 1);

  switch (true) {
    case fechaVencimiento > fechaActual && diasDiferencia > 30:
      mensajeElement.textContent = "Pago adelantado";
      mensajeElement.style.color = "blue";
      mensajeElement.style.fontWeight = "bold";
      break;

    case fechaVencimiento > fechaActual && diasDiferencia <= 30 && diasDiferencia >= 0:
      mensajeElement.textContent = "OK";
      mensajeElement.style.color = "blue";
      mensajeElement.style.fontWeight = "bold";
      break;

    case fechaVencimiento < fechaActual && diasDiferencia <= -1 && diasDiferencia >= -45:
      mensajeElement.textContent = "Recibo vencido";
      mensajeElement.style.color = "red";
      mensajeElement.style.fontWeight = "bold";
      break;

    case fechaVencimiento < fechaActual && diasDiferencia <= -46 && diasDiferencia >= -59:
      mensajeElement.textContent = "Debe dos meses";
      mensajeElement.style.color = "red";
      mensajeElement.style.fontWeight = "bold";
      var confirmation = confirm("Estado de poliza: ¡DEBE DOS MESES! ¿DESEA COBRAR AMBAS CUOTAS?\n(SI PRESIONA ACEPTAR TRAERÁ AMBOS RECIBOS.)");
      if (confirmation) {
        document.getElementById("multiRec").value = 2
      }
      break;

    case fechaVencimiento < fechaActual && diasDiferencia <= -60 && diasDiferencia >= -89:
      mensajeElement.textContent = "Debe tres meses";
      mensajeElement.style.color = "red";
      mensajeElement.style.fontWeight = "bold";
      var confirmation = confirm("Estado de poliza: ¡DEBE TRES MESES! ¿DESEA COBRAR LAS TRES CUOTAS?\n(SI PRESIONA ACEPTAR TRAERÁ LOS TRES RECIBOS.)");
      if (confirmation) {
        document.getElementById("multiRec").value = 3
      }
      break;

    case fechaVencimiento < fechaActual && diasDiferencia < -90:
      mensajeElement.textContent = "Póliza posiblemente anulada";
      mensajeElement.style.color = "red";
      mensajeElement.style.fontWeight = "bold";
      var confirmation = confirm("Estado de poliza: ¡DEBE MÁS DE TRES MESES! LA POLIZA PUEDE ESTAR ANULADA, NO SE RECOMIENDA COBRAR.\n¿DESEA CONTINUAR DE IGUAL FORMA?\n(SI PRESIONA ACEPTAR TRAERÁ SOLO UN RECIBO.)");
      if (confirmation) {
        // Acción a realizar si presiona "Aceptar"
      }
      break;
  }
}

//////////////////////// FUNCION PARA COMPROBAR LISTA NEGRA ///////////////////////////

function agroGruas(agrocnia) {
  var companiaSeleccionada = document.getElementById("cnia").value;
  var valorPatente = document.getElementById("patente").value;

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

  }
}



  ////////////////////////////////////////////////////////////



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




////////////////////////////////// EVENTLISTENERS //////////////////////////////////////////////

///////////////////// COMPROBAMOS LA LISTA NEGRA /////////////////////

document.getElementById("cnia").addEventListener("change", agroGruas);


/////////// DESHABILITAMOS EL BOTON DE ENVIO ///////////////
  document.getElementById('formularioRegistro').addEventListener('submit', function() {
    const boton = document.querySelector('input[type="submit"]');
    boton.disabled = true;
  });
  /////////////////////////////////////////////////////


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
console.log("cliente: " + usuario_pass + antiguaClave + nuevaClave)
  google.script.run.cambioClave(antiguaClave, nuevaClave, usuario_pass);
    modal2.style.display = "none";
alert('Clave cambiada correctamente');

});

document.getElementById("vto").addEventListener("change", function() {
  console.log("hola")
actualizarMensaje()
});

document.getElementById('buscarRegistrosBtn5').addEventListener('click', buscarRegistros_nom);
document.getElementById('buscarRegistrosBtn6').addEventListener('click', buscarRegistros_nom_emision);
document.getElementById('buscarRegistrosBtn7').addEventListener('click', decidir_patente);
document.getElementById('buscarRegistrosBtn8').addEventListener('click', decidir_dni);
document.getElementById('bt-ingreso').addEventListener('click', ingresarPago);
document.getElementById('formularioCheque').addEventListener('submit', ingresarCheque);
document.getElementById('formularioGasto').addEventListener('submit', ingresarGasto);
document.getElementById('formularioRecibi').addEventListener('submit', ingresarRecibi);
document.getElementById('btn-reimprimirReciboMulti').addEventListener('click', reimprimirReciboMulti);
document.getElementById('btn-reimprimirRecibo').addEventListener('click', reimprimirRecibo);
document.getElementById('bt-desc-multirec').addEventListener('click', descargaReciboM);
document.getElementById('bt-desc-rec').addEventListener('click', descargaRecibo);
document.getElementById('bt-upd-wpp').addEventListener('click', updateWhatsapp);
document.getElementById('close_session').addEventListener('click', close_sessionok);
