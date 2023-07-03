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

// function getData(currentDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,25)) {
function getData(currentDate = new Date(new Date().getFullYear(),6,25)) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");

  const cobranzasData = BD_COBRANZAS.getDataRange().getDisplayValues();
  const deudoresData = BD_DEUDORES.getDataRange().getDisplayValues();

var currentMonth = currentDate.getMonth();
var currentYear = String(currentDate.getFullYear()).slice(-2);
var currentYear2 = currentDate.getFullYear();

  var sinPendientes = [];
  for (var i = 1; i < deudoresData.length; i++) {
    var deudor = [];

let vto_day = parseInt(deudoresData[i][8].split("/")[0], 10)
var vto_month = parseInt(deudoresData[i][8].split("/")[1], 10);
var vto_year = parseInt(deudoresData[i][8].split("/")[2], 10);
var cuota_div = parseInt(deudoresData[i][7], 10);

// var valor_cuota = currentMonth - vto_month + 1;
// valor_cuota = ((valor_cuota - 1) % cuota_div) + 1;

var valor_cuota = ((currentYear2 - vto_year) * 12 + currentMonth - vto_month + 1) % cuota_div;
if (valor_cuota <= 0) {
  valor_cuota += cuota_div;
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

let patente = deudoresData[i][3]
    for (var j = 1; j < cobranzasData.length; j++) {

if (cobranzasData[j][1] === patente) {
      deudor[13] = cobranzasData[j][4]; // WPP
      deudor[14] = cobranzasData[j][9]; // POLIZA
      deudor[15] = cobranzasData[j][0]; // RECIBO
      var cobranzaFecha = cobranzasData[j][5]; // PAGO en columna F
      var fechaSplit = cobranzaFecha.split("/"); // Dividir la fecha en día, mes y año
      var paymentMonth = parseInt(fechaSplit[1], 10);
      var paymentYear = fechaSplit[2].slice(-2); // Obtener los últimos dos dígitos del año

  if (paymentMonth === currentMonth && paymentYear === currentYear) {
        deudor[10] = "✔️";
      }
      if (valor_cuota == 1) {
        deudor[11] = "RENOV"
      } else {
      deudor[11] = parseInt(cobranzasData[j][11].replace("$", "").replace(".", "")); // IMPORTE
      }
} 
    }

    sinPendientes.push(deudor);
  }
  
  return sinPendientes;
}

/////////////// INGRESAR DEUDOR /////////////////////


function pagoNuevo(infoDNI, infoCliente, infoWpp, infoPatente, infoMarca, infoPoliza, infoCnia, infoCuota, infoVigencia, infoImporte, infoVence) {

let f_deudor = '=IF(vlookup(B2;indirect("B:F");5;false)=F2; IF(F2>EDATE(now();-2);IF(edate(F2;1)<now(); if(month(vlookup(B2;indirect("B:F");5;false))>month(edate(now();-1));"";"Poliza con Deuda");"");"");"")';

  var spreadsheetId = "1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA";
  var sheetName = "BD COBRANZAS";
  var sheetRegistro2 = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  var fecha = new Date();
  var sucursal = "BD DEUDORES";

    var numeroRecibo = sheetRegistro2.getRange("CARGADORES!T5").getValue() + 1;
    sheetRegistro2.getRange("CARGADORES!T5").setValue(numeroRecibo);
    var recibo = numeroRecibo;

    var sourceVals = [recibo, infoPatente, infoDNI, infoCliente, infoWpp, infoVence, fecha, infoCuota, infoVigencia, infoPoliza, infoCnia, infoImporte, infoPatente, infoMarca, , , sucursal, f_deudor, , "DEUDOR"];
    sheetRegistro2.insertRowBefore(2).getRange(2, 1, 1, sourceVals.length).setValues([sourceVals]);

    return recibo;
  }

//////////////////////////////////////////////////////


    

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