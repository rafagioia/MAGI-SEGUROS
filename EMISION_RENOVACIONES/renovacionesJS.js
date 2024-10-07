
// search-box open close js code
let navbar = document.querySelector(".navbar");

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}
let emisionArrow = document.querySelector(".emision-arrow");
emisionArrow.onclick = function() {
 navLinks.classList.toggle("show4");
}
let emisionsub1Arrow = document.querySelector(".emisionSub1-arrow");
emisionsub1Arrow.onclick = function() {
 navLinks.classList.toggle("show5");
}

let cobranzasSub2 = document.querySelector(".cobranzasSub2-arrow");
cobranzasSub2.onclick = function() {
 navLinks.classList.toggle("show6");
}
let cobranzasSub3 = document.querySelector(".cobranzasSub3-arrow");
cobranzasSub3.onclick = function() {
 navLinks.classList.toggle("show7");
}
// let user_name = document.querySelector(".user-name-arrow");
// user_name.onclick = function() {
//   navLinks.classList.toggle("show8");
// }
  




////////////// LISTA DE PAGOS ///////////////////////
function updateSinPendientes(result) {
  console.log("Result length:", result.length);

  function convertToDate(dateString) {
    var parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  result.sort(function(a, b) {
    var dateA = convertToDate(a[11]); // Posición 7 en base 0
    var dateB = convertToDate(b[11]); // Posición 7 en base 0
    return dateA - dateB;
  });

  var sinPendientesDiv = document.getElementById("sinPendientes");
  var pendientesHtml = "";

  for (var i = 0; i < result.length; i++) {

    

function formatFecha(dateStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
}

const fecha_hasta_new = formatFecha(result[i][12]);
const fecha_desde_ab = formatFecha(result[i][11]);
const fecha_hasta_ab = formatFecha(result[i][7]);

    pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
    pendientesHtml += "<div class='row' style='padding: 5px;'>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";

    // Columna de cliente
    pendientesHtml += "<div class='col-4  m-0 p-1 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_cte" + i + "'>" + result[i][1] + "</div>";

    // Columna de vencimiento
    pendientesHtml += "<div class='col-2  m-0 p-1 planilla'><input type='text' class='form-control planilla' id='_vto" + i + "' value='" + result[i][0] + "'></div>";
    pendientesHtml += "<div class='col-2  m-0 p-1 planilla'><input type='text' class='form-control planilla' id='_hasta" + i + "' value='" + fecha_hasta_new + "'></div>";

    // Columna de CNIA
    pendientesHtml += "<div class='col-3   m-0 p-1 text-sm planilla' style='padding-top: 10px;' id='_cnia" + i + "'>" + result[i][4] + "</div>";

    // Columna de REFA
    pendientesHtml += "<div class='col-1  m-0 p-1 planilla'><input type='text' class='form-control planilla p-1 ' id='_vig_total" + i + "' value='" + result[i][14] + "'></div>";

    pendientesHtml += "</div></div>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";

    // Columna de importe
    pendientesHtml += "<div class='col-4 planilla'><div class='input-group'><div class='input-group-prepend'><span class='input-group-text planilla'>$</span></div>";
    pendientesHtml += "<input type='text' class='form-control planilla' id='_imp" + i + "' value='" + result[i][13] + "'><input type='text' class='form-control planilla' id='_pol" + i + "' value='" + result[i][8] + "'></div></div>";

    // Columna de patente
    // pendientesHtml += "<div class='col-2 text-sm text-truncate planilla' id='_pat" + i + "'>" + result[i][2] + "</div>";

    // Columna de marca
    // pendientesHtml += "<div class='col-1 text-sm text-truncate planilla' id='_marca" + i + "'>" + result[i][3] + "</div>";
pendientesHtml += "<div class='row col-3'>";
pendientesHtml += "<div class='text-sm text-truncate planilla fs-5' id='_pat" + i + "'>" + result[i][2] + "</div>";
pendientesHtml += "<div class='text-sm text-truncate planilla' style='font-size: 0.6rem' id='_marca" + i + "'>" + result[i][3] + "</div>";
pendientesHtml += "</div>";
    // Establecer el estilo según el valor de result[i][10]
    if (result[i][10] == "RENOVACION") {
      // Columna de REFA
      pendientesHtml += "<div class='col-3 m-0 p-0 text-sm text-truncate planilla'>";
      pendientesHtml += "<div class='row m-0 p-0'>";
      pendientesHtml += "<div class='col-12 m-0 p-0' id='_estado" + i + "'>" + result[i][10] + "</div>";
      pendientesHtml += "<div class='col-2 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa" + i + "' value='" + result[i][6] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa_desde" + i + "' value='" + result[i][11] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text'  style='border: none; width: 100%; text-align: center;'  id='_refa_hasta" + i + "' value='" + result[i][7] + "'></div>";
      // pendientesHtml += "<div class='col-6 m-0 p-0' style='border: 1px solid black; border-radius: 5px;' id='_refa_desde" + i + "'>" + fecha_desde_ab + "</div>";
      // pendientesHtml += "<div class='col-6 m-0 p-0' style='border: 1px solid black; border-radius: 5px;' id='_refa_hasta" + i + "'>" + fecha_hasta_ab + "</div>";
      pendientesHtml += "</div>";
      pendientesHtml += "</div>";

      pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-danger btn-sm' id='_btn_baja" + i + "'>BAJA</button></div>";
      pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-success btn-sm' id='_btn_ren" + i + "'>REN</button></div>";
    } else if (result[i][10].indexOf("REFA") !== -1) {
      // Columna de REFA
      pendientesHtml += "<div class='col-3 m-0 p-0 text-sm text-truncate planilla'>";
      pendientesHtml += "<div class='row m-0 p-0'>";
      pendientesHtml += "<div class='col-12 m-0 p-0 text-sm planilla' id='_estado" + i + "'>" + result[i][10] + "</div>";
      pendientesHtml += "<div class='col-2 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa" + i + "' value='" + result[i][6] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa_desde" + i + "' value='" + result[i][11] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text'  style='border: none; width: 100%; text-align: center;'  id='_refa_hasta" + i + "' value='" + result[i][7] + "'></div>";
      // pendientesHtml += "<div class='col-6 m-0 p-0' style='border: 1px solid black; border-radius: 5px;' id='_refa_desde" + i + "'>" + fecha_desde_ab + "</div>";
      // pendientesHtml += "<div class='col-6 m-0 p-0' style='border: 1px solid black; border-radius: 5px;' id='_refa_hasta" + i + "'>" + fecha_hasta_ab + "</div>";
      pendientesHtml += "</div>";
      pendientesHtml += "</div>";

      pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-danger btn-sm' id='_btn_baja" + i + "'>BAJA</button></div>";
  pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-success btn-sm' id='_btn_ren" + i + "'>REF</button></div>";
} else if (result[i][10].indexOf("ACTUALIZADA") !== -1) {
      // Columna de REFA
      pendientesHtml += "<div class='col-3 m-0 p-0 text-sm text-truncate planilla'>";
      pendientesHtml += "<div class='row m-0 p-0'>";
      pendientesHtml += "<div class='col-12 m-0 p-0 text-sm planilla' id='_estado" + i + "'>" + result[i][10] + "</div>";
      pendientesHtml += "<div class='col-2 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa" + i + "' value='" + result[i][6] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text' style='border: none; width: 100%; text-align: center;' id='_refa_desde" + i + "' value='" + result[i][11] + "'></div>";
      pendientesHtml += "<div class='col-5 m-0 p-0' style='border: 2px solid black; border-radius: 5px;'><input type='text'  style='border: none; width: 100%; text-align: center;'  id='_refa_hasta" + i + "' value='" + result[i][7] + "'></div>";
      pendientesHtml += "</div>";
      pendientesHtml += "</div>";

      pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-danger btn-sm' id='_btn_baja" + i + "'>BAJA</button></div>";
      pendientesHtml += "<div class='col-1 p-1 planilla' style='margin: 2px 1px 0px 5px; border: 1px solid black; border-radius: 5px; width: 32px;  height: 32px;' id='_ver" + i + "'>✔️</div>";
  // pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'></div>";
}


pendientesHtml += "</div></div></div></div>";
pendientesHtml += "</div></div></div>";
  }
    sinPendientesDiv.textContent = "";
    sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);


var idCniaSelect = document.getElementById("id_cnia_select");
var idEstadoSelect = document.getElementById("id_estado_select");
var actualizarListaBtn = document.getElementById("bt-actualizar_lista");
var resetFiltroBtn = document.getElementById("bt-reset-filtro");

actualizarListaBtn.addEventListener("click", function () {
  var seleccionadoCnia = idCniaSelect.value;
  var seleccionadoEstado = idEstadoSelect.value;

  // Filtrar los elementos basados en los valores seleccionados
  var divs = document.querySelectorAll("#sinPendientes > div");

  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var cniaElement = div.querySelector(".text-sm[id^='_cnia']");
    var estadoElement = div.querySelector(".text-sm[id^='_estado']");

    // Verificar si los elementos existen y tienen contenido de texto
    var cnia = cniaElement ? cniaElement.textContent : "";
    var estado = estadoElement ? estadoElement.textContent : "";

    var mostrar = false;

    if (
      (seleccionadoCnia === "" || cnia === seleccionadoCnia || seleccionadoCnia === "todos") &&
      (seleccionadoEstado === "" || estado.indexOf(seleccionadoEstado) !== -1 || seleccionadoEstado === "todos")
    ) {
      mostrar = true;
    }

    div.style.display = mostrar ? "block" : "none";
  }
});
//////////////////// BOTON DE RESETEAR FILTRO ///////////////////

resetFiltroBtn.addEventListener("click", function() {
  var divs = document.querySelectorAll("#sinPendientes > div");

  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    div.style.display = "block"; // Mostrar todos los elementos
  }

  // Restablecer la selección del select
  idCniaSelect.selectedIndex = 0;
  idEstadoSelect.selectedIndex = 0;

});
    /////////////// BOTON PARA RENOVAR POLIZAS //////////////////

  var divs = document.querySelectorAll("[id^='_btn_ren']");
  divs.forEach(function(_btn_ren) {
    _btn_ren.addEventListener("click", function() {
      var id = _btn_ren.id.slice(8); // Obtener el índice del div
  let vto_antiguo = result[id][11]
  let infoPatente = document.getElementById("_pat" + id).textContent;
  let infoImporte = document.getElementById("_imp" + id).value;
  let infoVence = document.getElementById("_vto" + id).value;
  let infoHasta = document.getElementById("_hasta" + id).value;
  let infoRefa = document.getElementById("_refa" + id).value;
  let infoPol = document.getElementById("_pol" + id).value;
  let infoRefa_Desde = document.getElementById("_refa_desde" + id).textContent;
  let infoRefa_Hasta = document.getElementById("_refa_hasta" + id).textContent;
  let infoEstado = document.getElementById("_estado" + id).textContent;
  let infoVigTot = document.getElementById("_vig_total" + id).textContent;


  let fechaHoy = new Date();
  let dia = fechaHoy.getDate();
  let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
  let anio = fechaHoy.getFullYear();
  let infoHoy = dia + '/' + mes + '/' + anio;

console.log("infoHasta: " + infoHasta + ", infoRefa_Desde: " + infoRefa_Desde)
  // document.getElementById("_ver" + id).textContent = "✔️";
    // Ocultar el botón
    _btn_ren.style.display = "none";

    google.script.run.withSuccessHandler().renovarPol(
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
    infoVigTot
  );

    });
  });


      /////////////// BOTON PARA BAJA POLIZAS //////////////////

  var divs = document.querySelectorAll("[id^='_btn_baja']");
  divs.forEach(function(_btn_baja) {
    _btn_baja.addEventListener("click", function() {
      var id = _btn_baja.id.slice(9); // Obtener el índice del div

  let infoPatente = document.getElementById("_pat" + id).textContent;
  let fechaHoy = new Date();
  let dia = fechaHoy.getDate();
  let mes = fechaHoy.getMonth() + 1; // Agregar 1 ya que los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
  let anio = fechaHoy.getFullYear();
  let infoHoy = dia + '/' + mes + '/' + anio;

  // document.getElementById("_ver" + id).textContent = "❌";
    // Ocultar el botón
    _btn_baja.style.display = "none";
    // _btn_ren.style.display = "none";

    google.script.run.withSuccessHandler().bajaPol(
    infoPatente, 
    infoHoy);

    });
  });


  }

  // Llamar a la función getData() del lado del servidor
  google.script.run.withSuccessHandler(updateSinPendientes).getData();
  /////////////////////////////////////////


/////////////////////////////////////////////////////////////////
//////////////////// SESION DE USUARIOS /////////////////////////
/////////////////////////////////////////////////////////////////

//////////////////// INICIAR SESION ////////////////////////

// Obtener el modal
var modal = document.getElementById("myModal");
var tiempoRestanteDiv = document.getElementById("tiempo-restante");

// Función para realizar el inicio de sesión
var usuarioAlmacenado = sessionStorage.getItem("magi-usuario");
var horaInicioAlmacenada = sessionStorage.getItem("magi-horaInicio");
var colorAlmacenado = sessionStorage.getItem("magi-color");

if (usuarioAlmacenado) {
  // Si hay un usuario almacenado, establecerlo en el elemento correspondiente
  document.getElementById("usuario_sp").textContent = usuarioAlmacenado;
  user.style.display = "block";
  close_session.style.display = "block";
  modal.style.display = "none";

  // Establecer el color de fondo almacenado
  if (colorAlmacenado) {
    document.body.style.backgroundColor = colorAlmacenado;
  } else {
    // Si no hay un color almacenado, solicitarlo al servidor
    google.script.run.withSuccessHandler(function (color) {
      if (color) {
        console.log("este es el color: " + color)
        sessionStorage.setItem("magi-color", color);
        document.body.style.backgroundColor = color;
      }
    }).buscarColorAlmacenado(usuarioAlmacenado);
  }

  // Calcular el tiempo restante
  var tiempoRestante = calcularTiempoRestante();
  mostrarTiempoRestante(tiempoRestante);
  iniciarContadorTiempo(tiempoRestante);
} else {
  
  // Función para abrir el modal
  modal.style.display = "block";

  // Función para cerrar el modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Si no hay un usuario almacenado, abrir el modal al hacer clic en el botón de inicio de sesión
  document.getElementById("inicio-sesion").addEventListener("click", function (event) {
    event.preventDefault();

    // Obtener el usuario y la contraseña del formulario
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Obtener el valor seleccionado del color
    var colorPicker = document.getElementById("colorPicker");
    var colorSeleccionado = colorPicker.value;

// Hacer una solicitud al servidor para verificar el usuario y la contraseña


google.script.run.withSuccessHandler(function (color) {
  if (color) {
    document.getElementById("usuario_sp").textContent = usuario;
    modal.style.display = "none";
    user.style.display = "block";
    close_session.style.display = "block";

    // Guardar el usuario y el color en sessionStorage
    sessionStorage.setItem("magi-usuario", usuario);
    sessionStorage.setItem("magi-horaInicio", new Date().getTime());
    sessionStorage.setItem("magi-color", color);
    
    document.body.style.backgroundColor = color;
  
  } else {
    // El color no fue encontrado, manejar el error adecuadamente
    console.log("Color no encontrado");
  }

    // Calcular el tiempo restante
    var tiempoRestante = calcularTiempoRestante();
    mostrarTiempoRestante(tiempoRestante);
    iniciarContadorTiempo(tiempoRestante);
}).verificarCredenciales(usuario, contrasena);
  });
}



// Función para calcular el tiempo restante en milisegundos
function calcularTiempoRestante() {
  var horaInicio = parseInt(horaInicioAlmacenada);
  var horaExpiracion = horaInicio + (4 * 60 * 60 * 1000); // 4 horas en milisegundos
  var tiempoRestante = horaExpiracion - new Date().getTime();

  return tiempoRestante;
}

// Función para mostrar el tiempo restante en el div correspondiente
function mostrarTiempoRestante(tiempoRestante) {
  if (tiempoRestante <= 0) {
      sessionStorage.removeItem("magi-usuario");
      sessionStorage.removeItem("magi-horaInicio");
      sessionStorage.removeItem("magi-color");
      tiempoRestanteDiv.textContent = "Tiempo expirado";
      document.getElementById("usuario_sp").textContent = "Desconocido";
      modal.style.display = "block";
  } else {
    var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
    var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    tiempoRestanteDiv.textContent = "Tiempo restante: " + horas + ":" + minutos + ":" + segundos;
  }
}

// Función para iniciar el contador de tiempo
function iniciarContadorTiempo(tiempoRestante) {
  var intervalo = setInterval(function () {
    tiempoRestante -= 1000;

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      sessionStorage.removeItem("magi-usuario");
      sessionStorage.removeItem("magi-horaInicio");
      sessionStorage.removeItem("magi-color");
      tiempoRestanteDiv.textContent = "Tiempo expirado";
      document.getElementById("usuario_sp").textContent = "Desconocido";
      modal.style.display = "block";
    } else {
      mostrarTiempoRestante(tiempoRestante);
    }
  }, 1000);
}


////////////////////// CAMBIAR LA CLAVE DE USUARI ////////////////////////

document.getElementById("cambiar_clave").addEventListener("click", function() {
    event.preventDefault();
    
  document.getElementById("modal2").style.display = "block";
});

document.getElementById("guardar_clave").addEventListener("click", function() {
    event.preventDefault();

  var usuario_pass = sessionStorage.getItem("magi-usuario");
  var antiguaClave = document.getElementById("antigua_clave").value;
  var nuevaClave = document.getElementById("nueva_clave").value;
  google.script.run.cambioClave(antiguaClave, nuevaClave, usuario_pass);
    modal2.style.display = "none";
alert('Clave cambiada correctamente');

});

////////////////////////////////////////////////////////////////////////////////

////////////////////////// CERRAR SESION //////////////////////

function close_sessionok(event) {
    event.preventDefault();

    // Eliminar el valor almacenado en sessionStorage
    sessionStorage.removeItem("magi-usuario");
      sessionStorage.removeItem("magi-horaInicio");
      tiempoRestanteDiv.textContent = "";    
      document.getElementById("usuario_sp").textContent = "Desconocido";
  // Recargar la página
      modal.style.display = "block";

}


//////////// CAMBIAR COLOR DE FONDO //////////////////////////
            function changeColor() {
                var colorPicker = document.getElementById("colorPicker");
                var color = colorPicker.value;
                var usuario = sessionStorage.getItem("magi-usuario");
        sessionStorage.setItem("magi-color", color);
        document.body.style.backgroundColor = color;

                google.script.run
                    .withSuccessHandler(onSuccess)
                    .withFailureHandler(onFailure)
                    .changeBackgroundColor(color, usuario);

            }

            function onSuccess() {
                console.log("Color de fondo almacenado correctamente.");

                
            }

            function onFailure(error) {
                console.error("Error al almacenar el color de fondo:", error);
            }

            
////////////////////////////////////////////////////////////////////////////////

            
/////////////////////// EVENT LISTENERS ////////////////////////////


document.getElementById("bt-regenarar_lista").addEventListener("click", function() {
  var mes = parseInt(document.getElementById("mes_sn").value, 10);
  var anio = parseInt(document.getElementById("anio_sn").value, 10);

 google.script.run.withSuccessHandler(updateSinPendientes).getData(mes, anio)
});

document.getElementById('close_session').addEventListener('click', close_sessionok);
//////////////////////////////////////////////////////////////////
