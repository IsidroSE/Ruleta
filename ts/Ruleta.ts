//Saldo inicial del jugador
const saldo_inicial_jugador = 5000;

//Select que se usará para que el jugador pueda seleccionar las fichas con las que quiere apostar
let ficha: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ficha");
ficha.selectedIndex = 0;

//Imagen que mostrará la ficha seleccionada
let imagen_ficha: HTMLImageElement = <HTMLImageElement>document.getElementById("imagen_ficha");

//Datos del jugador
let credito_jugador: HTMLElement = document.getElementById("credito_jugador");
let apuesta_total_jugador: HTMLElement = document.getElementById("apuesta_total_jugador");
let ganancia_jugador: HTMLElement = document.getElementById("ganancia_jugador");

//Marcador de la ruleta
let marcador_ruleta: HTMLElement = document.getElementById("marcador_ruleta");

//Todas las apuestas disponibles
enum tipo_apuestas {
    "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve",
    "veinte", "veintiuno", "veintidos", "veintitres", "veinticuatro", "veinticinco", "veintiseis", "veintisiete",
    "veintiocho", "veintinueve", "treinta", "treinta_y_uno", "treinta_y_dos", "treinta_y_tres", "treinta_y_cuatro",
    "treinta_y_cinco", "treinta_y_seis",
    PASA = 100,
    FALTA = 101,
    PAR = 102,
    IMPAR = 103,
    NEGRO = 104,
    ROJO = 105,
    P12 = 106,
    M12 = 107,
    D12 = 108
}

function apostar(numApuesta) {
    console.log(tipo_apuestas[numApuesta]);
}

function cambiar_ficha(value) {
    console.log(value + ".png");
    imagen_ficha.src = "img/" + value + ".png";
}
