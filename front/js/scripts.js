	addEventListener('load',Alcargar,false);
   
	function Vaciar(control){//Vaciar campos al tomar foco
    control.value='';
	}
	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		document.getElementById('spinner').style.display= "none";
		document.getElementById('campo1').focus();
	}
	
	function pulsar(event) {//pasar de campo en campo al pulsar Enter
		
		if (event.which == 13 || event.which == 72 || event.which == 80){
			var actual = document.activeElement.name;
			if(actual == 'nombre'){
				document.getElementById('campo2').focus();
			}else{
				if(actual == 'clave'){
					document.getElementById('boton').focus();
				}else{
					document.getElementById('clave').focus();
				}
			}					
			event.preventDefault();
		}	
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var nombre = document.getElementById('campo1').value;
		var pass = document.getElementById('campo2').value;
		var msj = "";
		if (Vacio(nombre)) msj = msj + "No se ha ingresado nombre de usuario. ";
		if (Vacio(pass)) msj = msj + "No se ingresó contraseña.";
		if (msj.length > 0){
			alert (msj);
			if (msj.startsWith("No se ingresó contraseña")){
				document.getElementById('campo2').focus();
			}else{
				document.getElementById('campo1').focus();
			}
			return false;
		}else{
			if (ValidarClave(pass)){
				document.getElementById('spinner').style.display= "inline-grid";
				document.getElementById('boton').style.display= "none";
				Contar(nombre);
				return false;//cambiar a true cuando se quiera enviar el formulario
			}else{
				alert ("La contraseña debe contener al menos un número y una mayúscula.");
				document.getElementById('campo2').focus();
				return false;
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
		const valida = /^(.*[A-Z])(.*[0-9]).*$/;
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

	