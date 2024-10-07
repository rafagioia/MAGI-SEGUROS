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
  
  function formatearFecha4Digitos(fecha = new Date()) {
    // Obtener el día, mes y año de la fecha
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
    var anio = fecha.getFullYear().toString(); // Obtener los últimos dos dígitos del año
  
    // Asegurarse de que el día y el mes tengan dos dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
  
    // Retornar la fecha en formato DD/MM/YY
    return dia + '/' + mes + '/' + anio;
  }