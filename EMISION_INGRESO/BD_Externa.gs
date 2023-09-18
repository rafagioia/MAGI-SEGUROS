/////////// SISTEMA 3.0 //////////////////////////////////////////////////////////////////////////
  
  ///////////////////////////////////// HTML /////////////////////////////////////////////


/////////// ABRIMOS EL HTML ///////////////
function doGet(){
  var template = HtmlService.createTemplateFromFile('Emision');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbyl4LlA9L2qJOC_o7MR5mkfV1WMyZChEKvimdjq3erUtv7do57XI3grZlomnsYuofs/exec"
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}


////////////// INGESAMOS POLIZA NUEVA A BD EMISION //////////////////
function seguroNuevo(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoRefa, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasFull, infoMotor, infoChasis, infoUsuario, infoHoy) {
  
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("LISTADO");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");

  const VAL_VEH = LISTADO.getDataRange().getDisplayValues();
  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();

var fecha = new Date();

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
  // Si el DNI no existe, agregar una nueva fila a la hoja de clientes
  else {
    var ctesVals = [infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, , infoMail, infoNotascte, new Date()];
    BD_CLIENTES.insertRowBefore(2).getRange(2, 1, 1, ctesVals.length).setValues([ctesVals]);
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
  LISTADO.getRange(patenteIndex, 15).setValue(infoNotasFull);
  LISTADO.getRange(patenteIndex, 16).setValue(infoDanios);
  LISTADO.getRange(patenteIndex, 18).setValue(infoMotor);
  LISTADO.getRange(patenteIndex, 19).setValue(infoChasis);
  LISTADO.getRange(patenteIndex, 5).setValue(infoRefa);
  LISTADO.getRange(patenteIndex, 21).setValue(infoHoy);
  }
  // Si la Patente no existe, agregar una nueva fila a la hoja de polizas
   else {
var vehVals = [infoPatente, infoDNI, infoCliente, infoSucursal, infoRefa, infoImporte, infoCnia, infoPoliza, infoVigencia, infoHasta, infoOperacion, infoCobertura, infoMarca, infoFpago, infoNotasFull, infoDanios, , infoMotor, infoChasis, , infoHoy]
    LISTADO.insertRowBefore(2).getRange(2, 1, 1, vehVals.length).setValues([vehVals]);
  }

}

///////////////////////////////////////////////////////////////////////


//////////////// BUSCAR PATENTE EN BD EMISION ////////////////
function buscarMantenimientos3(patente = "1192774") {
  let mantenimientosRealizados3 = [];
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const mantenimientos3 = LISTADO.getDataRange().getDisplayValues();

  /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos3.forEach(mantenimiento3 =>{

    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento3[0] === patente) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados3.push(mantenimiento3);
    }
  });

  //////////// RETORNAMOS MANTENIMIENTOSREALIZADOS ////////////
  return mantenimientosRealizados3;
}



//////////////// BUSCAR DNI EN BD EMISION ////////////////
function buscarMantenimientos4(numeroInventario2 = "1192774") {
  let mantenimientosRealizados10 = [];
  let mantenimientosRealizados4 = [];
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos7 = BD_CLIENTES.getDataRange().getDisplayValues();

  /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos7.forEach(mantenimiento7 =>{

    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento7[0] === numeroInventario2) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados4.push(mantenimiento7);
    }
  });

let mantenimientosRealizados9 = [];   
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const mantenimientos8 = LISTADO.getDataRange().getDisplayValues();

  //   /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  // mantenimientos8.forEach(mantenimiento8 =>{

  //   /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
  //   if(mantenimiento8[1] === numeroInventario2) {
  //     /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
  //     mantenimientosRealizados9.push(mantenimiento8);
  //   }
  // });


mantenimientos8.forEach(mantenimiento2 => {
  if (mantenimiento2[1] === numeroInventario2 && mantenimiento2[10] !== "ANULACION") {
    let actualizacion_pol2 = []; // Crear un nuevo arreglo para cada vehículo

    actualizacion_pol2.push(mantenimiento2[0]);
    actualizacion_pol2.push(mantenimiento2[12]);
    actualizacion_pol2.push(mantenimiento2[6]);
    actualizacion_pol2.push(mantenimiento2[8]);

    mantenimientosRealizados9.push(actualizacion_pol2);
  }
});

mantenimientosRealizados10.push(mantenimientosRealizados4)
mantenimientosRealizados10.push(mantenimientosRealizados9)
console.log(mantenimientosRealizados10)
  return mantenimientosRealizados10;
}

//////////////////// BUSCAR DNI EN BD MARCOS PAZ ////////////////
function buscarMantenimientos11(numeroInventario2 = "1192774") {
  let mantenimientosRealizados11 = [];
  const BD_MPAZ = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1qeFnZ0_mBy8cyV1GFpF5a09LRVD-7bfDcTnSMcDMUjA/edit").getSheetByName("BD MARCOS PAZ");
  const mantenimientos7 = BD_MPAZ.getDataRange().getDisplayValues();


  /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos7.forEach(mantenimiento7 =>{

    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento7[0] === numeroInventario2) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados11.push(mantenimiento7);
    }
  });

  //////////// RETORNAMOS MANTENIMIENTOSREALIZADOS ////////////

  return mantenimientosRealizados11;
}


//////////// BUSCAR DNI EN BD EMISION (TABLA VEHICULOS) ////////////////
function buscarMantenimientos9(numeroInventario2 = "1192774") {

let mantenimientosRealizados9 = [];   
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const mantenimientos8 = LISTADO.getDataRange().getDisplayValues();

    /////////// USAMOS UN FOREACH PARA RECORRER MANTENIMIENTOS ///////
  mantenimientos8.forEach(mantenimiento8 =>{

    /////// SI EL VALOR DE LA COLUMNA A EN MANTENIMIENTO ES IGUAL AL NUMERO DE INVENTARIO TRAIDO COMO ARGUMENTO, ENTONCES... ///////////
    if(mantenimiento8[1] === numeroInventario2) {
      /////////// HACEMOS PUSH PARA INCORPORARLO A MANTENIMIENTOSREALIZADOS /////////////
      mantenimientosRealizados9.push(mantenimiento8);
    }
  });

  //////////// RETORNAMOS MANTENIMIENTOSREALIZADOS ////////////
  return mantenimientosRealizados9;
}

//////////////// BUSCAR NOMBRE EN BD EMISION ////////////////
function buscarMantenimientos6(numeroInventario = "1192774"){
  let mantenimientosRealizados6 = [];
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const mantenimientos8 = BD_CLIENTES.getDataRange().getDisplayValues();

for (let i = 0; i < mantenimientos8.length; i++) {
  if (mantenimientos8[i][1].includes(numeroInventario)) {
    mantenimientosRealizados6.push(mantenimientos8[i]);
  }
}

  return mantenimientosRealizados6;
}
/////////////////////////////////////////////////////////////////

//////////////////// BUSCAR NOMBRE EN BD MARCOS PAZ ////////////////
function buscarMantenimientos12(numeroInventario = "1192774") {
  const BD_MPAZ = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1qeFnZ0_mBy8cyV1GFpF5a09LRVD-7bfDcTnSMcDMUjA/edit").getSheetByName("BD MARCOS PAZ");
  const mantenimientos7 = BD_MPAZ.getDataRange().getDisplayValues();

  let mantenimientosRealizados12 = [];

for (let i = 0; i < mantenimientos7.length; i++) {
  if (mantenimientos7[i][1].includes(numeroInventario)) {
    mantenimientosRealizados12.push(mantenimientos7);
  }
}

  return mantenimientosRealizados12;
}
/////////////////////////////////////////////////////////////////////


////////// FILTRO VEHICULOS LADO SERVIDOR /////////////
function getData(infoDNI = "") {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const data = LISTADO.getDataRange().getDisplayValues();
  var sinPendientes = [];
  for (var i = 0; i < data.length; i++) {
if ((infoDNI === "" || data[i][1] === infoDNI)) {
    // agrega el código para los valores correspondientes a la tabla
        var sinPend = [];
        sinPend.push(data[i][0]); // PATENTE
        sinPend.push(data[i][12]); // MARCA
        sinPend.push(data[i][6]); // COMPAÑIA
        sinPend.push(data[i][11]); // COBERTURA
        sinPend.push(data[i][5]); // IMPORTE
        sinPend.push(data[i][7]); /// POLIZA
        sinPend.push(data[i][10]); // OPERACION
        sinPend.push(data[i][8]); // VIGENCIA
        sinPend.push(data[i][9]); // HASTA
        sinPend.push(data[i][14]); // NOTAS
        sinPend.push(data[i][15]); // DANIOS
        sinPend.push(data[i][17]); // MOTOR
        sinPend.push(data[i][18]); // CHASIS
        sinPend.push(data[i][4]); // REFA
        sinPendientes.push(sinPend);
      }
    
  }

  console.log(sinPendientes);
  return sinPendientes;
}


function getData2(infoPatente = "") {
  const LISTADO = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("listado");
  const data2 = LISTADO.getDataRange().getDisplayValues();
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
  const data = BD_CLIENTES.getDataRange().getDisplayValues();
  var sinPendientes2 = [];
  
  for (var i = 0; i < data2.length; i++) {
    if (data2[i][0] === infoPatente) {
      var infoDNI = data2[i][1]; // Obtener el valor correspondiente en la columna B
      var infoOP = data2[i][10]; // OPERACION
      break; // Terminar el bucle una vez que se encuentre el valor
    }
  }
  
  for (var i = 0; i < data.length; i++) {
    if (infoDNI === "" || data[i][0] === infoDNI) {
      // Agrega el código para los valores correspondientes a la tabla
      var sinPend = [];
      sinPend.push(data[i][0]); // DNI
      sinPend.push(data[i][1]); // NOMBRE
      sinPend.push(data[i][2]); // DOMICILIO
      sinPend.push(data[i][3]); // LOCALIDAD
      sinPend.push(data[i][4]); // WHATSAPP
      sinPend.push(data[i][6]); // MAIL
      sinPend.push(data[i][7]); // NOTAS CTE
      sinPend.push(infoOP); // OPERACION
      sinPendientes2.push(sinPend);
    }
  }

  console.log(sinPendientes2);
  return sinPendientes2;
}

///////////////////////////// ENVIO MAIL FOTOS //////////////////////////

function sendEmail(photos, pat_len, mar_len, mot_len, cha_len) {
  var emailAddress = "producciongioiapas@gmail.com";
  var subject = pat_len;
    var body = "Adjunto las imágenes capturadas.\n\n" +
              "Patente: " +  pat_len + "\nMarca: " + mar_len +
              "\nMotor: " + mot_len + "\nChasis: " + cha_len ;
              
  var attachments = [];
  for (var i = 0; i < photos.length; i++) {
    var imageData = photos[i].split(",")[1]; // Eliminar el encabezado "data:image/jpeg;base64,"
    var blob = Utilities.newBlob(Utilities.base64Decode(imageData), "image/jpeg", "photo" + (i + 1) + ".jpg");
    attachments.push(blob);
  }
  MailApp.sendEmail({
    to: emailAddress,
    subject: subject,
    body: body,
    attachments: attachments
  });
}


////////////////////////////////////////////////////////////////////
////////////////////////  SESION DE USUARIOS (A)////////////////////////
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