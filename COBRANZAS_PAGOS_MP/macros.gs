
///////////////////////////////////// HTML /////////////////////////////////////////////


/////////// ABRIMOS EL HTML ///////////////
function doGet(){
  var template = HtmlService.createTemplateFromFile('registro');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbzYihjW6-4nd90DtVwmyUoPIcSjqRh1N4oow2decuJxAVmeMGamhYIyLYmvT9P5snWp/exec"
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////

function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}

//////////////////////////// INGRESO SIN DOPOST ///////////////////////

function pagoNuevo(infomultiRec, infoDNI, infoCliente, infoWpp, infoPatente, infoMarca, infoPoliza, infoCnia, infoCuota, infoVigencia, infoImporte, infoVence, infoColor, infoUsuario, infoNotas, infoMedio) {

let f_deudor = '=IF(vlookup(B2;indirect("B:F");5;false)=F2; IF(F2>EDATE(now();-2);IF(edate(F2;1)<now(); if(month(vlookup(B2;indirect("B:F");5;false))>month(edate(now();-1));"";"Poliza con Deuda");"");"");"")';

  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();


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
    var ctesVals = [infoDNI, infoCliente, , , infoWpp, , , , new Date()];
    BD_CLIENTES.insertRowBefore(2).getRange(2, 1, 1, ctesVals.length).setValues([ctesVals]);
  }


  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("LISTADO");
  const VAL_VEH = LISTADO.getDataRange().getDisplayValues();

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
  }
  // Si la Patente no existe, agregar una nueva fila a la hoja de polizas
   else {

    var dia1 = infoVence.split('/')[0];
var mes1 = parseInt(infoVence.split('/')[1]);
var anio1 = infoVence.split('/')[2].slice(-2);
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

var vehVals = [infoPatente, infoDNI, infoCliente, "BD COBRANZAS", , infoImporte, infoCnia, infoPoliza , nuevaFechaVence, , "SEGURO NUEVO", , infoMarca, "CUPONES", , , , , , nuevaFechaVence]
    LISTADO.insertRowBefore(2).getRange(2, 1, 1, vehVals.length).setValues([vehVals]);
  }

  var spreadsheetId = "1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA";
  var sheetName = "BD COBRANZAS";
  var sheetRegistro2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var fecha = new Date();
  var sucursal = "MARCOS PAZ";
  var notas1 = "//" + infoUsuario + " / (" + infoNotas + ")";

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

      var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, vtoNuevo, fecha, cuotaNum, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, ,infoColor, sucursal, f_deudor, notas1, infoMedio];
      sheetRegistro2.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);

    }

    return recibo;
  } else {
    var numeroRecibo = sheetRegistro2.getRange("CARGADORES!T5").getValue() + 1;
    sheetRegistro2.getRange("CARGADORES!T5").setValue(numeroRecibo);
    var recibo = numeroRecibo;

    var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, infoVence, fecha, infoCuota, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, ,infoColor, sucursal, f_deudor, notas1, infoMedio];
    sheetRegistro2.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);

    return recibo;
  }
}

/////////////////////////// VER LA ULTIMA ACTUALIZACION PARA DECIDIR DATOS PATENTE /////////////////////////////////////////
function getUltimaActu(patente_value) {
  let actualizaciones = [];
  let actualizacion_cob = [];
  let actualizacion_emi = [];
  let actualizacion_pol = [];
  let dni_value = "";
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const mantenimientos3 = LISTADO.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  let encontrado1 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado2 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado3 = false; // Variable para rastrear si se encontró una coincidencia

  for (let i = 0; i < mantenimientos3.length; i++) {
    if (patente_value === mantenimientos3[i][0]) {
      actualizacion_emi.push(mantenimientos3[i][0]);
      actualizacion_emi.push(mantenimientos3[i][1]);
      dni_value = mantenimientos3[i][1];
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
  if (mantenimientos8[j][0] === mantenimientos3[i][1]) {
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

  mantenimientos.forEach(mantenimiento =>{
    if(mantenimiento[1] === patente_value) {
      actualizacion_cob.push(mantenimiento);
      encontrado2 = true;
    }
  })

  if (!encontrado2) {
    actualizacion_cob.push(""); // Agregar valor vacío si no se encuentra una coincidencia en la hoja "BD COBRANZAS"
  }

mantenimientos3.forEach(mantenimiento2 => {
  if (mantenimiento2[1] === dni_value && mantenimiento2[10] !== "ANULACION") {
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

/////////////////////////////// FIN DE VER ULTIMA ACT PARA DATOS PATENTE ////////////////////////////



/////////////////////////// VER LA ULTIMA ACTUALIZACION PARA DECIDIR DATOS DNI /////////////////////////////////////////
function getUltimaActuDNI(dni_value1) {
  let actualizaciones = [];
  let actualizacion_cob = [];
  let actualizacion_emi = [];
  let actualizacion_pol = [];
  let dni_value = "";
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const mantenimientos3 = LISTADO.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

  let encontrado1 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado2 = false; // Variable para rastrear si se encontró una coincidencia
  let encontrado3 = false; // Variable para rastrear si se encontró una coincidencia

  for (let i = 0; i < mantenimientos3.length; i++) {
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

  mantenimientos.forEach(mantenimiento =>{
    if(mantenimiento[2] === dni_value1) {
      actualizacion_cob.push(mantenimiento);
      encontrado2 = true;
    }
  })

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
var sucursal = "MARCOS PAZ";

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
  var magi = '=IF(CONCATENATE(DAY(H3);MONTH(H3);YEAR(H3))=CONCATENATE(DAY(INDIRECT("CARGADORES!T6"));MONTH(INDIRECT("CARGADORES!T6"));YEAR(INDIRECT("CARGADORES!T6")));ROW();"")';
var sucursal = "MARCOS PAZ";
var fecha = new Date();
let concepto1 = gastoConcepto + " - //" + usuario_p;
var sourceVals = [, numeroRecibo, concepto1, sucursal, gastoImporte, magi, gastoPara, fecha, gastoMedio];
sheetRegistro2.insertRowBefore(3).getRange(3, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("Gasto agregado: " + concepto1 + " " + gastoPara + " " + gastoImporte);
}

////////////// INGESAMOS RECIBI A LA BD RECIBIS //////////////////
function agregarRecibi(recibiConcepto, recibiPara, recibiImporte,usuario_p, recibiMedio) {
const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit")
 var sheetRegistro2 = BD_COBRANZAS.getSheetByName("RECIBIS");

  var numeroRecibo = BD_COBRANZAS.getRange("CARGADORES!T8").getValue() + 1;
  BD_COBRANZAS.getRange("CARGADORES!T8").setValue(numeroRecibo);
    SpreadsheetApp.flush();
  var magi = '=IF(CONCATENATE(DAY(H3);MONTH(H3);YEAR(H3))=CONCATENATE(DAY(INDIRECT("CARGADORES!T6"));MONTH(INDIRECT("CARGADORES!T6"));YEAR(INDIRECT("CARGADORES!T6")));ROW();"")';
var sucursal = "MARCOS PAZ";
var fecha = new Date();
let concepto1 = recibiConcepto + " - //" + usuario_p;
var sourceVals = [, numeroRecibo, concepto1, sucursal, recibiImporte, magi, recibiPara, fecha, recibiMedio];
sheetRegistro2.insertRowBefore(3).getRange(3, 1, 1, sourceVals.length).setValues([sourceVals]);
  Logger.log("Recibi agregado: " + concepto1 + " " + recibiPara + " " + recibiImporte);
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
function getValuesFromSheetMulti(numReciboMulti) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();

  const sourceVals = [];
  let i = 0;
  while (i < 6) {
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
