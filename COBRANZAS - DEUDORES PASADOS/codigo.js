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

function getData(currentDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,25)) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const BD_DEUDORES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pVGmD78jabvGE1sF2GnJV_xQ5asNJEjKGiPKWfsqoDM/edit").getSheetByName("DEUDORES VIGENTES");

  const cobranzasData = BD_COBRANZAS.getDataRange().getDisplayValues();
  const deudoresData = BD_DEUDORES.getDataRange().getDisplayValues();

var currentMonth = currentDate.getMonth()
var currentYear = String(currentDate.getFullYear()).slice(-2);
console.log(currentMonth + "/" + currentYear)
  var sinPendientes = [];

  for (var i = 1; i < deudoresData.length; i++) {
    var deudor = [];
    deudor.push(deudoresData[i][0]); // RECIBO
    deudor.push(deudoresData[i][1]); // PATENTE
    deudor.push(deudoresData[i][2]); // ASEGURADO
    deudor.push(deudoresData[i][3]); // VENCE
    deudor.push(deudoresData[i][4]); // PAGO
    deudor.push(deudoresData[i][5]); // CUOTA
    deudor.push(deudoresData[i][6]); // POLIZA
    deudor.push(deudoresData[i][7]); // CNIA
    deudor.push(deudoresData[i][8]); // IMPORTE

    var patente = deudoresData[i][5]; // PATENTE en columna F

    var encontrado = false;

    for (var j = 1; j < cobranzasData.length; j++) {
      var cobranzaFecha = cobranzasData[j][5]; // PAGO en columna F

      var fechaSplit = cobranzaFecha.split("/"); // Dividir la fecha en día, mes y año

      var paymentMonth = parseInt(fechaSplit[1], 10);
      var paymentYear = fechaSplit[2].slice(-2); // Obtener los últimos dos dígitos del año

if (cobranzasData[j][1] === patente && paymentMonth === currentMonth  && paymentYear === currentYear) {
   console.log("encontrada coincidencia!")
  encontrado = true;
  break;
}

    }

    if (encontrado) {
      deudor.push("PASADO");
    } else {
      deudor.push("SIN PASAR");
    }

    sinPendientes.push(deudor);
  }

  return sinPendientes;
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