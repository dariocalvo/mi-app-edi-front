	addEventListener('load',Alcargar,false);
   
	function Control(idControl){ //ahorrarse escribir todo cada vez que se haga referencia a un ID
		return document.getElementById(idControl);
	}
	
	function Vaciar(campo){//Vaciar campos al tomar foco
    campo.value='';
	}
	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('campo1').focus();
	}
	
	function pulsar(event) {//pasar de campo en campo al pulsar Enter
		
		if (event.which == 13 || event.which == 72 || event.which == 80){
			var actual = document.activeElement.name;
			if(actual == 'nombre'){
				Control('campo2').focus();
			}else{
				if(actual == 'clave'){
					Control('boton').focus();
				}else{
					Control('clave').focus();
				}
			}					
			event.preventDefault();
		}	
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var nombre = Control('campo1').value;
		var pass = Control('campo2').value;
		var msj = "";
		if (Vacio(nombre)) msj = msj + "No se ha ingresado nombre de usuario. ";
		if (Vacio(pass)) msj = msj + "No se ingresó contraseña.";
		if (msj.length > 0){
			alert (msj);
			if (msj.startsWith("No se ingresó contraseña")){
				Control('campo2').focus();
			}else{
				Control('campo1').focus();
			}
			//return false;
		}else{
			if (ValidarClave(pass)){
				Control('spinner').style.display= "inline-grid";
				Control('boton').style.display= "none";
				Contar(nombre);
				Enviar();
			//	return true;
			}else{
				alert ("La contraseña debe contener al menos un número y una mayúscula.");
				Control('campo2').focus();
			//	return false;
			}
		}
	}

	function Vacio(texto){//verificar campo vacio 
		if (texto.length < 1){
			return true;
		} else {
			return false;
		}	
	}

	function ValidarClave(pass){// validar clave con expresiones regulares
		const valida = /^(.*[A-Z|0-9]+)(.*[0-9|A-Z]+).*$/;
		if (valida.test(pass)){
			 return true;
		}else{
			return false;
		}
	}	

	function Contar(nombre){// contar vocales y consonantes 
		var vocales = nombre.match(/[aeiou]/gi).length;
		var consonantes = nombre.match(/[bcdfghjklmnñpqrstvwxyz]/gi).length;
		alert ("El nombre ingresado contiene " + vocales + " vocales y " + consonantes + " consonantes.");
	}

	function Enviar(){// hace la funcion submit utilizando petición asincrónica al servidor y trae la respuesta sin salir de la pagina
			EnviarAlServidor("/EDI_3/back/", Respuesta);
			alert ("Este mensaje se escribió despues de mandar la peticion asincrónica");
	}

	function EnviarAlServidor(servidor, Respuesta){// enviar peticion al servidor sin salir de la pagina
		// Crear un objeto xml
		var xmlhttp = new XMLHttpRequest();
		// armo el mensaje a enviar al servidor:
		// paso parametros del envío: metodo por el cual mando la peticion, que servidor donde dirige el llamado, y true si lo quiero asincrónico
		xmlhttp.open("POST", servidor, true);
		// asigno al evento que cuando esta reciba un estado haga la funcion...
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE){
				if(xmlhttp.status == 200){
					Respuesta(xmlhttp.responseText);// me muestre la respuesta del servidor si todo fue OK
					Control('spinner').style.display= "none";
					Control('bienvenida').innerHTML= "Hola, " + Control("campo1").value +", has ingresado al sistema dado que php todavia no valida usuarios porque no se han creado bases de datos.";
				}else{
					alert("Ocurrió un error.");
				}
			}
		}
		// Creo un objeto con los datos ingresados en el formulario
		var usuario = {nombre: Control("campo1").value, pass: Control("campo2").value};

		// envío el mensaje al servidor con los datos
		xmlhttp.send(usuario);
	}

	function Respuesta(mensaje){
		alert ("El servidor responde: " + mensaje);
	}