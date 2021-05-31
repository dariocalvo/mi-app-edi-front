	addEventListener('load',Alcargar,false);
		
	function Control(idControl){ //ahorrarse escribir todo cada vez que se haga referencia a un ID
		return document.getElementById(idControl);
	}
	
    function Comparar(texto1, texto2){//verificar igualdad de textos 
		if (texto1 == texto2){
			return true;
		} else {
			return false;
		}	
	}

    function ValidarExpreg(cadena, regla){// validar textos con expresiones regulares
        if (regla.test(cadena)){
		    return true;
        }else{
        	return false;
		}
	}

    //Moverse por los elementos al pulsar Enter (generica y reutilizable si se indexan los elementos)
    document.addEventListener('keypress', function(pulsar) {
		if (pulsar.key !== 'Enter') {return;}
		let element = pulsar.target;
		let tabIndex = element.tabIndex + 1;
		var siguiente = document.querySelector('[tabindex="'+tabIndex+'"]');
		if (!siguiente) {siguiente = document.querySelector('[tabindex= 0]');}
		siguiente.focus();
		});

/*
	function Contar(nombre){// contar vocales y consonantes 
		var vocales = nombre.match(/[aeiou]/gi).length;
		var consonantes = nombre.match(/[bcdfghjklmnñpqrstvwxyz]/gi).length;
		alert ("El nombre ingresado contiene " + vocales + " vocales y " + consonantes + " consonantes.");
	}
*/
	