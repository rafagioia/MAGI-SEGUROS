function doGet(){
  var template = HtmlService.createTemplateFromFile('renovaciones');
  template.pubUrl = "https://script.google.com/macros/s/AKfycbweHnLexeQEmxDbAyV7oEC9wNnt8xAaVrTSXBwJGsE_Jb6-mj3GiIBJgUULPeQyJuZ9NQ/exec";
  var output = template.evaluate();
  return output;
}
/////////////////////////////////////////


function include( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName )
  .getContent();
}


function formatDateString(inputDate) {
  var date = new Date(inputDate);
  
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear() % 100; // Obtiene los últimos dos dígitos del año
  
  var formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

  function formatearFecha(fecha) {
    let partes = fecha.split('/');
    let dia = partes[0].padStart(2, '0'); 
    let mes = partes[1].padStart(2, '0'); 
    let anio = partes[2].slice(-2);
    return `${dia}/${mes}/${anio}`;
  }


function renovarPol(
    infoPatente,
    infoImporte,
    infoVence,
    infoHasta, 
    infoHoy,
    infoPol,
    infoRefa, 
    vto_antiguo,
    infoRefa_Desde,
    infoRefa_Hasta,
    infoEstado,
    infoVigTot) {
  const BD_EMISION = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
    const BD_COBRANZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1mA3lgXqaLeMnr9q-f56ZrcWt5GjOAURemUbpZaRzuEA/edit").getSheetByName("BD COBRANZAS");

  let partes = infoRefa_Desde.split('/');
  let dia = parseInt(partes[0]);
  let mes = parseInt(partes[1]) - 1; // Los meses en Date empiezan desde 0 (enero es 0)
  let anio = parseInt(partes[2]); // Convertir año corto a largo (2023 en lugar de 23)

  let fechaDesde = new Date(anio, mes, dia);

  // Sumar los meses indicados en la variable infoRefa
  fechaDesde.setMonth(fechaDesde.getMonth() + parseInt(infoRefa));

  let diaHasta = String(fechaDesde.getDate()).padStart(2, '0');
  let mesHasta = String(fechaDesde.getMonth() + 1).padStart(2, '0'); // Los meses en Date son de 0 a 11
  let anioHasta = fechaDesde.getFullYear(); // Tomar los últimos 2 dígitos del año

  infoRefa_Hasta = `${diaHasta}/${mesHasta}/${anioHasta}`;

  const [day, month, year] = infoRefa_Desde.split('/').map(Number);
  const date = new Date(2000 + year, month - 1, day); // Resta 1 al mes para que sea compatible con la indexación de JavaScript (enero es 0).
  date.setFullYear(date.getFullYear() + 1); // Suma un año
  const dayFormatted = date.getDate().toString().padStart(2, '0');
  const monthFormatted = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearFormatted = date.getFullYear().toString().slice(-2);
  date.setFullYear(date.getFullYear() + 1); // Suma un año
  const dayFormatted2 = date.getDate().toString().padStart(2, '0');
  const monthFormatted2 = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearFormatted2 = date.getFullYear().toString().slice(-2);
fecha_desde_f = dayFormatted + "/" + monthFormatted + "/" + yearFormatted
fecha_hasta_f = dayFormatted2 + "/" + monthFormatted2 + "/" + yearFormatted2

  // Obtener los datos de la hoja
  const data = BD_EMISION.getDataRange().getValues();
  const data2 = BD_COBRANZAS.getDataRange().getValues();


   infoVence = formatearFecha(infoVence)
   infoHasta = formatearFecha(infoHasta)
   infoRefa_Desde = formatearFecha(infoRefa_Desde)
   infoRefa_Hasta = formatearFecha(infoRefa_Hasta)
   infoHoy = formatearFecha(infoHoy)
for (var i = data.length - 1; i >= 0; i--) {
    if (data[i][0] == infoPatente && fecha_desde_f == infoHasta) { 
      
var polVals = [infoPatente, data[i][1], data[i][2], data[i][3], infoRefa, infoImporte, data[i][6], infoPol, infoVence, infoHasta, data[i][10], data[i][11], data[i][12], data[i][13], data[i][14], , "//" + infoEstado, infoHoy, infoRefa_Desde, infoRefa_Hasta, infoVigTot]

  BD_EMISION.appendRow(polVals);

        break; 
    }
}

  // for (var i = 0; i < data2.length; i++) {
  //   if (data2[i][1] == infoPatente && data2[i][7] == 1) { 
  //     BD_COBRANZAS.getRange(i + 1, 10).setValue(infoPol); 
  //   }
  //   if (data2[i][1] == infoPatente && infoVence !== vto_antiguo) {
  //     BD_COBRANZAS.getRange(i + 1, 6).setValue(infoVence); 
  //   }
  //     break; 
  // }
}

function bajaPol(
  infoPatente,
  infoHoy) {
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  
  // Obtener los datos de la hoja
  const data = BD_POLIZAS.getDataRange().getValues();
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == infoPatente) { // Columna A
      BD_POLIZAS.getRange(i + 1, 11).setValue("ANULACION");   // Columna H
      BD_POLIZAS.getRange(i + 1, 21).setValue(infoHoy);    // Columna ACTU
      break; // Terminar la búsqueda una vez que se encuentre una coincidencia
    }
  }
}

////////////////// LISTADO DE RENOVACIONES //////////////////
function getData(mes_hoy1 = new Date().getMonth(), anio_hoy = new Date().getFullYear()) {
  const BD_POLIZAS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Os6YSZHVMsTm7TZhC7vT1onIyBVIwLqEDd5hkjin4uA/edit").getSheetByName("BD_POLIZAS");
  const emisionData = BD_POLIZAS.getDataRange().getDisplayValues();
  

  var sinPendientes = [];
  var patentesProcesadas = new Set();
  var mes_hoy = mes_hoy1 +1;

  for (var j = emisionData.length - 1; j >= 1; j--) {

      if (!patentesProcesadas.has(emisionData[j][0])) {
          patentesProcesadas.add(emisionData[j][0]); // Marcar patente como procesada
        } else {
          continue
        }

    var fecha_desde = emisionData[j][8];
    var parts3 = fecha_desde.split('/');
    var dia_desde = parseInt(parts3[0]);
    var mes_desde = parseInt(parts3[1]);
    var anio_desde = parseInt(parts3[2]);
    var anio_hasta = parseInt(parts3[2]) + 1;

    let anio_hoyb = anio_hoy.toString().slice(-2)
    var fecha_mod = emisionData[j][17];
    var mes_mod, anio_mod;
    
    if (fecha_mod !== "" || emisionData[j][10] !== "ANULACION") {
      var parts4 = fecha_mod.split('/');
      mes_mod = parseInt(parts4[1]);
      anio_mod = parseInt(parts4[2]);
    } else {
      mes_mod = "";
      anio_mod = "";
    }


    var vig = parseInt(emisionData[j][4]);
    var vigtot = parseInt(emisionData[j][20]) || 12;
    var rf = parseInt(vigtot / vig);
    for (var i = rf; i >= 1; i--) {


      
      let fecha_refa = new Date("20" + anio_desde, mes_desde - 1, dia_desde);
      fecha_refa.setMonth(fecha_refa.getMonth() + (i * vig));
      let refa = fecha_refa.toLocaleDateString('es-ES');

      var part = refa.split("/");
      var refacturaciones = [];
      var anio_mod20 = "20" + anio_mod
      
      
            let esMismoAnio = parseInt(anio_hoy) === parseInt(part[2]);
      let esMismoMes = parseInt(mes_hoy) === parseInt(part[1]);
      let esMesDistinto = parseInt(mes_mod) !== parseInt(mes_hoy);
      let esAnioDistinto = parseInt(anio_mod20) !== parseInt(anio_hoyb);

        // Estado de emisión
        let noEsAnulacion = emisionData[j][10] !== "ANULACION";

        // Condición final
        // console.log("res1: " + esMismoAnio + " res2: " + esMismoMes + " res3: " + esMesDistinto + " res4: " + esAnioDistinto + " res5: " + noEsAnulacion)
        // console.log("aniohoy: " + aniohoy + "anio_hasta: " + anio_hasta + "mes_hoyb: " + mes_hoy + "mes_desde: " + mes_desde + "mes_mod: " + mes_mod + "anio_mod: " + anio_mod)
      
      if (esMismoAnio && esMismoMes && esMesDistinto && esAnioDistinto && noEsAnulacion) {

        // Refacturación normal
        // console.log("pasó refa")
        refacturaciones.push(fecha_desde); // VIG DESDE
        refacturaciones.push(emisionData[j][2]); // cliente
        refacturaciones.push(emisionData[j][0]); // patente
        refacturaciones.push(emisionData[j][12]); // marca
        refacturaciones.push(emisionData[j][6]); // cnia
        refacturaciones.push(1); // cuota
        refacturaciones.push(vig); // cuotaHasta
        fecha_refa.setMonth(fecha_refa.getMonth() + vig);
        var nuevaFecha = fecha_refa.toLocaleDateString('es-ES');
        refacturaciones.push(nuevaFecha); // REFA HASTA
        // refacturaciones.push(refa);
        refacturaciones.push(emisionData[j][7]); // poliza
        refacturaciones.push(emisionData[j][13]); // fpago
        refacturaciones.push("REFA" + (i + 1));
        refacturaciones.push(refa);  /// REFA DESDE
        let fecha_hasta = new Date("20" + anio_hasta, mes_desde - 1, dia_desde);
        var nuevaFecha2 = fecha_hasta.toLocaleDateString('es-ES');
        refacturaciones.push(nuevaFecha2); // VIG HASTA
        refacturaciones.push("");
        refacturaciones.push(vigtot);
          sinPendientes.push(refacturaciones);
      }
      

          // console.log("parseInt(part[1]): " + parseInt(part[1]) + " mes_hoy: " + mes_hoy + ", parseInt(part[2]): " + parseInt(part[2]) + " anio_hoy: " + anio_hoy)
if (parseInt(part[1]) === parseInt(mes_hoy) && parseInt(part[2]) === parseInt(anio_hoy) && emisionData[j][10] !== "ANULACION") {
    // Verifica si refacturaciones es una cadena y si no está vacía
    if (typeof refacturaciones === 'string' && refacturaciones.trim() !== "") {
        sinPendientes.push(refacturaciones);
    }
}

      
    }

if ((anio_hoyb == anio_hasta && mes_hoy === mes_desde) && (mes_mod !== mes_hoy && anio_mod !== anio_hoyb) &&  emisionData[j][10] !== "ANULACION") {
    // Renovación
    // console.log("pasó renovacion: " + emisionData[j][0]);
    var fecha_hasta_ren = new Date("20" + anio_hasta, mes_desde - 1, dia_desde);

    // Use the Date object for manipulation before converting to string
    var dia_desde5 = String(fecha_hasta_ren.getDate()).padStart(2, '0');
    var mes_desde5 = String(fecha_hasta_ren.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based, so add 1
    var anio_desde5 = String(fecha_hasta_ren.getFullYear()).slice(-2);

    
    refacturaciones.push(dia_desde5 + "/" + mes_desde5 + "/" + anio_desde5); // Push VIG DESDE
    refacturaciones.push(emisionData[j][2]); // cliente
    refacturaciones.push(emisionData[j][0]); // patente
    refacturaciones.push(emisionData[j][12]); // marca
    refacturaciones.push(emisionData[j][6]); // cnia
    refacturaciones.push(1); // cuota
    refacturaciones.push(vig); // cuotaHasta
    fecha_hasta_ren.setMonth(fecha_hasta_ren.getMonth() + vig);
    var nuevaFecha = fecha_hasta_ren.toLocaleDateString('es-ES');
    
    // Push REFA HASTA
    refacturaciones.push(nuevaFecha);
    refacturaciones.push(""); // poliza
    refacturaciones.push(emisionData[j][13]); // fpago
    refacturaciones.push("RENOVACION");
    refacturaciones.push(dia_desde5 + "/" + mes_desde5 + "/" + anio_desde5); // Push VIG DESDE
    var fechaInicial = new Date(anio_desde5, mes_desde5 - 1, dia_desde5); // mes - 1 porque Date usa meses de 0 a 11

    fechaInicial.setMonth(fechaInicial.getMonth() + vigtot);

    var dia_final = fechaInicial.getDate().toString().padStart(2, '0');
    var mes_final = (fechaInicial.getMonth() + 1).toString().padStart(2, '0'); // sumamos 1 al mes porque getMonth() devuelve de 0 a 11
    var anio_final = fechaInicial.getFullYear().toString().slice(-2); // convertimos a string para usar slice()

    var fecha_final = dia_final + '/' + mes_final + '/' + anio_final;

    // Push VIG HASTA
    refacturaciones.push(fecha_final);
    refacturaciones.push("");
        refacturaciones.push(vigtot);
    console.log(refacturaciones)
          sinPendientes.push(refacturaciones);
      } else
      if (parseInt(anio_mod) == parseInt(anio_desde) && parseInt(anio_mod) == parseInt(anio_hoyb) &&
          parseInt(mes_mod) == parseInt(mes_desde) && parseInt(mes_mod) == parseInt(mes_hoy) &&
          emisionData[j][10] !== "ANULACION") {
      var refacturaciones = [];
        // Ya Renovadas
        refacturaciones.push(emisionData[j][8]);
        refacturaciones.push(emisionData[j][2]); // cliente
        refacturaciones.push(emisionData[j][0]); // patente
        refacturaciones.push(emisionData[j][12]); // marca
        refacturaciones.push(emisionData[j][6]); // cnia
        refacturaciones.push(1); // cuota
        refacturaciones.push(vig); // cuotaHasta
        refacturaciones.push(emisionData[j][19]);
        refacturaciones.push(emisionData[j][7]); // poliza
        refacturaciones.push(emisionData[j][13]); // fpago
        refacturaciones.push("ACTUALIZADA: " + emisionData[j][17]);
        refacturaciones.push(emisionData[j][18]);
        refacturaciones.push(emisionData[j][9]);
        refacturaciones.push(emisionData[j][5]);
        refacturaciones.push(vigtot);
        sinPendientes.push(refacturaciones);
        // console.log("pasó renovada: "  + refacturaciones)
      } 

  }

console.log(sinPendientes)
  return sinPendientes;
 }






function calcularMeses(mes_desde, mes_hasta, anio_desde, anio_hasta) {
  var months = (anio_hasta - anio_desde) * 12;
  months += mes_hasta - mes_desde;

  return months;
}

// // Función para sumar meses a una fecha
// function sumarMeses(fecha, meses) {
//   var nuevaFecha = new Date(fecha);
//   nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);
//   return nuevaFecha;
// }

// Función para convertir una fecha a formato string (YYYY-MM-DD)
function fechaAString(fecha) {
  var year = fecha.getFullYear().toString().substr(-2); // Get the last two digits of the year
  var month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  var day = fecha.getDate().toString().padStart(2, '0');
  return month + '/' + day + '/' + year;
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


