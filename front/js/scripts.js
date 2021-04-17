	addEventListener('load',Alcargar,false);
   
	function Vaciar(control){//Vaciar campos al tomar foco
    control.value='';
	}
	
	function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
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
