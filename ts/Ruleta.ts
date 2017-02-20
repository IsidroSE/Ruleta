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

//CSS del marcador de la ruleta
const fondo_rojo: string = "fondo_rojo";
const fondo_negro: string = "fondo_negro";
const fondo_verde: string = "fondo_verde";

//Iteraciones de la ruleta
const iteraciones_ruleta: number = 10;

//Etiqueta div donde se mostrarán las apuestas
let apuestas_mostradas: HTMLElement = document.getElementById("apuestas_mostradas");

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

        if (alea == 0) marcador_ruleta.className = fondo_verde;
        else if (alea % 2 == 0) marcador_ruleta.className = fondo_negro;
        else marcador_ruleta.className = fondo_rojo;

        if (iteraciones > 0)
            setTimeout(() => this.girar(--iteraciones), 200);
        else
            this.revisar_apuestas(alea);
    }


    public revisar_apuestas(numero_premiado: number) {
        //Por hacer: revisar las apuestas y repartir los premios
        console.log(numero_premiado);
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