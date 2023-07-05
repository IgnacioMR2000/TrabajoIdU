function cambioCabeceraSesion() {
    const sesion = JSON.parse(sessionStorage.getItem("sesion"));
    const elemento = document.getElementById("sesionCuenta");
    if (sesion === true) {
        elemento.children[0].innerText = "Perfil";
        elemento.href = "/Cuenta/Cuenta.html"                           //revisar si funciona con github pages
        const icono = document.createElement("svg");
        icono.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        icono.setAttribute("width", "16");
        icono.setAttribute("height", "16");
        icono.setAttribute("fill", "currentColor");
        icono.setAttribute("class", "bi bi-person-circle");
        icono.setAttribute("viewBox", "0 0 16 16");
        icono.innerHTML = '<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>\n<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>'
        elemento.insertBefore(icono, elemento.children[0]);
    } else {
        console.log ("Sesion: " + sesion);
    }
}
