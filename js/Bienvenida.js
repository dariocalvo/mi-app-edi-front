function Alcargar(){//Hacer foco al cagar la pagina en el primer campo a rellenar
	var usuario = sessionStorage.getItem('usuario');
	var imagen = sessionStorage.getItem('imagen');
	var rutaimagen = "https://app-calvo-back.herokuapp.com/Img/usuarios/"+imagen;
	Control('bienvenida').innerHTML="Hola "+usuario+"!";
	ponerimagen(rutaimagen);
}	
	
	function ponerimagen(rutaimagen){
		var servidor = rutaimagen;	
		var datos= new FormData();
		datos.append("imagen", rutaimagen);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", servidor, true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == XMLHttpRequest.DONE){
				if(xmlhttp.status == 200){
					Control('img_previa').src = rutaimagen;
				}else{
					Control('img_previa').src="img/user.png";
				}
			}
		}
		xmlhttp.setRequestHeader('enctype', 'multipart/form-data');
		xmlhttp.send(datos);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	


	

