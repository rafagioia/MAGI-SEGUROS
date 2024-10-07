function doGet(){
  var template = HtmlService.createTemplateFromFile('cuotas_vencidas');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbwRJ49ZJ94cIoLjao3bzXljQCZleGKY7wLiui-kkZeYaNO3gHCLm0NGVZewnaEO3aj9/exec";
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}

///////////////// LISTADO DE PAGOS ////////////////////////
function getData(dia_desde = 12, mes_desde = 07, anio_desde = 24, dia_hasta = 14, mes_hasta = 07, anio_hasta = 24, sucursal, dia = "", mes = "", anio = "") {
// function getData( dia_desde, mes_desde, anio_desde, dia_hasta, mes_hasta, anio_hasta, dia = "", mes = "", anio = "") {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const cobranzasData = BD_COBRANZAS.getDataRange().getDisplayValues();
    console.log("sucursal: "+ sucursal)
    dia_desde = dia_desde.toString().padStart(2, '0');
    mes_desde = mes_desde.toString().padStart(2, '0');
    anio_desde = anio_desde.toString().slice(-2).padStart(2, '0');

    dia_hasta = dia_hasta.toString().padStart(2, '0');
    mes_hasta = mes_hasta.toString().padStart(2, '0');
    anio_hasta = anio_hasta.toString().slice(-2).padStart(2, '0');

  var sinPendientes = [];
  var today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  var now_split = today.split('/');
  var now_dia = now_split[0];
  var now_mes = now_split[1];
  var now_anio = now_split[2];

  var currentDate = new Date(now_anio, now_mes - 1, now_dia); // Define currentDate una vez
  var patenteSet = new Set(); // Usamos un Set para almacenar las patentes del primer bucle

     console.log("current: " + now_dia + now_mes + now_anio + " dia desde: " + dia_desde + mes_desde + anio_desde + " hasta: " + dia_hasta + mes_hasta + anio_hasta)

    var dataDateFiltroDesde = new Date(anio_desde, mes_desde - 1, dia_desde);
    var timeDiffFiltroDesde = currentDate - dataDateFiltroDesde;
    var daysDiffFiltroDesde = timeDiffFiltroDesde / (1000 * 3600 * 24);
    var dataDateFiltroHasta = new Date(anio_hasta, mes_hasta - 1, dia_hasta);
    var timeDiffFiltroHasta = currentDate - dataDateFiltroHasta;
    var daysDiffFiltroHasta = timeDiffFiltroHasta / (1000 * 3600 * 24);


  // Primer bucle: almacenar patentes en el Set
  for (var i = 1; i < cobranzasData.length; i++) {
    var partes = cobranzasData[i][5].split('/');
    var diaPago = partes[0];
    var mesPago = partes[1];
    var anioPago = partes[2];

    var dataDate = new Date(anioPago, mesPago - 1, diaPago);
    var timeDiff = currentDate - dataDate;
    var daysDiff = timeDiff / (1000 * 3600 * 24);

    var patente = cobranzasData[i][1].trim(); // Limpiamos espacios en blanco

    if (daysDiff >= -10 && daysDiff < 26) {
      patenteSet.add(patente); // Guardamos la patente en el Set
    }
  }

  // Segundo bucle: procesar datos y evitar patentes en el Set
  for (var i = 1; i < cobranzasData.length; i++) {
    var partes = cobranzasData[i][5].split('/');
    var dia = partes[0];
    var mes = partes[1];
    var anio = partes[2];
    
    var dataDate = new Date(anio, mes - 1, dia);

    // Calcula la diferencia en días entre las dos fechas
    var timeDiff = currentDate - dataDate;
    var daysDiff = timeDiff / (1000 * 3600 * 24);

    var patente = cobranzasData[i][1].trim(); // Limpiamos espacios en blanco
    var columnaR = cobranzasData[i][17]; // Columna R está en el índice 17 (la numeración comienza en 0)
    var sucursalValue = cobranzasData[i][16];

    var cumpleFiltroSucursal = (sucursal === "MARIANO ACOSTA" && sucursalValue === "MARIANO ACOSTA") ||
                               (sucursal === "MARCOS PAZ" && sucursalValue === "MARCOS PAZ") ||
                               (!sucursal); // Si la variable sucursal no tiene valor

    var compania = cobranzasData[i][10]; // Asumiendo que la columna G es la número 6

    // Condición para que el valor de la columna G sea uno de los valores especificados
    var cumpleFiltroCompania = compania === "AGROSALTA [RC]" || 
                              compania === "AGROSALTA [RC-GRUA]" || 
                              compania === "AGROSALTA [MOTO]" || 
                              compania === "AGROSALTA [B1]";

    if (daysDiff >= daysDiffFiltroHasta && daysDiff <= daysDiffFiltroDesde && !columnaR  && !patenteSet.has(patente) && cumpleFiltroSucursal && cumpleFiltroCompania) {
    // if (daysDiff >= daysDiffFiltroHasta && daysDiff <= daysDiffFiltroDesde && !patenteSet.has(patente)) {
      var para_pasar = [];
      
      // Añade los datos necesarios a para_pasar
      para_pasar.push(cobranzasData[i][0]); // ID DEUDOR
      para_pasar.push(cobranzasData[i][3]); // CLIENTE
      para_pasar.push(patente); // PATENTE
      para_pasar.push(cobranzasData[i][13]); // VEHICULO
      para_pasar.push(cobranzasData[i][10]); // COMPAÑIA
      para_pasar.push(cobranzasData[i][7]); // CUOTA
      para_pasar.push(cobranzasData[i][8]); // VIGENCIA
      para_pasar.push(cobranzasData[i][5]); // VENCE
      para_pasar.push(cobranzasData[i][15]); // LIQUIDADO
      para_pasar.push(cobranzasData[i][11]); // IMPORTE
      para_pasar.push(cobranzasData[i][4]); // WHATSAPP
      para_pasar.push("DEBE UN MES");
      para_pasar.push(cobranzasData[i][17]); // DEUDOR AVISADO
      para_pasar.push(daysDiff - 31); // Calcula el tiempo adicional, si es necesario
      para_pasar.push(""); // Placeholder para datos adicionales si es necesario
      para_pasar.push(""); // Placeholder para datos adicionales si es necesario
      para_pasar.push(""); // Placeholder para datos adicionales si es necesario
      para_pasar.push("PASADO"); // Placeholder o marcador

      sinPendientes.push(para_pasar);
    }
  }

  console.log("Número de registros en sinPendientes: " + sinPendientes.length);
  console.log(sinPendientes);
  return sinPendientes;
}


///////////////// GENERAR LISTADO DE PAGOS ////////////////////////


function getDataDescargar(dia_desde, mes_desde, anio_desde, dia_hasta, mes_hasta, anio_hasta, sucursal) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const cobranzasData = BD_COBRANZAS.getDataRange().getDisplayValues();
  
  console.log("sucursal: " + sucursal)
    dia_desde = dia_desde.toString().padStart(2, '0');
    mes_desde = mes_desde.toString().padStart(2, '0');
    anio_desde = anio_desde.toString().slice(-2).padStart(2, '0');

    dia_hasta = dia_hasta.toString().padStart(2, '0');
    mes_hasta = mes_hasta.toString().padStart(2, '0');
    anio_hasta = anio_hasta.toString().slice(-2).padStart(2, '0');


  var sinPendientes = [];
  var today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
  var now_split = today.split('/');
  var now_dia = now_split[0];
  var now_mes = now_split[1];
  var now_anio = now_split[2];

  var id = 1;
  var currentDate = new Date(now_anio, now_mes - 1, now_dia);
  var fileContent = "ID,PATENTE,VEHICULO,vence,WHATSAPP\n";
  var patenteSet = new Set(); // Usamos un Set para almacenar las patentes del primer bucle

     console.log("current: " + now_dia + now_mes + now_anio + " dia desde: " + dia_desde + mes_desde + anio_desde + " hasta: " + dia_hasta + mes_hasta + anio_hasta)

    var dataDateFiltroDesde = new Date(anio_desde, mes_desde - 1, dia_desde);
    var timeDiffFiltroDesde = currentDate - dataDateFiltroDesde;
    var daysDiffFiltroDesde = timeDiffFiltroDesde / (1000 * 3600 * 24);
    var dataDateFiltroHasta = new Date(anio_hasta, mes_hasta - 1, dia_hasta);
    var timeDiffFiltroHasta = currentDate - dataDateFiltroHasta;
    var daysDiffFiltroHasta = timeDiffFiltroHasta / (1000 * 3600 * 24);


  // Primer bucle: almacenar patentes en el Set
  for (var i = 1; i < cobranzasData.length; i++) {
    var partes = cobranzasData[i][5].split('/');
    var diaPago = partes[0];
    var mesPago = partes[1];
    var anioPago = partes[2];

    var dataDate = new Date(anioPago, mesPago - 1, diaPago);
    var timeDiff = currentDate - dataDate;
    var daysDiff = timeDiff / (1000 * 3600 * 24);

    var patente = cobranzasData[i][1].trim(); // Limpiamos espacios en blanco

    if (daysDiff >= -10 && daysDiff < 26) {
      patenteSet.add(patente); // Guardamos la patente en el Set
    }
  }


  // Segundo bucle: procesar datos y evitar patentes en el Set
for (var i = 1; i < cobranzasData.length; i++) {

    var valorColumna4 = cobranzasData[i][4].trim();

    // Verificar si la columna [4] no tiene valor, es '1111111111', o no tiene 10 caracteres
    if (!valorColumna4 || valorColumna4 === '1111111111' || valorColumna4.length !== 10) {
        continue; // Omitir esta fila
    }

    var partes = cobranzasData[i][5].split('/');
    var diaPago = partes[0];
    var mesPago = partes[1];
    var anioPago = partes[2];

    var dataDate = new Date(anioPago, mesPago - 1, diaPago);
    var timeDiff = currentDate - dataDate;
    var daysDiff = timeDiff / (1000 * 3600 * 24);

    var patente = cobranzasData[i][1].trim(); // Limpiamos espacios en blanco
    var avisovto = cobranzasData[i][17];
    var sucursalValue = cobranzasData[i][16]; // Valor en la columna Q (índice 16)

    // Filtro según el valor de la variable sucursal
    var cumpleFiltroSucursal = (sucursal === "MARIANO ACOSTA" && sucursalValue === "MARIANO ACOSTA") ||
                               (sucursal === "MARCOS PAZ" && sucursalValue === "MARCOS PAZ") ||
                               (!sucursal); // Si la variable sucursal no tiene valor

    var compania = cobranzasData[i][10]; // Asumiendo que la columna G es la número 6

    // Condición para que el valor de la columna G sea uno de los valores especificados
    var cumpleFiltroCompania = compania === "AGROSALTA [RC]" || 
                              compania === "AGROSALTA [RC-GRUA]" || 
                              compania === "AGROSALTA [MOTO]" || 
                              compania === "AGROSALTA [B1]";


    if (daysDiff >= daysDiffFiltroHasta && daysDiff <= daysDiffFiltroDesde && !avisovto && !patenteSet.has(patente) && cumpleFiltroSucursal && cumpleFiltroCompania) {
        var para_pasar = [];
        para_pasar.push(id);
        para_pasar.push(patente);
        para_pasar.push(cobranzasData[i][13] ? cobranzasData[i][13] : 'vehiculo');
        para_pasar.push(cobranzasData[i][5]);
        para_pasar.push(cobranzasData[i][4] ? cobranzasData[i][4] : '11111111');

        sinPendientes.push(para_pasar);

        fileContent += para_pasar.join(",") + "\n";

        id++;
    }
}


  return fileContent;
}

/////////////// DESCARGAR LISTADO EN EXCEL //////////////////

// Código del lado del servidor (Google Apps Script)
function fetchDataForDownload(day, month, year) {

    const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const cobranzasData = sheet.getDataRange().getDisplayValues();
  // var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('NombreDeLaHoja');
  var data = sheet.getDataRange().getValues(); // Recupera todos los datos
  
  // Filtra y organiza los datos según sea necesario
  // Ejemplo de retorno de datos (solo las columnas necesarias)
  return data.map(row => [row[0], row[1], row[7], row[10]]);
}




////////// UPDATE POLIZA ////////////////

function updatePol(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  var data = BD_COBRANZAS.getDataRange().getValues();

  
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const data2 = LISTADO.getDataRange().getDisplayValues();



for (let i = 0; i < data.length; i++) {
  if (parseInt(infoRecibo) === data[i][0]) {
    BD_COBRANZAS.getRange(i + 1, 10).setValue(infoPoliza);
  if (parseInt(infoCta) !== data[i][7] || parseInt(infoVig) !== data[i][8]) {
    BD_COBRANZAS.getRange(i + 1, 8).setValue(infoCta);
    BD_COBRANZAS.getRange(i + 1, 9).setValue(infoVig);
    // Una vez que se han modificado las cuotas y la vigencia, sal del bucle.
  }

  var dia_emi = parseInt(data[i][5].getDate());
  var mes_emi = parseInt(data[i][5].getMonth() + 1); // Los meses comienzan desde 0, así que sumamos 1.
  var anio_emi2 = data[i][5].getFullYear();
  var anio_emi = parseInt(anio_emi2 % 100)
  var dia_cob = parseInt(infoVto.split('/')[0]);
  var mes_cob = parseInt(infoVto.split('/')[1]);
  var anio_cob = parseInt(infoVto.split('/')[2]);

  if (dia_emi !== dia_cob || mes_emi !== mes_cob || anio_emi !== anio_cob) {
    BD_COBRANZAS.getRange(i + 1, 6).setValue(infoVto);

  }    
    break;
  }

}

for(let i = 0; i < data2.length; i++) {
  if(infoPatente === data2[i][0]) {
      if(parseInt(infoPoliza) !== data[i][8] && infoPoliza !== "") {
    LISTADO.getRange(i+1,8).setValue(infoPoliza);
  }
  }
}
}


////////// PASAR PAGO ////////////////


function avisarPago(infoRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  var data = BD_COBRANZAS.getDataRange().getValues();

for(let i = 0; i < data.length; i++) {
  if(parseInt(infoRecibo) === data[i][0]) {
    var hoy = new Date();
    var fechaFormateada = Utilities.formatDate(hoy, "GMT", "dd/MM/yy");
    BD_COBRANZAS.getRange(i+1,18).setValue(fechaFormateada);
  }
}

  return fechaFormateada
}


////////// QUITAR PAGO ////////////////


function quitarPago(infoRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  var data = BD_COBRANZAS.getDataRange().getValues();

for(let i = 0; i < data.length; i++) {
  if(parseInt(infoRecibo) === data[i][0]) {

    BD_COBRANZAS.getRange(i+1,15).setValue("");
  }
}
}


////////// LIQUIDAR PAGOS  ////////////////


function liqPagos() {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  var data = BD_COBRANZAS.getDataRange().getValues();
  var numerosRecibos = []; 

for(let i = 1; i < data.length; i++) {
  if(data[i][14] !== "" && data[i][15] == "") {
    var hoy = new Date();
    var fechaFormateada = Utilities.formatDate(hoy, "GMT", "dd/MM/yy");
    BD_COBRANZAS.getRange(i+1,16).setValue(fechaFormateada);

      // Agrega el número de recibo al array
      numerosRecibos.push(data[i][0]);
    }
  }

  // Devuelve el array de números de recibos
  return numerosRecibos;
}
/////////////// INGRESAR DEUDOR /////////////////////


function pagoNuevo(infoDNI, infoCliente, infoWpp, infoPatente, infoMarca, infoPoliza, infoCnia, infoCuota, infoVigencia, infoImporte, infoVence) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");

let f_deudor = '=IF(vlookup(B2;indirect("B:F");5;false)=F2; IF(F2>EDATE(now();-2);IF(edate(F2;1)<now(); if(month(vlookup(B2;indirect("B:F");5;false))>month(edate(now();-1));"";"Poliza con Deuda");"");"");"")';

  var spreadsheetId = "1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM";
  var sheetName = "BD DEUDORES";
  var sheetRegistro2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var fecha = new Date();
  var sucursal = "BD DEUDORES";

    var numeroRecibo = BD_COBRANZAS.getRange("CARGADORES!T5").getValue() + 1;
    BD_COBRANZAS.getRange("CARGADORES!T5").setValue(numeroRecibo);
    SpreadsheetApp.flush();
    var recibo = numeroRecibo;

    var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, infoVence, fecha, infoCuota, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, , , sucursal, f_deudor, , "DEUDOR"];
    sheetRegistro2.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);

    return recibo;
  }


///////////////////// ALTA NUEVA DEUDOR /////////////////

function alta_nuevadeudor(altaVto, altaID_Deudor, altaVigencia, altaCnia, altaMarca, altaPatente, altaCliente, altaDNI) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");

    var sourceVals = [altaID_Deudor, altaDNI, altaCliente, altaPatente, altaMarca, altaCnia, "1", altaVigencia, altaVto, , ];
    BD_DEUDORES.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);

    return altaDNI;

}


///////////////////// BAJA NUEVO DEUDOR /////////////////

function baja_nuevadeudor(bajaVto, bajaPatente) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");
  const mantenimientos = BD_DEUDORES.getDataRange().getDisplayValues();

for(let i = 1; i < mantenimientos.length; i++) {
  if(bajaPatente === mantenimientos[i][3]) {
    BD_DEUDORES.getRange(i+1,10).setValue(bajaVto);
  }
}
    return bajaPatente;

}


//////////////// REIMPRIMIR RECIBOS //////////////////////
function getValuesFromSheet(numRecibo) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const mantenimientos = BD_DEUDORES.getDataRange().getDisplayValues();
  

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
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const mantenimientos = BD_DEUDORES.getDataRange().getDisplayValues();

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

//////////////////////////////////////////////////////


  function generarPDF() {
  var archivoPDF = DocumentApp.create('Lista Pendientes').getAs('application/pdf');
  var pdfBlob = archivoPDF.getBlob();
  
  var enlaceDescarga = '<a href="' + getURLWithToken(pdfBlob) + '">Descargar PDF</a>';
  
  var output = HtmlService.createHtmlOutput(enlaceDescarga);
  SpreadsheetApp.getUi().showModalDialog(output, 'Descargar PDF');
}
    


//////////////// PDF RECIBO //////////////////////
function getPdfContent(numRecibo) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const mantenimientos = BD_DEUDORES.getDataRange().getDisplayValues();

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


function getPdfContentM(numRecibo) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const mantenimientos = BD_DEUDORES.getDataRange().getDisplayValues();

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


/////////////////// TILDAR PAGOS ///////////////////////

function marcarColumnaS(numRecibo, isChecked) {
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const data = BD_DEUDORES.getDataRange().getDisplayValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === numRecibo) {
      var value = isChecked ? true : false; // Marcar como TRUE si isChecked es true, de lo contrario, marcar como FALSE
      BD_DEUDORES.getRange(i + 1, 19).setValue(value);
      break;
    }
  }
}

////////////// PROCESAR ARCHIVO
function procesarYActualizar(contenido) {
  var sheet = SpreadsheetApp.openById('1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA').getSheetByName('BD COBRANZAS');
  var data = contenido.split("\n").map(row => row.split(","));
  
  // Obtenemos la fecha de hoy
  var fechaHoy = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yy");
  
  // Leer todos los valores de la hoja en una sola llamada
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2, 2, lastRow - 1, 17); // Lee desde la columna B hasta la columna R
  var values = range.getValues();
  
  // Crear un objeto para mapear las patentes con sus fechas
  var patenteMap = {};
  for (var i = 0; i < values.length; i++) {
    var patenteHoja = values[i][0]; // Columna B
    var fechaHoja = values[i][4]; // Columna F
    if (patenteHoja && fechaHoja) {
      // Formatear la fecha en el formato dd/MM/yy
      var fecha = new Date(fechaHoja);
      var diaHoja = Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd");
      var mesHoja = Utilities.formatDate(fecha, Session.getScriptTimeZone(), "MM");
      var anioHoja = Utilities.formatDate(fecha, Session.getScriptTimeZone(), "yyyy").slice(-2); // Convertir a YY
      patenteMap[patenteHoja] = {
        fechaHoja: {diaHoja, mesHoja, anioHoja},
        row: i + 2 // Guardamos la fila para actualizar más tarde
      };
    }
  }
  
  // Procesar los datos del CSV
  var registrosProcesados = 0;
  for (var i = 1; i < data.length; i++) {
    var patenteCSV = data[i][1];
    var venceCSV = data[i][3];
    
    if (patenteCSV && venceCSV) {
      // Separar día, mes y año de la fecha en el CSV
      var [diaCSV, mesCSV, anioCSV] = venceCSV.split("/").map(Number);
      
      // Asegurarse de que el año CSV tenga dos dígitos
      if (anioCSV < 100) {
        anioCSV += 2000; // Asumir año en el siglo XXI
      }
      anioCSV = anioCSV.toString().slice(-2); // Convertir a formato YY
      
      // Buscar la patente en el objeto
      var patenteInfo = patenteMap[patenteCSV];
      if (patenteInfo) {
        var {diaHoja, mesHoja, anioHoja} = patenteInfo.fechaHoja;
        
        // Comparar las fechas
        if (parseInt(diaCSV, 10) === parseInt(diaHoja, 10) &&
            parseInt(mesCSV, 10) === parseInt(mesHoja, 10) &&
            anioCSV === anioHoja) {
          // Actualizar la columna R en la fila correspondiente
          sheet.getRange(patenteInfo.row, 18).setValue(fechaHoy); // Columna R
          registrosProcesados++;
          Logger.log("Fecha actualizada en la fila " + patenteInfo.row);
        } else {
          Logger.log("No coincide la fecha para la patente: " + patenteCSV + 
                      " | Fecha CSV: " + diaCSV + "/" + mesCSV + "/" + anioCSV + 
                      " | Fecha Hoja: " + diaHoja + "/" + mesHoja + "/" + anioHoja);
        }
      } else {
        Logger.log("Patente no encontrada en la hoja: " + patenteCSV);
      }
    } else {
      Logger.log("Datos incompletos en CSV: " + data[i]);
    }
  }
  
  Logger.log('Procesamiento completado. Registros procesados: ' + registrosProcesados);
}




////////////////////////////////////////////////////////////////////
////////////////////////  SESION DE USUARIOS ////////////////////////
/////////////////////////////////////////////////////////////////////

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
  return alert("Error de Usuario o Contrase�a!");
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
  
  // Buscar el usuario en la hoja de c�lculo y obtener el color almacenado
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