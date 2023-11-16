# MAGI-SEGUROS
Sistema de Seguros MAGI

Sistema de seguros creado dentro del entorno de Google Appscript con HTML, CSS y JS. Al ser un servicio gratuito con una base de datos interna utilizando googlesheet, presenta varias limitaciones debido al entorno del mismo.

Partes que integran este sistema:

### Cobranzas - Pagos M Acosta/Pagos M Paz
Sección basada en cobros de cuotas de seguros, generador de gastos y recibis, gestiona los movimientos diarios que se van haciendo dentro de las oficinas.
Al tener dos sucursales y variedad de usuarios, la mejor opcion fue hacer dos secciones, una por cada sucursal para evitar que por error se haga una cobranzas en la sucursal incorrecta, ya que hay usuarios que trabajan en ambas sucursales.

### Cobranzas - Cierre de Caja
Esta sección se encarga de hacer el cierre diario con envio por planillas de excel por mail, muestra un listado de todo lo que se cobro, descontando gastos y recibis, genera tambien un cirre de caja digital para los pagos hechos por transferencia, o los gastos y recibis tambien hechos por transferencias.
Tambien gestiona cajas generadas antiguamente para verificar errores y genera cierres de esas mismas.

### Cobranzas - Dedudores pasados
Esta sección se ocupa de gestionar los deudores, obtiene de una BD la lista de deudores que tiene la oficina que se les cubre la cuota usando como verificador un ID, el listado se genera de acuerdo al mes en curso y revisa si hay recibos ingresados, si los hay trae el numero de recibo junto con un boton para imprimirlo y descargarlo, si no encuentra el recibo, aparece una cruz con un boton de cobrar, el cual ingresa el pago y genera un numero de recibo.

### Cobranzas - Gestion Deudores
Esta sección trabaja en conjunto con los deudores pasados, muestra un balance de todo lo que se cobró con Debe, Haber y Saldo, mostrando el historial de recibos y pagos de cada deudor, para que cuando venga a pagar el deudor muestre si tiene saldo a favor, saldo en contra, en que fecha pagó... tambien gestiona pagos de los mismos para agregarlos al balance.

### Cobranzas - Liquidacion Pagos
Esta sección recibe los pagos ingresados anteriormente y genera una preliquidacion donde a medida que se marcan, se van pasando por la web de la compañia los mismos, una vez completo se genera la liquidacion de los mismos para liberar espacio para los próximos

### Cobranzas - Libro Mayor (seccion en construcción)
Esta sección hace un balance general con los gastos, el dinero a favor, los pagos ingresados, las liquidaciones (los pagos que salen), entre otros, y genera un debe/haber de todo para hacer un seguimiento de valores que se van moviendo en la oficina

### Cobranzas - Pagos Vencidos
Esta sección se encarga de sacar un listado de los clientes que pagaron el mes pasado pero que aún no pagaron este mes, para enviarles un recodatorio de vencimiento ya sea por whatsapp, o por mail de manera automatica.

### Emision - Ingreso
Esta sección ingresa polizas nuevas buscando e ingresando datos en una BD de clientes y una BD polizas, tiene un buscador por numero de documento, por nombre que busca parte del nombre y obtiene el valor mas exacto, y por patente.
Las busquedas de datos son por modulos, una vez encontrado el dato dentro del modulo aparece un buscador que utiliza los datos del cliente para buscar los vehiculos que corresponden al mismo y al hacer click los trae, lo mismo del lado del vehiculo, trae el cliente al que le pertenece ese vehiculo y al hacer click lo trae.

### Emision - Gestion
Esta sección trae por defecto las pólizas nuevas que fueron cargadas como "pendientes", para gestionar la emision de las mismas si hubo algun problema en la contratación. Tambien gestiona modificaciones dentro de las mismas como datos faltantes, o anulaciones de las mismas.

### Emision - Renovaciones
Esta sección filtra las polizas que en el mes corriente ya cumplen con su vigencia tanto de refacturaciones (actualizaciones de valor dentro de la vigencia anual) como renovaciones (actualizaciones anuales de las polizas) y se actualizan los valores de las mismas.

### Siniestros - Ingreso
Esta sección utiliza los datos cargados en Emision para cargar casos de siniestros en una BD Siniestros, tiene adicionalmente la opcion para cargar datos de otros vehiculos que intervienen en el mismo con un div que se multiplica las veces necesarias para ingresar varios terceros.

### Siniestros - Gestion
Esta sección se ocupa de gestionar los datos cargados en Siniestros Ingreso, hace el seguimiento de los casos y va actualizando novedades. Trae por defecto los casos que están sin gestionar y desde ahi se le va poniendo fecha en agenda para gestion. Utiliza un checkbox para tildar y destildar los casos que están para gestionar en el dia y los que están para más adelante. Ademas permite filtrar segun varios criterios, y gestionar distintos tipos de tramites (Falta documentación, Reparación en curso, Esperando Respuestos, etc) según el tipo de siniestro que sea.
