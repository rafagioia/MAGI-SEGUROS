 
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
 
 ////////////// ESTILOS DE LA NAV BAR //////////////////
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
 
   ////////////// LISTA DE PAGOS ///////////////////////
   function updateSinPendientes(result) {
     var sinPendientesDiv = document.getElementById("sinPendientes");
     var pendientesHtml = "";
 
     for (var i = 0; i < result.length; i++) {
     
 
 pendientesHtml += "<div class='border' style='background-color: #FFFFFF; margin-bottom: 0; box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>" +
   "<div class='row' style='padding: 0px;'>" +
   "<div class='col-1 text-sm' style='font-size: 14px;' id='_pago" + i + "'>" + result[i][4] + "</div>" +
   "<div class='col-2'>" + 
     "<div class='row p-0 m-0'>" +
     "<div class='text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][2] + "</div>" +
     "</div>" +
     "<div class='row p-0 m-0'>" +
     "<div class='text-sm' style='border: 1px solid black; border-radius: 5px;font-size: 9px; margin: 0px;' id='_suc" + i + "'>" + result[i][10] + "</div>" +
     "</div>" +
   "</div>" +
   "<div class='col-9 p-0 m-0'>" +
   "<div class='row p-0 m-0'>" +
   "<div class='col-2 text-sm text-truncate' style='width: 100px;  padding-top: 10px;font-size: 14px;' id='_vto" + i + "'>" + result[i][3] + "</div>" +
   "<div class='col-2 text-sm text-truncate' style=' padding-top: 10px; width: 5px; font-size: 14px;' id='_cta" + i + "'>" + result[i][5] + "</div>" +
   "<div class='col-1 text-sm text-truncate' style='width: 100px; padding-top: 10px; font-size: 14px;' id='_pol" + i + "'>" + result[i][6] + "</div>" +
   "<div class='col-2 text-sm' style='width: 170px;  padding-top: 10px; font-size: 14px;' id='_cnia" + i + "'>" + result[i][7] + "</div>" +
   "<div class='col-2 text-sm text-truncate' style=' padding-top: 10px; font-size: 14px;' id='_imp" + i + "'>" + result[i][8] + "</div>" +
   "<div class='col-2 text-sm text-truncate' style=' padding-top: 10px; font-size: 14px;' id='_pat" + i + "'>" + result[i][1] + "</div>" +
   "<div class='col-2 text-sm text-truncate' style=' padding-top: 10px; font-size: 14px;' id='_marca" + i + "'>" + result[i][9] + "</div>" +
   "</div>" +
   "</div>" +
   "<div style='border: 1px solid black;display: none;' id='_valid" + i + "'>" + result[i][12] + "</div>" +
   "<div style='border: 1px solid black;display: none;' id='_rec" + i + "'>" + result[i][0] + "</div>" +
   "<div style='display: none;' id='user_" + i + "'>" + result[i][11] + "</div>" +
   "</div></div>";
     }
 
     sinPendientesDiv.textContent = "";
     sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);
   }
 
   // Llamar a la función getData() del lado del servidor
   google.script.run.withSuccessHandler(updateSinPendientes).getData();
   /////////////////////////////////////////
 
   ////////////// LISTA DE GASTOS ///////////////////////
   function updateSinPendientes2(result) {
     var sinPendientesDiv2 = document.getElementById("lista_gastos");
     var pendientesHtml2 = "";
 
     for (var i = 0; i < result.length; i++) {
     
 pendientesHtml2 += "<div class='border' style='background-color: #FFFFFF; margin-bottom: 0; box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>" +
  "<div class='row' style='padding: 0px 0px 0px 10px;'>" + 
 "<div class='col-8'><div class='row'><div class='col-12 text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][0] + 
 "</div></div><div class='row'><div class='col-12 text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][1] + 
 "</div></div></div><div class='col-4'><div class='row'><div class='text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][2] + 
 "</div></div><div class='row'>" + 
 "<div class='text-sm text-truncate' style='border: 1px solid black; border-radius: 5px; font-size: 9px; margin: 0px; width: 90px;' id='_cta" + i + "'>" + result[i][3] +
 "</div></div></div></div></div></div>";
     }
 
     sinPendientesDiv2.textContent = "";
     sinPendientesDiv2.insertAdjacentHTML('beforeend',pendientesHtml2);
   }
 
   // Llamar a la función getData() del lado del servidor
   google.script.run.withSuccessHandler(updateSinPendientes2).getDataGastos();
   /////////////////////////////////////////
 
   ////////////// LISTA DE RECIBIS ///////////////////////
   function updateSinPendientes3(result) {
     var sinPendientesDiv3 = document.getElementById("lista_recibis");
     var pendientesHtml3 = "";
 
     for (var i = 0; i < result.length; i++) {
     
 
     pendientesHtml3 += "<div class='border' style='background-color: #FFFFFF; margin-bottom: 0; box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>" +
  "<div class='row' style='padding: 0px 0px 0px 10px;'>" + 
 "<div class='col-8'><div class='row'><div class='col-12 text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][0] + 
 "</div></div><div class='row'><div class='col-12 text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][1] + 
 "</div></div></div><div class='col-4'><div class='row'><div class='text-sm text-truncate' style='font-size: 14px;' id='_cte" + i + "'>" + result[i][2] + 
 "</div></div><div class='row'>" + 
 "<div class='text-sm text-truncate' style='border: 1px solid black; border-radius: 5px; font-size: 9px; margin: 0px; width: 90px;' id='_cta" + i + "'>" + result[i][3] +
 "</div></div></div></div></div></div>";
     }
 
     sinPendientesDiv3.textContent = "";
     sinPendientesDiv3.insertAdjacentHTML('beforeend',pendientesHtml3);
   }
 
   // Llamar a la función getData() del lado del servidor
   google.script.run.withSuccessHandler(updateSinPendientes3).getDataRecibis();
   /////////////////////////////////////////
 
 
 function sumarValores() {
   // Obtiene los datos del servidor
   
   google.script.run.withSuccessHandler(calcularSumaPagos).getData();
   google.script.run.withSuccessHandler(calcularSumaGastos).getDataGastos();
   google.script.run.withSuccessHandler(calcularSumaRecibis).getDataRecibis();
 
 }
 
 
 function calcularSumaPagos(data) {
   var suma_mp_m = 0;
   var suma_mp_t = 0;
   var suma_ma_m = 0;
   var suma_ma_t = 0;
   var suma_mp_m_d = 0;
   var suma_mp_t_d = 0;
   var suma_ma_m_d = 0;
   var suma_ma_t_d = 0;
 
   // Recorre los datos recibidos y verifica los criterios
   for (var i = 0; i < data.length; i++) {
     var fila = data[i];
     var columnaQ = fila[10]; // Índice 10 corresponde a la columna Q
     var columnaT = fila[12]; // Índice 13 corresponde a la columna T
 
     var fechaPagoStr = fila[4];
     var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio
     var fechaSplit = fechaHoraSplit[1].split(":"); // Dividir la fecha en día, mes y año
     var hora = parseInt(fechaSplit[0], 10);
 
     var valor = fila[8]; // Índice 8 corresponde a la columna Importe
     var valorNumerico = parseInt(valor.replace(/\D/g, ''));
 
     if (columnaQ === "MARCOS PAZ") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_mp_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_mp_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_mp_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_mp_t_d += valorNumerico;
         }
       }
     } else if (columnaQ === "MARIANO ACOSTA") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_ma_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_ma_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_ma_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_ma_t_d += valorNumerico;
         }
       }
     }
   }
 
   document.getElementById('t_pagos_mp_m').value = suma_mp_m;
   document.getElementById('t_pagos_mp_t').value = suma_mp_t;
   document.getElementById('t_pagos_ma_m').value = suma_ma_m;
   document.getElementById('t_pagos_ma_t').value = suma_ma_t;
   document.getElementById('t_pagos_mp_m_d').value = suma_mp_m_d;
   document.getElementById('t_pagos_mp_t_d').value = suma_mp_t_d;
   document.getElementById('t_pagos_ma_m_d').value = suma_ma_m_d;
   document.getElementById('t_pagos_ma_t_d').value = suma_ma_t_d;
 }
 
 
 
 function calcularSumaGastos(data) {
   var suma_gastos_mp_m = 0;
   var suma_gastos_mp_t = 0;
   var suma_gastos_ma_m = 0;
   var suma_gastos_ma_t = 0;
   var suma_gastos_mp_m_d = 0;
   var suma_gastos_mp_t_d = 0;
   var suma_gastos_ma_m_d = 0;
   var suma_gastos_ma_t_d = 0;
 
   // Recorre los datos recibidos y verifica los criterios
   for (var i = 0; i < data.length; i++) {
     var fila = data[i];
     var columnaQ = fila[3]; // Índice 10 corresponde a la columna Q
     var columnaT = fila[5]; // Índice 13 corresponde a la columna T
     var fechaPagoStr = fila[4];
     var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio
     var fechaSplit = fechaHoraSplit[1].split(":"); // Dividir la fecha en día, mes y año
     var hora = parseInt(fechaSplit[0], 10);
 
     var valor = fila[2]; // Índice 8 corresponde a la columna Importe
     var valorNumerico = parseInt(valor.replace(/\D/g, ''));
 
     if (columnaQ === "MARCOS PAZ") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_gastos_mp_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_gastos_mp_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_gastos_mp_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_gastos_mp_t_d += valorNumerico;
         }
       }
     } else if (columnaQ === "MARIANO ACOSTA") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_gastos_ma_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_gastos_ma_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_gastos_ma_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_gastos_ma_t_d += valorNumerico;
         }
       }
     }
   }
 
   document.getElementById('t_gastos_mp_m').value = suma_gastos_mp_m;
   document.getElementById('t_gastos_mp_t').value = suma_gastos_mp_t;
   document.getElementById('t_gastos_ma_m').value = suma_gastos_ma_m;
   document.getElementById('t_gastos_ma_t').value = suma_gastos_ma_t;
   document.getElementById('t_gastos_mp_m_d').value = suma_gastos_mp_m_d;
   document.getElementById('t_gastos_mp_t_d').value = suma_gastos_mp_t_d;
   document.getElementById('t_gastos_ma_m_d').value = suma_gastos_ma_m_d;
   document.getElementById('t_gastos_ma_t_d').value = suma_gastos_ma_t_d;
 
 }
 
 
 function calcularSumaRecibis(data) {
   var suma_recibis_mp_m = 0;
   var suma_recibis_mp_t = 0;
   var suma_recibis_ma_m = 0;
   var suma_recibis_ma_t = 0;
   var suma_recibis_mp_m_d = 0;
   var suma_recibis_mp_t_d = 0;
   var suma_recibis_ma_m_d = 0;
   var suma_recibis_ma_t_d = 0;
 
   // Recorre los datos recibidos y verifica los criterios
   for (var i = 0; i < data.length; i++) {
     var fila = data[i];
     var columnaQ = fila[3]; // Índice 10 corresponde a la columna Q
     var columnaT = fila[5]; // Índice 13 corresponde a la columna T
     var fechaPagoStr = fila[4];
     var fechaHoraSplit = fechaPagoStr.split(" "); // Dividir la cadena por espacio
     var fechaSplit = fechaHoraSplit[1].split(":"); // Dividir la fecha en día, mes y año
     var hora = parseInt(fechaSplit[0], 10);
 
     var valor = fila[2]; // Índice 8 corresponde a la columna Importe
     var valorNumerico = parseInt(valor.replace(/\D/g, ''));
 
     if (columnaQ === "MARCOS PAZ") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_recibis_mp_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_recibis_mp_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_recibis_mp_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_recibis_mp_t_d += valorNumerico;
         }
       }
     } else if (columnaQ === "MARIANO ACOSTA") {
       if (columnaT === "EFECTIVO") {
         if (hora > 8 && hora < 14) {
           suma_recibis_ma_m += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_recibis_ma_t += valorNumerico;
         }
       } else if (columnaT === "DIGITAL") {
         if (hora > 8 && hora < 14) {
           suma_recibis_ma_m_d += valorNumerico;
         } else if (hora > 14 && hora < 21) {
           suma_recibis_ma_t_d += valorNumerico;
         }
       }
     }
   }
 
   document.getElementById('t_recibis_mp_m').value = suma_recibis_mp_m;
   document.getElementById('t_recibis_mp_t').value = suma_recibis_mp_t;
   document.getElementById('t_recibis_ma_m').value = suma_recibis_ma_m;
   document.getElementById('t_recibis_ma_t').value = suma_recibis_ma_t;
   document.getElementById('t_recibis_mp_m_d').value = suma_recibis_mp_m_d;
   document.getElementById('t_recibis_mp_t_d').value = suma_recibis_mp_t_d;
   document.getElementById('t_recibis_ma_m_d').value = suma_recibis_ma_m_d;
   document.getElementById('t_recibis_ma_t_d').value = suma_recibis_ma_t_d;
 
 }
 
 
 
 sumarValores()
 
 
   /////////////// SUMA VALORES //////////////
  function calcularTotal() {
     // Obtener referencias a los inputs
     var t_pagos_mp_m = parseFloat(document.getElementById("t_pagos_mp_m").value) || 0;
     var t_gastos_mp_m = parseFloat(document.getElementById("t_gastos_mp_m").value) || 0;
     var t_recibis_mp_m = parseFloat(document.getElementById("t_recibis_mp_m").value) || 0;
     var t_pagos_mp_t = parseFloat(document.getElementById("t_pagos_mp_t").value) || 0;
     var t_gastos_mp_t = parseFloat(document.getElementById("t_gastos_mp_t").value) || 0;
     var t_recibis_mp_t = parseFloat(document.getElementById("t_recibis_mp_t").value) || 0;
     var t_pagos_ma_m = parseFloat(document.getElementById("t_pagos_ma_m").value) || 0;
     var t_gastos_ma_m = parseFloat(document.getElementById("t_gastos_ma_m").value) || 0;
     var t_recibis_ma_m = parseFloat(document.getElementById("t_recibis_ma_m").value) || 0;
     var t_pagos_ma_t = parseFloat(document.getElementById("t_pagos_ma_t").value) || 0;
     var t_gastos_ma_t = parseFloat(document.getElementById("t_gastos_ma_t").value) || 0;
     var t_recibis_ma_t = parseFloat(document.getElementById("t_recibis_ma_t").value) || 0;
     
     var t_pagos_mp_m_d = parseFloat(document.getElementById("t_pagos_mp_m_d").value) || 0;
     var t_gastos_mp_m_d = parseFloat(document.getElementById("t_gastos_mp_m_d").value) || 0;
     var t_recibis_mp_m_d = parseFloat(document.getElementById("t_recibis_mp_m_d").value) || 0;
     var t_pagos_mp_t_d = parseFloat(document.getElementById("t_pagos_mp_t_d").value) || 0;
     var t_gastos_mp_t_d = parseFloat(document.getElementById("t_gastos_mp_t_d").value) || 0;
     var t_recibis_mp_t_d = parseFloat(document.getElementById("t_recibis_mp_t_d").value) || 0;
     var t_pagos_ma_m_d = parseFloat(document.getElementById("t_pagos_ma_m_d").value) || 0;
     var t_gastos_ma_m_d = parseFloat(document.getElementById("t_gastos_ma_m_d").value) || 0;
     var t_recibis_ma_m_d = parseFloat(document.getElementById("t_recibis_ma_m_d").value) || 0;
     var t_pagos_ma_t_d = parseFloat(document.getElementById("t_pagos_ma_t_d").value) || 0;
     var t_gastos_ma_t_d = parseFloat(document.getElementById("t_gastos_ma_t_d").value) || 0;
     var t_recibis_ma_t_d = parseFloat(document.getElementById("t_recibis_ma_t_d").value) || 0;
 
     // Calcular el total
     var total1 = t_pagos_mp_m  + t_recibis_mp_m - t_gastos_mp_m;
     var total2 = t_pagos_mp_t  + t_recibis_mp_t - t_gastos_mp_t;
     var total3 = t_pagos_ma_m  + t_recibis_ma_m - t_gastos_ma_m;
     var total4 = t_pagos_ma_t  + t_recibis_ma_t - t_gastos_ma_t;
     var total5 = t_pagos_mp_m_d  + t_recibis_mp_m_d - t_gastos_mp_m_d;
     var total6 = t_pagos_mp_t_d  + t_recibis_mp_t_d - t_gastos_mp_t_d;
     var total7 = t_pagos_ma_m_d  + t_recibis_ma_m_d - t_gastos_ma_m_d;
     var total8 = t_pagos_ma_t_d  + t_recibis_ma_t_d - t_gastos_ma_t_d;
 
     // Asignar el valor al input total
     document.getElementById("t_total_mp_m").value = total1;
     document.getElementById("t_total_mp_t").value = total2;
     document.getElementById("t_total_ma_m").value = total3;
     document.getElementById("t_total_ma_t").value = total4;
     document.getElementById("t_total_mp_m_d").value = total5;
     document.getElementById("t_total_mp_t_d").value = total6;
     document.getElementById("t_total_ma_m_d").value = total7;
     document.getElementById("t_total_ma_t_d").value = total8;
   }
 
 
 ///////////////////////////// DESCARGAR ARCHIVO EXCEL ////////////////////////////
 
 
 function refresh() {
   const spinner = document.getElementById('spinner_refresh');
   spinner.style.display = 'block';
 
   google.script.run.withSuccessHandler(updateSinPendientes).getData();
   google.script.run.withSuccessHandler(updateSinPendientes2).getDataGastos();
   google.script.run.withSuccessHandler(updateSinPendientes3).getDataRecibis();
 
   google.script.run.withSuccessHandler(calcularSumaPagos).getData();
   google.script.run.withSuccessHandler(calcularSumaGastos).getDataGastos();
   google.script.run.withSuccessHandler(calcularSumaRecibis).getDataRecibis();
 
   // Ocultar el spinner después de completar todas las llamadas
   Promise.all([
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getData();
     }),
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getDataGastos();
     }),
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getDataRecibis();
     })
   ]).then(() => {
     spinner.style.display = 'none';
   });
 }
 
 
 function bajarXLM(downloadUrl) {
   // Lógica para descargar el archivo
   alert("Envío de caja exitoso!");
    const spinner = document.getElementById('spinner_send_caja');
       spinner.style.display = 'none';
 }
 
 function mostrarErrorEnvio() {
   alert("Error en el envío, por favor reintente");
    const spinner = document.getElementById('spinner_send_caja');
       spinner.style.display = 'none';
 }
 
 function enviarCaja() {
     event.preventDefault();
    const spinner = document.getElementById('spinner_send_caja');
   spinner.style.display = 'block';
 
     calcularTotal()
 
 // inputs
     var t_pagos_mp_m = parseFloat(document.getElementById("t_pagos_mp_m").value) || 0;
     var t_gastos_mp_m = parseFloat(document.getElementById("t_gastos_mp_m").value) || 0;
     var t_recibis_mp_m = parseFloat(document.getElementById("t_recibis_mp_m").value) || 0;
     var t_pagos_mp_t = parseFloat(document.getElementById("t_pagos_mp_t").value) || 0;
     var t_gastos_mp_t = parseFloat(document.getElementById("t_gastos_mp_t").value) || 0;
     var t_recibis_mp_t = parseFloat(document.getElementById("t_recibis_mp_t").value) || 0;
     var t_pagos_ma_m = parseFloat(document.getElementById("t_pagos_ma_m").value) || 0;
     var t_gastos_ma_m = parseFloat(document.getElementById("t_gastos_ma_m").value) || 0;
     var t_recibis_ma_m = parseFloat(document.getElementById("t_recibis_ma_m").value) || 0;
     var t_pagos_ma_t = parseFloat(document.getElementById("t_pagos_ma_t").value) || 0;
     var t_gastos_ma_t = parseFloat(document.getElementById("t_gastos_ma_t").value) || 0;
     var t_recibis_ma_t = parseFloat(document.getElementById("t_recibis_ma_t").value) || 0;  
 
 // inputs digitales
     var t_pagos_mp_m_d = parseFloat(document.getElementById("t_pagos_mp_m_d").value) || 0;
     var t_gastos_mp_m_d = parseFloat(document.getElementById("t_gastos_mp_m_d").value) || 0;
     var t_recibis_mp_m_d = parseFloat(document.getElementById("t_recibis_mp_m_d").value) || 0;
     var t_pagos_mp_t_d = parseFloat(document.getElementById("t_pagos_mp_t_d").value) || 0;
     var t_gastos_mp_t_d = parseFloat(document.getElementById("t_gastos_mp_t_d").value) || 0;
     var t_recibis_mp_t_d = parseFloat(document.getElementById("t_recibis_mp_t_d").value) || 0;
     var t_pagos_ma_m_d = parseFloat(document.getElementById("t_pagos_ma_m_d").value) || 0;
     var t_gastos_ma_m_d = parseFloat(document.getElementById("t_gastos_ma_m_d").value) || 0;
     var t_recibis_ma_m_d = parseFloat(document.getElementById("t_recibis_ma_m_d").value) || 0;
     var t_pagos_ma_t_d = parseFloat(document.getElementById("t_pagos_ma_t_d").value) || 0;
     var t_gastos_ma_t_d = parseFloat(document.getElementById("t_gastos_ma_t_d").value) || 0;
     var t_recibis_ma_t_d = parseFloat(document.getElementById("t_recibis_ma_t_d").value) || 0;   
 
   // Llamar a la función getData() del lado del servidor
   google.script.run.withSuccessHandler(bajarXLM).withFailureHandler(mostrarErrorEnvio).generateExcelFileAndSendEmail(t_pagos_mp_m,t_gastos_mp_m,t_recibis_mp_m,t_pagos_mp_t,t_gastos_mp_t,t_recibis_mp_t, t_pagos_ma_m,t_gastos_ma_m,t_recibis_ma_m,t_pagos_ma_t,t_gastos_ma_t,t_recibis_ma_t, t_pagos_mp_m_d, t_gastos_mp_m_d, t_recibis_mp_m_d, t_pagos_mp_t_d, t_gastos_mp_t_d, t_recibis_mp_t_d,  t_pagos_ma_m_d, t_gastos_ma_m_d, t_recibis_ma_m_d, t_pagos_ma_t_d, t_gastos_ma_t_d, t_recibis_ma_t_d);
 
   
 }
 
 
 function enviarCajaOld() {
     event.preventDefault();
    const spinner = document.getElementById('spinner_send_caja_old');
   spinner.style.display = 'block';
     calcularTotal()
 
 var today = document.getElementById("fecha_caja").value; // Obtener el valor del elemento
 
 
 // inputs
     var t_pagos_mp_m = parseFloat(document.getElementById("t_pagos_mp_m").value) || 0;
     var t_gastos_mp_m = parseFloat(document.getElementById("t_gastos_mp_m").value) || 0;
     var t_recibis_mp_m = parseFloat(document.getElementById("t_recibis_mp_m").value) || 0;
     var t_pagos_mp_t = parseFloat(document.getElementById("t_pagos_mp_t").value) || 0;
     var t_gastos_mp_t = parseFloat(document.getElementById("t_gastos_mp_t").value) || 0;
     var t_recibis_mp_t = parseFloat(document.getElementById("t_recibis_mp_t").value) || 0;
     var t_pagos_ma_m = parseFloat(document.getElementById("t_pagos_ma_m").value) || 0;
     var t_gastos_ma_m = parseFloat(document.getElementById("t_gastos_ma_m").value) || 0;
     var t_recibis_ma_m = parseFloat(document.getElementById("t_recibis_ma_m").value) || 0;
     var t_pagos_ma_t = parseFloat(document.getElementById("t_pagos_ma_t").value) || 0;
     var t_gastos_ma_t = parseFloat(document.getElementById("t_gastos_ma_t").value) || 0;
     var t_recibis_ma_t = parseFloat(document.getElementById("t_recibis_ma_t").value) || 0;  
 
 // inputs digitales
     var t_pagos_mp_m_d = parseFloat(document.getElementById("t_pagos_mp_m_d").value) || 0;
     var t_gastos_mp_m_d = parseFloat(document.getElementById("t_gastos_mp_m_d").value) || 0;
     var t_recibis_mp_m_d = parseFloat(document.getElementById("t_recibis_mp_m_d").value) || 0;
     var t_pagos_mp_t_d = parseFloat(document.getElementById("t_pagos_mp_t_d").value) || 0;
     var t_gastos_mp_t_d = parseFloat(document.getElementById("t_gastos_mp_t_d").value) || 0;
     var t_recibis_mp_t_d = parseFloat(document.getElementById("t_recibis_mp_t_d").value) || 0;
     var t_pagos_ma_m_d = parseFloat(document.getElementById("t_pagos_ma_m_d").value) || 0;
     var t_gastos_ma_m_d = parseFloat(document.getElementById("t_gastos_ma_m_d").value) || 0;
     var t_recibis_ma_m_d = parseFloat(document.getElementById("t_recibis_ma_m_d").value) || 0;
     var t_pagos_ma_t_d = parseFloat(document.getElementById("t_pagos_ma_t_d").value) || 0;
     var t_gastos_ma_t_d = parseFloat(document.getElementById("t_gastos_ma_t_d").value) || 0;
     var t_recibis_ma_t_d = parseFloat(document.getElementById("t_recibis_ma_t_d").value) || 0;   
 
   // Llamar a la función getData() del lado del servidor
   google.script.run.withSuccessHandler(bajarXLM).withFailureHandler(mostrarErrorEnvio).generateExcelFileAndSendEmail(t_pagos_mp_m,t_gastos_mp_m,t_recibis_mp_m,t_pagos_mp_t,t_gastos_mp_t,t_recibis_mp_t, t_pagos_ma_m,t_gastos_ma_m,t_recibis_ma_m,t_pagos_ma_t,t_gastos_ma_t,t_recibis_ma_t, t_pagos_mp_m_d, t_gastos_mp_m_d, t_recibis_mp_m_d, t_pagos_mp_t_d, t_gastos_mp_t_d, t_recibis_mp_t_d,  t_pagos_ma_m_d, t_gastos_ma_m_d, t_recibis_ma_m_d, t_pagos_ma_t_d, t_gastos_ma_t_d, t_recibis_ma_t_d, today);
 }
 
 
 
 
 function abrir_caja_old() {
     event.preventDefault();
    const spinner = document.getElementById('spinner_open_caja_old');
   spinner.style.display = 'block';
 
 document.getElementById("lista_recibis").textContent = "";
 document.getElementById("lista_gastos").textContent = "";
 document.getElementById("sinPendientes").textContent = "";
 
 document.getElementById("t_pagos_mp_m").value = "";
 document.getElementById("t_gastos_mp_m").value = "";
 document.getElementById("t_recibis_mp_m").value = "";
 document.getElementById("t_pagos_mp_t").value = "";
 document.getElementById("t_gastos_mp_t").value = "";
 document.getElementById("t_recibis_mp_t").value = "";
 document.getElementById("t_pagos_ma_m").value = "";
 document.getElementById("t_gastos_ma_m").value = "";
 document.getElementById("t_recibis_ma_m").value = "";
 document.getElementById("t_pagos_ma_t").value = "";
 document.getElementById("t_gastos_ma_t").value = "";
 document.getElementById("t_recibis_ma_t").value = "";
 document.getElementById("t_pagos_mp_m_d").value = "";
 document.getElementById("t_gastos_mp_m_d").value = "";
 document.getElementById("t_recibis_mp_m_d").value = "";
 document.getElementById("t_pagos_mp_t_d").value = "";
 document.getElementById("t_gastos_mp_t_d").value = "";
 document.getElementById("t_recibis_mp_t_d").value = "";
 document.getElementById("t_pagos_ma_m_d").value = "";
 document.getElementById("t_gastos_ma_m_d").value = "";
 document.getElementById("t_recibis_ma_m_d").value = "";
 document.getElementById("t_pagos_ma_t_d").value = ""; 
 document.getElementById("t_gastos_ma_t_d").value = ""; 
 document.getElementById("t_recibis_ma_t_d").value = "";
 
 
 var today = document.getElementById("fecha_caja").value; // Obtener el valor del elemento
 
   google.script.run.withSuccessHandler(updateSinPendientes).getData(today);
   google.script.run.withSuccessHandler(updateSinPendientes2).getDataGastos(today);
   google.script.run.withSuccessHandler(updateSinPendientes3).getDataRecibis(today);
 
   google.script.run.withSuccessHandler(calcularSumaPagos).getData(today);
   google.script.run.withSuccessHandler(calcularSumaGastos).getDataGastos(today);
   google.script.run.withSuccessHandler(calcularSumaRecibis).getDataRecibis(today);
 
   // Ocultar el spinner después de completar todas las llamadas
   Promise.all([
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getData();
     }),
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getDataGastos();
     }),
     new Promise((resolve, reject) => {
       google.script.run.withSuccessHandler(resolve).getDataRecibis();
     })
   ]).then(() => {
     spinner.style.display = 'none';
   });
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
 
 
 //////////////////////////////////////////////////////////////////
 
 document.getElementById('refresh').addEventListener('click', refresh);
 document.getElementById('enviarCajaOld').addEventListener('click', enviarCajaOld);
 document.getElementById('abrir_caja_old').addEventListener('click', abrir_caja_old);
 document.getElementById('cierreCaja').addEventListener('click', enviarCaja);