		
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('usuario').focus();
		Control('default').style.display = 'none';
		Control('default').addEventListener('click', imagenDefault);
		Control('enviar').addEventListener('click', verificar);
		Control('pass').addEventListener('change', comprobarPass);
		requisitoPass();
	}

    function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var nombre = Control('usuario').value;
		var pass = Control('pass').value;
        var pass2 = Control('pass2').value;
		var msj = "";
        if (Vacio(nombre)) msj = msj + "No se ha ingresado nombre de usuario. ";
		if (Vacio(pass)) msj = msj + "No se ingresó contraseña. ";
        if (Vacio(pass2)) msj = msj + "No se ingresó la confirmación de contraseña. ";
        if (!Comparar(pass, pass2)) msj = msj + "Las contraseñas no son iguales. ";
		if (msj.length > 0){
			alert (msj);
			if (msj.startsWith("No se ingresó") || msj.startsWith("Las")){
				Control('pass').focus();
			}else{
				Control('usuario').focus();
			}
		}else{
            var expreg = /^(?=(?:.*\d){1})(?=.*[A-Z])(.)(?:.*)$/;
		    if (ValidarExpreg(pass, expreg)){
				Control('spinner').style.display= "inline-grid";
				Control('boton').style.display= "none";
				Enviar();
			}else{
				alert ("La contraseña no cumple con los requisitos, debe contener al menos un número y una mayúscula.");
				Control('pass').focus();
			}
		}
	}
	
	function comprobarPass(){
		var expreg = /^(?=(?:.*\d){1})(?=.*[A-Z])(.)(?:.*)$/;
		var pass = Control('pass').value;
		if (ValidarExpreg(pass, expreg)){
			Control('msjpas').style.color = "green";
			Control('msjpas').innerHTML="La contraseña esta OK.";	
		}else{
			if (pass.length > 0){
				Control('msjpas').style.color = "red";
				Control('msjpas').innerHTML="La contraseña no cumple con los requisitos";
			}else{
				Control('msjpas').innerHTML="<br>";
			}	
		}
	}

    function requisitoPass(){
		Control('pass').addEventListener('focus', (event) => {
			Control('msjpas').style.color = "grey";
			Control('msjpas').innerHTML="Debe contener al menos una mayúscula y un número.";
		});
		Control('pass').addEventListener('blur', (event) => {
			comprobarPass();
		});
	}


    function imagenPrevia() { //Genera una imágen previa del archivo a subir       
        var reader = new FileReader();         
        reader.readAsDataURL(Control('avatar').files[0]);         
        reader.onload = function (e) {       
            Control('img_previa').src = e.target.result;   
        }  
		Control('avatar').className = 'col-md-9'; 
		Control('default').style.display = 'inline';
		Control('boton').focus();
	}  
	
	function imagenDefault() { //Genera una imágen previa del archivo a subir    
			Control('img_previa').src = "img/user.png";
			Control('avatar').className = 'col-md-11'; 
			Control('avatar').value='';
			Control('default').style.display = 'none';
			Control('boton').focus();
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