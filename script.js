function cambiarIframe(url){
  document.getElementById("iframeMP").src = url;
}

function enConstruccion(){
    confirm("¡En construcción! nos vemos en el próximo control.");
}

function calcularSueldo(){
  //Conseguir variables a partir del formulario.
  //Variables para registro
  var RUT = document.getElementById("txtRut");
  var Nombre = document.getElementById("txtNombre");
  var Direccion = document.getElementById("txtDireccion");
  var Cargo = document.getElementById("txtCargo");
  var Dpto = document.getElementById("txtDpto").value;
  //Variables para cálculos
  var SBase = document.getElementById("txtSBase").value;
  var Bono = SBase * 0.2;
  var Aguinaldo = 30000;
  var Gratificacion = 0;
  var AFP = document.getElementById("txtAFP").selectedIndex;
  var AFPSelec = '';
  var DctoAFP = document.getElementById("txtDctoAFP").value;
  var Anticipo = document.getElementById("txtAnticipo").value;
  var NHextras = document.getElementById("txtNHextras").value;
  var ValorHrExtra = 0;
  var PagoHrsExtra = document.getElementById("txtPagoHrsExtra").selectedIndex;
  var limiteAnticipo = SBase * 0.5;
  var SLiquido = 0;

  //Mostrar el balor calculado del bono
  document.getElementById("txtBono").value=Bono;
  
  //Determinar el valor de la gratificación en base a sueldo base
  if ((SBase >= 100000) && (SBase < 200000)){
    Gratificacion = 80000;
  }else if (SBase >= 200000){
    Gratificacion = 50000;
  }
  document.getElementById("txtGratificacion").value=Gratificacion;

  //Determinar descuento en base a la AFP elegida
  //AFPSelec es la variable que se va a tomar para mostrar la AFP elegida en la tabla
  //Esto hará que aparezca como "Habitat" en lugar de "Habitat (10% dcto)", por ejemplo.
  switch (AFP){
    case (0):
      alert("Seleccione AFP");
      document.getElementById("txtAguinaldo").value='';
    break; 
    case(1):
      var DctoAFP = SBase * 0.1;
      document.getElementById("txtDctoAFP").value=DctoAFP;
      AFPSelec = 'Habitat';
    break;
    case (2):
      var DctoAFP = SBase * 0.15;
      document.getElementById("txtDctoAFP").value=DctoAFP;
      AFPSelec = 'Cuprum';
    break;
    case (3):
      var DctoAFP = SBase * 0.2;
      document.getElementById("txtDctoAFP").value=DctoAFP;
      AFPSelec = 'Provida';
    break;
  }
  
  //Calcular valor de horas extras
  ValorHrExtra = ((SBase / 30) / 8);
  PagoHrsExtraD = NHextras * ValorHrExtra;
  var PagoHrsExtra = PagoHrsExtraD.toFixed(0);
  //Mostrar valor de horas extras
  document.getElementById("txtPagoHrsExtra").value=PagoHrsExtra;

  //Mostrar aviso si el usuario ingresa un anticipo mayor a la mitad de su sueldo
  if (Anticipo > limiteAnticipo) {
    alert("Su anticipo no puede sobrepasar la mitad de su sueldo, es decir: "+limiteAnticipo);
    document.getElementById("txtAguinaldo").value='30000';
  }else{
    //Mostrar monto de Aguinaldo, esta línea de código NO es usada en el cálculo, se usa la variable asignada
    //Al principio de la función
    document.getElementById("txtAguinaldo").value='30000';

    //Realizar cálculo
    SLiquido = (parseInt(SBase)+parseInt(Bono)+parseInt(Aguinaldo)+parseInt(Gratificacion)+parseInt(PagoHrsExtra)-(parseInt(DctoAFP)+parseInt(Anticipo)));
    document.getElementById("sueldoliquido").textContent='Sueldo líquido: '+SLiquido;

    //Aquí se toma la tabla a la que se va a añadir el registro.
    var table = document.getElementById("tablaSueldoss");

    //Aquí se determina donde es que se va a ingresar, se anota '1' en este caso ya que los títulos
    //ocupan la posición 0, si se ocupara la posición 0 aquí, los nuevos registros quedarían encima
    //de los títulos de las columnas.
    var row = table.insertRow(1);

    //Se añaden los campos correspondientes a la cantidad de columnas de la tabla, partiendo
    //por 0, como cualquier arreglo.
    var campo1 = row.insertCell(0);
    var campo2 = row.insertCell(1);
    var campo3 = row.insertCell(2);
    var campo4 = row.insertCell(3);
    var campo5 = row.insertCell(4);
    var campo6 = row.insertCell(5);
    var campo7 = row.insertCell(6);
    var campo8 = row.insertCell(7);
    var campo9 = row.insertCell(8);
    var campo10 = row.insertCell(9);
    var campo11 = row.insertCell(10);
    var campo12 = row.insertCell(11);
    var campo13 = row.insertCell(12);
    var campo14 = row.insertCell(13);
    var campo15 = row.insertCell(14);

    //Insertar datos en los campos, en este punto el script tomará todas las variables y 
    //ocupará correctamente su contenido con las órdenes '.value' y 'parseInt()', para texto y números
    //respectivamente.
    campo1.innerHTML = RUT.value;
    campo2.innerHTML = Nombre.value;
    campo3.innerHTML = Direccion.value;
    campo4.innerHTML = Cargo.value;
    campo5.innerHTML = Dpto;
    campo6.innerHTML = AFPSelec;
    campo7.innerHTML = parseInt(SBase);
    campo8.innerHTML = parseInt(Bono);
    campo9.innerHTML = parseInt(Aguinaldo);
    campo10.innerHTML = parseInt(Gratificacion);
    campo11.innerHTML = parseInt(DctoAFP);
    campo12.innerHTML = parseInt(Anticipo);
    campo13.innerHTML = parseInt(NHextras);
    campo14.innerHTML = parseInt(PagoHrsExtra);
    campo15.innerHTML = parseInt(SLiquido);
  }
}

function validarForm() {
  //Tomar las variables a ser validadas
  var RUT = document.getElementById("txtRut");
  var Nombre = document.getElementById("txtNombre");
  var Direccion = document.getElementById("txtDireccion");
  var Cargo = document.getElementById("txtCargo");
  var Dpto = document.getElementById("txtDpto");
  var AFP = document.getElementById("txtAFP");
  var SBase = document.getElementById("txtSBase");
  var Anticipo = document.getElementById("txtAnticipo");
  var NHextras = document.getElementById("txtNHextras").selectedIndex;
  //Validar cada uno de los campos, sin FORMS, sin SUBMIT, simplemente si se cumple la condición
  //es decir, si efectivamente están vacíos o son iguales o fuera de rango, se retorna FALSE
  //Caso contrario, pasa al siguiente.
  if (RUT.value == ""){
    alert("Ingrese RUT");
    return false;
  }
  if (Nombre.value == ""){
    alert("Ingrese su nombre");
    return false;
  }
  if (Direccion.value == ""){
    alert("Ingrese su dirección");
    return false;
  }
  if (Cargo.value == ""){
    alert("Ingrese su cargo");
    return false;
  }
  if (Dpto.value == ""){
    alert("Seleccione departamento");
    return false;
  }
  if (AFP.value == "Seleccione"){
    alert("Seleccione AFP");
    return false;
  }
  if (SBase.value <= 0){
    alert("Su sueldo base no puede ser igual ni menor a 0");
    return false;
  }
  if (Anticipo.value == ""){
    alert("Ingrese un anticipo");
    return false;
  }
  if (NHextras.value < 0){
    alert("Su número de horas extra no puede ser menor a 0");
    return false;
  }
  //Cuando TODOS pasen, se llama a la función que hará el resto del trabajo con cálculos, es decir
  //la función anterior.
  calcularSueldo();
  return true;
}

function limpiarCamposS(){
  //Tomar todos los campos y dejarlos vacíos, además, dejar los indices de combobox en su posición por defecto
  document.getElementById("txtRut").value='';
  document.getElementById("txtNombre").value='';
  document.getElementById("txtDireccion").value='';
  document.getElementById("txtCargo").value='';
  document.getElementById("txtDpto").selectedIndex=0;
  document.getElementById("txtAFP").selectedIndex=0;
  document.getElementById("txtSBase").value='';
  document.getElementById("txtBono").value='';
  document.getElementById("txtAguinaldo").value='';
  document.getElementById("txtGratificacion").value='';
  document.getElementById("txtDctoAFP").value='';
  document.getElementById("txtAnticipo").value='';
  document.getElementById("txtNHextras").selectedIndex=0;
  document.getElementById("txtPagoHrsExtra").value='';
  document.getElementById("sueldoliquido").textContent='Sueldo líquido: ???????';
}

function cambiarImagen(imagen){
  //A esta función se le da el argumento llamado "imagen", el cual es la URL de la ruta donde está 
  //la imagen, es decir, un 'img/imagen.jpg' es el tipo de argumento a entregar a esta función.
  document.getElementById("imgTablaReg").src = imagen;
}

function calculoCompra(){
  //Ingresado por el usuario
  var RUTCliente = document.getElementById("txtRUTCliente");
  var Producto = document.getElementById("txtProducto");
  var Cantidad = document.getElementById("txtCantidad").value;
  var VUnitario = document.getElementById("txtVUnitario").value;

  var VTotal = (parseInt(Cantidad) * parseInt(VUnitario));
  var IVAD = ((VTotal * 19) / 100);
  var IVA = IVAD.toFixed(0);
  var ValorPagar = ( parseInt(VTotal)+ parseInt(IVA));

  //alert("CALCULO: CANTIDAD="+Cantidad+"VUNITARIO: "+VUnitario+" VTOTAL: "+VTotal+" IVA: "+IVA+" VALORPAGAR: "+ValorPagar );
  document.getElementById("txtVTotal").value=VTotal;
  document.getElementById("txtIVA").value=IVA;
  document.getElementById("txtValorPagar").value=ValorPagar;

  //Aquí se toma la tabla a la que se va a añadir el registro.
  var table = document.getElementById("tablaCompra");

  //Aquí se determina donde es que se va a ingresar, se anota '1' en este caso ya que los títulos
  //ocupan la posición 0, si se ocupara la posición 0 aquí, los nuevos registros quedarían encima
  //de los títulos de las columnas.
  var row = table.insertRow(1);

  //Se añaden los campos correspondientes a la cantidad de columnas de la tabla, partiendo
  //por 0, como cualquier arreglo.
  var campo1 = row.insertCell(0);
  var campo2 = row.insertCell(1);
  var campo3 = row.insertCell(2);
  var campo4 = row.insertCell(3);
  var campo5 = row.insertCell(4);
  var campo6 = row.insertCell(5);
  var campo7 = row.insertCell(6);

  //Insertar datos en los campos, en este punto el script tomará todas las variables y 
  //ocupará correctamente su contenido con las órdenes '.value' y 'parseInt()', para texto y números
  //respectivamente.
  campo1.innerHTML = RUTCliente.value;
  campo2.innerHTML = Producto.value;
  campo3.innerHTML = Cantidad;
  campo4.innerHTML = VUnitario;
  campo5.innerHTML = parseInt(VTotal);
  campo6.innerHTML = parseInt(IVA);
  campo7.innerHTML = parseInt(ValorPagar);

}

function validarDCompra(){
  var RUTCliente = document.getElementById("txtRUTCliente");
  var Producto = document.getElementById("txtProducto");
  var Cantidad = document.getElementById("txtCantidad");
  var VUnitario = document.getElementById("txtVUnitario");

  if(RUTCliente.value == ''){
    alert("Ingrese RUT de cliente");
    return false;
  }
  if(Producto.value == ''){
    alert("Ingrese nombre de producto");
    return false;
  }
  if(Cantidad.value < 0 || Cantidad.value == ''){
    alert("La cantidad de productos no puede ser menor a 0 ni contener letras.");
    return false;
  }
  if(VUnitario.value < 0 || VUnitario.value == ''){
    alert("Ingrese un valor unitario")
    return false;
  }
  calculoCompra();
  return true;
}

function limpiarCamposC(){
  document.getElementById("txtRUTCliente").value='';
  document.getElementById("txtProducto").value='';
  document.getElementById("txtCantidad").value='1';
  document.getElementById("txtVUnitario").value='';
  document.getElementById("txtVTotal").value='';
  document.getElementById("txtIVA").value='';
  document.getElementById("txtValorPagar").value='';
}