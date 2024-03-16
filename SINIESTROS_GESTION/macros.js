function doGet(){
  var template = HtmlService.createTemplateFromFile('Gestion');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbx4yKbJY68jkGag8_Ywn0OrBFZzYpg6ClYaoH22Q6r8Hwvd6KGiIg_ps5RxQahggEPU/exec";
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}



function modifDatos(valorMod, nuevoValor, tramite_sn) {
  var BD_SINIESTROS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iWcnNTYzdTIyIEwGopjHhh_RglbtDK4Yl6kIXCBw4vs/edit");
  var sheet = BD_SINIESTROS.getSheetByName("LISTADO");
  var dataValues = sheet.getDataRange().getDisplayValues();
  
  console.log(valorMod, nuevoValor, tramite_sn)
  var column;
  switch (valorMod) {
    case 'dni':
      column = 4;
      break;
    case 'nombre':
      column = 5;
      break;
    case 'patente':
      column = 1;
      break;
    case 'marca':
      column = 15;
      break;
    case 'riesgo':
      column = 8;
      break;
    case 'compania':
      column = 6;
      break;
    case 'numSin':
      column = 2;
      break;
    case 'fechaDec':
      column = 22;
      break;
    case 'fechaSin':
      column = 3;
      break;
    case 'hora':
      column = 21;
      break;
    case 'relato':
      column = 19;
      break;
    case 'taller':
      column = 12;
      break;
    case 'wpp':
      column = 17;
      break;
    default:
      column = 0;
      break;
  }

  for (var i = 0; i < dataValues.length; i++) {
    if (dataValues[i][28] == tramite_sn) {
      sheet.getRange(i+1, column).setValue(nuevoValor);
    }
  }
}


function actualizarEstado(estado_sn, tramite_sn, gestion_sn, novedad_sn, usuario_sn, notas_sn,tipotramite_sn, fechaip_sn, taller_sn, notas_old) {
  var BD_SINIESTROS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iWcnNTYzdTIyIEwGopjHhh_RglbtDK4Yl6kIXCBw4vs/edit");
  var sheet = BD_SINIESTROS.getSheetByName("LISTADO");
  var dataValues = sheet.getDataRange().getDisplayValues();
  var fechaActual = new Date().toLocaleString();

  var novedad = novedad_sn;
  var usuario = usuario_sn;
  var notas = notas_sn;
  var tipotramite = tipotramite_sn;
  var agregaTaller = "\n";

  var modificacionEstado = "";
  var modificacionTramite = "";
  var modificacionGestion = "";

  if (estado_sn !== "") {
    modificacionEstado = ". SE MODIFICÓ EL ESTADO A " + estado_sn + "\n";
  }

  if (tipotramite_sn !== "") {
    modificacionTramite = ". SE MODIFICÓ EL TRÁMITE A " + tipotramite_sn + "\n";
  }

  if (gestion_sn !== "") {
    modificacionGestion = ". SE MODIFICÓ LA GESTIÓN AL " + gestion_sn + "\n";
  }

  if (fechaip_sn !== "" || taller_sn !== "") {
    agregaTaller = "INSPECCIÓN PARA EL DIA: " + fechaip_sn + " EN EL TALLER: " + taller_sn + "\n";
  }

  var dataConcatenada = "[" + fechaActual + ": " + novedad + "]\n" + usuario + ": " + notas + modificacionEstado + modificacionTramite + modificacionGestion + agregaTaller + notas_old + "\n";

  console.log(estado_sn, tramite_sn, gestion_sn, dataConcatenada, notas_old);

  for (var i = 0; i < dataValues.length; i++) {
    if (dataValues[i][28] == tramite_sn) { // Columna AC es la columna 29 (28 en base 0)

      if (tipotramite.length > 0) {
        sheet.getRange(i +1, 10).setValue(tipotramite); // Columna J es la columna 10
      }

      if (estado_sn.length > 0) {
        sheet.getRange(i +1, 9).setValue(estado_sn); // Columna I es la columna 9
      }

      if (gestion_sn.length > 0) {
        sheet.getRange(i +1, 11).setValue(gestion_sn); // Columna K es la columna 11
      }
      sheet.getRange(i +1, 13).setValue(dataConcatenada); // Columna M es la columna 13
      break;
    }
  }
}

function getData(cnia_filter = "", riesgo_filter = "", patente_filter = "", dni_filter = "", gestion_filter = "", estado_filter = "", siniestro_filter = "", nombre_filter = "") {
  const BD_SINIESTROS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iWcnNTYzdTIyIEwGopjHhh_RglbtDK4Yl6kIXCBw4vs/edit");
  var data = BD_SINIESTROS.getSheetByName("LISTADO").getDataRange().getDisplayValues();
  var sinPendientes = [];
  for (var i = 0; i < data.length; i++) {
if ((data[i][8] === estado_filter || data[i][8] == "PENDIENTE") && 
    (cnia_filter === "" || data[i][5] === cnia_filter) && 
    (siniestro_filter === "" || data[i][1].includes(siniestro_filter)) && 
    (nombre_filter === "" || data[i][4].includes(nombre_filter)) && 
    (riesgo_filter === "" || data[i][7] === riesgo_filter || 
    (riesgo_filter === "TOTALES" && (data[i][7] === "DEST. TOTAL" || data[i][7] === "ROBO TOTAL" || data[i][7] === "INCENDIO TOTAL")) || 
    (riesgo_filter === "PARCIALES" && (data[i][7] === "RECLAMO 3ROS" || data[i][7] === "CLEAS" || data[i][7] === "COMERCIO"
 || data[i][7] === "DAÑO POR ROBO TOTAL" || data[i][7] === "HOGAR" || data[i][7] === "INCENDIO PARCIAL" || data[i][7] === "INTERASEGURADOS"
 || data[i][7] === "RESP. CIVIL" || data[i][7] === "ROBO PARCIAL" || data[i][7] === "TODO RIESGO" || data[i][7] === "GRANIZO"
 || data[i][7] === "CRISTALES" || data[i][7] === "CERRADURA" || data[i][7] === "ACC. PERS." || data[i][7] === "GRUA" || data[i][7] === "RILLA"))) &&
    (patente_filter === "" || data[i][0] === patente_filter) && 
    (dni_filter === "" || data[i][3] === dni_filter) && 
    (gestion_filter === "" || data[i][10] === gestion_filter)) {
    // agrega el código para los valores correspondientes a la tabla
        var sinPend = [];
        sinPend.push(data[i][0]);
        sinPend.push(data[i][1]);
        sinPend.push(data[i][2]);
        sinPend.push(data[i][3]);
        sinPend.push(data[i][4]);
        sinPend.push(data[i][5]);
        sinPend.push(data[i][7]);
        sinPend.push(data[i][8]);
        sinPend.push(data[i][9]);
        sinPend.push(data[i][10]);
        sinPend.push(data[i][11]);
        sinPend.push(data[i][12]);
        sinPend.push(data[i][13]);
        sinPend.push(data[i][14]);
        sinPend.push(data[i][16]);
        sinPend.push(data[i][18]);
        sinPend.push(data[i][19].replace(/[{}]/g, '').replace(/,/g, '\n').replace(/=/g, ': ').replace(/tercero/g, '\n\n-Tercero'));
        sinPend.push(data[i][20]);
        sinPend.push(data[i][21]);
        sinPend.push(data[i][22]);
        sinPend.push(data[i][23]);
        sinPend.push(data[i][28]);
        sinPendientes.push(sinPend);
      }
    
  }

  console.log(sinPendientes);
  return sinPendientes;
}

function mostrarCorreos(numSin) {
  // Busca los correos electrónicos que contienen el número 820005104 en el asunto
  var query = "subject:" + numSin;
  var threads = GmailApp.search(query);

  // Crea una variable para almacenar el contenido HTML de los correos electrónicos
  var emailsHTML = "";

  // Recorre los primeros diez correos electrónicos que contienen el número 820005104 en el asunto y agrega su contenido HTML a la variable
  for (var i = 0; i < threads.length && i < 10; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      if (message.getSubject().indexOf(numSin) !== -1) {
        var sender = message.getFrom();
        var subject = message.getSubject();
        var body = message.getPlainBody();

        // Agrega estilo visual de Bootstrap al contenido HTML generado
        emailsHTML += "<div class='card mb-3'>";
        emailsHTML += "<div class='card-header'><img src='https://drive.google.com/uc?id=1gx2-28N0e8R5m95gOthbdiz61rBnLu8x' alt='Imagen' style='height: 13px; width: 17px; margin-right: 10px;'><strong>" + sender + ":</strong> " + subject + "</div>";
        emailsHTML += "<div class='card-body'>";
        emailsHTML += "<p class='card-text'>" + body.substring(0, 200) + "...</p>";
        emailsHTML += "</div>";
        emailsHTML += "</div>";
        break; // Detiene el bucle si se encuentra un correo electrónico que contiene el número 820005104 en el asunto
      }
    }
  }

  // Devuelve el contenido HTML de los correos electrónicos que contienen el número 820005104 en el asunto
  return "<div class='container'>" + emailsHTML + "</div>";
}





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




function getData2(cnia_filter = "", riesgo_filter = "", patente_filter = "", dni_filter = "", gestion_filter = "", estado_filter = "", siniestro_filter = "", nombre_filter = "") {
  const BD_SINIESTROS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iWcnNTYzdTIyIEwGopjHhh_RglbtDK4Yl6kIXCBw4vs/edit");
  var data = BD_SINIESTROS.getSheetByName("LISTADO").getDataRange().getDisplayValues();
  var sinPendientes = [];
  for (var i = 0; i < data.length; i++) {
if ((estado_filter === "" || data[i][8] === estado_filter) && 
    (cnia_filter === "" || data[i][5] === cnia_filter) && 
    (siniestro_filter === "" || data[i][1].includes(siniestro_filter)) && 
    (nombre_filter === "" || data[i][4].includes(nombre_filter)) && 
    (riesgo_filter === "" || data[i][7] === riesgo_filter || 
    (riesgo_filter === "TOTALES" && (data[i][7] === "DEST. TOTAL" || data[i][7] === "ROBO TOTAL" || data[i][7] === "INCENDIO TOTAL")) || 
    (riesgo_filter === "PARCIALES" && (data[i][7] === "RECLAMO 3ROS" || data[i][7] === "CLEAS" || data[i][7] === "COMERCIO"
 || data[i][7] === "DAÑO POR ROBO TOTAL" || data[i][7] === "HOGAR" || data[i][7] === "INCENDIO PARCIAL" || data[i][7] === "INTERASEGURADOS"
 || data[i][7] === "RESP. CIVIL" || data[i][7] === "ROBO PARCIAL" || data[i][7] === "TODO RIESGO" || data[i][7] === "GRANIZO"
 || data[i][7] === "CRISTALES" || data[i][7] === "CERRADURA" || data[i][7] === "ACC. PERS." || data[i][7] === "GRUA" || data[i][7] === "RILLA"))) &&
    (patente_filter === "" || data[i][0] === patente_filter) && 
    (dni_filter === "" || data[i][3] === dni_filter) && 
    (gestion_filter === "" || data[i][10] === gestion_filter)) {
    // agrega el código para los valores correspondientes a la tabla
        var sinPend = [];
        sinPend.push(data[i][0]);
        sinPend.push(data[i][1]);
        sinPend.push(data[i][2]);
        sinPend.push(data[i][3]);
        sinPend.push(data[i][4]);
        sinPend.push(data[i][5]);
        sinPend.push(data[i][7]);
        sinPend.push(data[i][8]);
        sinPend.push(data[i][9]);
        sinPend.push(data[i][10]);
        sinPend.push(data[i][11]);
        sinPend.push(data[i][12]);
        sinPend.push(data[i][13]);
        sinPend.push(data[i][14]);
        sinPend.push(data[i][16]);
        sinPend.push(data[i][18]);
        sinPend.push(data[i][19].replace(/[{}]/g, '').replace(/,/g, '\n').replace(/=/g, ': ').replace(/tercero/g, '\n\n-Tercero'));
        sinPend.push(data[i][20]);
        sinPend.push(data[i][21]);
        sinPend.push(data[i][22]);
        sinPend.push(data[i][23]);
        sinPend.push(data[i][28]);
        sinPendientes.push(sinPend);
      }
    
  }

  console.log(sinPendientes);
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