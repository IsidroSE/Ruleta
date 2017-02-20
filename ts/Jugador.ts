//Saldo inicial del jugador
const saldo_inicial_jugador = 5000;

//Datos del jugador
let credito_jugador: HTMLElement = document.getElementById("credito_jugador");
let apuesta_total_jugador: HTMLElement = document.getElementById("apuesta_total_jugador");
let ganancia_jugador: HTMLElement = document.getElementById("ganancia_jugador");

class Jugador {

    private _credito: number;
    private _apuesta_total: number;
    private _ganancia: number;
    private _apuestas: Apuesta[];

    constructor () {
        this._credito = saldo_inicial_jugador;
        this._apuesta_total = 0;
        this._ganancia = 0;
    }

    get credito(): number {
        return this.credito;
    }

    set credito(credito: number) {
        this._credito = credito;
    }

    get apuesta_total(): number {
        return this._apuesta_total;
    }

    set apuesta_total(apuesta_total: number) {
        this._apuesta_total = apuesta_total;
    }

    get ganancia(): number {
        return this._ganancia;
    }

    set ganancia(ganancia: number) {
        this._ganancia = ganancia;
    }

    get apuestas(): Apuesta[] {
        return this._apuestas;
    }

    set apuestas(apuestas: Apuesta[]) {
        this._apuestas = apuestas;
    }

    //Muestra los datos del jugador por pantalla
    public mostrar_datos_jugador() {
        credito_jugador.innerHTML = this._credito + "€";
        apuesta_total_jugador.innerHTML = this._apuesta_total + "€";
        ganancia_jugador.innerHTML = this._ganancia + "€";
    }

    //Muestra la cantidad total apostada por el jugador
    public actualizar_apuesta_total() {
        apuesta_total_jugador.innerHTML = this._apuesta_total + "€";
    }

    /*Agrega la apuesta pasada como parámetro a la lista de apuestas del jugador en el caso de que no exista ya,
    si existe, se le sumará la cantidad anterior a la nueva. En ambos casos la lista de apuestas se actualizará*/
    public agregar_apuesta(numero: number, cantidad_apostada: number) {

        let existe: boolean = false;

        if (this._credito >= this._apuesta_total + cantidad_apostada) {

            //Comprobamos si existe y si existe, se suma la cantidad apostada a la que ya había
            for (let apuesta of this._apuestas) {
                if (apuesta.equals(numero)) {
                    apuesta.cantidad_apostada += cantidad_apostada;
                    existe = true;
                    break;
                }
            }

            //Si no existe, se crea la apuesta y se agrega a la lista de apuestas
            if (!existe) {
                let apuesta = new Apuesta(numero, cantidad_apostada);
                this._apuestas.push(apuesta);
            }

            //Al finalizar, borraremos las apuestas mostradas y volveremos a mostrar todas las apuestas
            apuestas_mostradas.innerHTML = "";
            for (let apuesta of this._apuestas) {
                apuesta.mostrar_apuesta();
            }

            //Y sumaremos la apuesta realizada a la cantidad ya apostada
            this._apuesta_total += cantidad_apostada;
            this.actualizar_apuesta_total();

        }

    }

    public borrar_apuestas() {
        this._apuestas = []
        apuestas_mostradas.innerHTML = "";
        this._apuesta_total = 0;
        this.actualizar_apuesta_total();
    }

}