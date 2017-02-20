//Estado del juego
enum GameState {
    //Apostando
    BETTING,
    //Girando la ruleta
    SPINNING,
    //Cuando la ruleta ha acabado de girar, aquí se calcularán las recompensas
    FINISHED,
    //Fin del juego: cuando el jugador se queda sin dinero
    GAME_ENDED
}

//Select que se usará para que el jugador pueda seleccionar las fichas con las que quiere apostar
let ficha: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ficha");
ficha.selectedIndex = 0;

//Imagen que mostrará la ficha seleccionada
let imagen_ficha: HTMLImageElement = <HTMLImageElement>document.getElementById("imagen_ficha");

//Botones
let btn_girar_ruleta: HTMLElement = document.getElementById("btn_girar_ruleta");
let btn_borrar_apuestas: HTMLElement = document.getElementById("btn_borrar_apuestas");
let btn_nueva_partida: HTMLElement = document.getElementById("btn_nueva_partida");

//Clases CSS de los Botones
const boton_activado: string = "myButton";
const boton_desactivado: string = "boton-disabled";

//Marcador de la ruleta
let marcador_ruleta: HTMLElement = document.getElementById("marcador_ruleta");
let premios_ruleta: HTMLElement = document.getElementById("premios_ruleta");

//Clases CSS del div que mostrará los resultados
const premios_ruleta_ganar: string = "premios_ruleta_ganar";
const premios_ruleta_perder: string = "premios_ruleta_perder";

//CSS del marcador de la ruleta
const fondo_rojo: string = "fondo_rojo";
const fondo_negro: string = "fondo_negro";
const fondo_verde: string = "fondo_verde";

//Iteraciones de la ruleta
const iteraciones_ruleta: number = 10;

//Etiqueta div donde se mostrarán las apuestas
let apuestas_mostradas: HTMLElement = document.getElementById("apuestas_mostradas");

//Colores
const negro: string = "negro";
const rojo: string = "rojo";
const verde: string = "verde";

//Números que contiene cada columna
const P12: number[] = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const M12: number[] = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const D12: number[] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

class Ruleta {

    private _gameState: number;
    private _jugador: Jugador;

    constructor() {
        this.nueva_partida();
    }

    public nueva_partida() {
        this._jugador = new Jugador();
        this._jugador.apuestas = [];
        apuestas_mostradas.innerHTML = "";
        this._jugador.mostrar_datos_jugador();
        this._gameState = GameState.BETTING;
        btn_girar_ruleta.className = boton_desactivado;
        btn_borrar_apuestas.className = boton_desactivado;
        btn_nueva_partida.className = boton_desactivado;
    }

    get gameState(): number {
        return this._gameState;
    }

    set gameState(gameState: number) {
        this._gameState = gameState;
    }

    get jugador(): Jugador {
        return this._jugador;
    }

    set jugador(jugador: Jugador) {
        this._jugador = jugador;
    }

    //Hace girar la ruleta
    public girar(iteraciones: number) {
        let alea: number = Math.floor(Math.random() * (36 - 0 + 1)) + 0;
        marcador_ruleta.innerHTML = alea < 10 ? "0" + alea : "" + alea;

        let color = this.obtener_color(alea);
        if (color == verde) marcador_ruleta.className = fondo_verde;
        else if (color == negro) marcador_ruleta.className = fondo_negro;
        else marcador_ruleta.className = fondo_rojo;

        if (iteraciones > 0)
            setTimeout(() => this.girar(--iteraciones), 200);
        else
            this.revisar_apuestas(alea);
    }

    //Dado el número premiado, comprueba si el jugador ha ganado algún premio
    public revisar_apuestas(numero_premiado: number) {

        this._gameState = GameState.FINISHED;

        let premio: string = "";
        let total_ganado = 0;

        for (let apuesta of this._jugador.apuestas) {
            
            if (apuesta.numero == numero_premiado) {
                premio = PLENO;
            }
            else if (apuesta.numero > 36) {
                
                switch(apuesta.numero) {

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
                        if (P12.indexOf(numero_premiado) > -1)
                            premio = DOCENA;
                    break;
                    case tipo_apuestas.M12:
                        if (M12.indexOf(numero_premiado) > -1)
                            premio = DOCENA;
                    break;
                    case tipo_apuestas.D12:
                        if (D12.indexOf(numero_premiado) > -1)
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

    }

    //Añade al jugador el saldo que haya ganado con la apuesta dada
    public ganar_premio(apuesta: Apuesta, premio: string): number {

        let cantidad_ganada: number;

        if (premio == SUERTE_SENCILLA) {
            cantidad_ganada = apuesta.cantidad_apostada;
        }
        else if (premio == DOCENA) {
            cantidad_ganada = apuesta.cantidad_apostada * 2;
        }
        //PLENO
        else {
            cantidad_ganada = apuesta.cantidad_apostada * 35;
        }

        this._jugador.apuesta_total -= apuesta.cantidad_apostada;
        this._jugador.ganancia += cantidad_ganada;
        return cantidad_ganada;

    }

    //Perder la apuesta
    public perder_apuesta(apuesta: Apuesta): number {

        let cantidad_perdida: number = apuesta.cantidad_apostada;

        this._jugador.apuesta_total -= apuesta.cantidad_apostada;
        this._jugador.ganancia -= cantidad_perdida;
        return cantidad_perdida;

    }

    //Aplicar los resultados de la ruleta al jugador
    public repartir_premios(total_ganado: number) {
        
        let mensaje_ruleta: string;
        let clase_fondo: string;
        this._jugador.credito += this._jugador.ganancia;
        
        if (total_ganado > 0) {
            mensaje_ruleta = "HAS GANADO " + total_ganado + "€!!!"
            clase_fondo = premios_ruleta_ganar;
        }
        else {
            mensaje_ruleta = "HAS PERDIDO " + (Math.abs(total_ganado)) + "€."
            clase_fondo = premios_ruleta_perder;
        }

        this._jugador.mostrar_datos_jugador();
        premios_ruleta.innerHTML = mensaje_ruleta;
        premios_ruleta.className = clase_fondo;

        /*Cosas por hacer:
            1. Intentar que debajo de cada apuesta muestre lo que has ganado o perdido. (creo que el metodo de
            mostrar está hecho, intentar ahora cambiar la variable this._resultado_apuesta en los metodos de arriba).
            2. Prevenir derrota del jugador y activar/desactivar los botones pertinentes.*/

    }

    //Dado un número, obtiene su color en la ruleta
    public obtener_color(numero: number): string {

        let color: string = "";

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

                let decena: number = Math.floor(numero / 10);
                let unidad: number = Math.floor(numero % 10);
                let suma: number = decena + unidad;

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

    }

    //Comprueba si un número es par o impar
    public esPar(numero: number): boolean {

        let _esPar: boolean;

        if (numero % 2 == 0) {
            _esPar = true;
        }
        else {
            _esPar = false;
        }

        return _esPar;

    }

} // END RULETA

function apostar(numApuesta) {

    if (ruleta.gameState == GameState.BETTING && comprobar_apuesta(numApuesta)) {
        //Por hacer: primero que nada, hay que comprobar que el jugador tiene suficiente saldo para confrontar la apuesta
        ruleta.jugador.agregar_apuesta(numApuesta, +ficha.value);

        if (ruleta.jugador.apuestas.length > 0) {
            btn_girar_ruleta.className = boton_activado;
            btn_borrar_apuestas.className = boton_activado;
            btn_nueva_partida.className = boton_desactivado;
        }

    }

}

//Comprueba si la apuesta pasada como parámetro es correcta
function comprobar_apuesta(numApuesta): boolean {

    let esCorrecta: boolean = false;

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

}

//Crea una nueva partida, reiniciando el dinero del jugador
function nueva_partida() {

    if (ruleta.gameState == GameState.GAME_ENDED) {
        ruleta.nueva_partida();
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

let ruleta = new Ruleta();