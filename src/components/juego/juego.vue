<template>
    <div id="juegoMain">
        <popUp></popUp>
        <div id="contadorRondas" >
            <h2 id="textoRonda">Ronda <span id="rondaActual">{{datos.rondaActual}}</span> de 5</h2>
            <div :class="getEstadoRonda('ronda1')"></div>
            <div :class="getEstadoRonda('ronda2')"></div>
            <div :class="getEstadoRonda('ronda3')"></div>
            <div :class="getEstadoRonda('ronda4')"></div>
            <div :class="getEstadoRonda('ronda5')"></div>
        </div>
        <div id="faseLider" class="">
            <!--Mostramos al líder en su sitio-->
            <div @click="setJugadorEquipo(getLider)" id="jugadorLider">
                <jugadorLider :lider="lider" :votacionEstado="votacionEstado" ></jugadorLider>
            </div>
            <!--Contenedor dinámico, muestra fase actual-->
            <div id="contenedorFase">
                <contenedorFase></contenedorFase>
            </div>
        </div>
        <!--Mostramos todos los jugadores que no son líder-->
        <div id="fotosJugadores">
            <template v-for="(jugador, key) in jugadores">
                <div @click="setJugadorEquipo(key)" class="contenedorJugador" v-if="!jugador.lider">
                    <jugadorNormal v-if="!jugador.lider"
                    :jugador="jugador" :votacionEstado="votacionEstado"
                    ></jugadorNormal>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    import jugadorNormal from  './jugadorNormal.vue';
    import jugadorLider from './jugadorLider.vue';
    import contenedorFase from './contenedorFase.vue';
    import popUp from './popUpFaccion.vue'

    export default {
        data() {
            return {
                seccion: 'juego',
            }
        },
        components:{
            jugadorNormal,
            jugadorLider,
            contenedorFase,
            popUp,
        },
        methods: {

            ...mapActions(['setJugadorEquipo']),
            //...mapMutations(['siguientePantalla', 'anteriorPantalla']),
        },
        computed: {
            lider()  { // devuelve el objeto que contiene al líder actual o uno vacío
              if (this.jugadores[this.getLider]) {
                  return this.jugadores[this.getLider]
              } else return {}
            },
            ...mapState(['jugadores','idJugador','datos','votacionEstado']),
            ...mapGetters(['checkLider', 'checkPartida', 'getLider', 'getEstadoRonda']),
        },


    }

</script>
<style>
    #juegoMain {
        /*flex-grow: 1;*/
        padding: 5%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /*border: 2px solid red;*/

    }
    #juegoMain #contadorRondas{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #juegoMain #contadorRondas #textoRonda {
        font-size: 1.5rem ;
    }
    #juegoMain #contadorRondas .exito,
    #juegoMain #contadorRondas .fracaso,
    #juegoMain #contadorRondas .actual,
    #juegoMain #contadorRondas .futura {
        border-radius: 50%;
        height: 17px;
        width: 17px;
    }
    #juegoMain #contadorRondas .exito {
        border: 1px solid #2E4D69;
        background-color: #2E4D69;
    }
    #juegoMain #contadorRondas .fracaso {
        border: 1px solid #C13123;
        background-color: #C13123;
    }
    #juegoMain #contadorRondas .actual {
        border: 1px solid #E5C513;
    }
    #juegoMain #contadorRondas .futura {
        border: 1px solid #2E4D69;
    }

    #juegoMain #faseLider {
        flex-basis: 25%;
        display: flex;
        justify-content: space-between;
    }
    #juegoMain #faseLider #jugadorLider {

    }
    #juegoMain #faseLider #contenedorFase {
        /*border: 1px solid yellow;*/
        margin-left: 5%;
        flex-grow: 1;

    }
    #juegoMain #fotosJugadores{
        width: 100%;
        flex-basis: 60%;
        max-height: 60%;
        /*border: 2px solid deepskyblue;*/
        display: grid;
        grid: 30% 30% 30% / 30% 30% 30%;
        justify-content: space-between;
        align-content: space-between;
    }
    #juegoMain #fotosJugadores .contenedorJugador {
        /*border: 1px solid red;*/
    }



</style>