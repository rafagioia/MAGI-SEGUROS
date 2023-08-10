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
    
      // Función para convertir la cadena de fecha en formato DD/MM/YYYY a objeto de fecha
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
    
      // var idDeudores = []; // Nuevo array para almacenar los id_deudor distintos
    
    ////////////// LISTA DE PAGOS ///////////////////////
    function updateSinPendientes(result) {
      
      console.log("Result length:", result.length);
    
      var sinPendientesDiv = document.getElementById("sinPendientes");
      var pendientesHtml = "";
    
      for (var i = 0; i < result.length; i++) {
    pendientesHtml += "<div class='border mb-0 bg-white' style='box-shadow: 0px 0px 1px 0px #000;' id='div" + i + "'>";
    pendientesHtml += "<div class='row' style='padding: 5px;'>";
    pendientesHtml += "<div class='col-6 container p-0 m-0'><div class='row p-0 m-0'>";
    
    // Columna de deudor
    pendientesHtml += "<div class='col-1 text-sm' style='font-size: 8px;' id='_deudor" + i + "'>" + result[i][0] + "</div>";
    
    // Columna de cliente
    pendientesHtml += "<div class='col-4 text-sm text-truncate planilla' style=' padding-top: 10px;' id='_cte" + i + "'>" + result[i][1] + "</div>";
    
    // Columna de vencimiento
    pendientesHtml += "<div class='col-2  m-0 p-1 planilla'><input type='text' class='form-control planilla'  id='_vto" + i + "' value='" + result[i][7] + "'></div>";
    pendientesHtml += "<div class='col-2  m-0 p-1 planilla'><input type='text' class='form-control planilla'  id='_hasta" + i + "' value='" + result[i][7] + "'></div>";
    
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
    // if (result[i][10] === "✔️") {
    //   pendientesHtml += "id='_ver" + i + "'>✔️</div>";
    //   pendientesHtml += "<div class='col-2 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button class='btn btn-success btn-sm' style='display: none;' id='_btn_cob" + i + "'>COBRAR</button><button class='btn btn-secondary btn-sm planilla' style='margin-top: 2px' id='_print" + i + "'>🖨️</button></div>";
    //   pendientesHtml += "<div class='col-1 m-0 p-0' style=''><input type='checkbox' class='form-check-input planilla' style='margin: 10px;' id='_check" + i + "'";
    // if (result[i][16] === "TRUE") {
    //   pendientesHtml += " checked='checked'"; // Elimina el atributo checked aquí
    // }
    //   pendientesHtml += "></div><div class='col-1 m-0 planilla' style='padding-top: 7px;' id='_num_rec" + i + "'>" + result[i][15] + "</div>";
    // } else if (result[i][10] === "❌") {
    //   pendientesHtml += "id='_ver" + i + "'>❌</div>";
    //   pendientesHtml += "<div class='col-1 m-0 p-0' style='padding: 2px 0px 0px 5px;'><button style='margin-top: 2px;' class='btn btn-success btn-sm' id='_btn_cob" + i + "'>COBRAR</button><button class='btn btn-secondary btn-sm planilla' style='display: none;' style='margin-top: 2px'  id='_print" + i + "'>🖨️</button></div>";
    //   pendientesHtml += "<div class='col-1 m-0 p-0' style=''><input type='checkbox' class='form-check-input planilla' style='display: none;margin: 10px;' id='_check" + i + "'></div><div class='col-1 m-0 planilla' style='padding-top: 7px;' id='_num_rec" + i + "'>" + result[i][15] + "</div>";
    // }
    
    pendientesHtml += "</div></div></div></div>";
    pendientesHtml += "</div></div></div>";
      }
        sinPendientesDiv.innerHTML = pendientesHtml;
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
    
    document.getElementById('close_session').addEventListener('click', close_sessionok);
    //////////////////////////////////////////////////////////////////
    