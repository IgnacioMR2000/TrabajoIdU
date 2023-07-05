class Cuenta {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.visitedCPages = [];
        this.enlacesC = [];
        this.lastPage = '';
    }
}

let sesionActiva = false;
let usuarios = [];

function crearCuenta() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("contraseña").value;
    if (email.length > 0 && password.length > 0 && password === document.getElementById("contraseña-repetida").value) {
        const cuenta = new Cuenta(email, password);
        usuarios.push(cuenta);
        sesionActiva = true;
        sessionStorage.setItem("sesion", JSON.stringify(sesionActiva));
        sessionStorage.setItem("cuentaActiva", JSON.stringify(cuenta));
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Cuenta creada. ¡Bienvenido!");
    } else {
        event.preventDefault();
        if (password != document.getElementById("contraseña-repetida").value)
            alert("Las contraseñas introducidas no coinciden entre sí. Inténtelo de nuevo.");
        else
            alert("No puede haber campos sin rellenar");
    }
}

function iniciarSesion() {
    event.preventDefault();     //event está deprecated, buscar alternativa si da tiempo pasando el evento como parámetro a la función

    const email = document.getElementById("email").value;
    const password = document.getElementById("contraseña").value;
    const usuarios = JSON.parse(sessionStorage.getItem("usuarios"));

    console.log("A COMPROBAR. USUARIOS: " + usuarios);
    if (usuarios) {
        console.log("Entro en bucle. Cantidad usuarios:" + usuarios.length);
        //Buscamos iterativamente un usuario con esas credenciales
        for (let i = 0; i < usuarios.length; i++) {
            let cuenta = usuarios[i];
            //console.log("Comprobando email: " + cuenta.email + ", pwd: " + cuenta.password);        //BORRAR! GRAVE VULNERACIÓN DE PRIVACIDAD!
            if (cuenta != null && email === cuenta.email && password === cuenta.password) {
                sesionActiva = true;
                sessionStorage.setItem("sesion", JSON.stringify(sesionActiva));
                sessionStorage.setItem("cuentaActiva", JSON.stringify(cuenta));
                //sessionStorage.setItem("cuenta", JSON.stringify(cuenta));
                alert("¡Bienvenido de vuelta!");
                window.location.href="../index.html";
                break;
            }
        }
        if (sesionActiva != true)
            alert("Email o contraseña incorrectos. Inténtelo de nuevo.");
    } else {
        alert("Email o contraseña incorrectos. Inténtelo de nuevo.");
    }
}

function cerrarSesion() {
    sesionActiva = false;
    sessionStorage.setItem("sesion", JSON.stringify(sesionActiva));
    sessionStorage.setItem("cuentaActiva", null);
    window.location.href="../index.html";
    alert("Sesión cerrada.");
}
