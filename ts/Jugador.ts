class Jugador {

    private _credito: number;
    private _apuesta_total: number;
    private _ganancia: number;
    private _apuestas: Apuesta[];

    constructor () {
        this._credito = saldo_inicial_jugador;
        this._apuesta_total = 0;
        this._ganancia = 0;
        this._apuestas = [];
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

    public agregar_apuesta(apuesta: Apuesta) {
        this._apuestas.push(apuesta);
    }

}