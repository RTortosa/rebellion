<template>
    <div v-if="popUpEstado" class="fondo">
        <div id="popUp">
            <h3>Bienvenido al equipo</h3>
            <h4 class="popUp__nombreJugador">{{jugadores[idJugador].nombre}}</h4>
            <img class="popUp__logoFaccion" v-if="checkFaccion === 'agente'" src="../../assets/logoAgente.svg" alt="LogoEspia">
            <img class="popUp__logoFaccion" v-else-if="checkFaccion === 'espia'"  src="../../assets/logoEspia.svg" alt="LogoAgente">
            <div id="popUp__ContenedorEspias" v-if="checkFaccion === 'espia' ">
                <h5>Espías</h5>
                <template v-for="espia in getEspias">
                    <jugadorNormal class="jugador" :jugador="espia"></jugadorNormal>
                </template>
            </div>
            <div id="popUp__contenedorTexto">
                <p v-if="checkFaccion === 'espia' "
                   class="popUp__textoFaccion1">
                    Trabajad en equipo para conseguir sabotear las misiones</p>
                <p v-else-if="checkFaccion  === 'agente' "
                   class="popUp__textoFaccion1">
                    ¡No dejes que los espías arruinen las misiones!
                </p>
                <div class="popUp__lineaSeparadora"></div>

                <p v-if="checkFaccion  === 'espia' "
                   class="popUp__textoFaccion2">
                    ¡Por la gloria del imperio!
                </p>
                <p v-else-if="checkFaccion  === 'agente' "
                   class="popUp__textoFaccion2">
                    Descúbrelos cuanto antes y no dejes que participen en las misiones
                </p>
            </div>

            <button id="popUp__btnOk" @click="cerrar">Ok</button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import jugadorNormal from './jugadorNormal.vue'


    export default {
        data() {
            return {}
        },
        components: {
            jugadorNormal,
        },
        methods: {
            cerrar() {
                this.popUp(false)
            },
            //...mapActions([]),
            ...mapMutations(['popUp']),
        },
        computed: {

            ...mapState(['popUpEstado', 'jugadores', 'idJugador']),
            ...mapGetters(['checkFaccion', 'getEspias']),
        },
    }
</script>

<style>
    .fondo {
        height: 100vh;
        width: 100vw;
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #popUp {
        width: 90%;
        height: 80%;
        border: 1px solid white;
        background-color: #040525;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 5%;
        font-family: 'Exo 2', sans-serif;
    }
    /*#popUp > * { border: 1px solid yellow;}*/

    #popUp > h3 {
        font-size: 1.8rem;
        color: #E5C513;
    }
    .popUp__nombreJugador{
        font-family: 'Audiowide', cursive;
        font-size: 1.2rem;
    }
    #popUp .popUp__logoFaccion {
        flex-shrink: 0;
    }
    #popUp__contenedorTexto {
        height: 24%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    #popUp__contenedorTexto .popUp__textoFaccion1 {
        font-weight: bold;
        font-size: 1.1rem;
    }

    #popUp__contenedorTexto .popUp__lineaSeparadora {
        width: 95%;
        border: 1px solid #2E4D69;
    }
    #popUp__ContenedorEspias{
        display: flex;
        flex-basis: 20%;
        max-height: 17%;
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    #popUp__ContenedorEspias > h5 {
        flex-basis: 100%;
        text-align: left;
        color: #2E4D69;
        margin-bottom: 3px;
    }
    #popUp__ContenedorEspias .jugador {
        flex-basis: 22%;
        max-width: 22%;
        height: 80%;
    }
    #popUp__btnOk {
        width: 60%;
        color: white;
        border: 1px solid white;
        background-color: transparent;
        box-shadow: 0 5px #2E4D69;
        font-family: 'Audiowide', cursive;
        font-size: 1.6rem;
    }
</style>