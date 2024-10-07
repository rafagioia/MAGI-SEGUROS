
function sumarMeses(fecha, meses) {
    // console.log("fn sumarMeses| fecha pasada por argumento: " + fecha);
    // console.log("fn sumarMeses| tipo de datos de fecha pasada: " + typeof fecha);
    // console.log("fn sumarMeses| meses pasados por argumento: " + meses);
    // console.log("fn sumarMeses| tipo de datos de meses: " + typeof meses);
    var parts = fecha.split('/');
    var dia_part = parseInt(parts[0]);
    var mes_part = parseInt(parts[1]) - 1;
    var anio_part = parseInt(parts[2]) + 2000;
  
    var fechaObj = new Date(anio_part, mes_part, dia_part);
    fechaObj.setMonth(fechaObj.getMonth() + parseInt(meses));
  
    var nuevo_dia = fechaObj.getDate();
    var nuevo_mes = fechaObj.getMonth() + 1;
    var nuevo_anio = fechaObj.getFullYear().toString().slice(-2);
  
    nuevo_dia = nuevo_dia < 10 ? '0' + nuevo_dia : nuevo_dia;
    nuevo_mes = nuevo_mes < 10 ? '0' + nuevo_mes : nuevo_mes;
  
    return nuevo_dia + '/' + nuevo_mes + '/' + nuevo_anio;
  }
  
  function formatearFecha(fecha = new Date()) {
    // Obtener el día, mes y año de la fecha
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    var anio = fecha.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
  
    // Asegurarse de que el día y el mes tengan dos dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
  
    // Retornar la fecha en formato DD/MM/YY
    return dia + '/' + mes + '/' + anio;
  }
  
  function desformatearFecha(fecha) {
    let partesFecha = fecha.split('/');
    let year = partesFecha[2];
  
    // Si el año tiene 2 dígitos, completar con "20" delante
    if (year.length === 2) {
      year = "20" + year;
    }
  
    // Crear el objeto de fecha con el año corregido
    let fechaDesformateada = new Date(year, partesFecha[1] - 1, partesFecha[0]);
  
    return fechaDesformateada;
  }
  
  // FUNCIONES BACK-END
  
  //traer registro a traves del valor de la columna indice, pasandole el link de donde buscar
  
  //(columna a buscar, valor a buscar, url de googlesheet, nombre de la hoja, tipo de resultado buscado)
  function buscarValor(indice, valor, url, hoja, resultado) {
    let valoresEncontrados = [];
  
    const sheet = SpreadsheetApp.openByUrl(url).getSheetByName(hoja);
    const data = sheet.getDataRange().getDisplayValues();
    
    if (resultado == "exacto") { //para buscar datos precisos
      for (let i = data.length - 1; i >= 0; i--) {
        let valorABuscar = data[i];
  
        if (valorABuscar[indice] === valor) {
          valoresEncontrados.push(valorABuscar); 
          break;
        }
      }
    } else if (resultado == "aprox") { //para buscar partes de nombres por ej
      for (let j = 0; j < data.length; j++) {
        let valorABuscar = data[j];
  
        if (valorABuscar[indice].includes(valor)) { 
          valoresEncontrados.push(valorABuscar);
          break;
        }
      }
    }
  
    return valoresEncontrados; 
  }
  