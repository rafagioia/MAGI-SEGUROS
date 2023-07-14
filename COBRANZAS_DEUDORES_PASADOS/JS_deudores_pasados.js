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
    
      // Función para convertir la cadena de fecha en formato DD/MM/YYYY a objeto de fecha
      function convertToDate(dateString) {
        var parts = dateString.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]); // Restamos 1 al mes ya que en Date() los meses van de 0 a 11
      }
    
      // Ordenar el arreglo result de menor a mayor según las fechas (result[i][2])
      result.sort(function(a, b) {
        var dateA = convertToDate(a[7]);
        var dateB = convertToDate(b[7]);
        return dateA - dateB;
      });
    
      for (var i = 0; i < result.length; i++) {
    pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
    pendientesHtml += "<div class='row' style='padding: 5px;'>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    
    // Columna de deudor
    pendientesHtml += "<div class='col-1 text-sm' style='font-size: 8px;' id='_deudor" + i + "'>" + result[i][0] + "</div>";
    
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
    pendientesHtml += "<div class='col-3 planilla'><div class='input-group'><div class='input-group-prepend'><span class='input-group-text planilla'>$</span></div>";
    pendientesHtml += "<input type='text' class='form-control planilla'  id='_imp" + i + "' value='" + result[i][11] + "'></div></div>";
    
    // Columna de patente
    pendientesHtml += "<div class='col-2 text-sm text-truncate planilla' id='_pat" + i + "'>" + result[i][2] + "</div>";
    
    // Columna de marca
    pendientesHtml += "<div class='col-3 text-sm text-truncate  planilla'  id='_marca" + i + "'>" + result[i][3] + "</div>";
    
    // Columna de pasados
    pendientesHtml += "<div class='col-4 row planilla'>";
    
    // Columna de verificación
    pendientesHtml += "<div class='col-2 p-1 planilla' style='margin: 2px 1px 0px 5px; border: 1px solid black; border-radius: 5px; height: 32px;'";
    
    // Establecer el estilo según el valor de result[i][9]
    if (result[i][10] === "✔️") {
      pendientesHtml += "id='_ver" + i + "'>✔️</div>";
      pendientesHtml += "<div class='col-2 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-success btn-sm' style='display: none;' id='_btn_cob" + i + "'>COBRAR</button><button class='btn btn-secondary btn-sm planilla' style='margin-top: 2px' id='_print" + i + "'>🖨️</button></div>";
      pendientesHtml += "<div class='col-1 m-0 p-0' style=''><input type='checkbox' class='form-check-input planilla' style='margin: 10px;' id='_check" + i + "'";
    if (result[i][16] === "TRUE") {
      pendientesHtml += " checked='checked'"; // Elimina el atributo checked aquí
    }
      pendientesHtml += "></div><div class='col-1 m-0 planilla' style='padding-top: 7px;' id='_num_rec" + i + "'>" + result[i][15] + "</div>";
    } else if (result[i][10] === "❌") {
      pendientesHtml += "id='_ver" + i + "'>❌</div>";
      pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button style='margin-top: 2px;' class='btn btn-success btn-sm' id='_btn_cob" + i + "'>COBRAR</button><button class='btn btn-secondary btn-sm planilla' style='display: none;' style='margin-top: 2px'  id='_print" + i + "'>🖨️</button></div>";
      pendientesHtml += "<div class='col-1 m-0 p-0' style=''><input type='checkbox' class='form-check-input planilla' style='display: none;margin: 10px;' id='_check" + i + "'></div><div class='col-1 m-0 planilla' style='padding-top: 7px;' id='_num_rec" + i + "'>" + result[i][15] + "</div>";
    }
    
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
    
    var idDeudorSelect = document.getElementById("id_deudor_select");
    var actualizarListaBtn = document.getElementById("bt-actualizar_lista");
    var totalValInput = document.getElementById("total_val");
    var resetFiltroBtn = document.getElementById("bt-reset-filtro");
    
    ///////////////////// SUMAR VALORES ////////////////
    
    function calcularSuma() {
      var suma = 0;
      var divs = document.querySelectorAll("#sinPendientes > div");
    
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
    
        // Verificar si el elemento está visible
        if (div.style.display !== "none") {
          var input = div.querySelector("input[id^='_imp']");
          var valor = parseFloat(input.value);
    
          if (!isNaN(valor)) {
            suma += valor;
          }
        }
      }
    
      totalValInput.value = suma.toFixed(2);
    }
    
    // Llamar a la función inicialmente y cada vez que se cambie un valor
    calcularSuma();
    
    var impInputs = document.querySelectorAll("input[id^='_imp']");
    for (var j = 0; j < impInputs.length; j++) {
      impInputs[j].addEventListener("input", calcularSuma);
    }
    
    //////////////// ACTUALIZAR VALORES DEL SELECT ///////////////////
    for (var j = 0; j < idDeudores.length; j++) {
      var option = document.createElement("option");
      option.value = idDeudores[j];
      option.text = idDeudores[j];
      idDeudorSelect.appendChild(option);
    }
    
    ///////// FILTRAR DATOS POR ID DEUDOR //////////////////////
    actualizarListaBtn.addEventListener("click", function() {
    
      var seleccionado = idDeudorSelect.value;
    
      // Filtrar los elementos basados en el valor seleccionado
      var divs = document.querySelectorAll("#sinPendientes > div");
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var deudor = div.querySelector(".text-sm[id^='_deudor']").textContent;
    
        if (deudor === seleccionado || seleccionado === "todos") {
          div.style.display = "block"; // Mostrar el elemento
        } else {
          div.style.display = "none"; // Ocultar el elemento
        }
      }
    calcularSuma();
    });
    
    //////////////////// BOTON DE RESETEAR FILTRO ///////////////////
    
    resetFiltroBtn.addEventListener("click", function() {
      var divs = document.querySelectorAll("#sinPendientes > div");
    
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        div.style.display = "block"; // Mostrar todos los elementos
      }
    
      // Restablecer la selección del select
      idDeudorSelect.selectedIndex = 0;
    
    });
    
    ///////////// BOTON PARA IMPRIMIR RECIBOS ///////////////
    var printBtns = document.querySelectorAll("[id^='_print']");
    printBtns.forEach(function (printBtns) {
      printBtns.addEventListener("click", function () {
        var id = printBtns.id.slice(6); // Obtener el índice del div
        var numRecibo = document.getElementById("_num_rec" + id).textContent;
        imprimirRecibo(numRecibo);
      });
    });
    
    ////////////// CHECK BOX PARA TILDAR PAGOS PASADOS /////////////
    
    var checkboxes = document.querySelectorAll("input[id^='_check']");
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var id = checkbox.id.slice(6); // Obtener el índice del div
        var numRecibo = document.getElementById("_num_rec" + id).textContent;
        var isChecked = checkbox.checked; // Obtener el estado del checkbox (marcado o no)
    
        // Llamar a la función en el servidor con el estado del checkbox
        google.script.run.marcarColumnaS(numRecibo, isChecked);
      });
    });
    
    /////////////// BOTON PARA INGRESAR PAGOS //////////////////
    
      var divs = document.querySelectorAll("[id^='_btn_cob']");
      divs.forEach(function(_btn_cob) {
        _btn_cob.addEventListener("click", function() {
          var id = _btn_cob.id.slice(8); // Obtener el índice del div
    
      let infoDeudor = document.getElementById("_deudor" + id).textContent;
      let infoDNI = document.getElementById("_dni" + id).textContent; 
      let infoCliente = document.getElementById("_cte" + id).textContent;
      let infoWpp = document.getElementById("_wpp" + id).textContent; 
      let infoPatente = document.getElementById("_pat" + id).textContent;
      let infoMarca = document.getElementById("_marca" + id).textContent;
      let infoPoliza = document.getElementById("_poliza" + id).textContent; 
      let infoCnia = document.getElementById("_cnia" + id).textContent;
      let infoCuota = document.getElementById("_cta" + id).textContent;
      let infoVigencia = document.getElementById("_ctad" + id).textContent;
      let infoImporte = document.getElementById("_imp" + id).value;
      let infoVence = document.getElementById("_vto" + id).textContent;
      let infoRecibo = document.getElementById("_recibo" + id).textContent;
    
    
    
      document.getElementById("_ver" + id).textContent = "✔️";
    
        
        // Ocultar el botón
        _btn_cob.style.display = "none";
        document.getElementById("_num_rec" + id).style.display = "block";
        document.getElementById("_print" + id).style.display = "block";
        document.getElementById("_check" + id).style.display = "block";
        // document.getElementById("_down" + id).style.display = "block";
    
        google.script.run.withSuccessHandler(function (recibo) {
         document.getElementById("_num_rec" + id).textContent = recibo;
        }).pagoNuevo(
        infoDNI,
        infoCliente,
        infoWpp,
        infoPatente, 
        infoMarca,
        infoPoliza,
        infoCnia,
        infoCuota,
        infoVigencia,
        infoImporte,
        infoVence,
        infoRecibo
      );
        });
      });
      }
    
      // Llamar a la función getData() del lado del servidor
      google.script.run.withSuccessHandler(updateSinPendientes).getData();
      /////////////////////////////////////////
    
    
    
    
    
    
    document.getElementById("bt-regenarar_lista").addEventListener("click", function() {
      var mes = parseInt(document.getElementById("mes_sn").value, 10);
      var anio = parseInt(document.getElementById("anio_sn").value, 10);
    
     google.script.run.withSuccessHandler(updateSinPendientes).getData(mes, anio)
    });
    
    
    
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
    
    
    //////////////////// MPRIMIR RECIBO SIMPLE //////////////////
    function imprimirRecibo(numRecibo) {
      // event.preventDefault();
      console.log("llegó a la funcion imprimirRecibo")
      google.script.run.withSuccessHandler(function(content) {
        var newWindow = window.open();
        newWindow.document.write(content);
      }).getValuesFromSheet(numRecibo);
      console.log(numRecibo);
    }
    
    
    
    
    //////////////////// REIMPRIMIR RECIBO SIMPLE //////////////////
    function reimprimirRecibo(event) {
      event.preventDefault();
      const numRecibo = document.getElementById('numRecibo').value;
      google.script.run.withSuccessHandler(function(content) {
        var newWindow = window.open();
        newWindow.document.write(content);
      }).getValuesFromSheet(numRecibo);
      console.log(numRecibo);
    }
    
    
    //////////////////// REIMPRIMIR RECIBO MULTIPLE x6 //////////////////
    function reimprimirReciboMulti(event) {
      event.preventDefault();
      const numReciboMulti = document.getElementById('numRecibo').value;
      google.script.run.withSuccessHandler(function(content) {
        var newWindow = window.open();
        newWindow.document.write(content);
      }).getValuesFromSheetMulti(numReciboMulti);
      console.log(numReciboMulti);
    }
    
    
    ////////////////////////// DESCARGAR PDF DE RECIBOS /////////////////////
    
    function descargaRecibo(event) {
      event.preventDefault();
      const numRecibo = document.getElementById('numRecibo').value;
      google.script.run.withSuccessHandler(function(pdfContent) {
        downloadPdf(pdfContent, "recibo.pdf");
      }).getPdfContent(numRecibo);
    }
    
    function descargaReciboM(event) {
      event.preventDefault();
      const numRecibo = document.getElementById('numRecibo').value;
      google.script.run.withSuccessHandler(function(pdfContent) {
        downloadPdf(pdfContent, "recibo.pdf");
      }).getPdfContentM(numRecibo);
    }
    
    function downloadPdf(pdfContent, fileName) {
      const link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + pdfContent;
      link.download = fileName;
      link.target = '_blank';
      link.click();
    }
    
    
    
    ////////////////////// ALTA DEUDOR NUEVO ////////////////////////
    
    document.getElementById("alta_nueva").addEventListener("click", function() {
        event.preventDefault();
        
      document.getElementById("modal3").style.display = "block";
    });
    
    document.getElementById("alta_deudor").addEventListener("click", function() {
        event.preventDefault();
    
      var altaDNI = document.getElementById("alta_dni").value;
      var altaCliente = document.getElementById("alta_cliente").value;
      var altaPatente = document.getElementById("alta_patente").value;
      var altaMarca = document.getElementById("alta_marca").value;
      var altaCnia = document.getElementById("alta_cnia").value;
      var altaVigencia = document.getElementById("alta_vigencia").value;
      var altaID_Deudor = document.getElementById("alta_id_deudor").value;
      var altaVto = document.getElementById("alta_vto").value;
      google.script.run.alta_nuevadeudor(altaVto, altaID_Deudor, altaVigencia, altaCnia, altaMarca, altaPatente, altaCliente, altaDNI);
        modal3.style.display = "none";
    alert('Alta de deudor exitosa');
    
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
    
    document.getElementById('btn-reimprimirReciboMulti').addEventListener('click', reimprimirReciboMulti);
    document.getElementById('btn-reimprimirRecibo').addEventListener('click', reimprimirRecibo);
    document.getElementById('bt-desc-multirec').addEventListener('click', descargaReciboM);
    document.getElementById('bt-desc-rec').addEventListener('click', descargaRecibo);
    document.getElementById('close_session').addEventListener('click', close_sessionok);
    //////////////////////////////////////////////////////////////////
    