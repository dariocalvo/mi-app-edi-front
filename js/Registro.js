		
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('nombre').focus();
		Control('default').style.display = 'none';
		escucharEventos();
	}

	function escucharEventos(){
		Control('default').addEventListener('click', imagenDefault);
		Control('enviar').addEventListener('click', verificar);
		Control('nombre').addEventListener('focus', function(event){event.target.value = "";});	  
		Control('usuario').addEventListener('focus', function(event){event.target.value = "";});	  
		Control('email').addEventListener('focus', function(event){event.target.value = "";});
		Control('contraseña').addEventListener('focus', function(event){
			event.target.value = "";
			Control('msjpas').style.color = "#495E67";
			Control('msjpas').innerHTML="Debe contener al menos una mayúscula y un número.";
		});
		Control('contraseña').addEventListener('blur', (event) => {comprobarcontraseña();});
		Control('comprobación').addEventListener('focus', function(event){event.target.value = "";});
		Control('contraseña').addEventListener('change', comprobarcontraseña);
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var i = 1;
		var elemento = "";
		var error=false;
			while (i > 0){
				error=false;
				elemento = document.querySelector('[tabindex = "'+i+'"]').id;
				i++;
				switch (elemento){
					case "contraseña":
						var regla = /^(?=(?:.*\d){1})(?=.*[A-Z])(.)(?:.*)$/;
						var msjError = 'no cumple con los requisitos de seguridad.'; 
						break;
					case "comprobación":
						var contraseña = Control('contraseña').value;
						var regla = new RegExp("^" + contraseña + "$");
						var msjError = 'la contraseña y su comprobación no coinciden.'; 
						break;
					case "email":
						var regla = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
						var msjError = 'el formato no corresponde a una dirección de correo electrónico.';
						break;
					case "avatar":
						var regla = /^.*$/;	
						break;
					default:
						var regla = /^(?!\s).+$/;
						var msjError = 'el contenido del campo no puede estar vacío o comenzar con espacio.';
						break;	
				}
				if (!ValidarExpreg(Control(elemento).value, regla)){
					alert('Error en '+elemento+', '+msjError);
					error=true;
					Control(elemento).focus();
					break;
				}else{
					error=false;
				}
				if (elemento == 'enviar') {i=-1;}
			}
		if (!error){
			Control('spinner').style.display= "inline-grid";
			Control('enviar').style.display= "none";
			Enviar();
		}	
	}	

	function comprobarcontraseña(){
		var expreg = /^(?=(?:.*\d){1})(?=.*[A-Z])(.)(?:.*)$/;
		var pass = Control('contraseña').value;
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
    
    function imagenPrevia() { //Genera una imágen previa del archivo a subir       
        var reader = new FileReader();         
        reader.readAsDataURL(Control('avatar').files[0]);         
        reader.onload = function (e) {       
            Control('img_previa').src = e.target.result;   
        }  
		Control('avatar').className = 'col-md-12-9'; 
		Control('default').style.display = 'inline';
		Control('enviar').focus();
	}  
	
	function imagenDefault() { //Coloca una imágen por defecto si no se elije ninguna    
		Control('img_previa').src = "img/user.png";
		Control('avatar').className = 'col-md-12-9'; 
		Control('avatar').value='';
		Control('default').style.display = 'none';
		Control('enviar').focus();
	}


    
	function Enviar(){// hace la funcion submit utilizando petición asincrónica al servidor y trae la respuesta sin salir de la pagina
		var servidor = "https://app-calvo-back.herokuapp.com/";	
		EnviarAlServidor(servidor, RespuestaRecibida);
	}

	function EnviarAlServidor(servidor, Respuesta){// enviar peticion al servidor sin salir de la pagina
		var xmlhttp = new XMLHttpRequest();
		var datos= new FormData();
		datos.append("nombre", Control("nombre").value);
		datos.append("email", Control("email").value);
		datos.append("usuario", Control("usuario").value);
		datos.append("contraseña", Control("contraseña").value);
		datos.append("avatar", Control("avatar").files[0]);

		xmlhttp.open("POST", servidor, true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE){
				if(xmlhttp.status == 200){
					Respuesta(xmlhttp.responseText);// me muestre la respuesta del servidor si todo fue OK
					Control('spinner').style.display= "none";
				}else{
					alert("Ocurrió un error.");
				}
			}
		}
		xmlhttp.setRequestHeader('enctype', 'multipart/form-data');
		xmlhttp.send(datos);
	}

	function RespuestaRecibida(mensaje){
		alert ("El servidor responde: " + mensaje);
	}