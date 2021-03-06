	addEventListener('load',Alcargar,false);
		
    //Moverse por los elementos al pulsar Enter (generica y reutilizable si se indexan los elementos)
    document.addEventListener('keypress', function(pulsar) {
		if (pulsar.key !== 'Enter') {return;}
		let element = pulsar.target;
		let tabIndex = element.tabIndex + 1;
		var siguiente = document.querySelector('[tabindex="'+tabIndex+'"]');
		if (!siguiente) {siguiente = document.querySelector('[tabindex= 0]');}
		siguiente.focus();
		});

	function Control(idControl){ //ahorrarse escribir todo cada vez que se haga referencia a un ID
		return document.getElementById(idControl);
	}
	
    function ValidarExpreg(cadena, regla){// validar textos con expresiones regulares
        if (regla.test(cadena)){
		    return true;
        }else{
        	return false;
		}
	}

	function EnviarPost(servidor, datos, Respuesta){// enviar peticion al servidor sin salir de la pagina
		var xmlhttp = new XMLHttpRequest();
			
		xmlhttp.open("POST", servidor, true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE){
				if(xmlhttp.status == 200){
					Respuesta(xmlhttp.responseText);
					Control('spinner').style.display= "none";
				}else{
					alert("Ocurrió un error.");
				}
			}
		}
		xmlhttp.setRequestHeader('enctype', 'multipart/form-data');
		xmlhttp.send(datos);
	}
/*
	function Contar(nombre){// contar vocales y consonantes 
		var vocales = nombre.match(/[aeiou]/gi).length;
		var consonantes = nombre.match(/[bcdfghjklmnñpqrstvwxyz]/gi).length;
		alert ("El nombre ingresado contiene " + vocales + " vocales y " + consonantes + " consonantes.");
	}
*/
	