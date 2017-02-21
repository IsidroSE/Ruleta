//Estado del juego
enum GameState {
    //Apostando
    BETTING,
    //Girando la ruleta, calculando y repartiendo las recompensas
    SPINNING,
    //Al acabar de girar la ruleta, si el jugador tiene suficiente dinero para seguir apostando
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

        if (iteraciones >= 0)
            setTimeout(() => this.girar(--iteraciones), 200);
        else
            this.revisar_apuestas(alea);
    }

    //Dado el número premiado, comprueba si el jugador ha ganado algún premio
    public revisar_apuestas(numero_premiado: number) {

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

        cantidad_ganada += apuesta.cantidad_apostada;

        this._jugador.apuesta_total -= apuesta.cantidad_apostada;
        this._jugador.ganancia += cantidad_ganada;
        apuesta.resultado_apuesta = "Has ganado: " + cantidad_ganada + "€";
        return cantidad_ganada;

    }

    //Perder la apuesta
    public perder_apuesta(apuesta: Apuesta): number {

        let cantidad_perdida: number = apuesta.cantidad_apostada;

        this._jugador.apuesta_total -= cantidad_perdida;
        this._jugador.ganancia -= cantidad_perdida;
        apuesta.resultado_apuesta = "Has perdido: " + cantidad_perdida + "€";
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
            //Nota: Math.abs() pasa el número negativo a positivo
            mensaje_ruleta = "HAS PERDIDO " + (Math.abs(total_ganado)) + "€."
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

    public ruleta_por_defecto() {
        premios_ruleta.innerHTML = "";
        premios_ruleta.className = "";
        marcador_ruleta.innerHTML = "00"
        marcador_ruleta.className = fondo_verde;
    }

} // END RULETA

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

let ruleta = new Ruleta();