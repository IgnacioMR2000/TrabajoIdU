let diccionario = {
	'Fundamentos básicos': "fundamentosBasicos",
	'Variables, tipos de datos y conversión': "variables",
	'Operadores y booleanos': "operadores",
	'Condicionales if-else y switch' : "condicionales",
	'Bucles for y while' : "bucles",
	'Arrays y Strings' : "arrays",
	'Lectura desde teclado' : "leerTeclado",
	'Direccionamiento de memoria y punteros' : "punteros",
	'Funciones' : "funciones",
	'Ficheros' : "ficheros",
	'Estructuras' : "estructuras",
	'Enumerados' : "enumerados",
	'Autoevaluación en C' : "CAutoevaluacion"
  };

const tutosC = 12;
//let visitedCPages = [];
//let enlacesC = [];

//Al cargar la pagina, si estamos en Cuenta, recoge el componente perfil y lo actualiza si es necesario
document.addEventListener("DOMContentLoaded", function() {
	if (window.location.pathname == '../Cuenta/Cuenta.html' || window.location.pathname == '/Cuenta/Cuenta.html')
	{
		const profile = document.getElementById("profile");

		showLast();
		showPercentage();
	} else if (window.location.pathname == '../Tutoriales/ProgramacionImperativa.html')
	{
		addCheck();
	} else
		console.log("Estoy en ubicacion: " + window.location.pathname);
});

//Muestra el último tutorial visitado por el usuario con sesión iniciada, o nada si no ha visto ninguno
function showLast() {
	const sesion = JSON.parse(sessionStorage.getItem('sesion'));

	console.log("A mostrar last");
	if (sesion === true) {
		let cuentaActiva = JSON.parse(sessionStorage.getItem('cuentaActiva'));
		lastPage = cuentaActiva.lastPage;
		console.log("lastPage es: " + lastPage);

		if (lastPage != null && lastPage.length > 0) {
			const newItem = document.createElement('h4');
			const linktext = document.createElement('a');
			linktext.setAttribute('href', '../Tutoriales/C/' + diccionario[lastPage] + ".html");
			console.log("El valor de " + lastPage + " en diccionario es " + diccionario[lastPage]);
			linktext.appendChild(document.createTextNode(lastPage));
			newItem.appendChild(document.createTextNode("Vuelve a: "));
			newItem.appendChild(linktext);
			newItem.setAttribute('style', 'margin-top: 1%')
			profile.insertBefore(newItem, profile.children[1]);
		} else {
			console.log("lastPage es nulo");
		}
	} else {
		console.log("Sesion no iniciada");
	}

}

//Muestra el porcentaje de páginas visitadas de un tutorial concreto por el usuario
function showPercentage(){
	//if(!visitedCPages)
	//	sessionStorage.setItem('visitedCPages', JSON.stringify([]));
	let visitedCPages = JSON.parse(sessionStorage.getItem('cuentaActiva')).visitedCPages;
	let barraProgreso = document.getElementById('progressBar');
	let percentageNumber = document.createElement('span');
	if(!barraProgreso)
	{
		const newItem = document.createElement('a');
		newItem.innerText = "Progreso actual en C";

		barraProgreso = document.createElement('progress');
		barraProgreso.setAttribute('id', 'progressBar');
		barraProgreso.setAttribute('value', '0');
		barraProgreso.setAttribute('max', '100');
		barraProgreso.style.marginLeft = "20px";

		percentageNumber.innerText = "0%";
		percentageNumber.style.marginLeft = "20px";

		newItem.appendChild(barraProgreso);
		newItem.appendChild(percentageNumber);

		console.log("Numero hijos de profile: " + profile.children.length);
		profile.insertBefore(newItem, profile.children[1]); //parece que el boton es el antepenultimo o algo
		profile.insertBefore(document.createElement('br'), profile.children[1]);
		//profile.insertBefore(newItem, profile.children[profile.children.length - 3]); //parece que el boton es el antepenultimo o algo
		//profile.insertBefore(document.createElement('br'), profile.children[profile.children.length - 3]);
	}
	if(barraProgreso)
	{
		barraProgreso.setAttribute('value', visitedCPages.length / tutosC * 100);

		if (visitedCPages)
			percentageNumber.innerText = (visitedCPages.length / tutosC * 100).toFixed(1) + "%";
		else
			percentageNumber.innerText = 0 + "%";
		console.log("Llevas un " + visitedCPages.length / tutosC * 100 + "% completo de la lección de C. Lecciones hechas: " +
			visitedCPages.length + ", totales: " + tutosC);
	}
}

//Añade página visitada a la cuenta del usuario
function addPage(val){
	let sesionActiva = JSON.parse(sessionStorage.getItem("sesion"));

	if (sesionActiva === true)
	{
		let cuenta = JSON.parse(sessionStorage.getItem("cuentaActiva"));

		cuenta.lastPage = val;
		let visitedCPages = cuenta.visitedCPages;
		let enlacesC = cuenta.enlacesC;
		//console.log("Numero elementos en array: " + visitedCPages.length);
		if(visitedCPages === null || visitedCPages.length === 0)
		{
			console.log("ENTRO EN NULL");
			cuenta.visitedCPages = [];
			cuenta.visitedCPages.push(val);

			cuenta.enlacesC = [];
			cuenta.enlacesC.push("C/" + diccionario[val] + ".html");

			console.log("Añadido " + val + " a lista de C. Num elementos: " + visitedCPages.length);
			console.log("Añadido " + diccionario[val] + ".html a lista de enlacesC. Num elementos: " + enlacesC.length);
		}
		else
		{
			//visitedCPages = JSON.parse(sessionStorage.getItem('visitedCPages'));
			//enlacesC = JSON.parse(sessionStorage.getItem('enlacesC'));
			console.log("visitedCPages es " + visitedCPages);
			console.log("enlacesC es " + enlacesC);
			if(!visitedCPages.includes(val))
			{
				visitedCPages.push(val);
				enlacesC.push("C/" + diccionario[val] + ".html");

				console.log("Añadido " + val + " a lista de C. Num elementos: " + visitedCPages.length);
			}
		}
		sessionStorage.setItem("cuentaActiva", JSON.stringify(cuenta));		//Almacenamos los cambios en la cuenta
	} else
		console.log("No añado página porque no hay sesión iniciada");
}

//Añade un checkmark en las páginas que ha visitado el usuario
function addCheck(){
	const cuenta = JSON.parse(sessionStorage.getItem("cuentaActiva"));
	let sesionActiva = JSON.parse(sessionStorage.getItem("sesion"));

	console.log("AÑADIENDO CHECKS, CUENTA:" + cuenta.email + ", PÁGINAS: " + cuenta.enlacesC);

	if (sesionActiva === true)
	{
		const lista = document.querySelectorAll('a');
		let enlacesC = cuenta.enlacesC;

		for(let i = 0; i < lista.length; i++){
			read = lista[i].getAttribute('id');
			if ((!read && read != 'read') && enlacesC.includes(lista[i].getAttribute('href')))
			{
				let check = document.createElement("img");
				check.setAttribute('src', '/Recursos/Green-Tick-Vector.png');
				check.setAttribute('alt', 'Tutorial leido');
				check.setAttribute('id', 'checkMark');

				lista[i].appendChild(check);
				lista[i].setAttribute('id', 'read');
				console.log("Añadido check a: " + lista[i].getAttribute('href'));
			}
			else
				console.log(lista[i].getAttribute('href') + " no visitado (!=" + enlacesC + ")");
		}
	} else
		console.log("Sin sesion iniciada");
}
