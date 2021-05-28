	addEventListener('load',Alcargar,false);
   
	function Control(idControl){ //ahorrarse escribir todo cada vez que se haga referencia a un ID
		return document.getElementById(idControl);
	}
	
    function Vaciar(campo){//Vaciar campos al tomar foco
        campo.value='';
    }
	
	function Vacio(texto){//verificar campo vacio 
		if (texto.length < 1){
			return true;
		} else {
			return false;
		}	
	}

    function Comparar(texto1, texto2){//verificar igualdad de textos 
		if (texto1 == texto2){
			return true;
		} else {
			return false;
		}	
	}

    function ValidarExpreg(pass, regla){// validar textos con expresiones regulares
        if (regla.test(pass)){
		    return true;
        }else{
        	return false;
		}
	}

    //Moverse por los elementos al pulsar Enter (generica y reutilizable si se indexan los elementos)
    document.addEventListener('keypress', function(pulsar) {
 
		// Si el evento NO es una tecla Enter devuelvo el valor
		if (pulsar.key !== 'Enter') {return;}
		 
		let element = pulsar.target;
		 
		// Encontrar el siguiente index 
		let tabIndex = element.tabIndex + 1;
		var siguiente = document.querySelector('[tabindex="'+tabIndex+'"]');
		 
		// Si ya no hay mas volvemos al principio
		if (!siguiente) {siguiente = document.querySelector('[tabindex= 0]');}
		siguiente.focus();
		event.preventDefault();
		});

    /*  OTRA MANERA no TAN GENERICA, (control por ID)
        function pulsar(event) {//pasar de campo en campo al pulsar Enter
		
            if (event.which == 13 || event.which == 72 || event.which == 80){
                var actual = document.activeElement.id;
                if(actual == 'usuario'){
                    Control('pass').focus();
                }else{
                    if(actual == 'pass'){
                        Control('boton').focus();
                    }else{
                        Control('pass').focus();
                    }
                }					
                event.preventDefault();
            }	
        }    
    */
/*
	function Contar(nombre){// contar vocales y consonantes 
		var vocales = nombre.match(/[aeiou]/gi).length;
		var consonantes = nombre.match(/[bcdfghjklmnñpqrstvwxyz]/gi).length;
		alert ("El nombre ingresado contiene " + vocales + " vocales y " + consonantes + " consonantes.");
	}
*/
	