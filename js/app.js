//Todas las apuestas disponibles
var tipo_apuestas;
(function (tipo_apuestas) {
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
//Categorias de las apuestas
var SUERTE_SENCILLA = "Suerte sencilla";
var DOCENA = "Docena";
var PLENO = "Pleno";
//Clases CSS de las categorias
var CSS_SUERTE_SENCILLA = "suerte_sencilla";
var CSS_DOCENA = "docenas";
var CSS_PLENO = "pleno";
var Apuesta = (function () {
    function Apuesta(numero, cantidad_apostada) {
        this._numero = numero;
        this._cantidad_apostada = cantidad_apostada;
        this.get_categoria_apuesta();
        this._resultado_apuesta = "";
    }
    /** Método que obtiene y guarda la categoría, tipo y clase CSS de la apuesta según la celda que se haya pulsado
     * Nota: Como estas 3 cosas están tan relacionadas, he preferido hacerlo todo en este método en vez de crear
     * otros 2 métodos exactamente iguales para las otras 2 variables.*/
    Apuesta.prototype.get_categoria_apuesta = function () {
        this._clase_de_apuesta = "";
        if (this._numero >= 0 && this._numero <= 36) {
            this._tipo_apuesta = this._numero + "";
            this._categoria_apuesta = PLENO;
            this._clase_de_apuesta = CSS_PLENO;
        }
        else if (this._numero >= tipo_apuestas.PASA && this._numero <= tipo_apuestas.D12) {
            switch (this._numero) {
                case tipo_apuestas.PASA:
                    this._tipo_apuesta = "Pasa (19 a 36)";
                    break;
                case tipo_apuestas.FALTA:
                    this._tipo_apuesta = "Falta (1 a 18)";
                    break;
                case tipo_apuestas.PAR:
                    this._tipo_apuesta = "Par";
                    break;
                case tipo_apuestas.IMPAR:
                    this._tipo_apuesta = "Impar";
                    break;
                case tipo_apuestas.NEGRO:
                    this._tipo_apuesta = "Negro";
                    break;
                case tipo_apuestas.ROJO:
                    this._tipo_apuesta = "Rojo";
                    break;
                case tipo_apuestas.P12:
                    this._tipo_apuesta = "P12 (1 a 12)";
                    break;
                case tipo_apuestas.M12:
                    this._tipo_apuesta = "M12 (13 a 24)";
                    break;
                case tipo_apuestas.D12:
                    this._tipo_apuesta = "D12 (25 a 36)";
                    break;
            }
            if (this._numero >= tipo_apuestas.P12 && this._numero <= tipo_apuestas.D12) {
                this._categoria_apuesta = DOCENA;
                this._clase_de_apuesta = CSS_DOCENA;
            }
            else {
                this._categoria_apuesta = SUERTE_SENCILLA;
                this._clase_de_apuesta = CSS_SUERTE_SENCILLA;
            }
        }
    }; // END get_categoria_apuesta()
    Object.defineProperty(Apuesta.prototype, "numero", {
        //SETTERS Y GETTERS
        get: function () {
            return this._numero;
        },
        set: function (numero) {
            this._numero = numero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Apuesta.prototype, "cantidad_apostada", {
        get: function () {
            return this._cantidad_apostada;
        },
        set: function (cantidad_apostada) {
            this._cantidad_apostada = cantidad_apostada;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Apuesta.prototype, "tipo_apuesta", {
        get: function () {
            return this._tipo_apuesta;
        },
        set: function (tipo_apuesta) {
            this._tipo_apuesta = tipo_apuesta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Apuesta.prototype, "resultado_apuesta", {
        get: function () {
            return this._resultado_apuesta;
        },
        set: function (resultado_apuesta) {
            this._resultado_apuesta = resultado_apuesta;
        },
        enumerable: true,
        configurable: true
    });
    //Muestra esta apuesta en pantalla
    Apuesta.prototype.mostrar_apuesta = function () {
        var apuesta;
        if (this._clase_de_apuesta != "") {
            apuesta =
                "<div class='apuesta'>"
                    + "<div class='cabecera_apuesta " + this._clase_de_apuesta + "'>"
                    + "<h3 class='tipo_apuesta'>" + this._categoria_apuesta + "</h3>"
                    + "</div>"
                    + "<div class='descripcion_apuesta'>"
                    + "<p>Apuesta por: " + this._tipo_apuesta + "</p>"
                    + "<p>Saldo apostado: " + this._cantidad_apostada + "€</p>"
                    + "<p> " + this._resultado_apuesta + " </p>"
                    + "</div>"
                    + "</div>";
            apuestas_mostradas.innerHTML += apuesta;
        }
    };
    Apuesta.prototype.equals = function (numero) {
        var equal = false;
        if (this._numero == numero)
            equal = true;
        return equal;
    };
    return Apuesta;
}());
//Saldo inicial del jugador
var saldo_inicial_jugador = 5000;
//Datos del jugador
var credito_jugador = document.getElementById("credito_jugador");
var apuesta_total_jugador = document.getElementById("apuesta_total_jugador");
var ganancia_jugador = document.getElementById("ganancia_jugador");
var Jugador = (function () {
    function Jugador() {
        this._credito = saldo_inicial_jugador;
        this._apuesta_total = 0;
        this._ganancia = 0;
    }
    Object.defineProperty(Jugador.prototype, "credito", {
        get: function () {
            return this._credito;
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
    //Muestra los datos del jugador por pantalla
    Jugador.prototype.mostrar_datos_jugador = function () {
        credito_jugador.innerHTML = this._credito + "€";
        apuesta_total_jugador.innerHTML = this._apuesta_total + "€";
        ganancia_jugador.innerHTML = this._ganancia > 0 ? this._ganancia + "€" : "0€";
    };
    //Muestra la cantidad total apostada por el jugador
    Jugador.prototype.actualizar_apuesta_total = function () {
        apuesta_total_jugador.innerHTML = this._apuesta_total + "€";
    };
    /*Agrega la apuesta pasada como parámetro a la lista de apuestas del jugador en el caso de que no exista ya,
    si existe, se le sumará la cantidad anterior a la nueva. En ambos casos la lista de apuestas se actualizará*/
    Jugador.prototype.agregar_apuesta = function (numero, cantidad_apostada) {
        var existe = false;
        if (this._credito >= this._apuesta_total + cantidad_apostada) {
            //Comprobamos si existe y si existe, se suma la cantidad apostada a la que ya había
            for (var _i = 0, _a = this._apuestas; _i < _a.length; _i++) {
                var apuesta = _a[_i];
                if (apuesta.equals(numero)) {
                    apuesta.cantidad_apostada += cantidad_apostada;
                    existe = true;
                    break;
                }
            }
            //Si no existe, se crea la apuesta y se agrega a la lista de apuestas
            if (!existe) {
                var apuesta = new Apuesta(numero, cantidad_apostada);
                this._apuestas.push(apuesta);
            }
            //Al finalizar, borraremos las apuestas mostradas y volveremos a mostrar todas las apuestas
            this.mostrar_apuestas();
            //Y sumaremos la apuesta realizada a la cantidad ya apostada
            this._apuesta_total += cantidad_apostada;
            this.actualizar_apuesta_total();
        }
    };
    Jugador.prototype.mostrar_apuestas = function () {
        apuestas_mostradas.innerHTML = "";
        for (var _i = 0, _a = this._apuestas; _i < _a.length; _i++) {
            var apuesta = _a[_i];
            apuesta.mostrar_apuesta();
        }
    };
    //Borra todas las apuestas del vector de apuestas y de la pantalla, también pone a 0 el marcador de la apuesta total
    Jugador.prototype.borrar_apuestas = function () {
        this._apuestas = [];
        apuestas_mostradas.innerHTML = "";
        this._apuesta_total = 0;
        this.actualizar_apuesta_total();
    };
    return Jugador;
}());
//Estado del juego
var GameState;
(function (GameState) {
    //Apostando
    GameState[GameState["BETTING"] = 0] = "BETTING";
    //Girando la ruleta, calculando y repartiendo las recompensas
    GameState[GameState["SPINNING"] = 1] = "SPINNING";
    //Al acabar de girar la ruleta, si el jugador tiene suficiente dinero para seguir apostando
    GameState[GameState["FINISHED"] = 2] = "FINISHED";
    //Fin del juego: cuando el jugador se queda sin dinero
    GameState[GameState["GAME_ENDED"] = 3] = "GAME_ENDED";
})(GameState || (GameState = {}));
//Select que se usará para que el jugador pueda seleccionar las fichas con las que quiere apostar
var ficha = document.getElementById("ficha");
ficha.selectedIndex = 0;
//Imagen que mostrará la ficha seleccionada
var imagen_ficha = document.getElementById("imagen_ficha");
//Botones
var btn_girar_ruleta = document.getElementById("btn_girar_ruleta");
var btn_borrar_apuestas = document.getElementById("btn_borrar_apuestas");
var btn_nueva_partida = document.getElementById("btn_nueva_partida");
//Clases CSS de los Botones
var boton_activado = "myButton";
var boton_desactivado = "boton-disabled";
//Marcador de la ruleta
var marcador_ruleta = document.getElementById("marcador_ruleta");
var premios_ruleta = document.getElementById("premios_ruleta");
//Clases CSS del div que mostrará los resultados
var premios_ruleta_ganar = "premios_ruleta_ganar";
var premios_ruleta_perder = "premios_ruleta_perder";
//CSS del marcador de la ruleta
var fondo_rojo = "fondo_rojo";
var fondo_negro = "fondo_negro";
var fondo_verde = "fondo_verde";
//Iteraciones de la ruleta
var iteraciones_ruleta = 10;
//Etiqueta div donde se mostrarán las apuestas
var apuestas_mostradas = document.getElementById("apuestas_mostradas");
//Colores
var negro = "negro";
var rojo = "rojo";
var verde = "verde";
var Ruleta = (function () {
    function Ruleta() {
        this.nueva_partida();
    }
    Ruleta.prototype.nueva_partida = function () {
        this._jugador = new Jugador();
        this._jugador.apuestas = [];
        apuestas_mostradas.innerHTML = "";
        this._jugador.mostrar_datos_jugador();
        this._gameState = GameState.BETTING;
        btn_girar_ruleta.className = boton_desactivado;
        btn_borrar_apuestas.className = boton_desactivado;
        btn_nueva_partida.className = boton_desactivado;
    };
    Object.defineProperty(Ruleta.prototype, "gameState", {
        get: function () {
            return this._gameState;
        },
        set: function (gameState) {
            this._gameState = gameState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ruleta.prototype, "jugador", {
        get: function () {
            return this._jugador;
        },
        set: function (jugador) {
            this._jugador = jugador;
        },
        enumerable: true,
        configurable: true
    });
    //Hace girar la ruleta
    Ruleta.prototype.girar = function (iteraciones) {
        var _this = this;
        var alea = Math.floor(Math.random() * (36 - 0 + 1)) + 0;
        marcador_ruleta.innerHTML = alea < 10 ? "0" + alea : "" + alea;
        var color = this.obtener_color(alea);
        if (color == verde)
            marcador_ruleta.className = fondo_verde;
        else if (color == negro)
            marcador_ruleta.className = fondo_negro;
        else
            marcador_ruleta.className = fondo_rojo;
        if (iteraciones >= 0)
            setTimeout(function () { return _this.girar(--iteraciones); }, 200);
        else
            this.revisar_apuestas(alea);
    };
    //Dado el número premiado, comprueba si el jugador ha ganado algún premio
    Ruleta.prototype.revisar_apuestas = function (numero_premiado) {
        var premio = "";
        var total_ganado = 0;
        for (var _i = 0, _a = this._jugador.apuestas; _i < _a.length; _i++) {
            var apuesta = _a[_i];
            if (apuesta.numero == numero_premiado) {
                premio = PLENO;
            }
            else if (apuesta.numero > 36) {
                switch (apuesta.numero) {
                    case tipo_apuestas.PASA:
                        if (numero_premiado >= 19 && numero_premiado <= 36)
                            premio = SUERTE_SENCILLA;
                        break;
                    case tipo_apuestas.FALTA:
                        if (numero_premiado >= 1 && numero_premiado <= 18)
                            premio = SUERTE_SENCILLA;
                        break;
                    case tipo_apuestas.PAR:
                        if (numero_premiado % 2 == 0)
                            premio = SUERTE_SENCILLA;
                        break;
                    case tipo_apuestas.IMPAR:
                        if (numero_premiado % 2 != 0)
                            premio = SUERTE_SENCILLA;
                        break;
                    case tipo_apuestas.NEGRO:
                        if (this.obtener_color(numero_premiado) == negro)
                            premio = SUERTE_SENCILLA;
                        break;
                    case tipo_apuestas.ROJO:
                        if (this.obtener_color(numero_premiado) == rojo)
                            premio = SUERTE_SENCILLA;
                        break;
                    // ---------------------------------------------------<----- cambiar esto!!!
                    case tipo_apuestas.P12:
                        if (numero_premiado >= 1 && numero_premiado <= 12)
                            premio = DOCENA;
                        break;
                    case tipo_apuestas.M12:
                        if (numero_premiado >= 13 && numero_premiado <= 24)
                            premio = DOCENA;
                        break;
                    case tipo_apuestas.D12:
                        if (numero_premiado >= 25 && numero_premiado <= 36)
                            premio = DOCENA;
                        break;
                }
            }
            if (premio != "") {
                total_ganado += this.ganar_premio(apuesta, premio);
            }
            else {
                total_ganado -= this.perder_apuesta(apuesta);
            }
            premio = "";
        } // END for
        this.repartir_premios(total_ganado);
    };
    //Añade al jugador el saldo que haya ganado con la apuesta dada
    Ruleta.prototype.ganar_premio = function (apuesta, premio) {
        var cantidad_ganada;
        if (premio == SUERTE_SENCILLA) {
            cantidad_ganada = apuesta.cantidad_apostada;
        }
        else if (premio == DOCENA) {
            cantidad_ganada = apuesta.cantidad_apostada * 2;
        }
        else {
            cantidad_ganada = apuesta.cantidad_apostada * 35;
        }
        cantidad_ganada += apuesta.cantidad_apostada;
        this._jugador.apuesta_total -= apuesta.cantidad_apostada;
        this._jugador.ganancia += cantidad_ganada;
        apuesta.resultado_apuesta = "Has ganado: " + cantidad_ganada + "€";
        return cantidad_ganada;
    };
    //Perder la apuesta
    Ruleta.prototype.perder_apuesta = function (apuesta) {
        var cantidad_perdida = apuesta.cantidad_apostada;
        this._jugador.apuesta_total -= cantidad_perdida;
        this._jugador.ganancia -= cantidad_perdida;
        apuesta.resultado_apuesta = "Has perdido: " + cantidad_perdida + "€";
        return cantidad_perdida;
    };
    //Aplicar los resultados de la ruleta al jugador
    Ruleta.prototype.repartir_premios = function (total_ganado) {
        var mensaje_ruleta;
        var clase_fondo;
        this._jugador.credito += this._jugador.ganancia;
        if (total_ganado > 0) {
            mensaje_ruleta = "HAS GANADO " + total_ganado + "€!!!";
            clase_fondo = premios_ruleta_ganar;
        }
        else {
            //Nota: Math.abs() pasa el número negativo a positivo
            mensaje_ruleta = "HAS PERDIDO " + (Math.abs(total_ganado)) + "€.";
            clase_fondo = premios_ruleta_perder;
        }
        //Mostrar resultados de las apuestas
        this._jugador.mostrar_datos_jugador();
        premios_ruleta.innerHTML = mensaje_ruleta;
        premios_ruleta.className = clase_fondo;
        this._jugador.mostrar_apuestas();
        btn_girar_ruleta.className = boton_desactivado;
        if (this._jugador.credito > 0) {
            this._gameState = GameState.FINISHED;
            btn_borrar_apuestas.className = boton_activado;
        }
        else {
            this._gameState = GameState.GAME_ENDED;
            btn_nueva_partida.className = boton_activado;
        }
    };
    //Dado un número, obtiene su color en la ruleta
    Ruleta.prototype.obtener_color = function (numero) {
        var color = "";
        if (numero == 0) {
            color = verde;
        }
        else if (numero == 10 || numero == 28) {
            color = negro;
        }
        else {
            if (numero < 10) {
                if (this.esPar(numero)) {
                    color = negro;
                }
                else {
                    color = rojo;
                }
            }
            else {
                var decena = Math.floor(numero / 10);
                var unidad = Math.floor(numero % 10);
                var suma = decena + unidad;
                if (suma < 10) {
                    if (this.esPar(suma)) {
                        color = negro;
                    }
                    else {
                        color = rojo;
                    }
                }
                else {
                    decena = Math.floor(suma / 10);
                    unidad = Math.floor(suma % 10);
                    suma = decena + unidad;
                    if (this.esPar(suma)) {
                        color = negro;
                    }
                    else {
                        color = rojo;
                    }
                }
            }
        }
        return color;
    };
    //Comprueba si un número es par o impar
    Ruleta.prototype.esPar = function (numero) {
        var _esPar;
        if (numero % 2 == 0) {
            _esPar = true;
        }
        else {
            _esPar = false;
        }
        return _esPar;
    };
    Ruleta.prototype.ruleta_por_defecto = function () {
        premios_ruleta.innerHTML = "";
        premios_ruleta.className = "";
        marcador_ruleta.innerHTML = "00";
        marcador_ruleta.className = fondo_verde;
    };
    return Ruleta;
}()); // END RULETA
function apostar(numApuesta) {
    if (ruleta.gameState == GameState.BETTING && comprobar_apuesta(numApuesta)) {
        ruleta.jugador.agregar_apuesta(numApuesta, +ficha.value);
        if (ruleta.jugador.apuestas.length > 0) {
            btn_girar_ruleta.className = boton_activado;
            btn_borrar_apuestas.className = boton_activado;
            btn_nueva_partida.className = boton_desactivado;
        }
    }
}
//Comprueba si la apuesta pasada como parámetro es correcta
function comprobar_apuesta(numApuesta) {
    var esCorrecta = false;
    if (numApuesta >= 0 && numApuesta <= 36) {
        esCorrecta = true;
    }
    else if (numApuesta >= tipo_apuestas.PASA && numApuesta <= tipo_apuestas.D12) {
        esCorrecta = true;
    }
    return esCorrecta;
}
//Borra todas las apuestas del jugador
function borrar_apuestas() {
    if (ruleta.gameState == GameState.BETTING && ruleta.jugador.apuestas.length > 0) {
        ruleta.jugador.borrar_apuestas();
        btn_girar_ruleta.className = boton_desactivado;
        btn_borrar_apuestas.className = boton_desactivado;
        btn_nueva_partida.className = boton_desactivado;
    }
    else if (GameState.FINISHED) {
        ruleta.jugador.borrar_apuestas();
        ruleta.ruleta_por_defecto();
        btn_girar_ruleta.className = boton_desactivado;
        btn_borrar_apuestas.className = boton_desactivado;
        btn_nueva_partida.className = boton_desactivado;
        ruleta.gameState = GameState.BETTING;
    }
}
//Crea una nueva partida, reiniciando el dinero del jugador
function nueva_partida() {
    if (ruleta.gameState == GameState.GAME_ENDED) {
        ruleta.nueva_partida();
        ruleta.ruleta_por_defecto();
    }
}
//Hace girar la ruleta
function girar_ruleta() {
    if (ruleta.gameState == GameState.BETTING && ruleta.jugador.apuestas.length > 0) {
        ruleta.gameState = GameState.SPINNING;
        ruleta.girar(iteraciones_ruleta);
        btn_girar_ruleta.className = boton_desactivado;
        btn_borrar_apuestas.className = boton_desactivado;
        btn_nueva_partida.className = boton_desactivado;
    }
}
//Cambia el icono de la ficha cuando se cambia el select
function cambiar_ficha(value) {
    imagen_ficha.src = "img/" + value + ".png";
}
var ruleta = new Ruleta();
//# sourceMappingURL=app.js.map