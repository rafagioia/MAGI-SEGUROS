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
    
      // // Ordenar el arreglo result de menor a mayor según las fechas (result[i][2])
      // result.sort(function(a, b) {
      //   var dateA = convertToDate(a[7]);
      //   var dateB = convertToDate(b[7]);
      //   return dateA - dateB;
      // });
    ////ORDEN INVERSO:
    result.sort(function(a, b) {
      var dateA = convertToDate(a[7]);
      var dateB = convertToDate(b[7]);
      return dateB - dateA; // Invertir el orden de comparación
    });
    
      for (var i = 0; i < result.length; i++) {
    pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
    pendientesHtml += "<div class='row' style='padding: 5px;'>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    
    // Columna de deudor
    pendientesHtml += "<div class='col-1 text-sm' style='font-size: 8px;' id='_recibo" + i + "'>" + result[i][0] + "</div>";
    
    // Columna de cliente
    pendientesHtml += "<div class='col-3 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_cte" + i + "'>" + result[i][1] + "</div>";
    
    // Columna de vencimiento
    pendientesHtml += "<div class='col-2 text-sm planilla'  id='_vto" + i + "'>" + result[i][7] + "</div>";
    
    
    
    // <div class='col-2 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_vto" + i + "'>" + result[i][7] + "</div>";
    
    // Columna de cuenta
    pendientesHtml += "<div class='col-2 text-sm planilla'><div class='row p-0 m-0'>"
    
    
    pendientesHtml += "<div class='col-4 m-0 p-0 text-sm planilla p-0'  id='_cta" + i + "'>" + result[i][5] + "</div>";
    pendientesHtml += "<div class='col-2 m-0 p-1 planilla'>/</div>";
    pendientesHtml += "<div class='col-4 m-0 p-0 text-sm planilla p-0'  id='_ctad" + i + "'>" + result[i][6] + "</div></div></div>"
    
    // pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla' id='_cta" + i + "'>" + result[i][5] + "</div>";
    // pendientesHtml += "<div class='col-2 m-0 p-1 planilla'>/</div>";
    // pendientesHtml += "<div class='col-4 m-0 p-1 text-sm planilla'  id='_ctad" + i + "'>" + result[i][6] + "</div></div></div>";
    
    // Columna de CNIA
    pendientesHtml += "<div class='col-3 text-sm planilla' style='padding-top: 10px;' id='_cnia" + i + "'>" + result[i][4] + "</div>";
    
    
    pendientesHtml += "</div></div>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    // Columna de importe
    pendientesHtml += "<div class='col-4 planilla'><div class='input-group'>";
    pendientesHtml += "<div class='col-6 text-sm planilla' style='padding-top: 10px;' id='_imp" + i + "'>" + result[i][10] + "</div><div class='col-1' id='upd_pol" + i + "'><button class='p-0 m-1 btn btn-primary btn-sm' id='bt_whatsapp" + i + "'>??</button></div>";
    
    // Columna de POLIZA
    pendientesHtml += "<div class='col-5  p-0 text-sm planilla'  id='_pol" + i + "'>" + result[i][9] + "</div>";
    
    pendientesHtml += "</div></div>";
    
    // Columna de patente
    pendientesHtml += "<div class='col-4'><div class='row'><div class='text-sm text-truncate planilla' id='_pat" + i + "'>" + result[i][2] + "</div></div><div class='row'><div class='text-sm text-truncate  planilla'  id='_marca" + i + "'>" + result[i][3] + "</div></div></div>";
    
    
    pendientesHtml += "<div class='col-4 row planilla'>";
    
    
      pendientesHtml += "<div class='col-7 row planilla' id='sec_liq" + i + "'>";
    // Comprueba si hay un valor en la columna [13]
    if (result[i][13] > 0) {
      // Si hay un valor, agrega "Venció:" y el valor de la columna
      pendientesHtml += "<div id='liq_id'><b>Venció: </b><div class='text-sm' id='pas_id" + i + "'>" + result[i][13] + " días</div></div>";
      pendientesHtml += "<div id='_wpp_msj" + i + "' style='display: none'>Estimado cliente, nos comunicamos de GIOIA SEGUROS para informarle que el seguro de su " + result[i][3] + ", patente: "  + result[i][2] + ", se venció hace " + result[i][13] + " días. Si ya abonó la cuota del mismo, por favor desestime este mensaje. Saludos. *Gioia Seguros*</div>";
    } else if (result[i][13] < 0) {
      // Si no hay un valor en la columna [13], agrega "Vence en:" y el valor negativo de la columna
      pendientesHtml += "<div id='liq_id'><b>Vence en: </b><div class='text-sm' id='pas_id" + i + "'>" + Math.abs(result[i][13]) + " días</div></div>";
      pendientesHtml += "<div id='_wpp_msj" + i + "' style='display: none'>Estimado cliente, nos comunicamos de GIOIA SEGUROS para informarle que el seguro de su " + result[i][3] + ", patente: "  + result[i][2] + ", se vence dentro de " + Math.abs(result[i][13]) + " días. Si ya abonó la cuota del mismo, por favor desestime este mensaje. Saludos. *Gioia Seguros*</div>";
    } else if (result[i][13] === 0) {
      // Si no hay un valor en la columna [13], agrega "Vence: HOY"
      pendientesHtml += "<div id='liq_id'><b>Vence: </b><div class='text-sm' id='pas_id" + i + "'> ¡HOY! </div></div>";
      pendientesHtml += "<div id='_wpp_msj" + i + "' style='display: none'>Estimado cliente, nos comunicamos de GIOIA SEGUROS para informarle que el seguro de su " + result[i][3] + ", patente: "  + result[i][2] + ", se vence el día de hoy. Si ya abonó la cuota del mismo, por favor desestime este mensaje. Saludos. *Gioia Seguros*</div>";
    }
    
    pendientesHtml += "</div>";
    
      pendientesHtml += "<div class='col-5 row planilla' id='sec_pasa" + i + "'>";
      // Comprueba si hay un valor en la columna [8]
      if (result[i][12]) {
        // Si hay un valor, agrega "Pasado:" y el valor de la columna
        pendientesHtml += "<button class='btn btn-success btn-sm' id='btnPasar" + i + "' style='display: none'>AVISÓ</button><div id='pas_id" + i + "'><b>Aviso: </b><div class='text-sm' id='_fec_pas" + i + "'>" + result[i][12] + "</div></div>";
      } else {
        // Si no hay un valor, agrega un botón "AVISADO"
        pendientesHtml += "<button class='btn btn-success btn-sm' id='btnPasar" + i + "'>AVISÓ</button><div id='pas_id" + i + "' style='display: none'><b>Aviso: </b><div class='text-sm' id='_fec_pas" + i + "'></div></div>";
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
    
    
    // Seleccionar todos los elementos que tienen un ID que comienza con 'bt-whatsapp'
    var divs3 = document.querySelectorAll("[id^='bt_whatsapp']");
    
    divs3.forEach(function (bt_whatsapp) {
      // Agregar un event listener al hacer clic en el botón
      bt_whatsapp.addEventListener("click", function () {
        var id = bt_whatsapp.id.slice(11); // Obtener el índice del div
        let infoMsjWpp = document.getElementById("_wpp_msj" + id).textContent;
    
        // Crear un elemento de texto temporal
        var tempInput = document.createElement("input");
        
        // Asignar el valor de infoMsjWpp al elemento de texto
        tempInput.value = infoMsjWpp;
        
        // Agregar el elemento de texto al DOM (necesario para el método "select" funcionar)
        document.body.appendChild(tempInput);
        
        // Seleccionar el contenido del elemento de texto
        tempInput.select();
        
        // Copiar el contenido al portapapeles
        document.execCommand("copy");
        
        // Eliminar el elemento de texto temporal del DOM
        document.body.removeChild(tempInput);
      });
    });
    
    
    
    
    /////////////// BOTON PARA ACTUALIZAR POLIZA //////////////////
    var divs3 = document.querySelectorAll("[id^='btn_upd_pol']");
    
    divs3.forEach(function (btn_upd_pol) {
      btn_upd_pol.addEventListener("click", function () {
        var id = btn_upd_pol.id.slice(11); // Obtener el índice del div
        let infoRecibo = document.getElementById("_recibo" + id).textContent;
        let infoPoliza = document.getElementById("_pol" + id).value;
        let infoPatente = document.getElementById("_pat" + id).textContent;
        let infoVto = document.getElementById("_vto" + id).value;
        let infoCta = document.getElementById("_cta" + id).value;
        let infoVig = document.getElementById("_ctad" + id).value;
    
        // Ocultar el botón
        document.getElementById("btn_upd_pol" + id).style.display = "none";
    
        google.script.run.withSuccessHandler(function (fechaHoyPasada) {
          document.getElementById("upd_pol" + id).textContent = "??";
        }).updatePol(infoRecibo, infoPoliza, infoPatente, infoVto, infoCta, infoVig);
      });
    });
    
    
    /////////////// BOTON PARA MARCAR AVISO //////////////////
    var divs3 = document.querySelectorAll("[id^='btnPasar']");
    
    divs3.forEach(function (btnPasar) {
      btnPasar.addEventListener("click", function () {
        var id = btnPasar.id.slice(8); // Obtener el índice del div
        let infoRecibo = document.getElementById("_recibo" + id).textContent;
        // Ocultar el botón
        document.getElementById("btnPasar" + id).style.display = "none";
        document.getElementById("pas_id" + id).style.display = "block";
    
        google.script.run.withSuccessHandler(function (fechaHoyPasada) {
        document.getElementById("_fec_pas" + id).textContent = fechaHoyPasada;
        }).avisarPago(infoRecibo);
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
    
    document.getElementById("actualizarListaBtn").addEventListener("click", function() {
      console.log("Botón clicado"); // Verifica si este mensaje se muestra en la consola
    
      var seleccionado = document.getElementById("cnia_s").value;
    
      // Filtrar los elementos basados en el valor seleccionado
      var divs = document.querySelectorAll("#sinPendientes > div");
    
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        var cnia = div.querySelector(".text-sm[id^='_cnia']").textContent;
        var todosLosAgros = ["AGROSALTA", "AGROSALTA C/GRUA", "AGRO (V) C/GRUA", "AGRO MOTO", "AGRO (V)"];
    
        if (seleccionado === "todosLosAgros") {
          if (todosLosAgros.includes(cnia)) {
            div.style.display = "block"; // Mostrar el elemento
          } else {
            div.style.display = "none"; // Ocultar el elemento
          }
        } else if (cnia === seleccionado || seleccionado === "todos") {
          div.style.display = "block"; // Mostrar el elemento
        } else {
          div.style.display = "none"; // Ocultar el elemento
        }
      }
      calcularSuma();
    });
    
    /// GENERAR LISTADO
    document.getElementById("bt-regenarar_lista").addEventListener("click", function() {
      var dia = parseInt(document.getElementById("dia").value, 10);
      var mes = parseInt(document.getElementById("mes").value, 10) + 1; // Sumamos 1 al mes
      var anio = parseInt(document.getElementById("anio").value, 10);
      var anioUltimosDosDigitos = anio % 100;
      
      // Función para agregar un cero delante si el número es menor a 10
      function agregarCero(num) {
        return num < 10 ? "0" + num : num;
      }
    
      // Aplicar la función agregarCero a dia y mes
      var diaFormateado = agregarCero(dia);
      var mesFormateado = agregarCero(mes);
    
      calcularSuma();
    
      google.script.run.withSuccessHandler(updateSinPendientes).getData(diaFormateado, mesFormateado, anioUltimosDosDigitos);
    });
    
    
    }
    
      // Llamar a la función getData() del lado del servidor
      google.script.run.withSuccessHandler(updateSinPendientes).getData();
      /////////////////////////////////////////
    
    
    
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
    
        rowData.push(div.querySelector(".text-sm[id^='_recibo']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cte']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_vto']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cta']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_ctad']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_cnia']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_imp']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_pol']").value);
        rowData.push(div.querySelector(".text-sm[id^='_pat']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_marca']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='_fec_pas']").textContent);
        rowData.push(div.querySelector(".text-sm[id^='pas_id']").textContent);
    
        tableData.push(rowData);
    
        // Sumar el valor
    
    var valor = rowData[6].replace('$', ''); // Eliminar el signo "$"
    valor = valor.replace('.', ''); // Eliminar el signo "."
    valor = parseInt(valor); // Usar parseInt para mantener los decimales
    if (!isNaN(valor)) {
      total += valor;
    }
    console.log("valor: " + i + ": " + total)
    
      }
    
      // Mostrar el total
      var totalElement = document.getElementById("total_val");
      totalElement.value = total.toFixed(2);
    
      return tableData;
    }
    
    function generarPDF(tableData) {
      var ventanaImpresion = window.open('', '', 'width=800,height=600');
    
      ventanaImpresion.document.write('<html><head><title>Lista de pagos liquidados</title></head><body>');
      ventanaImpresion.document.write('<center><h1>LIQUIDACION GENERADA </h1></center><p>');
      ventanaImpresion.document.write('<style>' +
        'table { width: 100%; border-collapse: collapse; }' +
        'th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }' +
        'th.total-label { font-weight: bold; }' +
        'td.total-value { font-weight: bold; font-size: 16px; }' +
        '</style>');
      ventanaImpresion.document.write('<table>');
      ventanaImpresion.document.write('<thead><tr>' +
        '<th>RECIBO:</th>' +
        '<th>CLIENTE:</th>' +
        '<th>VTO:</th>' +
        '<th>CTA:</th>' +
        '<th>DE:</th>' +
        '<th>COMPAÑIA</th>' +
        '<th>IMPORTE:</th>' +
        '<th>POLIZA:</th>' +
        '<th>PATENTE:</th>' +
        '<th>MARCA:</th>' +
        '<th>PASADO:</th>' +
        '<th>LIQUIDADO:</th>' +
        '</tr></thead>');
      ventanaImpresion.document.write('<tbody>');
    
      var total = 0; // Calcula el total una sola vez
    
    
      for (var i = 0; i < tableData.length; i++) {
        ventanaImpresion.document.write('<tr>');
    
        for (var j = 0; j < tableData[i].length; j++) {
          ventanaImpresion.document.write('<td>' + tableData[i][j] + '</td>');
          if (j === 6) { // Columna de importe
            var importe = parseInt(tableData[i][j].replace('$', '').replace('.', ''));
            if (!isNaN(importe)) {
              total += importe;
    
    console.log("valor: " + i + ": " + total)
            }
          }
        }
    
        ventanaImpresion.document.write('</tr>');
      }
    
      // Agregar fila con el total
      ventanaImpresion.document.write('<tr><td colspan="8"></td><td colspan="1" class="total-label">TOTAL:</td><td class="total-value" colspan="1">$' + total + '</td></tr>');
    
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
      
    ///// FIN DEL SCRIPT PARA BUSCAR DATOS POR NOMBRE //////////
    
    function enviarMensajeWPP() {
      event.preventDefault();
      // Obtener el número de teléfono ingresado
      var telefono = document.getElementById("wpp").value;
    
      // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
      window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
    }
    
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
    