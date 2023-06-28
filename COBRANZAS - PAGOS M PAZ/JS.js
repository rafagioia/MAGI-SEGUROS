
//////////////// BOTON DEL MENU ///////////////////////
    // Obtén una referencia al botón
const navbarToggler = document.getElementById('navbar-toggler');

// Agrega un evento de clic al botón
navbarToggler.addEventListener('click', function() {
  // Obtén una referencia al elemento de destino
  const navbarNav = document.getElementById('navbarNav');

  // Alterna la clase 'show' en el elemento de destino para mostrar u ocultar la barra de navegación
  navbarNav.classList.toggle('show');
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


  //////////////////// INGRESAR PAGOS ///////////////////////

function ingresarPago(event) {
  event.preventDefault();
  const boton = document.getElementById('bt-ingreso');
  const spinner = document.getElementById('spinner_pago');
  spinner.style.display = 'block';
  boton.disabled = true;

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
  let infoColor = document.getElementById('color').value;
  let infoUsuario = sessionStorage.getItem("magi-usuario");
  let infoNotas = document.getElementById('notas').value;
  let infoMedio = document.getElementById('mediopago').value;

  google.script.run.withSuccessHandler(handleResponse).pagoNuevo(
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
    infoNotas,
    infoMedio
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
  document.getElementById("importe").value = "";
  document.getElementById("vto").value = "";
  document.getElementById("color").value = "";
  document.getElementById("notas").value = "";
  document.getElementById("mediopago").value = "EFECTIVO";
}

function handleResponse(response) {
  let infomultiRec = parseInt(document.getElementById('multiRec').value);
  let numRec = parseInt(response);
  console.log(numRec);
  console.log(infomultiRec);
  if (infomultiRec === 1) {
    reimprimirRecibo_b(numRec); // Llama a la función reimprimirRecibo con el valor retornado como numRecibo
  } else if (infomultiRec > 1) {
    reimprimirReciboMulti_b(numRec); // Llama a la función reimprimirReciboMulti con el valor retornado como numReciboMulti
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
  }).getValuesFromSheet(numRecibo);
}

function reimprimirReciboMulti_b(numReciboMulti) {
  google.script.run.withSuccessHandler(function(content) {
    var newWindow = window.open();
    newWindow.document.write(content);

const boton = document.getElementById('bt-ingreso');
    boton.disabled = false;
    const spinner = document.getElementById('spinner_pago');
  spinner.style.display = 'none';
  }).getValuesFromSheetMulti(numReciboMulti);
}


/////////////////////////////////////////////////////////////////////


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
  google.script.run.agregarGasto(gastoConcepto, gastoPara, gastoImporte,usuario_p, gastoMedio);
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
  google.script.run.agregarRecibi(recibiConcepto, recibiPara, recibiImporte,usuario_p, recibiMedio);
  event.target.reset();
alert('Recibi ingresado correctamente');
}


 ///// SCRIPT PARA BUSCAR DATOS POR PATENTE //////////
  function buscarRegistros() {
  const boton = document.getElementById('buscarRegistrosBtn1');
  const spinner = document.getElementById('spinner1');
  spinner.style.display = 'inline-block';
  boton.disabled = true;
        const numeroInventario = document.getElementById("text-box-buscarPatente").value;
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
          let tableBody = document.getElementById("mantenimientosTableBody");
          tableBody.innerHTML = "";
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
        .buscarMantenimientos(numeroInventario)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR PATENTE ////////


          
  ///// SCRIPT PARA BUSCAR DATOS POR DNI //////////
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

        google.script.run
        .withSuccessHandler( info => {
          let tableBody2 = document.getElementById("mantenimientosTableBody2");
          tableBody2.innerHTML = "";
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
          let tableBody = document.getElementById("mantenimientosTableBody");
          tableBody.innerHTML = "";
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
          // tableBody3.innerHTML = "";
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


  ///// SCRIPT PARA BUSCAR DATOS POR PATENTE EMISION //////////
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
          // tableBody3.innerHTML = "";
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
        .buscarMantenimientos3(numeroInventario)
      }
            ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR DNI //////////


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
          let tableBody5 = document.getElementById("mantenimientosTableBody5");
          tableBody5.innerHTML = "";
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

//////////////////// REIMPRIMIR RECIBO SIMPLE //////////////////
function reimprimirRecibo(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numRecibo').value;
  google.script.run.withSuccessHandler(function(content) {
    var newWindow = window.open();
    newWindow.document.write(content);
  }).getValuesFromSheet(numRecibo);
  console.log(numRecibo);
}


//////////////////// REIMPRIMIR RECIBO MULTIPLE x6 //////////////////
function reimprimirReciboMulti(event) {
  event.preventDefault();
  const numReciboMulti = document.getElementById('numReciboMulti').value;
  google.script.run.withSuccessHandler(function(content) {
    var newWindow = window.open();
    newWindow.document.write(content);
  }).getValuesFromSheetMulti(numReciboMulti);
  console.log(numReciboMulti);
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
    tiempoRestanteDiv.innerHTML = "Tiempo expirado";
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
      tiempoRestanteDiv.innerHTML = "Tiempo expirado";
      document.getElementById("usuario_sp").innerHTML = "Desconocido";
      modal.style.display = "block";
    } else {
      mostrarTiempoRestante(tiempoRestante);
    }
  }, 1000);
}


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
            


//////////////////// MENSAJES DE VENCIMIENTO /////////////////////////////////
var mensajeElement = document.getElementById("mensaje");
var inputElement = document.getElementById("vto");

function actualizarMensaje() {
  var fechaActual = new Date();

  var fechaPagoStr = inputElement.value;
  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio
  var fechaSplit = fechaHoraSplit[0].split("/"); // Dividir la fecha en día, mes y año
  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = "20" + parseInt(fechaSplit[2], 10);
  var fechaVencimiento = new Date(year, month - 1, day); // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios
  var tiempoDiferencia = fechaVencimiento.getTime() - fechaActual.getTime();
  var diasDiferencia = Math.floor(tiempoDiferencia / (1000 * 3600 * 24)+1);

  switch (true) {
      case fechaVencimiento > fechaActual && diasDiferencia > 30:
      mensajeElement.innerHTML = "Pago adelantado";
      mensajeElement.style.color = "blue";
      mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
    case fechaVencimiento > fechaActual && diasDiferencia <= 30 && diasDiferencia >= 0:
      mensajeElement.innerHTML = "OK";
      mensajeElement.style.color = "blue";
    mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
    case fechaVencimiento < fechaActual && diasDiferencia <= -1 && diasDiferencia >= -45:
      mensajeElement.innerHTML = "Recibo vencido";
      mensajeElement.style.color = "red";
    mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
    case fechaVencimiento < fechaActual && diasDiferencia <= -46 && diasDiferencia >= -59:
      mensajeElement.innerHTML = "Debe dos meses";
      mensajeElement.style.color = "red";
    mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
    case fechaVencimiento < fechaActual && diasDiferencia <= -60 && diasDiferencia >= -89:
      mensajeElement.innerHTML = "Debe tres meses";
      mensajeElement.style.color = "red";
    mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
    case fechaVencimiento < fechaActual && diasDiferencia < -90:
      mensajeElement.innerHTML = "Póliza posiblemente anulada";
      mensajeElement.style.color = "red";
    mensajeElement.style.fontWeight = "bold"; // Fuente más gruesa
      break;
  }
}

  ////////////////////////////////////////////////////////////

////////////////////////// DESCARGAR PDF DE RECIBOS /////////////////////

function descargaRecibo(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numRecibo').value;
  google.script.run.withSuccessHandler(function(pdfContent) {
    downloadPdf(pdfContent, "recibo.pdf");
  }).getPdfContent(numRecibo);
}

function downloadPdf(pdfContent, fileName) {
  const link = document.createElement('a');
  link.href = 'data:application/pdf;base64,' + pdfContent;
  link.download = fileName;
  link.target = '_blank';
  link.click();
}


function descargaReciboM(event) {
  event.preventDefault();
  const numRecibo = document.getElementById('numReciboMulti').value;
  google.script.run.withSuccessHandler(function(pdfContent) {
    downloadPdf(pdfContent, "recibo.pdf");
  }).getPdfContentM(numRecibo);
}



/////////////////////////////////////////////////////////////////////////



////////////////////////////////// EVENTLISTENERS //////////////////////////////////////////////

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

document.getElementById('buscarRegistrosBtn2').addEventListener('click', buscarRegistros_emision);
document.getElementById('buscarRegistrosBtn3').addEventListener('click', buscarRegistros_dni);
document.getElementById('buscarRegistrosBtn4').addEventListener('click', buscarRegistros_dni_emision);
document.getElementById('buscarRegistrosBtn5').addEventListener('click', buscarRegistros_nom);
document.getElementById('buscarRegistrosBtn6').addEventListener('click', buscarRegistros_nom_emision);
document.getElementById('buscarRegistrosBtn1').addEventListener('click', buscarRegistros);
document.getElementById('bt-ingreso').addEventListener('click', ingresarPago);
document.getElementById('formularioCheque').addEventListener('submit', ingresarCheque);
document.getElementById('formularioGasto').addEventListener('submit', ingresarGasto);
document.getElementById('formularioRecibi').addEventListener('submit', ingresarRecibi);
document.getElementById('bt-desc-multirec').addEventListener('click', descargaReciboM);
document.getElementById('bt-desc-rec').addEventListener('click', descargaRecibo);
document.getElementById('formularioReimprimir').addEventListener('submit', reimprimirRecibo);
document.getElementById('formularioReimprimirMulti').addEventListener('submit', reimprimirReciboMulti);
document.getElementById('close_session').addEventListener('click', close_sessionok);
