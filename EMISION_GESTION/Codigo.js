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

function getData(cnia_filter = "", patente_filter = "", dni_filter = "", estado_filter, nombre_filter = "") {
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
    const BD_VEHICULOS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/17FkXB8az__L819hlpT09J46uX24OWV5kH2_ilJY9u-0/edit").getSheetByName("BD_VEHICULOS");
    const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");
  const dataPol = BD_POLIZAS.getDataRange().getDisplayValues();
  const dataCli = BD_CLIENTES.getDataRange().getDisplayValues();
  const dataVeh = BD_VEHICULOS.getDataRange().getDisplayValues();
  const dataCob = BD_COBRANZAS.getDataRange().getDisplayValues();

  var sinPendientes = [];
  for (var i = 1; i < dataPol.length; i++) {
    if ((dataPol[i][10] === estado_filter || dataPol[i][10] == "PENDIENTE" || estado_filter === "" ) && 
    (cnia_filter === "" || dataPol[i][6] === cnia_filter) && 
    (nombre_filter === "" || dataPol[i][2].includes(nombre_filter)) &&
    (patente_filter === "" || dataPol[i][0].includes(patente_filter)) && 
    (dni_filter === "" || dataPol[i][1] === dni_filter))
     {
      var sinPend = [];
      sinPend.push(dataPol[i][0]); // PATENTE
      sinPend.push(dataPol[i][1]); // DNI
      sinPend.push(dataPol[i][2]); // NOMBRE
      sinPend.push(dataPol[i][3]); // SUCURSAL
      sinPend.push(dataPol[i][5]); // IMPORTE
      sinPend.push(dataPol[i][6]); // COMPAÑIA
      sinPend.push(dataPol[i][7]); // POLIZA
      sinPend.push(dataPol[i][8]); // DESDE
      sinPend.push(dataPol[i][9]); // HASTA
      sinPend.push(dataPol[i][10]); // OPERACION
      sinPend.push(dataPol[i][11]); // COBERTURA
      sinPend.push(dataPol[i][12]); // MARCA
      sinPend.push(dataPol[i][13]); // F PAGO
      sinPend.push(dataPol[i][4]); // REFACTURACIONES
      sinPend.push(i); // INDICE DE LA POLIZA
      sinPend.push(dataPol[i][18]); // REFA DESDE
      sinPend.push(dataPol[i][19]); // REFA HASTA
       
      for (var j = 0; j < dataCli.length; j++) {
        if (dataCli[j][0] === dataPol[i][1]) {
          sinPend.push(dataCli[j][2]); // DOMICILIO
          sinPend.push(dataCli[j][3]); // LOCALIDAD
          sinPend.push(dataCli[j][4]); // WHATSAPP
          sinPend.push(dataCli[j][6]); // MAIL
          sinPend.push(dataCli[j][7]); // NOTAS CTE
          sinPend.push(dataCli[j][9]); // ESTADO
        }
      }
      
      for (var k = 0; k < dataVeh.length; k++) {
        if (dataVeh[k][0] === dataPol[i][0]) {
          sinPend.push(dataVeh[k][2]); // AÑO
          sinPend.push(dataVeh[k][3]); // TIPO
          sinPend.push(dataVeh[k][4]); // MOTOR
          sinPend.push(dataVeh[k][5]); // CHASIS
          sinPend.push(dataVeh[k][6]); // COLOR
          sinPend.push(dataVeh[k][7]); // SUMA ASEG
          sinPend.push(dataVeh[k][8]); // ACCESORIO
          sinPend.push(dataVeh[k][9]); // VTV
          sinPend.push(dataVeh[k][10]); // NOTAS
          sinPend.push(dataVeh[k][11]); // DAÑOS
        }
      }
          

var resultadosEncontrados = 0;
let fechanext = '';
let imp_next = '';

// Función para incrementar un mes en una fecha
function incrementarMes(fechaStr) {
  // Convertir la fecha en un objeto Date
  let [dia, mes, anio] = fechaStr.split('/').map(Number);
  // Ajustar el año para que sea completo
  anio += 2000;
  
  let fecha = new Date(anio, mes - 1, dia); // Meses en JS van de 0 a 11
  fecha.setMonth(fecha.getMonth() + 1); // Incrementar un mes
  
  // Formatear la fecha de vuelta en DD/MM/YY
  dia = fecha.getDate().toString().padStart(2, '0');
  mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  anio = fecha.getFullYear().toString().slice(-2);
  
  return `${dia}/${mes}/${anio}`;
}

// Primer bucle
for (var l = 0; l < dataCob.length; l++) {
  if (dataCob[l][1] === dataPol[i][0] && (dataCob[l][5] >= dataPol[i][18] && dataCob[l][5] < dataPol[i][19])) {
    // Agrega los valores que encuentras
    sinPend.push(dataCob[l][5]); // VTO1
    sinPend.push(dataCob[l][6]); // F.PAGO
    sinPend.push(dataCob[l][7]); // CUOTA
    sinPend.push(dataCob[l][11]); // IMPORTE

    // Guarda el valor para usarlo en el siguiente bucle
    fechanext = dataCob[l][5];
    imp_next = dataCob[l][11];

    // Incrementa el contador de resultados
    resultadosEncontrados++;
  }
}

// Segundo bucle
for (let m = resultadosEncontrados; m < dataPol[i][4]; m++) {
  let nextcuot = m + 1; // CUOTA, incrementando en cada iteración

  // Incrementa la fecha en un mes
  fechanext = incrementarMes(fechanext);

  sinPend.push(fechanext); // VTO2 DD/MM/YY
  sinPend.push('PENDIENTE'); // F.PAGO
  sinPend.push(nextcuot); // CUOTA
  sinPend.push(imp_next); // IMPORTE (vacío o puedes poner un valor por defecto)
}


for (let n = 0; n < 12 - dataPol[i][4]; n++) {
  sinPend.push(''); // VTO
  sinPend.push(''); // F.PAGO
  sinPend.push(''); // CUOTA
  sinPend.push(''); // IMPORTE (vacío o puedes poner un valor por defecto)
}

      sinPend.push(dataPol[i][20]); // VIGENCIA TOTAL

      sinPendientes.push(sinPend);
    }
  }

  return sinPendientes;
}


function actualizarEstado(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old, indexPol) {
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const dataValues = BD_POLIZAS.getDataRange().getDisplayValues();
  
  var fechaActual = new Date().toLocaleString();
  var novedad = novedad_sn;
  var usuario = usuario_sn;
  var notas = notas_sn;
  var modificacionEstado = "";

  if (operacion_sn !== "") {
    modificacionEstado = "\nSe modificó el estado de la poliza N°: " + poliza_sn + " a: " + novedad_sn + "\n";
  }

  var dataConcatenada = "[" + fechaActual + ": " + novedad + "]\n" + usuario + ": " + notas + modificacionEstado + notas_old;

  // Bucle de abajo hacia arriba
  for (var i = dataValues.length - 1; i >= 0; i--) {
    if (i == indexPol) { 
      if (operacion_sn.length > 0) {
        BD_POLIZAS.getRange(i + 1, 11).setValue(operacion_sn); 
      }
      if (poliza_sn.length > 0) {
        BD_POLIZAS.getRange(i + 1, 8).setValue(poliza_sn); 
      }

      BD_POLIZAS.getRange(i + 1, 15).setValue(dataConcatenada); 
      break; // Detener el bucle al encontrar el valor
    }
  }
}





////////////// INGESAMOS POLIZA NUEVA A BD EMISION //////////////////
// function modNueva(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoPatente, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasVeh, infoMotor, infoChasis, infoNotasPol, infoTipo, infoColor, infoSuma, infoAnio, infoAccesorio, infoVTV, infoPatentev, infoUsuario, infoCalifica, infoRefaDesde, infoRefaHasta) {

//   const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
//   const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
//     const BD_VEHICULOS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/17FkXB8az__L819hlpT09J46uX24OWV5kH2_ilJY9u-0/edit").getSheetByName("BD_VEHICULOS");
//   const VAL_VEH = BD_VEHICULOS.getDataRange().getDisplayValues();
//   const VAL_POL = BD_POLIZAS.getDataRange().getDisplayValues();
//   const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();
//     let fechaHoy = new Date();
//     let dia = fechaHoy.getDate();
//     let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
//     let anio = fechaHoy.getFullYear().toString().slice(-2); // Obtener los últimos 2 dígitos del año

//     // Agregar un cero inicial si el día o el mes es menor a 10
//     dia = dia < 10 ? '0' + dia : dia;
//     mes = mes < 10 ? '0' + mes : mes;

//      let infoHoy = dia + '/' + mes + '/' + anio;


//  // Buscar si el DNI ya existe en la hoja de clientes
//   let dniIndex = -1;
//   for (let i = 0; i < VAL_CTE.length; i++) {
//     if (VAL_CTE[i][0] === infoDNI) {
//       dniIndex = i + 1;
//       break;
//     }
//   }

//   // Si el DNI ya existe, actualizar los datos del cliente
//   if (dniIndex !== -1) {
//     BD_CLIENTES.getRange(dniIndex, 2).setValue(infoCliente);
//     BD_CLIENTES.getRange(dniIndex, 3).setValue(infoDomicilio);
//     BD_CLIENTES.getRange(dniIndex, 4).setValue(infoLocalidad);
//     BD_CLIENTES.getRange(dniIndex, 5).setValue(infoWpp);
//     BD_CLIENTES.getRange(dniIndex, 7).setValue(infoMail);
//     BD_CLIENTES.getRange(dniIndex, 8).setValue(infoNotascte);
//     BD_CLIENTES.getRange(dniIndex, 9).setValue(new Date());
//     BD_CLIENTES.getRange(dniIndex, 10).setValue(infoCalifica);
//   }
//   // Si el DNI no existe, no hace nada
//   else {
//   }


//  // Buscar si el Patente ya existe en la hoja de Polizas
//     let patenteIndex = -1;
//     for (let i = VAL_POL.length - 1; i >= 0; i--) { 
//       if (VAL_POL[i][0] === infoPatente) {
//         patenteIndex = i + 1;
//         break;
//       }
//     }


//   // Si la Patente ya existe, actualizar los datos del Vehiculo
//   if (patenteIndex !== -1) {
//   BD_POLIZAS.getRange(patenteIndex, 1).setValue(infoPatentev);
//   BD_POLIZAS.getRange(patenteIndex, 2).setValue(infoDNI);
//   BD_POLIZAS.getRange(patenteIndex, 3).setValue(infoCliente);
//   BD_POLIZAS.getRange(patenteIndex, 4).setValue(infoSucursal);
//   BD_POLIZAS.getRange(patenteIndex, 6).setValue(infoImporte);
//   BD_POLIZAS.getRange(patenteIndex, 7).setValue(infoCnia);
//   BD_POLIZAS.getRange(patenteIndex, 8).setValue(infoPoliza);
//   BD_POLIZAS.getRange(patenteIndex, 9).setValue(infoVigencia);
//   BD_POLIZAS.getRange(patenteIndex, 10).setValue(infoHasta);
//   BD_POLIZAS.getRange(patenteIndex, 11).setValue(infoOperacion);
//   BD_POLIZAS.getRange(patenteIndex, 12).setValue(infoCobertura);
//   BD_POLIZAS.getRange(patenteIndex, 13).setValue(infoMarca);
//   BD_POLIZAS.getRange(patenteIndex, 14).setValue(infoFpago);
//   BD_POLIZAS.getRange(patenteIndex, 15).setValue(infoNotasPol);
//   BD_POLIZAS.getRange(patenteIndex, 16).setValue(infoHoy);
//   BD_POLIZAS.getRange(patenteIndex, 19).setValue(infoRefaDesde);
//   BD_POLIZAS.getRange(patenteIndex, 20).setValue(infoRefaHasta);

//   }
//   // Si la Patente no existe, no hace nada.
//    else {
//   }


//  // Buscar si el Patente ya existe en la hoja de Polizas
//   let patenteIndexV = -1;
//   for (let i = 0; i < VAL_VEH.length; i++) {
//     if (VAL_VEH[i][0] === infoPatente) {
//       patenteIndexV = i + 1;
//       break;
//     }
//   }

//   // Si la Patente ya existe, actualizar los datos del Vehiculo
//   if (patenteIndexV !== -1) {
//   BD_VEHICULOS.getRange(patenteIndexV, 1).setValue(infoPatentev);
//   BD_VEHICULOS.getRange(patenteIndexV, 2).setValue(infoMarca);
//   BD_VEHICULOS.getRange(patenteIndexV, 3).setValue(infoAnio);
//   BD_VEHICULOS.getRange(patenteIndexV, 4).setValue(infoTipo);
//   BD_VEHICULOS.getRange(patenteIndexV, 5).setValue(infoMotor);
//   BD_VEHICULOS.getRange(patenteIndexV, 6).setValue(infoChasis);
//   BD_VEHICULOS.getRange(patenteIndexV, 7).setValue(infoColor);
//   BD_VEHICULOS.getRange(patenteIndexV, 8).setValue(infoSuma);
//   BD_VEHICULOS.getRange(patenteIndexV, 10).setValue(infoAccesorio);
//   BD_VEHICULOS.getRange(patenteIndexV, 11).setValue(infoVTV);
//   BD_VEHICULOS.getRange(patenteIndexV, 12).setValue(infoNotasVeh);
//   BD_VEHICULOS.getRange(patenteIndexV, 13).setValue(infoDanios);
//   BD_VEHICULOS.getRange(patenteIndexV, 15).setValue(infoHoy);
//   }
//   // Si la Patente no existe, no hace nada.
//    else {
//   }

// }



////////////// INGESAMOS POLIZA NUEVA A BD EMISION //////////////////
function modNueva(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoRefa, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasVeh, infoMotor, infoChasis, infoTipo, infoColor, infoSuma, infoAnio, infoAccesorio, infoVTV, infoPatentev, infoUsuario, infoCalifica, infoRefaDesde, infoRefaHasta, infoVigTot) {

  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const BD_CLIENTES = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1g6EpLNEQaAsYHHe78J4nmlGthon-NJfvfKs_wKjzkLQ/edit").getSheetByName("BD CLIENTES");
    const BD_VEHICULOS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/17FkXB8az__L819hlpT09J46uX24OWV5kH2_ilJY9u-0/edit").getSheetByName("BD_VEHICULOS");
  const VAL_VEH = BD_VEHICULOS.getDataRange().getDisplayValues();
  const VAL_POL = BD_POLIZAS.getDataRange().getDisplayValues();
  const VAL_CTE = BD_CLIENTES.getDataRange().getDisplayValues();
    let fechaHoy = new Date();
    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
    let anio = fechaHoy.getFullYear().toString().slice(-2); // Obtener los últimos 2 dígitos del año

    // Agregar un cero inicial si el día o el mes es menor a 10
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

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
    BD_CLIENTES.getRange(dniIndex, 10).setValue(infoCalifica);
  }
  // Si el DNI no existe, no hace nada
  else {
  }


 // Buscar si el Patente ya existe en la hoja de Polizas
    let patenteIndex = -1;
    for (let i = VAL_POL.length - 1; i >= 0; i--) { 
      if (VAL_POL[i][0] === infoPatentev && VAL_POL[i][10] === "PENDIENTE") {
        patenteIndex = i + 1;
        break;
      }
    }


  // Si la Patente ya existe, actualizar los datos del Vehiculo
  if (patenteIndex !== -1) {
  BD_POLIZAS.getRange(patenteIndex, 1).setValue(infoPatentev);
  BD_POLIZAS.getRange(patenteIndex, 2).setValue(infoDNI);
  BD_POLIZAS.getRange(patenteIndex, 3).setValue(infoCliente);
  BD_POLIZAS.getRange(patenteIndex, 4).setValue(infoSucursal);
  BD_POLIZAS.getRange(patenteIndex, 5).setValue(infoRefa);
  BD_POLIZAS.getRange(patenteIndex, 6).setValue(infoImporte);
  BD_POLIZAS.getRange(patenteIndex, 7).setValue(infoCnia);
  BD_POLIZAS.getRange(patenteIndex, 8).setValue(infoPoliza);
  BD_POLIZAS.getRange(patenteIndex, 9).setValue(infoVigencia);
  BD_POLIZAS.getRange(patenteIndex, 10).setValue(infoHasta);
  BD_POLIZAS.getRange(patenteIndex, 11).setValue(infoOperacion);
  BD_POLIZAS.getRange(patenteIndex, 12).setValue(infoCobertura);
  BD_POLIZAS.getRange(patenteIndex, 13).setValue(infoMarca);
  BD_POLIZAS.getRange(patenteIndex, 14).setValue(infoFpago);
  BD_POLIZAS.getRange(patenteIndex, 15).setValue(infoNotasVeh);
  BD_POLIZAS.getRange(patenteIndex, 18).setValue(infoHoy);
  BD_POLIZAS.getRange(patenteIndex, 19).setValue(infoRefaDesde);
  BD_POLIZAS.getRange(patenteIndex, 20).setValue(infoRefaHasta);
  BD_POLIZAS.getRange(patenteIndex, 21).setValue(infoVigTot);
  }
  
   else {

var polVals = [infoPatentev, infoDNI, infoCliente, infoSucursal, infoRefa, infoImporte, infoCnia, infoPoliza, infoVigencia, infoHasta, infoOperacion, infoCobertura, infoMarca, infoFpago, infoNotasVeh, , , infoHoy, infoRefaDesde, infoRefaHasta, infoVigTot]

  BD_POLIZAS.appendRow(polVals);

  }


 // Buscar si el Patente ya existe en la hoja de Polizas
  let patenteIndexV = -1;
  for (let i = 0; i < VAL_VEH.length; i++) {
    if (VAL_VEH[i][0] === infoPatentev) {
      patenteIndexV = i + 1;
      break;
    }
  }

  // Si la Patente ya existe, actualizar los datos del Vehiculo
  if (patenteIndexV !== -1) {
  BD_VEHICULOS.getRange(patenteIndexV, 1).setValue(infoPatentev);
  BD_VEHICULOS.getRange(patenteIndexV, 2).setValue(infoMarca);
  BD_VEHICULOS.getRange(patenteIndexV, 3).setValue(infoAnio);
  BD_VEHICULOS.getRange(patenteIndexV, 4).setValue(infoTipo);
  BD_VEHICULOS.getRange(patenteIndexV, 5).setValue(infoMotor);
  BD_VEHICULOS.getRange(patenteIndexV, 6).setValue(infoChasis);
  BD_VEHICULOS.getRange(patenteIndexV, 7).setValue(infoColor);
  BD_VEHICULOS.getRange(patenteIndexV, 8).setValue(infoSuma);
  BD_VEHICULOS.getRange(patenteIndexV, 9).setValue(infoAccesorio);
  BD_VEHICULOS.getRange(patenteIndexV, 10).setValue(infoVTV);
  BD_VEHICULOS.getRange(patenteIndexV, 11).setValue(infoNotasVeh);
  BD_VEHICULOS.getRange(patenteIndexV, 12).setValue(infoDanios);
  BD_VEHICULOS.getRange(patenteIndexV, 13).setValue("//" + infoUsuario + "[" + infoHoy + "] - ENDOSO");
  BD_VEHICULOS.getRange(patenteIndexV, 14).setValue(infoHoy);
  }
  // Si la Patente no existe, no hace nada.
   else {
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
