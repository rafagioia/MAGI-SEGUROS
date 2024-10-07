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

function getData(cmonth = new Date().getMonth(), cyear = new Date().getFullYear()) {
  const BD_DEUDORES_C = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("BD DEUDORES");
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");

  const cobranzasData = BD_DEUDORES_C.getDataRange().getDisplayValues();
  const deudoresData = BD_DEUDORES.getDataRange().getDisplayValues();

  var currentDate = new Date(cyear, cmonth, 25);
  var currentMonth = currentDate.getMonth() + 1; // Sumar 1 al mes obtenido
  var currentYear = String(currentDate.getFullYear()).slice(-2);
  var currentYear2 = currentDate.getFullYear();

  var sinPendientes = [];
  for (var i = 1; i < deudoresData.length; i++) {

    var fechaDesde = deudoresData[i][8]; // Fecha Desde (Columna I)
    var fechaDesdeSplit = fechaDesde.split("/");
    var deudorDesdeMonth = fechaDesdeSplit.length > 1 ? parseInt(fechaDesdeSplit[1], 10) : 0;
    var deudorDesdeYear = fechaDesdeSplit.length > 2 ? fechaDesdeSplit[2].slice(-2) : 0;

    var fechaMayorDesde = fechaDesde && (deudorDesdeYear < currentYear || (deudorDesdeYear === currentYear && deudorDesdeMonth-1 < currentMonth));

    var fechaHasta = deudoresData[i][9]; // Fecha Hasta (Columna J)
    var fechaHastaSplit = fechaHasta.split("/");
    var deudorHastaMonth = fechaHastaSplit.length > 1 ? parseInt(fechaHastaSplit[1], 10) : 0;
    var deudorHastaYear = fechaHastaSplit.length > 2 ? fechaHastaSplit[2].slice(-2) : 0;

    var fechaMayor = fechaHasta && (deudorHastaYear > currentYear || (deudorHastaYear === currentYear && deudorHastaMonth+1 > currentMonth));
    if ((!fechaHasta || fechaMayor) && fechaMayorDesde) {
      var deudor = [];
      
      let vto_day = parseInt(deudoresData[i][8].split("/")[0], 10);
      var vto_month = parseInt(deudoresData[i][8].split("/")[1], 10);
      var vto_year = parseInt(deudoresData[i][8].split("/")[2], 10);


var cuota_div = parseInt(deudoresData[i][7], 10);
var valor_cuota;

if (cuota_div === 10) {
  var total_meses = ((currentYear2 - vto_year) * 12 + currentMonth - vto_month);
  var meses_desde_inicio = total_meses % 12;

  if (meses_desde_inicio >= 0 && meses_desde_inicio < cuota_div) {
    valor_cuota = (meses_desde_inicio % cuota_div) + 1;
  } else {
    valor_cuota = 0;
  }
} else {
  valor_cuota = ((currentYear2 - vto_year) * 12 + currentMonth - vto_month + 1) % cuota_div;
  if (valor_cuota <= 0) {
    valor_cuota += cuota_div;
  }
}

      deudor.push(deudoresData[i][0]); // ID DEUDOR
      deudor.push(deudoresData[i][2]); // CLIENTE
      deudor.push(deudoresData[i][3]); // PATENTE
      deudor.push(deudoresData[i][4]); // VEHICULO
      deudor.push(deudoresData[i][5]); // COMPAÑIA
      deudor.push(valor_cuota); // CUOTA
      deudor.push(deudoresData[i][7]); // VIGENCIA
      deudor.push(vto_day + "/" + currentMonth + "/" + currentYear); // VENCE
      deudor.push(deudoresData[i][9]); // DEUDOR HASTA
      deudor.push(deudoresData[i][10]); // NOTAS
      deudor.push("❌"); // PASADOS
      deudor.push(""); // IMPORTE
      deudor.push(deudoresData[i][1]); // DNI
      deudor.push(""); // WPP
      deudor.push(""); // POLIZA
      deudor.push(""); // RECIBO
      deudor.push(""); // PASADO


let patente = deudoresData[i][3];

for (var j = cobranzasData.length - 1; j >= 1; j--) {
    if (valor_cuota == 1 && deudor[10] == "❌") {
        deudor[11] = ""; // IMPORTE
    } else if (valor_cuota == 0 && deudor[10] == "❌") {
        deudor[11] = "DESCANSO"; //
    } else {
      var vto_month2 = parseInt(cobranzasData[j][5].split("/")[1], 10);
    var vto_year2 = parseInt(cobranzasData[j][5].split("/")[2], 10);
    var ct_year2 = parseInt(String(currentYear2).slice(-2), 10);

    if (cobranzasData[j][1] === patente && ((vto_month2 === currentMonth - 1 && vto_year2 === ct_year2) || 
        (vto_month2 === 12 && currentMonth === 1 && vto_year2 === ct_year2 - 1))) {
        console.log("vto mes: " + vto_month2 + ", mes actual: " + (currentMonth - 1) + ", ya está: " + (vto_year2 + ct_year2));
        deudor[13] = cobranzasData[j][4]; // WPP
        deudor[14] = cobranzasData[j][9]; // POLIZA
        deudor[11] = parseInt(cobranzasData[j][11].replace("$", "").replace(",", "")); // IMPORTE
    }
    }

    
}

      for (var j = 1; j < cobranzasData.length; j++) {

        if (cobranzasData[j][1] === patente) {
          deudor[13] = cobranzasData[j][4]; // WPP
          deudor[14] = cobranzasData[j][9]; // POLIZA
          var cobranzaFecha = cobranzasData[j][5]; // PAGO en columna F
          var fechaSplit = cobranzaFecha.split("/"); // Dividir la fecha en día, mes y año
          var paymentMonth = parseInt(fechaSplit[1], 10);
          var paymentYear = fechaSplit[2].slice(-2); // Obtener los últimos dos dígitos del año
            // if ((paymentMonth === currentMonth - 1 && paymentYear === currentYear) || 
            //         (paymentMonth === 12 && currentMonth === 1 && paymentYear === currentYear - 1)) {
            // deudor[11] = parseInt(cobranzasData[j][11].replace("$", "").replace(",", "")); // IMPORTE
            // }
          if (paymentMonth === currentMonth && paymentYear === currentYear) {
            deudor[10] = "✔️";
            deudor[15] = cobranzasData[j][0]; // RECIBO
            deudor[16] = cobranzasData[j][18]; // PASADO
            deudor[11] = parseInt(cobranzasData[j][11].replace("$", "").replace(",", "")); // IMPORTE
          }
          }
        } 
      sinPendientes.push(deudor);
    }
  }

    return sinPendientes;
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


///////////////////// ALTA NUEVA DEUDOR /////////////////

function mod_nuevadeudor(modVto, modID_Deudor, modVigencia, modCnia, modMarca, modPatente, modCliente, modDNI, modAnulaPol, modPatente_b) {
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");
  const lastRow = sheet.getLastRow(); 

  if (modVigencia !== "" || modVto !== "" || modAnulaPol !== "") {
    for (let i = lastRow; i >= 2; i--) {
      let patenteCell = sheet.getRange(i, 4).getValue(); 
      if (patenteCell === modPatente_b) {  // Cambié `patente` por `modPatente`
        sheet.getRange(i, 10).setValue(modAnulaPol); 
        break;
      }
    }

    var vehVals = [modID_Deudor, modDNI, modCliente, modPatente, modMarca, modCnia, "1", modVigencia, modVto];  // Corrección de array sin valores vacíos

    sheet.appendRow(vehVals);
  }



  if (modVigencia === "" && modVto === "" && modAnulaPol === "") {

      for (let i = lastRow; i >= 2; i--) {
    let patenteCell = sheet.getRange(i, 4).getValue();
    if (patenteCell === modPatente) {  // Cambié `patente` por `modPatente`
      sheet.getRange(i, 1).setValue(modID_Deudor); 
      sheet.getRange(i, 2).setValue(modDNI); 
      sheet.getRange(i, 3).setValue(modCliente); 
      sheet.getRange(i, 4).setValue(modPatente); 
      sheet.getRange(i, 5).setValue(modMarca); 
      sheet.getRange(i, 6).setValue(modCnia); 
      break;
    }
  }

  }





  return modDNI;
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

////////////// BUSCAR DEUDOR //////////////

function buscarDeudorPorPatente(patente) {
  const sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");
  const lastRow = sheet.getLastRow(); // Obtener la última fila con datos
  const data = sheet.getRange(2, 1, lastRow - 1, 11).getValues(); // Obtener todas las filas y columnas relevantes
  
  let resultado = null;

  // Recorrer todas las filas
  for (let i = 0; i < data.length; i++) {
    let fila = data[i];
    let patenteFila = fila[3];
    
    if (patenteFila === patente) {
      resultado = {
        dni: fila[1], 
        cliente: fila[2], 
        patente: fila[3], 
        marca: fila[4],  
        compania: fila[5],  
        id_deudor: fila[0]
        // vigencia: fila[7]  
      };
      break; // Salir del bucle una vez que se encuentre la patente
    }
  }

  return resultado; // Devolver los datos al cliente
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