//Todas las apuestas disponibles
enum tipo_apuestas {
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

//Categorias de las apuestas
const SUERTE_SENCILLA: string = "Suerte sencilla";
const DOCENA: string = "Docena";
const PLENO: string = "Pleno";

//Clases CSS de las categorias
const CSS_SUERTE_SENCILLA: string = "suerte_sencilla";
const CSS_DOCENA: string = "docenas";
const CSS_PLENO: string = "pleno";

class Apuesta {

    private _numero: number;
    private _cantidad_apostada: number;
    private _tipo_apuesta: string;
    private _categoria_apuesta: string;
    private _clase_de_apuesta: string;
    private _resultado_apuesta: string;

    constructor(numero: number, cantidad_apostada: number) {
        this._numero = numero;
        this._cantidad_apostada = cantidad_apostada;
        this.get_categoria_apuesta();
        this._resultado_apuesta = "";
    }

    /** Método que obtiene y guarda la categoría, tipo y clase CSS de la apuesta según la celda que se haya pulsado
     * Nota: Como estas 3 cosas están tan relacionadas, he preferido hacerlo todo en este método en vez de crear
     * otros 2 métodos exactamente iguales para las otras 2 variables.*/
    public get_categoria_apuesta() {

        this._clase_de_apuesta = "";

        if (this._numero >= 0 && this._numero <= 36) {

            this._tipo_apuesta = this._numero + "";
            this._categoria_apuesta = PLENO;
            this._clase_de_apuesta = CSS_PLENO;

        }
        else if (this._numero >= tipo_apuestas.PASA && this._numero <= tipo_apuestas.D12) {

            switch(this._numero) {
                case tipo_apuestas.PASA: this._tipo_apuesta = "Pasa (19 a 36)"; break;
                case tipo_apuestas.FALTA: this._tipo_apuesta = "Falta (1 a 18)"; break;
                case tipo_apuestas.PAR: this._tipo_apuesta = "Par"; break;
                case tipo_apuestas.IMPAR: this._tipo_apuesta = "Impar"; break;
                case tipo_apuestas.NEGRO: this._tipo_apuesta = "Negro"; break;
                case tipo_apuestas.ROJO: this._tipo_apuesta = "Rojo"; break;
                case tipo_apuestas.P12: this._tipo_apuesta = "P12 (1 a 12)"; break;
                case tipo_apuestas.M12: this._tipo_apuesta = "M12 (13 a 24)"; break;
                case tipo_apuestas.D12: this._tipo_apuesta = "D12 (25 a 36)"; break;
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

    } // END get_categoria_apuesta()

    //SETTERS Y GETTERS
    get numero(): number {
        return this._numero;
    }

    set numero(numero: number) {
        this._numero = numero;
    }

    get cantidad_apostada(): number {
        return this._cantidad_apostada;
    }

    set cantidad_apostada(cantidad_apostada: number) {
        this._cantidad_apostada = cantidad_apostada;
    }

    get tipo_apuesta(): string {
        return this._tipo_apuesta;
    }

    set tipo_apuesta(tipo_apuesta: string) {
        this._tipo_apuesta = tipo_apuesta;
    }

    get resultado_apuesta(): string {
        return this._resultado_apuesta;
    }

    set resultado_apuesta(resultado_apuesta: string) {
        this._resultado_apuesta = resultado_apuesta;
    }

    //Muestra esta apuesta en pantalla
    public mostrar_apuesta() {

        let apuesta: string;

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

    }

    public equals(numero: number): boolean {

        let equal: boolean = false;

        if (this._numero == numero) equal = true;

        return equal;

    }

}