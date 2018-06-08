<template>
    <div id="aprobarEquipoVotar" v-if="!checkVotado && !checkVotacionTerminada">
        <p class="textoAyuda">¿Confías en este equipo?</p>
        <div class="contenedorVotos">
            <div @click="votoTemporal=true" class="votoPositivo">
                <img v-if="votoTemporal === true" src="../../../assets/Voto_Si_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_Si.svg" alt="">
            </div>
            <div @click="votoTemporal=false" class="votoNegativo">
                <img v-if="votoTemporal === false" src="../../../assets/Voto_No_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_No.svg" alt="">
            </div>
        </div>
        <div @click="clickListo" class="botonListo"> Listo </div>
    </div>

    <div id="aprobarEquipoVotado" v-else-if="checkVotado && !checkVotacionTerminada">
        <p class="textoAyuda">Ya has votado</p>
        <div class="contenedorVotos">
            <div class="votoPositivo">
                <img v-if="getVotoJugador" src="../../../assets/Voto_Si_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_Si.svg" alt="">
            </div>
            <div class="votoNegativo">
                <img v-if="!getVotoJugador" src="../../../assets/Voto_No_Act.svg" alt="">
                <img v-else src="../../../assets/Voto_No.svg" alt="">
            </div>
        </div>

        <div>
            <p class="textoInfo">Esperando al resto</p>
            <p class="textoInfo2">Falta<span v-show="getJugadoresRestantes > 1">n</span> {{getJugadoresRestantes}}</p>
        </div>
    </div>

    <div v-else-if="checkVotado && checkVotacionTerminada" id="aprobarEquipoResultado">
        <p class="textoAyuda">Votación finalizada</p>
        <div>
            <p class="textoInfo">El equipo ha sido:</p>
            <p class="resultado" :class="getResultadoVotacion">{{getResultadoVotacion}}</p>
        </div>
        <p v-if="getResultadoVotacion === 'Rechazado'" class="textoInfo2">Quedan {{getIntentosRestantes}} intentos</p>
        <div v-if="checkCreador" @click="clickOk" class="textoSiguienteFase">Ok</div>
        <div v-else class="textoEsperandoFase">Esperando...</div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

    export default {
        data () {
            return {
                votoTemporal: '',
            }
        },
        computed: {
            checkCondicionesMostrarResultado () {
                return this.checkVotado && this.checkVotacionTerminada;
            },
            ...mapState(['votacionEstado']),
            ...mapGetters(['checkCreador','getResultadoVotacion', 'getVotoJugador',
            'getJugadoresRestantes', 'getIntentosRestantes','checkVotacionTerminada', 'checkVotado']),
        },
        methods: {
            clickListo () {
                this.setVotoEquipo(this.votoTemporal);
                this.votoTemporal ='';
            },
            clickOk () {
                if (this.getResultadoVotacion === 'Aprobado'){
                    this.setLiderRechazadoVeces(0); // setear lider rechazado a 0
                    this.setFaseActual(2); // Cambio a fase Misión

                } else {
                    // seteamos LiderRechazado a su valor +1
                    this.setLiderRechazadoVeces(5 - this.getIntentosRestantes);
                    this.setLider(); // Nuevo Lider
                    this.setFaseActual(0) // Volver elegir equipo
                }

            },
            ...mapMutations(['votosVisible']),
            ...mapActions (['setVotoEquipo','setFaseActual','setLiderRechazadoVeces','setLider']),
        },
        watch: { // No usar arrow function,
            // Cuando se dan las condiciones Muestra el resultado de la votación
            checkCondicionesMostrarResultado: function(value) {
                if (value === true) {
                        this.votosVisible('true');
                }
            },
        },
    }
</script>

<style>
    #aprobarEquipoVotar,
    #aprobarEquipoVotado,
    #aprobarEquipoResultado {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #aprobarEquipoVotar .textoAyuda,
    #aprobarEquipoVotado .textoAyuda,
    #aprobarEquipoResultado .textoAyuda {
        color: #2E4D69;
        text-align: right;
        font-size: 0.8rem;
    }
    #aprobarEquipoVotar .botonListo {
        padding-bottom: 5px;
        text-align: center;
        font-family: 'Audiowide', cursive;
        font-size: 1.2rem;
        background-image: url("../../../assets/Btn_2.svg");
        background-size: 60% 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    #aprobarEquipoVotar .contenedorVotos,
    #aprobarEquipoVotado .contenedorVotos {
        display: flex;
        justify-content: space-around;
    }
    #aprobarEquipoVotado .textoInfo {
        text-align: right;
        font-family: 'Audiowide', cursive;
        font-size: 1rem;
    }
    #aprobarEquipoVotado .textoInfo2 {
        color: #2E4D69;
        font-size: 0.8rem;
        text-align: right;
    }


    #aprobarEquipoResultado .textoInfo {
        font-size: 1rem;
    }
    #aprobarEquipoResultado .resultado {
        font-size: 1.2rem;
        font-family: 'Audiowide', cursive;
        text-align: right;
    }
    #aprobarEquipoResultado .resultado.Rechazado { color: #C13123; }
    #aprobarEquipoResultado .resultado.Aprobado { color: #E5C513; }

    #aprobarEquipoResultado .textoInfo2 {
        color: #2E4D69;
        font-size: 0.8rem;
        text-align: center;
    }
    #aprobarEquipoResultado .textoEsperandoFase {
        text-align: center;
        font-family: 'Audiowide', cursive;
        font-size: 1.2rem;
    }
    #aprobarEquipoResultado .textoSiguienteFase {
        padding-bottom: 5px;
        text-align: center;
        font-family: 'Audiowide', cursive;
        font-size: 1.2rem;
        background-image: url("../../../assets/Btn_2.svg");
        background-size: 60% 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

</style>