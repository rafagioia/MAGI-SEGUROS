
/////////// ABRIMOS EL HTML ///////////////
function doGet(){
  var template = HtmlService.createTemplateFromFile('registro');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbzqmzfoDIAz5QxgOZqZceopXqFRG6kyH2gsH6biSBxATwLDsXcLC4-mtLYD1ogbvGvrQg/exec"
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////

function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}


//////////////////////////// INGRESO INVERTIDO ///////////////////////

function pagoNuevo_inv(infomultiRec, infoDNI, infoCliente, infoWpp, infoPatente, infoMarca, infoPoliza, infoCnia, infoCuota, infoVigencia, infoImporte, infoVence, infoColor, infoUsuario, infoNotasCob, infoMedio, infoVigTot) {

let f_deudor = '';

  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();

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
  }
  // Si el DNI no existe, agregar una nueva fila a la hoja de clientes
  else {
    console.log("AGREGA CLIENTE, DNI NO EXISTE")
    var ctesVals = [infoDNI, infoCliente, , , infoWpp, , , , new Date()];

        BD_CLIENTES.appendRow(ctesVals);

// INGRESO JSON

  const lastEntry = clienteData[clienteData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "DNI": infoDNI || '',
    "Cliente": infoCliente || '',
    "Domicilio": '',
    "Localidad": '',
    "Whatsapp": infoWpp || '',
    "Mail": '',
    "Notas": '',
    "Calificacion": '',
    "Actualización": formattedDate || ''
  };

  // Agregar la nueva entrada al array de datos
  clienteData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(clienteData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_clientes.setContent(newJsonData);

    
  }


  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");

  const VAL_POL = BD_POLIZAS.getDataRange().getDisplayValues();

  let patenteIndex = -1;
  for(let i = VAL_POL.length - 1; i >= 0; i--) {
    if (VAL_POL[i][0] === infoPatente) {
    console.log("Patente encontrada en índice: " + i);
    console.log("Datos de comparación:");
    console.log("Vencimiento en cobranza: " + infoVence);
    console.log("Vencimiento en emisión: " + VAL_POL[i][9]);
      patenteIndex = i + 1;
var dia_emi = VAL_POL[i][9].split('/')[0]; //vto_hasta_emi
var mes_emi = VAL_POL[i][9].split('/')[1]; //vto_hasta_emi
var anio_emi = VAL_POL[i][9].split('/')[2]; //vto_hasta_emi
var dia_desde_emi = VAL_POL[i][8].split('/')[0]; //vto_desde_emi
var mes_desde_emi = VAL_POL[i][8].split('/')[1]; //vto_desde_emi
var anio_desde_emi = VAL_POL[i][8].split('/')[2]; //vto_desde_emi
var dia_cob_str = parseInt(infoVence.split('/')[0]); //vto_desde_cob
var dia_cob = dia_cob_str.toString().padStart(2, '0');
var mes_cob = parseInt(infoVence.split('/')[1]); //vto_desde_cob
var anio_cob = infoVence.split('/')[2].slice(-2); //vto_desde_cob

if(mes_emi == mes_cob && anio_emi == anio_cob) {
  console.log("RENUEVA")
let anio_emi2 = "20" + anio_emi
let anio_emi3 = parseInt(anio_emi2) + 1
    let newVtoDesde = dia_emi + "/" + mes_emi + "/" + anio_emi
    let newVtoHasta = dia_emi + "/" + mes_emi + "/" + String(anio_emi3).slice(-2)
    // BD_POLIZAS.getRange(i+1,11).setValue("NO VIGENTE");
    let newCob = BD_POLIZAS.getRange(i+1,12).getValue();
    let newNotas = BD_POLIZAS.getRange(i+1,15).getValue();
    var dia1 = infoVence.split('/')[0];
var mes1 = parseInt(infoVence.split('/')[1]);
var anio1 = infoVence.split('/')[2];
if (anio1) {
  anio1 = anio1.slice(-2); //
} else {
  console.log("error: " + anio1)
}
var fecha2 = new Date(anio1, mes1 - 1, dia1);

//// REFA
var fechaPartesRefa = VAL_POL[i][9].split('/');
var diaFechaRefa = parseInt(fechaPartesRefa[0], 10);  // Día
var mesFechaRefa = parseInt(fechaPartesRefa[1], 10) - 1;  // Mes (los meses en JavaScript empiezan desde 0)
var anioFechaRefa = parseInt("20" + fechaPartesRefa[2], 10);  // Año
console.log("anioFechaRefa : " + anioFechaRefa)
// Crea un objeto Date con esos valores
var fechaRefaObj = new Date(anioFechaRefa, mesFechaRefa, diaFechaRefa);

console.log("fechaRefaObj : " + fechaRefaObj)
// Ajusta el mes sumando el valor de infoVigencia
fechaRefaObj.setMonth(fechaRefaObj.getMonth() + parseInt(infoVigencia));

console.log("fechaRefaObj + mes: " + fechaRefaObj)
// Obtiene el día, mes y año de la nueva fecha
var nuevoDiaRefa = String(fechaRefaObj.getDate()).padStart(2, '0');
var nuevoMesRefa = String(fechaRefaObj.getMonth() + 1).padStart(2, '0');  // Los meses son base 0 en JS
var nuevoAnioRefa = String(fechaRefaObj.getFullYear()).slice(-2);

console.log("nuevoAnioRefa: " + nuevoAnioRefa)

// Crea la nueva fecha en formato "DD/MM/YYYY"
let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;


var nuevaFechaVence = fecha2.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
//PATENTE	DNI	ASEGURADO	SUCURSAL	VIGENCIA	IMPORTE	COMPAÑÍA	POLIZA	DESDE	HASTA	TIPO DE OPERACION	COBERTURA	VEHICULO	FORMA DE PAGO	NOTAS	NOTIFICA	HISTORICO	ULTIMA ACT

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", infoVigencia, infoImporte, infoCnia, infoPoliza , newVtoDesde, newVtoHasta, "RENOVACION", newCob, infoMarca, "CUPONES", newNotas, , "RENOV. BD COB. (MARIANO ACOSTA)", nuevaFechaVence, newVtoDesde, newVtoHastaRefa]

BD_POLIZAS.appendRow(vehVals);

// INGRESO JSON

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": 'BD COBRANZAS' || '',
    "Refactura": infoVigencia || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": newVtoDesde || '',
    "Vig Hasta": newVtoHasta || '',
    "Operacion": 'RENOVACION',
    "Cobertura": newCob || '',
    "Forma Pago": 'CUPONES' || '',
    "Notas Veh": newNotas || '',
    "Notifica": '',
    "Actualización": formattedDate || '',
    "Refa Desde": newVtoDesde,
    "Refa Hasta": newVtoHastaRefa
  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);

     break; 
} else if((dia_cob.toString().padStart(2, '0') !== dia_desde_emi && infoCuota == 1) 
       || (anio_cob > anio_emi && infoCuota == 1)
       || (mes_cob >= mes_emi && anio_cob == anio_emi && infoCuota == 1)) {
console.log("ENDOSO POR DATOS MAL EN EMISION")
  console.log("dia cob: " + dia_cob + "// dia emi: " + dia_desde_emi)
    // let anio_cob2 = "20" + anio_cob
    // let anio_cob3 = parseInt(anio_cob2) + 1
    // let newVtoDesde = dia_cob.toString().padStart(2, '0') + "/" + mes_cob.toString().padStart(2, '0') + "/" + anio_cob
    // let newVtoHasta = dia_cob.toString().padStart(2, '0') + "/" + mes_cob.toString().padStart(2, '0') + "/" + String(anio_cob3).slice(-2)
    // BD_POLIZAS.getRange(i+1,11).setValue("NO VIGENTE");

  
    let newCob = BD_POLIZAS.getRange(i+1,12).getValue();
    let newNotas = BD_POLIZAS.getRange(i+1,15).getValue();
    var dia1 = infoVence.split('/')[0];
var mes1 = parseInt(infoVence.split('/')[1]);
var anio1 = infoVence.split('/')[2];
if (anio1) {
  anio1 = anio1.slice(-2); //
} else {
  console.log("error: " + anio1)
}
var fecha2 = new Date(anio1, mes1 - 1, dia1);


//// REFA DEL ENDOSO
var fechaPartesRefa = infoVence.split('/');
var diaFechaRefa = parseInt(fechaPartesRefa[0], 10);  // Día
var mesFechaRefa = parseInt(fechaPartesRefa[1], 10) - 1;  // Mes (los meses en JavaScript empiezan desde 0)
var anioFechaRefa = parseInt("20" + fechaPartesRefa[2], 10);  // Año
console.log("anioFechaRefa : " + anioFechaRefa)
// Crea un objeto Date con esos valores
var fechaRefaObj = new Date(anioFechaRefa, mesFechaRefa, diaFechaRefa);

console.log("fechaRefaObj : " + fechaRefaObj)
// Ajusta el mes sumando el valor de infoVigencia
fechaRefaObj.setMonth(fechaRefaObj.getMonth() + parseInt(infoVigencia));

console.log("fechaRefaObj + mes: " + fechaRefaObj)
// Obtiene el día, mes y año de la nueva fecha
var nuevoDiaRefa = String(fechaRefaObj.getDate()).padStart(2, '0');
var nuevoMesRefa = String(fechaRefaObj.getMonth() + 1).padStart(2, '0');  // Los meses son base 0 en JS
var nuevoAnioRefa = String(fechaRefaObj.getFullYear()).slice(-2);

console.log("nuevoAnioRefa: " + nuevoAnioRefa)

// Crea la nueva fecha en formato "DD/MM/YYYY"
let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;

var nuevaFechaVenceHasta = new Date(fecha2);  // Crear una copia para modificar después

// Calcular nueva fecha de vencimiento (vto hasta vence)
nuevaFechaVenceHasta.setMonth(nuevaFechaVenceHasta.getMonth() + parseInt(infoVigTot));  // Sumar los meses

// Obtener día, mes y año formateado para la fecha de vencimiento
var nuevoDiaVence = String(nuevaFechaVenceHasta.getDate()).padStart(2, '0');
var nuevoMesVence = String(nuevaFechaVenceHasta.getMonth() + 1).padStart(2, '0');  // Los meses en JS son base 0
var nuevoAnioVence = String(nuevaFechaVenceHasta.getFullYear()).slice(-2);

let newVtoHastaVence = nuevoDiaVence + "/" + nuevoMesVence + "/" + nuevoAnioVence;


var nuevaFechaVence = fecha2.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
//PATENTE	DNI	ASEGURADO	SUCURSAL	VIGENCIA	IMPORTE	COMPAÑÍA	POLIZA	DESDE	HASTA	TIPO DE OPERACION	COBERTURA	VEHICULO	FORMA DE PAGO	NOTAS	NOTIFICA	HISTORICO	ULTIMA ACT

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", infoVigencia, infoImporte, infoCnia, infoPoliza , infoVence, newVtoHastaVence, "ENDOSO", newCob, infoMarca, "CUPONES", newNotas, , "ENDOSO X DATOS MAL BD COB. (MARIANO ACOSTA)", nuevaFechaVence, infoVence, newVtoHastaRefa, infoVigTot]

BD_POLIZAS.appendRow(vehVals);

// INGRESO JSON

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": 'BD COBRANZAS' || '',
    "Refactura": infoVigencia || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": infoVence || '',
    "Vig Hasta": newVtoHastaVence || '',
    "Operacion": 'RENOVACION',
    "Cobertura": newCob || '',
    "Forma Pago": 'CUPONES' || '',
    "Notas Veh": newNotas || '',
    "Notifica": '',
    "Actualización": formattedDate || '',
    "Refa Desde": infoVence,
    "Refa Hasta": newVtoHastaRefa
  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);

     break; 
     } else if((dia_cob.toString().padStart(2, '0') == dia_desde_emi && infoCuota == 1 && mes_cob > mes_desde_emi && anio_cob == anio_desde_emi) ||
              (dia_cob.toString().padStart(2, '0') == dia_desde_emi && infoCuota == 1 && mes_cob < mes_desde_emi && anio_cob > anio_desde_emi)) {
  console.log("REFACTURACION")
  console.log("dia cob: " + dia_cob + "// dia emi: " + dia_desde_emi)

    // BD_POLIZAS.getRange(i+1,11).setValue("NO VIGENTE");
    let newCob = BD_POLIZAS.getRange(i+1,12).getValue();
    let newNotas = BD_POLIZAS.getRange(i+1,15).getValue();

//// REFA
var newVtoDesdeRefa =  String(dia_cob).padStart(2, '0') + "/" + String(mes_cob).padStart(2, '0') + "/" + anio_cob;
var diaFechaRefa = parseInt(dia_cob, 10);  // Día
var mesFechaRefa = parseInt(mes_cob, 10) - 1;  // Mes (los meses en JavaScript empiezan desde 0)
var anioFechaRefa = parseInt("20" + anio_cob, 10);  // Año
console.log("anioFechaRefa : " + anioFechaRefa)
// Crea un objeto Date con esos valores
var fechaRefaObj = new Date(anioFechaRefa, mesFechaRefa, diaFechaRefa);

console.log("fechaRefaObj : " + fechaRefaObj)
// Ajusta el mes sumando el valor de infoVigencia
fechaRefaObj.setMonth(fechaRefaObj.getMonth() + parseInt(infoVigencia));

console.log("fechaRefaObj + mes: " + fechaRefaObj)
// Obtiene el día, mes y año de la nueva fecha
var nuevoDiaRefa = String(fechaRefaObj.getDate()).padStart(2, '0');
var nuevoMesRefa = String(fechaRefaObj.getMonth() + 1).padStart(2, '0');  // Los meses son base 0 en JS
var nuevoAnioRefa = String(fechaRefaObj.getFullYear()).slice(-2);

console.log("nuevoAnioRefa: " + nuevoAnioRefa)

// Crea la nueva fecha en formato "DD/MM/YYYY"
let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;

//PATENTE	DNI	ASEGURADO	SUCURSAL	VIGENCIA	IMPORTE	COMPAÑÍA	POLIZA	DESDE	HASTA	TIPO DE OPERACION	COBERTURA	VEHICULO	FORMA DE PAGO	NOTAS	NOTIFICA	HISTORICO	ULTIMA ACT

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", infoVigencia, infoImporte, infoCnia, infoPoliza , VAL_POL[i][8], VAL_POL[i][9], "REFACTURACION", newCob, infoMarca, "CUPONES", newNotas, , "REFACTURA BD COB. (MARIANO ACOSTA)", newVtoDesdeRefa, newVtoDesdeRefa, newVtoHastaRefa, infoVigTot]

BD_POLIZAS.appendRow(vehVals);

// INGRESO JSON

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": 'BD COBRANZAS' || '',
    "Refactura": infoVigencia || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": VAL_POL[i][8] || '',
    "Vig Hasta": VAL_POL[i][9] || '',
    "Operacion": 'RENOVACION',
    "Cobertura": newCob || '',
    "Forma Pago": 'CUPONES' || '',
    "Notas Veh": newNotas || '',
    "Notifica": '',
    "Actualización": formattedDate || '',
    "Refa Desde": newVtoDesdeRefa,
    "Refa Hasta": newVtoHastaRefa
  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);

     break; 
     } else if(anio_cob > anio_emi) {
  console.log("UPDATE DATOS MAL EN EMISION (AÑO MAYOR EN COBRANZAS)")

  let infoMes = Number(infoCuota) - 1

// Obtener la fecha a partir de dia_cob, mes_cob y anio_cob
var fechaCobro = new Date(anio_cob, mes_cob - 1, dia_cob);

// Restar el número de cuotas a la fecha de cobro
fechaCobro.setMonth(fechaCobro.getMonth() - infoMes);

var nuevoDia = fechaCobro.getDate();
var nuevoMes = fechaCobro.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11 en JavaScript
var nuevoAnio = fechaCobro.getFullYear();
///////////////////////////////
    let newVtoDesde = nuevoDia + "/" + nuevoMes + "/" + String(nuevoAnio).slice(-2)
    let newVtoHasta = nuevoDia + "/" + nuevoMes + "/" +  String(Number(nuevoAnio) + 1).slice(-2)
    // BD_POLIZAS.getRange(i+1,11).setValue("NO VIGENTE");
    let newCob = BD_POLIZAS.getRange(i+1,12).getValue();
    let newNotas = BD_POLIZAS.getRange(i+1,15).getValue();
    var dia1 = infoVence.split('/')[0];
var mes1 = parseInt(infoVence.split('/')[1]);
var anio1 = infoVence.split('/')[2];
if (anio1) {
  anio1 = anio1.slice(-2); //
} else {
  console.log("error: " + anio1)
}
var fecha2 = new Date(anio1, mes1 - 1, dia1);

var nuevaFechaVence = fecha2.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
//PATENTE	DNI	ASEGURADO	SUCURSAL	VIGENCIA	IMPORTE	COMPAÑÍA	POLIZA	DESDE	HASTA	TIPO DE OPERACION	COBERTURA	VEHICULO	FORMA DE PAGO	NOTAS	NOTIFICA	HISTORICO	ULTIMA ACT


//// REFA
var nuevaFechaVenceHasta = new Date(fecha2);  // Crear una copia para modificar después

// Calcular nueva fecha de vencimiento (vto hasta vence)
nuevaFechaVenceHasta.setMonth(nuevaFechaVenceHasta.getMonth() + parseInt(infoVigTot));  // Sumar los meses

// Obtener día, mes y año formateado para la fecha de vencimiento
var nuevoDiaVence = String(nuevaFechaVenceHasta.getDate()).padStart(2, '0');
var nuevoMesVence = String(nuevaFechaVenceHasta.getMonth() + 1).padStart(2, '0');  // Los meses en JS son base 0
var nuevoAnioVence = String(nuevaFechaVenceHasta.getFullYear()).slice(-2);

let newVtoHastaVence = nuevoDiaVence + "/" + nuevoMesVence + "/" + nuevoAnioVence;

var nuevaFechaRefaHasta = new Date(fecha2);  // Crear una copia para la fecha de referencia
// Calcular nueva fecha refa (vto hasta refa)
nuevaFechaRefaHasta.setMonth(nuevaFechaRefaHasta.getMonth() + parseInt(infoVigencia));  // Sumar los meses

// Obtener día, mes y año formateado para la fecha refa
var nuevoDiaRefa = String(nuevaFechaRefaHasta.getDate()).padStart(2, '0');
var nuevoMesRefa = String(nuevaFechaRefaHasta.getMonth() + 1).padStart(2, '0');  // Los meses en JS son base 0
var nuevoAnioRefa = String(nuevaFechaRefaHasta.getFullYear()).slice(-2);

let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", infoVigencia, infoImporte, infoCnia, infoPoliza , newVtoDesde, newVtoHastaVence, "RENOVACION", newCob, infoMarca, "CUPONES", newNotas, , "RENOV. BD COB. (MARIANO ACOSTA)", nuevaFechaVence, nuevaFechaVence, newVtoHastaRefa, infoVigTot]

BD_POLIZAS.appendRow(vehVals);

// INGRESO JSON

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": 'BD COBRANZAS' || '',
    "Refactura": infoVigencia || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": newVtoDesde || '',
    "Vig Hasta": newVtoHasta || '',
    "Operacion": 'RENOVACION',
    "Cobertura": newCob || '',
    "Forma Pago": 'CUPONES' || '',
    "Notas Veh": newNotas || '',
    "Notifica": '',
    "Actualización": formattedDate || ''
  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);


     break; 
} else  {
  console.log("PAGO DE CUOTA NORMAL, NO HUBO ACTUALIZACION")
}

     break; 
    }
  }

  // Si la Patente ya existe, actualizar los datos del Vehiculo
  if (patenteIndex !== -1) {
    
  }
  // Si la Patente no existe, agregar una nueva fila a la hoja de polizas
   else {
    console.log("AGREGA VEH PAT. NO EXISTE")

    var dia1 = infoVence.split('/')[0];
var mes1 = parseInt(infoVence.split('/')[1]);
var anio1 = infoVence.split('/')[2];
if (anio1) {
  anio1 = anio1.slice(-2); //
} else {
  console.log("error: " + anio1)
}
var fecha2 = new Date(anio1, mes1 - 1, dia1);

// Obtener el número de cuotas
var numCuota = parseInt(infoCuota);

// Restar un mes hasta que el número de cuotas llegue a 1
while (numCuota > 1) {
  fecha2.setMonth(fecha2.getMonth() - 1);
  numCuota--;
}

// Obtener la nueva fecha de vencimiento
var nuevaFechaVence = fecha2.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
var nuevaFechaVenceHasta = new Date(fecha2);  // Crear una copia para modificar después
var nuevaFechaRefaHasta = new Date(fecha2);  // Crear una copia para la fecha de referencia

// Calcular nueva fecha de vencimiento (vto hasta vence)
nuevaFechaVenceHasta.setMonth(nuevaFechaVenceHasta.getMonth() + parseInt(infoVigTot));  // Sumar los meses

// Obtener día, mes y año formateado para la fecha de vencimiento
var nuevoDiaVence = String(nuevaFechaVenceHasta.getDate()).padStart(2, '0');
var nuevoMesVence = String(nuevaFechaVenceHasta.getMonth() + 1).padStart(2, '0');  // Los meses en JS son base 0
var nuevoAnioVence = String(nuevaFechaVenceHasta.getFullYear()).slice(-2);

let newVtoHastaVence = nuevoDiaVence + "/" + nuevoMesVence + "/" + nuevoAnioVence;

// Calcular nueva fecha refa (vto hasta refa)
nuevaFechaRefaHasta.setMonth(nuevaFechaRefaHasta.getMonth() + parseInt(infoVigencia));  // Sumar los meses

// Obtener día, mes y año formateado para la fecha refa
var nuevoDiaRefa = String(nuevaFechaRefaHasta.getDate()).padStart(2, '0');
var nuevoMesRefa = String(nuevaFechaRefaHasta.getMonth() + 1).padStart(2, '0');  // Los meses en JS son base 0
var nuevoAnioRefa = String(nuevaFechaRefaHasta.getFullYear()).slice(-2);

let newVtoHastaRefa = nuevoDiaRefa + "/" + nuevoMesRefa + "/" + nuevoAnioRefa;

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", , infoImporte, infoCnia, infoPoliza , nuevaFechaVence, newVtoHastaVence, "SEGURO NUEVO", , infoMarca, "CUPONES", , , "CARGA AUTOMATICA DE POLIZA NO CARGADA (BD COBRANZAS - MARIANO ACOSTA)", nuevaFechaVence, nuevaFechaVence, newVtoHastaRefa, infoVigTot]

BD_POLIZAS.appendRow(vehVals);

// INGRESO JSON

  const lastEntry = polizasData[polizasData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Sucursal": 'BD COBRANZAS' || '',
    "Refactura": infoVigencia || '',
    "Importe": infoImporte || '',
    "Compañia": infoCnia || '',
    "Poliza": infoPoliza || '',
    "Vig Desde": nuevaFechaVence || '',
    "Vig Hasta": '',
    "Operacion": 'SEGURO NUEVO',
    "Cobertura": '',
    "Forma Pago": 'CUPONES' || '',
    "Notas Veh": '',
    "Notifica": '',
    "Actualización": formattedDate || ''
  };

  // Agregar la nueva entrada al array de datos
  polizasData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(polizasData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_polizas.setContent(newJsonData);

  }

  var spreadsheetId = "1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA";
  var sheetName = "BD COBRANZAS";
  var sheetRegistro2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var fecha = new Date();
  var sucursal = "MARIANO ACOSTA";
  var notas1 = "//" + infoUsuario + " / (" + infoNotasCob + ")";

  if (infomultiRec > 1 && infomultiRec < 7) {
    for (var i = 0; i < infomultiRec; i++) {
      var cuotaNum = parseInt(infoCuota) + i;
      if (cuotaNum > parseInt(infoVigencia)) {
        break;
      }

      var numeroRecibo = sheetRegistro2.getRange("CARGADORES!T5").getValue() + 1;
      sheetRegistro2.getRange("CARGADORES!T5").setValue(numeroRecibo);
    SpreadsheetApp.flush();
      var recibo = numeroRecibo;

      var fechaString = infoVence;
      var partesFecha = fechaString.split('/');
      var dia = partesFecha[0];
      var mes = parseInt(partesFecha[1]);
      var anio = partesFecha[2].slice(-2);
      var fecha1 = new Date(anio, mes - 1, dia);
      fecha1.setMonth(fecha1.getMonth() + i);
      var vtoNuevo = fecha1.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
        var opcionesFecha = { day: '2-digit', month: '2-digit', year: '2-digit' };
        var opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };

        // Formatear la fecha
        var newfecha = fecha.toLocaleDateString('es-ES', opcionesFecha);

        // Formatear la hora
        var newhora = fecha.toLocaleTimeString('es-ES', opcionesHora);

        // Unir fecha y hora en el formato deseado
        var fechaCompleta = newfecha + ' ' + newhora;


      var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, vtoNuevo, fecha, cuotaNum, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, ,infoColor, sucursal, f_deudor, notas1, infoMedio];

  sheetRegistro2.appendRow(sourceVals);

  const lastEntry = cobData[cobData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "N° Recibo": recibo || '',
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Whatsapp": infoWpp || '',
    "Vencimiento": infoVence || '',
    "Fecha Pago": formattedDate || '',
    "Cuota": cuotaNum || '',
    "Vigencia": infoVigencia || '',
    "Poliza": infoPoliza || '',
    "Compañia": infoCnia || '',
    "Importe": infoImporte || '',
    "Sucursal": sucursal || '',
    "Notas": notas1 || '',
    "Forma de Pago": infoMedio || '',
    "Pasado": '',
    "Liquidado": '',
    "Aviso Pago": '',
    "Updated": ''
  };

  // Agregar la nueva entrada al array de datos
  cobData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(cobData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_cob.setContent(newJsonData);


    }

    return recibo;
  } else {
    var numeroRecibo = sheetRegistro2.getRange("CARGADORES!T5").getValue() + 1;
    sheetRegistro2.getRange("CARGADORES!T5").setValue(numeroRecibo);
    var recibo = numeroRecibo;

    var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, infoVence, fecha, infoCuota, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, , , sucursal, f_deudor, notas1, infoMedio];

  sheetRegistro2.appendRow(sourceVals);


  const lastEntry = cobData[cobData.length - 1];
  const newId = lastEntry ? (parseInt(lastEntry.id, 10) + 1) : 1;
  const now = new Date();
  const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yy HH:mm:ss');
  
  // Crear el nuevo objeto con los datos del formulario
  const newEntry = {
    "id": newId,
    "N° Recibo": recibo || '',
    "Patente": infoPatente || '',
    "DNI": infoDNI || '',
    "Whatsapp": infoWpp || '',
    "Vencimiento": infoVence || '',
    "Fecha Pago": formattedDate || '',
    "Cuota": cuotaNum || '',
    "Vigencia": infoVigencia || '',
    "Poliza": infoPoliza || '',
    "Compañia": infoCnia || '',
    "Importe": infoImporte || '',
    "Sucursal": sucursal || '',
    "Notas": notas1 || '',
    "Forma de Pago": infoMedio || '',
    "Pasado": '',
    "Liquidado": '',
    "Aviso Pago": '',
    "Updated": ''
  };

  // Agregar la nueva entrada al array de datos
  cobData.push(newEntry);

  // Convertir el array de vuelta a JSON
  const newJsonData = JSON.stringify(cobData, null, 2);

  // Guardar el contenido actualizado en el archivo JSON
  file_cob.setContent(newJsonData);

    return recibo;
  }
}


/////////////////////////// VER LA ULTIMA ACTUALIZACION PARA DECIDIR DATOS PATENTE INVERTIDO /////////////////////////////////////////
function getUltimaActu_inv(patente_value) {
  let actualizaciones = [];
  let actualizacion_cob = [];
  let actualizacion_emi = [];
  let actualizacion_pol = [];
  let dni_value = "";
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const mantenimientos3 = BD_POLIZAS.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  let encontrado1 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado2 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado3 = false; // Variable para rastrear si se encontró una coincidencia

  // Recorremos desde abajo hacia arriba
  for (let i = mantenimientos3.length - 1; i >= 0; i--) {
    if (patente_value === mantenimientos3[i][0]) {
      actualizacion_emi.push(mantenimientos3[i][0]); //  PATENTE
      actualizacion_emi.push(mantenimientos3[i][1]); // DNI
      dni_value = mantenimientos3[i][1]; // DNI
      actualizacion_emi.push(mantenimientos3[i][2]); // CLIENTE
      actualizacion_emi.push(mantenimientos3[i][3]); // SUCURSAL
      actualizacion_emi.push(mantenimientos3[i][4]); // VIGENCIA
      actualizacion_emi.push(mantenimientos3[i][5]); // IMPORTE
      actualizacion_emi.push(mantenimientos3[i][6]); // COMPAÑIA
      actualizacion_emi.push(mantenimientos3[i][7]); // POLIZA
      actualizacion_emi.push(mantenimientos3[i][8]); // DESDE
      actualizacion_emi.push(mantenimientos3[i][9]); // HASTA
      actualizacion_emi.push(mantenimientos3[i][10]); // OPERACION
      actualizacion_emi.push(mantenimientos3[i][11]); // COBERTURA
      actualizacion_emi.push(mantenimientos3[i][12]); // MARCA
      actualizacion_emi.push(mantenimientos3[i][13]); // F. PAGO
      actualizacion_emi.push(mantenimientos3[i][14]); // NOTAS VEH
      let dni_encontrado = false;

      for (let j = 0; j < mantenimientos8.length; j++) {
        if (mantenimientos8[j][0] === mantenimientos3[i][1]) {
          actualizacion_emi.push(mantenimientos8[j][4]); // WHATSAPP
          actualizacion_emi.push(mantenimientos8[j][7]); // NOTAS CLIENTE
          dni_encontrado = true; // Se encontró una coincidencia
          break;
        }
      }

      if (!dni_encontrado) {
        actualizacion_emi.push("");
        actualizacion_emi.push("");
      }
      actualizacion_emi.push(mantenimientos3[i][17]); // MOTOR
      actualizacion_emi.push(mantenimientos3[i][18]); // CHASIS
      actualizacion_emi.push(mantenimientos3[i][19]); // HISTORICO
      actualizacion_emi.push(mantenimientos3[i][20]); // ULTIMA ACTU
      actualizacion_emi.push(mantenimientos3[i][21]); // VIGTOT
      encontrado1 = true; // Se encontró una coincidencia
      break;
    }
  }

  if (!encontrado1) {
    actualizacion_emi.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "listado"
  }

  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  encontrado2 = false; // Restablecer la variable encontrado

  // Recorremos desde abajo hacia arriba
  for (let i = mantenimientos.length - 1; i >= 0; i--) {
    if (mantenimientos[i][1] === patente_value) {
      actualizacion_cob.push(mantenimientos[i]);
      encontrado2 = true;
    }
  }

  if (!encontrado2) {
    actualizacion_cob.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "BD COBRANZAS"
  }

  mantenimientos3.forEach(mantenimiento2 => {
    if (mantenimiento2[1] === dni_value && mantenimiento2[10] !== "ANULACION") {
      let actualizacion_pol2 = []; // Crear un nuevo arreglo para cada vehículo

      actualizacion_pol2.push(mantenimiento2[0]); // PATENTE
      actualizacion_pol2.push(mantenimiento2[12]); // MARCA
      actualizacion_pol2.push(mantenimiento2[6]); // COMPAÑIA

      for (let i = 0; i < mantenimientos.length; i++) {
        if (mantenimiento2[0] === mantenimientos[i][1]) {
          actualizacion_pol2.push(mantenimientos[i][5]); // IMPORTE
          break;
        }
      }

      encontrado3 = true; // Se encontró una coincidencia
      actualizacion_pol.push(actualizacion_pol2);
    }
  });

  actualizaciones.push(actualizacion_emi);
  actualizaciones.push(actualizacion_cob);
  actualizaciones.push(actualizacion_pol);
  return actualizaciones;
}

/////////////////////////////// FIN DE VER ULTIMA ACT PARA DATOS PATENTE ////////////////////////////



/////////////////////////// VER LA ULTIMA ACTUALIZACION PARA DECIDIR DATOS DNI /////////////////////////////////////////
// function getUltimaActuDNI(dni_value1) {
//   let actualizaciones = [];
//   let actualizacion_cob = [];
//   let actualizacion_emi = [];
//   let actualizacion_pol = [];
//   let dni_value = "";
//   const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
//   const mantenimientos3 = BD_POLIZAS.getDataRange().getDisplayValues();
//   const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
//   const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

//   let encontrado1 = false; // Variable para rastrear si se encontró una coincidencia
//   let encontrado2 = false; // Variable para rastrear si se encontró una coincidencia
//   let encontrado3 = false; // Variable para rastrear si se encontró una coincidencia

//   for (let i = 0; i < mantenimientos3.length; i++) {
//     if (dni_value1 === mantenimientos3[i][1]) {
//       actualizacion_emi.push(mantenimientos3[i][0]);
//       actualizacion_emi.push(mantenimientos3[i][1]);
//       // dni_value = mantenimientos3[i][1];
//       actualizacion_emi.push(mantenimientos3[i][2]);
//       actualizacion_emi.push(mantenimientos3[i][3]);
//       actualizacion_emi.push(mantenimientos3[i][4]);
//       actualizacion_emi.push(mantenimientos3[i][5]);
//       actualizacion_emi.push(mantenimientos3[i][6]);
//       actualizacion_emi.push(mantenimientos3[i][7]);
//       actualizacion_emi.push(mantenimientos3[i][8]);
//       actualizacion_emi.push(mantenimientos3[i][9]);
//       actualizacion_emi.push(mantenimientos3[i][10]);
//       actualizacion_emi.push(mantenimientos3[i][11]);
//       actualizacion_emi.push(mantenimientos3[i][12]);
//       actualizacion_emi.push(mantenimientos3[i][13]);
//       actualizacion_emi.push(mantenimientos3[i][14]);
//             let dni_encontrado = false; 

// for (let j = 0; j < mantenimientos8.length; j++) {
//   if (mantenimientos8[j][0] === dni_value1) {
//     actualizacion_emi.push(mantenimientos8[j][4]);
//     dni_encontrado = true; // Se encontró una coincidencia
//     break;
//   }
// }

// if (!dni_encontrado) {
//   actualizacion_emi.push("");
// }

//       actualizacion_emi.push(mantenimientos3[i][16]);
//       actualizacion_emi.push(mantenimientos3[i][17]);
//       actualizacion_emi.push(mantenimientos3[i][18]);
//       actualizacion_emi.push(mantenimientos3[i][19]);
//       actualizacion_emi.push(mantenimientos3[i][20]);
//       encontrado1 = true; // Se encontró una coincidencia
//       break;
//     }
//   }

//   if (!encontrado1) {
//     actualizacion_emi.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "listado"
//   }




//   const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")
//   const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
//   encontrado2 = false; // Restablecer la variable encontrado

//   mantenimientos.forEach(mantenimiento =>{
//     if(mantenimiento[2] === dni_value1) {
//       actualizacion_cob.push(mantenimiento);
//       encontrado2 = true;
//     }
//   })

//   if (!encontrado2) {
//     actualizacion_cob.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "BD COBRANZAS"
//   }

// mantenimientos3.forEach(mantenimiento2 => {
//   if (mantenimiento2[1] === dni_value1 && mantenimiento2[10] !== "ANULACION") {
//     let actualizacion_pol2 = []; // Crear un nuevo arreglo para cada vehículo

//     actualizacion_pol2.push(mantenimiento2[0]);
//     actualizacion_pol2.push(mantenimiento2[12]);
//     actualizacion_pol2.push(mantenimiento2[6]);

//     for (let i = 0; i < mantenimientos.length; i++) {
//       if (mantenimiento2[0] === mantenimientos[i][1]) {
//         actualizacion_pol2.push(mantenimientos[i][5]);
//         break;
//       }
//     }

//     encontrado3 = true; // Se encontró una coincidencia
//     actualizacion_pol.push(actualizacion_pol2);
//   }
// });

//       actualizaciones.push(actualizacion_emi);
//       actualizaciones.push(actualizacion_cob);
//       actualizaciones.push(actualizacion_pol);
//   return actualizaciones;
// }

/////////////////// DNI INVERTIDO ////////////////////



/////////////////////////// VER LA ULTIMA ACTUALIZACION PARA DECIDIR DATOS DNI INVERTIDO /////////////////////////////////////////
function getUltimaActuDNI_inv(dni_value1) {
  let actualizaciones = [];
  let actualizacion_cob = [];
  let actualizacion_emi = [];
  let actualizacion_pol = [];
  let dni_value = "";
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const mantenimientos3 = BD_POLIZAS.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  let encontrado1 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado2 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado3 = false; // Variable para rastrear si se encontró una coincidencia

  // Recorremos desde abajo hacia arriba
  for (let i = mantenimientos3.length - 1; i >= 0; i--) {
    if (dni_value1 === mantenimientos3[i][1]) {
      actualizacion_emi.push(mantenimientos3[i][0]);
      actualizacion_emi.push(mantenimientos3[i][1]);
      // dni_value = mantenimientos3[i][1];
      actualizacion_emi.push(mantenimientos3[i][2]);
      actualizacion_emi.push(mantenimientos3[i][3]);
      actualizacion_emi.push(mantenimientos3[i][4]);
      actualizacion_emi.push(mantenimientos3[i][5]);
      actualizacion_emi.push(mantenimientos3[i][6]);
      actualizacion_emi.push(mantenimientos3[i][7]);
      actualizacion_emi.push(mantenimientos3[i][8]);
      actualizacion_emi.push(mantenimientos3[i][9]);
      actualizacion_emi.push(mantenimientos3[i][10]);
      actualizacion_emi.push(mantenimientos3[i][11]);
      actualizacion_emi.push(mantenimientos3[i][12]);
      actualizacion_emi.push(mantenimientos3[i][13]);
      actualizacion_emi.push(mantenimientos3[i][14]);
            let dni_encontrado = false; 

for (let j = 0; j < mantenimientos8.length; j++) {
  if (mantenimientos8[j][0] === dni_value1) {
    actualizacion_emi.push(mantenimientos8[j][4]);
    dni_encontrado = true; // Se encontró una coincidencia
    break;
  }
}

if (!dni_encontrado) {
  actualizacion_emi.push("");
}

      actualizacion_emi.push(mantenimientos3[i][16]);
      actualizacion_emi.push(mantenimientos3[i][17]);
      actualizacion_emi.push(mantenimientos3[i][18]);
      actualizacion_emi.push(mantenimientos3[i][19]);
      actualizacion_emi.push(mantenimientos3[i][20]);
      encontrado1 = true; // Se encontró una coincidencia
      break;
    }
  }

  if (!encontrado1) {
    actualizacion_emi.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "listado"
  }

  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  encontrado2 = false; // Restablecer la variable encontrado

  // Recorremos desde abajo hacia arriba
  for (let i = mantenimientos.length - 1; i >= 0; i--) {
    if (mantenimientos[i][2] === dni_value1) {
      actualizacion_cob.push(mantenimientos[i]);
      encontrado2 = true;
    }
  }

  if (!encontrado2) {
    actualizacion_cob.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "BD COBRANZAS"
  }

  mantenimientos3.forEach(mantenimiento2 => {
    if (mantenimiento2[1] === dni_value1 && mantenimiento2[10] !== "ANULACION") {
      let actualizacion_pol2 = []; // Crear un nuevo arreglo para cada vehículo

      actualizacion_pol2.push(mantenimiento2[0]);
      actualizacion_pol2.push(mantenimiento2[12]);
      actualizacion_pol2.push(mantenimiento2[6]);

      for (let i = 0; i < mantenimientos.length; i++) {
        if (mantenimiento2[0] === mantenimientos[i][1]) {
          actualizacion_pol2.push(mantenimientos[i][5]);
          break;
        }
      }

      encontrado3 = true; // Se encontró una coincidencia
      actualizacion_pol.push(actualizacion_pol2);
    }
  });

  actualizaciones.push(actualizacion_emi);
  actualizaciones.push(actualizacion_cob);
  actualizaciones.push(actualizacion_pol);
  return actualizaciones;
}

/////////////////////////////// FIN DE VER ULTIMA ACT PARA DATOS DNI ////////////////////////////





////////////// INGESAMOS NO MOVE A LA BD CHEQUES //////////////////

function agregarNomove(medio, concepto, para, importe,usuario_p) {
const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit")
 var sheetRegistro2 = BD_COBRANZAS.getSheetByName("SIN_MOVIMIENTO");
var fecha = new Date();
let concepto1 = concepto + " - //" + usuario_p;
  var numeroRecibo = BD_COBRANZAS.getRange("CARGADORES!T9").getValue() + 1;
  BD_COBRANZAS.getRange("CARGADORES!T9").setValue(numeroRecibo);
var sucursal = "MARIANO ACOSTA";

var sourceVals = [numeroRecibo, concepto1, medio, sucursal, importe, para, fecha];
sheetRegistro2.insertRowBefore(3).getRange(3, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("No Move agregado: " + concepto1 + " " + medio + " " + para + " " + importe);

}

////////////// INGESAMOS CHEQUE A LA BD CHEQUES //////////////////

function agregarCheque(numeroCheque, vencimiento, de, importe,usuario_p) {
const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit")
 var sheetRegistro2 = BD_COBRANZAS.getSheetByName("CHEQUES");
var fecha = new Date();
let concepto1 = de + " - //" + usuario_p;

var sourceVals = [fecha, numeroCheque, concepto1, importe, vencimiento];
sheetRegistro2.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("Cheque agregado: " + numeroCheque + " " + vencimiento + " " + concepto1 + " " + importe);
}

////////////// INGESAMOS GASTO A LA BD GASTOS //////////////////
function agregarGasto(gastoConcepto, gastoPara, gastoImporte,usuario_p, gastoMedio) {
const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit")
 var sheetRegistro2 = BD_COBRANZAS.getSheetByName("GASTOS");

  var numeroRecibo = BD_COBRANZAS.getRange("CARGADORES!T7").getValue() + 1;
  BD_COBRANZAS.getRange("CARGADORES!T7").setValue(numeroRecibo);
    SpreadsheetApp.flush();
  var magi = '';
var sucursal = "MARIANO ACOSTA";
var fecha = new Date();
let concepto1 = gastoConcepto + " - //" + usuario_p;
var sourceVals = [, numeroRecibo, concepto1, sucursal, gastoImporte, magi, gastoPara, fecha, gastoMedio];
sheetRegistro2.insertRowBefore(3).getRange(3, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("Gasto agregado: " + concepto1 + " " + gastoPara + " " + gastoImporte);
  return numeroRecibo
}

////////////// INGESAMOS RECIBI A LA BD RECIBIS //////////////////
function agregarRecibi(recibiConcepto, recibiPara, recibiImporte,usuario_p, recibiMedio) {
const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit")
 var sheetRegistro2 = BD_COBRANZAS.getSheetByName("RECIBIS");

  var numeroRecibo = BD_COBRANZAS.getRange("CARGADORES!T8").getValue() + 1;
  BD_COBRANZAS.getRange("CARGADORES!T8").setValue(numeroRecibo);
    SpreadsheetApp.flush();
  var magi = '';
var sucursal = "MARIANO ACOSTA";
var fecha = new Date();
let concepto1 = recibiConcepto + " - //" + usuario_p;
var sourceVals = [, numeroRecibo, concepto1, sucursal, recibiImporte, magi, recibiPara, fecha, recibiMedio];
sheetRegistro2.insertRowBefore(3).getRange(3, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("Recibi agregado: " + concepto1 + " " + recibiPara + " " + recibiImporte);
  return numeroRecibo
}


function updWhatsapp(whatsapp, dni) {
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit");
  var sheetRegistro2 = BD_CLIENTES.getSheetByName("BD CLIENTES");
  
  const data = sheetRegistro2.getDataRange().getDisplayValues();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === dni) {
      // Actualizar el número de WhatsApp en la columna E (índice 4)
      data[i][4] = whatsapp;
      sheetRegistro2.getRange(i + 1, 5).setValue(whatsapp); // Actualizar la celda en la hoja de cálculo (Equivale a la columna E)
      console.log("Número de WhatsApp actualizado a: " + whatsapp);
    } else {
      console.log("Error al actualizar los datos.")
    }
  }
}

///////////////////////////////////////////////////////////////////////


//////////////// BUSCAR PATENTE EN BD COBRANZAS ////////////////
function buscarMantenimientos(numeroInventario = "1192774"){
  let mantenimientosRealizados = [];
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")

  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();

  mantenimientos.forEach(mantenimiento =>{
    if(mantenimiento[1] === numeroInventario) {
      mantenimientosRealizados.push(mantenimiento);
    }
  })

  return mantenimientosRealizados;
}

//////////////// BUSCAR PATENTE EN BD EMISION ////////////////
function buscarMantenimientos3(numeroInventario = "1192774"){
  let mantenimientosRealizados3 = [];
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");

  const mantenimientos3 = LISTADO.getDataRange().getDisplayValues();
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  for (let i = 0; i < mantenimientos3.length; i++) {
    let mantenimiento3 = mantenimientos3[i];
    if(mantenimiento3[0] === numeroInventario) {
      // Buscamos en mantenimientos8 el valor de mantenimiento3[1] en la columna A y obtenemos el valor de la columna E
      let valorE = "";
      for (let j = 0; j < mantenimientos8.length; j++) {
        let mantenimiento8 = mantenimientos8[j];
        if(mantenimiento8[0] === mantenimiento3[1]) {
          valorE = mantenimiento8[4];
          break;
        }
      }
      // Actualizamos el valor de mantenimiento3[4] con el valor obtenido
      mantenimiento3[4] = valorE;
      mantenimientosRealizados3.push(mantenimiento3);
    }
  }
  return mantenimientosRealizados3;
}



//////////////// BUSCAR DNI EN BD COBRANZAS ////////////////
function buscarMantenimientos2(numeroInventario2 = "1192774"){
  let mantenimientosRealizados2 = [];   
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")


///////////// GUARDAMOS TODA LA BD EN MANTENIMIENTOS /////////
  const mantenimientos2 = BD_COBRANZAS.getDataRange().getDisplayValues();

///////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos2.forEach(mantenimiento2 =>{

    /////// SI EL VALOR DE LA COLUMNA C EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento2[2] === numeroInventario2) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados2.push(mantenimiento2);
    }
  })
///////////// RETORNAMOS MANTENIMIENTOSREALIZADOS //////////
  return mantenimientosRealizados2;
}



//////////////// BUSCAR DNI EN BD EMISION ////////////////
function buscarMantenimientos4(numeroInventario2 = "1192774"){
  let mantenimientosRealizados4 = [];   
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");

  const mantenimientos4 = LISTADO.getDataRange().getDisplayValues();
  const mantenimientos7 = BD_CLIENTES.getDataRange().getDisplayValues();

  //////////// BUSCAMOS EL VALOR DE LA COLUMNA E EN BD_CLIENTES ////////////
  let valorEncontrado = "";
  for (let i = 0; i < mantenimientos7.length; i++) {
    if (mantenimientos7[i][0] === numeroInventario2) {
      valorEncontrado = mantenimientos7[i][4]; // Columna E
      break;
    }
  }

  /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos4.forEach(mantenimiento4 =>{

    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento4[1] === numeroInventario2) {
      /////////// REEMPLAZAMOS EL VALOR EN LA POSICIÓN 3 DEL ARRAY /////////////
      mantenimiento4[4] = valorEncontrado;
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados4.push(mantenimiento4);
    }
  });

  //////////// RETORNAMOS MANTENIMIENTOSREALIZADOS ////////////
  return mantenimientosRealizados4;
}

//////////////// BUSCAR  NOMBRE EN BD COBRANZAS ////////////////
function buscarMantenimientos5(numeroInventario = "1192774"){
  let mantenimientosRealizados5 = [];
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")

  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();

  mantenimientos.forEach(mantenimiento =>{
    if(mantenimiento[3].includes(numeroInventario)) {
      mantenimientosRealizados5.push(mantenimiento);
    }
  })

  return mantenimientosRealizados5;
}

//////////////// BUSCAR NOMBRE EN BD EMISION ////////////////
function buscarMantenimientos6(numeroInventario = "1192774"){
  let mantenimientosRealizados6 = [];
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");

  const mantenimientos6 = LISTADO.getDataRange().getDisplayValues();
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  for (let i = 0; i < mantenimientos6.length; i++) {
    let mantenimiento6 = mantenimientos6[i];
    if(mantenimiento6[2].includes(numeroInventario)) {
      // Buscamos en mantenimientos8 el valor de mantenimiento6[2] en la columna A y obtenemos el valor de la columna C
      let valorE = "";
      for (let j = 0; j < mantenimientos8.length; j++) {
        let mantenimiento8 = mantenimientos8[j];
        if(mantenimiento8[1] === mantenimiento6[2]) {
          valorE = mantenimiento8[4];
          break;
        }
      }
      // Actualizamos el valor de mantenimiento6[4] con el valor obtenido
      mantenimiento6[4] = valorE;
      mantenimientosRealizados6.push(mantenimiento6);
    }
  }
  return mantenimientosRealizados6;
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



////////////////////////  SESION DE USUARIOS ////////////////////////


function verificarCredenciales(usuario, contrasena) {
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY/edit").getSheetByName("USERS");
  var dataValues = sheet.getDataRange().getDisplayValues();
  
  for (var i = 1; i < dataValues.length; i++) {
    if (dataValues[i][0] == usuario && dataValues[i][1] == contrasena) {

  // Verificar las credenciales del usuario y obtener el color
  var color = buscarColorAlmacenado(usuario);
  
  // Devolver el color al cliente
  return color;

    }
  }
  return alert("Error de Usuario o Contraseña!");
}


///////////////////////////////////////////////////////////////////////



function cambioClave(antiguaClave, nuevaClave, usuario_pass) {
  const USERS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1R4J4bi5Zb8uZcR0CZ8_VrYIOsxFPOzTJIOdr6f-I0EY/edit").getSheetByName("USERS");
  const USUARIOS = USERS.getDataRange().getDisplayValues();

  var fecha = new Date();

  // Buscar si el DNI ya existe en la hoja de clientes
  let dniIndex = -1;
  for (let i = 0; i < USUARIOS.length; i++) {
    if (USUARIOS[i][0] === usuario_pass) {
      dniIndex = i + 1;
      break;
    }
  }

  // Si el DNI ya existe, actualizar los datos del cliente
  if (dniIndex !== -1) {
    USERS.getRange(dniIndex, 2).setValue(nuevaClave);
    USERS.getRange(dniIndex, 3).setValue(antiguaClave);
    USERS.getRange(dniIndex, 4).setValue(fecha);
  }
}

///////////////////////////// CAMBIAR COLOR DE FONDO ////////////////


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




///////////////////// SCRIPTS RECIBOS DESCARGA / REIMPRIME ///////////////////

//////////////// REIMPRIMIR RECIBOS //////////////////////
function getValuesFromSheet(numRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  

  let sourceVals = [];
  for (let i = 0; i < mantenimientos.length; i++) {
    if (mantenimientos[i][0] == numRecibo) {

      sourceVals.push(mantenimientos[i]);
    }
  }

  sourceVals = sourceVals[0];
console.log(sourceVals)
  var template = HtmlService.createTemplateFromFile('Recibo');
  template.sourceVals = sourceVals;
  var content = template.evaluate().getContent();
  
  return content;
}

//////////////// REIMPRIMIR MULTIRECIBOS X6//////////////////////
function getValuesFromSheetMulti(numReciboMulti, infomultiRec) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  console.log(numReciboMulti,infomultiRec)
  const sourceVals = [];
  let i = 0;
  while (i < infomultiRec) {
    let reciboEncontrado = false;
    for (let j = 0; j < mantenimientos.length; j++) {
      if (mantenimientos[j][0] == numReciboMulti) {
        sourceVals.push(mantenimientos[j]);
        i++;
        reciboEncontrado = true;
        break;
      }
    }
    if (!reciboEncontrado) {
      numReciboMulti--;
    }
    else {
      numReciboMulti--;
    }
  }
  var template = HtmlService.createTemplateFromFile('ReciboMulti');
  template.sourceVals = sourceVals;
  console.log(sourceVals)
  var content = template.evaluate().getContent();
  console.log(content)
  return content;
}

//////////////// REIMPRIMIR GASTOS //////////////////////
function getValuesFromSheet_gastos(numRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("GASTOS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  

  let sourceVals = [];
  for (let i = 0; i < mantenimientos.length; i++) {
    if (mantenimientos[i][1] == numRecibo) {

      sourceVals.push(mantenimientos[i]);
    }
  }

  sourceVals = sourceVals[0];
console.log(sourceVals)
  var template = HtmlService.createTemplateFromFile('ReciboGastos');
  template.sourceVals = sourceVals;
  var content = template.evaluate().getContent();
  return content;
}



/////////////////// DESCARGAR PDF /////////////////////


  function generarPDF() {
  var archivoPDF = DocumentApp.create('Lista Pendientes').getAs('application/pdf');
  var pdfBlob = archivoPDF.getBlob();
  
  var enlaceDescarga = '<a href="' + getURLWithToken(pdfBlob) + '">Descargar PDF</a>';
  
  var output = HtmlService.createHtmlOutput(enlaceDescarga);
  SpreadsheetApp.getUi().showModalDialog(output, 'Descargar PDF');
}
    


//////////////// PDF RECIBO //////////////////////
function getPdfContent(numRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();

  let sourceVals = [];
  for (let i = 0; i < mantenimientos.length; i++) {
    if (mantenimientos[i][0] == numRecibo) {
      sourceVals.push(mantenimientos[i]);
    }
  }

  sourceVals = sourceVals[0];

  var template = HtmlService.createTemplateFromFile('ReciboPDF');
  template.sourceVals = sourceVals;
  var content = template.evaluate().getContent();

  var pdfContent = convertHtmlToPdf(content);
  
  return pdfContent;
}

/////////////////// CONVERTIR PDF /////////////////////
function convertHtmlToPdf(htmlContent) {
  var blob = Utilities.newBlob(htmlContent, 'text/html', 'ReciboPDF.html');
  
  var pdfFile = DriveApp.createFile(blob);
  var pdfBlob = pdfFile.getBlob().getAs('application/pdf');
  
  // Eliminar el archivo HTML temporal
  DriveApp.getFileById(pdfFile.getId()).setTrashed(true);

  var pdfContent = pdfBlob.getBytes();
  var encodedPdfContent = Utilities.base64Encode(pdfContent);

  return encodedPdfContent;
}



//////////////// PDF RECIBO MULTI //////////////////////
function getPdfContentM(numRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();

  const sourceVals = [];
  let i = 0;
  while (i < 6) {
    let reciboEncontrado = false;
    for (let j = 0; j < mantenimientos.length; j++) {
      if (mantenimientos[j][0] == numRecibo) {
        sourceVals.push(mantenimientos[j]);
        i++;
        reciboEncontrado = true;
        break;
      }
    }
    if (!reciboEncontrado) {
      numRecibo--;
    }
    else {
      numRecibo--;
    }
  }
  var template = HtmlService.createTemplateFromFile('ReciboMultiPDF');
  template.sourceVals = sourceVals;
  
  console.log(sourceVals)
  var content = template.evaluate().getContent();

  var pdfContent = convertHtmlToPdfM(content);
  
  return pdfContent;
}


/////////////////// CONVERTIR PDF MULTI /////////////////////
function convertHtmlToPdfM(htmlContent) {
  var blob = Utilities.newBlob(htmlContent, 'text/html', 'ReciboMultiPDF.html');
  
  var pdfFile = DriveApp.createFile(blob);
  var pdfBlob = pdfFile.getBlob().getAs('application/pdf');
  
  // Eliminar el archivo HTML temporal
  DriveApp.getFileById(pdfFile.getId()).setTrashed(true);

  var pdfContent = pdfBlob.getBytes();
  var encodedPdfContent = Utilities.base64Encode(pdfContent);

  return encodedPdfContent;
}