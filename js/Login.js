	  	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('usuario').focus();
		Control('boton').addEventListener('click', verificar);
	}
		
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var nombre = Control('usuario').value;
		var pass = Control('pass').value;
		var msj = "";
		if (Vacio(nombre)) msj = msj + "No se ha ingresado nombre de usuario. ";
		if (Vacio(pass)) msj = msj + "No se ingresó contraseña. ";
		if (msj.length > 0){
			alert (msj);
			if (msj.startsWith("No se ingresó contraseña")){
				Control('pass').focus();
			}else{
				Control('usuario').focus();
			}
		}else{
				Control('spinner').style.display= "inline-grid";
				Control('boton').style.display= "none";
				Enviar();
		}
	}

	function Enviar(){// hace la funcion submit utilizando petición asincrónica al servidor y trae la respuesta sin salir de la pagina
			EnviarAlServidor("https://app-calvo-back.herokuapp.com/", Respuesta);	
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
					Control('bienvenida').innerHTML= "Hola, " + Control("usuario").value +", has ingresado al sistema dado que php todavia no valida usuarios porque no se han creado bases de datos.";
				}else{
					alert("Ocurrió un error.");
				}
			}
		}
		// Creo un objeto con los datos ingresados en el formulario
		var usuario = {nombre: Control("usuario").value, pass: Control("pass").value};

		// envío el mensaje al servidor con los datos
		xmlhttp.send(usuario);
	}

	function Respuesta(mensaje){
		alert ("El servidor responde: " + mensaje);
	}