
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


function filtrar(event) {
 event.preventDefault();
  const spinner = document.getElementById('spinner_filtrar');
 spinner.style.display = 'block';
document.getElementById("polizas-no-vigentes").checked = false;
 const cnia_filter = document.getElementById('companiaSelect').value;
 const patente_filter = document.getElementById('patenteSelect').value;
 const dni_filter = document.getElementById('dniSelect').value;
 const estado_filter = document.getElementById('estadoSelect').value;
 const nombre_filter = document.getElementById('nombreSelect').value;
 google.script.run.withSuccessHandler(function(result) {
 // Actualizar HTML de la página con los nuevos resultados
 var sinPendientesDiv = document.getElementById("sinPendientes");

var pendientesHtml = "";
 for (var i = result.length - 1; i >= 0; i--) {

var  bgColor = "";

var today = new Date();

var dateParts2 = result[i][16].split("/");
var month2 = parseInt(dateParts2[1], 10) - 1; // Restar 1 al mes
var day2 = parseInt(dateParts2[0], 10);
var year2 = new Date().getFullYear(); // Obtener el año actual
var date2 = new Date(year2, month2, day2); // Crear el objeto Date

var displayS;
var estado;
var name;
if (result[i][9] == "ANULACION") {
 estado = "ANULADA";
 txColor = "#DC143C";
 name = "on";
 displayS = "display: none;";
} else if (result[i][9] == "PENDIENTE") {
  estado = "PENDIENTE";
 txColor = "#4C2882";
 name = "off";
 displayS = "display: block;";
} else if (date2 < today) {
  estado = "NO VIGENTE";
 txColor = "#474B4E";
 name = "on";
 displayS = "display: none;";
} else {
  estado = "VIGENTE";
 txColor = "#008000";
 name = "off";
 displayS = "display: block;";
}


pendientesHtml += "<div class='border' style='" + displayS + "margin-bottom: 0;border-radius:5px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;background-color:" + bgColor + "' id='div" + i + "' name='" + name + "'>" +
    "<div class='row p-0 m-0'>" +
        "<div class='col-5 cnia_border text-sm text-truncate fs-7' style='padding: 0px 0px 0px 4px;" + 
        (result[i][5] === 'FED PAT' ? "background-color: #002392;" :
        result[i][5] === 'AGROSALTA [RC]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [RC-GRUA]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [B1]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [MOTO]' ? "background-color: #FD964D;" :
        result[i][5] === 'RIVADAVIA' ? "background-color: #28BEF5;" :
        result[i][5] === 'MAPFRE' ? "background-color: #CB3234;" :
        result[i][5] === 'RIO URUGUAY' ? "background-color: #5AC4C3;" :
        result[i][5] === 'LIBRA' ? "background-color: #FF8000;" :
        result[i][5] === 'NIVEL' ? "background-color: #F57C00;" :
        result[i][5] === 'PROVIDENCIA' ? "background-color: #94B3FD;" :
        result[i][5] === 'LA CAJA' ? "background-color: #EF5350;" :
        result[i][5] === 'MERCANTIL' ? "background-color: #966CA7;" :
        result[i][5] === 'SAN PATRICIO' ? "background-color: #EF5350;" :
        result[i][5] === 'ATM' ? "background-color: #EF5350;" :
        result[i][5] === 'BENEFICIO' ? "background-color: #9EBAD1;" :
        result[i][5] === 'ALLIANZ' ? "background-color: #68C1C8;" :
        result[i][5] === 'ORBIS' ? "background-color: #C8C560;" :
        result[i][5] === 'ESCUDO' ? "background-color: #9EBAD1;" :
        result[i][5] === 'DIGMA' ? "background-color: #68C1C8;" :
        result[i][5] === 'CARDINAL' ? "background-color: #C8C560;" :
        result[i][5] === 'GRUA' ? "background-color: #6088A9;" : "") +
        "' id='cnia_" + i + "'>" + result[i][5] + "</div>"+
        "<div class='col-7 modulo-sm text-truncate fs-7' style='padding: 0px 0px 0px 4px;' id='nombre_" + i + "'>" + result[i][2] + "</div>" +
    "</div>" +
    "<div class='row m-0 p-0'>" +
        "<div class='col-5 modulo'  style='display: none;' id='dni_" + i + "'>" + result[i][1] + "</div>" +
    "</div>" +
    "<div class='row p-0 m-0'>" +
        "<div class='col-4 m-0 px-2 modulo-sm text-truncate fs-7' id='patente_" + i + "'>" + result[i][0] + "</div>" +
        "<div class='col-8 modulo-sm text-truncate fs-7 p-0' id='marca_" + i + "'>" + result[i][11] + "</div>" +
    "</div>" +
    "<div class='row m-0 p-0' style='border: 1px 0px 0px 1px solid black;'>" +
        "<div class='col-3 modulo-sm text-truncate fs-7 p-0 px-1' id='refa_desde_" + i + "'>" + result[i][15] + "</div>" +
        "<div class='col-3 modulo-sm text-truncate fs-7 p-0 px-1' id='refa_hasta_" + i + "'>" + result[i][16] + "</div>" +
        "<div class='col-6 modulo-sm fs-7 text-truncate p-0' style='display: none; padding-top: 5px; align: center; color: " + txColor + "' id='operacion_" + i + "'>" + result[i][9] + "</div>" +
        "<div class='col-6 modulo-sm fs-7 text-truncate p-0' style='padding-top: 5px; font-weight: 800; text-align: center; color: " + txColor + "' id='estado_" + i + "'>" + estado + "</div>" +
    "</div>" +

   "<div style='display: none;' id='notasVeh_" + i + "'>" + result[i][31] + "</div>"+
   "<div style='display: none;' id='sucursal_" + i + "'>" + result[i][3] + "</div>"+
   "<div style='display: none;' id='importe_" + i + "'>" + result[i][4] + "</div>"+
   "<div style='display: none;' id='poliza_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none;' id='cobertura_" + i + "'>" + result[i][10] + "</div>"+
   "<div style='display: none;' id='fpago_" + i + "'>" + result[i][12] + "</div>"+
   "<div style='display: none;' id='domicilio_" + i + "'>" + result[i][17] + "</div>"+
   "<div style='display: none;' id='localidad_" + i + "'>" + result[i][18] + "</div>"+
   "<div style='display: none;' id='wpp_" + i + "'>" + result[i][19] + "</div>"+
   "<div style='display: none;' id='mail_" + i + "'>" + result[i][20] + "</div>"+
   "<div style='display: none;' id='notascte_" + i + "'>" + result[i][21] + "</div>"+
   "<div style='display: none;' id='califica_" + i + "'>" + result[i][22] + "</div>"+
   "<div style='display: none;' id='anio_" + i + "'>" + result[i][23] + "</div>"+
   "<div style='display: none;' id='tipo_" + i + "'>" + result[i][24] + "</div>"+
   "<div style='display: none;' id='motor_" + i + "'>" + result[i][25] + "</div>"+
   "<div style='display: none;' id='chasis_" + i + "'>" + result[i][26] + "</div>"+
   "<div style='display: none;' id='color_" + i + "'>" + result[i][27] + "</div>"+
   "<div style='display: none;' id='suma_" + i + "'>" + result[i][28] + "</div>"+
   "<div style='display: none;' id='accesorio_" + i + "'>" + result[i][29] + "</div>"+
   "<div style='display: none;' id='vtv_" + i + "'>" + result[i][30] + "</div>"+
   "<div style='display: none;' id='refa_" + i + "'>" + result[i][13] + "</div>"+
   "<div style='display: none;' id='danios_" + i + "'>" + result[i][32] + "</div>"+
   "<div style='display: none;' id='index_" + i + "'>" + result[i][14] + "</div>"+
   "<div style='display: none;' id='vigencia_" + i + "'>" + result[i][7] + "</div>"+
   "<div style='display: none;' id='hasta_" + i + "'>" + result[i][8] + "</div>"+
  "<div style='display: none;' id='cuo1_vto_" + i + "'>" + result[i][33] + "</div>"+
  "<div style='display: none;' id='cuo1_fpag_" + i + "'>" + result[i][34] + "</div>"+
  "<div style='display: none;' id='cuo1_cuo_" + i + "'>" + result[i][35] + "</div>"+
  "<div style='display: none;' id='cuo1_imp_" + i + "'>" + result[i][36] + "</div>"+
  "<div style='display: none;' id='cuo2_vto_" + i + "'>" + result[i][37] + "</div>"+
  "<div style='display: none;' id='cuo2_fpag_" + i + "'>" + result[i][38] + "</div>"+
  "<div style='display: none;' id='cuo2_cuo_" + i + "'>" + result[i][39] + "</div>"+
  "<div style='display: none;' id='cuo2_imp_" + i + "'>" + result[i][40] + "</div>"+
  "<div style='display: none;' id='cuo3_vto_" + i + "'>" + result[i][41] + "</div>"+
  "<div style='display: none;' id='cuo3_fpag_" + i + "'>" + result[i][42] + "</div>"+
  "<div style='display: none;' id='cuo3_cuo_" + i + "'>" + result[i][43] + "</div>"+
  "<div style='display: none;' id='cuo3_imp_" + i + "'>" + result[i][44] + "</div>"+
  "<div style='display: none;' id='cuo4_vto_" + i + "'>" + result[i][45] + "</div>"+
  "<div style='display: none;' id='cuo4_fpag_" + i + "'>" + result[i][46] + "</div>"+
  "<div style='display: none;' id='cuo4_cuo_" + i + "'>" + result[i][47] + "</div>"+
  "<div style='display: none;' id='cuo4_imp_" + i + "'>" + result[i][48] + "</div>"+
  "<div style='display: none;' id='cuo5_vto_" + i + "'>" + result[i][49] + "</div>"+
  "<div style='display: none;' id='cuo5_fpag_" + i + "'>" + result[i][50] + "</div>"+
  "<div style='display: none;' id='cuo5_cuo_" + i + "'>" + result[i][51] + "</div>"+
  "<div style='display: none;' id='cuo5_imp_" + i + "'>" + result[i][52] + "</div>"+
  "<div style='display: none;' id='cuo6_vto_" + i + "'>" + result[i][53] + "</div>"+
  "<div style='display: none;' id='cuo6_fpag_" + i + "'>" + result[i][54] + "</div>"+
  "<div style='display: none;' id='cuo6_cuo_" + i + "'>" + result[i][55] + "</div>"+
  "<div style='display: none;' id='cuo6_imp_" + i + "'>" + result[i][56] + "</div>"+
  "<div style='display: none;' id='cuo7_vto_" + i + "'>" + result[i][57] + "</div>"+
  "<div style='display: none;' id='cuo7_fpag_" + i + "'>" + result[i][58] + "</div>"+
  "<div style='display: none;' id='cuo7_cuo_" + i + "'>" + result[i][59] + "</div>"+
  "<div style='display: none;' id='cuo7_imp_" + i + "'>" + result[i][60] + "</div>"+
  "<div style='display: none;' id='cuo8_vto_" + i + "'>" + result[i][61] + "</div>"+
  "<div style='display: none;' id='cuo8_fpag_" + i + "'>" + result[i][62] + "</div>"+
  "<div style='display: none;' id='cuo8_cuo_" + i + "'>" + result[i][63] + "</div>"+
  "<div style='display: none;' id='cuo8_imp_" + i + "'>" + result[i][64] + "</div>"+
  "<div style='display: none;' id='cuo9_vto_" + i + "'>" + result[i][65] + "</div>"+
  "<div style='display: none;' id='cuo9_fpag_" + i + "'>" + result[i][66] + "</div>"+
  "<div style='display: none;' id='cuo9_cuo_" + i + "'>" + result[i][67] + "</div>"+
  "<div style='display: none;' id='cuo9_imp_" + i + "'>" + result[i][68] + "</div>"+
  "<div style='display: none;' id='cuo10_vto_" + i + "'>" + result[i][69] + "</div>"+
  "<div style='display: none;' id='cuo10_fpag_" + i + "'>" + result[i][70] + "</div>"+
  "<div style='display: none;' id='cuo10_cuo_" + i + "'>" + result[i][71] + "</div>"+
  "<div style='display: none;' id='cuo10_imp_" + i + "'>" + result[i][72] + "</div>"+
  "<div style='display: none;' id='cuo11_vto_" + i + "'>" + result[i][73] + "</div>"+
  "<div style='display: none;' id='cuo11_fpag_" + i + "'>" + result[i][74] + "</div>"+
  "<div style='display: none;' id='cuo11_cuo_" + i + "'>" + result[i][75] + "</div>"+
  "<div style='display: none;' id='cuo11_imp_" + i + "'>" + result[i][76] + "</div>"+
  "<div style='display: none;' id='cuo12_vto_" + i + "'>" + result[i][77] + "</div>"+
  "<div style='display: none;' id='cuo12_fpag_" + i + "'>" + result[i][78] + "</div>"+
  "<div style='display: none;' id='cuo12_cuo_" + i + "'>" + result[i][79] + "</div>"+
  "<div style='display: none;' id='cuo12_imp_" + i + "'>" + result[i][80] + "</div>"+

   "</div>";
   }
   sinPendientesDiv.textContent = "";
    sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);

if (result.length === 0) {
 sinPendientesDiv.textContent = "No se encontró ningún valor.";
 spinner.style.display = 'none';
}

     // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
     document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
     document.getElementsByName("domicilio")[0].value = document.getElementById("domicilio_" + id).textContent;
     document.getElementsByName("localidad")[0].value = document.getElementById("localidad_" + id).textContent;
     document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
     document.getElementsByName("fpago")[0].value = document.getElementById("fpago_" + id).textContent;
     document.getElementsByName("mail")[0].value = document.getElementById("mail_" + id).textContent;
     document.getElementsByName("notascte")[0].value = document.getElementById("notascte_" + id).textContent;
    //  document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
    //  document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("marca_v")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("patente_v")[0].value = document.getElementById("patente_" + id).textContent;
     document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
     document.getElementsByName("vigencia")[0].value = document.getElementById("vigencia_" + id).textContent;
     document.getElementsByName("hasta")[0].value = document.getElementById("hasta_" + id).textContent;
     document.getElementsByName("cobertura")[0].value = document.getElementById("cobertura_" + id).textContent;
     document.getElementsByName("refa")[0].value = document.getElementById("refa_" + id).textContent;
     document.getElementsByName("importe")[0].value = document.getElementById("importe_" + id).textContent;
     document.getElementsByName("sucursal")[0].value = document.getElementById("sucursal_" + id).textContent;
     document.getElementsByName("operacion")[0].value = document.getElementById("operacion_" + id).textContent;
     document.getElementsByName("poliza")[0].value = document.getElementById("poliza_" + id).textContent;
     document.getElementsByName("califica_cliente")[0].value = document.getElementById("califica_" + id).textContent;
     document.getElementsByName("anio")[0].value = document.getElementById("anio_" + id).textContent;
     document.getElementsByName("motor")[0].value = document.getElementById("motor_" + id).textContent;
     document.getElementsByName("chasis")[0].value = document.getElementById("chasis_" + id).textContent;
     document.getElementsByName("color")[0].value = document.getElementById("color_" + id).textContent;
     document.getElementsByName("suma")[0].value = document.getElementById("suma_" + id).textContent;
     document.getElementsByName("accesorio")[0].value = document.getElementById("accesorio_" + id).textContent;
     document.getElementsByName("vtv")[0].value = document.getElementById("vtv_" + id).textContent;
     document.getElementsByName("notasVeh")[0].value = document.getElementById("notasVeh_" + id).textContent;
     document.getElementsByName("danios")[0].value = document.getElementById("danios_" + id).textContent;
     document.getElementsByName("index")[0].value = document.getElementById("index_" + id).textContent;
     document.getElementsByName("refa_desde")[0].value = document.getElementById("refa_desde_" + id).textContent;
     document.getElementsByName("refa_hasta")[0].value = document.getElementById("refa_hasta_" + id).textContent;
for (let i = 1; i <= 12; i++) {
    // Construye los ID de los elementos
    let vto = document.getElementById(`cuo${i}_vto`);
    let fpag = document.getElementById(`cuo${i}_fpag`);
    let cuo = document.getElementById(`cuo${i}_cuo`);
    let imp = document.getElementById(`cuo${i}_imp`);

    if (!vto || !fpag || !cuo || !imp) {
        console.error(`Faltan elementos para el índice ${i}`);
        continue; // Salta a la siguiente iteración si falta algún elemento
    }

    // Asigna los valores desde los elementos de datos
    let vtoData = document.getElementById(`cuo${i}_vto_${id}`);
    let fpagData = document.getElementById(`cuo${i}_fpag_${id}`);
    let cuoData = document.getElementById(`cuo${i}_cuo_${id}`);
    let refaData = document.getElementById(`refa_${id}`);
    let impData = document.getElementById(`cuo${i}_imp_${id}`);

    if (vtoData && fpagData && cuoData && refaData && impData) {
        // Obtén los valores
        let vtoValue = vtoData.textContent.trim();
        let fpagValue = fpagData.textContent.trim();
        let cuoValue = cuoData.textContent.trim();
        let refaValue = refaData.textContent.trim();
        let impValue = impData.textContent.trim();

        // Verifica si los valores están vacíos
        const valoresVacios = [vtoValue, fpagValue, cuoValue, impValue].every(value => value.length === 0);
        
        // Muestra u oculta la fila correspondiente
        let fila = document.getElementById(`pago${i}`);
        if (fila) {
            fila.style.display = valoresVacios ? 'none' : 'table-row';
        } else {
            console.error(`No se encontró la fila con ID 'pago${i}'`);
        }

        // Asigna los valores a los elementos visibles
        if (!valoresVacios) {
            vto.textContent = vtoValue;
            fpag.textContent = fpagValue;

            // Si 'refa' tiene contenido, agrégalo a 'cuo'; de lo contrario, usa solo 'cuo'
            cuo.textContent = refaValue.length > 0 
                ? `${cuoValue.padStart(2, '0')}/${refaValue.padStart(2, '0')}` 
                : cuoValue;

            // Si 'imp' tiene contenido, agrégale el signo '$'; de lo contrario, usa solo 'imp'
            imp.textContent = impValue.length > 0 
                ? `$${impValue}` 
                : impValue;
        }
    } else {
        console.error(`Faltan elementos de datos para el índice ${i}`);
    }
}




     document.getElementsByName("tipo")[0].value = document.getElementById("tipo_" + id).textContent;
   });
     spinner.style.display = 'none';
 });

 }).getData(cnia_filter, patente_filter, dni_filter, estado_filter, nombre_filter);

}



function updateSinPendientes(result) {
 var sinPendientesDiv = document.getElementById("sinPendientes");
var pendientesHtml = "";
document.getElementById("polizas-no-vigentes").checked = false;
 for (var i = result.length - 1; i >= 0; i--) {

var  bgColor = "";
var dateParts = result[i][9].split("/");
var month = parseInt(dateParts[1], 10) - 1; // Restar 1 al mes para que sea de 0 a 11
var day = parseInt(dateParts[0], 10);
var year = new Date().getFullYear(); // Obtener el año actual
var date = new Date(year, month, day);
var today = new Date();

var dateParts2 = result[i][16].split("/");
var month2 = parseInt(dateParts2[1], 10) - 1; // Restar 1 al mes
var day2 = parseInt(dateParts2[0], 10);
var year2 = new Date().getFullYear(); // Obtener el año actual
var date2 = new Date(year2, month2, day2); // Crear el objeto Date

var estado;
var name;
if (result[i][9] == "ANULACION") {
 estado = "ANULADA";
 txColor = "#DC143C";
 name = "off";
} else if (result[i][9] == "PENDIENTE") {
  estado = "PENDIENTE";
 txColor = "#4C2882";
 name = "off";
} else if (date2 < today) {
  estado = "NO VIGENTE";
 txColor = "#474B4E";
 name = "off";
} else {
  estado = "VIGENTE";
 txColor = "#008000";
 name = "on";
}


pendientesHtml += "<div class='border' style='margin-bottom: 0;border-radius:5px; border: 2px solid #000; box-shadow: 0px 0px 5px 0px #000;background-color:" + bgColor + "' id='div" + i + "' name='" + name + "'>" +
    "<div class='row p-0 m-0'>" +
        "<div class='col-5 cnia_border text-sm text-truncate fs-7' style='padding: 0px 0px 0px 4px;" + 
        (result[i][5] === 'FED PAT' ? "background-color: #002392;" :
        result[i][5] === 'AGROSALTA [RC]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [RC-GRUA]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [B1]' ? "background-color: #FD964D;" :
        result[i][5] === 'AGROSALTA [MOTO]' ? "background-color: #FD964D;" :
        result[i][5] === 'RIVADAVIA' ? "background-color: #28BEF5;" :
        result[i][5] === 'MAPFRE' ? "background-color: #CB3234;" :
        result[i][5] === 'RIO URUGUAY' ? "background-color: #5AC4C3;" :
        result[i][5] === 'LIBRA' ? "background-color: #FF8000;" :
        result[i][5] === 'NIVEL' ? "background-color: #F57C00;" :
        result[i][5] === 'PROVIDENCIA' ? "background-color: #94B3FD;" :
        result[i][5] === 'LA CAJA' ? "background-color: #EF5350;" :
        result[i][5] === 'MERCANTIL' ? "background-color: #966CA7;" :
        result[i][5] === 'SAN PATRICIO' ? "background-color: #EF5350;" :
        result[i][5] === 'ATM' ? "background-color: #EF5350;" :
        result[i][5] === 'BENEFICIO' ? "background-color: #9EBAD1;" :
        result[i][5] === 'ALLIANZ' ? "background-color: #68C1C8;" :
        result[i][5] === 'ORBIS' ? "background-color: #C8C560;" :
        result[i][5] === 'ESCUDO' ? "background-color: #9EBAD1;" :
        result[i][5] === 'DIGMA' ? "background-color: #68C1C8;" :
        result[i][5] === 'CARDINAL' ? "background-color: #C8C560;" :
        result[i][5] === 'GRUA' ? "background-color: #6088A9;" : "") +
        "' id='cnia_" + i + "'>" + result[i][5] + "</div>"+
        "<div class='col-7 modulo-sm text-truncate fs-7' style='padding: 0px 0px 0px 4px;' id='nombre_" + i + "'>" + result[i][2] + "</div>" +
    "</div>" +
    "<div class='row m-0 p-0'>" +
        "<div class='col-5 modulo'  style='display: none;' id='dni_" + i + "'>" + result[i][1] + "</div>" +
    "</div>" +
    "<div class='row p-0 m-0'>" +
        "<div class='col-4 m-0 px-2 modulo-sm text-truncate fs-7' id='patente_" + i + "'>" + result[i][0] + "</div>" +
        "<div class='col-8 modulo-sm text-truncate fs-7 p-0' id='marca_" + i + "'>" + result[i][11] + "</div>" +
    "</div>" +
    "<div class='row m-0 p-0' style='border: 1px 0px 0px 1px solid black;'>" +
        "<div class='col-3 modulo-sm text-truncate fs-7 p-0 px-1' id='refa_desde_" + i + "'>" + result[i][15] + "</div>" +
        "<div class='col-3 modulo-sm text-truncate fs-7 p-0 px-1' id='refa_hasta_" + i + "'>" + result[i][16] + "</div>" +
        "<div class='col-6 modulo-sm fs-7 text-truncate p-0' style='display: none; padding-top: 5px; align: center; color: " + txColor + "' id='operacion_" + i + "'>" + result[i][9] + "</div>" +
        "<div class='col-6 modulo-sm fs-7 text-truncate p-0' style='padding-top: 5px; font-weight: 800; text-align: center; color: " + txColor + "' id='estado_" + i + "'>" + estado + "</div>" +
    "</div>" +
   "<div style='display: none;' id='notasVeh_" + i + "'>" + result[i][31] + "</div>"+
   "<div style='display: none;' id='sucursal_" + i + "'>" + result[i][3] + "</div>"+
   "<div style='display: none;' id='importe_" + i + "'>" + result[i][4] + "</div>"+
   "<div style='display: none;' id='poliza_" + i + "'>" + result[i][6] + "</div>"+
   "<div style='display: none;' id='operacion_" + i + "'>" + result[i][9] + "</div>"+
   "<div style='display: none;' id='cobertura_" + i + "'>" + result[i][10] + "</div>"+
   "<div style='display: none;' id='fpago_" + i + "'>" + result[i][12] + "</div>"+
   "<div style='display: none;' id='domicilio_" + i + "'>" + result[i][17] + "</div>"+
   "<div style='display: none;' id='localidad_" + i + "'>" + result[i][18] + "</div>"+
   "<div style='display: none;' id='wpp_" + i + "'>" + result[i][19] + "</div>"+
   "<div style='display: none;' id='mail_" + i + "'>" + result[i][20] + "</div>"+
   "<div style='display: none;' id='notascte_" + i + "'>" + result[i][21] + "</div>"+
   "<div style='display: none;' id='califica_" + i + "'>" + result[i][22] + "</div>"+
   "<div style='display: none;' id='anio_" + i + "'>" + result[i][23] + "</div>"+
   "<div style='display: none;' id='motor_" + i + "'>" + result[i][25] + "</div>"+
   "<div style='display: none;' id='chasis_" + i + "'>" + result[i][26] + "</div>"+
   "<div style='display: none;' id='color_" + i + "'>" + result[i][27] + "</div>"+
   "<div style='display: none;' id='suma_" + i + "'>" + result[i][28] + "</div>"+
   "<div style='display: none;' id='accesorio_" + i + "'>" + result[i][29] + "</div>"+
   "<div style='display: none;' id='vtv_" + i + "'>" + result[i][30] + "</div>"+
   "<div style='display: none;' id='refa_" + i + "'>" + result[i][13] + "</div>"+
   "<div style='display: none;' id='danios_" + i + "'>" + result[i][32] + "</div>"+
   "<div style='display: none;' id='index_" + i + "'>" + result[i][14] + "</div>"+
   "<div style='display: none;' id='tipo_" + i + "'>" + result[i][24] + "</div>"+
   "<div style='display: none;' id='vigencia_" + i + "'>" + result[i][7] + "</div>"+
   "<div style='display: none;' id='hasta_" + i + "'>" + result[i][8] + "</div>"+
    "<div style='display: none;' id='cuo1_vto_" + i + "'>" + result[i][33] + "</div>"+
    "<div style='display: none;' id='cuo1_fpag_" + i + "'>" + result[i][34] + "</div>"+
    "<div style='display: none;' id='cuo1_cuo_" + i + "'>" + result[i][35] + "</div>"+
    "<div style='display: none;' id='cuo1_imp_" + i + "'>" + result[i][36] + "</div>"+
    "<div style='display: none;' id='cuo2_vto_" + i + "'>" + result[i][37] + "</div>"+
    "<div style='display: none;' id='cuo2_fpag_" + i + "'>" + result[i][38] + "</div>"+
    "<div style='display: none;' id='cuo2_cuo_" + i + "'>" + result[i][39] + "</div>"+
    "<div style='display: none;' id='cuo2_imp_" + i + "'>" + result[i][40] + "</div>"+
    "<div style='display: none;' id='cuo3_vto_" + i + "'>" + result[i][41] + "</div>"+
    "<div style='display: none;' id='cuo3_fpag_" + i + "'>" + result[i][42] + "</div>"+
    "<div style='display: none;' id='cuo3_cuo_" + i + "'>" + result[i][43] + "</div>"+
    "<div style='display: none;' id='cuo3_imp_" + i + "'>" + result[i][44] + "</div>"+
    "<div style='display: none;' id='cuo4_vto_" + i + "'>" + result[i][45] + "</div>"+
    "<div style='display: none;' id='cuo4_fpag_" + i + "'>" + result[i][46] + "</div>"+
    "<div style='display: none;' id='cuo4_cuo_" + i + "'>" + result[i][47] + "</div>"+
    "<div style='display: none;' id='cuo4_imp_" + i + "'>" + result[i][48] + "</div>"+
    "<div style='display: none;' id='cuo5_vto_" + i + "'>" + result[i][49] + "</div>"+
    "<div style='display: none;' id='cuo5_fpag_" + i + "'>" + result[i][50] + "</div>"+
    "<div style='display: none;' id='cuo5_cuo_" + i + "'>" + result[i][51] + "</div>"+
    "<div style='display: none;' id='cuo5_imp_" + i + "'>" + result[i][52] + "</div>"+
    "<div style='display: none;' id='cuo6_vto_" + i + "'>" + result[i][53] + "</div>"+
    "<div style='display: none;' id='cuo6_fpag_" + i + "'>" + result[i][54] + "</div>"+
    "<div style='display: none;' id='cuo6_cuo_" + i + "'>" + result[i][55] + "</div>"+
    "<div style='display: none;' id='cuo6_imp_" + i + "'>" + result[i][56] + "</div>"+
    "<div style='display: none;' id='cuo7_vto_" + i + "'>" + result[i][57] + "</div>"+
    "<div style='display: none;' id='cuo7_fpag_" + i + "'>" + result[i][58] + "</div>"+
    "<div style='display: none;' id='cuo7_cuo_" + i + "'>" + result[i][59] + "</div>"+
    "<div style='display: none;' id='cuo7_imp_" + i + "'>" + result[i][60] + "</div>"+
    "<div style='display: none;' id='cuo8_vto_" + i + "'>" + result[i][61] + "</div>"+
    "<div style='display: none;' id='cuo8_fpag_" + i + "'>" + result[i][62] + "</div>"+
    "<div style='display: none;' id='cuo8_cuo_" + i + "'>" + result[i][63] + "</div>"+
    "<div style='display: none;' id='cuo8_imp_" + i + "'>" + result[i][64] + "</div>"+
    "<div style='display: none;' id='cuo9_vto_" + i + "'>" + result[i][65] + "</div>"+
    "<div style='display: none;' id='cuo9_fpag_" + i + "'>" + result[i][66] + "</div>"+
    "<div style='display: none;' id='cuo9_cuo_" + i + "'>" + result[i][67] + "</div>"+
    "<div style='display: none;' id='cuo9_imp_" + i + "'>" + result[i][68] + "</div>"+
    "<div style='display: none;' id='cuo10_vto_" + i + "'>" + result[i][69] + "</div>"+
    "<div style='display: none;' id='cuo10_fpag_" + i + "'>" + result[i][70] + "</div>"+
    "<div style='display: none;' id='cuo10_cuo_" + i + "'>" + result[i][71] + "</div>"+
    "<div style='display: none;' id='cuo10_imp_" + i + "'>" + result[i][72] + "</div>"+
    "<div style='display: none;' id='cuo11_vto_" + i + "'>" + result[i][73] + "</div>"+
    "<div style='display: none;' id='cuo11_fpag_" + i + "'>" + result[i][74] + "</div>"+
    "<div style='display: none;' id='cuo11_cuo_" + i + "'>" + result[i][75] + "</div>"+
    "<div style='display: none;' id='cuo11_imp_" + i + "'>" + result[i][76] + "</div>"+
    "<div style='display: none;' id='cuo12_vto_" + i + "'>" + result[i][77] + "</div>"+
    "<div style='display: none;' id='cuo12_fpag_" + i + "'>" + result[i][78] + "</div>"+
    "<div style='display: none;' id='cuo12_cuo_" + i + "'>" + result[i][79] + "</div>"+
    "<div style='display: none;' id='cuo12_imp_" + i + "'>" + result[i][80] + "</div>"+
    "<div style='display: none;' id='vigtot_" + i + "'>" + result[i][81] + "</div>"+

   "</div>";
 }
   sinPendientesDiv.textContent = "";
    sinPendientesDiv.insertAdjacentHTML('beforeend',pendientesHtml);


 // Agregar evento de click a los divs dinámicos
 var divs = document.querySelectorAll("[id^='div']");
 divs.forEach(function(div) {
   div.addEventListener("click", function() {
     var id = div.id.slice(3); // Obtener el índice del div
     document.getElementsByName("dni")[0].value = document.getElementById("dni_" + id).textContent;
     document.getElementsByName("nombre")[0].value = document.getElementById("nombre_" + id).textContent;
     document.getElementsByName("domicilio")[0].value = document.getElementById("domicilio_" + id).textContent;
     document.getElementsByName("localidad")[0].value = document.getElementById("localidad_" + id).textContent;
     document.getElementsByName("wpp")[0].value = document.getElementById("wpp_" + id).textContent;
     document.getElementsByName("fpago")[0].value = document.getElementById("fpago_" + id).textContent;
     document.getElementsByName("mail")[0].value = document.getElementById("mail_" + id).textContent;
     document.getElementsByName("notascte")[0].value = document.getElementById("notascte_" + id).textContent;
     document.getElementsByName("califica_cliente")[0].value = document.getElementById("califica_" + id).textContent;
    //  document.getElementsByName("patente")[0].value = document.getElementById("patente_" + id).textContent;
     document.getElementsByName("patente_v")[0].value = document.getElementById("patente_" + id).textContent;
    //  document.getElementsByName("marca")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("marca_v")[0].value = document.getElementById("marca_" + id).textContent;
     document.getElementsByName("cnia")[0].value = document.getElementById("cnia_" + id).textContent;
     document.getElementsByName("vigencia")[0].value = document.getElementById("vigencia_" + id).textContent;
     document.getElementsByName("hasta")[0].value = document.getElementById("hasta_" + id).textContent;
     document.getElementsByName("cobertura")[0].value = document.getElementById("cobertura_" + id).textContent;
     document.getElementsByName("refa")[0].value = document.getElementById("refa_" + id).textContent;
     document.getElementsByName("importe")[0].value = document.getElementById("importe_" + id).textContent;
     document.getElementsByName("sucursal")[0].value = document.getElementById("sucursal_" + id).textContent;
     document.getElementsByName("operacion")[0].value = document.getElementById("operacion_" + id).textContent;
     document.getElementsByName("poliza")[0].value = document.getElementById("poliza_" + id).textContent;
     document.getElementsByName("califica_cliente")[0].value = document.getElementById("califica_" + id).textContent;
     document.getElementsByName("anio")[0].value = document.getElementById("anio_" + id).textContent;
     document.getElementsByName("motor")[0].value = document.getElementById("motor_" + id).textContent;
     document.getElementsByName("chasis")[0].value = document.getElementById("chasis_" + id).textContent;
     document.getElementsByName("color")[0].value = document.getElementById("color_" + id).textContent;
     document.getElementsByName("suma")[0].value = document.getElementById("suma_" + id).textContent;
     document.getElementsByName("accesorio")[0].value = document.getElementById("accesorio_" + id).textContent;
     document.getElementsByName("vtv")[0].value = document.getElementById("vtv_" + id).textContent;
     document.getElementsByName("notasVeh")[0].value = document.getElementById("notasVeh_" + id).textContent;
     document.getElementsByName("danios")[0].value = document.getElementById("danios_" + id).textContent;
     document.getElementsByName("index")[0].value = document.getElementById("index_" + id).textContent;
     document.getElementsByName("refa_desde")[0].value = document.getElementById("refa_desde_" + id).textContent;
     document.getElementsByName("refa_hasta")[0].value = document.getElementById("refa_hasta_" + id).textContent;
     document.getElementsByName("vigtot")[0].value = document.getElementById("vigtot_" + id).textContent;
     
for (let i = 1; i <= 12; i++) {
    // Construye los ID de los elementos
    let vto = document.getElementById(`cuo${i}_vto`);
    let fpag = document.getElementById(`cuo${i}_fpag`);
    let cuo = document.getElementById(`cuo${i}_cuo`);
    let imp = document.getElementById(`cuo${i}_imp`);

    if (!vto || !fpag || !cuo || !imp) {
        console.error(`Faltan elementos para el índice ${i}`);
        continue; // Salta a la siguiente iteración si falta algún elemento
    }

    // Asigna los valores desde los elementos de datos
    let vtoData = document.getElementById(`cuo${i}_vto_${id}`);
    let fpagData = document.getElementById(`cuo${i}_fpag_${id}`);
    let cuoData = document.getElementById(`cuo${i}_cuo_${id}`);
    let refaData = document.getElementById(`refa_${id}`);
    let impData = document.getElementById(`cuo${i}_imp_${id}`);

    if (vtoData && fpagData && cuoData && refaData && impData) {
        // Obtén los valores
        let vtoValue = vtoData.textContent.trim();
        let fpagValue = fpagData.textContent.trim();
        let cuoValue = cuoData.textContent.trim();
        let refaValue = refaData.textContent.trim();
        let impValue = impData.textContent.trim();

        // Verifica si los valores están vacíos
        const valoresVacios = [vtoValue, fpagValue, cuoValue, impValue].every(value => value.length === 0);
        
        // Muestra u oculta la fila correspondiente
        let fila = document.getElementById(`pago${i}`);
        if (fila) {
            fila.style.display = valoresVacios ? 'none' : 'table-row';
        } else {
            console.error(`No se encontró la fila con ID 'pago${i}'`);
        }

        // Asigna los valores a los elementos visibles
        if (!valoresVacios) {
            vto.textContent = vtoValue;
            fpag.textContent = fpagValue;

            // Si 'refa' tiene contenido, agrégalo a 'cuo'; de lo contrario, usa solo 'cuo'
            cuo.textContent = refaValue.length > 0 
                ? `${cuoValue.padStart(2, '0')}/${refaValue.padStart(2, '0')}` 
                : cuoValue;

            // Si 'imp' tiene contenido, agrégale el signo '$'; de lo contrario, usa solo 'imp'
            imp.textContent = impValue.length > 0 
                ? `$${impValue}` 
                : impValue;
        }
    } else {
        console.error(`Faltan elementos de datos para el índice ${i}`);
    }
}


     document.getElementsByName("tipo")[0].value = document.getElementById("tipo_" + id).textContent;

// console.log("califica: " + result[i][22])
document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";
   });
 });
}
google.script.run.withSuccessHandler(updateSinPendientes).getData();




//////////////// CARGAR CORREOS  ///////////////
function cargarCorreos() {
 event.preventDefault();
 var patente = document.getElementById("patente").value;

google.script.run.withSuccessHandler(function(emailsHTML) {
 // Muestra el contenido HTML de los correos electrónicos en el div con ID "emails"
 var div2 = document.getElementById("emails");
 console.log(emailsHTML)
 div2.textContent = "";
 div2.insertAdjacentHTML('beforeend',emailsHTML);

}).mostrarCorreos(patente);
}

function enviarMail() {
 var patente = document.getElementById("patente").value;

 // Abrir Gmail y buscar el número
 window.open("https://mail.google.com/mail/u/0/#search/" + patente);
}

function enviarMensajeWPP() {
 // Obtener el número de teléfono ingresado
 var telefono = document.getElementById("wpp").value;

 // Abrir WhatsApp Web con el número de teléfono y enviar un mensaje
 window.open("https://web.whatsapp.com/send?phone=549" + telefono + "&text=Hola,%20nos%20comunicamos%20de%20GIOIA%20Seguros.%20Por%20favor%20agendá%20nuestro%20número%20para%20cualquier%20consulta%20o%20solicitud%20que%20tengas.");
}

document.getElementById("novedad_sn").addEventListener("change", function() {
 var novedad = this.value;
 var poliza = document.getElementById("poliza_sn");
 var operacion = document.getElementById("operacion_sn");
 var poliza2 = document.getElementById("poliza_sn2");
 var operacion2 = document.getElementById("operacion_sn2");
 if (novedad === "ALTA DE POLIZA") {
   poliza2.style.display = "block";
   operacion2.style.display = "block";
   poliza.style.display = "block";
   poliza.value = "";
   operacion.style.display = "block";
   operacion.value = "SEGURO NUEVO";
 } else if (novedad === "BAJA DE POLIZA") {
   poliza2.style.display = "block";
   operacion2.style.display = "block";
   poliza.style.display = "block";
   poliza.value = document.getElementById("poliza").value;
   operacion.style.display = "block";
   operacion.value = "ANULACION";
 } else {
   poliza.style.display = "none";
   operacion.style.display = "none";
   poliza2.style.display = "none";
   operacion2.style.display = "none";
 }
});


 function cleanService() {
 event.preventDefault();

document.getElementById("sinPendientes").textContent = "";
document.getElementById("nombre").value = "";
document.getElementById("dni").value = "";
document.getElementById("domicilio").value = "";
document.getElementById("localidad").value = "";
document.getElementById("wpp").value = "";
document.getElementById("mail").value = "";
document.getElementById("fpago").value = "";
document.getElementById("notascte").value = "";
document.getElementById("califica_cliente").value = "0";
document.getElementById("patente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("marca").value = "";
document.getElementById("marca_v").value = "";
document.getElementById("patente_v").value = "";
document.getElementById("cnia").value = "";
document.getElementById("cobertura").value = "";
document.getElementById("importe").value = "";
document.getElementById("poliza").value = "";
document.getElementById("vigencia").value = "";
document.getElementById("hasta").value = "";
document.getElementById("operacion").value = "";
document.getElementById("sucursal").value = "";
document.getElementById("notasPol").value = "";
document.getElementById("motor").value = "";
document.getElementById("chasis").value = "";
document.getElementById("danios").value = "";
document.getElementById("tipo").value = "";
document.getElementById("color").value = "";
document.getElementById("suma").value = "";
document.getElementById("anio").value = "";
document.getElementById("accesorio").value = "";
document.getElementById("vtv").value = "";
document.getElementById("sumaVeh").value = "";
document.getElementById("refa_desde").value = "";
document.getElementById("refa_hasta").value = "";
document.getElementById("vigtot").value = "";
document.getElementById("cuo1_vto").value = "";
document.getElementById("cuo1_fpag").value = "";
document.getElementById("cuo1_cuo").value = "";
document.getElementById("cuo1_imp").value = "";

document.getElementById("cuo2_vto").value = "";
document.getElementById("cuo2_fpag").value = "";
document.getElementById("cuo2_cuo").value = "";
document.getElementById("cuo2_imp").value = "";

document.getElementById("cuo3_vto").value = "";
document.getElementById("cuo3_fpag").value = "";
document.getElementById("cuo3_cuo").value = "";
document.getElementById("cuo3_imp").value = "";

document.getElementById("cuo4_vto").value = "";
document.getElementById("cuo4_fpag").value = "";
document.getElementById("cuo4_cuo").value = "";
document.getElementById("cuo4_imp").value = "";

document.getElementById("cuo5_vto").value = "";
document.getElementById("cuo5_fpag").value = "";
document.getElementById("cuo5_cuo").value = "";
document.getElementById("cuo5_imp").value = "";

document.getElementById("cuo6_vto").value = "";
document.getElementById("cuo6_fpag").value = "";
document.getElementById("cuo6_cuo").value = "";
document.getElementById("cuo6_imp").value = "";

document.getElementById("cuo7_vto").value = "";
document.getElementById("cuo7_fpag").value = "";
document.getElementById("cuo7_cuo").value = "";
document.getElementById("cuo7_imp").value = "";

document.getElementById("cuo8_vto").value = "";
document.getElementById("cuo8_fpag").value = "";
document.getElementById("cuo8_cuo").value = "";
document.getElementById("cuo8_imp").value = "";

document.getElementById("cuo9_vto").value = "";
document.getElementById("cuo9_fpag").value = "";
document.getElementById("cuo9_cuo").value = "";
document.getElementById("cuo9_imp").value = "";

document.getElementById("cuo10_vto").value = "";
document.getElementById("cuo10_fpag").value = "";
document.getElementById("cuo10_cuo").value = "";
document.getElementById("cuo10_imp").value = "";

document.getElementById("cuo11_vto").value = "";
document.getElementById("cuo11_fpag").value = "";
document.getElementById("cuo11_cuo").value = "";
document.getElementById("cuo11_imp").value = "";

document.getElementById("cuo12_vto").value = "";
document.getElementById("cuo12_fpag").value = "";
document.getElementById("cuo12_cuo").value = "";
document.getElementById("cuo12_imp").value = "";

document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";

alert('Limpieza exitosa.');
}



function actualiEstado(event) {
 event.preventDefault();
 const usuario_sn = sessionStorage.getItem("magi-usuario");
 const novedad_sn = document.getElementById('novedad_sn').value;
 const operacion_sn = document.getElementById('operacion_sn').value;
 const poliza_sn = document.getElementById('poliza_sn').value;
 const notas_sn = document.getElementById('notas_sn').value;
 const patente_sn = document.getElementById('patente_v').value;
 const notas_old = document.getElementById('notasVeh').value;
 const indexPol = document.getElementById('index').value;

console.log(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old)

 google.script.run.actualizarEstado(poliza_sn, operacion_sn, novedad_sn, usuario_sn, notas_sn, patente_sn, notas_old, indexPol);

alert('Ingreso de estado exitoso.');

document.getElementById("sinPendientes").textContent = "";
document.getElementById("nombre").value = "";
document.getElementById("dni").value = "";
document.getElementById("domicilio").value = "";
document.getElementById("localidad").value = "";
document.getElementById("wpp").value = "";
document.getElementById("mail").value = "";
document.getElementById("fpago").value = "";
document.getElementById("notascte").value = "";
document.getElementById("califica_cliente").value = "";
document.getElementById("cnia").value = "";
document.getElementById("marca_v").value = "";
document.getElementById("patente_v").value = "";
document.getElementById("cnia").value = "";
document.getElementById("cobertura").value = "";
document.getElementById("importe").value = "";
document.getElementById("poliza").value = "";
document.getElementById("vigencia").value = "";
document.getElementById("hasta").value = "";
document.getElementById("operacion").value = "";
document.getElementById("sucursal").value = "";
document.getElementById("motor").value = "";
document.getElementById("chasis").value = "";
document.getElementById("danios").value = "";
document.getElementById("tipo").value = "";
document.getElementById("color").value = "";
document.getElementById("suma").value = "";
document.getElementById("anio").value = "";
document.getElementById("accesorio").value = "";
document.getElementById("vtv").value = "";
document.getElementById("suma").value = "";
document.getElementById("refa_desde").value = "";
document.getElementById("refa_desde").value = "";
document.getElementById("vigtot").value = "";
document.getElementById("cuo1_vto").value = "";
document.getElementById("cuo1_fpag").value = "";
document.getElementById("cuo1_cuo").value = "";
document.getElementById("cuo1_imp").value = "";

document.getElementById("cuo2_vto").value = "";
document.getElementById("cuo2_fpag").value = "";
document.getElementById("cuo2_cuo").value = "";
document.getElementById("cuo2_imp").value = "";

document.getElementById("cuo3_vto").value = "";
document.getElementById("cuo3_fpag").value = "";
document.getElementById("cuo3_cuo").value = "";
document.getElementById("cuo3_imp").value = "";

document.getElementById("cuo4_vto").value = "";
document.getElementById("cuo4_fpag").value = "";
document.getElementById("cuo4_cuo").value = "";
document.getElementById("cuo4_imp").value = "";

document.getElementById("cuo5_vto").value = "";
document.getElementById("cuo5_fpag").value = "";
document.getElementById("cuo5_cuo").value = "";
document.getElementById("cuo5_imp").value = "";

document.getElementById("cuo6_vto").value = "";
document.getElementById("cuo6_fpag").value = "";
document.getElementById("cuo6_cuo").value = "";
document.getElementById("cuo6_imp").value = "";

document.getElementById("cuo7_vto").value = "";
document.getElementById("cuo7_fpag").value = "";
document.getElementById("cuo7_cuo").value = "";
document.getElementById("cuo7_imp").value = "";

document.getElementById("cuo8_vto").value = "";
document.getElementById("cuo8_fpag").value = "";
document.getElementById("cuo8_cuo").value = "";
document.getElementById("cuo8_imp").value = "";

document.getElementById("cuo9_vto").value = "";
document.getElementById("cuo9_fpag").value = "";
document.getElementById("cuo9_cuo").value = "";
document.getElementById("cuo9_imp").value = "";

document.getElementById("cuo10_vto").value = "";
document.getElementById("cuo10_fpag").value = "";
document.getElementById("cuo10_cuo").value = "";
document.getElementById("cuo10_imp").value = "";

document.getElementById("cuo11_vto").value = "";
document.getElementById("cuo11_fpag").value = "";
document.getElementById("cuo11_cuo").value = "";
document.getElementById("cuo11_imp").value = "";

document.getElementById("cuo12_vto").value = "";
document.getElementById("cuo12_fpag").value = "";
document.getElementById("cuo12_cuo").value = "";
document.getElementById("cuo12_imp").value = "";

document.getElementById("novedad_sn").value = "";
document.getElementById("notas_sn").value = "";
document.getElementById("poliza_sn").value = "";
document.getElementById("operacion_sn").value = "";
document.getElementById("poliza_sn").style.display = "none";
document.getElementById("operacion_sn").style.display = "none";
document.getElementById("poliza_sn2").style.display = "none";
document.getElementById("operacion_sn2").style.display = "none";

}

function modificarDatos(event) {
 event.preventDefault();
 const boton = document.getElementById('bt-modificar-datos');
   const spinner = document.getElementById('spinner5');
   spinner.style.display = 'inline-block';
   boton.disabled = true;
   let infoDNI =  document.getElementById("dni").value;
   let infoCliente =  document.getElementById("nombre").value;
   let infoDomicilio =  document.getElementById("domicilio").value;
   let infoLocalidad =  document.getElementById("localidad").value;
   let infoWpp =  document.getElementById("wpp").value;
   let infoMail =  document.getElementById("mail").value;
   let infoFpago =  document.getElementById("fpago").value;
   let infoNotascte =  document.getElementById("notascte").value;
   let infoCalifica =  document.getElementById("califica_cliente").value;
   let infoUsuario =  sessionStorage.getItem("magi-usuario");
  //  let infoPatente =  document.getElementById("patente").value;
   let infoPatentev =  document.getElementById("patente_v").value;
   let infoMarca =  document.getElementById("marca_v").value;
   let infoCnia =  document.getElementById("cnia").value;
   let infoCobertura =  document.getElementById("cobertura").value;
   let infoImporte =  document.getElementById("importe").value;
   let infoPoliza =  document.getElementById("poliza").value;
   let infoVigencia =  document.getElementById("vigencia").value;
   let infoHasta =  document.getElementById("hasta").value;
   let infoOperacion =  document.getElementById("operacion").value;
   let infoSucursal =  document.getElementById("sucursal").value;
   let infoMotor =  document.getElementById("motor").value;
   let infoChasis =  document.getElementById("chasis").value;
   let infoDanios =  document.getElementById("danios").value;
   let infoTipo =  document.getElementById("tipo").value;
   let infoColor =  document.getElementById("color").value;
   let infoSuma =  document.getElementById("suma").value;
   let infoAnio =  document.getElementById("anio").value;
   let infoAccesorio =  document.getElementById("accesorio").value;
   let infoVTV =  document.getElementById("vtv").value;
   let infoNotasVeh =  document.getElementById("notasVeh").value;
   let infoRefaDesde =  document.getElementById("refa_desde").value;
   let infoRefaHasta =  document.getElementById("refa_hasta").value;
   let infoRefa =  document.getElementById("refa").value;
   let infoVigTot =  document.getElementById("vigtot").value;

 google.script.run.modNueva(infoDNI, infoCliente, infoDomicilio, infoLocalidad, infoWpp, infoMail, infoFpago, infoSucursal, infoNotascte, infoRefa, infoMarca, infoCnia, infoCobertura, infoImporte, infoPoliza, infoOperacion, infoVigencia, infoHasta, infoDanios, infoNotasVeh, infoMotor, infoChasis, infoTipo, infoColor, infoSuma, infoAnio, infoAccesorio, infoVTV, infoPatentev, infoUsuario, infoCalifica, infoRefaDesde, infoRefaHasta, infoVigTot);
alert('Póliza actualizada correctamente');
 spinner.style.display = 'none';
 boton.disabled = false;
}

function buscarRefa() {
  let cnia = document.getElementById("cnia").value;
  let refa = 0; 
  let vigencia = 0; 
  
  switch (cnia) {
    case "MAPFRE":
      refa = 4;
      vigencia = 6;
      break;
    case "ALLIANZ":
      refa = 4;
      vigencia = 6;
      break;
    case "MERCANTIL":
      refa = 4;
      vigencia = 6;
      break;
    case "ORBIS":
      refa = 4;
      vigencia = 6;
      break;
    case "PROVIDENCIA":
      refa = 3;
      vigencia = 6;
      break;
    case "LIBRA":
      refa = 3;
      vigencia = 6;
      break;
    case "AGROSALTA [RC]":
    case "AGROSALTA [RC-GRUA]":
    case "AGROSALTA [MOTO]":
    case "AGROSALTA [B1]":
      refa = 3;
      vigencia = 6;
      break;
    case "GRUA":
      refa = 1;
      vigencia = 12;
      break;
    case "DIGNA":
      refa = 1;
      vigencia = 12;
      break;
    case "BBVA":
      refa = 1;
      vigencia = 12;
      break;
    case "EL TRIUNFO":
      refa = 6;
      vigencia = 12;
      break;
    case "EXPERTA":
      refa = 1;
      vigencia = 12;
      break;
    case "FED PAT":
      refa = 1;
      vigencia = 12;
      break;
    case "NIVEL":
      refa = 1;
      vigencia = 12;
      break;
    case "RIVADAVIA":
      refa = 3;
      vigencia = 12;
      break;
    case "RIO URUGUAY":
      refa = 3;
      vigencia = 12;
      break;
    case "LA CAJA":
      refa = 1;
      vigencia = 12;
      break;
    case "SAN PATRICIO":
      refa = 1;
      vigencia = 12;
      break;
    case "ATM":
      refa = 1;
      vigencia = 12;
      break;
      
    default:
      refa = 0;
      vigencia = 0;
      break;
  }

document.getElementById("refa").value = refa;
document.getElementById("vigtot").value = vigencia;

let vigenciaDate = document.getElementById("vigencia").value; 

let partes = vigenciaDate.split('/');
let dia = parseInt(partes[0]);
let mes = parseInt(partes[1]) - 1; // Ajuste porque los meses son 0-indexed
let anio = parseInt(partes[2]) + 2000; // Ajuste para año en dos dígitos

let new_refa = new Date(anio, mes, dia);
let new_vig = new Date(anio, mes, dia);

let new_refa2 = new Date(new_refa.setMonth(new_refa.getMonth() + refa)); // Nueva referencia de fecha
let new_vig2 = new Date(new_vig.setMonth(new_vig.getMonth() + vigencia)); // Nueva vigencia

let nuevoDia_refa = String(new_refa2.getDate()).padStart(2, '0');
let nuevoMes_refa = String(new_refa2.getMonth() + 1).padStart(2, '0');
let nuevoAnio_refa = String(new_refa2.getFullYear()).slice(-2); 

let nuevoDia_vig = String(new_vig2.getDate()).padStart(2, '0'); // Cambié a new_vig2
let nuevoMes_vig = String(new_vig2.getMonth() + 1).padStart(2, '0'); // Cambié a new_vig2
let nuevoAnio_vig = String(new_vig2.getFullYear()).slice(-2); // Cambié a new_vig2

document.getElementById("hasta").value = nuevoDia_vig + "/" + nuevoMes_vig + "/" + nuevoAnio_vig;
document.getElementById("refa_hasta").value = nuevoDia_refa + "/" + nuevoMes_refa + "/" + nuevoAnio_refa;

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


//////////////////// POLIZAS VIGENTES //////////////////////////////////////
document.getElementById("polizas-no-vigentes").addEventListener('change', function() {
  var checkbox = document.getElementById("polizas-no-vigentes");
  var elements = document.querySelectorAll("[name='on']");
  // Check if the checkbox is checked
  if (checkbox.checked) {
    // Iterate over the elements and set their display property to none
    for (var i = 0; i < elements.length; i++) {
      var styles = getComputedStyle(elements[i]);
        elements[i].style.display = "block";
    }
  } else {
    
    // Iterate over the elements and set their display property to none
    for (var i = 0; i < elements.length; i++) {
      var styles = getComputedStyle(elements[i]);
        elements[i].style.display = "none";
    }
  }
});


document.getElementById("cnia").addEventListener("change", function() {
buscarRefa()
});
document.getElementById('bt-buscar').addEventListener('click', filtrar);
document.getElementById('bt-reset').addEventListener('click', cleanService);
document.getElementById('bt-modificar-datos').addEventListener('click', modificarDatos);
document.getElementById('bt-actualizar_nota').addEventListener('click', actualiEstado);
document.getElementById('close_session').addEventListener('click', close_sessionok);