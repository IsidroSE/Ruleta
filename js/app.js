var Apuesta = (function () {
    function Apuesta() {
    }
    return Apuesta;
}());
var Jugador = (function () {
    function Jugador() {
        this._credito = saldo_inicial_jugador;
        this._apuesta_total = 0;
        this._ganancia = 0;
        this._apuestas = [];
    }
    Object.defineProperty(Jugador.prototype, "credito", {
        get: function () {
            return this.credito;
        },
        set: function (credito) {
            this._credito = credito;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "apuesta_total", {
        get: function () {
            return this._apuesta_total;
        },
        set: function (apuesta_total) {
            this._apuesta_total = apuesta_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "ganancia", {
        get: function () {
            return this._ganancia;
        },
        set: function (ganancia) {
            this._ganancia = ganancia;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "apuestas", {
        get: function () {
            return this._apuestas;
        },
        set: function (apuestas) {
            this._apuestas = apuestas;
        },
        enumerable: true,
        configurable: true
    });
    Jugador.prototype.agregar_apuesta = function (apuesta) {
        this._apuestas.push(apuesta);
    };
    return Jugador;
}());
//Saldo inicial del jugador
var saldo_inicial_jugador = 5000;
//Select que se usará para que el jugador pueda seleccionar las fichas con las que quiere apostar
var ficha = document.getElementById("ficha");
ficha.selectedIndex = 0;
//Imagen que mostrará la ficha seleccionada
var imagen_ficha = document.getElementById("imagen_ficha");
//Datos del jugador
var credito_jugador = document.getElementById("credito_jugador");
var apuesta_total_jugador = document.getElementById("apuesta_total_jugador");
var ganancia_jugador = document.getElementById("ganancia_jugador");
//Marcador de la ruleta
var marcador_ruleta = document.getElementById("marcador_ruleta");
//Todas las apuestas disponibles
var tipo_apuestas;
(function (tipo_apuestas) {
    tipo_apuestas[tipo_apuestas["cero"] = 0] = "cero";
    tipo_apuestas[tipo_apuestas["uno"] = 1] = "uno";
    tipo_apuestas[tipo_apuestas["dos"] = 2] = "dos";
    tipo_apuestas[tipo_apuestas["tres"] = 3] = "tres";
    tipo_apuestas[tipo_apuestas["cuatro"] = 4] = "cuatro";
    tipo_apuestas[tipo_apuestas["cinco"] = 5] = "cinco";
    tipo_apuestas[tipo_apuestas["seis"] = 6] = "seis";
    tipo_apuestas[tipo_apuestas["siete"] = 7] = "siete";
    tipo_apuestas[tipo_apuestas["ocho"] = 8] = "ocho";
    tipo_apuestas[tipo_apuestas["nueve"] = 9] = "nueve";
    tipo_apuestas[tipo_apuestas["diez"] = 10] = "diez";
    tipo_apuestas[tipo_apuestas["once"] = 11] = "once";
    tipo_apuestas[tipo_apuestas["doce"] = 12] = "doce";
    tipo_apuestas[tipo_apuestas["trece"] = 13] = "trece";
    tipo_apuestas[tipo_apuestas["catorce"] = 14] = "catorce";
    tipo_apuestas[tipo_apuestas["quince"] = 15] = "quince";
    tipo_apuestas[tipo_apuestas["dieciseis"] = 16] = "dieciseis";
    tipo_apuestas[tipo_apuestas["diecisiete"] = 17] = "diecisiete";
    tipo_apuestas[tipo_apuestas["dieciocho"] = 18] = "dieciocho";
    tipo_apuestas[tipo_apuestas["diecinueve"] = 19] = "diecinueve";
    tipo_apuestas[tipo_apuestas["veinte"] = 20] = "veinte";
    tipo_apuestas[tipo_apuestas["veintiuno"] = 21] = "veintiuno";
    tipo_apuestas[tipo_apuestas["veintidos"] = 22] = "veintidos";
    tipo_apuestas[tipo_apuestas["veintitres"] = 23] = "veintitres";
    tipo_apuestas[tipo_apuestas["veinticuatro"] = 24] = "veinticuatro";
    tipo_apuestas[tipo_apuestas["veinticinco"] = 25] = "veinticinco";
    tipo_apuestas[tipo_apuestas["veintiseis"] = 26] = "veintiseis";
    tipo_apuestas[tipo_apuestas["veintisiete"] = 27] = "veintisiete";
    tipo_apuestas[tipo_apuestas["veintiocho"] = 28] = "veintiocho";
    tipo_apuestas[tipo_apuestas["veintinueve"] = 29] = "veintinueve";
    tipo_apuestas[tipo_apuestas["treinta"] = 30] = "treinta";
    tipo_apuestas[tipo_apuestas["treinta_y_uno"] = 31] = "treinta_y_uno";
    tipo_apuestas[tipo_apuestas["treinta_y_dos"] = 32] = "treinta_y_dos";
    tipo_apuestas[tipo_apuestas["treinta_y_tres"] = 33] = "treinta_y_tres";
    tipo_apuestas[tipo_apuestas["treinta_y_cuatro"] = 34] = "treinta_y_cuatro";
    tipo_apuestas[tipo_apuestas["treinta_y_cinco"] = 35] = "treinta_y_cinco";
    tipo_apuestas[tipo_apuestas["treinta_y_seis"] = 36] = "treinta_y_seis";
    tipo_apuestas[tipo_apuestas["PASA"] = 100] = "PASA";
    tipo_apuestas[tipo_apuestas["FALTA"] = 101] = "FALTA";
    tipo_apuestas[tipo_apuestas["PAR"] = 102] = "PAR";
    tipo_apuestas[tipo_apuestas["IMPAR"] = 103] = "IMPAR";
    tipo_apuestas[tipo_apuestas["NEGRO"] = 104] = "NEGRO";
    tipo_apuestas[tipo_apuestas["ROJO"] = 105] = "ROJO";
    tipo_apuestas[tipo_apuestas["P12"] = 106] = "P12";
    tipo_apuestas[tipo_apuestas["M12"] = 107] = "M12";
    tipo_apuestas[tipo_apuestas["D12"] = 108] = "D12";
})(tipo_apuestas || (tipo_apuestas = {}));
function apostar(numApuesta) {
    console.log(tipo_apuestas[numApuesta]);
}
function cambiar_ficha(value) {
    console.log(value + ".png");
    imagen_ficha.src = "img/" + value + ".png";
}
