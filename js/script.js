//  VARIABLES PRINCIPALES

let numeroSecreto;
let intentos;
let maxIntentos = 10;
let intentosPrevios = [];

// CRONÓMETRO
let tiempo = 0;
let temporizador;


// FUNCIONES DEL CRONÓMETRO

function iniciarCronometro(){

    tiempo = 0;

    document.getElementById("time").textContent = tiempo;

    temporizador = setInterval(function(){

        tiempo++;
        document.getElementById("time").textContent = tiempo;

    },1000);

}

function detenerCronometro(){

    clearInterval(temporizador);

}


//  INICIAR JUEGO

function iniciarJuego() {

    numeroSecreto = Math.floor(Math.random() * 100) + 1;

    intentos = 1;
    intentosPrevios = [];

    document.getElementById("message").textContent = "";
    document.getElementById("history").textContent = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("resetBtn").style.display = "none";

    detenerCronometro();
    iniciarCronometro();
}

window.onload = iniciarJuego;


//EVENTO BOTÓN INTENTAR

document.getElementById("guessBtn").addEventListener("click", function() {

    let input = document.getElementById("guessInput");
    let mensaje = document.getElementById("message");
    let historial = document.getElementById("history");

    let numeroUsuario = parseInt(input.value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
        mensaje.textContent = "⚠️ Ingresa un número válido entre 1 y 100.";
        return;
    }

    intentosPrevios.push(numeroUsuario);

    historial.textContent = "Intentos anteriores: " + intentosPrevios.join(", ");

    if (numeroUsuario === numeroSecreto) {
        mensaje.textContent = "🎉 ¡Felicidades! Adivinaste en " + intentos + " intentos y " + tiempo + " segundos.";
        finalizarJuego();
    }
    else if (intentos >= maxIntentos) {
        mensaje.textContent = "❌ Juego terminado. El número era: " + numeroSecreto + ". Tiempo: " + tiempo + "s";
        finalizarJuego();
    }
    else {
        if (numeroUsuario < numeroSecreto) {
            mensaje.textContent = "⬆️ El número es MAYOR. Intento #" + intentos;
        } else {
            mensaje.textContent = "⬇️ El número es MENOR. Intento #" + intentos;
        }
        intentos++;
    }

    input.value = "";
    input.focus();
});


// PERMITIR ENTER

document.getElementById("guessInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        document.getElementById("guessBtn").click();
    }

});


// FINALIZAR JUEGO

function finalizarJuego() {

    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("resetBtn").style.display = "inline-block";

    detenerCronometro();
}


// BOTÓN REINICIAR

document.getElementById("resetBtn").addEventListener("click", iniciarJuego);