<template>
    <div id="salaEspera">
        <div class="header">
            <h1>Sala de Espera</h1>
            <span id="btnSalir" @click="clickSalir">SALIR</span>
        </div>
        <div id="salaEspera__ContSuperior">
            <div id="salaEspera__ContFoto">
                <div class="foto">Foto</div>
                <!--Linkear Foto-->
                <button>+</button>
            </div>
            <div id="salaEspera__ContDatos">
                <h2>ID Juego</h2>
                <h3 id="idPartida"># {{idPartida}}</h3>
                <h2>Tu Nombre</h2>
                <input v-model="nombreTemp" type="text" placeholder="Ej. Juanito" required>
            </div>
        </div>
        <button id="btnListo" @click="clickListo">{{estadoBoton}}</button>
        <h3>Jugadores:</h3>
        <div id="salaEspera__contJugadores">
            <template v-for=" jugador in jugadores">
                <div class="jugador">
                    <h5 class="nombre">{{jugador.nombre}}</h5>
                    <h6 v-if="jugador.listo" class="estado amarillo">Listo</h6>
                    <h6 v-else class="estado rojo">Esperando</h6>
                </div>
            </template>
        </div>
        <!--<h5>Players Ready: {{todosListos}}</h5>-->

    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        data() {
            return {
                //estadoBoton: 'Listo',
                nombreTemp: '',

            }
        },
        methods: {
            clickListo() {
                //Si el boton pone Empezar y hacemos click empezamos la partida
                if (this.estadoBoton === 'Empezar') {
                    this.iniciarPartida(); // Set flag Partida Iniciada
                    this.siguientePantalla();
                }else {
                    this.setListo();
                    this.setNombre(this.nombreTemp);
                }
            },
            clickSalir() {
                if (this.checkCreador) {
                    this.borrarPartida()
                } else this.borrarJugador();
                this.anteriorPantalla();
            },
            ...mapActions(['setListo', 'setNombre', 'borrarJugador', 'borrarPartida', 'iniciarPartida']),
            ...mapMutations(['siguientePantalla', 'anteriorPantalla']),
        },
        computed: {
            estadoBoton() {
                if (!this.checkListo) return 'Listo'
                else if (this.checkCreador && this.checkListo && this.todosListos) return 'Empezar'
                else if (this.checkListo) return 'Esperando'
            },
            checkCondicionesIniciarPartida() {
                 return !!(this.todosListos
                     && !this.checkCreador
                     && this.estadoBoton === 'Esperando'
                     && this.checkPartidaIniciada);
                // return this.checkPartidaIniciada
            },
            ...mapState(['datos','jugadores', 'idPartida', 'idJugador',]),
            ...mapGetters(['todosListos', 'checkCreador', 'checkListo', 'checkPartida',
                        'checkPartidaIniciada',
            ]),
        },
        watch: { // No usar arrow function, ¡Que perdemos el contexto hombre!
            // Cuando se dan las condiciones Cambia de pantalla ** Inicia el juego **
            checkCondicionesIniciarPartida: function(value) {
               if (value)
                   this.siguientePantalla();
            },
        },


    }
</script>

<style>
    /*#salaEspera > * {border: 1px solid yellow;}*/
    #salaEspera{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
    }
    #salaEspera .header {
        margin: 15px 5% 0 5%;
        flex-basis: 100%;
    }
    #salaEspera .header h1{ /* Sala de Espera */
        width: 100%;
        text-align: center;
        font-size: 1.7rem;
    }
    #salaEspera #btnSalir{
        background-color: transparent;
        border: none;
        color: #2e4d69;
        font-family: inherit;
        flex-basis: 100%;
        text-align: start;
        align-self: center;
    }
    #salaEspera__ContSuperior {
        margin: 0 5%;
        flex-basis: 100%;
        height: 25%;
        flex-grow: 0;

        display: flex;
        justify-content: space-between;
    }
    #salaEspera__ContFoto {
        position: relative;
        flex-basis: 50%;
    }
    #salaEspera__ContFoto .foto{
        height: 100%;
        width: 100%;
        border: 1px solid white;
    }
    #salaEspera__ContFoto button{
        position: absolute;
        height: 40px;
        width: 40px;
        bottom: 0;
        left: 0;
        background-color: #0D1F3E;
        border: 1px solid white;
        font-family: inherit;
        font-size: 2rem;
        color: white;

    }
    #salaEspera__ContDatos {
        flex-basis: 49%;
        /*max-width: 49%;*/
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: start;
        align-content: flex-end;
    }
    #salaEspera__ContDatos h2 {
        font-size: 1.3rem;
        margin-bottom: 3%;
    }
    #salaEspera__ContDatos #idPartida{
        font-family: 'Exo 2', sans-serif;
        margin-bottom: 8%;
        font-size: 1.1rem;
        color: #e5c513;
    }
    #salaEspera__ContDatos input {
        font-family: 'Exo 2', sans-serif;
        font-size: 1rem;
        padding-left: 10px;
        color: white;
        background-color: transparent;
        border: 1px solid white;
        height: 20%;
        width: 100%;
    }
    #salaEspera #btnListo{
        flex-basis: 100%;
        margin: 0 20%; /*Revisar Cuando ponga imágen*/
        border: 1px solid white;
        background-color: #040525;
        box-shadow: 3px 5px #2E4D69;
        color: white;
        font-family: inherit;
        font-size: 1.9rem;
    }
    #salaEspera > h3 {
        flex-basis: 100%;
        text-align: center;
        font-size: 1.3rem;
        align-self: flex-end;

    }
    #salaEspera__contJugadores {
        height: 40%;
        flex-basis: 100%;
        background: url("../assets/fondoEspera.svg");
        background-size: 100% 40%;
        padding: 0 5%;
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    #salaEspera__contJugadores .jugador {
        flex-basis: 50%;
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    #salaEspera__contJugadores .jugador:nth-child(even) { text-align: end}
    #salaEspera__contJugadores .jugador .rojo { color: #C13123; }
    #salaEspera__contJugadores .jugador .amarillo { color: #E5C513; }
    #salaEspera__contJugadores .jugador .nombre {
        font-size: 1.3rem;
    }
    #salaEspera__contJugadores .jugador .estado {
        font-family: 'Exo 2', sans-serif;
        font-size: 1rem;
    }

</style>