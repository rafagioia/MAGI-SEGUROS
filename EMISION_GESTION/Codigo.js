function doGet(){
  var template = HtmlService.createTemplateFromFile('Polizas');
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
      var celda = sheet.getRange(i + 1, column);
      const valorAntiguo = celda.getValue();
      celda.setValue(nuevoValor);
      console.log("Campo Modificado:", valorMod, "Valor Antiguo:", valorAntiguo, "Valor Nuevo:", nuevoValor);
    }
  }



  // for (var i = 0; i < dataValues.length; i++) {
  //   if (dataValues[i][28] == tramite_sn) {
  //     sheet.getRange(i+1, column).setValue(nuevoValor);
  //   }
  // }


  var folderId = '1jnTshNxU1QzCRPSpmS38bDXJJE_CwhSM'; // Reemplaza con el ID de la carpeta de Google Drive donde deseas guardar los registros.
  var folder = DriveApp.getFolderById(folderId);

  var fileName = 'log_emision_endosos.txt'; // Nombre fijo del archivo de registro
  var files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    var file = files.next();
    var contenidoActual = file.getBlob().getDataAsString();
    contenidoActual += '\n' +  "[ " + infoHoy + " ] //" + infoUsuario + ": ENDOSO:\nCampo Modificado:", valorMod, "Valor Antiguo:", valorAntiguo, "Valor Nuevo:", nuevoValor
    file.setContent(contenidoActual);
  } else {
    // Si el archivo no existe, créalo con el mensaje actual
    folder.createFile(fileName, vehVals);
  }


}



function getData(cnia_filter = "", patente_filter = "", dni_filter = "", estado_filter, nombre_filter = "") {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const data = LISTADO.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const data2 = BD_CLIENTES.getDataRange().getDisplayValues();

  var sinPendientes = [];
  for (var i = 1; i < data.length; i++) {
    if ((data[i][10] === estado_filter || data[i][10] == "PENDIENTE" || estado_filter === "" ) && 
    (cnia_filter === "" || data[i][6] === cnia_filter) && 
    (nombre_filter === "" || data[i][2].includes(nombre_filter)) &&
    (patente_filter === "" || data[i][0].includes(patente_filter)) && 
    (dni_filter === "" || data[i][1] === dni_filter))
     {
      var sinPend = [];
      sinPend.push(data[i][0]); // PATENTE
      sinPend.push(data[i][1]); // DNI
      sinPend.push(data[i][2]); // NOMBRE
      sinPend.push(data[i][3]); // SUCURSAL
      sinPend.push(data[i][5]); // IMPORTE
      sinPend.push(data[i][6]); // COMPAÑIA
      sinPend.push(data[i][7]); // POLIZA
      sinPend.push(data[i][8]); // DESDE
      sinPend.push(data[i][9]); // HASTA
      sinPend.push(data[i][10]); // OPERACION
      sinPend.push(data[i][11]); // COBERTURA
      sinPend.push(data[i][12]); // MARCA
      sinPend.push(data[i][13]); // F PAGO
      sinPend.push(data[i][14]); // OBSERVACIONES
      sinPend.push(data[i][15]); // DAÑOS
      sinPend.push(data[i][17]); // MOTOR
      sinPend.push(data[i][18]); // CHASIS
      
      for (var j = 0; j < data2.length; j++) {
        if (data2[j][0] === data[i][1]) {
          sinPend.push(data2[j][2]); // DOMICILIO
          sinPend.push(data2[j][3]); // LOCALIDAD
          sinPend.push(data2[j][4]); // WHATSAPP
          sinPend.push(data2[j][6]); // MAIL
          sinPend.push(data2[j][7]); // NOTAS CTE
        }
      }
      
      sinPendientes.push(sinPend);
    }
  }

  console.log(sinPendientes);
  return sinPendientes;
}

function actualizarEstado(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old) {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const dataValues = LISTADO.getDataRange().getDisplayValues();
console.log(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old)


  var fechaActual = new Date().toLocaleString();

  var novedad = novedad_sn;
  var usuario = usuario_sn;
  var notas = notas_sn;
  
  var modificacionEstado = "";

  if (operacion_sn !== "") {
    modificacionEstado = "\nSe modificó el estado de la poliza N°: " + poliza_sn + " a: " + novedad_sn + "\n";
  }

  var dataConcatenada = "[" + fechaActual + ": " + novedad + "]\n" + usuario + ": " + notas + modificacionEstado + notas_old;

  for (var i = 0; i < dataValues.length; i++) {
    if (dataValues[i][0] == patente_sn) { 

      if (operacion_sn.length > 0) {
        LISTADO.getRange(i +1, 11).setValue(operacion_sn); 
      }
      if (poliza_sn.length > 0) {
        LISTADO.getRange(i +1, 8).setValue(poliza_sn); 
      }

      LISTADO.getRange(i +1, 15).setValue(dataConcatenada); 
      break;
    }
  }
}

function mostrarCorreos(patente) {
  // Busca los correos electrónicos que contienen el número 820005104 en el asunto
  var query = "subject:" + patente;
  var threads = GmailApp.search(query);

  // Crea una variable para almacenar el contenido HTML de los correos electrónicos
  var emailsHTML = "";

  // Recorre los primeros diez correos electrónicos que contienen el número 820005104 en el asunto y agrega su contenido HTML a la variable
  for (var i = 0; i < threads.length && i < 10; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      if (message.getSubject().indexOf(patente) !== -1) {
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




////////////// INGESAMOS POLIZA NUEVA A BD EMISION //////////////////
function modNueva(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasVeh, infoMotor, infoChasis, infoPatentev, infoUsuario) {

  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("LISTADO");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");

  const VAL_VEH = LISTADO.getDataRange().getDisplayValues();
  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();

const cl_new = [infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte]
const veh_new = [infoPatente, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta,   infoMotor, infoChasis]


var fechaHoy = new Date();
    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
    let anio = fechaHoy.getFullYear();
    let infoHoy = dia + '/' + mes + '/' + anio;

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
  }
  // Si el DNI no existe, no hace nada
  else {
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
  LISTADO.getRange(patenteIndex, 1).setValue(infoPatentev);
  LISTADO.getRange(patenteIndex, 2).setValue(infoDNI);
  LISTADO.getRange(patenteIndex, 3).setValue(infoCliente);
  LISTADO.getRange(patenteIndex, 4).setValue(infoSucursal);
  LISTADO.getRange(patenteIndex, 6).setValue(infoImporte);
  LISTADO.getRange(patenteIndex, 7).setValue(infoCnia);
  LISTADO.getRange(patenteIndex, 8).setValue(infoPoliza);
  LISTADO.getRange(patenteIndex, 9).setValue(infoVigencia);
  LISTADO.getRange(patenteIndex, 10).setValue(infoHasta);
  LISTADO.getRange(patenteIndex, 11).setValue(infoOperacion);
  LISTADO.getRange(patenteIndex, 12).setValue(infoCobertura);
  LISTADO.getRange(patenteIndex, 13).setValue(infoMarca);
  LISTADO.getRange(patenteIndex, 14).setValue(infoFpago);
  LISTADO.getRange(patenteIndex, 15).setValue(infoNotasVeh);
  LISTADO.getRange(patenteIndex, 16).setValue(infoDanios);
  LISTADO.getRange(patenteIndex, 18).setValue(infoMotor);
  LISTADO.getRange(patenteIndex, 19).setValue(infoChasis);
  }
  // Si la Patente no existe, no hace nada.
   else {
  }

  var folderId = '1jnTshNxU1QzCRPSpmS38bDXJJE_CwhSM'; // Reemplaza con el ID de la carpeta de Google Drive donde deseas guardar los registros.
  var folder = DriveApp.getFolderById(folderId);

  var fileName = 'log_emision_endosos.txt'; // Nombre fijo del archivo de registro
  var files = folder.getFilesByName(fileName);

  if (files.hasNext()) {
    var file = files.next();
    var contenidoActual = file.getBlob().getDataAsString();
    contenidoActual += '\n' +  "[ " + infoHoy + " ] //" + infoUsuario + ": ENDOSO:\nCliente: " + cl_new + "\nVehiculo: " + veh_new
    file.setContent(contenidoActual);
  } else {
    // Si el archivo no existe, créalo con el mensaje actual
    folder.createFile(fileName, vehVals);
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


