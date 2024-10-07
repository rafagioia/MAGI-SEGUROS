<script>

  //TRANSFORMAR FECHA DD/MM/YY A ARRAY [DD, MM, AA]
  function date_ddmmyy_to_array(fecha) {

    var parts = fecha.split('/');
    var dia_part = parseInt(parts[0]);
    var mes_part = parseInt(parts[1]);
    var anio_part = parseInt(parts[2]);

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

  }


//SUMAR X CANTIDAD DE MESES A FECHA DD/MM/YY Y DEVOLVER EN MISMO FORMATO
function sumarMeses(fecha, meses) {
  var parts = fecha.split('/');
  var dia_part = parseInt(parts[0]);
  var mes_part = parseInt(parts[1]) - 1;
  var anio_part = parseInt(parts[2]) + 2000;

  var fechaObj = new Date(anio_part, mes_part, dia_part);
  fechaObj.setMonth(fechaObj.getMonth() + meses);

  var nuevo_dia = fechaObj.getDate();
  var nuevo_mes = fechaObj.getMonth() + 1;
  var nuevo_anio = fechaObj.getFullYear().toString().slice(-2);

  nuevo_dia = nuevo_dia < 10 ? '0' + nuevo_dia : nuevo_dia;
  nuevo_mes = nuevo_mes < 10 ? '0' + nuevo_mes : nuevo_mes;

  return nuevo_dia + '/' + nuevo_mes + '/' + nuevo_anio;
}



</script>