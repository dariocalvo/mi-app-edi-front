<!doctype html>
<html>
<Head>
	<Title> TP1-1 </title
	<meta name="TP1_1" content="Trabajo práctico Nro 1, ejercicio 1">
	<meta name="Autor" content="Dario Calvo">
	<meta data="Fecha de creación" content="03/06/2020">
	<meta data="Idioma" content="Español">
	<meta charset="UTF-8">
</head>



<body style="background-color: #D1CFE6">
	<table align="center" border="0">
		<tr width="1280" height="250">
			<td><h1>
			<?php
				$usuario = $_POST['nombre'];
				$pass = $_POST['clave'];
				if (Empty($usuario)){
					echo "No ha ingresado usuario...<br>\n";
				}else{
				echo "Hola ".$usuario."<br>\n"; 
				}
				if (Empty($pass)){
					echo "No ha ingresado clave...<br>\n";
				}else{
				echo "Ha ingresado al sistema con su clave: ".$pass."<br>\n";
				}
			?>
			</h1>
				<input type="button" onclick="location.href='login.html';" value="Continuar" />
			</td>
		</tr>				
	</table>
</body>
	
</html>
