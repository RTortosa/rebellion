<template>
        <div id="elegirEquipoLider" v-if="checkLider">
            <p class="textoAyuda">Haz tap en el jugador para seleccionarlo.</p>
            <p class="textoInfo">{{getNumeroJugadoresSeleccionados}} de {{getMinimoJugadoresASeleccionar}} seleccionados</p>
            <div @click="clickBoton" :class="claseBoton" class="botonListo">Listo</div>
        </div>

        <div id="elegirEquipoJugador" v-else>
            <p class="textoAyuda"> El líder está eligiendo a los integrantes del equipo</p>
            <img src="../../../assets/esperarLider.svg" alt="Esperando al líder">
        </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
    export default {
        methods: {
            clickBoton () {
                if (this.habilitarBoton) {
                    this.setFaseActual(1);
                }
            },
            ...mapActions(['setFaseActual'])
        },
        computed: {
            claseBoton () {
                    if (!this.habilitarBoton) return 'desabilitado';
                else return ''
            },
            habilitarBoton () {
                return this.getNumeroJugadoresSeleccionados === this.getMinimoJugadoresASeleccionar;
            },
           ...mapGetters(['checkLider', 'getNumeroJugadoresSeleccionados','getMinimoJugadoresASeleccionar']),
        }
    }
</script>

<style>
    #elegirEquipoJugador, #elegirEquipoLider {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #elegirEquipoJugador img {
        /*width: 100%;*/
        /*height: auto;*/
    }
    #elegirEquipoJugador .textoAyuda, #elegirEquipoLider .textoAyuda {
        font-size: 0.8rem;
        color: #2E4D69;
    }
    #elegirEquipoLider .textoInfo {
        color: #E5C513;
        font-size: 1.1rem;
        text-align: center;
    }
    #elegirEquipoLider .botonListo {
        padding-bottom: 5px;
        text-align: center;
        font-family: 'Audiowide', cursive;
        font-size: 1.2rem;
        background-image: url("../../../assets/Btn_2.svg");
        background-size: 60% 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    #elegirEquipoLider .botonListo.desabilitado {
        color: #2E4D69;
    }
</style>