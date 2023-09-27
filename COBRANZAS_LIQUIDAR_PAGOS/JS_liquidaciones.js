//////////////// BOTON DEL MENU ///////////////////////
    // Obtén una referencia al botón
    const navbarToggler = document.getElementById('navbar-toggler');

    // Agrega un evento de clic al botón
    navbarToggler.addEventListener('click', function() {
      // Obtén una referencia al elemento de destino
      const navbarNav = document.getElementById('navbarNav');
    
      // Alterna la clase 'show' en el elemento de destino para mostrar u ocultar la barra de navegación
      navbarNav.classList.toggle('show');
    });
    
       (function () {
       'use strict'
    
       var forms= document.querySelectorAll('.needs-validation')
    
    
       Array.prototype.slice.call(forms)
       .forEach(function (form){
         form.addEventListener('submit',function (event){
           if (!form.checkValidity()) {
             event.preventDefault()
             event.stopPropagation()
           }
           form.classList.add('was-validated')
         }, false)
       }
       )
    })()
    
    
    ////////////// LISTA DE PAGOS ///////////////////////
    function updateSinPendientes(result) {
      var sinPendientesDiv = document.getElementById("sinPendientes");
      var pendientesHtml = "";
      var idDeudores = []; // Nuevo array para almacenar los id_deudor distintos
    
      // // Función para convertir la cadena de fecha en formato DD/MM/YYYY a objeto de fecha
      // function convertToDate(dateString) {
      //   var parts = dateString.split('/');
      //   return new Date(parts[2], parts[1] - 1, parts[0]); // Restamos 1 al mes ya que en Date() los meses van de 0 a 11
      // }
    
      // // Ordenar el arreglo result de menor a mayor según las fechas (result[i][2])
      // result.sort(function(a, b) {
      //   var dateA = convertToDate(a[7]);
      //   var dateB = convertToDate(b[7]);
      //   return dateA - dateB;
      // });
    
      for (var i = 0; i < result.length; i++) {
    pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
    pendientesHtml += "<div class='row' style='padding: 5px;'>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    
    // Columna de deudor
    pendientesHtml += "<div class='col-1 text-sm' style='font-size: 8px;' id='_recibo" + i + "'>" + result[i][0] + "</div>";
    
    // Columna de cliente
    pendientesHtml += "<div class='col-5 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_cte" + i + "'>" + result[i][1] + "</div>";
    
    // Columna de vencimiento
    pendientesHtml += "<div class='col-2 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_vto" + i + "'>" + result[i][7] + "</div>";
    
    // Columna de cuenta
    pendientesHtml += "<div class='col-1 text-sm planilla'><div class='row p-0 m-0'>"
    
    
    pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla' id='_cta" + i + "'>" + result[i][5] + "</div>";
    pendientesHtml += "<div class='col-2 m-0 p-1 planilla'>/</div>";
    // Columna de cuenta adicional
    pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla'  id='_ctad" + i + "'>" + result[i][6] + "</div></div></div>";
    
    // Columna de CNIA
    pendientesHtml += "<div class='col-3 text-sm planilla' style='padding-top: 10px;' id='_cnia" + i + "'>" + result[i][4] + "</div>";
    
    
    pendientesHtml += "</div></div>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    // Columna de importe
    pendientesHtml += "<div class='col-3 planilla'><div class='input-group'>";
    // Columna de IMPORTE
    pendientesHtml += "<div class='col-6 text-sm planilla' style='padding-top: 10px;' id='_imp" + i + "'>" + result[i][10] + "</div>";
    
    // Columna de POLIZA
    pendientesHtml += "<div class='col-6'><input type='text' class='form-control text-sm planilla'  id='_pol" + i + "' value='" + result[i][11] + "'></div>";
    
    pendientesHtml += "</div></div>";
    
    // Columna de patente
    pendientesHtml += "<div class='col-2 text-sm text-truncate planilla' id='_pat" + i + "'>" + result[i][2] + "</div>";
    
    // Columna de marca
    pendientesHtml += "<div class='col-3 text-sm text-truncate  planilla'  id='_marca" + i + "'>" + result[i][3] + "</div>";
    
    
    
    pendientesHtml += "<div class='col-4 row planilla'>";
    
      pendientesHtml += "<div class='col-6 row planilla' id='sec_pasa" + i + "'>";
      // Comprueba si hay un valor en la columna [8]
      if (result[i][8]) {
        // Si hay un valor, agrega "Pasado:" y el valor de la columna
        pendientesHtml += "<button class='btn btn-success' id='btnPasar" + i + "' style='display: none'>PASAR</button><div id='pas_id" + i + "'><b>Pasado: </b><div id='_fec_pas" + i + "'>" + result[i][8] + "</div></div>";
      } else {
        // Si no hay un valor, agrega un botón "Pasar"
        pendientesHtml += "<button class='btn btn-success' id='btnPasar" + i + "'>PASAR</button><div id='pas_id" + i + "' style='display: none'><b>Pasado: </b><div id='_fec_pas" + i + "' ></div></div>";
      }
      pendientesHtml += "</div>";
    
      pendientesHtml += "<div class='col-6 row planilla' id='sec_liq" + i + "'>";
      // Comprueba si hay un valor en la columna [9]
      if (result[i][8] && result[i][9]) {
        // Si hay un valor, agrega "Liquidado:" y el valor de la columna
        pendientesHtml += "<button class='btn btn-danger' id='btnQuitar" + i + "' style='display: none'>Quitar</button><div id='liq_id'><b>Liquidado: </b><div id='pas_id" + i + "'>" + result[i][9] + "</div></div>";
      } else if (result[i][8] && !result[i][9]) {
        // Si no hay un valor en la columna [8], agrega un botón "X" de color rojo
        pendientesHtml += "<button class='btn btn-danger' id='btnQuitar" + i + "'>Quitar</button><div id='liq_id" + i + "' style='display: none'><b>Liquidado: </b><div id='pas_id" + i + "'></div></div>";
        }  else if (!result[i][8] && !result[i][9]) {
        // Si no hay un valor en la columna [8], agrega un botón "X" de color rojo
        pendientesHtml += "<button class='btn btn-danger' id='btnQuitar" + i + "' style='display: none'>Quitar</button><div id='liq_id" + i + "' style='display: none'><b>Liquidado: </b><div id='pas_id" + i + "'></div></div>";
        }
    pendientesHtml += "</div>";
    
        // Cierra el div principal
        pendientesHtml += "</div>";
    
    pendientesHtml += "</div></div>";
    pendientesHtml += "<div style='display: none;' id='_dni" + i + "'>" + result[i][12] + "</div>" +
      "<div style='display: none;' id='_wpp" + i + "'>" + result[i][13] + "</div>" +
      "<div style='display: none;' id='_poliza" + i + "'>" + result[i][14] + "</div>" +
      "<div style='display: none;' id='_recibo" + i + "'>" + result[i][15] + "</div>" +
      "</div></div></div>";
    
    
    
        if (!idDeudores.includes(result[i][0])) {
          idDeudores.push(result[i][0]);
        }
      }
    
        sinPendientesDiv.innerHTML = pendientesHtml;
    
    // var idDeudorSelect = document.getElementById("id_deudor_select");
    // var idDeudorSelectAlta = document.getElementById("alta_id_deudor");
    var actualizarListaBtn = document.getElementById("bt-actualizar_lista");
    var totalValInput = document.getElementById("total_val");
    var resetFiltroBtn = document.getElementById("bt-reset-filtro");
    
    
    ///////////////////// SUMAR VALORES ////////////////
    
    function calcularSuma() {
      var suma = 0;
      var divs = document.querySelectorAll("#sinPendientes > div");
    
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
      
        // Verificar si hay un valor en result[i][8] y si contenidoImp no es null
        if (result[i][8] !== ""){
          // Obtener el valor del contenido del div con id "_imp"
          var contenidoImp = div.querySelector("div[id^='_imp']");
          var valor = contenidoImp.textContent.replace('$', ''); // Eliminar el signo "$"
          valor = valor.replace('.', ''); // Eliminar el signo "."
    
          if (valor !== "") {
            valor = parseInt(valor); // Usar parseInt para mantener los decimales
            if (!isNaN(valor)) {
              suma += valor;
            }
          }
        }
      }
    
      totalValInput.value = suma;
    
      // Obtener la fecha actual
      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero)
      var anio = fechaActual.getFullYear();
    
      // Formatear la fecha en el formato deseado (por ejemplo, DD/MM/AAAA)
      var fechaFormateada = dia + "/" + mes + "/" + anio;
    
      // Asignar la fecha formateada al campo de entrada "fecha_actual"
      document.getElementById("fecha_actual").value = fechaFormateada;
    }
    
    // Llamar a la función inicialmente y cada vez que se cambie un valor
    calcularSuma();
    
    var impInputs = document.querySelectorAll("input[id^='_imp']");
    for (var j = 0; j < impInputs.length; j++) {
      impInputs[j].addEventListener("input", calcularSuma);
    }
    
    
    
    /////////////// BOTON PARA PASAR PAGO //////////////////
    var divs3 = document.querySelectorAll("[id^='btnPasar']");
    
    divs3.forEach(function (btnPasar) {
      btnPasar.addEventListener("click", function () {
        var id = btnPasar.id.slice(8); // Obtener el índice del div
        let infoRecibo = document.getElementById("_recibo" + id).textContent;
    
        // Ocultar el botón
        document.getElementById("btnPasar" + id).style.display = "none";
        document.getElementById("pas_id" + id).style.display = "block";
        document.getElementById("btnQuitar" + id).style.display = "block";
    
          let importe = document.getElementById("_imp" + id).textContent;
          importe = importe.replace('$', ''); // Eliminar el signo "$"
          importe = importe.replace('.', ''); // Eliminar el signo "$"
          importe = parseInt(importe); // Convertir a número entero
    
          let totalActual = parseInt(document.getElementById("total_val").value) || 0;
          
          let total = totalActual + importe;
    
          document.getElementById("total_val").value = total; // Actualizar el valor del elemento total_val con el nuevo total (sin decimales)
    
        google.script.run.withSuccessHandler(function (fechaHoyPasada) {
          document.getElementById("_fec_pas" + id).textContent = fechaHoyPasada;
        }).pasarPago(infoRecibo);
      });
    });
    
    
    /////////////// BOTON PARA QUITAR PAGO PASADO //////////////////
    var divs2 = document.querySelectorAll("[id^='btnQuitar']");
    
    divs2.forEach(function (btnQuitar) {
      btnQuitar.addEventListener("click", function () {
        var id = btnQuitar.id.slice(9); // Obtener el índice del div
        let infoRecibo = document.getElementById("_recibo" + id).textContent;
    
        // Ocultar el botón
        document.getElementById("btnPasar" + id).style.display = "block";
        document.getElementById("pas_id" + id).style.display = "none";
        document.getElementById("btnQuitar" + id).style.display = "none";
    
    
          let importe = document.getElementById("_imp" + id).textContent;
          importe = importe.replace('$', ''); // Eliminar el signo "$"
          importe = importe.replace('.', ''); // Eliminar el signo "$"
          importe = parseInt(importe); // Convertir a número entero
    
          let totalActual = parseInt(document.getElementById("total_val").value) || 0;
          
          let total = totalActual - importe;
    
          document.getElementById("total_val").value = total; // Actualizar el valor del elemento total_val con el nuevo total (sin decimales)
    
          document.getElementById("_fec_pas" + id).textContent = "";
    
        google.script.run.withSuccessHandler(function (fechaHoyPasada) {
        }).quitarPago(infoRecibo);
      });
    });
    
    
    }
    
      // Llamar a la función getData() del lado del servidor
      google.script.run.withSuccessHandler(updateSinPendientes).getData();
      /////////////////////////////////////////
    
    /// GENERAR LISTADO
    document.getElementById("bt-regenarar_lista").addEventListener("click", function() {
      var dia = parseInt(document.getElementById("dia").value, 10);
      var mes = parseInt(document.getElementById("mes").value, 10);
      var anio = parseInt(document.getElementById("anio").value, 10);
    
     google.script.run.withSuccessHandler(updateSinPendientes).getData(dia, mes, anio)
    });
    
     /// OBTENER FECHA ACTUAL PARA LIQUIDAR
      const fechaActual = new Date();
    
      // Obtiene el día, mes y año
      const dia = fechaActual.getDate().toString().padStart(2, '0');
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses comienzan en 0
      const año = fechaActual.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año
    
      // Formatea la fecha en DD/MM/YY
      const fechaFormateada = `${dia}/${mes}/${año}`;
    
      // Asigna la fecha formateada al campo de entrada
      document.getElementById('fecha_actual').value = fechaFormateada;
    
      // ACTUALIZAR DIAS PARA BUSCAR LIQUIDACIONES VIEJAS
      function actualizarDias() {
        const diaSelect = document.getElementById('dia');
        const mesSelect = document.getElementById('mes');
        const anioSelect = document.getElementById('anio');
    
        const selectedMonth = parseInt(mesSelect.value);
        const selectedYear = parseInt(anioSelect.value);
    
        // Calcula el último día del mes seleccionado
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    
        // Borra las opciones actuales
        diaSelect.innerHTML = '<option value=""></option>';
    
        // Llena el select de días
        for (let i = 1; i <= lastDay; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i;
          diaSelect.appendChild(option);
        }
      }
    
      // Escucha cambios en los selects de mes y año
      const mesSelect = document.getElementById('mes');
      const anioSelect = document.getElementById('anio');
      mesSelect.addEventListener('change', actualizarDias);
      anioSelect.addEventListener('change', actualizarDias);
    
      // Llama a la función inicialmente para establecer los días iniciales
      actualizarDias();
    
    
    
    function liquidarPagos() {
      google.script.run.withSuccessHandler(function(numerosRecibos) {
        if (numerosRecibos.length > 0) {
          // Oculta los divs completos que contienen números de recibo correspondientes
          numerosRecibos.forEach(function(numeroRecibo) {
            var divs = document.querySelectorAll("div[id^='div']");
            divs.forEach(function(div) {
              var contenidoRecibo = div.querySelector("div[id^='_recibo']").textContent;
              if (parseInt(contenidoRecibo) === parseInt(numeroRecibo)) {
                div.style.display = "none"; // Oculta el div completo
              }
            });
          });
          document.getElementById("total_val").value = 0; 
          alert("Liquidación generada correctamente.\n\nNúmeros de recibos liquidados: " + numerosRecibos.join(", "));
        } else {
          alert("No se encontraron elementos para liquidar.");
        }
      }).liqPagos();
    }
    
    document.getElementById('bt-imprimir_lista').addEventListener('click', function() {
      var tableData = obtenerDatosTabla();
      generarPDF(tableData);
    });
    
    function obtenerDatosTabla() {
      var tableData = [];
      var total = 0;
      var divs = document.querySelectorAll("#sinPendientes > div");
    
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        if (div.style.display === "none") {
          continue; // Si el div está oculto, omitirlo y pasar al siguiente
        }
    
        var rowData = [];
    
        rowData.push(div.querySelector(".text-sm[id^='_deudor']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cte']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_vto']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cta']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_ctad']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cnia']").textContent);
        rowData.push(div.querySelector(".form-control[id^='_imp']").value);
        rowData.push(div.querySelector(".text-sm[id^='_pat']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_marca']").textContent);
    
        tableData.push(rowData);
    
        // Sumar el valor
        var valor = parseFloat(rowData[6]);
        if (!isNaN(valor)) {
          total += valor;
        }
      }
    
      // Mostrar el total
      var totalElement = document.getElementById("total_val");
      totalElement.value = total.toFixed(2);
    
      return tableData;
    }
    
    function generarPDF(tableData) {
      var ventanaImpresion = window.open('', '', 'width=800,height=600');
    
      ventanaImpresion.document.write('<html><head><title>Lista Pendientes</title></head><body>');
      ventanaImpresion.document.write('<center><h1>LISTADO DE DEUDA MENSUAL</h1></center><p>');
      ventanaImpresion.document.write('<style>' +
        'table { width: 100%; border-collapse: collapse; }' +
        'th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }' +
        'th.total-label { font-weight: bold; }' +
        'td.total-value { font-weight: bold; font-size: 16px; }' +
        '</style>');
      ventanaImpresion.document.write('<table>');
      ventanaImpresion.document.write('<thead><tr>' +
        '<th>ID:</th>' +
        '<th>CLIENTE:</th>' +
        '<th>VTO:</th>' +
        '<th>CTA:</th>' +
        '<th>DE:</th>' +
        '<th>COMPAÑIA</th>' +
        '<th>IMPORTE:</th>' +
        '<th>PATENTE:</th>' +
        '<th>MARCA:</th>' +
        '<th>PASADO:</th>' +
        '</tr></thead>');
      ventanaImpresion.document.write('<tbody>');
    
      for (var i = 0; i < tableData.length; i++) {
        ventanaImpresion.document.write('<tr>');
    
        for (var j = 0; j < tableData[i].length; j++) {
          ventanaImpresion.document.write('<td>' + tableData[i][j] + '</td>');
        }
    
        ventanaImpresion.document.write('</tr>');
      }
    
      // Agregar fila con el total
      var total = 0;
      for (var i = 0; i < tableData.length; i++) {
        var rowData = tableData[i];
        var importe = parseFloat(rowData[6]);
        if (!isNaN(importe)) {
          total += importe;
        }
      }
      ventanaImpresion.document.write('<tr><td colspan="8"></td><td colspan="1" class="total-label">TOTAL:</td><td class="total-value" colspan="1">$' + total.toFixed(2) + '</td></tr>');
    
      ventanaImpresion.document.write('</tbody>');
      ventanaImpresion.document.write('</table>');
      ventanaImpresion.document.write('</body></html>');
    
      ventanaImpresion.document.close();
      ventanaImpresion.print();
    }
    
    
    
    
    
    //////////////////// OCULTAR MODAL PRESIONANDO FUERA DE LA PANTALLA /////////////////
    
    document.addEventListener('DOMContentLoaded', function() {
      // Obtenemos el modal por su ID
      var modal = document.getElementById('modal3');
      var modal2 = document.getElementById('modal4');
    
      // Agregamos un evento para cerrar el modal cuando se hace clic fuera de él
      window.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
        if (event.target === modal2) {
          modal2.style.display = 'none';
        }
      });
    });
      
    
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
      document.getElementById("usuario_sp").innerHTML = usuarioAlmacenado;
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
        document.getElementById("usuario_sp").innerHTML = usuario;
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
          tiempoRestanteDiv.innerHTML = "Tiempo expirado";
          document.getElementById("usuario_sp").innerHTML = "Desconocido";
          modal.style.display = "block";
      } else {
        var horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
        var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
    
        tiempoRestanteDiv.innerHTML = "Tiempo restante: " + horas + ":" + minutos + ":" + segundos;
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
          tiempoRestanteDiv.innerHTML = "Tiempo expirado";
          document.getElementById("usuario_sp").innerHTML = "Desconocido";
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
          tiempoRestanteDiv.innerHTML = "";    
          document.getElementById("usuario_sp").innerHTML = "Desconocido";
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
    
    
    document.getElementById('bt-liquidar-pagos').addEventListener('click', liquidarPagos);
    document.getElementById('close_session').addEventListener('click', close_sessionok);
    //////////////////////////////////////////////////////////////////
    