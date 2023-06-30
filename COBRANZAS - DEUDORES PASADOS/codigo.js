function doGet(){
  var template = HtmlService.createTemplateFromFile('deudores_pasados');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbwJvD7VjT_d8s57KMTjuG5bAbc4TpZthNiDoC976kqwjuEEcKkgRFTk_vq2-4wSB7Yi/exec";
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}

///////////////// LISTADO DE PAGOS ////////////////////////

function getData(today = new Date().toLocaleDateString()) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const data = BD_COBRANZAS.getDataRange().getDisplayValues();

  var sinPendientes = [];
  for (var i = 1; i < data.length; i++) {

var fechaPagoStr = data[i][6];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("/"); // Dividir la fecha en día, mes y año

  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = month + '/' + year; // Formatea la fecha como "d/yyyy" sin ceros innecesarios

    if (formattedDate === today && data[i][19] === "DEUDOR") {
      var sinPend = [];
      sinPend.push(data[i][0]); // RECIBO
      sinPend.push(data[i][1]); // PATENTE
      sinPend.push(data[i][3]); // ASEGURADO
      sinPend.push(data[i][5]); // VENCE
      sinPend.push(data[i][6]); // PAGO
      sinPend.push(data[i][7]); // CUOTA
      sinPend.push(data[i][9]); // POLIZA
      sinPend.push(data[i][10]); // CNIA
      sinPend.push(data[i][11]); // IMPORTE
      sinPend.push(data[i][13]); // MARCA
      sinPend.push(data[i][16]); // SUCURSAL
      sinPend.push(data[i][18]); // USUARIO
      sinPend.push(data[i][19]); // MEDIO
      
      sinPendientes.push(sinPend);
    }
  }
  
  return sinPendientes;
}


///////////////// LISTADO DE GASTOS ////////////////////////

function getDataGastos(today = new Date().toLocaleDateString()) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("GASTOS");
  const data = BD_COBRANZAS.getDataRange().getDisplayValues();

  var sinPendientes = [];
  for (var i = 2; i < data.length; i++) {
var fechaPagoStr = data[i][7];
console.log(data[i][7])
  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio
console.log("fechaHoraSplit: " + fechaHoraSplit)
  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en día, mes y año
console.log("fechaSplit: " + fechaSplit)

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios
  console.log(today)
  console.log(formattedDate)  
    if (formattedDate === today) {
      var sinPend = [];
      sinPend.push(data[i][6]); // PAGUESE
      sinPend.push(data[i][2]); // CONCEPTO
      sinPend.push(data[i][4]); // IMPORTE
      sinPend.push(data[i][3]); // SUCURSAL
      sinPend.push(data[i][7]); // FECHA
      sinPend.push(data[i][8]); // MEDIO
      
      sinPendientes.push(sinPend);
    }
  }
  
  return sinPendientes;
}

///////////////// LISTADO DE RECIBIS ////////////////////////

function getDataRecibis(today = new Date().toLocaleDateString()) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("RECIBIS");
  const data = BD_COBRANZAS.getDataRange().getDisplayValues();
  
  var sinPendientes = [];
  for (var i = 2; i < data.length; i++) {
var fechaPagoStr = data[i][7];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios
  console.log(today)
  console.log(formattedDate)  
    if (formattedDate === today) {
      var sinPend = [];
      sinPend.push(data[i][6]); // PAGUESE
      sinPend.push(data[i][2]); // CONCEPTO
      sinPend.push(data[i][4]); // IMPORTE
      sinPend.push(data[i][3]); // SUCURSAL
      sinPend.push(data[i][7]); // FECHA
      sinPend.push(data[i][8]); // MEDIO
      
      sinPendientes.push(sinPend);
    }
  }
  
  return sinPendientes;
}


///////////////////////////////////////////////////////////////////////


///////////////////// OBTENER VALORES PARA LAS SUMAS DE PAGOS ///////////////////

function obtenerTotalPagos() {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit");
  var sheet = ss.getSheetByName("BD COBRANZAS");
  var data = sheet.getDataRange().getValues();
  
  var totalPagos = 0;
  
  for (var i = 1; i < data.length; i++) { // Comenzar en la segunda fila para omitir la fila de encabezado
    var valor = parseFloat(data[i][11]); // Suponiendo que la columna L es la columna 11 (�ndice 11 en base 0)
    
    if (!isNaN(valor)) {
      totalPagos += valor;
    }
  }
  
  return totalPagos;
}


////////////// GENERAR EXCEL DE CIERRE DE CAJA /////////////////////////////


function generateExcelFileAndSendEmail(t_pagos_mp_m,t_gastos_mp_m,t_recibis_mp_m,t_pagos_mp_t,t_gastos_mp_t,t_recibis_mp_t, t_pagos_ma_m,t_gastos_ma_m,t_recibis_ma_m,t_pagos_ma_t,t_gastos_ma_t,t_recibis_ma_t,t_pagos_mp_m_d, t_gastos_mp_m_d, t_recibis_mp_m_d, t_pagos_mp_t_d, t_gastos_mp_t_d, t_recibis_mp_t_d,  t_pagos_ma_m_d, t_gastos_ma_m_d, t_recibis_ma_m_d, t_pagos_ma_t_d, t_gastos_ma_t_d, t_recibis_ma_t_d, today = new Date().toLocaleDateString()) {

  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit";
  const BD_COBRANZAS = SpreadsheetApp.openByUrl(spreadsheetUrl).getSheetByName("BD COBRANZAS");
  const GASTOS = SpreadsheetApp.openByUrl(spreadsheetUrl).getSheetByName("GASTOS");
  const RECIBIS = SpreadsheetApp.openByUrl(spreadsheetUrl).getSheetByName("RECIBIS");
  const data = BD_COBRANZAS.getDataRange().getDisplayValues();
  const data2 = GASTOS.getDataRange().getDisplayValues();
  const data3 = RECIBIS.getDataRange().getDisplayValues();

    var t_total_mp_m = t_pagos_mp_m  + t_recibis_mp_m - t_gastos_mp_m;
    var t_total_mp_t = t_pagos_mp_t  + t_recibis_mp_t - t_gastos_mp_t;
    var t_total_ma_m = t_pagos_ma_m  + t_recibis_ma_m - t_gastos_ma_m;
    var t_total_ma_t = t_pagos_ma_t  + t_recibis_ma_t - t_gastos_ma_t;
    var t_total_mp_m_d = t_pagos_mp_m_d  + t_recibis_mp_m_d - t_gastos_mp_m_d;
    var t_total_mp_t_d = t_pagos_mp_t_d  + t_recibis_mp_t_d - t_gastos_mp_t_d;
    var t_total_ma_m_d = t_pagos_ma_m_d  + t_recibis_ma_m_d - t_gastos_ma_m_d;
    var t_total_ma_t_d = t_pagos_ma_t_d  + t_recibis_ma_t_d - t_gastos_ma_t_d;
  
  var descExcel = [];
  var listPagos;
  
  // Crear un nuevo libro de Excel
  var spreadsheet = SpreadsheetApp.create('Datos ' + today);
  var sheet = spreadsheet.getActiveSheet();


//////////////// RECIBIS /////////////////////// 

  for (var i = 2; i < data3.length; i++) {
    var fechaPagoStr = data3[i][7];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

    if (formattedDate === today && "DIGITAL" === data3[i][8]) {
      listPagos6 = [];
      
      listPagos6.push(""); //
      listPagos6.push(""); //
      listPagos6.push(""); //
      listPagos6.push(""); //
      listPagos6.push(""); //
      listPagos6.push(data3[i][7]); // FECHA
      let importeSinSignos = data3[i][4].replace("$", "").replace(".", "");
      listPagos6.push(importeSinSignos) // IMPORTE
      listPagos6.push(data3[i][6] + " / " + data3[i][2]); // PAGUESE + CONCEPTO
      listPagos6.push(""); //
      listPagos6.push(data3[i][3]); // SUCURSAL
      listPagos6.push(data3[i][8]); // MEDIO
      descExcel.push(listPagos6);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos6.length).setValues([listPagos6]);
    }
  }

  for (var i = 2; i < data3.length; i++) {
    var fechaPagoStr = data3[i][7];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

    if (formattedDate === today && "EFECTIVO" === data3[i][8]) {
      listPagos3 = [];
      
      listPagos3.push(""); //
      listPagos3.push(""); //
      listPagos3.push(""); //
      listPagos3.push(""); //
      listPagos3.push(""); //
      listPagos3.push(data3[i][7]); // FECHA
      let importeSinSignos = data3[i][4].replace("$", "").replace(".", "");
      listPagos3.push(importeSinSignos) // IMPORTE
      listPagos3.push(data3[i][6] + " / " + data3[i][2]); // PAGUESE + CONCEPTO
      listPagos3.push(""); //
      listPagos3.push(data3[i][3]); // SUCURSAL
      listPagos3.push(data3[i][8]); // MEDIO
      descExcel.push(listPagos3);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos3.length).setValues([listPagos3]);
    }
  }

// Agregar fila de encabezado "RECIBIS:"
var headersrecibis = ["", "", "", "", "", "FECHA", "IMPORTE", "EN CONCEPTO","","SUCURSAL" , "F.PAGO"];
sheet.insertRowBefore(2).getRange(2, 1, 1, headersrecibis.length).setValues([headersrecibis]);
var headersrecibis2 = ["", "", "", "", "", "RECIBIS DEL DIA:"];
sheet.insertRowBefore(2).getRange(2, 1, 1, headersrecibis2.length).setValues([headersrecibis2]);
sheet.insertRowBefore(2).getRange(2, 1).setValue("");

//////////////// FIN RECIBIS ///////////////////////



////////////////  GASTOS ///////////////////////

 for (var i = 2; i < data2.length; i++) {
    var fechaPagoStr = data2[i][7];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

    if (formattedDate === today && "DIGITAL" === data2[i][8]) {
      listPagos5 = [];

      listPagos5.push(""); //
      listPagos5.push(""); //
      listPagos5.push(""); //
      listPagos5.push(""); //
      listPagos5.push(""); //
      listPagos5.push(data2[i][7]); // FECHA
      let importeSinSignos = data2[i][4].replace("$", "").replace(".", "");
      listPagos5.push(importeSinSignos) // IMPORTE
      listPagos5.push(data2[i][6] + " / " + data2[i][2]); // PAGUESE + CONCEPTO
      listPagos5.push(""); //
      listPagos5.push(data2[i][3]); // SUCURSAL
      listPagos5.push(data2[i][8]); // MEDIO
      descExcel.push(listPagos5);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos5.length).setValues([listPagos5]);
    }
  }


  for (var i = 2; i < data2.length; i++) {
    var fechaPagoStr = data2[i][7];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("-"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

    if (formattedDate === today && "EFECTIVO" === data2[i][8]) {
      listPagos2 = [];

      listPagos2.push(""); //
      listPagos2.push(""); //
      listPagos2.push(""); //
      listPagos2.push(""); //
      listPagos2.push(""); //
      listPagos2.push(data2[i][7]); // FECHA
      let importeSinSignos = data2[i][4].replace("$", "").replace(".", "");
      listPagos2.push(importeSinSignos) // IMPORTE
      listPagos2.push(data2[i][6] + " / " + data2[i][2]); // PAGUESE + CONCEPTO
      listPagos2.push(""); //
      listPagos2.push(data2[i][3]); // SUCURSAL
      listPagos2.push(data2[i][8]); // MEDIO
      descExcel.push(listPagos2);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos2.length).setValues([listPagos2]);
    }
  }

// Agregar fila de encabezado "GASTOS:"

// Agregar fila de encabezado con los valores de la tabla
var headersgastos = ["", "", "", "", "", "FECHA", "IMPORTE", "EN CONCEPTO","","SUCURSAL" , "F.PAGO"];
sheet.insertRowBefore(2).getRange(2, 1, 1, headersgastos.length).setValues([headersgastos]);
var headersgastos2 = ["", "", "", "", "", "GASTOS DEL DIA:"];
sheet.insertRowBefore(2).getRange(2, 1, 1, headersgastos2.length).setValues([headersgastos2]);
sheet.insertRowBefore(2).getRange(2, 1).setValue("");

//////////////// FIN GASTOS ///////////////////////



////////////////  PAGOS ///////////////////////


  for (var i = 1; i < data.length; i++) {
var fechaPagoStr = data[i][6];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("/"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

    if (formattedDate === today && "DIGITAL" === data[i][19]) {
      listPagos4 = [];
      listPagos4.push(data[i][3]);
      listPagos4.push(data[i][5]);
      listPagos4.push(data[i][6]);
      listPagos4.push(data[i][7]);
      listPagos4.push(data[i][9]);
      listPagos4.push(data[i][10]);
      let importeSinSignos = data[i][11].replace("$", "").replace(".", "");
      listPagos4.push(importeSinSignos)
      listPagos4.push(data[i][1]);
      listPagos4.push(data[i][13]);
      listPagos4.push(data[i][16]);
      listPagos4.push(data[i][19]);
      descExcel.push(listPagos4);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos4.length).setValues([listPagos4]);
    }

 }


  for (var i = 1; i < data.length; i++) {
var fechaPagoStr = data[i][6];

  var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio

  var fechaSplit = fechaHoraSplit[0].split("/"); // Dividir la fecha en d�a, mes y a�o

  var day = parseInt(fechaSplit[0], 10);
  var month = parseInt(fechaSplit[1], 10);
  var year = parseInt(fechaSplit[2], 10);

  var formattedDate = day + '/' + month + '/' + year; // Formatea la fecha como "m/d/yyyy" sin ceros innecesarios

        if (formattedDate === today && "EFECTIVO" === data[i][19]) {
      listPagos = [];
      listPagos.push(data[i][3]);
      listPagos.push(data[i][5]);
      listPagos.push(data[i][6]);
      listPagos.push(data[i][7]);
      listPagos.push(data[i][9]);
      listPagos.push(data[i][10]);
      let importeSinSignos = data[i][11].replace("$", "").replace(".", "");
      listPagos.push(importeSinSignos)
      listPagos.push(data[i][1]);
      listPagos.push(data[i][13]);
      listPagos.push(data[i][16]);
      listPagos.push(data[i][19]);
      descExcel.push(listPagos);
      
      // Insertar una nueva fila en la hoja de c�lculo y escribir los datos
      sheet.insertRowBefore(2).getRange(2, 1, 1, listPagos.length).setValues([listPagos]);
    }


  }


// Agregar fila de encabezado con los valores de la tabla
var headerspagos = ["CLIENTE", "F. VENC", "F. PAGO", "CUOTA", "POLIZA", "COMPA�IA", "IMPORTE", "PATENTE", "MARCA", "SUCURSAL", "F.PAGO"];

sheet.insertRowBefore(2).getRange(2, 1, 1, headerspagos.length).setValues([headerspagos]);

// Agregar fila de encabezado "COBROS DEL DIA"
sheet.insertRowBefore(2).getRange(2, 1).setValue("COBROS DEL DIA:");
sheet.insertRowBefore(2).getRange(2, 1).setValue("");
sheet.insertRowBefore(2).getRange(2, 1).setValue("");


//////////////// FIN DE PAGOS ///////////////////////



//////////////// TOTALES DIGITALES ///////////////////////

// Agregar fila de encabezado con los valores de la tabla
var headers_valtotal_d = ["TOTAL:", t_total_mp_m_d, "", "TOTAL:", t_total_mp_t_d, "", "TOTAL:", t_total_ma_m_d, "", "TOTAL:", t_total_ma_t_d, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valtotal_d.length).setValues([headers_valtotal_d]);


// Agregar fila de encabezado con los valores de la tabla
var headers_valrecibis_d = ["RECIBIS:", t_recibis_mp_m_d, "", "RECIBIS:", t_recibis_mp_t_d, "", "RECIBIS:", t_recibis_ma_m_d, "", "RECIBIS:", t_recibis_ma_t_d, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valrecibis_d.length).setValues([headers_valrecibis_d]);


// Agregar fila de encabezado con los valores de la tabla
var headers_valgastos_d = ["GASTOS:", t_gastos_mp_m_d, "", "GASTOS:", t_gastos_mp_t_d, "", "GASTOS:", t_gastos_ma_m_d, "", "GASTOS:", t_gastos_ma_t_d, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valgastos_d.length).setValues([headers_valgastos_d]);



// Agregar fila de encabezado con los valores de la tabla
var headers_valpagos_d = ["PAGOS:", t_pagos_mp_m_d, "", "PAGOS:", t_pagos_mp_t_d, "", "PAGOS:", t_pagos_ma_m_d, "", "PAGOS:", t_pagos_ma_t_d, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valpagos_d.length).setValues([headers_valpagos_d]);

// Agregar fila de encabezado con los valores de la tabla
var headerstotales_d = ["CAJA MA�ANA", "", "", "CAJA TARDE", "", "", "CAJA MA�ANA", "", "", "CAJA TARDE", "", ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headerstotales_d.length).setValues([headerstotales_d]);


// Agregar fila de encabezado con los valores de la tabla
var headerssucu_d = ["CAJA DIGITAL MARCOS PAZ", "", "", "", "", "", "CAJA DIGITAL MARIANO ACOSTA", "", "", "", "", ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headerssucu_d.length).setValues([headerssucu_d]);

sheet.insertRowBefore(2).getRange(2, 1).setValue("");


//////////////// TOTALES EFECTIVO ///////////////////////

// Agregar fila de encabezado con los valores de la tabla
var headers_valtotal = ["TOTAL:", t_total_mp_m, "", "TOTAL:", t_total_mp_t, "", "TOTAL:", t_total_ma_m, "", "TOTAL:", t_total_ma_t, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valtotal.length).setValues([headers_valtotal]);


// Agregar fila de encabezado con los valores de la tabla
var headers_valrecibis = ["RECIBIS:", t_recibis_mp_m, "", "RECIBIS:", t_recibis_mp_t, "", "RECIBIS:", t_recibis_ma_m, "", "RECIBIS:", t_recibis_ma_t, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valrecibis.length).setValues([headers_valrecibis]);



// Agregar fila de encabezado con los valores de la tabla
var headers_valgastos = ["GASTOS:", t_gastos_mp_m, "", "GASTOS:", t_gastos_mp_t, "", "GASTOS:", t_gastos_ma_m, "", "GASTOS:", t_gastos_ma_t, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valgastos.length).setValues([headers_valgastos]);



// Agregar fila de encabezado con los valores de la tabla
var headers_valpagos = ["PAGOS:", t_pagos_mp_m, "", "PAGOS:", t_pagos_mp_t, "", "PAGOS:", t_pagos_ma_m, "", "PAGOS:", t_pagos_ma_t, ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headers_valpagos.length).setValues([headers_valpagos]);

// Agregar fila de encabezado con los valores de la tabla
var headerstotales = ["CAJA MA�ANA", "", "", "CAJA TARDE", "", "", "CAJA MA�ANA", "", "", "CAJA TARDE", "", ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headerstotales.length).setValues([headerstotales]);

// Agregar fila de encabezado con los valores de la tabla
var headerssucu = ["SUCURSAL MARCOS PAZ", "", "", "", "", "", "SUCURSAL MARIANO ACOSTA", "", "", "", "", ""];
sheet.insertRowBefore(2).getRange(2, 1, 1, headerssucu.length).setValues([headerssucu]);

sheet.insertRowBefore(2).getRange(2, 1).setValue("");

//////////////// FIN DE TOTALES ///////////////////////

  var spreadsheetId = spreadsheet.getId(); 
  var file          = DriveApp.getFileById(spreadsheetId);
  var url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?format=xlsx";
  var token         = ScriptApp.getOAuthToken();
  var FECHA = today;  
  var response      = UrlFetchApp.fetch(url, {
    headers: {
      'Authorization': 'Bearer ' +  token
    }
  });

 var fileName = (spreadsheet.getName()) + '.xlsx';
 var blobs   = [response.getBlob().setName(fileName)];

 MailApp.sendEmail("cajagioiapas@gmail.com, cobranzasgioiapas@gmail.com, producciongioiapas@gmail.com", "CAJA DIARIA SISTEMA MAGI WEB - " + FECHA , "[ SISTEMA DE ENVIO DE CAJAS DIARIAS MAGI WEB 1.2 ]" , {attachments: blobs});
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