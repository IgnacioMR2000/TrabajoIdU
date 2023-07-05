class Comentario{
	constructor(usuario, comentario) {
        this.usuario = usuario;
        this.comentario = comentario;
    }
}

let comentarios = [];

//Permite el funcionamiento de enviar comentario una vez todo ha cargado, para asegurar que no haya información nula. No sé hacerlo mejor
document.addEventListener("DOMContentLoaded", function() {
	const form = document.getElementById("nuevo_comentario");
	const cuenta = JSON.parse(sessionStorage.getItem("cuentaActiva"));
	const sesionActiva = JSON.parse(sessionStorage.getItem('sesion'));
	const commentBox = document.getElementById('comment_box');
	const addButton = document.getElementById('btn_subir');
	const advertencia = document.getElementById('advertencia');
	let comentario = commentBox.value.trim();

	if (!sesionActiva) {
			addButton.disabled = true;
			advertencia.textContent = 'Debes tener una sesión iniciada para comentar';
	} else if (comentario === '') {
			addButton.disabled = true;
			advertencia.textContent = 'El comentario no puede estar vacío';
	}

	// Si el contenido del cuadro de texto para comentar cambia
	commentBox.addEventListener('input', function() {
		comentario = commentBox.value.trim(); // Obtengo el contenido del comentario sin espacios en blanco al inicio y al final

		if (!sesionActiva)
		{
			addButton.disabled = true;
			advertencia.textContent = 'Debes tener la sesión iniciada';
		} else if (comentario === '') {
			addButton.disabled = true;
			advertencia.textContent = 'El comentario no puede estar vacío';
		} else {
			addButton.disabled = false;
			advertencia.textContent = '';
		}
	});

	//Al darle a enviar, comprueba si tiene sesion iniciada y el comentario no está vacío. Si es así, lo postea y recarga la página para mostrarlo; si no, avisa
	form.onsubmit = function (e) {


		const caja_comentarios = document.getElementById("comment_box")
		const comentario = caja_comentarios.value;
		console.log("LONGITUD COMENTARIO: " + comentario.length);

		if (sesionActiva === true && cuenta && comentario.length > 0) {
			comentarios = JSON.parse(sessionStorage.getItem('comentarios'));
			if (comentarios === null)
				comentarios = [];

			let usuario = cuenta.email.substring(0, cuenta.email.indexOf('@'));
			let nuevoComentario = new Comentario(usuario, comentario);

			comentarios.push(nuevoComentario);
			console.log("Comentario es: " + nuevoComentario);

			sessionStorage.setItem('comentarios', JSON.stringify(comentarios));
			alert("Comentario enviado");
		} else if (comentario.length === 0) {						//TODO: ¿Impedir uso de submit con comentario vacío? ¿Incluso sin sesión iniciada?
			e.preventDefault();		//Para que no borre el texto del comentario
			console.log("VACÍO!");
		} else {
			e.preventDefault();		//Para que no borre el texto del comentario
			alert("Debes iniciar sesión para añadir un comentario. Sesión: " + sesionActiva + ", cuenta: " + cuenta);
		}
	};
	console.log("LOS COMENTARIOS SON: " + comentarios);
});


function cargarComentarios() {
	comentarios = JSON.parse(sessionStorage.getItem('comentarios'));
	let lista = document.getElementById("comentarios");

	console.log("COMENTARIOS AL CARGAR: " + comentarios);

	if (comentarios && comentarios.length > 0) {
		console.log("EMPIEZO A PONER COMENTARIOS. TOTAL A PONER: " + comentarios.length);
		for(let i = 0; i < comentarios.length; i++) {
			let usuario = comentarios[i].usuario;
			let comentario = comentarios[i].comentario;

			let cmt = document.createElement("li");
			cmt.className = "";

			let us = document.createElement("h5");
			let texto = document.createElement("p");

			us.textContent = usuario + ': ';
			texto.textContent = comentario;

			cmt.appendChild(us);
			cmt.appendChild(texto);

			lista.appendChild(cmt);

			console.log("Comentario añadido. Usuario: " + usuario + ", comentario: " + comentario);
		}
	}
}


