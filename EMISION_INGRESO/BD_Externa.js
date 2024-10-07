/////////// SISTEMA 3.0 //////////////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////// HTML /////////////////////////////////////////////


/////////// ABRIMOS EL HTML ///////////////
function doGet(){
  var template = HtmlService.createTemplateFromFile('Emision');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbyl4LlA9L2qJOC_o7MR5mkfV1WMyZChEKvimdjq3erUtv7do57XI3grZlomnsYuofs/exec"
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}


////////////// INGESAMOS POLIZA NUEVA A BD EMISION //////////////////
function seguroNuevo(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoRefa, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoHistoricoFull, infoNotasVeh, infoMotor, infoChasis, infoUsuario, infoHoy, infoNotifica, infoCalifica, infoAnio, infoColor, infoVTV, infoSumaAseg, infoTipo, infoAcc1, infoAcc1valor, infoRefaDesde, infoRefaHasta ,infoVigTot) {
  
  let accesorios = []
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const BD_VEHICULOS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/17FkXB8az__L819hlpT09J46uX24OWV5kH2_ilJY9u-0/edit").getSheetByName("BD_VEHICULOS");
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");


//  ARCHIVO JSON

  const fileId_veh = '1xm75n0LuJKz3v-mWKaSnEtDlr-MFcUUX';
  const file_veh = DriveApp.getFileById(fileId_veh);
  let jsonData_vehiculos = file_veh.getBlob().getDataAsString();
  let vehiculoData = JSON.parse(jsonData_vehiculos);

  const fileId_clientes = '1ja_50YQFVF-FbzFWuFq8udWwIiNvpX6b';
  const file_clientes = DriveApp.getFileById(fileId_clientes);
  let jsonData_clientes = file_clientes.getBlob().getDataAsString();
  let clienteData = JSON.parse(jsonData_clientes);
  
  const fileId_polizas = '1_G0YDQc7lbpttFh-hL3gtaBmLVTXncgx';
  const file_polizas = DriveApp.getFileById(fileId_polizas);
  let jsonData_polizas = file_polizas.getBlob().getDataAsString();
  let polizasData = JSON.parse(jsonData_polizas);

  const fileId_cob = '1rRTLm_cqiWuvCIBEUVW-FXIPK-A8E0A4';
  const file_cob = DriveApp.getFileById(fileId_cob);
  let jsonData_cob = file_cob.getBlob().getDataAsString();
  let cobData = JSON.parse(jsonData_cob);

//


  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();
  const VAL_VEH = BD_VEHICULOS.getDataRange().getDisplayValues();
  const VAL_POL = BD_POLIZAS.getDataRange().getDisplayValues();
  // const VAL_VIE = BD_VIEJA.getDataRange().getDisplayValues();
  

  if (infoNotifica = true) {
    infoNotifica = "SI"
  } else {
    infoNotifica = ""
  }
  
var fecha = new Date();

 // Buscar si el DNI ya existe en la hoja de clientes
  let dniIndex = -1;
  for (let i = 0; i < VAL_CTE.length; i++) {
    if (VAL_CTE[i][0] === infoDNI) {
      dniIndex = i + 1;
      break;
    }
  }


  // Si el DNI ya existe, actualizar los datos del cliente
  if (dniIndex !== -1) {
    BD_CLIENTES.getRange(dniIndex, 2).setValue(infoCliente);
    BD_CLIENTES.getRange(dniIndex, 3).setValue(infoDomicilio);
    BD_CLIENTES.getRange(dniIndex, 4).setValue(infoLocalidad);
    BD_CLIENTES.getRange(dniIndex, 5).setValue(infoWpp);
    BD_CLIENTES.getRange(dniIndex, 7).setValue(infoMail);
    BD_CLIENTES.getRange(dniIndex, 8).setValue(infoNotascte);
    BD_CLIENTES.getRange(dniIndex, 9).setValue(new Date());
    BD_CLIENTES.getRange(dniIndex, 10).setValue(infoCalifica);

  const now = new Date();
  const formatDate = Utilities.formatDate(fecha, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');

  let clienteIndex = -1;
  for (let i = 0; i < clienteData.length; i++) {
    if (clienteData[i].DNI === parseInt(infoDNI, 10)) {
      clienteIndex = i;
      console.log("cliente encontrado: " + clienteData[clienteIndex].Cliente)

    clienteData[clienteIndex] = {
      "id": clienteData[clienteIndex].id,
      "DNI": infoDNI || '',
      "Cliente": infoCliente || '',
      "Domicilio": infoDomicilio || '',
      "Localidad": infoLocalidad || '',
      "Whatsapp": infoWpp || '',
      "Mail": infoMail || '',
      "Notas": infoNotascte || '',
      "Calificacion": infoCalifica || '',
      "Actualización": formatDate || ''
  }

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(clienteData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_clientes.setContent(newJsonData);

      break;
    }
  }


  }
  // Si el DNI no existe, agregar una nueva fila a la hoja de clientes
  else {
    var ctesVals = [infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, , infoMail, infoNotascte, new Date(), infoCalifica];
    BD_CLIENTES.appendRow(ctesVals);

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;

  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');

  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "DNI": infoDNI || '',
    "Cliente": infoCliente || '',
    "Domicilio": infoDomicilio || '',
    "Localidad": infoLocalidad || '',
    "Whatsapp": infoWpp || '',
    "Mail": infoMail || '',
    "Notas": infoNotascte || '',
    "Calificacion": infoCalifica || '',
    "Actualización": formattedDate || ''
  };

  // Agregar la nueva entrada al array de datos
  clienteData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(clienteData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_clientes.setContent(newJsonData);

  }


 // Buscar si el Patente ya existe en la hoja de Polizas
  let patenteIndex = -1;
  for (let i = 0; i < VAL_VEH.length; i++) {
    if (VAL_VEH[i][0] === infoPatente) {
      patenteIndex = i + 1;
      break;
    }
  }

  // Si la Patente ya existe, actualizar los datos del Vehiculo
  if (patenteIndex !== -1) {

  BD_VEHICULOS.getRange(patenteIndex, 2).setValue(infoMarca);
  BD_VEHICULOS.getRange(patenteIndex, 3).setValue(infoAnio);
  BD_VEHICULOS.getRange(patenteIndex, 4).setValue(infoTipo);
  BD_VEHICULOS.getRange(patenteIndex, 5).setValue(infoMotor);
  BD_VEHICULOS.getRange(patenteIndex, 6).setValue(infoChasis);
  BD_VEHICULOS.getRange(patenteIndex, 7).setValue(infoColor);
  BD_VEHICULOS.getRange(patenteIndex, 8).setValue(infoSumaAseg);
  BD_VEHICULOS.getRange(patenteIndex, 9).setValue(infoAcc1 + "," + infoAcc1valor);
  BD_VEHICULOS.getRange(patenteIndex, 10).setValue(infoVTV);
  BD_VEHICULOS.getRange(patenteIndex, 11).setValue(infoNotasVeh);
  BD_VEHICULOS.getRange(patenteIndex, 12).setValue(infoDanios);
  BD_VEHICULOS.getRange(patenteIndex, 13).setValue(infoHistoricoFull);
  BD_VEHICULOS.getRange(patenteIndex, 14).setValue(infoHoy);

  const now = new Date();
  const formatDate = Utilities.formatDate(fecha, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');

  let patenteVIndex = -1;
  for (let i = 0; i < vehiculoData.length; i++) {
    if (vehiculoData[i].PATENTE === infoPatente) {
      patenteVIndex = i;
      console.log("encontró la patente " + infoPatente)

    vehiculoData[patenteVIndex] = {
      "id": vehiculoData[patenteVIndex].id,
      "PATENTE": infoPatente || '',
      "VEHICULO": infoMarca || '',
      "AÑO": infoAnio || '',
      "TIPO VEHICULO": infoTipo || '',
      "MOTOR": infoMotor || '',
      "CHASIS": infoChasis || '',
      "COLOR": infoColor || '',
      "SUMA ASEGURADA": infoSumaAseg || '',
      "ACCESORIOS": [],
      "VTV": infoVTV || '',
      "NOTAS": infoNotasVeh || '',
      "DAÑOS": infoDanios || '',
      "ACTUALIZACIÓN": formatDate
  }

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(vehiculoData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_veh.setContent(newJsonData);

      break;
      
  } else {
      console.log("No encontró la patente " + infoPatente)

  }

  }
  }
  // Si la Patente no existe, agregar una nueva fila a la hoja de polizas
   else {
let accessU = infoAcc1 + "," + infoAcc1valor
var vehVals = [infoPatente, infoMarca, infoAnio, infoTipo, infoMotor, infoChasis, infoColor, infoSumaAseg, accessU, infoVTV, infoNotasVeh, infoDanios, infoHistoricoFull, infoHoy]

    BD_VEHICULOS.appendRow(vehVals);

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;

  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');

  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "Marca": infoMarca || '',
    "Año": infoAnio || '',
    "Tipo Veh": infoTipo || '',
    "N° Motor": infoMotor || '',
    "N° Chasis": infoChasis || '',
    "Color": infoColor || '',
    "Suma Veh": infoSumaAseg || '',
    "VTV": infoVTV || '',
    "Notas Veh": infoNotasVeh || '',
    "Actualización": infoHoy || '',
    "Accesorios": accesorios || [],
    "Actualización": formattedDate
  };

  // Agregar la nueva entrada al array de datos
  vehiculoData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(vehiculoData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_veh.setContent(newJsonData);

  }

let patenteIndexp = -1;
for (let i = VAL_POL.length - 1; i >= 0; i--) {
  if (VAL_POL[i][0] === infoPatente) {
    patenteIndexp = i + 1; // Ajustar el índice para el rango en Google Sheets
    break;
  }
}

// Si la Patente ya existe, actualizar los datos del Vehiculo
if (patenteIndexp !== -1) {
  // Actualizar datos de la patente existente
  BD_POLIZAS.getRange(patenteIndexp, 11).setValue("ANULACION");
  BD_POLIZAS.getRange(patenteIndexp, 17).setValue("//"+ infoUsuario + " [" + infoHoy + "] ANULACION POR REEMPLAZO - " + infoHistoricoFull);
}



//// REFA

var partesFecha = infoVigencia.split('/');

var dia_cob = partesFecha[0]; 
var mes_cob = partesFecha[1]; 
var anio_cob = partesFecha[2]; 

var diaFechaRefa = parseInt(dia_cob, 10);  // Día
var mesFechaRefa = parseInt(mes_cob, 10) - 1;  // Mes (los meses en JavaScript empiezan desde 0)
var anioFechaRefa = parseInt("20" + anio_cob, 10);  // Año
console.log("anioFechaRefa : " + anioFechaRefa)
// Crea un objeto Date con esos valores
var fechaRefaObj = new Date(anioFechaRefa, mesFechaRefa, diaFechaRefa);

console.log("fechaRefaObj : " + fechaRefaObj)
fechaRefaObj.setMonth(fechaRefaObj.getMonth() + parseInt(infoRefa));

console.log("fechaRefaObj + mes: " + fechaRefaObj)
// Obtiene el día, mes y año de la nueva fecha
var nuevoDiaRefa = String(fechaRefaObj.getDate()).padStart(2, '0');
var nuevoMesRefa = String(fechaRefaObj.getMonth() + 1).padStart(2, '0');  // Los meses son base 0 en JS
var nuevoAnioRefa = String(fechaRefaObj.getFullYear()).slice(-2);

console.log("nuevoAnioRefa: " + nuevoAnioRefa)

// Crea la nueva fecha en formato "DD/MM/YYYY"
let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;



var polVals = [infoPatente, infoDNI, infoCliente, infoSucursal, infoRefa, infoImporte, infoCnia, infoPoliza, infoVigencia, infoHasta, infoOperacion, infoCobertura, infoMarca, infoFpago, infoNotasVeh, infoNotifica, infoHistoricoFull, infoHoy, infoRefaDesde, infoRefaHasta ,infoVigTot]

  BD_POLIZAS.appendRow(polVals);

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": infoSucursal || '',
    "Refactura": infoRefa || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": infoVigencia || '',
    "Vig Hasta": infoHasta || '',
    "Operacion": infoOperacion || '',
    "Cobertura": infoCobertura || '',
    "Forma Pago": infoFpago || '',
    "Notas Veh": infoNotasVeh || '',
    "Notifica": infoNotifica || '',
    "Actualización": formattedDate || '', 
    "Refa Desde": infoVigencia,
    "Refa Hasta": newVtoHastaRefa

  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);

}

///////////////////////// SUBIDA DE FOTOS //////////////////////////////

function uploadFilesToDrive(folderId, filesBase64, patente) {
  var parentFolder = DriveApp.getFolderById(folderId);
  var folders = parentFolder.getFoldersByName(patente);
  var targetFolder;
  
  // Verifica si ya existe la carpeta con el nombre de la patente
  if (folders.hasNext()) {
    targetFolder = folders.next();
  } else {
    // Si no existe, crea una nueva carpeta con el nombre de la patente
    targetFolder = parentFolder.createFolder(patente);
  }
  
  // Procesa y sube cada archivo a la carpeta de la patente
  filesBase64.forEach(function(file) {
    var decodedBytes = Utilities.base64Decode(file.base64);
    var blob = Utilities.newBlob(decodedBytes, file.mimeType, file.fileName);
    targetFolder.createFile(blob);
  });
  
  // alert("Fotos subidas correctamente.");
}

function uploadRegToDrive(folderId, filesBase64, dni) {
  var parentFolder = DriveApp.getFolderById(folderId);
  var folders = parentFolder.getFoldersByName(dni);
  var targetFolder;
  
  // Verifica si ya existe la carpeta con el nombre del dni
  if (folders.hasNext()) {
    targetFolder = folders.next();
  } else {
    // Si no existe, crea una nueva carpeta con el nombre del dni
    targetFolder = parentFolder.createFolder(dni);
  }
  
  // Procesa y sube cada archivo a la carpeta de la dni
  filesBase64.forEach(function(file) {
    var decodedBytes = Utilities.base64Decode(file.base64);
    var blob = Utilities.newBlob(decodedBytes, file.mimeType, file.fileName);
    targetFolder.createFile(blob);
  });
  
  // alert("Fotos subidas correctamente.");
}
///////////////////////////////////////////////////////////////////////


///////////////// BUSCADOR DE DATOS DE VEHICULO AUTOMATICO ///////////////////

function obtenerDatos(inputDato) {
  const spreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1PEmYkBVg-eeoYWAcnvDE6Fky3dj8rl9BKD55x8Z-aXs/edit");
  const hoja = spreadsheet.getSheetByName("MARCAS");

  var datoBusqueda = inputDato.toLowerCase();

  var datos = hoja.getRange("A2:A" + hoja.getLastRow()).getValues();
  
  var sugerencias = datos.filter(function(dato) {
    var texto = dato[0].toString().toLowerCase();
    return texto.includes(datoBusqueda);
  });

  return sugerencias;
}


// BUSCAR VEHICULO PASANDO PATENTE

function buscarVehPat(valor = "1192774") {

  const resultados = buscarValor(0, valor, "https://docs.google.com/spreadsheets/d/17FkXB8az__L819hlpT09J46uX24OWV5kH2_ilJY9u-0/edit", "BD_VEHICULOS", "exacto");

  return resultados;
}


// BUSCAR VEHICULO PASANDO PATENTE

function buscarVehPol(valor = "1192774") {

  const resultados = buscarValor(0, valor, "https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit", "BD_POLIZAS", "exacto");

  return resultados;
}


// BUSCAR CLIENTE PASANDO DNI BD MARCOS PAZ

function buscar_DNI_MP(valor = "1192774") {

  const resultados = buscarValor(0, valor, "https://docs.google.com/spreadsheets/d/1qeFnZ0_mBy8cyV1GFpF5a09LRVD-7bfDcTnSMcDMUjA/edit", "BD MARCOS PAZ", "exacto");

  return resultados;
}



// BUSCAR NOMBRE EN BD EMISION

function buscarNom_BD_EMI(valor = "1192774") {

  const resultados = buscarValor(1, valor, "https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit", "BD CLIENTES", "aprox");

  return resultados;
}


// BUSCAR NOMBRE EN BD MARCOS PAZ

function buscarNom_BD_MP(valor = "1192774") {

  const resultados = buscarValor(1, valor, "https://docs.google.com/spreadsheets/d/1qeFnZ0_mBy8cyV1GFpF5a09LRVD-7bfDcTnSMcDMUjA/edit", "BD MARCOS PAZ", "aprox");

  return resultados;
}


// BUSCAR CLIENTE PASANDO DNI EN BD CLIENTES

// function buscarMantenimientos4(valor = "1192774") {

//   const resultados = buscarValor(0, valor, "https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit", "BD CLIENTES", "exacto");

//   return resultados;
// }



function buscarDNI_cliente(numeroInventario2 = "1192774") {
  let mantenimientosRealizados10 = [];
  let mantenimientosRealizados4 = [];
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos7 = BD_CLIENTES.getDataRange().getDisplayValues();

  /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos7.forEach(mantenimiento7 => {
    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if (mantenimiento7[0] === numeroInventario2) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados4.push(mantenimiento7);
    }
  });


        /////LISTADO DE POLIZAS VIGENTES
  let mantenimientosRealizados9 = [];
  let patentesProcesadas = new Set(); // Usamos un Set para evitar duplicados
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const mantenimientos8 = LISTADO.getDataRange().getDisplayValues();
  
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Recorremos de abajo hacia arriba para tomar solo el primer valor de cada patente
  for (let i = mantenimientos8.length - 1; i >= 0; i--) {
    let mantenimiento2 = mantenimientos8[i];
    
    // Evitamos duplicados por patente y verificamos el número de inventario y que no sea "ANULACION"
    if (!patentesProcesadas.has(mantenimiento2[0]) && mantenimiento2[1] === numeroInventario2 && mantenimiento2[10] !== "ANULACION") {
      let actualizacion_pol2 = []; // Crear un nuevo arreglo para cada vehículo

      actualizacion_pol2.push(mantenimiento2[0]); // Patente
      actualizacion_pol2.push(mantenimiento2[12]); // Vehiculo
      actualizacion_pol2.push(mantenimiento2[6]);  // Compañia
      actualizacion_pol2.push(mantenimiento2[19]);  // Vto

      // Procesar la fecha de vigencia [8] y determinar si está vigente
      let fechaVigenciaHasta = mantenimiento2[19]; // Fecha en formato DD/MM/YY
      let partesFecha = fechaVigenciaHasta.split('/');
      let fechaVigencia = new Date("20" + partesFecha[2], partesFecha[1] - 1, partesFecha[0]); // Convertir a formato Date
      console.log("fechaVigencia: " + fechaVigencia)
      console.log("fechaActual: " + fechaActual)
      // Comparar con la fecha actual
      if (fechaVigencia < fechaActual) {
        actualizacion_pol2.push("NO VIGENTE");
      } else {
        actualizacion_pol2.push("VIGENTE");
      }

      // Agregar el resultado al array final
      mantenimientosRealizados9.push(actualizacion_pol2);

      // Marcar la patente como procesada
      patentesProcesadas.add(mantenimiento2[0]);
    }
  }

  // Agregar los mantenimientos realizados
  mantenimientosRealizados10.push(mantenimientosRealizados4);
  mantenimientosRealizados10.push(mantenimientosRealizados9);

  console.log(mantenimientosRealizados10);
  return mantenimientosRealizados10;
}



////////////////////////////////// BD PAIS ///////////////////////////////

function buscarDNI_BD_ARG_1(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/16_deFzffvAVsCgLJeA4SZiVOu2S4Es5bBm0H_D743CE/edit"; // BD1
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_2(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1-MInn0W6btoH9auEGk9ClTA8W6CH1qHf3VLKF9DF39Y/edit"; // BD2
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}

function buscarDNI_BD_ARG_3(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1lNXVWct2jFaUcv-2fmKEHH1g1texm92Yj50AIrQ69ms/edit" // BD3
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_4(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/13FFS4-YFPjpXyhk27lf5kjDGCA67WKUWpKJLZ7hfw-4/edit" // BD4
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_5(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1OzK-s0BnFKAviHxNnAHLp00-7I_AzuMJmZRqr7WYyFI/edit" // BD5
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_6(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1x2_A81mhk2CSz-jLLAPNbooXuYcIXDMED4oYBkbU4KU/edit" // BD6
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_7(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1zZz1Gi9DCRuMsGZtzMxU8tF0_nSGe5c4zvgg9D_ZwVg/edit" // BD7
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_8(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1q_0okjOpgOH3_okxAwG78yWkKXoIvE03K272X1lONlk/edit" // BD8
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_9(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1iI5KJgOwr_g_yqSZjS-Sj_8GqnGgx1yhG0sw_BxIsTA/edit" // BD9
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_10(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1wZ6LnhxsqNYVaFv-5nvAHM5RIV5GRO-FrwZspKaUaeI/edit" // BD10
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}

function buscarDNI_BD_ARG_11(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/168B1OynPnjcIt_QiRLujwiHEclEiEi5_LpmjnzkciPo/edit" // BD11
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_12(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1isFVV9N9Lji_GIEw05KJYcwZ3yIA0Hb_zWNIm1nQ2tU/edit" // BD12
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_13(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1bT331ZQ4OgzGSo9UYnCoDA4Wk6uDCesLmTIKcNMd3sA/edit" // BD13
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_14(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1CBkPNSJbzfwWmu2sFz2K1pj39i1ZN5RF7IY15_foENE/edit" // BD14
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_15(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1Z6YxrFHm_vMZD_KDj09qanpgFfjKJ6KjMlXs5nukSmI/edit" // BD15
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_16(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1utvXgGNiPf02xsEvhJIvOWarez2CBifEH0OrXvPNNTQ/edit" // BD16
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_17(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1D_RhnboaAI-mdVVllf4DFYt3cLcTygVNIFqBj1oihLI/edit" // BD17
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_18(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1Wd_d5-fFVf0-SLWjbPSa0PKip1fGizcgpEmhiDhFCRQ/edit" // BD18
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_19(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1h60SYkym9OUDb7r2fFLiZYVmFHa6ahmvkR_3lmp9B0w/edit" // BD19
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_20(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1rC_pXDHC51V7j8NgCQCYHO39FTUO6Y_LmD8TJcN-4UQ/edit" // BD20
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_21(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1MnEA-WFRCOpQmz50250TOgPrpLZAOShdvx7TGns5kXI/edit" // BD21
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_22(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/17V-UxMJfKWMepLLrrP69lc1XUtOBNm08LAkVISpJJEM/edit" // BD22
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_23(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1lFnRU7VybKJWSBbil4ksmInVhwlK8zx8F0s1JmnEOsA/edit" // BD23
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_24(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1trat7F1RALVC8Ahy8YY1gofGw9RwQd8PHyLMc7QOJaI/edit" // BD24
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_25(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/13hC1GmmJc0ES6mZRxQeOf2X9qRWWQLn7W34ICq91BrU/edit" // BD25
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_26(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1i2IP6h7xnMn_G4VbJ88IL2R8ryW-Xil2E73O_0BDq4s/edit" // BD26
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_27(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1MnTZUueaTavESqJN244RZaD8yhgoTFXeX9TNUgP8RpY/edit" // BD27
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_28(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/14jzBfXXYvggSLoOcbh3Qz7WQmG3ip5lWO1yQAV67iuo/edit" // BD28
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_29(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1FyfG6n1S-_mBKIhALl9J6A9eGR9BVPJ3_5K5RLO1pc4/edit" // BD29
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_30(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1Nr_TdzXVvEWmmYA1nWMBH43a6rkbGMqbjq8Cw3DFRlA/edit" // BD30
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}





function buscarDNI_BD_ARG_31(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1pyqtF9D39SrwZMFdP1CcUsvm3Ni2-YPX9yCtNjlLuz4/edit" // BD31
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_32(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1abpro_ipXAEeykR5yc82bCu_DARpvdjCDhFmKMnuh_A/edit" // BD32
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_33(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1vpGjfA3NdNlzHHnKUx56luSTuW8_tjyC3wY_ooc8uDU/edit" // BD33
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}






function buscarDNI_BD_ARG_34(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1kxcYJTJm0BBhijIHDz3Bpw7iU8x9n-4OdU3hOZn8CCc/edit" // BD34
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


function buscarDNI_BD_ARG_35(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1j-wd-_Uu3LfwiP3u-MPt58MiNPvgkoecyArzH2M5VSU/edit" // BD35
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_36(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1utvaF80Upq2Z-qR5T-5zpEnzvYTYfpJyRszHVaTRGfQ/edit" // BD36
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_37(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/15HtibvtQzPJrqqYKBZz5jp0z_IXnBPboSlHfBqVh3C4/edit" // BD37
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_38(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1yYYITiku0kvbTG6SGpkLXfoP_01u-qRFwPZ4cJNYF3s/edit" // BD38
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_39(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1i5uNrtqZQjYXNLlmQojo812cgby_GiVSigkaDXZffgk/edit" // BD39
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}



function buscarDNI_BD_ARG_40(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1qIeDeFtrFJgoV5TVWJlknvAkrs-dcHf-BvPHEUxeRMs/edit" // BD40
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}




function buscarDNI_BD_ARG_41(dni) {
  let resultados = [];
  const url = "https://docs.google.com/spreadsheets/d/1UfnCLai27lHEXTWFL9TW-GbkefNLITFn1mGlxfj-8S4/edit" // BD41
  let encontrado = false;

  const hoja = SpreadsheetApp.openByUrl(url).getSheets()[0];
  const data = hoja.getDataRange().getDisplayValues();

  console.log("Procesando archivo:", url);

  // Buscar el DNI en el rango específico
  for (let row of data) {
    if (row[0] === dni) {
      resultados.push(row[0], row[1]);
      encontrado = true;
      break; // Salir del bucle for si se encontró el resultado
    }
  }

  if (!encontrado) {
    return resultados; // Devolver un array vacío si no se encuentra el DNI
  }

  return resultados;
}


/////////////////////////////////////////////////////////////////////


////////// FILTRO VEHICULOS LADO SERVIDOR /////////////
function getData(infoDNI = "") {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const data = LISTADO.getDataRange().getDisplayValues();
  var sinPendientes = [];
  for (var i = 0; i < data.length; i++) {
if ((infoDNI === "" || data[i][1] === infoDNI)) {
    // agrega el código para los valores correspondientes a la tabla
        var sinPend = [];
        sinPend.push(data[i][0]); // PATENTE
        sinPend.push(data[i][12]); // MARCA
        sinPend.push(data[i][6]); // COMPAÑIA
        sinPend.push(data[i][11]); // COBERTURA
        sinPend.push(data[i][5]); // IMPORTE
        sinPend.push(data[i][7]); /// POLIZA
        sinPend.push(data[i][10]); // OPERACION
        sinPend.push(data[i][8]); // VIGENCIA
        sinPend.push(data[i][9]); // HASTA
        sinPend.push(data[i][14]); // NOTAS
        sinPend.push(data[i][15]); // DANIOS
        sinPend.push(data[i][17]); // MOTOR
        sinPend.push(data[i][18]); // CHASIS
        sinPend.push(data[i][4]); // REFA
        sinPendientes.push(sinPend);
      }
    
  }

  console.log(sinPendientes);
  return sinPendientes;
}


function getData2(infoPatente = "") {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const data2 = LISTADO.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const data = BD_CLIENTES.getDataRange().getDisplayValues();
  var sinPendientes2 = [];
  
  for (var i = 0; i < data2.length; i++) {
    if (data2[i][0] === infoPatente) {
      var infoDNI = data2[i][1]; // Obtener el valor correspondiente en la columna B
      var infoOP = data2[i][10]; // OPERACION
      break; // Terminar el bucle una vez que se encuentre el valor
    }
  }
  
  for (var i = 0; i < data.length; i++) {
    if (infoDNI === "" || data[i][0] === infoDNI) {
      // Agrega el código para los valores correspondientes a la tabla
      var sinPend = [];
      sinPend.push(data[i][0]); // DNI
      sinPend.push(data[i][1]); // NOMBRE
      sinPend.push(data[i][2]); // DOMICILIO
      sinPend.push(data[i][3]); // LOCALIDAD
      sinPend.push(data[i][4]); // WHATSAPP
      sinPend.push(data[i][6]); // MAIL
      sinPend.push(data[i][7]); // NOTAS CTE
      sinPend.push(infoOP); // OPERACION
      sinPendientes2.push(sinPend);
    }
  }

  console.log(sinPendientes2);
  return sinPendientes2;
}

///////////////////////////// ENVIO MAIL FOTOS //////////////////////////

function sendEmail(photos, pat_len, mar_len, mot_len, cha_len) {
  var emailAddress = "producciongioiapas@gmail.com";
  var subject = pat_len;
    var body = "Adjunto las imágenes capturadas.\n\n" +
              "Patente: " +  pat_len + "\nMarca: " + mar_len +
              "\nMotor: " + mot_len + "\nChasis: " + cha_len ;
              
  var attachments = [];
  for (var i = 0; i < photos.length; i++) {
    var imageData = photos[i].split(",")[1]; // Eliminar el encabezado "data:image/jpeg;base64,"
    var blob = Utilities.newBlob(Utilities.base64Decode(imageData), "image/jpeg", "photo" + (i + 1) + ".jpg");
    attachments.push(blob);
  }
  MailApp.sendEmail({
    to: emailAddress,
    subject: subject,
    body: body,
    attachments: attachments
  });
}



/////////////////////////// MOSTRAR FOTOS CARGADAS ///////////////////////////////


function obtenerFotosPorPatente(patente) {
  var folderId = "18rVebn9nL-lK6qWT6t0TwfoazQkwCIMn"; // Reemplaza esto con el ID de tu carpeta raíz en Google Drive
  var folder = DriveApp.getFolderById(folderId);
  var subFolders = folder.getFolders();
  var fotosBase64 = [];
  var fotosIds = [];
  
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    if (subFolder.getName() === patente) {
      var files = subFolder.getFiles();
      while (files.hasNext()) {
        var file = files.next();
        var blob = file.getBlob();
        var base64 = Utilities.base64Encode(blob.getBytes());
        var dataUrl = 'data:' + blob.getContentType() + ';base64,' + base64;
        fotosBase64.push(dataUrl);
        fotosIds.push(file.getId());
      }
      break;
    }
  }
  
  return { fotosBase64: fotosBase64, fotosIds: fotosIds };
}


function obtenerFotosPorDNI(dni) {
  var folderId = "1CyTu6J75Nhdshmt38N79Jf9Ymxq8znYz"; // Reemplaza esto con el ID de tu carpeta raíz en Google Drive
  var folder = DriveApp.getFolderById(folderId);
  var subFolders = folder.getFolders();
  var fotosBase64 = [];
  var fotosIds = [];
  
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    if (subFolder.getName() === dni) {
      var files = subFolder.getFiles();
      while (files.hasNext()) {
        var file = files.next();
        var blob = file.getBlob();
        var base64 = Utilities.base64Encode(blob.getBytes());
        var dataUrl = 'data:' + blob.getContentType() + ';base64,' + base64;
        fotosBase64.push(dataUrl);
        fotosIds.push(file.getId());
      }
      break;
    }
  }
  
  return { fotosBase64: fotosBase64, fotosIds: fotosIds };
}

function borrarFotoEnDrive(fotoId) {
  try {
    DriveApp.getFileById(fotoId).setTrashed(true);
    return true;
  } catch (error) {
    console.error("Error al borrar la foto:", error);
    return false;
  }
}

////////////////////////// BLACK LIST /////////////////////////////

function searchBlacklist(patente) {
  var sheet = SpreadsheetApp.openById("1u7HmWpLi7VZMHZrRjmhdOUtIjLQZWUuzkduGWL1DRCE").getSheetByName("BLACK LIST");
  
  var dataValues = sheet.getDataRange().getDisplayValues();
    
    for (var i = 1; i < dataValues.length; i++) {
    if (dataValues[i][0] === patente) {
      return dataValues[i][1];
    }
  }
}


/////////////////////// SEGUROS EMITIDOS DIA ////////////////

function segurosEmitidosDia() {
  const sheetId = '1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA';
  const sheetName = 'BD_POLIZAS'; // Nombre de la hoja

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);

  const data = sheet.getDataRange().getValues();
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const year = String(today.getFullYear()).substring(2);
  const formattedToday = `${day}/${month}/${year}`;

  const filteredData = [];
  for (let i = 1; i < data.length; i++) { 
    const ultimaMod = new Date(data[i][17]); // Columna U (Índice 20)
    const ultimaModday = String(ultimaMod.getDate()).padStart(2, '0');
    const ultimaModmonth = String(ultimaMod.getMonth() + 1).padStart(2, '0'); 
    const ultimaModyear = String(ultimaMod.getFullYear()).substring(2); 

    const tipo = data[i][3]; // Columna D (Índice 3)
    if (ultimaModday === day && ultimaModmonth === month  && ultimaModyear === year  && tipo !== 'BD SINIESTROS' && tipo !== 'BD COBRANZAS') {
      const dni = data[i][1]; 
      const cliente = data[i][2];
      const patente = data[i][0];
      const marca = data[i][12]; 
      const cnia = data[i][6];
      const usuario = data[i][16]; // Columna T (Índice 19)
      const usuarioName = usuario.substring(2).split(' ')[0]; // Obtener desde el tercer caracter hasta el primer espacio
      filteredData.push([dni, cliente, patente, marca, cnia, usuarioName]); // [DNI (B), Cliente (C), Patente (A), Vehiculo (M), Compañia (G), Usuario]
    }
  }

  console.log(filteredData);
  return filteredData;
}


/////////////////// INGRESAR PAGO /////////////////

function pagoNuevo_inv(infoDNI,
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
    infoSucursal) {


  var spreadsheetId = "1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA";
  var sheetName = "BD COBRANZAS";
  var sheetRegistro2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

       var numeroRecibo = sheetRegistro2.getRange("CARGADORES!T5").getValue() + 1;
      sheetRegistro2.getRange("CARGADORES!T5").setValue(numeroRecibo);
    SpreadsheetApp.flush();
      var recibo = numeroRecibo;

      var fecha = new Date();

      let usuarioFinal = "//" + infoUsuario + " / (EMISION)";
      var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, infoVence, fecha, infoCuota, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, , , infoSucursal, , usuarioFinal, infoMedio];

sheetRegistro2.appendRow(sourceVals);

return recibo;
}


function baja_pol(valor_elim) {
  const sheetId = '1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA'; // ID de la hoja de cálculo
  const sheetName = 'BD_POLIZAS'; // Nombre de la hoja
  const ss = SpreadsheetApp.openById(sheetId); // Abrir la hoja de cálculo por ID
  const sheet = ss.getSheetByName(sheetName); // Obtener la hoja específica

  const lastRow = sheet.getLastRow(); // Obtener la última fila con datos
  const rangeA = sheet.getRange(1, 1, lastRow, 1); // Rango de la columna A
  const valuesA = rangeA.getValues(); // Obtener todos los valores de la columna A
  const fechaActual = new Date(); // Obtener la fecha actual
  const formatoFecha = Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), "dd/MM/yy"); // Formatear la fecha

  // Recorrer de abajo hacia arriba
  for (let i = lastRow - 1; i >= 0; i--) {
    if (valuesA[i][0] === valor_elim) {
      sheet.getRange(i + 1, 11).setValue("ANULACION");

      let valorColumnaQ = sheet.getRange(i + 1, 17).getValue(); // Obtener el valor anterior de la columna Q
      
      // Actualizar la columna Q con la palabra 'ANULACION', la fecha actual y el contenido anterior
      sheet.getRange(i + 1, 17).setValue("ANULACION - " + formatoFecha + " - " + valorColumnaQ);

      Logger.log("Patente encontrada en la fila " + (i + 1) + ", se escribió 'ANULACION' en la columna K y se modificó la columna Q con la fecha y el contenido previo");
      return;
    }
  }
  Logger.log("Patente no encontrada");
}



function renov_pol(valor_renov) {
  const sheetId = '1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA';
  const sheetName = 'BD_POLIZAS';
  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(sheetName);
  
  const lastRow = sheet.getLastRow();
  const valuesA = sheet.getRange(1, 1, lastRow, 21).getValues();
  const fechaActual = new Date();
  console.log("fechaActual:" + fechaActual)

  for (let i = lastRow - 1; i >= 0; i--) {
    const valorColumnaA = valuesA[i][0];
    const fechaColumnaJ = valuesA[i][9];
    const fechaColumnaI = valuesA[i][8];
    const mesesU = valuesA[i][20];
    const mesesE = valuesA[i][4];
    const fechaColumnaT2 = valuesA[i][19];

    if (valorColumnaA === valor_renov && valuesA[i][10] !== "ANULACION") {

      // Validar que las fechas no estén vacías antes de dividir
      if (fechaColumnaJ) {

        if (fechaColumnaJ < fechaActual) {
          console.log(`Coincidencia en columna J para: ${valor_renov}`);
          
          const fechaJ = formatearFecha(fechaColumnaJ)
          const fechaJMod = sumarMeses(fechaJ, mesesU)

          let fechaVtoDesde = fechaJ;
          let fechaVtoHasta = fechaJMod;
          let fechaHoy = fechaJ;
          let fechaRefaDesde = fechaJ;

          const nuevaFechaT = sumarMeses(fechaJ, mesesE);

          let fechaRefaHasta = nuevaFechaT;

          let valorColumnaQ = sheet.getRange(i + 1, 17).getValue();

          let obsHistorico = "//RENOVACION - " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yy") + " - " + valorColumnaQ;

          let partesFecha = nuevaFechaT.split("/");
          let fechaColumnaT = new Date(`20${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`);
          console.log("formato fechaColumnaT: " + fechaColumnaT)
          if (fechaColumnaT) {
            while (fechaColumnaT < fechaActual) {

              let fechaJOld = new Date(fechaColumnaT);
              
              fechaColumnaT.setMonth(fechaColumnaT.getMonth() + mesesE);

          fechaRefaDesde = formatearFecha(fechaJOld);
          fechaRefaHasta = formatearFecha(fechaColumnaT);

            }
          }
       else {
          return; 
      }

      // sheet.getRange(i + 1, 11).setValue("ANULACION");
      var polVals = [valuesA[i][0], valuesA[i][1], valuesA[i][2], valuesA[i][3], valuesA[i][4], 0, valuesA[i][6], 0, fechaVtoDesde, fechaVtoHasta, "RENOVACION", valuesA[i][11], valuesA[i][12], valuesA[i][13], valuesA[i][14], valuesA[i][15], obsHistorico, fechaHoy, fechaRefaDesde, fechaRefaHasta,valuesA[i][20]]

        sheet.appendRow(polVals);
          return; 

} else if (fechaColumnaT2 < fechaActual) {
  console.log("REFACTURA!");


          let fechaRefaDesde = fechaColumnaI;


  // sheet.getRange(i + 1, 19).setValue(fechaColumnaI);

  let fechaColumnaT = new Date(fechaColumnaI); 

  fechaColumnaT.setMonth(fechaColumnaT.getMonth() + mesesE);

  // sheet.getRange(i + 1, 20).setValue(Utilities.formatDate(fechaColumnaT, Session.getScriptTimeZone(), "dd/MM/yyyy"));

          let fechaRefaHasta = Utilities.formatDate(fechaColumnaT, Session.getScriptTimeZone(), "dd/MM/yy");


  while (fechaColumnaT < fechaActual) {
    // Guardamos la fecha anterior (clonamos fechaColumnaT antes de modificarla)
    let fechaJOld = new Date(fechaColumnaT.getTime());

    fechaColumnaT.setMonth(fechaColumnaT.getMonth() + mesesE);

    fechaRefaDesde = Utilities.formatDate(fechaJOld, Session.getScriptTimeZone(), "dd/MM/yy");
    fechaRefaHasta = Utilities.formatDate(fechaColumnaT, Session.getScriptTimeZone(), "dd/MM/yy");
  }


          let valorColumnaQ = sheet.getRange(i + 1, 17).getValue();
          let obsHistorico = "//REFACTURACION - " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yy") + " - " + valorColumnaQ;

          const fechaI = formatearFecha(fechaColumnaI)
          const fechaJ = formatearFecha(fechaColumnaJ)
          const fechaAC = formatearFecha(fechaActual)

      var polVals = [valuesA[i][0], valuesA[i][1], valuesA[i][2], valuesA[i][3], valuesA[i][4], 0, valuesA[i][6], 0, fechaI, fechaJ, "REFACTURACION", valuesA[i][11], valuesA[i][12], valuesA[i][13], valuesA[i][14], valuesA[i][15], obsHistorico, fechaAC, fechaRefaDesde, fechaRefaHasta ,valuesA[i][20]]

        sheet.appendRow(polVals);
          return; 

}

      }

    }
  }
}







////////////////////////////////////////////////////////////////////
////////////////////////  SESION DE USUARIOS (A)////////////////////////
///////////////////////////////////////////////////////////////////// LISTADO

function verificarCredenciales(usuario, contrasena) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY/edit").getSheetByName("USERS");
  var dataValues = sheet.getDataRange().getDisplayValues();
  
  for (var i = 1; i < dataValues.length; i++) {
    if (dataValues[i][0] == usuario && dataValues[i][1] == contrasena) {

  // Verificar las credenciales del usuario y obtener el color
  var color = buscarColorAlmacenado(usuario);
  console.log(color)
  // Devolver el color al cliente
  return color;

    }
  }
  return alert("Error de Usuario o Contraseña!");
}

///////////////////////////////  CAMBIAR CLAVE DE USUARIO  ////////////////////////////////////////

function cambioClave(antiguaClave, nuevaClave, usuario_pass) {
  const USERS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY/edit").getSheetByName("USERS");
  const USUARIOS = USERS.getDataRange().getDisplayValues();

  console.log("Servidor: " + usuario_pass + antiguaClave + nuevaClave);
  var fecha = new Date();

  // Buscar si el DNI ya existe en la hoja de clientes
  let dniIndex = -1;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i][0] === usuario_pass) {
      dniIndex = i + 1;
      break;
    }
  }

  console.log("Servidor2: " + usuario_pass + antiguaClave + nuevaClave);
  // Si el DNI ya existe, actualizar los datos del cliente
  if (dniIndex !== -1) {
    USERS.getRange(dniIndex, 2).setValue(nuevaClave);
    USERS.getRange(dniIndex, 3).setValue(antiguaClave);
    USERS.getRange(dniIndex, 4).setValue(fecha);
  }
}

///////////////////////////// CAMBIAR COLOR DE FONDO ///////////////////////////


function changeBackgroundColor(color, usuario) {
  var spreadsheetId = '1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY';
  var sheetName = 'USERS';
  
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);
  var range = sheet.getRange("A:E");
  var values = range.getValues();
  
  var rowIndex = -1;
  var columnUsuario = 0;
  var columnColor = 5;

  // Buscar la fila correspondiente al nombre de usuario
  for (var i = 0; i < values.length; i++) {
    if (values[i][columnUsuario] == usuario) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex > 0) {
    // Actualizar el color de fondo en la columna E
    sheet.getRange(rowIndex, columnColor).setValue(color);
  }
}

////////////////// BUSCAR COLOR DE FONDO ALMACENADO ///////////////////////

function buscarColorAlmacenado(usuarioAlmacenado) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY/edit").getSheetByName("USERS");
  var dataValues = sheet.getDataRange().getDisplayValues();
  
  // Buscar el usuario en la hoja de cálculo y obtener el color almacenado
  for (var i = 1; i < dataValues.length; i++) {
    var row = dataValues[i];
    var usuarioSheet = row[0];
    var color = row[4];
    
    if (usuarioSheet === usuarioAlmacenado) {
      return color;
    }
  }
  
  // Si no se encuentra el usuario o el color, devolver un valor predeterminado o null
  return null;
}

////////////////////////////// FIN SESION DE USUARIOS ////////////////////////////////