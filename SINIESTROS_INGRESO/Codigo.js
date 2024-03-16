
function doGet(){
  var template = HtmlService.createTemplateFromFile('Denuncia');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbzNflcWWVL6bGhBuskR6MvWGrpx-SSgLRLNAJRhnbM-mEFX0aM1sClqMTdZGIrXlk1q/exec"
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}



////////////// INGESAMOS SINIESTRO NUEVO A BD SINIESTRO //////////////////
function siniestroNuevo(infoPatente, infoNumSin, infoFechaSin, infoDNI, infoCliente, infoCnia, infoRiesgo, infoEstado, infoTramite, infoFechaAges, infoTaller, notas1, infoDanos, infoMarca, infoWpp, infoPatente, infoRelato, datosTerceros, infoHoraSin, fecha, infoCalles, infoLocalidad, infoSucursal) {


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
  if (dniIndex !== -1 && infoWpp !== BD_CLIENTES.getRange(dniIndex, 5)) {
    BD_CLIENTES.getRange(dniIndex, 5).setValue(infoWpp);
    BD_CLIENTES.getRange(dniIndex, 9).setValue(new Date());
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
var vehVals = [infoPatente, infoDNI, infoCliente, "BD SINIESTROS", , , infoCnia, ,infoFechaSin,infoFechaSin, "SEGURO NUEVO", , infoMarca, , , infoDanos, , , ]
    LISTADO.insertRowBefore(2).getRange(2, 1, 1, vehVals.length).setValues([vehVals]);
  }

  const BD_SINIESTROS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1iWcnNTYzdTIyIEwGopjHhh_RglbtDK4Yl6kIXCBw4vs/edit")
  var LISTADO_SIN = BD_SINIESTROS.getSheetByName("LISTADO");
  var numeroSin = BD_SINIESTROS.getRange("CARGADORES!D1").getValue() + 1;
  BD_SINIESTROS.getRange("CARGADORES!D1").setValue(numeroSin);

var vehVals = [ infoPatente, infoNumSin, infoFechaSin, infoDNI, infoCliente, infoCnia, ,infoRiesgo, infoEstado, infoTramite, infoFechaAges, infoTaller, notas1, infoDanos, infoMarca, , infoWpp, infoPatente, infoRelato, datosTerceros, infoHoraSin, fecha, infoCalles, infoLocalidad,  ,  , , , numeroSin, infoSucursal];

    LISTADO_SIN.insertRowBefore(2).getRange(2, 1, 1, vehVals.length).setValues([vehVals]);
  }


///////////////////////////////////////////////////////////////////////


//////////////// BUSCAR PATENTE EN BD COBRANZAS ////////////////
function buscarMantenimientos(numeroInventario = "1192774"){
  let mantenimientosRealizados = [];
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS")

  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
console.log("patente: " + numeroInventario)
  mantenimientos.forEach(mantenimiento =>{
    if(mantenimiento[1] === numeroInventario) {
      mantenimientosRealizados.push(mantenimiento);
    }
  })
console.log(mantenimientosRealizados)
  return mantenimientosRealizados;
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
  console.log(valorEncontrado)
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



//////////////// REIMPRIMIR RECIBOS //////////////////////
function getValuesFromSheet(numRecibo) {
  const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const mantenimientos = BD_COBRANZAS.getDataRange().getDisplayValues();
  
  let sourceVals = [];
  for (let i = 0; i < mantenimientos.length; i++) {
    if (mantenimientos[i][0] === numRecibo) {
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
  var content = template.evaluate().getContent();
  return content;
}

function myFunction() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('P12:AE12').activate();
};



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
/////////////////////// SUBIR FOTOS A DRIVE //////////////////////


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


///////////////////////// MOSTRAR FOTOS DE DRIVE //////////////////////////


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
