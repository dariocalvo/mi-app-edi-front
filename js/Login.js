	  	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
		Control('spinner').style.display= "none";
		Control('usuario').focus();
		escucharEventos();
	}
	
	function escucharEventos(){
		Control('enviar').addEventListener('click', verificar);
		Control('usuario').addEventListener('focus', function(event){event.target.value = "";});	  
		Control('contraseña').addEventListener('focus', function(event){event.target.value = "";});
	}
	
	function verificar() {//verificar datos correctos antes de enviar formulario (campos vacios y clave con digitos requeridos)
		var i = 1;
		var regla = /^(?!\s).+$/;
		var elemento = "";
		var error=false;
			while (i > 0){
				error=false;
				elemento = document.querySelector('[tabindex = "'+i+'"]').id;
				i++;
				if (!ValidarExpreg(Control(elemento).value, regla)){
					alert ('Error en el campo '+elemento+', no puede estar vacío ni comenzar con espacios.');
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

	function Enviar(){
		//var servidor = "../back/Login.php";	
		var servidor = "https://app-calvo-back.herokuapp.com/Login.php";
		var datos= new FormData();
		datos.append("usuario", Control("usuario").value);
		datos.append("contraseña", Control("contraseña").value);
		EnviarPost(servidor, datos,  Respuesta);	
	}

	function Respuesta(mensaje){
		if (mensaje =='true'){
			sessionStorage.setItem('usuario', Control('usuario').value);
			sessionStorage.setItem('imagen', Control('usuario').value+'.jpg');
			window.location = 'Bienvenida.html';
		
		}else{
			alert('Usuario o contraseña incorrectos.');
			Control('usuario').focus();
			Control('enviar').style.display= "inline-grid";
		}
	}