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
        pendientesHtml += "<div class='border' style='background-color: #FFFFFF; margin-bottom: 0; box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>" +
          "<div class='row' style='padding: 0px;'>" +
          "<div class='col-1 text-sm' style='font-size: 14px;' id='_deudor" + i + "'>" + result[i][0] + "</div>" +
          "<div class='col-2 text-sm text-truncate' style='font-size: 14px; padding-top: 10px; ' id='_cte" + i + "'>" + result[i][1] + "</div>" +
          "<div class='col-9 p-0 m-0'>" +
          "<div class='row p-0 m-0'>" +
          "<div class='col-2 text-sm text-truncate' style='width: 90px; padding-top: 10px; font-size: 14px;' id='_vto" + i + "'>" + result[i][7] + "</div>" +
          "<div class='col-1 text-sm' style='padding: 10px 0px 0px 0px; width: 20px;font-size: 13px;' id='_cta" + i + "'>" + result[i][5] + "&nbsp;/</div>" +
          "<div class='col-1 text-sm' style='padding: 10px 0px 0px 0px; width: 20px;font-size: 13px;' id='_ctad" + i + "'>" + result[i][6] + "</div>" +
          "<div class='col-2 text-sm' style='width: 170px; padding-top: 10px; font-size: 14px;' id='_cnia" + i + "'>" + result[i][4] + "</div>" +
          "<div class='col-2'>" +
          "<div class='input-group'>" +
          "<div class='input-group-prepend'>" +
          "<span class='input-group-text'>$</span>" +
          "</div>" + 
          "<input type='text' class='form-control' id='_imp" + i + "' value='" + result[i][11] + "'>" +
          "</div>" + "</div>" +
          "<div class='col-1 text-sm text-truncate' style='padding-top: 10px; font-size: 14px; width: 100px; ' id='_pat" + i + "'>" + result[i][2] + "</div>" +
          "<div class='col-2 text-sm text-truncate' style='padding-top: 10px; font-size: 14px;' id='_marca" + i + "'>" + result[i][3] + "</div>" +
          "<div class='col-1 btn btn-sm' style='margin: 2px 0px 0px 5px; border: 1px solid black; width: 32px; height: 32px;'";
    
    // Establecer el estilo según el valor de result[i][9]
    if (result[i][10] === "✔️") {
      pendientesHtml += "id='_ver" + i + "'>✔️</div>";
    } else if (result[i][10] === "❌") {
      pendientesHtml += "id='_ver" + i + "'>❌</div>";
    } else {
      pendientesHtml += "'>" + result[i][10] + "</div>";
    }
    pendientesHtml += 
    "<div class='col-1' style='padding: 2px 0px 0px 5px;width: 48px;'><button class='btn btn-secondary btn-sm' id='_print" + i + "'>🖨️</button></div>"+
    "<div class='col-1' style='padding: 2px 0px 0px 0px;'><button class='btn btn-success btn-sm' id='_btn_cob" + i + "'>COBRAR</button></div>"+
    "</div>" +
      "</div>" +
      "<div style='display: none;' id='_dni" + i + "'>" + result[i][12] + "</div>" +
      "<div style='display: none;' id='_wpp" + i + "'>" + result[i][13] + "</div>" +
      "<div style='display: none;' id='_poliza" + i + "'>" + result[i][14] + "</div>" +
      "<div style='display: none;' id='_recibo" + i + "'>" + result[i][15] + "</div>" +
      "</div></div>";
    
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
    
      google.script.run.pagoNuevo(
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
        tiempoRestanteDiv.innerHTML = "Tiempo expirado";
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
    console.log("cliente: " + usuario_pass + antiguaClave + nuevaClave)
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
    
    
    //////////////////////////////////////////////////////////////////
    